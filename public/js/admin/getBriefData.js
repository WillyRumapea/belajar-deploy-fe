const briefInfo = document.querySelector(".brief-info");
const dataUser = async () => {
  try {
    const reqDataUsers = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/daftar-users"
    );

    if (!reqDataUsers.ok) {
      throw new Error(`HTTP error! Status: ${reqDataUsers.status}`);
    }

    const data = await reqDataUsers.json();
    const dataUsers = data.users;
    const amountUsers = dataUsers.length;
    console.log("Total users:", amountUsers);

    const info = document.createElement("div");
    const infoTitle = document.createElement("h3");
    const infoText = document.createElement("p");

    infoTitle.textContent = "User";
    infoText.textContent = amountUsers;

    info.appendChild(infoText);
    info.appendChild(infoTitle);
    briefInfo.appendChild(info);
  } catch (err) {
    console.log("Error fetch data", err);
  }
};

const dataProds = async () => {
  try {
    const reqDataProds = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/daftar-makanan"
    );

    if (!reqDataProds.ok) {
      throw new Error(`HTTP error, Status: ${reqDataProds.status}`);
    }

    const dataProds = await reqDataProds.json();
    const amountProds = dataProds.length;
    console.log("Total products:", amountProds);

    const info = document.createElement("div");
    const infoTitle = document.createElement("h3");
    const infoText = document.createElement("p");

    infoTitle.textContent = "Products";
    infoText.textContent = amountProds;

    info.appendChild(infoText);
    info.appendChild(infoTitle);
    briefInfo.appendChild(info);
  } catch (err) {
    console.log("Error fetch data products", er);
  }
};

briefInfo.innerHTML = "";

dataUser();
dataProds();
