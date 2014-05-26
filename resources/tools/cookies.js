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