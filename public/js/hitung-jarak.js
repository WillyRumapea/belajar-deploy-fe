const tengkuCoordinates = {
  lat: 3.5666864,
  lng: 98.6932378,
};

const inputAddress = document.getElementById("address");
const buttonAddress = document.getElementById("searchAddres");
const buttonCheck = document.getElementById("checkDistance");
const body = document.body;

let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: tengkuCoordinates,
    zoom: 15,
  });
  marker = new google.maps.Marker({
    map: map,
    position: tengkuCoordinates,
    draggable: true,
  });

  google.maps.event.addListener(marker, "dragend", async () => {
    const newPosition = marker.getPosition();
    const newLat = newPosition.lat();
    const newLng = newPosition.lng();

    const reqNewPosMarker = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLat},${newLng}&key=AIzaSyD5WvrQddByXcb51HZ5NE_ZYTEZZiWUS_0`
    );

    if (!reqNewPosMarker.ok) {
      throw new Error(`HTTP request error! status: ${reqNewPosMarker.status}`);
    }
    const resNewPosMarker = await reqNewPosMarker.json();

    if (resNewPosMarker.status === "OK") {
      const newAddress = resNewPosMarker.results[0].formatted_address;
      inputAddress.value = newAddress;
    } else {
      return;
    }
  });
}

buttonAddress.addEventListener("click", async (e) => {
  e.preventDefault();
  const addressValue = inputAddress.value;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    addressValue
  )}&key=AIzaSyD5WvrQddByXcb51HZ5NE_ZYTEZZiWUS_0`;

  const reqCoor = await fetch(url);
  const resCoor = await reqCoor.json();
  console.log(resCoor);

  if (resCoor.status === "OK") {
    const dataCoor = resCoor.results[0].geometry.location;
    const userCoor = {
      lat: dataCoor.lat,
      lng: dataCoor.lng,
    };

    if (marker) marker.setMap(null);

    marker = new google.maps.Marker({
      map: map,
      position: userCoor,
      draggable: true,
    });

    google.maps.event.addListener(marker, "dragend", async () => {
      const newPosition = marker.getPosition();
      const newLat = newPosition.lat();
      const newLng = newPosition.lng();

      const reqNewPosMarker = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLat},${newLng}&key=AIzaSyD5WvrQddByXcb51HZ5NE_ZYTEZZiWUS_0`
      );

      if (!reqNewPosMarker.ok) {
        throw new Error(
          `HTTP request error! status: ${reqNewPosMarker.status}`
        );
      }
      const resNewPosMarker = await reqNewPosMarker.json();

      if (resNewPosMarker.status === "OK") {
        const newAddress = resNewPosMarker.results[0].formatted_address;
        inputAddress.value = newAddress;
      } else {
        return;
      }
    });

    map.panTo(userCoor);
  } else {
    alert("Alamat tidak ditemukan");
  }
});

const haversineFormula = (coordinate1, coordinate2) => {
  const R = 6371; // jari-jari bumi dalam km
  const rad = (deg) => (deg * Math.PI) / 180; // rumus radian

  const lat1 = coordinate1.lat;
  const lng1 = coordinate1.lng;
  const lat2 = coordinate2.lat;
  const lng2 = coordinate2.lng;

  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      (Math.sin(dLng / 2) * Math.sin(dLng / 2));

  const c = 2 * Math.asin(Math.sqrt(a));
  const distance = R * c;
  return distance;
};

buttonCheck.addEventListener("click", async (e) => {
  e.preventDefault();

  const setAddressUser = inputAddress.value;
  const reqCoorUser = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      setAddressUser
    )}&key=AIzaSyD5WvrQddByXcb51HZ5NE_ZYTEZZiWUS_0`
  );
  const resCoorUser = await reqCoorUser.json();
  const dataCoorUser = resCoorUser.results[0].geometry.location;
  const setUserCoor = {
    lat: dataCoorUser.lat,
    lng: dataCoorUser.lng,
  };

  const distance = haversineFormula(tengkuCoordinates, setUserCoor);
  console.log(
    `Jarak dari posisi1 ke ${setAddressUser} adalah ${distance.toFixed(3)}, km`
  );

  if (distance <= 2) {
    alert(
      `Lokasi berada dalam jangkauan ${distance.toFixed(
        2
      )} km. Pesanan segera diantar`
    );
  } else {
    alert(
      `Lokasi berada dalam diluar jangkauan ${distance.toFixed(
        2
      )} km. silahkan masukkan alamat lain
      `
    );
  }
});

window.initMap();
// buttonAddress.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const addressValue = inputAddress.value;
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
//     addressValue
//   )}&key=AIzaSyD5WvrQddByXcb51HZ5NE_ZYTEZZiWUS_0`;

//   try {
//     const reqCoor = await fetch(url);
//     if (!reqCoor.ok) {
//       throw new Error(`HTTP request error! status: ${reqCoor.status}`);
//     }

//     const resCoor = await reqCoor.json();
//     const dataCoor = resCoor.results[0].geometry.location;
//     const userCoordinates = {
//       lat: dataCoor.lat,
//       lng: dataCoor.lng,
//     };
//     console.log(userCoordinates);

//     const distance = haversineFormula(tengkuCoordinates, userCoordinates);
//     console.log(
//       `Jarak dari rumah Tengku ke ${addressValue} adalah ${distance.toFixed(
//         3
//       )}, km`
//     );

//     if (distance <= 2) {
//       alert("Lokasi berada dalam jangkauan");
//       const p = (document.createElement(
//         "p"
//       ).textContent = `Pesanan diantar dalam 5 menit`);
//       body.append(p);
//     } else {
//       alert("Lokasi berada di luar jangkauan");
//       const p = (document.createElement(
//         "p"
//       ).textContent = `Pesanan tidak dapat diantar karena diluar jangkauan, jarak ${distance.toFixed(
//         2
//       )} km terlalu jauh`);
//       body.append(p);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
