//selector

//timerSelector
var tWrite = document.querySelector("#timer span");

//cWriteSelector
var cSelects = document.querySelectorAll(".cSelects select");
console.log(cSelects[0]);


//variable
var time ={
    hour:1,
    minute:50,
    second:10,
    result:function(){
        this.hour= this.hour*3600;
        this.minute= this.minute*60;
        
        return this.hour+this.minute+this.second;
    }
};




// timer function
// 선택한 todo에 따른 시간
// 총합 초를 감소 시키며 시 분 초 구하기
var tResult = time.result();

var timer =setInterval(function(){
   
    let time ={
        hour: Math.floor(tResult/3600),
        minute: Math.floor((tResult%3600)/60),
        second: Math.floor((tResult%3600)%60)
    };
   digit(time);

   tWrite.textContent = time.hour+":"+time.minute+":"+time.second;
   console.log("시:"+time.hour+"분:"+time.minute+"초"+time.second);
   tResult--;

},1000)

// 자릿수에 따라 0채우기
function digit(val){
  
    if(val.hour.toString().length == 1){
        val.hour = "0"+val.hour;
    }
    if(val.minute.toString().length == 1){
        val.minute = "0"+val.minute;
    }
    if(val.second.toString().length == 1){
        val.second = "0"+val.second;
    }
    
}

//cWrite select
//cSelects
cSelects[0].append("<option value=''+"+'오늘'+'+>'+"</option>");
cSelects[0].appendChild("오전");
cSelects[0].appendChild("오후");