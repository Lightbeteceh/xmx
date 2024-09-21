const axios = require("axios");

const api_key = "API_KEY";

let operator;

async function getOperators() {
  try {
    const response = await axios.get(
      `https://api.sms-activate.io/stubs/handler_api.php?api_key=${api_key}&action=getOperators&country=6`
    );
    console.log(response.data);
    operator = response.data;
    check_available(operator);
  } catch (error) {
    console.error(error);
  }
}

async function getBalance() {
  try {
    const response = await axios.get(
      `https://api.sms-activate.io/stubs/handler_api.php?api_key=${api_key}&action=getBalance`
    );
    console.log("Saldo Anda: ", response.data);
  } catch (error) {
    console.error(error);
  }
}

async function check_available(operator) {
  try {
    const response = await axios.get(
      `https://api.sms-activate.io/stubs/handler_api.php?api_key=${api_key}&action=getNumbersStatus&country=6&operator=axis`
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function checkActivations(readline) {
  try {
    const response = await axios.get(
      `https://api.sms-activate.io/stubs/handler_api.php?api_key=${api_key}&action=getActiveActivations`
    );
    console.log("Aktivasi aktif: ", response.data);
    await getBalance();
    showMenu(readline); // Tampilkan menu kembali
  } catch (error) {
    console.error(error);
  }
}

async function buyService(readline) {
  try {
    const response = await axios.get(
      `https://api.sms-activate.io/stubs/handler_api.php?api_key=${api_key}&action=getNumber&service=tg&operator=axis&country=6&maxPrice=30`
    );
    console.log("Hasil pembelian layanan: ", response.data);
    await getBalance();
    showMenu(readline); // Tampilkan menu kembali
  } catch (error) {
    console.error(error);
  }
}

function showMenu(readline) {
  console.log("\n=== Menu ===");
  console.log("1. Beli Service");
  console.log("2. Cek Aktivasi");
  console.log("3. Keluar");

  readline.question("Pilih opsi (1/2/3): ", (choice) => {
    switch (choice) {
      case "1":
        buyService(readline); // Lanjut ke proses beli service
        break;
      case "2":
        checkActivations(readline); // Lanjut ke cek aktivasi
        break;
      case "3":
        console.log("Keluar...");
        readline.close();
        break;
      default:
        console.log("Opsi tidak valid, coba lagi.");
        showMenu(readline); // Jika opsi tidak valid, tampilkan menu kembali
        break;
    }
  });
}

// Mulai program dan tampilkan menu
function start() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  getBalance().then(() => showMenu(readline));
}

start();
