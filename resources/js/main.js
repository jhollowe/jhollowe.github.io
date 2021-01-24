// Allow defering image load so images under the fold don't compete with the hero content
function defer_imgs() {
  // defered image tags
  var imgDefer = document.getElementsByTagName('img');
  for (var i = 0; i < imgDefer.length; i++) {
    if (imgDefer[i].getAttribute('data-src')) {
      imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
      imgDefer[i].removeAttribute("data-src");
    }
  }
  // defered CSS images
  var cssImgDefer = document.getElementsByClassName("bg-img-defer");
  for (var i = 0; i < cssImgDefer.length; i++) {
    var styles = getComputedStyle(cssImgDefer[i])
    if (styles.getPropertyValue("--defer-background-image")) {
      cssImgDefer[i].style.setProperty("background-image", styles.getPropertyValue("--defer-background-image"))
      cssImgDefer[i].style.removeProperty("--defer-background-image");
    }
  }
}
window.onload = defer_imgs;

function getOffSet() {
  var _offset = 450;
  var windowHeight = window.innerHeight;

  if (windowHeight > 500) {
    _offset = 400;
  }
  if (windowHeight > 680) {
    _offset = 300
  }
  if (windowHeight > 830) {
    _offset = 210;
  }

  return _offset;
}

function setParallaxPosition($doc, multiplier, $object) {
  var offset = getOffSet();
  var from_top = $doc.scrollTop(),
    bg_css = 'center ' + (multiplier * from_top - offset) + 'px';
  $object.css({ "background-position": bg_css });
}

// Parallax function
// Adapted based on https://codepen.io/roborich/pen/wpAsm
var background_image_parallax = function ($object, multiplier, forceSet) {
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  var $doc = $(document);
  // $object.css({"background-attatchment" : "fixed"});

  if (forceSet) {
    setParallaxPosition($doc, multiplier, $object);
  } else {
    $(window).scroll(function () {
      setParallaxPosition($doc, multiplier, $object);
    });
  }
};

var background_image_parallax_2 = function ($object, multiplier) {
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  var $doc = $(document);
  $object.css({ "background-attachment": "fixed" });

  $(window).scroll(function () {
    if ($(window).width() > 768) {
      var firstTop = $object.offset().top,
        pos = $(window).scrollTop(),
        yPos = Math.round((multiplier * (firstTop - pos)) - 186);

      var bg_css = 'center ' + yPos + 'px';

      $object.css({ "background-position": bg_css });
    } else {
      $object.css({ "background-position": "center" });
    }
  });
};

$(function () {
  // Hero Section - Background Parallax
  background_image_parallax($(".tm-parallax"), 0.30, false);
  background_image_parallax_2($("#contact"), 0.80);
  background_image_parallax_2($("#testimonials"), 0.80);

  // Handle window resize
  window.addEventListener('resize', function () {
    background_image_parallax($(".tm-parallax"), 0.30, true);
  }, true);

  // Detect window scroll and update navbar
  $(window).scroll(function (e) {
    if ($(document).scrollTop() > 120) {
      $('.tm-navbar').addClass("scroll");
    } else {
      $('.tm-navbar').removeClass("scroll");
    }
  });

  // Close mobile menu after click
  $('#tmNav a').on('click', function () {
    $('.navbar-collapse').removeClass('show');
  })

  // Scroll to corresponding section with animation
  $('#tmNav').singlePageNav({
    'easing': 'easeInOutExpo',
    'speed': 600
  });

  // Add smooth scrolling to all links
  // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
  $("a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, 'easeInOutExpo', function () {
        window.location.hash = hash;
      });
    } // End if
  });

  // Pop up
  $('.tm-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: { enabled: true }
  });

  $('.tm-testimonials-carousel').slick({
    dots: true,
    prevArrow: false,
    nextArrow: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // Gallery
  $('.tm-gallery').slick({
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    // variableWidth: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});


function submitContactForm(){
  var thisForm = document.getElementById("contact-form");
  var responseElem = document.getElementById("contact-form-response");
  var http = new XMLHttpRequest();
  http.open("POST", "https://cors-anywhere.herokuapp.com/https://formspree.io/f/xvovvyjb", true);
  const FD = new FormData(thisForm);

  http.addEventListener("load",
  function(e) {
    switch (http.status) {
      case 200:
        formSuccess(e);
        break;
      case 422:
        formFormatError(e);
        break;
      default:
        formError(e);
    }
  });

  http.addEventListener("error", formError);

  http.send(FD);

  // tell the form to not reload the page
  return false;

  function formSuccess(e){
    responseElem.innerText = "Thank You. Your message has been sent"
    thisForm.reset()
    responseElem.classList.remove("response-error");
    responseElem.classList.add("response-complete");
  }

  function formError(e){
    responseElem.innerText = "Unable to submit form right now"
    responseElem.classList.remove("response-complete");
    responseElem.classList.add("response-error");
  }

  function formFormatError(e){
    responseElem.innerText = "Please enter a valid email address"
    responseElem.classList.remove("response-complete");
    responseElem.classList.add("response-error");
  }
}
