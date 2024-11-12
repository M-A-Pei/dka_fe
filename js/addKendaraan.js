$("#addForm").on("submit", function (e) {
    e.preventDefault();

    const name = $("#nameInput").val();
    const merk = $("#merkInput").val();
    const alamat = $("#alamatInput").val();
    const tahun = $("#tahunInput").val();
    const kapasitas = $("#kapasitasInput").val();
    const warna = $("#warnaInput").val();
    const bahanBakar = $("#bahanBakarInput").val();


    const data = new FormData()
    data.append("namaPemilik", name)
    data.append("merk", merk)
    data.append("alamat", alamat)
    data.append("tahun", tahun)
    data.append("kapasitas", kapasitas)
    data.append("warna", warna)
    data.append("bahanBakar", bahanBakar)

    console.log(data)

    fetch("http://localhost:8080/api/kendaraan", {
        method: "POST",
        body: data,
    }).then((response) => {
        if(!response.ok){
            alert("kendaraan gagal ditambahkan");
            throw new Error
        }
        return response.json()
    }).then((kendaraan) => {
        console.log(kendaraan);
        alert("kendaraan berhasil ditambahkan");
        $(location).attr('href', "./index.html");
    })
});