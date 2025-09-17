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
  const route = routes[page];
  if (!route) return;

  try {
    const response = await fetch(route.template);
    if (!response.ok) throw new Error("Gagal memuat halaman");
    const html = await response.text();
    document.getElementById("content").innerHTML = html;

    // Hapus script lama kalau ada
    const oldScript = document.querySelector(`script[src="${route.script}"]`);
    if (oldScript) oldScript.remove();

    // Tambah script baru
    const script = document.createElement("script");
    script.src = route.script;
    script.onload = () => {
      if (typeof initDashboard === "function" && page === "dashboard") {
        initDashboard();
      }
      if (typeof initLogout === "function" && page === "dashboard") {
        initLogout();
      }
    };
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

// Default load ke dashboard
loadPage("dashboard");
