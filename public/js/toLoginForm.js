const toLoginForm = document.getElementById("toLoginForm");
const toRegistForm = document.getElementById("toRegistForm");

toLoginForm.addEventListener("click", () => {
  document.location.href = "./page/formLogin.html";
});

toRegistForm.addEventListener("click", () => {
  document.location.href = "./page/formRegist.html";
});
