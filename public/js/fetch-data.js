export const getData = async () => {
  const url =
    "https://belajar-deploy-api-production.up.railway.app/daftar-makanan";
  try {
    const request = await fetch(url);

    if (!request.ok) {
      throw new Error(`HTTP error! Status: ${request.status}`);
    }
    const responseData = await request.json();
    const dataMakanan = responseData.data;
    return dataMakanan;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};
