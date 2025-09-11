const buttonLogout = document.getElementById("logoutAccount");

buttonLogout.addEventListener("click", async (e) => {
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
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);
    alert("tejadi kesalahan saat logout");
  }
});
