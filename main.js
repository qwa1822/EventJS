import { setMbtiSection } from './module/mbtiSelect.js';
import { setResultContainer, setSelctCards, setSelectButton } from './module/selectCard.js';
import { setShareUrlButton } from './module/share.js';
import { setTabMenu } from './module/tabmenu.js';
import { countUp } from './utils/countUp.js';



const data={
  particepate:1232132132,
};


const particepateDOM=document.getElementById('participate-number');
particepateDOM.innerHTML=data.particepate;  //증가하는 애니메이션과 함께 갱신

countUp(particepateDOM,data.particepate,5);


setTabMenu();



setSelctCards();
setSelectButton()

setResultContainer();

setMbtiSection();

setShareUrlButton();
