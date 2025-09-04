const routes = {
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
    `;
    if (typeof initDashboard === "function") {
      initDashboard();
    }
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
