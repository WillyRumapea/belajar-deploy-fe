const formLogin = document.getElementById("formLogin");
const buttonLogin = document.getElementById("buttonLogin");

buttonLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const data = {
      users_name: formLogin.username.value,
      users_password: formLogin.password.value,
    };
    const response = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log(result);

      if (result.user.role === "admin") {
        alert("Wellcome back Admin!");
        console.log("Login Success!");
        window.location.href = "../admin/dashboard.html";
      } else if (result.user.role === "user") {
        alert("berhasil login");
        console.log("Login Success!");
        window.location.href = "../../index.html";
      }
    } else {
      alert("username atau password salah!");
    }
  } catch (err) {
    console.log(err);
  }
});
