const toOrder = document.getElementById("toOrderForm");
const buttonLogout = document.getElementById("logoutAccount");

toOrder.addEventListener("click", async (e) => {
  e.preventDefault();
  const reqSession = await fetch(
    "https://belajar-deploy-api-production.up.railway.app/check-session",
    {
      credentials: "include",
    }
  );

  const data = await reqSession.json();
  console.log(data);

  if (!data.loggedin) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = "./page/user/formLogin.html";
    return;
  }

  window.location.href = "./page/user/order.html";
});

buttonLogout.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const destroySession = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const result = await destroySession.json();

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);
    alert("tejadi kesalahan saat logout");
  }
});
