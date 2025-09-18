(() => {
  const formUpdateOrder = document.getElementById("form-update-orders");
  async function fetchOrdersData() {
    try {
      const reqDataOrders = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/daftar-pesanan",
        {
          credentials: "include",
        }
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
            <div class
            ="action-buttons-orders">
                <button class="update-orders" data-id=${item.orders_id}>update</button>
                <button class="delete-orders" data-id=${item.orders_id}>hapus</button>
            </div>
        </td>
    `;
        tbody.appendChild(row);
      });
      const updateOrdersButtons = document.querySelectorAll(".update-orders");
      console.log(updateOrdersButtons);
      const deleteOrdersButtons = document.querySelectorAll(".delete-orders");
      console.log(deleteOrdersButtons);

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

          formUpdateOrder.style.display = "block";

          const inputIdOrder = formUpdateOrder.querySelector(
            "input[name='orders_id']"
          );
          const oldInputOrderCustomer = formUpdateOrder.querySelector(
            "input[name='orders_customer']"
          );
          const oldInputOrderMenu = formUpdateOrder.querySelector(
            "input[name='orders_menu']"
          );
          const oldInputOrderAmount = formUpdateOrder.querySelector(
            "input[name='orders_amount']"
          );
          const oldInputOrderTotalPrice = formUpdateOrder.querySelector(
            "input[name='orders_total_price']"
          );
          const oldInputOrderStatus = formUpdateOrder.querySelector(
            "input[name='orders_status']"
          );

          inputIdOrder.setAttribute("value", idOrder);
          oldInputOrderCustomer.value = order_customer;
          oldInputOrderMenu.value = order_menu;
          oldInputOrderAmount.value = order_amount;
          oldInputOrderTotalPrice.value = order_total_price;
          oldInputOrderStatus.checked = order_status == "1";
        });
      });

      deleteOrdersButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          e.preventDefault();

          const idOrder = e.target.dataset.id;

          try {
            const responseDelete = await fetch(
              `https://belajar-deploy-api-production.up.railway.app/hapus-order/${idOrder}`,
              {
                method: "DELETE",
                credentials: "include",
              }
            );
            const resultDelete = await responseDelete.json();
            if (resultDelete.success) {
              alert("Order berhasil dihapus");
              e.target.closest("tr").remove();
              console.log(resultDelete);
            } else {
              alert("Order gagal dihapus" + resultDelete.message);
            }
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {
      console.log("Error fetching data", err);
    }
  }

  formUpdateOrder.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const data = {
        orders_id: formUpdateOrder.querySelector("input[name='orders_id']")
          .value,
        orders_customer: formUpdateOrder.querySelector(
          "input[name='orders_customer']"
        ).value,
        orders_menu: formUpdateOrder.querySelector("input[name='orders_menu']")
          .value,
        orders_amount: formUpdateOrder.querySelector(
          "input[name='orders_amount']"
        ).value,
        orders_total_price: formUpdateOrder.querySelector(
          "input[name='orders_total_price']"
        ).value,
        orders_status: formUpdateOrder.querySelector(
          "input[name='orders_status']"
        ).checked
          ? 1
          : 0,
      };
      console.log(data);

      const resUpdate = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/update-order",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (resUpdate.ok) {
        alert("order data berhasil di update");
        fetchOrdersData();
        formUpdateOrder.style.display = "none";
      }
    } catch (err) {
      alert("data user gagal di update");
      console.log("Err", err);
    }
  });

  fetchOrdersData();
})();
