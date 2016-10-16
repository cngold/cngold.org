
(function() {
     if (! 
     /*@cc_on!@*/
     0) return;
     var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, object,header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
     var i= e.length;
     while (i--){
         document.createElement(e[i])
     } 
})() 




function getCookieLoginName(){
	var objName = "USER";
	var arrStr = document.cookie.split("; ");
	for(var i = 0;i < arrStr.length;i ++){
		var cookieStr = decodeURIComponent(arrStr[i]);
		var temp = cookieStr.split("=");
		if(temp[0] == objName) 
			return unescape(temp[1]);
	}
	return "";
}


function format(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i]; 
	}
	return t.split("").reverse().join("") + "." + r;
}

function NewDate(str) { 
  	var date = new Date();
	if(str != ""){
    	var point = str.indexOf(" ");
    	str = str.substr(0,point);
    	str = str.split('-'); 
    	date.setUTCFullYear(str[0], str[1] - 1, str[2]); 
    	date.setUTCHours(0, 0, 0, 0); 
	}
	return date; 
}
