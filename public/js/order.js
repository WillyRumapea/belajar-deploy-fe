import { getData } from "./fetch-data.js";

const tengkuCoordinates = {
  lat: 3.5666864,
  lng: 98.6932378,
};

const buttonAddOrder = document.getElementById("button-add-order");
const listMenu = document.getElementById("list-menu");
const orderedList = document.getElementById("ordered-list");
const amountPrice = document.getElementById("amount-price");
const inputAddress = document.getElementById("address");
const buttonAddress = document.getElementById("searchAddres");
const buttonCheck = document.getElementById("checkDistance");
const body = document.body;
amountPrice.value = 0;

let map;
let marker;

buttonAddOrder.addEventListener("click", (e) => {
  e.preventDefault();
  listMenu.style.display = "block";
});

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

const getDataFetch = async () => {
  const prods = await getData();
  console.log(prods);
  prods.forEach((prod) => {
    const cardMenu = document.createElement("div");
    const nameProd = document.createElement("h3");
    const priceProd = document.createElement("h5");
    const imgProd = document.createElement("img");
    const buttonAddProd = document.createElement("button");

    nameProd.textContent = prod.nama_makanan;
    priceProd.textContent = prod.harga_makanan;
    imgProd.setAttribute("src", `../../image/${prod.gambar_makanan}`); // kalau local ganti jadi image/${prod.gambar_makanan} aja
    imgProd.style.width = "150px";
    imgProd.style.height = "100px";
    buttonAddProd.textContent = "tambahkan";
    buttonAddProd.setAttribute("data-id", prod.id_makanan);

    buttonAddProd.addEventListener("click", () => {
      const idProd = parseInt(buttonAddProd.getAttribute("data-id"));
      console.log(idProd);
      const selectedMenu = prods.find((item) => item.id_makanan === idProd);
      console.log(selectedMenu);

      if (selectedMenu) {
        const existingMenu = orders.find(
          (item) => item.id === selectedMenu.id_makanan
        );
        if (existingMenu) {
          return;
        } else {
          const detailNameProd = document.createElement("p");
          const detailPriceProd = document.createElement("p");
          const orderedMenu = document.createElement("div");
          const qtyWrapper = document.createElement("div");
          const btnMin = document.createElement("button");
          const inputQty = document.createElement("input");
          inputQty.setAttribute("type", "number");
          inputQty.min = 1;
          inputQty.value = 1;
          const btnPls = document.createElement("button");

          detailNameProd.textContent = selectedMenu.nama_makanan;
          detailPriceProd.textContent = selectedMenu.harga_makanan;
          btnMin.textContent = "-";
          btnPls.textContent = "+";

          btnPls.addEventListener("click", (e) => {
            e.preventDefault();
            inputQty.value = parseInt(inputQty.value) + 1;

            const index = orders.findIndex(
              (item) => item.id === selectedMenu.id_makanan
            );
            if (index !== -1) {
              orders[index].qty = parseInt(inputQty.value);
              updatePrice();
            }
          });

          btnMin.addEventListener("click", (e) => {
            e.preventDefault();
            if (parseInt(inputQty.value) > 1) {
              inputQty.value = parseInt(inputQty.value) - 1;
              const index = orders.findIndex(
                (item) => item.id === selectedMenu.id_makanan
              );
              if (index !== -1) {
                orders[index].qty = parseInt(inputQty.value);
                updatePrice();
              }
            }
          });

          orderedMenu.appendChild(detailNameProd);
          orderedMenu.appendChild(detailPriceProd);

          qtyWrapper.appendChild(btnMin);
          qtyWrapper.appendChild(inputQty);
          qtyWrapper.appendChild(btnPls);

          orderedList.appendChild(orderedMenu);
          orderedList.appendChild(qtyWrapper);

          orders.push({
            id: selectedMenu.id_makanan,
            harga: parseInt(selectedMenu.harga_makanan),
            qty: 1,
          });
          console.log(orders);

          updatePrice();
        }
      }
    });

    cardMenu.appendChild(nameProd);
    cardMenu.appendChild(imgProd);
    cardMenu.appendChild(priceProd);
    cardMenu.appendChild(buttonAddProd);

    const listMenuCard = document.getElementById("list-card-menu");
    listMenuCard.appendChild(cardMenu);
  });
};

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

window.initMap = initMap;

let orders = [];

const updatePrice = () => {
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );
  amountPrice.value = totalPrice;
  console.log(totalPrice);
};

getDataFetch();
