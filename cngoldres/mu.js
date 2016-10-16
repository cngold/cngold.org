

//qq弹框设置
var popiframe = '<iframe src="tencent://message/?Menu=yes&amp;amp;uin=800031153&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C98834606322B73A4A31DEDC37077C679C5C472814AC60A847B09560590D7BEEB95876E2EBC1A2D9F27E930A7597DB99BEC6D857CCD06723C03086B5BD67C1C810730D59046C3D19506189B564380898A1502CFC00C898790B1311EC36027990CE92823FBB3861424A806F7205F841A79141&amp;amp;SigU=30E5D5233A443AB2BA501C5E9AF3ECE0E983D29B627114EDA3577E480BFA4EFD9E3E0831AA128206EB97002EE6968AC3AD5A685C3AFF59C3DCECF6BA3C53D45085D0D4724F9D379B" style="display: none;"></iframe>';
function judgePop(){
	var local = window.location;
	 $.ajax({  
	        url:"http://passport2.cngold.org/qqPop/judgePop?localPath="+window.location,  
	        dataType:'jsonp',   
	        jsonpCallback:'callback',  
	        success:function(d) {
	        	if(d != null && d.popFlag == 1) {
				   	  $(document.body).append(popiframe);
				   }
	        }  
	  }); 
}
//menu
$(document).ready(function(){
	$.getScript("http://passport2.cngold.org/c/u.htm");
	setTimeout("judgePop()",2000);
});