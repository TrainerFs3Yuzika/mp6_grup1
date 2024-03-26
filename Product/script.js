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

  // Mendapatkan elemen gambar yang akan digunakan sebagai pemicu
  var bajuModalTrigger = document.getElementById('bajuModalTrigger');

  // Menambahkan event listener untuk menangani klik pada gambar
  bajuModalTrigger.addEventListener('click', function() {
    // Mendapatkan modal dengan ID "exampleModal"
    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    // Menampilkan modal
    modal.show();
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

  
  