const infoBrief = document.querySelector(".brief-info");

async function loadPage(page) {
  if (page === "dashboard") {
    return;
  }

  let fileHtml = "";
  let scriptSrc = "";

  if (page === "users") {
    fileHtml = "./usersTable.html";
    scriptSrc = "../../js/admin/usersTable.js";
  } else if (page === "products") {
    fileHtml = "./prodsTable.html";
    scriptSrc = "../../js/admin/productsTable.js";
  } else if (page === "orders") {
    fileHtml = "./ordersTable.html";
    scriptSrc = "../../js/admin/ordersTable.js";
  }

  try {
    const res = await fetch(fileHtml);
    const html = await res.text();
    infoBrief.innerHTML = html;

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      document.body.appendChild(script);
    }
  } catch (err) {
    infoBrief.innerHTML = `<p style="color:red;">Error load ${page}: ${err.message}</p>`;
  }
}

document.querySelectorAll(".navLink").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});
