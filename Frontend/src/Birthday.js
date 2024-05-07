export function Birthday(tanggal) {

    let tanggalBaru = new Date(tanggal);
    let tahun = tanggalBaru.getFullYear();
    let bulan = String(tanggalBaru.getMonth() + 1).padStart(2, '0');
    let hari = String(tanggalBaru.getDate()).padStart(2, '0');
    return bulan + '-' + hari + '-' + tahun;

}