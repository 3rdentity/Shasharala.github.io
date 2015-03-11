/*
*######
*COOKIE
*######
*/
var Cookie = {
  front: "sha_",
  check: function cookieCheck(name, value) {
    if(this.get(name) == value) {
      return true;
    }
    else {
      return false;
    }
  },
  get: function cookieGet(name) {
    var modName = this.front + name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(modName) == 0) {
        return c.substring(modName.length,c.length);
      }
    }
    return null;
  },
  set: function cookieSet(name, value, days, domain, path) {
    //check if domain is set and set it to null if not
    if (domain) {
      var d = domain;
    }
    else {
      var d = null;
    }
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
    document.cookie = this.front + name + "=" + value + "; " + e + "; domain=" + d + "; path=" + p;
  },
  rem: function cookieRem(name) {
    var modName = this.front + name;
    this.set(modName, "", -1);
  }
};






