//############STORY############

var firstMirrArr = [
  "Whatever are you staring at?",
  "Aliqua cillum ullamco magna eiusmod deserunt occaecat est aute consequat.",
  "Esse sit mollit eu pariatur aliquip qui culpa consectetur est tempor anim anim cupidatat."
]

//############GAME############
var fadeTime=2000;
var currMirr = 0;

function talk(){
//test for what eyes are up and present a talking mouth in accordance
  if(currMirr===1){
    if($("#firstMirrMouth").css("display")=="none") {
      $("#firstMirrMouthIni").css("display","none");
      $("#firstMirrMouth").css("display","initial");
    }
    else{
      $("#firstMirrMouth").css("display","none");
      $("#firstMirrMouthIni").css("display","initial");
    }
  }
}

function firstMirrStart() {
  currMirr=1;
  $("#firstMirrCont").toggle(function showFirstMirrEye(){
      $("#firstMirrEye").fadeToggle(1000);
      $("#firstMirrMouth").fadeToggle(1000);
      typewrite("firstMirrCont", firstMirrArr, 1);
    });
}

$(document).ready(function(){
  $("#intro1").fadeToggle(fadeTime, function hideIntro1(){
    $("#intro1").fadeToggle(fadeTime, function showIntro2(){
      $("#intro2").fadeToggle(fadeTime, function hideIntro2(){
        $("#intro2").fadeToggle(fadeTime, function showIntro3(){
          $("#intro3").fadeToggle(fadeTime, function slideIntroContDown(){
            $("#introCont").animate({top: "300px"}, 3000);
            $("#intro3").fadeToggle(fadeTime, function showIntroTitle(){
              $("#introTitle").fadeToggle(1000);
              $("#mirrShade").fadeToggle(1000);
            });
          });
        });
      });
    });
  });
  //listeners
  $("#introTitle").on("mouseenter", function mirrHorr(){
    $("#mirrShade").attr("src", "res/img/mirrShadeHorr.png");
    $("#introTitle").css("textShadow","4px 3px 3px #d9d9d9");
  });
  $("#introTitle").on("mouseleave", function mirrHorrRem(){
    $("#mirrShade").attr("src", "res/img/mirrShade.png");
    $("#introTitle").css("textShadow","");
  });
  $("#introTitle").on("click", function prepareFirstMirr(){
    $("#introCont").hide();
    $("#mirrShade").hide();
    $("#introMirr").hide();
    $("#firstMirr").fadeToggle(1000,firstMirrStart());
  });
});
