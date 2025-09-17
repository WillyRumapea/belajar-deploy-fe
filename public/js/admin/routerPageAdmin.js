const routes = {
  dashboard: {
    template: "dashboard.html",
    script: "../../js/admin/getBriefData.js",
  },
  users: {
    template: "usersTable.html",
    script: "../../js/admin/usersTable.js",
  },
  products: {
    template: "prodsTable.html",
    script: "../../js/admin/productsTable.js",
  },
  orders: {
    template: "ordersTable.html",
    script: "../../js/admin/ordersTable.js",
  },
};

async function loadPage(page) {
  if (page === "dashboard") {
    document.getElementById("content").innerHTML = `
      <h2>Dashboard</h2>
      <div class="brief-info"></div>
      <button id="logoutDashboardAdmin">logout</button>
    `;

    const oldScript = document.querySelector(
      `script[src="../../js/admin/getBriefData.js"]`
    );
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.src = "../../js/admin/getBriefData.js";
    script.onload = () => {
      if (typeof initDashboard === "function") {
        initDashboard();
      }
    };
    document.body.appendChild(script);

    const oldLogoutScript = document.querySelector(
      `script[src="../../js/admin/logout.js"]`
    );
    if (oldLogoutScript) oldLogoutScript.remove();

    const logoutScript = document.createElement("script");
    logoutScript.src = "../../js/admin/logout.js";
    logoutScript.onload = () => {
      if (typeof initLogout === "function") {
        initLogout();
      }
    };
    document.body.appendChild(logoutScript);
    return;
  }

  const route = routes[page];
  if (!route) return;

  try {
    const response = await fetch(route.template);
    if (!response.ok) throw new Error("Gagal memuat halaman");
    const html = await response.text();
    document.getElementById("content").innerHTML = html;

    const oldScript = document.querySelector(`script[src="${route.script}"]`);
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.src = route.script;
    document.body.appendChild(script);
  } catch (error) {
    console.error("Error loading page:", error);
  }
}

document.querySelectorAll(".navLink").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

loadPage("dashboard");
