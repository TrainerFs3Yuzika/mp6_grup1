$(document).ready(function () {
  $("#allButton").click(function () {
    $(".menu-item").removeClass("hidden");
    $(this).addClass("active");
    $("#jaketBtn, #celanaBtn, bajuBtn").removeClass("active");
  });

  $("#jaketBtn").click(function () {
    $(".menu-item").addClass("hidden");
    $(".jaket").removeClass("hidden");
    $(this).addClass("active");
    $("#allButton, #celanaBtn, #bajuBtn").removeClass("active");
  });

  $("#celanaBtn").click(function () {
    $(".menu-item").addClass("hidden");
    $(".celana").removeClass("hidden");
    $(this).addClass("active");
    $("#allButton, #jaketBtn, #bajuBtn").removeClass("active");
  });

  $("#bajuBtn").click(function () {
    $(".menu-item").addClass("hidden");
    $(".baju").removeClass("hidden");
    $(this).addClass("active");
    $("#allButton, #jaketBtn, #celanaBtn").removeClass("active");
  });
});

// Mendapatkan elemen tombol close
var closeButton = document.querySelector('.modal .btn-close');

// Menambahkan event listener untuk menangani klik pada tombol close
closeButton.addEventListener('click', function() {
  // Menutup modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
  modal.hide();
  
  // Menghapus elemen .modal-backdrop secara manual
  var backdrop = document.querySelector('.modal-backdrop');
  backdrop.parentNode.removeChild(backdrop);
});

// Mendefinisikan fungsi updateModal
function updateModal(product) {
  // Mengambil informasi dari gambar produk yang diklik
  var productImg = product.querySelector('img');
  var productName = product.querySelector('h2');
  var productPrice = product.querySelector('p:nth-of-type(1)');
  var productDescription = product.querySelector('p:nth-of-type(2)');

  // Mengambil deskripsi produk dari atribut data
  var description = product.getAttribute('data-description');

  // Mengambil elemen modal yang sesuai
  var modalImg = document.querySelector('#modalImg');
  var modalTitle = document.querySelector('#modalProductName');
  var modalPrice = document.querySelector('#modalProductPrice');
  var modalDescription = document.querySelector('#modalProductDescription');

  // Mengatur informasi produk pada modal
  modalImg.src = productImg.src;
  modalTitle.innerText = productName.innerText;
  modalPrice.innerText = productPrice.innerText;
  modalDescription.innerText = description;
}

// Menambahkan event listener untuk setiap item produk
var products = document.querySelectorAll('.menu-item');
products.forEach(function(product) {
  product.addEventListener('click', function() {
    updateModal(product);
  });
});

// Fungsi untuk menambahkan produk ke dalam keranjang
function addToCart(productNumber, category) {
  const productName = document.querySelector(`.menu-item.${category}:nth-child(${productNumber}) h2`).textContent;
  const productPrice = document.querySelector(`.menu-item.${category}:nth-child(${productNumber}) p`).textContent;
  
  // Memperbarui pesan yang ditampilkan pada modal keranjang
  document.getElementById("addedProductName").innerText = `Produk ${productName} telah ditambahkan ke keranjang`;
  // Menampilkan modal keranjang
  $('#addToCartModal').modal('show');

  // Membuat elemen baru untuk menampilkan produk yang dimasukkan ke dalam keranjang
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `
    <div class="item-info">
      <h5>${productName}</h5>
      <p>${productPrice}</p>
    </div>
  `;

  // Mengambil offcanvas untuk menambahkan produk ke dalamnya
  const offcanvasBody = document.querySelector('.offcanvas-body');
  offcanvasBody.appendChild(cartItem);

  // Menutup offcanvas setelah menambahkan produk
  const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));
  offcanvas.hide();
}

// Variabel untuk melacak nomor urut produk dalam keranjang
let cartItemCounter = 0;

// Fungsi untuk menambahkan produk ke dalam keranjang
function addToCart(productNumber, category) {
  const productName = document.querySelector(`.menu-item.${category}:nth-child(${productNumber}) h2`).textContent;
  const productPriceString = document.querySelector(`.menu-item.${category}:nth-child(${productNumber}) p`).textContent;
  const productPrice = parseInt(productPriceString.replace(/[^\d]/g, '')); // Mengambil angka dari string harga (menghilangkan 'Rp.' dan titik)
  
  // Memperbarui pesan yang ditampilkan pada modal keranjang
  document.getElementById("addedProductName").innerText = `Produk ${productName} telah ditambahkan ke keranjang`;
  // Menampilkan modal keranjang
  $('#addToCartModal').modal('show');

  // Membuat elemen baru untuk menampilkan produk yang dimasukkan ke dalam keranjang
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItemCounter++; // Menambah nomor urut produk
  cartItem.innerHTML = `
    <div class="item-info">
      <h5>${productName}</h5>
      <p>Harga: Rp. ${productPrice.toLocaleString()}</p>
    </div>
    <div class="quantity">
      <input type="number" value="1" min="1" class="form-control quantity-input" onchange="updateTotalPrice()"> <!-- Tambahkan onchange event untuk memanggil updateTotalPrice() -->
    </div>
    <button type="button" class="btn btn-sm btn-danger delete-btn" onclick="removeCartItem(this)">Hapus</button> <!-- Tombol untuk menghapus produk -->
  `;
  
  // Menambahkan data harga dan kuantitas ke elemen produk
  cartItem.setAttribute('data-price', productPrice);
  cartItem.setAttribute('data-quantity', 1);

  // Mengambil offcanvas untuk menambahkan produk ke dalamnya
  const offcanvasBody = document.querySelector('.offcanvas-body');
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.appendChild(cartItem);

  // Menutup offcanvas setelah menambahkan produk
  const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));
  offcanvas.hide();

  // Update total harga setiap kali produk ditambahkan
  updateTotalPrice();
}

// Fungsi untuk menghapus produk dari keranjang
function removeCartItem(button) {
  button.parentElement.remove(); // Menghapus elemen produk
  // Update total harga setiap kali produk dihapus
  updateTotalPrice();
}

// Fungsi untuk mengupdate total harga berdasarkan kuantitas produk dalam keranjang
function updateTotalPrice() {
  // Mengambil semua input quantity
  const quantityInputs = document.querySelectorAll('.quantity-input');
  let totalPrice = 0;

  // Menghitung total harga berdasarkan jumlah produk dan harga produk
  quantityInputs.forEach(input => {
    const quantity = parseInt(input.value);
    const price = parseInt(input.parentElement.previousElementSibling.querySelector('p').textContent.replace(/[^\d]/g, '')); // Mengambil angka dari string harga (menghilangkan 'Rp.' dan titik)
    totalPrice += quantity * price;
  });

  // Menampilkan total harga
  document.getElementById('totalPrice').textContent = `Total Harga: Rp. ${totalPrice.toLocaleString()}`;
}

// Fungsi untuk memproses pembayaran
function prosesPembayaran() {
  // Mengambil data yang dimasukkan pengguna
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;

  // Contoh tindakan: menampilkan konfirmasi pembayaran
  alert(`Terima kasih, ${nama}! Pembayaran Anda telah berhasil diproses. Barang akan dikirim ke alamat ${alamat}.`);
  
  // Menutup modal setelah proses pembayaran selesai
  $('#checkoutModal').modal('hide');
}

// Ambil elemen-elemen yang dibutuhkan
const metodeTransferInput = document.getElementById('metodeTransfer');
const metodeVirtualInput = document.getElementById('metodeVirtual');
const layananVirtualInputs = document.querySelectorAll('input[name="layananVirtual"]');
const bankTransferInputs = document.querySelectorAll('input[name="bankTransfer"]');

// Tambahkan event listener untuk metode transfer
metodeTransferInput.addEventListener('change', function() {
  if (this.checked) {
    // Aktifkan pilihan untuk bank transfer dan nonaktifkan pilihan untuk layanan virtual
    bankTransferInputs.forEach(input => {
      input.disabled = false;
    });
    layananVirtualInputs.forEach(input => {
      input.checked = false;
      input.disabled = true; // nonaktifkan pilihan metode virtual
    });
  }
});

// Tambahkan event listener untuk metode virtual
metodeVirtualInput.addEventListener('change', function() {
  if (this.checked) {
    // Aktifkan pilihan untuk layanan virtual dan nonaktifkan pilihan untuk bank transfer
    layananVirtualInputs.forEach(input => {
      input.disabled = false;
    });
    bankTransferInputs.forEach(input => {
      input.checked = false;
      input.disabled = true; // nonaktifkan pilihan metode transfer
    });
  }
});





