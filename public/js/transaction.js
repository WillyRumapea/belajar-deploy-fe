const formOrder = document.getElementById("form-order");
const cashlessButton = document.getElementById("cashless-button");

cashlessButton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const reqToken = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: "ORDER" + Date.now(),
          gross_amount: parseInt(formOrder.gross_amount.value),
          first_name: formOrder.first_name.value,
        }),
      }
    );

    const response = await reqToken.json();
    console.log(response);

    if (response.token) {
      window.snap.pay(response.token, {
        onSuccess: function (response) {
          console.log("Payment success!");
          // redirect atau tampilkan notif sukses
          alert("payment sucess, thanks for order!");
          window.location.href = "./waitingDelivery.html";
        },
        onPending: function (response) {
          console.log("Payment pending", response);
          // bisa redirect ke halaman status pembayaran
        },
        onError: function (response) {
          console.log("Payment error", response);
          // kasih tahu user kalau gagal
        },
        onClose: function () {
          console.log("User closed the popup without finishing the payment");
        },
      });
    }
  } catch (err) {
    console.log("Error fetch token:", err);
  }
});
