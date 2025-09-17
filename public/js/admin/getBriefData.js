async function initDashboard() {
  const briefInfo = document.querySelector(".brief-info");

  if (!briefInfo) return;

  briefInfo.innerHTML = "";

  try {
    const reqSession = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/check-session",
      {
        credentials: "include",
      }
    );

    if (!reqSession.ok) {
      throw new Error(`Session check failed: ${reqSession.status}`);
    }

    const sessionData = await reqSession.json();

    if (!sessionData.loggedin || sessionData.user.role !== "admin") {
      window.location.href = "../user/formLogin.html";
      return;
    }
  } catch (err) {
    console.error("Error checking session:", err);
    window.location.href = "../user/login.html";
    return;
  }

  async function fetchBriefUsers() {
    try {
      const reqDataUsers = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/daftar-users",
        {
          credentials: "include",
        }
      );

      if (!reqDataUsers.ok) {
        throw new Error(`HTTP error! Status: ${reqDataUsers.status}`);
      }

      const dataJsonUsers = await reqDataUsers.json();
      const dataUsers = dataJsonUsers.data;
      const amountUsers = dataUsers.length;

      const info = document.createElement("div");
      const infoTitle = document.createElement("h3");
      infoTitle.classList.add(
        "font-jost",
        "font-semibold",
        "font-lg",
        "text-earthyBrown",
        "text-center",
        "text-xl"
      );
      const infoText = document.createElement("p");
      infoText.classList.add(
        "font-jost",
        "font-semibold",
        "text-gilled",
        "text-center",
        "text-xl"
      );

      infoTitle.textContent = "Users";
      infoText.textContent = amountUsers;

      info.appendChild(infoTitle);
      info.appendChild(infoText);
      briefInfo.appendChild(info);
    } catch (err) {
      console.error("Error fetch data users:", err);
    }
  }

  async function fetchBriefProds() {
    try {
      const reqDataProds = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/daftar-makanan"
      );

      if (!reqDataProds.ok) {
        throw new Error(`HTTP error! Status: ${reqDataProds.status}`);
      }

      const dataJsonProds = await reqDataProds.json();
      const dataProds = dataJsonProds.data;
      const amountProds = dataProds.length;

      const info = document.createElement("div");
      const infoTitle = document.createElement("h3");
      infoTitle.classList.add(
        "font-jost",
        "font-semibold",
        "font-lg",
        "text-earthyBrown",
        "text-center",
        "text-xl"
      );
      const infoText = document.createElement("p");
      infoText.classList.add(
        "font-jost",
        "font-semibold",
        "text-gilled",
        "text-center",
        "text-xl"
      );

      infoTitle.textContent = "Products";
      infoText.textContent = amountProds;

      info.appendChild(infoTitle);
      info.appendChild(infoText);
      briefInfo.appendChild(info);
    } catch (err) {
      console.error("Error fetch data products:", err);
    }
  }

  // panggil semua fetch
  fetchBriefUsers();
  fetchBriefProds();
}
