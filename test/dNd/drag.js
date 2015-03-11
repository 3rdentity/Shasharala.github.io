//this is undoubtedly outdated and could be updated with new skills that have been learned since it was written
//see drag.css as well
/*
#################################
############DRAG#################
#################################
*/
var drag = [];
drag.srcElem = null;
drag.strt = function handleDragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
  drag.srcElem = this;
  this.classList.add('moving');
  return false;
};
drag.enter = function handleDragEnter(e) {
  this.classList.add("over");
};
drag.over = function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
};
drag.leave = function handleDragLeave(e) {
  this.classList.remove("over");
};
drag.drop = function handleDragDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (drag.srcElem != this) {
  	drag.srcElem.innerHTML = this.innerHTML;
  	if(this.getAttribute("draggable") == "false") {
  		drag.srcElem.setAttribute("draggable", "false");
  		drag.srcElem.style.cursor = "default";
  		this.setAttribute("draggable", "true");
  		this.style.cursor = "move";
  	}
  	this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
};
drag.end = function handleDragEnd(e) {
  [].forEach.call(drag.draggables, function classListRemoval(draggies) {
    draggies.classList.remove("over");
    draggies.classList.remove("moving");
  });
};

drag.draggables = document.querySelectorAll("#dragCon .dragItem");
[].forEach.call(drag.draggables, function draggablesListener(draggies) {
  draggies.addEventListener("dragstart", drag.strt, false);
  draggies.addEventListener("dragenter", drag.enter, false);
  draggies.addEventListener("dragover", drag.over, false);
  draggies.addEventListener("dragleave", drag.leave, false);
  draggies.addEventListener("drop", drag.drop, false);
  draggies.addEventListener("dragend", drag.end, false);
});
