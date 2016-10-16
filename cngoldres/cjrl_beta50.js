    $(document).ready(function(){
        loadCalendar();
    });
    function loadCalendar() {
        var url = "http://calendar.cngold.org/finance/quote/calendar/?callback=quote_calendar=";
        $.getScript(url, function(){
            var quoteArr = quote_calendar;
            var calStr = "";
            for(var i=0; i<quoteArr.length; i++) {
                var data = quoteArr[i]; 
                var publishTime = new Date(data.publishTime).Format('hh:mm'); 
                if(i == 0) {
                    calStr += "<li id='calendarFirst' class='dotted'>";
                } else {
                    calStr += "<li class='dotted'>";
                }
                calStr += "<div class='many'>"
                calStr += "<a href='http://m.cngold.org/calendar/c"+data.id+".html' target='_blank' title='"+data.quotaName+"'>";
                calStr += "<div class='country static'>";
                calStr += "<img src='http://res.cngoldres.com/calendar/img/"+data.countryCode.toLowerCase()+".png' alt='"+data.country+"'><p>";
                calStr += publishTime+"</p></div>";
                calStr += "<p class='title'>"+data.quotaName+"</p>";
                calStr += "<table class='data-ini' width='100%'><tbody>";
                calStr += "<tr><td class='text-left'>前值：" + data.previousValue + "</td>";
                var gold = 0,oil = 0;
                if(data.effectGold) gold = data.effectGold;
                if(data.effectOil) oil = data.effectOil;
                var effect_str = '--';
                if(gold != 0 && oil == 0)
                {
                    if(gold == 1) 
                        effect_str = '<span class="red">利多金银</span>';
                    if(gold == 2) 
                        effect_str = '<span class="green">利空金银</span>';
                    if(gold == 3) 
                        effect_str = '<span class="gray">影响较小</span>';
                }
                if(gold == 0 && oil != 0)
                {
                    if(oil == 1) 
                        effect_str = '<span class="red">利多原油</span>';
                    if(oil == 2) 
                        effect_str = '<span class="green">利空原油</span>';
                    if(oil == 3) 
                        effect_str = '<span class="gray">影响较小</span>';
                }
                if(gold != 0 && oil != 0 && gold == oil)
                {
                    if(gold==1) 
                        effect_str = '<span class="red">利多金银 原油</span>';
                    if(gold==2) 
                        effect_str = '<span class="green">利空金银 原油</span>';
                    if(gold==3) 
                        effect_str = '<span class="gray">影响较小</span>';
                }
                if(gold != 0 && oil != 0 && gold != oil)
                {
                    if(gold == 1){
                        effect_str = '<span class="red">利多金银</span>';
                        if(oil == 2) effect_str += '<span class="green">利空原油</span>';
                    }
                    if(gold == 2){
                        effect_str = '<span class="green">利空金银 原油</span>';
                        if(oil == 1) effect_str += '<span class="red">利多原油</span>';
                    }
                    if(gold == 3) 
                        if(oil == 1) effect_str = '<span class="red">利多原油</span>';
                        if(oil == 2) effect_str = '<span class="green">利空原油</span>';
                }
                calStr += "<td>公布值</td><td>" + effect_str + "</td></tr>";
                calStr += "<tr><td class='text-left'>预测值：" + data.forecastValue + "</td>";
                calStr += "<td>" + data.value + "</td><td>";
                function createStars(num){
                    var gray_num = 3-num;
                    for(var i=0;i<num;i++){
                        calStr += '<img src="http://res.cngoldres.com/mobile/images/cal_star.png" alt="星级">';
                    }
                    for(var j=0;j<gray_num;j++){
                        calStr += '<img src="http://res.cngoldres.com/mobile/images/cal_star_gray.png" alt="星级">';
                    }
                    return calStr;
                }
                var star_level = data.importance;
                createStars(star_level);
                calStr += "</td></tr>";
                if(i != 0) {
                    var id1 = "", id2 = "", timeCal = "";
                    timeCal = new Date(data.calendarAt).Format('yyyy-MM-dd')+" "+new Date(data.publishTime).Format('hh:mm')
                    if(i == 1) {
                        id1 = "timeOver01";
                        id2 = "timeM01";    
                        $("#atime01").val(publishTime);
                        $("#timeM01").val(timeCal);
                    }
                    if(i == 2) {
                        id1 = "timeOver02";
                        id2 = "timeM02";    
                        $("#atime02").val(publishTime);
                        $("#timeM02").val(timeCal);
                    }
                    calStr += " <tr class='timeLeft'><td colspan='3'>剩余<span id='"+id1+"'>00:00:00</span>公布</td></tr>";
                    calStr += "<span style='display:none;' id='"+id2+"'>"+timeCal+"</span>";
                }
                calStr += "</tbody></table></a></div></li>";
            }
            $("#calendarUl").html(calStr);
            aimsTime(getOverTime('timeM01'),getOverTime('atime01'),'timeOver01')
            aimsTime(getOverTime('timeM02'),getOverTime('atime02'),'timeOver02')
        });
    }
    
    //只影响倒计时
    function aimsTime(date,aims,ele){
        var now = new Date();//当前时间
        var nowGetMonth = now.getMonth();
        var nowGetDate = now.getDate();
        var nowGetHours = now.getHours()
        var nowGetMin = now.getMinutes();
        nowGetMonth ++;
        if(nowGetMonth< 10 ) nowGetMonth = '0' + nowGetMonth;
        if(nowGetDate<10) nowGetDate = '0' + nowGetDate;
        if(nowGetHours<10) nowGetHours = '0' + nowGetHours;
        if(nowGetMin<10) nowGetMin = '0' + nowGetMin;
        var compNow = now.getFullYear() + "" + nowGetMonth + nowGetDate + nowGetHours + nowGetMin;//现在的时间
        var compEnd = date.replace(/[\s\-\:]/g,'');
        if(parseInt(compNow) > parseInt(compEnd)) {
            $("#"+ele).html("00:00:00");
        }else{
            setInterval(function(){ GetServerTime(aims)},250);
        }
        function GetServerTime(aimsTime){
            var d= now.getYear()+"/"+now.getMonth()+"/" + now.getDate()+ ' ' + aimsTime;//设置目标时间为节点
            var urodz = new Date(d); 
            now.setTime(now.getTime()+250); 
            days = (urodz - now) / 1000 / 60 / 60 / 24; 
            daysRound = Math.floor(days); 
            hours = (urodz - now) / 1000 / 60 / 60 - (24 * daysRound); 
            hoursRound = Math.floor(hours); 
            minutes = (urodz - now) / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound); 
            minutesRound = Math.floor(minutes); 
            seconds = (urodz - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound); 
            secondsRound = Math.round(seconds);          
            if(hoursRound < 10) hoursRound = '0'+ hoursRound;   //按照两位数格式显示时间
            if(minutesRound < 10) minutesRound = '0'+ minutesRound;
            if(secondsRound < 10) secondsRound = '0'+ secondsRound;
            $("#"+ele).html(hoursRound + ":" + minutesRound + ":" + secondsRound)
        }
    }
    
    function getOverTime(timeEle){
        return $("#"+timeEle).val();
    }
    
    Date.prototype.Format = function (fmt) {
         var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
         };
         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
         for (var k in o)
         if (new RegExp("(" + k + ")").test(fmt)) 
         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         return fmt;
    }