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
      info.style.border = "1.3px solid #c24319";
      info.style.padding = "5px";
      info.style.borderRadius = "8px";
      info.style.display = "flex";
      info.style.flexDirection = "column";
      info.style.alignItems = "center";
      info.style.justifyContent = "center";
      info.style.width = "150px";
      info.style.height = "80px";
      info.style.gap = "3.4px";
      info.style.backgroundColor = "#fffceb";
      const infoTitle = document.createElement("h3");
      infoTitle.style.color = "#c24319";
      const infoText = document.createElement("p");
      infoText.style.color = "#c24319";

      infoTitle.textContent = "Users";
      infoText.textContent = amountUsers;

      info.appendChild(infoTitle);
      info.appendChild(infoText);
      briefInfo.appendChild(info);
    } catch (err) {
      console.error("Error fetch data users:", err);
    }
  }

  async function fetchBriefPesanan() {
    try {
      const reqDataPesanan = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/daftar-pesanan",
        {
          credentials: "include",
        }
      );

      if (!reqDataPesanan.ok) {
        throw new Error(`HTTP error! Status: ${reqDataPesanan.status}`);
      }

      const dataJsonPesanan = await reqDataPesanan.json();
      const dataPesanan = dataJsonPesanan.data;
      const amountPesanan = dataPesanan.length;

      const info = document.createElement("div");
      info.style.border = "1.3px solid #c24319";
      info.style.padding = "5px";
      info.style.borderRadius = "8px";
      info.style.display = "flex";
      info.style.flexDirection = "column";
      info.style.alignItems = "center";
      info.style.justifyContent = "center";
      info.style.width = "150px";
      info.style.height = "80px";
      info.style.gap = "3.4px";
      info.style.backgroundColor = "#fffcf5";
      const infoTitle = document.createElement("h3");
      infoTitle.style.color = "#c24319";
      const infoText = document.createElement("p");
      infoText.style.color = "#c24319";

      infoTitle.textContent = "Orders";
      infoText.textContent = amountPesanan;

      info.appendChild(infoTitle);
      info.appendChild(infoText);
      briefInfo.appendChild(info);
    } catch (err) {
      console.error("Error fetch data products:", err);
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
      info.style.border = "1.3px solid #c24319";
      info.style.padding = "5px";
      info.style.borderRadius = "8px";
      info.style.display = "flex";
      info.style.flexDirection = "column";
      info.style.alignItems = "center";
      info.style.justifyContent = "center";
      info.style.width = "150px";
      info.style.height = "80px";
      info.style.gap = "3.4px";
      info.style.backgroundColor = "#fffcf5";
      const infoTitle = document.createElement("h3");
      infoTitle.style.color = "#c24319";
      const infoText = document.createElement("p");
      infoText.style.color = "#c24319";

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
  fetchBriefPesanan();
  fetchBriefProds();
}
