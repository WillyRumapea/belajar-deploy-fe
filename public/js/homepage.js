const toOrder = document.getElementById("toOrderForm");
const buttonLogout = document.getElementById("logoutAccount");
const buttonToLogin = document.getElementById("toLoginForm");
const buttonToRegist = document.getElementById("toRegistForm");
const displayUsername = document.getElementById("usernameDisplay");

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
      renderAuthUI();
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);
    alert("terjadi kesalahan saat logout");
  }
});

async function renderAuthUI() {
  try {
    const reqSession = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/check-session",
      { credentials: "include" }
    );
    const data = await reqSession.json();

    if (data.loggedin) {
      buttonToLogin.classList.add("hidden");
      buttonToRegist.classList.add("hidden");

      displayUsername.textContent = data.username;
      displayUsername.classList.remove("hidden");

      buttonLogout.classList.remove("hidden");
    } else {
      buttonToLogin.classList.remove("hidden");
      buttonToRegist.classList.remove("hidden");

      displayUsername.textContent = "";
      displayUsername.classList.add("hidden");

      buttonLogout.classList.add("hidden");
    }
  } catch (err) {
    console.log(err);
  }
}

renderAuthUI();
