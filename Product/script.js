$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var category = urlParams.get('category');

  $("#allButton").click(function () {
    $(".menu-item").removeClass("hidden");
    $(this).addClass("active");
    $("#jaketBtn, #celanaBtn, #bajuBtn").removeClass("active");
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

  if (category) {
    $("#" + category + "Btn").click();
  } else {
    $("#allButton").click();
  }
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

function checkout() {
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer.children.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Tidak ada produk di keranjang',
      text: 'Silakan tambahkan produk ke keranjang terlebih dahulu.',
    }).then((result) => {
      if (result.isConfirmed) {
        // Tutup offcanvas jika terbuka
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasRight'));
        offcanvas.hide();
        // Tutup juga checkoutModal jika terbuka
        $('#checkoutModal').modal('hide');
      }
    });
    return; // Menghentikan eksekusi lebih lanjut jika keranjang kosong
  }
  // Lakukan proses pembayaran jika keranjang tidak kosong
  // Menutup offcanvas
  const offcanvasElement = document.getElementById('offcanvasRight');
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  if (offcanvas) {
    offcanvas.hide();
  }
  // Menampilkan modal pembayaran
  $('#checkoutModal').modal('show');
}



// Fungsi untuk memproses pembayaran
function prosesPembayaran() {
  // Mendapatkan data yang dimasukkan pengguna
  const nama = document.getElementById('nama').value;
  const nohp = document.getElementById('nohp').value;
  const kecamatan = document.getElementById('kecamatan').value;
  const provinsi = document.getElementById('provinsi').value;
  const kota = document.getElementById('kota').value;
  const kodepos = document.getElementById('kodepos').value;
  const alamat = document.getElementById('alamat').value;

  // Memeriksa apakah semua input telah diisi
  if (!nama || !nohp || !kecamatan || !provinsi || !kota || !kodepos || !alamat) {
    // Jika ada input yang kosong, tampilkan pesan kesalahan
    Swal.fire({
      icon: 'error',
      title: 'Isian Form Belum Lengkap!',
      text: 'Silakan lengkapi semua kolom sebelum melanjutkan pembayaran.'
    }).then((result) => {
      // Jika pengguna menekan "OK", buka kembali modal pengisian data diri
      if (result.isConfirmed) {
        // Menutup modal metode pembayaran
        $('#modalMetodePembayaran').modal('hide');
        // Buka kembali modal pengisian data diri
        $('#checkoutModal').modal('show');
      }
    });
    return; // Hentikan proses pembayaran jika ada input yang kosong
  } else {
    // Jika semua input telah diisi, lanjutkan dengan proses pembayaran
    // Menutup offcanvas
    const offcanvasElement = document.getElementById('offcanvasRight');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvas) {
      offcanvas.hide();
    }

    // Menampilkan notifikasi SweetAlert untuk pembelian berhasil
    Swal.fire({
      icon: 'success',
      title: 'Pembelian Berhasil!',
      text: `Terima kasih, ${nama}! Pembayaran Anda telah berhasil diproses. Barang akan dikirim ke alamat ${alamat}.`
    }).then((result) => {
      // Jika pengguna menekan tombol "OK", maka dilakukan proses pembayaran
      if (result.isConfirmed) {
        // Perform payment processing here (this is just a placeholder)

        // Clear the cart after successful purchase
        $('#cartItems').empty();

        // Update total price to 0
        $('#totalPrice').text('Rp. 0');

        // Mengosongkan nilai input setelah pembelian berhasil
        document.getElementById('nama').value = '';
        document.getElementById('nohp').value = '';
        document.getElementById('kecamatan').value = '';
        document.getElementById('provinsi').value = '';
        document.getElementById('kota').value = '';
        document.getElementById('kodepos').value = '';
        document.getElementById('alamat').value = '';

      }
    });
        // Menutup modal metode pembayaran
        $('#modalMetodePembayaran').modal('hide');
        
  }
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


  // Fungsi untuk menangani pencarian
  function handleSearch(event) {
    event.preventDefault(); // Mencegah formulir diserahkan secara default

    const query = document.querySelector('input[name="query"]').value; // Mendapatkan nilai pencarian
    let destination = '/'; // Default rute adalah halaman utama

    // Merutekan pengguna berdasarkan hasil pencarian
    switch (query.toLowerCase()) {
      case 'home':
        destination = '/index.html';
        break;
      case 'product':
        destination = '/Product/product.html';
        break;
      case 'about':
        destination = '/About/About.html';
        break;
      case 'contact':
        destination = '/Contact/Contact.html';
        break;
      default:
        destination = '/'; // Rute default jika pencarian tidak cocok
    }

    // Navigasi ke halaman yang sesuai
    window.location.href = destination;
  }

  // Menambahkan event listener untuk menangani pencarian ketika formulir diserahkan
  document.querySelector('form[role="search"]').addEventListener('submit', handleSearch);

  
  
  
  