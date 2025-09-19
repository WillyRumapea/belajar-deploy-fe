const formNewOrder = document.getElementById("addFormOrders");
const btnNewOrder = document.getElementById("btnAddNewOrders");

btnNewOrder.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const data = {
      orders_id: formNewOrder.orders_id.value,
      orders_customer: formNewOrder.orders_customer.value,
      orders_menu: formNewOrder.ordersmenu.value,
      orders_amount: formNewOrder.orders_amount.value,
      orders_total_price: formNewOrder.orders_total_price.value,
      orders_status: formNewOrder.orders_status.value,
    };

    const response = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/tambah-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    if (response.ok) {
      alert("Berhasil menambahkan order");
      window.location.href = "./dashboard.html";
    } else {
      alert("Gagal menambahkan order");
    }
  } catch (err) {
    console.log(err);
  }
});
