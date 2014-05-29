/*
###############################
############BUTTONS############
###############################
*/
function clickBtn(name) {
	name.style.border= "1px inset #4A4B4C";
}
/*
#################################
############INVIS&VIS############
#################################
*/
function replace(name1, name2) {
	hide(name1);
	show(name2);
}

function replaceF(name1, name2, time1, time2) {
	fadeOut(name1, time1);
	fadeIn(name2, time2);
}

function fadeIn(name, time) {
	var nameStr = name + "";
	var fadeTime = "1s"; //default fadeTime
	//if user has set time then fadeTime will be modified to it
	if (time) {
		fadeTime = time + "s";
	}
	var searchFor = "object";
	var t = nameStr.indexOf(searchFor);
	if (t != -1) {
		setTimeout(function(){show(name);}, 80);
		name.parentNode.style.animation = "invisToVis" + " " + fadeTime + " " + "1 forwards";
		//Safari & Chromium
		name.parentNode.style.WebkitAnimation = "invisToVis" + fadeTime + "1 forwards";
	}
	else {
		setTimeout(function(){show(name);}, 80);
		document.getElementById(name).style.animation = "invisToVis" + " " + fadeTime + " " + "1 forwards";
		//Safari & Chromium
		document.getElementById(name).style.WebkitAnimation = "invisToVis" + " " + fadeTime + " " + "1 forwards";
	}
}

function fadeOut(name, time) {
	var nameStr = name + "";
	var fadeTime = "1s"; //default fadeTime
	var wait = 30; //default wait is 30 milliseconds
	//if user has set time then fadeTime will be set to it. wait will be set to time in milliseconds
	if (time) {
		fadeTime = time + "s";
		wait = Number(time) * 1000;
	}
	var searchFor = "object";
	var t = nameStr.indexOf(searchFor);
	if (t != -1) {
		name.parentNode.style.animation = "visToInvis" + " " + fadeTime + " " + "1 forwards";
		//Safari & Chromium
		name.parentNode.style.WebkitAnimation = "visToInvis" + " " + fadeTime + " " + "1 forwards";
		setTimeout(function(){hide(name);}, wait); //object will disappear before fadeTime if hide is not delayed
	}
	else {
		document.getElementById(name).style.animation = "visToInvis" + " " + fadeTime + " " + "1 forwards";
		//Safari & Chromium
		document.getElementById(name).style.WebkitAnimation = "visToInvis" + " " + fadeTime + " " + "1 forwards";
		setTimeout(function(){hide(name);}, wait); //object will disappear before fadeTime if hide is not delayed
	}
}

function hide(name) {
	var nameStr = name + "";
	var searchFor = "object";
	var t = nameStr.indexOf(searchFor);
	if (t != -1) {
		name.parentNode.style.display = "none";
	}
	else {
		document.getElementById(name).style.display = "none";
	}
}

function show(name) {
	var nameStr = name + "";
	var searchFor = "object";
	var t = nameStr.indexOf(searchFor);
	if (nameStr.indexOf(searchFor) != -1) {
		name.parentNode.style.display = "initial";
	}
	else {
		document.getElementById(name).style.display = "initial";
	}
	
}

/*
#################################
############TYPEWRITE############
#################################
*/

//typewrite() variables
var tw_array = "";
var tw_id = "";
var tw_index = 0;

//comment out if visible rows of text are not to be limited
var tw_row = 0;
var tw_rowMax = 2; //will be used by typewrite() to limit tw_row, thereby limiting visible rows of text in object/tw_id

var tw_blinks = 0;
var tw_blinksMax = 12; //will be used to limit tw_blinkIn()'s' & tw_blinkOut()'s number of 'blinks'. if changing tw_blinksMax, consider changing tw_blinkSpeed. keep far below typewrite()'s newlineSpeed
var tw_blinkSpeed = 80; //will be used by tw_blinkIn() & tw_blinkOut() to control the 'blinking' speed of the 'insertion point/cursor. if changing tw_blinkSpeed, consider changing tw_blinksMax. keep far below newlineSpeed
var tw_strLength = "";
var tw_currPos = 1;
var tw_currContents = "";
var tw_contents = "";

//'types' out a specified array, 'name2', to a specified object, 'name1'. changing 'tw' variables will affect typewrite()
function typewrite(name1, name2) {
	var writeSpeed = 40; //will be used to control speed of text pushed to object/tw_id
	var newlineSpeed = 1000; //will be used to control speed at which a newline is pushed to object/tw_id

	//set tw_id to name1. this maintains tw_id through recursion
	if (tw_id) {
	}
	else {
  		tw_id = name1;
  	}
	//set tw_array to name2. this maintains tw_array through recursion.
	if (tw_array) {
	}
	else {
    	tw_array = name2;
    	tw_strLength = tw_array[0].length;
  	}
	//puts a line break in tw_contents at each start of a new string/tw_index
	if (tw_index > 0 && tw_currPos == 1) {
    	tw_contents += "<br>";
  	}

	//comment out if visible rows of text are not to be limited
	//checks current visible rows compared to max allowed rows.
	if (tw_row > tw_rowMax) {
    	tw_contents = "";
    	rowTest = tw_row - tw_rowMax; //rowTest is behind tw_row by the max number of rows available.
    	//while rowTest is smaller than tw_row add index of rowTest to contents. this ensures contents only has as many rows as tw_rowMax allows
    	while (rowTest < tw_row) {
    		tw_contents += tw_array[rowTest] + "<br>";
    		rowTest++;
    	}
  	}
        
	tw_currContents = tw_array[tw_index].substring(0, tw_currPos);
    document.getElementById(tw_id).innerHTML = tw_contents + tw_currContents + "|";
    //checks if tw_currPos is at the end of the current string/tw_index and moves tw_currPos to the next character if not
    if (tw_currPos != tw_strLength) {
    	tw_currPos++;
    	tw_currContents = tw_array[tw_index].substring(0, tw_currPos);
		setTimeout('typewrite()', writeSpeed);
		return;
	}
	//checks if tw_index if at the end of tw_array and moves tw_index to the next string/index if not
	else if (tw_index != (tw_array.length - 1)) {
		setTimeout("tw_blinkOut()", tw_blinkSpeed); //starts tw_blinkOut to keep 'insertion point/cursor' blinking till the move to the next string/index is complete
		tw_contents += tw_array[tw_index];
		tw_currPos = 1;
		tw_index++;
		tw_row++;
		tw_strLength = tw_array[tw_index].length;
		setTimeout('typewrite()', newlineSpeed);
		return;
	}
	//if tw_index is at the end of tw_array then reset all variables besides those necessary for tw_blinkIn() & tw_blinkOut(). the 'insertion point/cursor' will blink till stop conditions are met
	else {
		tw_contents += tw_array[tw_index];
		tw_blinks = tw_blinksMax + 1;
		tw_index = 0;
		tw_row = 0;
		tw_strLength = "";
		tw_currPos = 1;
		tw_currContents = "";
		setTimeout("tw_blinkOut()", tw_blinkSpeed);
	}
}

//removes 'insertion point/cursor' from end of tw_contents before calling tw_blinkOut(). runs till tw_blinks == tw_blinksMax
function tw_blinkOut() {
	if (tw_blinks < tw_blinksMax) {
		tw_blinks++;
		document.getElementById(tw_id).innerHTML = tw_contents;
		setTimeout("tw_blinkIn()", tw_blinkSpeed);
		return;
	}
	//stops tw_blinks from increasing forever at end of tw_array
	else if (tw_blinks > tw_blinksMax) {
		document.getElementById(tw_id).innerHTML = tw_contents;
		setTimeout("tw_blinkIn()", tw_blinkSpeed);
		return;
	}
	else {
	tw_blinks = 0;
	}
}

//adds 'insertion point/cursor' to end of tw_contents before calling tw_blinkOut(). runs till tw_blinks == tw_blinksMax
function tw_blinkIn() {
	if (tw_blinks < tw_blinksMax) {
		tw_blinks++;
		document.getElementById(tw_id).innerHTML = tw_contents + "|";
		setTimeout("tw_blinkOut()", tw_blinkSpeed);
		return;
	}
	//stops tw_blinks from increasing forever at end of tw_array
	else if (tw_blinks > tw_blinksMax) {
		document.getElementById(tw_id).innerHTML = tw_contents + "|";
		setTimeout("tw_blinkOut()", tw_blinkSpeed);
		return;
	}
	else {
		tw_blinks = 0;
	}
}

/*
###############################
############COOKIES############
###############################
*/
//all cookies from shasharala.tk begin with "shasha_" automagically
function checkCookie(name, value) {
	if(getCookie(name) == value) {
		return true;
	}
	else {
		return false;
	}
}

//all cookies from shasharala.tk begin with "shasha_" automagically
function getCookie(name) {
	var modNameEQ = "shasha_" + name + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1,c.length);
		}
		if (c.indexOf(modNameEQ) == 0) return c.substring(modNameEQ.length,c.length);
	}
	return null;
}

//all cookies from shasharala.tk begin with "shasha_" automagically
function setCookie(name, value, days, path) {
	//check if path is set and set to /(localhost) if not
	if (path) {
		var p = path;
	}
	else {
		var p = "/";
	}
	//check if days is set and set to 0(session) if not
	if (days) {
		var d = new Date();
		d.setTime(d.getTime() + (days*24*60*60*1000));
		var e = "expires " + d.toUTCString();
	}
	else {
		var e = 0;
	}
	document.cookie = "shasha_" + name + "=" + value + "; " + e + "; path=" + p;
}

//all cookies from shasharala.tk begin with "shasha_" automagically
function remCookie(name) {
	var modName = "shasha_" + name;
	setCookie(modName, "", -1);
}


//NEW FUNCTION?
/*function insert(name, value) {
	var nameStr = name + "";
	var searchFor = "object";
	var t = nameStr.indexOf(searchFor);
	if (t != -1) {
	}
}*/