const API_URL = "PASTE_URL_APPS_SCRIPT_DI_SINI";

function absen(jenis) {
  const nama = document.getElementById("nama").value;
  const pin = document.getElementById("pin").value;

  if (!nama || !pin) {
    alert("Nama dan PIN wajib diisi");
    return;
  }

  if (!navigator.geolocation) {
    alert("GPS tidak didukung");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const data = {
      nama: nama,
      pin: pin,
      jenis: jenis,
      tanggal: new Date().toLocaleDateString("id-ID"),
      waktu: new Date().toLocaleTimeString("id-ID"),
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      foto: "-",
      status: "online"
    };

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      document.getElementById("status").innerText = res.status;
    })
    .catch(err => {
      document.getElementById("status").innerText = "Gagal kirim data";
    });

  }, () => {
    alert("GPS harus diaktifkan");
  });
}
