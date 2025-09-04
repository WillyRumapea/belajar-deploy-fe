const routes = {
  users: {
    template: "../../pages/admin/usersTable.html",
    script: "../../js/admin/usersTable.js",
  },
  products: {
    template: "../../pages/admin/prodsTable.html",
    script: "../../js/admin/productsTable.js",
  },
  orders: {
    template: "../../pages/admin/ordersTable.html",
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

    if (!document.querySelector(`script[src="${route.script}"]`)) {
      const script = document.createElement("script");
      script.src = route.script;
      document.body.appendChild(script);

      script.onload = () => {
        callInitFunction(page);
      };
    } else {
      callInitFunction(page);
    }
  } catch (error) {
    console.error("Error loading page:", error);
  }
}

function callInitFunction(page) {
  if (page === "users" && typeof fetchUserData === "function") {
    fetchUserData();
  } else if (page === "products" && typeof fetchProdsData === "function") {
    fetchProdsData();
  } else if (page === "orders" && typeof fetchOrdersData === "function") {
    fetchOrdersData();
  } else if (page === "dashboard" && typeof initDashboard === "function") {
    initDashboard();
  }
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

loadPage("dashboard");
