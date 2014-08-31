$(document).ready(function documentReady(){
  var windowHeight = $(window).height();
  if(windowHeight < 800){
    $(".container").css("height","444px");
    $(".scrollArrow").css("margin","363px 0px 0px 676px");
  }
  else if(windowHeight >= 800 && windowHeight < 899){
    $(".container").css("height","600px");
    $(".scrollArrow").css("margin","523px 0px 0px 676px");
  }
  else if(windowHeight >= 900 && windowHeight < 999){
    $(".container").css("height","700px");
    $(".scrollArrow").css("margin","623px 0px 0px 676px");
  }
  else if(windowHeight >= 1000){
    $(".container").css("height","800px");
    $(".scrollArrow").css("margin","723px 0px 0px 676px");
  }
});
$(window).resize(function windowResize() {
  windowHeight = $(window).height();
  console.log(windowHeight);
  if(windowHeight < 800){
    $(".container").css("height","444px");
    $(".scrollArrow").css("margin","363px 0px 0px 676px");
  }
  else if(windowHeight >= 800 && windowHeight < 899){
    $(".container").css("height","600px");
    $(".scrollArrow").css("margin","523px 0px 0px 676px");
  }
  else if(windowHeight >= 900 && windowHeight < 999){
    $(".container").css("height","700px");
    $(".scrollArrow").css("margin","623px 0px 0px 676px");
  }
  else if(windowHeight >= 1000){
    $(".container").css("height","800px");
    $(".scrollArrow").css("margin","723px 0px 0px 676px");
  }
});
