const toLoginForm = document.getElementById("toLoginForm");
const toRegistForm = document.getElementById("toRegistForm");

toLoginForm.addEventListener("click", () => {
  document.location.href = "./page/user/formLogin.html";
});

toRegistForm.addEventListener("click", () => {
  document.location.href = "./page/user/formRegist.html";
});
