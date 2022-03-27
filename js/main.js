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
var cList = document.querySelector("#cList");
var List = document.querySelectorAll("#cList section");

//cInfo
var cInfo = document.querySelectorAll(".cInfo input");
var cMemo = document.querySelector("#cMemo");

//cCorrection
var cInfoButton = document.querySelector("#cInfoSubmit"); 
//variable
var liSpan,liMemo,liTitle
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
var time;
//object variable

// 객체 생성및 값 초기화
// function Imf(checked, category){
//     this.sCate = cSelects[0].selectedIndex,
//     this.sHour=cSelects[1].selectedIndex,
//     this.sMinute = cSelects[2].selectedIndex,
//     this.sSecond = cSelects[3].selectedIndex,
//     this.onCheck= checked,
//     this.cCategory= category,
//     this.cTitle = cInfo[0].value,
//     this.cTarget = cInfo[1].value,
//     this.cMemo = cMemo.value,
//     this.hour =cSelects[1].options[this.sHour].innerText,
//     this.minute =cSelects[2].options[this.sMinute].innerText,
//     this.second =cSelects[3].options[this.sSecond].innerText,
//     this.result=function(){
//         return (this.hour*3600)+(this.minute*60)+Number(this.second)
//     };
// };
// 반복여부, 카테고리, 주제, 목표, 내용, 시간, 초로 변환
var varImf ={
    check:"",
    category:"",
    title:"",
    target:"",
    memo:"",
    hour:0,
    minute:0,
    second:0,
    result:function(){
        return (this.hour*3600)+(this.minute*60)+Number(this.second);
    }
}
// 객체, 등록 데이터
function saveImf(varImf, reg){
    varImf.category = reg[1].options[reg[1].selectedIndex].innerText;
    varImf.hour = reg[2].options[reg[2].selectedIndex].innerText;
    varImf.minute = reg[3].options[reg[3].selectedIndex].innerText;
    varImf.second = reg[4].options[reg[4].selectedIndex].innerText;
    varImf.title = reg[5].value;
    varImf.target = reg[6].value;
    varImf.memo = reg[7].value;
    console.log("ss",varImf.memo);
}
// 선택된 리스트의 정보가 들어있는 배열에서 정보 저장
// 정보 출력 

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


function spaceImf(varImf,n){
    let space =document.createElement("li");
    space.innerHTML = "<div><span>"+varImf.check+"</span> <span>"+varImf.category+"</span> <span>"+varImf.hour+":"+varImf.minute+":"+varImf.second+"</span></div><h3>"+varImf.title+"</h3><p class='hidden'>"+varImf.target+"</p><p class='hidden'>"+varImf.memo+"</p>";
    List[n].querySelector("ul").append(space);
}

//값 등록
cInfoSubmit.addEventListener("submit",write);

function write(event){
    event.preventDefault();
    let n;

    if(onCheck.checked ==true){   
        varImf.check = "반복"; // 반복 여부
    }else{
        varImf.check = "";
    }

    if(cInfoButton.innerText ==="등록"){ 
        if(this[1].selectedIndex != 0){
            n = (this[1].selectedIndex)-1;
         
        }else{
            n= this[1].selectedIndex;
        }
                console.log(this);
                saveImf(varImf, this);
                digit(varImf);
                spaceImf(varImf, n);

    }else if(cInfoButton.innerText === "수정"){
        saveImf(varImf, this);
        digit(varImf);
        liSpan[0].innerText = varImf.check;
        liSpan[1].innerText = varImf.category;
        liSpan[2].innerText = varImf.hour+":"+varImf.minute+":"+varImf.second;

        liTitle.innerText = varImf.title;
        liMemo[0].innerText = varImf.target;
        liMemo[1].innerText = varImf.memo;
    }else{
        alert("오류");
    }

//입력란 초기화
  wInitialization();

// 클로저를 통한 값 등록
// 각 섹션안에 당겨져있는 li의 갯수 만큼 추가
    
        // console.log(li,"idx",idx[i]);
          ListLiChoice(n, idx[n]++);     
            
    }
//cInfoSubmit click
//c = check

// 자릿수에 따라 0채우기
function digit(val){
    if(val.category ==="Category"){
        val.category = "오늘"
    }
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
function wInitialization(){
    onCheck.checked = false;
    cSelects[0].options[0].selected = true;
    cInfo[0].value = "";
    cInfo[1].value = "";
    cMemo.value = "";
    cSelects[1].options[0].selected=true;
    cSelects[2].options[0].selected=true;
    cSelects[3].options[0].selected=true;  
}


function ListLiChoice(n ,idx){

    li=List[n].querySelectorAll("ul li");
    console.log(li);
    li[idx].onclick=function(){
        clearInterval(timerId);
        console.log("this",this.querySelectorAll("span"), this.querySelector("h3"));
    if(listCheck !== n || idx !== idxCheck){
       
        if(listCheck != -1 && idxCheck !=-1){
            List[listCheck].querySelectorAll("ul li")[idxCheck].style.backgroundColor = "#E3CAA5";
        }

        liSpan  = this.querySelectorAll("span");
        liTitle = this.querySelector("h3");
        liMemo = this.querySelectorAll("p");
        time = liSpan[2].innerText.split(":");
        //반복
        if(liSpan[0].innerText ==="반복"){
            onCheck.checked = true;
        }

        //select
        for(let a =0; a<cSelects[0].options.length;a++){
            if(liSpan[1].innerText === cSelects[0].options[a].innerText){
                cSelects[0].options[a].selected = true;
                break;
             
            }
        }
        cSelects[1].options[Number(time[0])+1].selected = true;
        cSelects[2].options[Number(time[1])+1].selected = true;
        cSelects[3].options[Number(time[2])+1].selected = true;

        //내용
        cInfo[0].value = liTitle.innerText;
        cInfo[1].value = liMemo[0].innerText;
        cMemo.value= liMemo[1].innerText;


    
        varImf.hour = time[0];
        varImf.minute = time[1];
        varImf.second = time[2];
       
        tWrite.innerText = varImf.hour+":"+varImf.minute+":"+varImf.second;
        tResult = varImf.result();

        console.log(liSpan, liTitle, liMemo);
        cInfoButton.innerText = "수정";
        this.style.backgroundColor = "#AD8B73";
        idxCheck=idx;
        listCheck=n;
      
    }
    else{
        cInfoButton.innerText = "등록";
        idxCheck =-1;
        listCheck =-1;
        this.style.backgroundColor = "#E3CAA5";
        tWrite.innerText = "00:00:00";
        wInitialization();
     
    }
  }
}

// // list -> title(불가) memo는 그대로 배열 객체에만 저장, 나머지 span 태그 데이터 저장
// // 원래 사용하던 객체의 값을 변경 -> funcition이 따로 필요해 보임 
// //

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
