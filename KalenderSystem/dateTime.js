
function DateTime(initialValue) {
  if(initialValue) {
    this.core = new Date(initialValue);
  }
  else {
    this.core = new Date();
  }
}

DateTime.prototype.toFiveMinuteUnits = function() {
  return this.core.getHours() * 12 + this.core.getMinutes() / 5;
}

DateTime.prototype.toFourDigitTime = function() {
  return this.core.toLocaleString().substring(11, 16);
}


DateTime.prototype.pad = function(n) {
  return n<10? '0'+n:''+n;
}

// Called when sent via Angular $http
DateTime.prototype.toJSON = function() {
  return this.core.toLocaleString(); // samma som nedanstående: YYYY-MM-DD HH:MM:SS
  //return this.getYear() + "-" + this.pad(this.getMonth()) + "-" + this.pad(this.getDay()) + " " + this.pad(this.core.getHours()) + ":" + this.pad(this.core.getMinutes()) + ":" + this.pad(this.core.getSeconds());
}

DateTime.prototype.to10string = function() {
  return this.getYear() + "-" + this.pad(this.getMonth()) + "-" + this.pad(this.getDay());
}

DateTime.prototype.getYear = function() {
  return this.core.getFullYear();
}

DateTime.prototype.getMonth = function() {
  return this.core.getMonth() + 1;
}

DateTime.prototype.getMonthName = function() {
  switch(this.core.getMonth()) {
    case 0: return "Januari";
    case 1: return "Februari";
    case 2: return "Mars";
    case 3: return "April";
    case 4: return "Maj";
    case 5: return "Juni";
    case 6: return "Juli";
    case 7: return "Augusti";
    case 8: return "September";
    case 9: return "Oktober";
    case 10: return "November";
    case 11: return "December";
  }
}

DateTime.prototype.getMonthNameShort = function() {
  switch(this.core.getMonth()) {
    case 0: return "Jan";
    case 1: return "Feb";
    case 2: return "Mar";
    case 3: return "Apr";
    case 4: return "Maj";
    case 5: return "Jun";
    case 6: return "Jul";
    case 7: return "Aug";
    case 8: return "Sep";
    case 9: return "Okt";
    case 10: return "Nov";
    case 11: return "Dec";
  }
}

DateTime.prototype.getDay = function() {
  return this.core.getDate();
}

DateTime.prototype.getWeekDayNumber = function() {
  if(this.core.getDay() == 0) {
    return 7;
  }
  return this.core.getDay();
}

DateTime.prototype.getWeekDayName = function() {
  switch(this.core.getDay()) {
    case 0: return "Söndag";
    case 1: return "Måndag";
    case 2: return "Tisdag";
    case 3: return "Onsdag";
    case 4: return "Torsdag";
    case 5: return "Fredag";
    case 6: return "Lördag";
    case 7: return "Söndag";
  }
}

DateTime.prototype.getWeekDayNameShort = function() {
  switch(this.core.getDay()) {
    case 0: return "Sön";
    case 1: return "Mån";
    case 2: return "Tis";
    case 3: return "Ons";
    case 4: return "Tor";
    case 5: return "Fre";
    case 6: return "Lör";
    case 7: return "Sön";
  }
}