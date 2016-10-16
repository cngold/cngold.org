$(document).ready(function(){
	//关闭广告
	$('.freeHotline-close').click(function(){
		$('.freeHotline-open').hide();
		$("footer").css("padding-bottom","10px");
	});
	$('.important_close').click(function(){
		$('.important_open').hide();
		$("footer").css("padding-bottom","10px");
	});
	//变换窗口尺寸
	var bodyWidth = $(document.body).width();
	var docWidth = $(document).width();
	$('#click_fpjt img').css({width:bodyWidth + 'px',height:bodyWidth*0.16 + 'px'});
	window.onresize = function(){
		bodyWidth = $(document.body).width();
		docWidth = $(document).width();	
		if($(".important_open").width()!=0){
			$('.important_open').css({width:bodyWidth + 'px',height:bodyWidth*0.16 + 'px'});
			$('#click_fpjt img').css({width:bodyWidth + 'px',height:bodyWidth*0.16 + 'px'});			
		};
		if($(".freeHotline-open").width()!=0){
			$('.freeHotline-open').css({width:bodyWidth + 'px',height:bodyWidth*0.16 + 'px'});
			$('#click_fpjt img').css({width:bodyWidth + 'px',height:bodyWidth*0.16 + 'px'});			
		}
	}
});