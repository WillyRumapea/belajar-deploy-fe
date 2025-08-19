const fetchDataUser = async () => {
  const reqDataUsers = await fetch(
    "https://belajar-deploy-api-production.up.railway.app/daftar-users"
  );

  if (!reqDataUsers.ok) {
    throw new Error(`HTTP error! Status: ${reqDataUsers.status}`);
  }

  const data = await reqDataUsers.json();
  const dataUser = data.users;
  console.log(dataUser);

  const tbody = document.getElementsByClassName("tbody")[0];

  tbody.innerHTML = "";

  dataUser.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td style="border: 1px solid black; padding: 8px;">${item.id_users}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.user}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.password}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.role}</td>
        <td style="border: 1px solid black; padding: 8px;">
            <div>
                <button>update</button>
                <button>hapus</button>
            </div>
        </td>
    `;
    tbody.appendChild(row);
  });
};

fetchDataUser();
