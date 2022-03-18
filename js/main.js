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

//now
var now = document.querySelector("#now");
//variable
var i=0;
var a=0,b=0,c=0;
var li;
var toImf = [];
var morImf = [];
var afterImf = [];

//object variable

function Imf(checked, category){
    this.onCheck= checked;
    this.cCategory= category;
    this.cTitle = cInfo[0].value;
    this.cTarget = cInfo[1].value;
    this.cMemo = cMemo.value;
    this.hour =cSelects[1].options[cSelects[1].selectedIndex].innerText;
    this.minute =cSelects[2].options[cSelects[2].selectedIndex].innerText;
    this.second =cSelects[3].options[cSelects[3].selectedIndex].innerText;
    this.result=function(){
        this.hour= this.hour*3600;
        this.minute= this.minute*60;
        return this.hour+this.minute+this.second;
    };
}




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


function write(event){
    event.preventDefault();

    let space =document.createElement("li");
    let checked;
    let category = cSelects[0].options[cSelects[0].selectedIndex].innerText;
    
    if(onCheck.checked ==true){   
        checked = "반복"; // 반복 여부
    }else{
        checked = "";
    }
    if(category ==="Category"){
        category = "오늘";
    }

    
    if(category === "오늘"){
            toImf[a] = new Imf(checked,category);
            digit(toImf[a]);
            space.innerHTML="<div><span>"+toImf[a].onCheck+" "+"</span>"+"<span>"+toImf[a].cCategory+"</span>"+" "+"<span>"+toImf[a].hour+":"+toImf[a].minute+":"+toImf[a].second+"</span><button type='button'>선택</button></div><h3>"+toImf[a].cTitle+"</h3>" ;
            List[0].querySelector("ul").append(space);
    }else if(category ==="오전"){
            morImf[b] = new Imf(checked,category);
            digit(morImf[b]);
            space.innerHTML="<div><span>"+morImf[b].onCheck+" "+"</span>"+"<span>"+morImf[b].cCategory+"</span>"+" "+"<span>"+morImf[b].hour+":"+morImf[b].minute+":"+morImf[b].second+"</span><button type='button'>선택</button></div><h3>"+morImf[b].cTitle+"</h3>" ;
            List[1].querySelector("ul").append(space);
    }else if(category ==="오후"){
            afterImf[c] = new Imf(checked,category);
            digit(afterImf[c]);
            space.innerHTML="<div><span>"+afterImf[c].onCheck+" "+"</span>"+"<span>"+afterImf[c].cCategory+"</span>"+" "+"<span>"+afterImf[c].hour+":"+afterImf[c].minute+":"+afterImf[c].second+"</span><button type='button'>선택</button></div><h3>"+afterImf[c].cTitle+"</h3>" ;
            List[2].querySelector("ul").append(space);
    }
}
//cInfoSubmit click
//c = check
cInfoSubmit.addEventListener('submit',write);

// timer function
// 선택한 todo에 따른 시간
// 총합 초를 감소 시키며 시 분 초 구하기


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

for(let i =0; i<List.length;i++){
    ListChoice(i);
}

function ListChoice(i){
    
    List[i].onclick = function()
    {
        li=List[i].querySelectorAll('ul li');
        for(let i =0; i<li.length;i++){
            ListLiChoice(i);        
        }
    }
}
function ListLiChoice(i){
    li[i].onclick=function(){
        
        if(List[i].id === "todayList"){
                    
        }else if(List[i].id === "morningList"){

        }else if(List[i].id ==="afternoonList"){

        }else{
            alert("오류");
        }
        //  now.querySelector("dd").innerText = 
    }
}