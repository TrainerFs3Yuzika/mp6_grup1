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

function addToCart(productNumber) {
  // Menampilkan pesan bahwa produk telah ditambahkan ke keranjang
  alert('Produk ' + productNumber + ' telah ditambahkan ke keranjang');
}

