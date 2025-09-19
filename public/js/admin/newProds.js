const formNewProd = document.getElementById("addFormProds");
const btnNewProd = document.getElementById("btnAddNewProd");

btnNewProd.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const data = {
      nama_makanan: formNewProd.nama_makanan.value,
      gambar_makanan: formNewProd.gambar_makanan.value,
      harga_makanan: formNewProd.harga_makanan.value,
    };
    console.log(data);
    const response = await fetch(
      "https://belajar-deploy-api-production.up.railway.app/tambah-makanan",
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
      alert("Berhasil menambahkan makanan");
      window.location.href = "./dashboard.html";
    } else {
      alert("Gagal menambahkan makanan");
    }
  } catch (err) {
    console.log(err);
  }
});
