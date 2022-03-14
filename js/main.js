//selector

//timerSelector
var tWrite = document.querySelector("#timer span");

//cWriteSelector
var cSelects = document.querySelectorAll(".cSelects select");

//cInfoSubmitSelector
var cInfoSubmit = document.querySelector("#cInfoSubmit");


//onCheck
var onCheck  = document.querySelector("#onCheck");

//cList
var todayList = document.querySelector("#todayList");
var morningList = document.querySelector("#morningList");
var afternoonList = document.querySelector("#afternoonList");

//variable
var time ={
    hour:"",
    minute:50,
    second:10,
    result:function(){
        this.hour= this.hour*3600;
        this.minute= this.minute*60;
        
        return this.hour+this.minute+this.second;
    }
};




//cWrite select
//cSelects
optionCreate(1,100);
optionCreate(2, 60);
optionCreate(3, 60);

function optionCreate(index,n){
    for(let i = 0;i<n; i++){
        let option = document.createElement('option');
        option.innerText = i;
        cSelects[index].append(option);        
    }
}
function listCreate(){

    let ul = (document.createElement('ul')).appendChild('li');
    console.log(ul);

}
//cInfoSubmit click
//c = check
cInfoSubmit.addEventListener('click',function(event){
    
    var c = onCheck.checked;
    var cCategory=cSelects[0].options[cSelects[0].options.selectedIndex].innerText;
   time.hour = cSelects[1].options[cSelects[1].options.selectedIndex].innerText;
   listCreate();
});


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
   tWrite.innerText = time.hour+":"+time.minute+":"+time.second;
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
