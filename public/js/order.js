import { getData } from "./fetch-data.js";

const buttonAddOrder = document.getElementById("button-add-order");
const listMenu = document.getElementById("list-menu");
const orderedList = document.getElementById("ordered-list");
const amountPrice = document.getElementById("amount-price");
amountPrice.value = 0;

buttonAddOrder.addEventListener("click", (e) => {
  e.preventDefault();
  listMenu.style.display = "block";
});

const getDataFetch = async () => {
  const prods = await getData();
  console.log(prods);
  prods.forEach((prod) => {
    const cardMenu = document.createElement("div");
    const nameProd = document.createElement("h3");
    const priceProd = document.createElement("h5");
    const imgProd = document.createElement("img");
    const buttonAddProd = document.createElement("button");

    nameProd.textContent = prod.nama_makanan;
    priceProd.textContent = prod.harga_makanan;
    imgProd.setAttribute("src", `../../image/${prod.gambar_makanan}`); // kalau local ganti jadi image/${prod.gambar_makanan} aja
    imgProd.style.width = "150px";
    imgProd.style.height = "100px";
    buttonAddProd.textContent = "tambahkan";
    buttonAddProd.style.backgroundColor = "#de5418";
    buttonAddProd.setAttribute("data-id", prod.id_makanan);
    cardMenu.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "gap-2",
      "border-white",
      "p-2",
      "rounded-lg",
      "w-[35%]",
      "border-2",
      "border-crimson"
    );

    buttonAddProd.addEventListener("click", () => {
      const idProd = parseInt(buttonAddProd.getAttribute("data-id"));
      console.log(idProd);
      const selectedMenu = prods.find((item) => item.id_makanan === idProd);
      console.log(selectedMenu);

      if (selectedMenu) {
        const existingMenu = orders.find(
          (item) => item.id === selectedMenu.id_makanan
        );
        if (existingMenu) {
          return;
        } else {
          const detailNameProd = document.createElement("input");
          detailNameProd.setAttribute("name", "orders_menu");
          detailNameProd.type = "text";
          const detailPriceProd = document.createElement("p");
          const orderedMenu = document.createElement("div");
          const qtyWrapper = document.createElement("div");
          const btnMin = document.createElement("button");
          const inputQty = document.createElement("input");
          inputQty.setAttribute("type", "number");
          inputQty.setAttribute("name", "orders_amount");
          inputQty.min = 1;
          inputQty.value = 1;
          const btnPls = document.createElement("button");

          detailNameProd.value = selectedMenu.nama_makanan;
          detailPriceProd.textContent = selectedMenu.harga_makanan;
          btnMin.textContent = "-";
          btnPls.textContent = "+";

          btnPls.addEventListener("click", (e) => {
            e.preventDefault();
            inputQty.value = parseInt(inputQty.value) + 1;

            const index = orders.findIndex(
              (item) => item.id === selectedMenu.id_makanan
            );
            if (index !== -1) {
              orders[index].qty = parseInt(inputQty.value);
              updatePrice();
            }
          });

          btnMin.addEventListener("click", (e) => {
            e.preventDefault();
            if (parseInt(inputQty.value) > 1) {
              inputQty.value = parseInt(inputQty.value) - 1;
              const index = orders.findIndex(
                (item) => item.id === selectedMenu.id_makanan
              );
              if (index !== -1) {
                orders[index].qty = parseInt(inputQty.value);
                updatePrice();
              }
            }
          });

          orderedMenu.appendChild(detailNameProd);
          orderedMenu.appendChild(detailPriceProd);

          qtyWrapper.appendChild(btnMin);
          qtyWrapper.appendChild(inputQty);
          qtyWrapper.appendChild(btnPls);

          orderedList.appendChild(orderedMenu);
          orderedList.appendChild(qtyWrapper);

          orders.push({
            id: selectedMenu.id_makanan,
            harga: parseInt(selectedMenu.harga_makanan),
            qty: 1,
          });
          console.log(orders);

          updatePrice();
        }
      }
    });

    cardMenu.appendChild(nameProd);
    cardMenu.appendChild(imgProd);
    cardMenu.appendChild(priceProd);
    cardMenu.appendChild(buttonAddProd);

    const listMenuCard = document.getElementById("list-card-menu");
    listMenuCard.appendChild(cardMenu);
  });
};

let orders = [];

const updatePrice = () => {
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );
  amountPrice.value = totalPrice;
  console.log(totalPrice);
};

getDataFetch();
