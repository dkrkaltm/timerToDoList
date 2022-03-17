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

//variable
var i=0;

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
 
    let space =document.createElement("li");
    
    if(cWriteImf.cCategory =="오늘"){
        space.innerHTML="<div><span>"+cWriteImf.onCheck+" "+"</span>"+"<span>"+cWriteImf.cCategory+"</span>"+" "+"<span>"+time.hour+":"+time.minute+":"+time.second+"</span><button type='button'>선택</button></div><h3>"+cWriteImf.cTitle+"</h3>" ;
        List[0].querySelector("ul").append(space);

    }else if(cWriteImf.cCategory =="오전"){
        space.innerHTML="<div><span>"+cWriteImf.onCheck+" "+"</span>"+"<span>"+cWriteImf.cCategory+"</span>"+" "+"<span>"+time.hour+":"+time.minute+":"+time.second+"</span><button type='button'>선택</button></div><h3>"+cWriteImf.cTitle+"</h3>" ;
        List[1].querySelector("ul").append(space);
    }else{
        space.innerHTML="<div><span>"+cWriteImf.onCheck+" "+"</span>"+"<span>"+cWriteImf.cCategory+"</span>"+" "+"<span>"+time.hour+":"+time.minute+":"+time.second+"</span><button type='button'>선택</button></div><h3>"+cWriteImf.cTitle+"</h3>" ;
        List[2].querySelector("ul").append(space);
    }

    var ChoiceBut = document.querySelectorAll(".ListImf button");


    for(; i<ChoiceBut.length; i++){
        idx(ChoiceBut,i);
    }
    
}
function idx(ChoiceBut,i){
    ChoiceBut[i].onclick = function(){
        alert(i);
    }
}


function write(event){
    event.preventDefault();
    console.log(onCheck.checked);

    if(onCheck.checked ==true){
        cWriteImf.onCheck = "반복"; // 반복 여부
    }else{
        cWriteImf.onCheck = "";
    }


    cWriteImf.cCategory=cSelects[0].options[cSelects[0].selectedIndex].innerText; // 카테고리 값

    cWriteImf.cTitle =cInfo[0].value;
    cWriteImf.cTarget = cInfo[1].value;
    cWriteImf.cMemo= cMemo.value;

    if(cWriteImf.cCategory =="Category"){
        cWriteImf.cCategory = "오늘"
    }
    time.hour= cSelects[1].options[cSelects[1].selectedIndex].innerText; //시간 값
    time.minute = cSelects[2].options[cSelects[2].selectedIndex].innerText;
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
    console.log(val.hour);
    if(val.hour == "Hour"){
        val.hour = "00";
    }else if(val.hour.toString().length == 1){
        val.hour = "0"+val.hour;
    }
    if(val.minute == "Minute"){
        val.minute ="00";
    }else if(val.minute.toString().length == 1){
        val.minute = "0"+val.minute;
    }

    if(val.second == "Second"){
        val.second = "00";
    }else if(val.second.toString().length == 1){
        val.second = "0"+val.second;
    }
    
}


