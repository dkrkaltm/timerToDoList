//selector

//timerSelector
let tWrite = document.querySelector("#timer span");
let tButton = document.querySelectorAll("#timerFct button");

//cWriteSelector
let cSelects = document.querySelectorAll(".cSelects select");

//cInfoSubmit
let cInfoSubmit = document.querySelector("#cWriteForm");


//onCheck
let onCheck  = document.querySelector("#onCheck");

//cList
let cList = document.querySelector("#cList");
let List = document.querySelectorAll("#cList section");

//cInfo
let cInfo = document.querySelectorAll(".cInfo input");
let cMemo = document.querySelector("#cMemo");

//cCorrection
let cInfoButton = document.querySelector("#cInfoSubmit"); 
let cInfoRemove = document.querySelector("#cInfoRemove");
//variable
let category;
let liSpan,liMemo,liTitle
let i=0;
let a=0,b=0,c=0;
let li;
let toImf = [];
let morImf = [];
let afterImf = [];
let idx = [0,0,0];
let tResult;
let timerId=null;
let idxCheck = -1;
let listCheck = -1;
let time;
let correctionData;
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
let varImf ={
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
cInfoRemove.onclick = function(){
    correctionData.remove();
    wInitialization();
    cInfoRemove.classList.add("hidden");
    cInfoButton.innerText = "등록";
}
function write(event){
    event.preventDefault();
    let n;

    if(onCheck.checked ==true){   
        varImf.check = "반복"; // 반복 여부
    }else{
        varImf.check = "";
    }
function sectionIndex(index){
    if(index[1].selectedIndex != 0){
        n = (index[1].selectedIndex)-1;
     
    }else{
        n= index[1].selectedIndex;
    }         
}
// 카테고리 선택된 인덱스 번호로 어느 섹션에 해당되는지 구분
    if(cInfoButton.innerText ==="등록"){ 
                sectionIndex(this);
                saveImf(varImf, this);
                digit(varImf);
                spaceImf(varImf, n);

    }else if(cInfoButton.innerText === "수정"){
        saveImf(varImf, this);
        digit(varImf);
    
      if(category == varImf.category){
            reWrite(varImf);
            return;
        }else{
           if(category == "오늘"){
                n=0;
           }else if(category =="오전"){
                n=1;
           }else{
                n=2;
           }

            idx[n]--;
            sectionIndex(this);
            reWrite(varImf);
            List[n].querySelector("ul").append(correctionData);
            alert(n);
        }

        
    }else{
        alert("오류");
    }
//입력란 초기화
          wInitialization();

// 클로저를 통한 값 등록
// 각 섹션안에 당겨져있는 li의 갯수 만큼 추가
    
        //  n == list, idx == li

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
//write 값 변경
function reWrite(varImf){
    liSpan[0].innerText = varImf.check;
    liSpan[1].innerText = varImf.category;
    liSpan[2].innerText = varImf.hour+":"+varImf.minute+":"+varImf.second;
    liTitle.innerText = varImf.title;
    liMemo[0].innerText = varImf.target;
    liMemo[1].innerText = varImf.memo;

    //선택 초기화, 버튼 초기화
    List[listCheck].querySelectorAll("ul li")[idxCheck].style.backgroundColor = "#E3CAA5";
    idxCheck=-1;
    listCheck=-1;
    cInfoButton.innerText = "등록";
    cInfoRemove.classList.add("hidden");
}

//write 초기화
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
    
    li[idx].onclick=function(){
        clearInterval(timerId);
     
    if(listCheck !== n || idx !== idxCheck){
       
        if(listCheck != -1 && idxCheck !=-1){
            List[listCheck].querySelectorAll("ul li")[idxCheck].style.backgroundColor = "#E3CAA5";
        }

        correctionData = this;
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
                category = cSelects[0].options[a].innerText;
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

  
        cInfoButton.innerText = "수정";
        cInfoRemove.classList.remove("hidden");
        this.style.backgroundColor = "#AD8B73";
        idxCheck=idx;
        listCheck=n;
      
    }
    else{
        cInfoButton.innerText = "등록";
        cInfoRemove.classList.add("hidden");
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

   
}
