/*
THIS FILE IS PROBABLY OUTDATED/COULD BE REFACTORED, CLEANED UP, ETC.

'types' out a specified or random array/line, denoted by 'arr', to a specified object, denoted by 'obj'
modifiers can be entered in any order
- rand controls random array/line selection automatically. "randOn" to use
- rowStat controls rows. "rowsOff" or set amount of rows with 'rows#'
*/

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

var typewrite = function typewrite(obj, arr, name1, name2) {
  //these speeds and settings can be changed by events to control how quickly typewrite 'types'. note that all current instances of typewrite will be affected
  typewrite.writeSpeed = 40; //will be used to control speed of text pushed to object/obj
  typewrite.blinkSpeed = 400; //will be used by blinkIn() & blinkOut() to control the 'blinking' speed of the 'insertion point/cursor. if changing blinkSpeed, consider changing blinksMax. keep far below newlineSpeed
  typewrite.blinksMax = 0; //will be used to limit blinkIn()'s' & blinkOut()'s number of 'blinks'. if changing blinksMax, consider changing blinkSpeed. keep far below typeW()'s newlineSpeed

  //used to empty the current objct and pass a new arry. if using this, objct must be available to hide() without casing visual problems for user
  typewrite.nxt = function twNext(objct, arry, name3, name4) {
    hide(objct);
    setTimeout(function twNextShow(){show(objct);}, 404);
    setTimeout(function twNextStartTypewrite(){typewrite(objct, arry, name3, name4);}, 444);
  };
  //tests variables passed to typewrite to assign them to the correct variables
  if (name1) {
    if (name1 == "randOn") {
      var rand = name1;
    }
    else {
      var rowStat = name1;
    }
  }
  if(name2) {
    if (name2 == "randOn") {
      var rand = name2;
    }
    else {
      var rowStat = name2;
    }
  }

  //test for rando settings and set variables accordingly
  	if (rand == "randOn" && isArray(arr[0]) == true) {
    arr = arr[Math.floor(Math.random() * arr.length)];
  }
  else if (rand == "randOn" && isArray(arr[0]) != true) {
    var randLine = true;
  }
  else if (rand != "randOn" && isArray(arr[0]) == true) {
    return;
  }
  var ind = 0; //index
    var lineLength = arr[0].length;
  var currPos = 1;
  var currContents = "";
  var contents = "";
  var row = 0;
  var rowMax = 3 -1; //will be used by typeW() to limit row, thereby limiting visible rows of text in obj. '-1' b/c of 0 index
  //detect if rowStat modifier has been used with a number
  if (rowStat && rowStat != 'rowsOff') {
    rowMax = rowStat - 1;// -1 b/c of index 0
  }
  var blinks = 0;

  function typeW() {
    //tests if end conditions have been met and exits function gracefully
    if (document.getElementById(obj).hasAttribute("hidden") == true) {
      contents = "";
      document.getElementById(obj).innerHTML = contents;
      return;
    }

    //removes 'insertion point/cursor' from end of contents before calling blinkOut(). runs till blinks == blinksMax
    function blinkOut() {
      //tests if end conditions have been met and exits function gracefully
      if (document.getElementById(obj).hasAttribute("hidden") == true) {
        contents = "";
        document.getElementById(obj).innerHTML = contents;
        return;
      }
      else if (blinks < typewrite.blinksMax) {
        blinks++;
        document.getElementById(obj).innerHTML = contents;
        setTimeout(blinkIn, typewrite.blinkSpeed);
        return;
      }
      //stops blinks from increasing forever at end of arr
      else if (blinks > typewrite.blinksMax) {
        document.getElementById(obj).innerHTML = contents;
        setTimeout(blinkIn, typewrite.blinkSpeed);
        return;
      }
      else {
        blinks = 0;
        typeW();
      }
    }
    //adds 'insertion point/cursor' to end of contents before calling blinkOut(). runs till blinks == blinksMax
    function blinkIn() {
      //tests if end conditions have been met and exits function gracefully
      if (document.getElementById(obj).hasAttribute("hidden") == true) {
        contents = "";
        document.getElementById(obj).innerHTML = contents;
        return;
      }
      else if (blinks < typewrite.blinksMax) {
        blinks++;
        document.getElementById(obj).innerHTML = contents + "|";
        setTimeout(blinkOut, typewrite.blinkSpeed);
        return;
      }
      //stops blinks from increasing forever at end of arr
      else if (blinks > typewrite.blinksMax) {
        document.getElementById(obj).innerHTML = contents + "|";
        setTimeout(blinkOut, typewrite.blinkSpeed);
        return;
      }
      else {
        blinks = 0;
        typeW();
      }
    }

    //puts a line return in contents at each start of a new row
    if (row > 0 && currPos == 1) {
    		contents += "<br>";
  		}

    //checks current visible rows compared to max allowed rows
    //only checks if rowStat is not set to 'disable'
    if (rowStat != 'rowsOff') {
      if (row > rowMax) {
    			contents = "";
    			var rowTest = row - rowMax; //rowTest is behind row by the max number of rows available.
    			//while rowTest is smaller than row add index of rowTest to contents. this ensures contents only has as many rows as rowMax allows
    			while (rowTest < row) {
    				contents += arr[rowTest] + "<br>";
    				rowTest++;
    			}
  			}
  		}

    	//if randLine is enabled and the current line/row is to be started
    	//set current index to a random row
    	if (randLine == true && currPos == 1) {
    		ind = Math.floor(Math.random() * arr.length);
    	}

    currContents = arr[ind].substring(0, currPos);
    	document.getElementById(obj).innerHTML = currContents + "|";
    	//checks if currPos is at the end of the current string/ind and moves currPos to the next character if not
    	if (currPos != lineLength) {
    		currPos++;
    		if (randLine == true && currPos == lineLength) {
    			contents = arr[ind].substring(0, currPos);
    			blinks = typewrite.blinksMax + 1;
    			blinkOut();
    			return;
    		}
      setTimeout(typeW, typewrite.writeSpeed);
      return;
    }
    //checks if ind if at the end of arr and moves ind to the next string/index if not
    else if (ind != (arr.length - 1)) {
      setTimeout(blinkOut, typewrite.blinkSpeed); //starts blinkOut to keep 'insertion point/cursor' blinking till the move to the next string/index is complete
      contents = arr[ind];
      currPos = 1;
      ind++;
      row++;
      lineLength = arr[ind].length;
      return;
    }
    //the 'insertion point/cursor' will blink forever
    else {
      contents = arr[ind];
      blinks = typewrite.blinksMax + 1;
      blinkOut();
      return;
    }
  }
    typeW();
};
