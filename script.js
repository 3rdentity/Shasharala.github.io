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