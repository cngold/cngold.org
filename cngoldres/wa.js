/**
 * 
 */


/**
 * vlstat 浏览器统计脚本
 */
var statIdName = "cngoldstat";
/**
 * 设置cookieId
 */
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
//	var ck = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=jin99.net";
	var ck = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=.cngold.org";
//	alert(ck);
	document.cookie = ck;
}
/**
 * 获取cookieId
 */
function getCookie(c_name) {
//	alert(document.cookie);
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
/**
 * 获取当前时间戳
 */
function getTimestamp() {
    var timestamp = Date.parse(new Date());
    return timestamp;
}
/**
 * 生成statId
 */
function genStatId() {
    var cookieId = getTimestamp();
    //日期+随机数
    cookieId = cookieId + "-" + Math.round(Math.random() * 3000000000);
    return cookieId;
}
/**
 * 设置StatId
 */
function setStatId() {
    var cookieId = genStatId();
    setCookie(statIdName, cookieId, 365);
}
/**
 * 获取StatId
 */
function getStatId() {
	try{
		if(cngoldStat != null && cngoldStat != undefined){
			return cngoldStat;
		}
	}catch(e){}
	
    var statId = getCookie(statIdName);
    if (statId != null && statId.length > 0) {
        return statId;
    } else {
        setStatId();
        var statId = getCookie(statIdName);
        return statId;
//        return getStatId();
    }
}
/**
 * 获取UA
 */
function getUA() {
    var ua = navigator.userAgent;
    if (ua.length > 250) {
        ua = ua.substring(0, 250);
    }
    return ua;
}
/**
 * 获取浏览器类型
 */
function getBrower() {
    var ua = getUA();
    if (ua.indexOf("Maxthon") != -1) {
        return "Maxthon";
    } else if (ua.indexOf("MSIE") != -1) {
        return "MSIE";
    } else if (ua.indexOf("Firefox") != -1) {
        return "Firefox";
    } else if (ua.indexOf("Chrome") != -1) {
        return "Chrome";
    } else if (ua.indexOf("Opera") != -1) {
        return "Opera";
    } else if (ua.indexOf("Safari") != -1) {
        return "Safari";
    } else {
        return "ot";
    }
}
/**
 * 获取浏览器语言
 */
function getBrowerLanguage() {
    var lang = navigator.browserLanguage;
    return lang != null && lang.length > 0 ? lang : "";
}
/**
 * 获取操作系统
 */
function getPlatform() {
    return navigator.platform;
}
/**
 * 获取页面title
 */
function getPageTitle() {
    return document.title;
}

function vlstatInitLE(cookieId,vlch, vlch1, vlch2, vlch3) {
    var p;
    var vlstatCH = vlch != null && vlch.length > 0 ? vlch : "";
    var vlstatCH1 = vlch1 != null && vlch1.length > 0 ? vlch1 : "";
    var vlstatCH2 = vlch2 != null && vlch2.length > 0 ? vlch2 : "";
    var vlstatCH3 = vlch3 != null && vlch3.length > 0 ? vlch3 : "";
    
    var vlstatCookieId = cookieId;
    if(!vlstatCookieId || vlstatCookieId == ''){
    	vlstatCookieId = getStatId();
    }
   // var vlstatCookieId = getStatId();
    var vlstatUA = encodeURIComponent(getUA());
    var vlstatIPAddress = document.localName;
    vlstatIPAddress = !vlstatIPAddress?"":vlstatIPAddress;//null or undefined
    var vlstatREFURL = encodeURIComponent(document.referrer);
    var vlstatURL = encodeURIComponent(document.URL);
    var vlstatScreenX = screen.width;
    var vlstatScreenY = screen.height;
    var vlstatOS = getPlatform();
    var vlstatBrower = getBrower();
    var vlstatBrowerLanguage = getBrowerLanguage();
    var vlstatPageTitle = encodeURIComponent(getPageTitle());
    
    var cngoldId = getCookie('IDENTITY');
    var vlstatAction = "index.php";
    p = "cookieId=" + vlstatCookieId +"&cngoldId="+cngoldId+"&ua=" + vlstatUA + "&ip=" + vlstatIPAddress + "&refurl="
            + vlstatREFURL + "&url=" + vlstatURL + "&screenX=" + vlstatScreenX + "&screenY=" + vlstatScreenY
            + "&os=" + vlstatOS + "&brower=" + vlstatBrower + "&browerLang=" + vlstatBrowerLanguage
            + "&title=" + vlstatPageTitle 
            //+ "&ch=" + vlstatCH + "&ch1=" + vlstatCH1 + "&ch2=" + vlstatCH2
            //+ "&ch3=" + vlstatCH3
            ;
    var urlGo = vlstatAction + "?" + p;
    return p;
    
}

/**
 * 启动后台请求
 */
function  startReqAction(cookieId){
	 var params = {};
	    //Document对象数据
	    if(document) {
	        params.domain = document.domain || ''; 
	        params.url = document.URL || ''; 
	        params.title = document.title || ''; 
	        params.referrer = document.referrer || ''; 
	    }   
	    //Window对象数据
	    if(window && window.screen) {
	        params.sh = window.screen.height || 0;
	        params.sw = window.screen.width || 0;
	        params.cd = window.screen.colorDepth || 0;
	    }   
	    //navigator对象数据
	    if(navigator) {
	        params.lang = navigator.language || ''; 
	    }  
	    
	    //setCookie('IDENTITY','751983',365);
	    
	    var _maqparam = {};
	    //解析_maq配置
	    if(_maq) {
	        for(var i in _maq) {
	            switch(_maq[i][0]) {
	                case '_setAccount':
	                    params.account = _maq[i][1];
	                    _maqparam._setAccount = _maq[i][1];
	                    break;
	                default:
	                    break;
	            }
	            if(_maq[i] instanceof Array){
	            	_maqparam[_maq[i][0]]=_maq[i][1];
	            }
	        }   
	    }   
	    //拼接参数串
	    var args = ''; 
	    for(var i in params) {
	        if(args != '') {
	            args += '&';
	        }   
	        args += i + '=' + encodeURIComponent(params[i]);
	    }   
	    var p = vlstatInitLE(cookieId,null,null,null,null);
	    for(var key in _maqparam){
	    	p = p + "&"+key+"="+_maqparam[key];
	    }
	    //通过Image对象请求后端脚本
	    var img = new Image(1, 1);
	    img.src = 'http://ana.cngold.org/ma.gif?' + p;
	    //img.src = 'http://127.0.0.1:8080/web/ma.gif?' + p;
	
}
(function () {
//	alert('abc');
	startReqAction();
})();
