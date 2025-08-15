const fetchData = async () => {
  try {
    const reqData = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/daftar-makanan"
    );

    if (!reqData) {
      console.log("cannot fetch data from server");
    }

    const data = await reqData.json();
    console.log(data);
    const tbody = document.getElementById("tbody");
  } catch (err) {
    console.log(err);
  }
};

fetchData();
