const toOrder = document.getElementById("toOrderForm");

toOrder.addEventListener("click", async (e) => {
  e.preventDefault();
  const reqSession = await fetch(
    "https://belajar-deploy-api-production.up.railway.app/check-session",
    {
      credentials: "include",
    }
  );

  const data = await reqSession.json();

  if (!data.loggedin) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = "./page/formLogin.html";
    return;
  }

  window.location.href = "page/order.html";
});
