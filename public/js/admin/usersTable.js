(() => {
  const formUpdateUser = document.getElementById("form-update-user");
  async function fetchUserData() {
    try {
      const reqDataUsers = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/daftar-users",
        {
          credentials: "include",
        }
      );

      if (!reqDataUsers.ok) {
        throw new Error(`HTTP error! Status: ${reqDataUsers.status}`);
      }
      const dataJsonUsers = await reqDataUsers.json();
      console.log(dataJsonUsers);
      const dataUser = dataJsonUsers.data;
      console.log(dataUser);

      const tbody = document.getElementsByClassName("tbody")[0];

      tbody.innerHTML = "";

      dataUser.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.users_id}</td>
          <td>${item.users_name}</td>
          <td>${item.users_password}</td>
          <td>${item.users_role}</td>
          <td>
              <div>
                  <button class="update-user" data-id=${item.users_id}>update</button>
                  <button class="hapus-user" data-id=${item.users_id}>hapus</button>
              </div>
          </td>
      `;
        tbody.appendChild(row);
      });
      const updatesUserButton = document.querySelectorAll(".update-user");
      const deleteUserButtons = document.querySelectorAll(".hapus-user");

      updatesUserButton.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const idUser = e.target.dataset.id;
          const rowDataUser = e.target.closest("tr");
          const nama_user = rowDataUser.cells[1].textContent;
          const password_user = rowDataUser.cells[2].textContent;
          const role_user = rowDataUser.cells[3].textContent;

          formUpdateUser.style.display = "block";

          const inputIdUser = formUpdateUser.querySelector(
            "input[name='users_id']"
          );
          const oldInputNamaUser = formUpdateUser.querySelector(
            "input[name='users_name']"
          );
          const oldInputPasswordUser = formUpdateUser.querySelector(
            "input[name='users_password']"
          );
          const oldInputRoleUser = formUpdateUser.querySelector(
            "input[name='users_role']"
          );

          inputIdUser.setAttribute("value", idUser);
          oldInputNamaUser.value = nama_user;
          oldInputPasswordUser.value = password_user;
          oldInputRoleUser.value = role_user;
        });
      });
      deleteUserButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          e.preventDefault();

          const idUser = e.target.dataset.id;

          try {
            const responseDelete = await fetch(
              `https://belajar-deploy-api-production.up.railway.app/hapus-user/${idUser}`,
              {
                method: "DELETE",
                credentials: "include",
              }
            );
            const resultDelete = await responseDelete.json();
            if (resultDelete.success) {
              alert("User berhasil dihapus");
              e.target.closest("tr").remove();
              console.log(resultDelete);
            } else {
              alert("User gagal dihapus" + resultDelete.message);
            }
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {
      console.log("Error fetching data", err);
    }
  }

  formUpdateUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const data = {
        users_id: formUpdateUser.querySelector("input[name='users_id']").value,
        users_name: formUpdateUser.querySelector("input[name='users_name']")
          .value,
        users_password: formUpdateUser.querySelector(
          "input[name='users_password']"
        ).value,
        users_role: formUpdateUser.querySelector("input[name='users_role']")
          .value,
      };
      console.log(data);
      const resUpdate = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/update-user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (resUpdate.ok) {
        alert("user berhasil di update");
        fetchUserData();
        formUpdateUser.style.display = "none";
      }
    } catch (err) {
      alert("user gagal di update");
      console.log(err);
    }
  });

  fetchUserData();
})();
