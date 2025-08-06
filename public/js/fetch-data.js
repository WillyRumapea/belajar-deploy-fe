export const getData = async () => {
  const url =
    "https://belajar-deploy-api-production.up.railway.app/daftar-makanan";
  try {
    const request = await fetch(url);
    const response = await request.json();
    return response;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};
