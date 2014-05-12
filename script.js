/*
pass this function the number of the container, tempContainer[n], it is to overwrite
containers are to proceed in order
e.g. <div id ="tempContainer0">, <div id="tempContainer1">
use rememberMe to return the innerHTML of the container, tempContainer[n], to a var for safekeeping
*/
function remove(a) {
	var b = "tempContainer" + a;
	var rememberMe = document.getElementById(b).innerHTML;
	document.getElementById(b).innerHTML = "";
	return rememberMe;
}