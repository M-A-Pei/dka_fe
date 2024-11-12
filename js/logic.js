$(window).on("load", function () {
    fetch("http://localhost:8080/api/kendaraan")
        .then((response) => {
            if(!response.ok){
                throw new Error
            }
            return response.json()
        })
        .then((kendaraanList) => {
            $("#tableBody").empty()
            kendaraanList.map((kendaraan, i) => {
                $("#tableBody").append(`
                    <tr>
                          <th scope="row">${i + 1}</th>
                          <td>${kendaraan.noRegistrasi}</td>
                          <td>${kendaraan.namaPemilik}</td>
                          <td>${kendaraan.merk}</td>
                          <td>${kendaraan.tahun}</td>
                          <td>${kendaraan.kapasitas}</td>
                          <td>${kendaraan.warna}</td>
                          <td>${kendaraan.bahanBakar}</td>
                          <td>
                            <a href="./edit.html" class="btn btn-primary">detail</a>
                            <a href="./edit.html" class="btn btn-warning">edit</a>
                            <a href="./delete.html" class="btn btn-danger">delete</a>
                          </td>
                    </tr>
                `)
            })
        })
});

$("#searchBtn").click(function (e) { 
    const noRegistrasi = $("#noRegistrasiInput").val();
    const nama = $("#namaInput").val();

    fetch(`http://localhost:8080/api/kendaraan/search?noRegistrasi=${noRegistrasi}&namaPemilik=${nama}`)
    .then((response) => {
        if(!response.ok){
            throw new Error
        }
        return response.json()
    }).then((kendaraanList) => {
        $("#tableBody").empty()
        kendaraanList.map((kendaraan, i) => {
            console.log(kendaraan.noRegistrasi);
            $("#tableBody").append(`
                <tr>
                      <th scope="row">${i + 1}</th>
                      <td>${kendaraan.noRegistrasi}</td>
                      <td>${kendaraan.namaPemilik}</td>
                      <td>${kendaraan.merk}</td>
                      <td>${kendaraan.tahun}</td>
                      <td>${kendaraan.kapasitas}</td>
                      <td>${kendaraan.warna}</td>
                      <td>${kendaraan.bahanBakar}</td>
                      <td>
                        <a href="./edit.html" class="btn btn-primary">detail</a>
                        <a href="./edit.html" class="btn btn-warning">edit</a>
                        <a href="./delete.html" class="btn btn-danger">delete</a>
                      </td>
                </tr>
            `)
        })
    })

});


