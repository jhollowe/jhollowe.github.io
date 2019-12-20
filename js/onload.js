document.addEventListener("DOMContentLoaded", function () {
  // Fills in the copyright to the current year
  document.getElementById("copyright-date").innerHTML = new Date().getFullYear();
});


// JQuery
// $(function () {
//   var SetCarouselHeight = function () {
//     $("#carouselMaster .carousel-item > img").height(function () {
//       return $("#carouselMaster").width() * 0.5;
//     });
//   }

//   SetCarouselHeight();
//   $(window).resize(function () {
//     SetCarouselHeight();
//   });
// });
