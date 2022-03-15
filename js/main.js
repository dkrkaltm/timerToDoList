//selector

//timerSelector
var tWrite = document.querySelector("#timer span");

//cWriteSelector
var cSelects = document.querySelectorAll(".cSelects select");

//cInfoSubmit
var cInfoSubmit = document.querySelector("#cWriteForm");


//onCheck
var onCheck  = document.querySelector("#onCheck");

//cList
var List = document.querySelectorAll("#cList section");
//cInfo
var cInfo = document.querySelectorAll(".cInfo input");
var cMemo = document.querySelector("#cMemo");



//object variable
var cWriteImf={
    onCheck:"",
    cCategory:"",
    cTitle:"",
    cTarget:"",
    cMemo:"",
}
var time={
    hour:"",
    minute:"",
    second:"",
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
    digit(time);

  
    if(cWriteImf.cCategory =="오늘"){
        List[0].innerHTML="<ul><li><div><span>"+cWriteImf.cCategory+"</span><span>"+time.hour+":"+time.minute+":"+time.second+"</span></div><h3>"+cWriteImf.cTitle+"</h3></li></ul>" ;
    }else if(cWriteImf.cCategory =="오전"){

    }else{

    }
    
}
function write(event){
event.preventDefault();
cWriteImf.onCheck = onCheck.checked; // 반복 여부
cWriteImf.cCategory=cSelects[0].options[cSelects[0].selectedIndex].innerText; // 카테고리 값
cWriteImf.cTitle =cInfo[0].value;
cWriteImf.cTarget = cInfo[1].value;
cWriteImf.cMemo= cMemo.value;

time.hour= cSelects[1].options[cSelects[1].selectedIndex].innerText; //시간 값
time.minute = cSelects[2].options[cSelects[2].selectedIndex].value;
time.second = cSelects[3].options[cSelects[3].selectedIndex].innerText;
listCreate();

}
//cInfoSubmit click
//c = check
cInfoSubmit.addEventListener('submit',write);

// timer function
// 선택한 todo에 따른 시간
// 총합 초를 감소 시키며 시 분 초 구하기
var tResult =time.result();

// var timer =setInterval(function(){
//     let time ={
//         hour: Math.floor(tResult/3600),
//         minute: Math.floor((tResult%3600)/60),
//         second: Math.floor((tResult%3600)%60)
//     };
//    digit(time);
//    tWrite.innerText = time.hour+":"+time.minute+":"+time.second;
//    console.log("시:"+time.hour+"분:"+time.minute+"초"+time.second);
//    tResult--;
// },1000)
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
