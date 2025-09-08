(() => {
  const formUpdateUser = document.getElementById("form-update-orders");
  async function fetchOrdersData() {
    try {
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
                <button class="update-orders" data-id=${item.orders_id}>update</button>
                <button class="delete-orders" data-id=${item.orders_id}>hapus</button>
            </div>
        </td>
    `;
        tbody.appendChild(row);
      });
      const updateOrdersButtons = document.querySelectorAll(".update-orders");
      console.log(updateOrdersButtons);

      updateOrdersButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const idOrder = e.target.dataset.id;
          const rowDataOrder = e.target.closest("tr");
          const order_customer = rowDataOrder.cells[1].textContent;
          const order_menu = rowDataOrder.cells[2].textContent;
          const order_amount = rowDataOrder.cells[3].textContent;
          const order_total_price = rowDataOrder.cells[4].textContent;
          const order_status = rowDataOrder.cells[5].textContent;

          formUpdateUser.style.display = "block";

          const inputIdOrder = formUpdateUser.querySelector(
            "input[name='orders_id'"
          );
          const oldInputOrderCustomer = formUpdateUser.querySelector(
            "input[name='orders_customer'"
          );
          const oldInputOrderMenu = formUpdateUser.querySelector(
            "input[name='orders_menu'"
          );
          const oldInputOrderAmount = formUpdateUser.querySelector(
            "input[name='orders_amount'"
          );
          const oldInputOrderTotalPrice = formUpdateUser.querySelector(
            "input[name='orders_total_price'"
          );
          const oldInputOrderStatus = formUpdateUser.querySelector(
            "input[name='orders_status'"
          );

          inputIdOrder.setAttribute("value", idOrder);
          oldInputOrderCustomer.value = order_amount;
          oldInputOrderMenu.value = order_menu;
          oldInputOrderAmount.value = order_amount;
          oldInputOrderTotalPrice.value = order_total_price;
          oldInputOrderStatus.value = order_status;
        });
      });
    } catch (err) {
      console.log("Error fetching data", err);
    }
  }

  formUpdateUser.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const data = {
        orders_id: formUpdateUser.querySelector("input[name='orders_id'"),
        orders_customer: formUpdateUser.querySelector(
          "input[name='orders_customer'"
        ),
        orders_menu: formUpdateUser.querySelector("input[name='orders_menu'"),
        orders_amount: formUpdateUser.querySelector(
          "input[name='orders_amount'"
        ),
        orders_total_pice: formUpdateUser.querySelector(
          "input[name='orders_total_price'"
        ),
        orders_status: formUpdateUser.querySelector(
          "input[name='orders_status'"
        ),
      };
      console.log(data);

      const resUpdate = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/update-order",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (resUpdate.ok) {
        alert("order data berhasil di update");
        fetchOrdersData();
        formUpdateUser.style.display = "none";
      }
    } catch (err) {
      alert("data user gagal di update");
      console.log("Err", err);
    }
  });

  fetchOrdersData();
})();
