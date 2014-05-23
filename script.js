//------------COOKIES------------
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
	var cookieStr = document.cookie;
	var returnValue = "";
	var searchFor = "shasha_" + name + "=";
	var startIndex = cookieStr.indexOf(searchFor);
	if(startIndex != -1) {
		startIndex += searchFor.length;
		endIndex = cookieStr.indexOf(";", startIndex);
		if (endIndex == -1) {
			endIndex = cookieStr.length;
  			returnValue = cookieStr.substring(startIndex, endIndex);
  		}
  	}
  	return returnValue;
}

//all cookies from shasharala.tk begin with "shasha_" automagically
function setCookie(name, value, expires) {
	var d = new Date();
	d.setTime(d.getTime() + (expires*24*60*60*1000));
	var e = "expires " + d.toUTCString();
	document.cookie = "shasha_" + name + "=" + value + "; " + e;
}

//------------UNIVERSAL------------

function hide(name) {
	var nameStr = name + "";
	var searchFor = "object";
	var test = nameStr.indexOf(searchFor);
	if (test != -1) {
		name.parentNode.style.display = "none";
	}
	else {
		document.getElementById(name).style.display = "none";
	}
}

function clickBtn(name) {
	name.style.border= "1px inset #4A4B4C";
}