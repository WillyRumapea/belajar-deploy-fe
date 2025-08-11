const formRegist = document.getElementById("formRegist");
const buttonRegist = document.getElementById("buttonRegis");

buttonRegist.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const data = {
      users_name: formRegist.username.value,
      users_password: formRegist.password.value,
    };
    const response = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/regist",
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
      alert("berhasil regist! silahkan login");
      console.log("Login Success!");
    } else {
      alert("username sudah pernah digunakan! silahkan ganti");
    }
  } catch (err) {
    console.log(err);
  }
});
