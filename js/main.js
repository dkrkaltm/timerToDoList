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

//cCorrection
var correctionBtn = document.querySelector("#cCorrection");
var cInfoSubmits = document.querySelector("#cInfoSubmit"); 
//variable
var i=0;
var a=0,b=0,c=0;
var li;
var liSpan;
var toImf = [];
var morImf = [];
var afterImf = [];
var idx = [0,0,0];
var tResult;
var timerId=null;
var idxCheck = -1;
var listCheck = -1;
//object variable

// 객체 생성및 값 초기화
function Imf(checked, category){
    this.sCate = cSelects[0].selectedIndex,
    this.sHour=cSelects[1].selectedIndex,
    this.sMinute = cSelects[2].selectedIndex,
    this.sSecond = cSelects[3].selectedIndex,
    this.onCheck= checked,
    this.cCategory= category,
    this.cTitle = cInfo[0].value,
    this.cTarget = cInfo[1].value,
    this.cMemo = cMemo.value,
    this.hour =cSelects[1].options[this.sHour].innerText,
    this.minute =cSelects[2].options[this.sMinute].innerText,
    this.second =cSelects[3].options[this.sSecond].innerText,
    this.result=function(){
        return (this.hour*3600)+(this.minute*60)+Number(this.second)
    };
};

// 선택된 리스트의 정보가 들어있는 배열에서 정보 저장
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
optionCreate(1,60);
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




//값 등록
cInfoSubmit.addEventListener("submit",write);

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
            i=0;
            toImf[a] = new Imf(checked,category);
            digit(toImf[a]);
            space.innerHTML="<div><span>"+toImf[a].onCheck+" "+"</span>"+"<span>"+toImf[a].cCategory+"</span>"+" "+"<span>"+toImf[a].hour+":"+toImf[a].minute+":"+toImf[a].second+"</span></div><h3>"+toImf[a].cTitle+"</h3>" ;
            List[0].querySelector("ul").append(space);
            a++;
    }else if(category ==="오전"){
            i=1;
            morImf[b] = new Imf(checked,category);
            digit(morImf[b]);
            space.innerHTML="<div><span>"+morImf[b].onCheck+" "+"</span>"+"<span>"+morImf[b].cCategory+"</span>"+" "+"<span>"+morImf[b].hour+":"+morImf[b].minute+":"+morImf[b].second+"</span></div><h3>"+morImf[b].cTitle+"</h3>" ;
            List[1].querySelector("ul").append(space);
            b++;
    }else if(category ==="오후"){
            i=2;
            afterImf[c] = new Imf(checked,category);
            digit(afterImf[c]);
            space.innerHTML="<div><span>"+afterImf[c].onCheck+" "+"</span>"+"<span>"+afterImf[c].cCategory+"</span>"+" "+"<span>"+afterImf[c].hour+":"+afterImf[c].minute+":"+afterImf[c].second+"</span></div><h3>"+afterImf[c].cTitle+"</h3>" ;
            List[2].querySelector("ul").append(space);
            c++;
        }

//입력란 초기화
        wInitialization();

// 클로저를 통한 값 등록
// 각 섹션안에 당겨져있는 li의 갯수 만큼 추가
    
        console.log(li,"idx",idx[i]);
            ListLiChoice(i,idx[i]++);     
            
    }
//cInfoSubmit click
//c = check



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
function wInitialization(){
    cSelects[0].options[0].selected = true;
    cInfo[0].value = "";
    cInfo[1].value = "";
    cMemo.value = "";
    cSelects[1].options[0].selected=true;
    cSelects[2].options[0].selected=true;
    cSelects[3].options[0].selected=true;  
}
function ListLiChoice(i,idx){

    li=List[i].querySelectorAll('ul li');
    console.log(li);
    li[idx].onclick=function(){
        clearInterval(timerId);
        console.log("this",this);
    if(listCheck !== i || idx !== idxCheck){
        if(listCheck != -1 && idxCheck !=-1){
            List[listCheck].querySelectorAll("ul li")[idxCheck].style.backgroundColor = "#E3CAA5";
        }
        if(List[i].id === "todayList"){
                Edit(toImf[idx]);
                tResult = toImf[idx].result();
                tWrite.innerText = toImf[idx].hour+":"+toImf[idx].minute+":"+toImf[idx].second;    
            }else if(List[i].id === "morningList"){
                Edit(morImf[idx]);
                tResult = morImf[idx].result();
                tWrite.innerText = morImf[idx].hour+":"+morImf[idx].minute+":"+morImf[idx].second;
            }else if(List[i].id ==="afternoonList"){
                Edit(afterImf[idx]);
                tResult = afterImf[idx].result();
                tWrite.innerText = afterImf[idx].hour+":"+afterImf[idx].minute+":"+afterImf[idx].second;
                
            }else{
            alert("오류");
        }
        liSpan = List[i].querySelectorAll("ul li")[idx];
        this.style.backgroundColor = "#AD8B73";
        correctionBtn.classList.remove("hidden");
        cInfoSubmits.classList.add("hidden");
        idxCheck=idx;
        listCheck=i;
        cInfo[0].disabled = true;

        }else{
            idxCheck =-1;
            listCheck =-1;
            liSpan.style.backgroundColor = "#E3CAA5";
            wInitialization();
            correctionBtn.classList.add("hidden");
            cInfoSubmits.classList.remove("hidden");
            cInfo[0].disabled = false;
        }
    }
}

// list -> title(불가) memo는 그대로 배열 객체에만 저장, 나머지 span 태그 데이터 저장
// 원래 사용하던 객체의 값을 변경 -> funcition이 따로 필요해 보임 
//
correctionBtn.onclick = function(e){
    
    e.preventDefault();
    console.log(i, idxCheck, liSpan,this);
    let listChange = liSpan.querySelectorAll("div span");
    
    if(i == 0){

    }else if(i==1){

    }else if(i==2){

    }else{
        alert("오류");
    }

}
tButton[0].onclick=function(){
    alert("b");
    timerId=setInterval(timer,1000);

}
tButton[1].onclick=function(){
    alert("c");
    clearInterval(timerId);
}


function timer(){
    console.log("tResult",isNaN(tResult));
    if(tResult <=0 || isNaN(tResult) == true){
        clearInterval(timerId);
        return 0;
    }    
    tResult--;
    let time ={
        hour: Math.floor(tResult/3600),
        minute: Math.floor((tResult%3600)/60),
        second: Math.floor((tResult%3600)%60)
    };
   digit(time);
   tWrite.innerText = time.hour+":"+time.minute+":"+time.second;
   console.log("시:"+time.hour+"분:"+time.minute+"초"+time.second);
   
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