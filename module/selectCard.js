// <!-- <div class='snack-card-list'>
// <button id='select-1' class='snack-card'>
//   <img src='public/assets/초코꼬북칩.jpeg' alt='초코꼬북칩' />
//   <div class='snack-description'>
//     <div>과자 이름</div>
//     <div>과자 설명 과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명</div>
//   </div>
// </button>
// <button id='select-2' class='snack-card select'>
//   <img src='public/assets/초코꼬북칩.jpeg' alt='초코꼬북칩' />
//   <div class='snack-description'>
//     <div>과자 이름</div>
//     <div>과자 설명 과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명과자 설명</div>
//   </div>
// </button>
// </div> -->





// JSON->fetch :서버에서 내려준다고 가정, 데이터 양이 너무많아서 작성하기 어려운경우 
// 클라이언트에서 정의하는 변수도 있음 -> 위의 상황이 아닌경우
import { SELECT_RESULT_KEY } from '../constants/result.js';
import { appendChildrenList, makeDOMwithProperties } from '../utils/dom.js';

const cardInfoList=[
  {
    id:1,
    imgSrc:"/public/assets/초코꼬북칩.jpeg",
    name:'초코꼬북칩',
    description:'맛잇는 초코꼬북칩'
  },
  {
    id:2,
    imgSrc:"/public/assets/나쵸.jpeg",
    name:'나쵸',
    description:'나쵸'
  },
  {
    id:3,
    imgSrc:"/public/assets/허니버터칩.jpeg",
    name:'허니버터칩',
    description:'허니버터칩'
  },
  {
    id:4,
    imgSrc:"/public/assets/홈런볼.jpeg",
    name:'홈런볼',
    description:'홈런볼'
  }



]


const getSelectedCard=()=>{
  return document.getElementsByClassName('select')?.[0]
}

const getCardById=(id)=>{
  return document.getElementById(`select-${id}`);
}


const handleSelectCard=(cardid)=>{
  // 선택된  카드를 선택했다는 표시를 하는 함수
  // 1.이미 선택되어 있던 카드는 선택 해지
  // 2. 현재 선택한 카드를 선택

  const originalSelectedCard=getSelectedCard();
  originalSelectedCard?.classList.remove('select');

  const newSelectedCard=getCardById(cardid)

  newSelectedCard?.classList.add('select');

  //id='select-1'
}




const snakCardList=document.querySelector('.snack-card-list')
const selectButtonDOM=document.getElementsByClassName('participate-button')[0];

const [notyetContainer,resultContainer]=document.getElementsByClassName('result-container')

const [, resultImageDOM,resultNameDOM,resultDescriptionDOM,selectRetryButtonDOM]=resultContainer.children;


// const resultImageDom=document.querySelector('.result-container img');


const getSeletCardDOM=({id,imgSrc,name,description})=>{

  const snakCardDOM=makeDOMwithProperties('button',{
    id:`select-${id}`,
    className:`snack-card`,
    onclick:()=>handleSelectCard(id)
  })

  const imageDOM=makeDOMwithProperties('img',{
    src:imgSrc,
    alt:name,
  })
  const descriptionContainerDOM=makeDOMwithProperties('div',{
    className:'snack-description',
  })
  const snackname=makeDOMwithProperties('div',{
    innerHTML:`${name}`
  })
  const snackdescription=makeDOMwithProperties('div',{
    innerHTML:description,
  })


  appendChildrenList(descriptionContainerDOM,[snackname,snackdescription])
  appendChildrenList(snakCardDOM,[imageDOM,descriptionContainerDOM])

  return snakCardDOM;
}


export const setSelctCards=()=>{

  // 기존의 snackCradList의 자식요소들을 받아와서 -> 순회햐면서 없애주기

  const originalSnackCrads=Object.assign([],snakCardList.children)
  originalSnackCrads.forEach((snackCard)=>snackCard.remove());

  cardInfoList.forEach((cardInfo)=>{
    const selectCardDOM=getSeletCardDOM(cardInfo);
    snakCardList.appendChild(selectCardDOM)
    
  })

  // localStorage에서 이미 선택되어져 있는 과자 id가져와서 표시

  const cardId=Number(localStorage.getItem(SELECT_RESULT_KEY))
  if(!cardId || isNaN(cardId)) return;



  handleSelectCard(cardId)



}


export const setSelectButton=()=>{

  // 1. 버튼 DOM을 받아오기
  // 2. DOM의 onclick 핸들러를 등록
    // 1) 선택된 카드의 id를 찾기
    // 2)localstroage에 해당내용저장
    // 1번에서 선택된 카드의 id가 없을때는 선택된 카드가 없다는 경고창읠 띄우기

    selectButtonDOM.onclick=()=>{
      const selectedCard=getSelectedCard();  // DOM || undefined
      console.log(selectedCard);
      if(!selectedCard){
        alert('선택된 카드가 없습니다.!')
        return;
      }

      const Cardid=selectedCard.id?.split('-')[1];
      localStorage.setItem(SELECT_RESULT_KEY,Cardid)
      setResultContainer();
    }
    
}

const initialize=()=>{


  // 과자가 선택되기 전의 상태로 되돌려 주는 함수
  // 1.localStorage의 선택된cardId를 삭제
  // 2.selectCard를 다시 구성

  localStorage.removeItem(SELECT_RESULT_KEY)

  setSelctCards();
  setResultContainer();
  
  const selectSectionDOM=document.getElementById('participate-section');
  const scrollTargetY=selectButtonDOM.offsetTop;

    
 


  
    window.scroll({
      top:scrollTargetY,
      left:0,
      behavior:'smooth',
    })
     

}

export const setResultContainer=()=>{

  // reuslt 구역을에 선택된 과자를 노출 시키는 함수
  // 과자 버튼 클릭시 , 페이지 랜딩 시 동작

  // 1. 선택된 아이디를 localStorage로 부터 받아오기
  // 2. 선택된 아이디가 저장되어 있다면, notyerContainer 없애고 resultContainer를 보여주기
  // 3. cardInfoList에서 선택된 카드의 정보를 찾아서 정보를 resultContainer에 연결시키기

  const selectedId=Number(localStorage.getItem(SELECT_RESULT_KEY));

  const isSelected=!!selectedId;   //boolean형 변환

  if(!isSelected){
    // NotyetContainer를 드러내고, resultContainer를 숨기기
    notyetContainer.style.display='block';
    resultContainer.style.display='none';
    return;
  }

  // 드러내기


  notyetContainer.style.display='none';
  resultContainer.style.display='flex';

  const cardInfo=cardInfoList.find((info)=>info.id===selectedId)

  
  resultImageDOM.src=cardInfo.imgSrc;
  resultImageDOM.alt=cardInfo.name;
  resultNameDOM.alt=cardInfo.name;
  resultDescriptionDOM.innerHTML=cardInfo.description;

  // Array.find()

  // 다시하기 버튼 

  selectRetryButtonDOM.onclick=initialize;
  
  
  // 다시하기 버튼 구현

}