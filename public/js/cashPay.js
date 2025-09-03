const formOrderCash = document.getElementById("form-order");
const buttonCash = document.getElementById("cash-button");

buttonCash.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const dataOrder = {
      orders_id: "ORDER" + Date.now() + Math.floor(Math.random() * 1000),
      orders_customer: formOrderCash.first_name,
      orders_menu: parseInt(formOrderCash.orders_menu),
      orders_amount: parseInt(formOrderCash.orders_amount),
      orders_total_price: parseInt(formOrderCash.gross_amount),
    };
    console.log(dataOrder);
    const reqOrder = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/pesan-makanan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataOrder),
      }
    );

    if (reqOrder.ok) {
      const result = await reqOrder.json();
      console.log(result);
      alert("Terimakasih sudah memesan, silahkan tunggu!");
      window.location.href = "./waitingDelivery.html";
    } else {
      alert("Maaf pesanan anda gagal di proses!");
    }
  } catch (err) {
    console.log(err);
  }
});
