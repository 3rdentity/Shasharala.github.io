var Is = {
  "string": function isString(obj) { return (typeof obj === "string"); },
  "number": function isNumber(obj) { return (typeof obj === "number"); },
  "bool": function isBool(obj) { return (typeof obj === "boolean"); },
  "array": function isArrray(obj) { return (obj instanceof Array); },
  "undefined": function isUndefined(obj) { return (typeof obj === "undefined"); },
  "func": function isFunc(obj) { return (typeof obj === "function"); },
  "null": function isNull(obj) { return (obj === null); },
  "notNull": function isNotNull(obj) { return (obj !== null); },
  "invalid": function isInvalid(obj) { return ( Is["null"](obj) ||  Is.undefined(obj)); },
  "valid": function isValid(obj) { return (!Is["null"](obj) && !Is.undefined(obj)); },
  "emptyString": function isEmptyString(obj) { return (Is.string(obj) && (obj.length == 0)); },
  "nonEmptyString": function isNonEmptyString(obj) { return (Is.string(obj) && (obj.length > 0)); },
  "emptyArray": function isEmptyArray(obj) { return (Is.array(obj) && (obj.length == 0)); },
  "nonEmptyArray": function isNonEmptyArray(obj) { return (Is.array(obj) && (obj.length > 0)); },
  "document": function isDocument(obj) { return (obj === document); },
  "window": function isWindow(obj) { return (obj === window); },
  "element": function isElement(obj) { return (obj instanceof HTMLElement); },
  "event": function isEvent(obj) { return (obj instanceof Event); },
  "link": function isLink(obj) { return (Is.element(obj) && (obj.tagName == "A")); }
};

function toBool(obj) {
  if (Is.valid(obj)) return ((obj == 1) || (obj == true) || (obj == "1") || (obj == "y") || (obj == "Y") || (obj.toString().toLowerCase() == "true") || (obj.toString().toLowerCase() == "yes"));
  else return false;
}

function eStop(evt) {
  evt.preventDefault();
  evt.cancelBubble = true;
}
