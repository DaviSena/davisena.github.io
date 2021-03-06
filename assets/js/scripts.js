function send() {}

function scroll_to(clicked_link, nav_height) {
  var element_class = clicked_link.attr("href").replace("#", ".");
  var scroll_to = 0;
  if (element_class != ".top-content") {
    element_class += "-container";
    scroll_to = $(element_class).offset().top - nav_height;
  }
  if ($(window).scrollTop() != scroll_to) {
    $("html, body")
      .stop()
      .animate({ scrollTop: scroll_to }, 1000);
  }
}

jQuery(document).ready(function() {
  /*
	    Navigation
	*/
  $("a.scroll-link").on("click", function(e) {
    e.preventDefault();
    scroll_to($(this), $("nav").outerHeight());
  });
  // toggle "navbar-no-bg" class
  $(".top-content .text").waypoint(function() {
    $("nav").toggleClass("navbar-no-bg");
  });

  /*
        Background slideshow
    */
  $(".top-content").backstretch("assets/img/backgrounds/1.jpg");
  $(".call-to-action-container").backstretch("assets/img/backgrounds/1.jpg");
  $(".testimonials-container").backstretch("assets/img/backgrounds/1.jpg");

  $("#top-navbar-1").on("shown.bs.collapse", function() {
    $(".top-content").backstretch("resize");
  });
  $("#top-navbar-1").on("hidden.bs.collapse", function() {
    $(".top-content").backstretch("resize");
  });

  $('a[data-toggle="tab"]').on("shown.bs.tab", function() {
    $(".testimonials-container").backstretch("resize");
  });

  let langData = 'empty';
  const lang = navigator.language
  if(lang.includes("pt")){
    setLanguage("pt")
  }else{
    setLanguage("en")
  }
  
  
  new WOW().init();
});

function setLanguage(value) {
  $.getJSON('https://davisena.github.io/assets/lang/'+value+'.json', function(data) {
    langData = data;
    $.each(langData, function(i, item){
      if(item.includes("</")){
        $(`#${i}`).html(item)
      } else if(i.includes("input_")) {
        $(`#${i}`).attr("placeholder", item);
      } else if(i.includes("value_")) {
        $(`#${i}`).attr("value", item);
      } else {
        $(`#${i}`).text(item)
      }
    })
  })
}

$(document).ready(function() {
  if ($("#newContact").length > 0) {
    contactScript("forcontact");
  }
});
//firebase
function contactScript(value) {
  var a = {
    apiKey: "AIzaSyAwAUnZAnhIGURZR2cx2r71lD7rQ-ggzBQ",
    authDomain: "site-pessoal-davi-sena.firebaseapp.com",
    databaseURL: "https://site-pessoal-davi-sena.firebaseio.com",
    projectId: "site-pessoal-davi-sena",
    storageBucket: "site-pessoal-davi-sena.appspot.com",
    messagingSenderId: "25671595035"
  };
  firebase.initializeApp(a);
  $('.carousel').carousel({
    interval: 0
  })
  var b = firebase.database().ref("messages");
  $("#newContact").submit(function(a) {
    $(this), console.log("Submit to Firebase");
    var nameFire = $("#input_name").val(),
      emailFire = $("#input_email").val(),
      messageFire = $("#input_message").val(),
      dateFirebase = new Date().toLocaleString(),
      f = {
        name: nameFire,
        email: emailFire,
        message: messageFire,
        date: dateFirebase
      };
    return (
      b.push(f).then(function(a) {
        $(".success-msg").css("display", "block"),
          $(".sucess-none").css("display", "none");
      }),
      !1
    );
  });
}
