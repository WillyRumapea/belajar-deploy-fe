(() => {
  const formUpdateMakanan = document.getElementById("form-update-makanan");
  async function fetchProdsData() {
    try {
      const reqDataProds = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/daftar-makanan"
      );

      if (!reqDataProds.ok) {
        throw new Error(`HTTP error! Status: ${reqDataProds.status}`);
      }

      const dataJson = await reqDataProds.json();
      const dataProducts = dataJson.data;

      const tbody = document.getElementsByClassName("tbody")[0];

      tbody.innerHTML = "";

      dataProducts.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td style="border: 1px solid black; padding: 8px;">${item.id_makanan}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.nama_makanan}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.gambar_makanan}</td>
        <td style="border: 1px solid black; padding: 8px;">${item.harga_makanan}</td>
        <td style="border: 1px solid black; padding: 8px;">
            <div class="action-buttons-makanan">
                <button class="update-makanan" data-id=${item.id_makanan}>update</button>
                <button class="hapus-makanan" data-id=${item.id_makanan}>hapus</button>
            </div>
        </td>
    `;
        tbody.appendChild(row);
      });
      const updatesMakananButton = document.querySelectorAll(".update-makanan");
      console.log(updatesMakananButton);
      const deleteProductButtons = document.querySelectorAll(".hapus-makanan");
      console.log(deleteProductButtons);

      updatesMakananButton.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const idMakanan = e.target.dataset.id;
          const rowDataMakanan = e.target.closest("tr");
          const nama_makanan = rowDataMakanan.cells[1].textContent;
          const gambar_makanan = rowDataMakanan.cells[2].textContent;
          const harga_makanan = rowDataMakanan.cells[3].textContent;

          formUpdateMakanan.style.display = "block";

          const inputIdMakanan = formUpdateMakanan.querySelector(
            "input[name='id_makanan']"
          );
          const oldInputNamaMakanan = formUpdateMakanan.querySelector(
            "input[name='nama_makanan']"
          );
          const oldInputGambarMakanan = formUpdateMakanan.querySelector(
            "input[name='gambar_makanan']"
          );
          const oldInputHargaMakanan = formUpdateMakanan.querySelector(
            "input[name='harga_makanan']"
          );

          inputIdMakanan.setAttribute("value", idMakanan);
          oldInputNamaMakanan.value = nama_makanan;
          oldInputGambarMakanan.value = gambar_makanan;
          oldInputHargaMakanan.value = harga_makanan;
        });
      });
      deleteProductButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          e.preventDefault();

          const idProds = e.target.dataset.id;

          try {
            const responseDelete = await fetch(
              `https://belajar-deploy-api-production.up.railway.app/hapus-makanan/${idProds}`,
              {
                method: "DELETE",
                credentials: "include",
              }
            );
            const resultDelete = await responseDelete.json();
            if (resultDelete.success) {
              alert("Product berhasil dihapus");
              e.target.closest("tr").remove();
              console.log(resultDelete);
            } else {
              alert("Product gagal dihapus" + resultDelete.message);
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

  formUpdateMakanan.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const data = {
        id_makanan: formUpdateMakanan.querySelector("input[name='id_makanan']")
          .value,
        nama_makanan: formUpdateMakanan.querySelector(
          "input[name='nama_makanan']"
        ).value,
        gambar_makanan: formUpdateMakanan.querySelector(
          "input[name='gambar_makanan']"
        ).value,
        harga_makanan: formUpdateMakanan.querySelector(
          "input[name='harga_makanan']"
        ).value,
      };
      console.log(data);
      const resUpdate = await fetch(
        "https://belajar-deploy-api-production.up.railway.app/update-makanan",
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
        alert("makanan berhasil di update");
        fetchProdsData();
        formUpdateMakanan.style.display = "none";
      }
    } catch (err) {
      alert("makanan gagal di update");
      console.log("Err", err);
    }
  });

  fetchProdsData();
})();
