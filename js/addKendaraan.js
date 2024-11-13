const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

$(window).on("load", function () {
    const noRegistrasi = urlParams.get('noRegistrasi');

    if(noRegistrasi == null){
        $("#addOrEditBtn").text("simpan");
        $("#addOrEditBtn").css("background-color", "lightblue");
    }else{
        $("#addOrEditBtn").text("edit");
        $("#addOrEditBtn").css("background-color", "orange");
    }

    fetch(`https://dkabe-production.up.railway.app/api/kendaraan/${noRegistrasi}`)
    .then((response) => {
        if(!response.ok){
            throw new Error
        }
        return response.json()
    }).then((kendaraan) => {
        $("#nameInput").val(kendaraan.namaPemilik);
        $("#merkInput").val(kendaraan.merk);
        $("#alamatInput").val(kendaraan.alamat);
        $("#tahunInput").val(kendaraan.tahun);
        $("#kapasitasInput").val(kendaraan.kapasitas);
        $("#warnaInput").val(kendaraan.warna);
        $("#bahanBakarInput").val(kendaraan.bahanBakar);
    });
})

$("#addForm").on("submit", function (e) {
    e.preventDefault();

    const noRegistrasi = urlParams.get('noRegistrasi');
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

        if(noRegistrasi != null){
            data.append("noRegistrasi", noRegistrasi)
            fetch("https://dkabe-production.up.railway.app/api/kendaraan", {
                method: "PUT",
                body: data,
            }).then((response) => {
                if(!response.ok){
                    alert("kendaraan gagal di edit");
                    throw new Error
                }
                return response
            }).then((kendaraan) => {
                console.log(kendaraan);
                alert("kendaraan berhasil di edit");
                $(location).attr('href', "./index.html");
            })
        }else{
            fetch("https://dkabe-production.up.railway.app/api/kendaraan", {
                method: "POST",
                body: data,
            }).then((response) => {
                if(!response.ok){
                    alert("kendaraan gagal ditambahkan");
                    throw new Error
                }
                return response
            }).then((kendaraan) => {
                console.log(kendaraan);
                alert("kendaraan berhasil ditambahkan");
                $(location).attr('href', "./index.html");
            })
        }
});