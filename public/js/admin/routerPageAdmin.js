const infoBrief = document.querySelector(".brief-info");

async function loadPage(page) {
  if (page === "dashboard") {
    return;
  } else if (page === "users") {
    try {
      const res = await fetch("./usersTable.html");
      const html = await res.text();

      infoBrief.innerHTML = html;

      const script = document.createElement("script");
      script.setAttribute("src", "../../js/admin/usersTable.js");
      document.body.appendChild(script);
    } catch (err) {
      infoBrief.innerHTML = `<p style="color:red;">Error load users: ${err.message}</p>`;
    }
  } else if (page === "products") {
    try {
      const res = await fetch("./prodsTable.html");
      const html = await res.text();

      infoBrief.innerHTML = html;

      const script = document.createElement("script");
      script.setAttribute("src", "../../js/admin/productsTable.js");
      document.body.appendChild(script);
    } catch (err) {
      infoBrief.innerHTML = `<p style="color:red;">Error load products: ${err.message}</p>`;
    }
  }
}

document.querySelectorAll(".navLink").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});
