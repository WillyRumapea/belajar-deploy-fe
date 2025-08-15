const fetchData = async () => {
  try {
    const reqData = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/daftar-makanan"
    );

    if (!reqData) {
      console.log("cannot fetch data from server");
    }

    const data = await reqData.json();
    console.log(data);

    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td style="border: 1px solid black; padding: 8px;">${item.id_makanan}</td>
            <td style="border: 1px solid black; padding: 8px;">${item.nama_makanan}</td>
            <td style="border: 1px solid black; padding: 8px;">${item.harga_makanan}</td>
            <td style="border: 1px solid black; padding: 8px;">${item.gambar_makanan}</td>
            <td>
                <div>
                    <button style="background-color: #ffed29">Update!</button>
                    <button style="background-color: #ff1919>Delete</button>
                </div>
            </td>
        `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.log(err);
  }
};

fetchData();
