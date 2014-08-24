//############STORY############
var firstMirrArr = [
  "What are you staring at?",
  "You made me this way.",
  "You remember.",
  "When you decided to craft the mirror you thought you did so with no regard to me.",
  "You were wrong.",
  "You tried to ignore me, but I whispered ever so sweetly to you.",
  "As you slept.",
  "As you ate.",
  "As you created me.",
  "I still remember what you called me."
]
var firstMirrHandArr=[
  "Dawn",
  "You named me as if I was a close friend. A playmate.",
  "But I'm your shadow.",
  "The darkness in your heart.",
  "The gnawing, creeping, crawling fears you stow away in your nightmares.",
  "You feed me and keep me safe.",
  "Don't you?"
]
var firstMirrNoSafeArr=[
  "No? Why do you entertain me then?",
  "Keep my company and stick around?",
  "I exist, even if you deny it, I'm still here!",
  "I'm always here!",
  "I am yours and you are mine!"
]
var firstMirrYesSafeArr=[
  "That's right. You've always been taking care of me.",
  "I've been with you since the beginning.",
  "Protecting you, telling you to stay away from people.",
  "They're awful, I tell you.",
  "Stay here with me."
]
var firstMirrYesStayArr=[
  "Good, good"
]
var firstMirrNoStayArr=[
  "Why not!?"
]
var firstMirrWantFreedomArr=[

]
var firstMirrNotRealArr=[

]
var firstMirrReallyRealityArr=[

]
var firstMirrNotReallyRealityArr=[

]
var firstMirrLoveUArr=[

]
var firstMirrHateUArr=[

]
var firstMirrOneMoreChance=[

]
var firstMirrNoMoreChance=[

]
//############GAME############
var fadeTime=2000;
var currMirr = 0;

function changeMus(srcURL){
  var player=$("#musPlayer");
  $("#musSrc").attr("src",srcURL);
  player[0].pause();
  player[0].load();
  player[0].play();
}

function talk(callback){
//test for what eyes are up and present a talking mouth in accordance
  if(currMirr===1){
    if($("#firstMirrMouth").css("display")=="none") {
      $("#firstMirrMouthIni").css("display","none");
      $("#firstMirrMouth").css("display","initial");
      if(callback){eval(callback);}
    }
    else{
      $("#firstMirrMouth").css("display","none");
      $("#firstMirrMouthIni").css("display","initial");
      if(callback){eval(callback);}
    }
  }
}

function firstMirrStart() {
  currMirr=1;
  $("#firstMirrCont").toggle(function showFirstMirrEye(){
      $("#firstMirrEye").fadeToggle(1000);
      $("#firstMirrMouth").fadeToggle(1000);
      typewrite("firstMirrCont",firstMirrArr,1,"fadeIn('firstMirrHand');");
    });
}

$(document).ready(function(){
  //music is loud and needs to have vol lowered
  document.getElementById("musPlayer").volume=.2;
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
  //LISTENERS
  //#introTitle
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
    changeMus("res/mus/test2.wav");
    $("#firstMirr").fadeToggle(1000,firstMirrStart());
  });
  //#firstMirrHand
  $("#firstMirrHand").on("click", function typeFirstMirrHandArr(){
    $("#firstMirrHand").hide();
    typewrite.nxt("firstMirrCont",firstMirrHandArr,1,"$('#firstMirrYesSafe').fadeToggle(fadeTime);$('#firstMirrNoSafe').fadeToggle(fadeTime);");
  });
  //#firstMirrYesSafe
  $("#firstMirrYesSafe").on("click", function clickedYesSafe(){
    $("#firstMirrYesSafe").hide();
    $("#firstMirrNoSafe").hide();
    typewrite.nxt("firstMirrCont",firstMirrYesSafeArr,1,"$('#firstMirrYesStay').fadeToggle(fadeTime);$('#firstMirrNoStay').fadeToggle(fadeTime);");
  });
  //#firstMirrNoSafe
  $("#firstMirrNoSafe").on("click", function clickedNoSafe(){
    $("#firstMirrYesSafe").hide();
    $("#firstMirrNoSafe").hide();
    typewrite.nxt("firstMirrCont",firstMirrNoSafeArr,1,"");
  });
  //#firstMirrNoStay
  $("#firstMirrNoStay").on("click", function clickedNoStay(){
    $("#firstMirrYesStay").hide();
    $("#firstMirrNoStay").hide();
    typewrite.nxt("firstMirrCont",firstMirrNoStayArr,1,"$('#firstMirrWantFreedom').fadeToggle(fadeTime);$('#firstMirrNotReal').fadeToggle(fadeTime);");
  });
  //#firstMirrWantFreedom
  $("#firstMirrWantFreedom").on("click", function clickedWantFreedom(){
    $("#firstMirrWantFreedom").hide();
    $("#firstMirrNotReal").hide();
    typewrite.nxt("firstMirrCont",firstMirrWantFreedomArr,1,"$('#firstMirrLoveU').fadeToggle(fadeTime);$('#firstMirrHateU').fadeToggle(fadeTime);");
  });
  //#firstMirrNotReal
  $("#firstMirrNotReal").on("click", function clickedNotReal(){
    $("#firstMirrWantFreedom").hide();
    $("#firstMirrNotReal").hide();
    typewrite.nxt("firstMirrCont",firstMirrNotRealArr,1,"$('#firstMirrReallyReality').fadeToggle(fadeTime);$('#firstMirrNotReallyReality').fadeToggle(fadeTime);");
  });
  //#firstMirrReallyReality
  $("#firstMirrReallyReality").on("click", function clickedReallyReality(){
    $("#firstMirrReallyReality").hide();
    $("#firstMirrNotReallyReality").hide();
    typewrite.nxt("firstMirrCont",firstMirrReallyRealityArr,1,"$('#firstMirrLoveU').fadeToggle(fadeTime);$('#firstMirrHateU').fadeToggle(fadeTime);");
  });
  //#firstMirrNotReallyReality
  $("#firstMirrNotReallyReality").on("click", function clickedNotReallyReality(){
    $("#firstMirrReallyReality").hide();
    $("#firstMirrNotReallyReality").hide();
    typewrite.nxt("firstMirrCont",firstMirrNotReallyRealityArr,1,"$('#firstMirrLoveU').fadeToggle(fadeTime);$('#firstMirrHateU').fadeToggle(fadeTime);");
  });
  //#firstMirrLoveU
  $("#firstMirrLoveU").on("click", function clickedLoveU(){
    $("#firstMirrLoveU").hide();
    $("#firstMirrHateU").hide();
    typewrite.nxt("firstMirrCont",firstMirrLoveUArr,1);
    //TODO death graphics
  });
  //#firstMirrHateU
  //TODO crack mirror!
  $("#firstMirrHateU").on("click", function clickedHateU(){
    $("#firstMirrLoveU").hide();
    $("#firstMirrHateU").hide();
    typewrite.nxt("firstMirrCont",firstMirrHateUArr,1,"$('#firstMirrOneMoreChance').fadeToggle(fadeTime);$('#firstMirrNoMoreChance').fadeToggle(fadeTime);");
  });
  //#firstMirrOneMoreChance
  $("#firstMirrOneMoreChance").on("click", function clickedOneMoreChance(){
    $("#firstMirrOneMoreChance").hide();
    $("#firstMirrNoMoreChance").hide();
    typewrite.nxt("firstMirrCont",firstMirrOneMoreChanceArr,1);
    //TODO becomeOne graphics
  });
  //#firstMirrNoMoreChance
  $("#firstMirrNoMoreChance").on("click", function clickedNoMoreChance(){
    $("#firstMirrOneMoreChance").hide();
    $("#firstMirrNoMoreChance").hide();
    typewrite.nxt("firstMirrCont",firstMirrNoMoreChanceArr,1);
    //TODO smashMirror graphics. so very alone
  });
  //#firstMirrYesStay
  $("#firstMirrYesStay").on("click", function clickedYesStay(){
    $("#firstMirrYesStay").hide();
    $("#firstMirrNoStay").hide();
    typewrite.nxt("firstMirrCont",firstMirrYesStayArr,1,"$('#firstMirrOneMoreChance').fadeToggle(fadeTime);$('#firstMirrNoMoreChance').fadeToggle(fadeTime);");
  });
  //#speakerIcon
  $("#speakerIcon").on("click", function muteMus(){
    if($("#speakerIcon").attr("src")=="res/mus/speaker.png"){
      $("#speakerIcon").attr("src","res/mus/speakerMute.png");
      document.getElementById("musPlayer").volume=0;
    }
    else{
      $("#speakerIcon").attr("src","res/mus/speaker.png");
      document.getElementById("musPlayer").volume=.2;
    }
  });
});
