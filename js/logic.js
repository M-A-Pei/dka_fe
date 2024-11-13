$(window).on("load", function () {
    addAllKendaraan()
});

$("#searchBtn").click(function (e) { 
    const noRegistrasi = $("#noRegistrasiInput").val();
    const nama = $("#namaInput").val();

    if(noRegistrasi == "" && nama == ""){
        addAllKendaraan();
    }
    fetch(`https://dkabe-production.up.railway.app/api/kendaraan/search?noRegistrasi=${noRegistrasi}&namaPemilik=${nama}`)
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
                      <td>${kendaraan.kapasitas} cc</td>
                      <td>${kendaraan.warna}</td>
                      <td>${kendaraan.bahanBakar}</td>
                      <td>
                        <Button data-bs-toggle="modal" data-bs-target="#${kendaraan.noRegistrasi}DetailModal"  class="btn btn-primary">detail</Button>
                        <a href="./add.html?noRegistrasi=${kendaraan.noRegistrasi}" class="btn btn-warning">edit</a>
                        <Button data-bs-toggle="modal" data-bs-target="#${kendaraan.noRegistrasi}DeleteModal" class="btn btn-danger">delete</Button>
                      </td>
                </tr>
            `)
        })
    })

});


function addAllKendaraan() {
    fetch("https://dkabe-production.up.railway.app/api/kendaraan")
    .then((response) => {
        if(!response.ok){
            throw new Error
        }
        return response.json()
    })
    .then((kendaraanList) => {
        $("#tableBody").empty()
        kendaraanList.map((kendaraan, i) => {
            $("body").append(`

                <!-- detail modal -->
                <div class="modal fade" id="${kendaraan.noRegistrasi}DetailModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title" id="exampleModalLabel">${kendaraan.noRegistrasi}</h2>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <b>Pemilik: </b>${kendaraan.namaPemilik}
                                </div>
                                <div>
                                    <b>Merk: </b>${kendaraan.merk}
                                </div>
                                <div>
                                    <b>Bahan Bakar: </b>${kendaraan.bahanBakar}
                                </div>
                                <div>
                                    <b>Alamat: </b>${kendaraan.alamat}
                                </div>
                                <div>
                                    <b>Kapasitas Silinder: </b>${kendaraan.kapasitas} cc
                                </div>
                                <div>
                                    <b>Tahun Pembuatan: </b>${kendaraan.tahun}
                                </div>
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- delete modal -->
                <div class="modal fade" id="${kendaraan.noRegistrasi}DeleteModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                        <h5 class="modal-title" id="exampleModalLabel">are you sure you want to delete ${kendaraan.namaPemilik}?</h5>
                        <small class="text-danger">this action cannot be undone</small>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteKendaraan('${kendaraan.noRegistrasi}')">Delete</button>
                        </div>
                    </div>
                    </div>
                </div>
            `)

            $("#tableBody").append(`
                <tr>
                      <th scope="row">${i + 1}</th>
                      <td>${kendaraan.noRegistrasi}</td>
                      <td>${kendaraan.namaPemilik}</td>
                      <td>${kendaraan.merk}</td>
                      <td>${kendaraan.tahun}</td>
                      <td>${kendaraan.kapasitas} cc</td>
                      <td>${kendaraan.warna}</td>
                      <td>${kendaraan.bahanBakar}</td>
                      <td>
                        <Button data-bs-toggle="modal" data-bs-target="#${kendaraan.noRegistrasi}DetailModal"  class="btn btn-primary">detail</Button>
                        <a href="./add.html?noRegistrasi=${kendaraan.noRegistrasi}" class="btn btn-warning">edit</a>
                        <Button data-bs-toggle="modal" data-bs-target="#${kendaraan.noRegistrasi}DeleteModal" class="btn btn-danger">delete</Button>
                      </td>
                </tr>
            `)
        })
    })
}

function deleteKendaraan(noRegistrasi) {
    fetch(`https://dkabe-production.up.railway.app/api/kendaraan?noRegistrasi=${noRegistrasi}`, {
        method: "DELETE"
    }).then((response) => {
        if(!response.ok){
            throw new Error
        }
        return response
    }).then(() => {
        alert("kendaraan berhasil dihapus");
        addAllKendaraan();
    })
}
