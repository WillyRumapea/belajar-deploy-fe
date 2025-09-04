const fetchDataOrders = async () => {
  const reqDataOrders = await fetch(
    "https://belajar-deploy-api-production.up.railway.app/daftar-pesanan"
  );

  if (!reqDataOrders.ok) {
    throw new Error(`HTTP error! Status: ${reqDataOrders.status}`);
  }

  const dataJson = await reqDataOrders.json();
  const dataOrders = dataJson.data;

  const tbody = document.getElementsByClassName("tbody")[0];

  tbody.innerHTML = "";

  dataOrders.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td style="border: 1px solid black; padding: 8px;">${item.orders_id}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.orders_customer}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.orders_menu}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.orders_amount}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.orders_total_price}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.orders_status}</td>
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

fetchDataOrders();
