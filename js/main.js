//selector

//timerSelector
var tWrite = document.querySelector("#timer span");
var tButton = document.querySelectorAll("#timerFct button");
console.log(tStart);
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
var tResult;
//object variable

function Imf(checked, category){
    this.sCate = cSelects[0].selectedIndex;
    this.sHour=cSelects[1].selectedIndex;
    this.sMinute = cSelects[2].selectedIndex;
    this.sSecond = cSelects[3].selectedIndex;
    this.onCheck= checked;
    this.cCategory= category;
    this.cTitle = cInfo[0].value;
    this.cTarget = cInfo[1].value;
    this.cMemo = cMemo.value;
    this.hour =cSelects[1].options[this.sHour].innerText;
    this.minute =cSelects[2].options[this.sMinute].innerText;
    this.second =cSelects[3].options[this.sSecond].innerText;

    this.result=function(){
        return (this.hour*3600)+(this.minute*60)+Number(this.second)
    };
};

function Edit(val){
    cSelects[0].options[val.sCate].selected = true;
    cInfo[0].value = val.cTitle;
    cInfo[1].value = val.cTarget;
    cMemo.value = val.cMemo;
    cSelects[1].options[val.sHour].selected=true;
    cSelects[2].options[val.sMinute].selected=true;
    cSelects[3].options[val.sSecond].selected=true;
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
        option.value = i;
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
            a++;
    }else if(category ==="오전"){
            morImf[b] = new Imf(checked,category);
            digit(morImf[b]);
            space.innerHTML="<div><span>"+morImf[b].onCheck+" "+"</span>"+"<span>"+morImf[b].cCategory+"</span>"+" "+"<span>"+morImf[b].hour+":"+morImf[b].minute+":"+morImf[b].second+"</span><button type='button'>선택</button></div><h3>"+morImf[b].cTitle+"</h3>" ;
            List[1].querySelector("ul").append(space);
            b++;
    }else if(category ==="오후"){
            afterImf[c] = new Imf(checked,category);
            digit(afterImf[c]);
            space.innerHTML="<div><span>"+afterImf[c].onCheck+" "+"</span>"+"<span>"+afterImf[c].cCategory+"</span>"+" "+"<span>"+afterImf[c].hour+":"+afterImf[c].minute+":"+afterImf[c].second+"</span><button type='button'>선택</button></div><h3>"+afterImf[c].cTitle+"</h3>" ;
            List[2].querySelector("ul").append(space);
            c++;
        }

      
}
//cInfoSubmit click
//c = check
cInfoSubmit.addEventListener('submit',write);


// 자릿수에 따라 0채우기
function digit(val){

    if(val.hour == "Hour"){
        val.hour = "00";
        val.sHour = 1;
    }else if(val.hour.toString().length == 1){
        val.hour = "0"+val.hour;
    }
    if(val.minute == "Minute"){
        val.minute ="00";
        val.sMinute=1;
    }else if(val.minute.toString().length == 1){
        val.minute = "0"+val.minute;
    }

    if(val.second == "Second"){
        val.second = "00";
        val.sSecond=1;
    }else if(val.second.toString().length == 1){
        val.second = "0"+val.second;
    }
    
}

for(let i =0; i<List.length;i++){

    ListChoice(i);
    console.log(i);  
}

function ListChoice(i){
    
    List[i].onclick = function()
    {
             
        li=List[i].querySelectorAll('ul li');
        console.log(li);
        for(let z =0; z<li.length;z++){
            ListLiChoice(z,i);     
            
        }
    }
}
function ListLiChoice(z,i){

    li[z].onclick=function(){
        console.log("a",i);
        console.log(List[i].id);
        if(List[i].id === "todayList"){
                Edit(toImf[z]);
                tResult = toImf[z].result();
                console.log("hour",toImf[z].hour*3600,"minute",toImf[z].minute*60,"second",Number(toImf[z].second) ,"result",toImf[z].result());
                tWrite.innerText = toImf[z].hour+":"+toImf[z].minute+":"+toImf[z].second;    
        }else if(List[i].id === "morningList"){
                Edit(morImf[z]);
                tWrite.innerText = morImf[z].hour+":"+morImf[z].minute+":"+morImf[z].second;
        }else if(List[i].id ==="afternoonList"){
                Edit(afterImf[z]);
                tWrite.innerText = afterImf[z].hour+":"+afterImf[z].minute+":"+afterImf[z].second;
        }else{
            alert("오류");
        }
        //  now.querySelector("dd").innerText = 
    }
}

tButton[0].onclick=function(){
    alert("b");
    setInterval(timer,1000);
}
tButton[1].onclick=function(){
    clearInterval(tButton[0].onclick);
}


function timer(){
    let time ={
        hour: Math.floor(tResult/3600),
        minute: Math.floor((tResult%3600)/60),
        second: Math.floor((tResult%3600)%60)
    };
   digit(time);
   tWrite.innerText = time.hour+":"+time.minute+":"+time.second;
   console.log("시:"+time.hour+"분:"+time.minute+"초"+time.second);
   tResult--;
}
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