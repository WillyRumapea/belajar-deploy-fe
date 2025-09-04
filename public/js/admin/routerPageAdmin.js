const routes = {
  users: {
    template: "../../pages/admin/users.html",
    script: "../../js/admin/usersTable.js",
  },
  products: {
    template: "../../pages/admin/products.html",
    script: "../../js/admin/prodsTable.js",
  },
  orders: {
    template: "../../pages/admin/orders.html",
    script: "../../js/admin/ordersTable.js",
  },
};

async function loadPage(page) {
  if (page === "dashboard") {
    try {
      const response = await fetch("../../pages/admin/dashboard.html");
      if (!response.ok) throw new Error("Gagal memuat dashboard");
      const html = await response.text();
      document.getElementById("content").innerHTML = html;
    } catch (error) {
      console.error("Error loading dashboard:", error);
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

    if (!document.querySelector(`script[src="${route.script}"]`)) {
      const script = document.createElement("script");
      script.src = route.script;
      document.body.appendChild(script);
    }
  } catch (error) {
    console.error("Error loading page:", error);
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
