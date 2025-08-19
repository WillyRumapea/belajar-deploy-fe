const fetchDataProds = async () => {
  const reqDataProds = await fetch(
    "https://belajar-deploy-api-production.up.railway.app/daftar-makanan"
  );

  if (!reqDataProds.ok) {
    throw new Error(`HTTP error! Status: ${reqDataProds.status}`);
  }

  const dataJson = await reqDataProds.json();
  console.log(dataJson);
  const dataProducts = dataJson.data;
  console.log(dataUsers);

  const tbody = document.getElementsByClassName("tbody")[0];

  tbody.innerHTML = "";

  dataProducts.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td style="border: 1px solid black; padding: 8px;">${item.id_makanan}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.nama_makanan}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.harga_makanan}</td>
        <td style="border: 1px solid black; padding: 8px;">
            <div>
                <button>update</button>
                <button>hapus</button>
            </div>
        </td>
    `;
    tbody.appendChild(row);
  });
};

fetchDataProds();
