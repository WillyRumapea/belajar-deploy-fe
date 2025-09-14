function initLogout() {
  const buttonLogoutAdmin = document.getElementById("logoutDashboardAdmin");
  if (!buttonLogoutAdmin) return;

  if (buttonLogoutAdmin.dataset.listenerAttached === "true") return;

  buttonLogoutAdmin.addEventListener("click", async (e) => {
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
        window.location.href = "../../index.html";
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
      alert("terjadi kesalahan saat logout");
    }
  });
  buttonLogoutAdmin.dataset.listenerAttached = "true";
}
