const formOrderCash = document.getElementById("form-order");
const buttonCash = document.getElementById("cash-button");

buttonCash.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const inputDetailProdName = document.querySelectorAll(
      "input[name='orders_menu']"
    );
    const inputDetailProdAmount = document.querySelectorAll(
      "input[name='orders_amount']"
    );
    console.log(inputDetailProdName);
    console.log(inputDetailProdAmount);

    let menuList = [];
    let totalAmount = 0;

    inputDetailProdName.forEach((menuInput, index) => {
      const amountInput = inputDetailProdAmount[index];
      const menuName = menuInput.value;
      const amount = parseInt(amountInput.value);

      console.log("Menu:", menuName, "Amount:", amount);

      if (menuName && amount > 0) {
        menuList.push(menuName);
        totalAmount += amount;
      }
    });

    const dataOrder = {
      orders_id: "ORDER" + Date.now() + Math.floor(Math.random() * 1000),
      orders_customer: formOrderCash.first_name.value,
      orders_menu: menuList.join(","),
      orders_amount: totalAmount,
      orders_total_price: parseInt(formOrderCash.gross_amount.value),
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
    console.log(reqOrder);
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
