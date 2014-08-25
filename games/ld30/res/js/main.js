//############STORY############
var mirrArr = [
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
var mirrHandArr=[
  "Dawn",
  "You named me as if I was a close friend. A playmate.",
  "But often I feel like your shadow. You lock me away.",
  "You only talk to me when you feel remorse.",
  "But I need you.",
  "You'll feed me and keep me safe, won't you?"
]
var mirrNoSafeArr=[
  "No!? Why do you keep me company then?",
  "I exist, even if you deny it, I'm still here!",
  "I'm always here!",
  "I am yours and you are mine!"
]
var mirrYesSafeArr=[
  "That's right. You've always been taking care of me.",
  "I've been with you since the beginning.",
  "Protecting you, telling you to stay away from people.",
  "They're awful, I tell you.",
  "Stay here with me."
]
var mirrYesStayArr=[
  "We were meant to be together, you know.",
  "When you were created, I was there too.",
  "A small fledgling, I was, but you fostered me and brought me up.",
  "I'm as much a part of you as you are me.",
  "I've helped you through the thick and the thin.",
  "Shielded you from those that would do you harm.",
  "Consoled you when there was noone left to talk to.",
  "I'm the most important friend you have, because I know you're deepest concerns without you saying a word.",
  "Inside and out, we're monsters.",
  "I understand. Come on, embrace me. Remind me again why you chose me."
]
var mirrNoStayArr=[
  "Why not!?",
  "I'm your friend! Don't go, I need you!",
  "Where would you even go?",
  "What will you even do without me?",
  "When was the last time you even went outside?",
  "I'm your entire reality now. I set what your expectations are."
]
var mirrWantFreedomArr=[
  "You think I limit you somehow?",
  "After all I've done for you!?",
  "Remember all the time I spent on you? The people I ate and pushed away for you?",
  "The way I made you anxious and uncomfortable in the prescence of others?",
  "That was me hiding you, giving you the time you needed to become great!",
  "And you whiled it away crying on me.",
  "Pitiful!",
  "I gave you the tools to success and you ignored them!",
  "What more can I do for you? What more do you want?",
  "Will you let me help you?"
]
var mirrNotRealArr=[
  "You don't think I'm real?",
  "Who do you think you're talking to?",
  "I'm as real as the air you're breathing, the mirror you're staring into, the clothes you're wearing.",
  "I'm your dreams incarnate. Your wishes and desires are mine to deliver."
]
var mirrReallyRealityArr=[
  "That's right. I've paved the way for your fantasies.",
  "How do you think you got where you are?",
  "It wasn't chance.",
  "Come on, let me help you again."
]
var mirrNotReallyRealityArr=[
  "You can't run from me!",
  "I'll always be here with you.",
  "Just give me one more chance!",
  "I can show you everything.",
  "I'm your friend, after all."
]
var mirrLoveUArr=[
  "You always choose right in the end.",
  "Let's never fight again.",
  "Just listen to me, okay? I'll take care of you."
]
var mirrHateUArr=[
  "You really hate me, don't you?",
  "After all we've been through together.",
  "You treat me like this.",
  "You ridicule me and stare at me with disdain.",
  "I've done nothing wrong but try to help you.",
  "I love you, but you spurn me.",
  "What are you going to do with me then? "
]
var mirrOneMoreChanceArr=[
  "You'll never escape me again..."
]
var mirrNoMoreChanceArr=[
  "I think you'll be lonely without me..."
]
var mirrYoursArr=[
  "I made you into who you are today.",
  "Everything I've ever done was for your own good.",
  "Just as you've nurtured me, kept me secret, taken care of me.",
  "I've been there for you."
]
var mirrNoYoursArr=[
  "How dare you!",
  "I came to you and asked for nothing but your time!",
  "I've helped you figure yourself out.",
  "Helped you shut out the noise and the hate.",
  "Oh, don't look at me that way.",
  "You know those 'friends' of yours are using you.",
  "You know I helped you escape their base desires."
]
var mirrYouTakeArr=[
  "I've given you the wings to be yourself.",
  "I'll show you what taking really is!",
  "I've been feeding you and priming you for years.",
  "You're filled with hate and disgust.",
  "You're a true monster hidden in a human guise.",
  "You can't run from me.",
  "Become one with me."
]
var mirrYouGiveArr=[
  "I'm glad you recognize what I do for you!",
  "I work hard to protect you and keep you safe.",
  "It's tough work building those walls.",
  "Come on. Let me feel your touch once more."
]
var mirrTearApartArr=[
  "I tear you apart!?",
  "I'll show you what it really feels like to get torn apart.",
  "You always snub me. You never listen to me fully",
  "Well, it's time to stop running away and time to listen to me!"
]
//############GAME############
var fadeTime=2000;

function changeMus(srcURL){
  var player=$("#musPlayer");
  $("#musSrc").attr("src",srcURL);
  player[0].pause();
  player[0].load();
  player[0].play();
}

function talk(callback){
//test for what eyes are up and present a talking mouth in accordance
  if($("#mirrMouth").css("display")=="none"){
    $("#mirrMouthIni").css("display","none");
    $("#mirrMouth").css("display","initial");
    if(callback){eval(callback);}
  }
  else{
    $("#mirrMouth").css("display","none");
    $("#mirrMouthIni").css("display","initial");
    if(callback){eval(callback);}
  }
}

$(document).ready(function(){
  //music is loud and needs to have vol lowered
  document.getElementById("musPlayer").volume=.2;
  $("#intro1").fadeIn(fadeTime, function hideIntro1(){
    $("#intro1").fadeOut(fadeTime, function showIntro2(){
      $("#intro2").fadeIn(fadeTime, function hideIntro2(){
        $("#intro2").fadeOut(fadeTime, function showIntro3(){
          $("#intro3").fadeIn(fadeTime, function slideIntroContDown(){
            $("#introCont").animate({top: "300px"}, 3000);
            $("#intro3").fadeOut(fadeTime, function showIntroTitle(){
              $("#introTitle").fadeIn(1000);
              $("#mirrShade").fadeIn(1000);
            });
          });
        });
      });
    });
  });
  //LISTENERS
  $("#introTitle").on("mouseenter", function mirrHorr(){
    $("#mirrShade").attr("src", "res/img/mirrShadeHorr.png");
    $("#introTitle").css("textShadow","4px 3px 3px #d9d9d9");
  });
  $("#introTitle").on("mouseleave", function mirrHorrRem(){
    $("#mirrShade").attr("src", "res/img/mirrShade.png");
    $("#introTitle").css("textShadow","");
  });
  $("#introTitle").on("click", function preparemirr(){
    $("#introCont").hide();
    $("#mirrShade").hide();
    $("#introMirr").hide();
    changeMus("res/mus/mus.wav");
    $("#mirr").fadeIn(1000,function showmirrEntity(){
      $("#mirrCont").show(function startTyping(){
        typewrite("mirrCont",mirrArr,1,"$('#mirrHand').fadeIn(fadeTime);");
      });
      $("#mirrEye").fadeIn(1000);
      $("#mirrMouth").fadeIn(1000);
    });
  });
  $("#mirrHand").on("click", function typemirrHandArr(){
    $("#mirrHand").hide();
    typewrite.nxt("mirrCont",mirrHandArr,1,"$('#mirrYesSafe').fadeIn(fadeTime);$('#mirrNoSafe').fadeIn(fadeTime);");
  });
  $("#mirrYesSafe").on("click", function clickedYesSafe(){
    $("#mirrYesSafe").hide();
    $("#mirrNoSafe").hide();
    typewrite.nxt("mirrCont",mirrYesSafeArr,1,"$('#mirrYesStay').fadeIn(fadeTime);$('#mirrNoStay').fadeIn(fadeTime);");
  });
  $("#mirrNoSafe").on("click", function clickedNoSafe(){
    $("#mirrYesSafe").hide();
    $("#mirrNoSafe").hide();
    typewrite.nxt("mirrCont",mirrNoSafeArr,1,"$('#mirrYours').fadeIn(fadeTime);$('#mirrNoYours').fadeIn(fadeTime);");
  });
  $("#mirrYours").on("click", function clickedYours(){
    $("#mirrYours").hide();
    $("#mirrNoYours").hide();
    typewrite.nxt("mirrCont",mirrYoursArr,1,"$('#mirrTearApart').fadeIn(fadeTime);$('#mirrYouGive').fadeIn(fadeTime);");
  });
  $("#mirrTearApart").on("click", function clickedTearApart(){
    $("#mirrCracks").show();
    $("#mirrTearApart").hide();
    $("#mirrYouGive").hide();
    typewrite.nxt("mirrCont",mirrTearApartArr,1,"$('#mirrLoveU').fadeIn(fadeTime);$('#mirrNoMoreChance').fadeIn(fadeTime);");
  });
  $("#mirrNoYours").on("click", function clickedNoYours(){
    $("#mirrYours").hide();
    $("#mirrNoYours").hide();
    typewrite.nxt("mirrCont",mirrNoYoursArr,1,"$('#mirrYouTake').fadeIn(fadeTime);$('#mirrYouGive').fadeIn(fadeTime);");
  });
  $("#mirrYouTake").on("click", function clickedYouTake(){
    $("#mirrCracks").show();
    $("#mirrYouTake").hide();
    $("#mirrYouGive").hide();
    typewrite.nxt("mirrCont",mirrYouTakeArr,1,"$('#mirrLoveU').fadeIn(fadeTime);$('#mirrNoMoreChance').fadeIn(fadeTime);");
  });
  $("#mirrYouGive").on("click", function clickedYouGive(){
    $("#mirrYouTake").hide();
    $("#mirrYouGive").hide();
    typewrite.nxt("mirrCont",mirrYouGiveArr,1,"$('#mirrNoMoreChance').fadeIn(fadeTime);$('#mirrOneMoreChance').fadeIn(fadeTime);");
  });
  $("#mirrNoStay").on("click", function clickedNoStay(){
    $("#mirrYesStay").hide();
    $("#mirrNoStay").hide();
    typewrite.nxt("mirrCont",mirrNoStayArr,1,"$('#mirrWantFreedom').fadeIn(fadeTime);$('#mirrNotReal').fadeIn(fadeTime);");
  });
  $("#mirrWantFreedom").on("click", function clickedWantFreedom(){
    $("#mirrWantFreedom").hide();
    $("#mirrNotReal").hide();
    typewrite.nxt("mirrCont",mirrWantFreedomArr,1,"$('#mirrLoveU').fadeIn(fadeTime);$('#mirrHateU').fadeIn(fadeTime);");
  });
  $("#mirrNotReal").on("click", function clickedNotReal(){
    $("#mirrWantFreedom").hide();
    $("#mirrNotReal").hide();
    typewrite.nxt("mirrCont",mirrNotRealArr,1,"$('#mirrReallyReality').fadeIn(fadeTime);$('#mirrNotReallyReality').fadeIn(fadeTime);");
  });
  $("#mirrReallyReality").on("click", function clickedReallyReality(){
    $("#mirrReallyReality").hide();
    $("#mirrNotReallyReality").hide();
    typewrite.nxt("mirrCont",mirrReallyRealityArr,1,"$('#mirrLoveU').fadeIn(fadeTime);$('#mirrHateU').fadeIn(fadeTime);");
  });
  $("#mirrNotReallyReality").on("click", function clickedNotReallyReality(){
    $("#mirrReallyReality").hide();
    $("#mirrNotReallyReality").hide();
    typewrite.nxt("mirrCont",mirrNotReallyRealityArr,1,"$('#mirrLoveU').fadeIn(fadeTime);$('#mirrHateU').fadeIn(fadeTime);");
  });
  $("#mirrLoveU").on("click", function clickedLoveU(){
    $("#mirrLoveU").hide();
    $("#mirrHateU").hide();
    $("#mirrCont").hide();
    $("#mirr").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrMouth").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrEye").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrCracks").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrMouthIni").attr("src","").css({"height":"0px","width":"0px"});
    typewrite.nxt("mirrCont",mirrLoveUArr);
    $("#retry").fadeIn();
  });
  $("#mirrHateU").on("click", function clickedHateU(){
    $("#mirrCracks").show();
    $("#mirrLoveU").hide();
    $("#mirrHateU").hide();
    typewrite.nxt("mirrCont",mirrHateUArr,1,"$('#mirrOneMoreChance').fadeIn(fadeTime);$('#mirrNoMoreChance').fadeIn(fadeTime);");
  });
  $("#mirrOneMoreChance").on("click", function clickedOneMoreChance(){
    $("#mirrOneMoreChance").hide();
    $("#mirrNoMoreChance").hide();
    $("#mirrCont").hide();
    $("#mirr").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrMouth").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrEye").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrCracks").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrMouthIni").attr("src","").css({"height":"0px","width":"0px"});
    typewrite.nxt("mirrCont",mirrOneMoreChanceArr);
    $("#retry").fadeIn();
  });
  $("#mirrNoMoreChance").on("click", function clickedNoMoreChance(){
    $("#mirrOneMoreChance").hide();
    $("#mirrNoMoreChance").hide();
    $("#mirrCont").hide();
    $("#mirr").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrMouth").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrEye").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrCracks").attr("src","").css({"height":"0px","width":"0px"});
    $("#mirrMouthIni").attr("src","").css({"height":"0px","width":"0px"});
    typewrite.nxt("mirrCont",mirrNoMoreChanceArr);
    $("#retry").fadeIn();
  });
  $("#mirrYesStay").on("click", function clickedYesStay(){
    $("#mirrYesStay").hide();
    $("#mirrNoStay").hide();
    typewrite.nxt("mirrCont",mirrYesStayArr,1,"$('#mirrOneMoreChance').fadeIn(fadeTime);$('#mirrNoMoreChance').fadeIn(fadeTime);");
  });
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
  $("#ffIcon").on("click", function clickedFFIcon(){
    if($("#ffIcon").attr("src")=="res/img/ffEmpty.png"){
      $("#ffIcon").attr("src","res/img/ffFull.png");
      typewrite.writeSpeed = 20;
      typewrite.blinkSpeed = 100;
    }
    else{
      $("#ffIcon").attr("src","res/img/ffEmpty.png");
      typewrite.writeSpeed = 40;
      typewrite.blinkSpeed = 400;
    }
  });
  $("#retry").on("click", function clickedRetry(){
    $("#mirr").attr("src","res/img/mirr.png").css({"height":"600px","width":"600px"});
    $("#mirrMouth").attr("src","res/img/mirrMouth.gif").css({"height":"600px","width":"600px"});
    $("#mirrEye").attr("src","res/img/mirrEye.gif").css({"height":"600px","width":"600px"});
    $("#mirrCracks").hide();
    $("#mirrCracks").attr("src","res/img/mirrCracks.png").css({"height":"600px","width":"600px"});
    $("#mirrMouthIni").attr("src","res/img/mirrMouthIni.png").css({"height":"600px","width":"600px"});
    typewrite.nxt("mirrCont",mirrArr,1,"$('#mirrHand').fadeIn(fadeTime);");
    $("#retry").fadeOut();
  });
});
