const items = [
  ['001', 'Keyboard Logitek', 60000, 'Keyboard yang mantap untuk kantoran', 'logitek.jpg'],
  ['002', 'Keyboard MSI', 300000, 'Keyboard gaming MSI mekanik', 'msi.jpg'],
  ['003', 'Mouse Genius', 50000, 'Mouse Genius biar lebih pinter', 'genius.jpeg'],
  ['004', 'Mouse Jerry', 30000, 'Mouse yang disukai kucing', 'jerry.jpg']
];

let displayItem = items;
let keranjang = [];

function ItemComponent([id, nama, harga, deskripsi, gambar]) {
  return `
  <div class ="col-4 mt-2"> 
    <div class="card" style="width: 18rem;">
        <img src="assets/${gambar}" class="card-img-top" height="200px" width="200px" alt="${nama}">
        <div class="card-body">
            <h5 class="card-title" id="itemName">${nama}</h5>
            <p class="card-text" id="itemDesc">${deskripsi}</p>
            <p class="card-text">Rp ${harga}</p>
            <a href="#" class="btn btn-primary add-cart" data-id="${id}">Tambahkan ke keranjang</a>
        </div>
    </div>
    </div>
  `
}

function addKeranjang(item) {
  keranjang.push(item)
  render()
}

function onSearch(keyword) {
  displayItem = items.filter(([_, nama]) => {
    return nama.toLowerCase().includes(keyword.toLowerCase())
  })

  render()
}

function render() {
  const result = displayItem.reduce((last, cur) => {
    return last + ItemComponent(cur);
  }, "")

  document.querySelector("#listBarang").innerHTML = result;
  document.querySelector("#cart-num").innerHTML = keranjang.length.toString();
  document.querySelectorAll(".add-cart").forEach(el =>
    el.addEventListener("click", () => {
      const item = items.filter(([id]) => id === el.getAttribute("data-id"))[0]
      addKeranjang(item)
    })
  )
}

document.querySelector("#formItem").addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = document.querySelector("#keyword").value;
  onSearch(keyword)
})

render()