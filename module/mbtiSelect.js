// mbti Section
// 1. 질문이 표시, yes , no 버튼
// 2. yes-> 점수+1 , no -> 점수+0
// 3. 버튼을 눌렀을 떄 다음 질문이 표시
// 4. n개의 질문이 끝나면 "잠시 기다려주세요..." 안냇말이 3초 간 뜸
// 5. 분석된 결과가 result에 표시됨
// 더 좋다.</div>

{/* <div class='mbti-container'> */}
// <div class='mbti-select'>
//   <button type='button'>YES</button>
//   <button type='button'>NO</button>
// </div>
// </div>

const [selectDOM,pendingDOM,resultDOM]=document.getElementsByClassName('mbti-container')

const mbtiQuestionDOM=document.getElementsByClassName('mbti-question')[0];
const[yesButton,noButton]=document.getElementsByClassName('mbti-select')[0].children;

const mbtiResultTitleDOM=document.getElementsByClassName('mbti-result');
const mbtiResultDescriptionDOM=document.getElementsByClassName('mbti-description');

const mbtiRetryBUtton=document.getElementsByClassName('mbti-retry-button')[0];

const mbtiQuestionList=[
  "짠 과자가 단 과자보다 좋다.",
  "봉지 과자가 박스 과자보다 좋다.",
  "과자를 뜯으면 한 번에 다 먹는다.",
  "가장 좋아하는 쿠키 종류는 무엇인가요?",
  "바삭바삭한 쿠키와 쫄깃쫄깃한 쿠키 중에 어떤 걸 좋아하시나요?",
  "직접 쿠키를 만들어 보신 적이 있나요? 있다면, 가장 자주 사용하는 레시피가 무엇인가요?",
  "쿠키에 초콜릿 칩, 견과류, 혹은 건조 과일 등 추가 재료를 넣는 것을 좋아하시나요?",
  "비건이나 글루텐 프리 쿠키를 한 번 시도해 보셨나요? 전통적인 쿠키와 비교했을 때 어땠나요?",
  "여러분의 문화나 나라에서 흔히 먹는 전통적인 쿠키가 있나요?",
  "쿠키를 우유나 다른 음료에 담가서 먹는 것을 좋아하시나요?",
  "자주 구매하거나 좋아하는 유명한 쿠키 브랜드를 몇 개 언급할 수 있나요?",
  "시장에서 더 많이 볼 수 있었으면 하는 쿠키 맛이나 조합이 있나요?",
]
let currentRound=0;
const maxRound=mbtiQuestionList.length;   // 3

let resultValue=0;


const getMbtiResult=(resultValue)=>{

  // 결과를 받아서 결과정보를 반환해주는 함수
  // 결과 정보의 형태

  switch(resultValue){
   
    case 0:
      // 실행
      return{
        title:'과자 어린이{A유형}',
        description:'과자 어린이 (A 유형) 설명',
      }
    

    case 1:
      return{
        title:"과자 초심자(B유형)",
        description:'과자 초심자 (B유형) 설명',
      }
    case 2:
      return{
        title:"과자 중급자 (C유형)",
        description:'과자 중급자 (C유형)',
      }
    default:
      return{
        title:'과자 초심자 (B유형)',
        description:'과자 초심자 (B유형) 설명'
      };


  }
}


const setPendingSection=()=>{

  // pendingDom을 나타나게-> 3초 후에 없어지게

  selectDOM.style.display='none';
  pendingDOM.style.display='block';


  setTimeout(()=>{
    pendingDOM.style.display='none';
    resultDOM.style.display='block';
  
  },3000)
}
const initialize=()=>{

  // currentround=0;
  // reusltvalue=0;
  // result-> none;
  // select-> block

  currentRound=0;
  resultValue=0;
  selectDOM.style.display='block';
  pendingDOM.style.display='none';
  resultDOM.style.display='none';

}

const setResultSection=()=>{

  // 결과 정보들을 DOM에 주입
  const{title,description}=getMbtiResult(resultValue);
  mbtiResultDescriptionDOM.innerHTML=description;
  mbtiResultTitleDOM.innerHTML=title;

  mbtiRetryBUtton.onclick=initialize

}

export const setMbtiSection=()=>{

  // 질문표시
  // 버튼이 눌렀을 때 다음 질문으로 넘어감 

  if(currentRound===maxRound){
    // 끝!->pending을 3초간 표시 -> result 표시
    setPendingSection();
    setResultSection();
    return;
  }
  selectDOM.style.display='block';

  mbtiQuestionDOM.innerHTML=mbtiQuestionList[currentRound++]; // 줄이 실행된후 증감연산자 실행 
  yesButton.onclick=()=>{
    resultValue++;
    setMbtiSection();

  }
  noButton.onclick=()=>{
    setMbtiSection()
  }


}
