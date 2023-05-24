// anchor-to-select anchor-to-result  anchor-to-mbti

//  participate-section
// result-section
// mbti-section


const headerDOM=document.getElementsByTagName('header')[0];

const headerHeight=headerDOM.offsetHeight;


const selectAnchorMenuDOM=document.getElementById('anchor-to-select')
const resultAnchorMenuDOM=document.getElementById('anchor-to-result')
const MbtiAnchorMenuDOM=document.getElementById('anchor-to-mbti')

const selectSectionDOM=document.getElementById("participate-section")
const resultSectionDOM=document.getElementById("result-section")
const mbtiSectionDOM=document.getElementById("mbti-section")


const setScrolHandler=(dom,targetDOM)=>{

  dom.onclick=()=>{
    const scrollTargetY=targetDOM.offsetTop;
 


  
    window.scroll({
      top:scrollTargetY,
      left:0,
      behavior:'smooth',
    })
     }
  
}

export const setTabMenu=()=>{
  
  // selectAnchorMenuDOM 클릭> selectSectionDOM 스크롤 이동
  // 1) 직접구현
    // 1.selectSectionDOM의 element위치를 받아옴
    // 2.window.scrollTo를 이용해서 해당 위치로 이동

    // window.scroll
  // 2.scrollIntoView 메서드

  

    setScrolHandler(selectAnchorMenuDOM,selectSectionDOM)
    setScrolHandler(resultAnchorMenuDOM,resultSectionDOM)
    setScrolHandler(MbtiAnchorMenuDOM,mbtiSectionDOM)


        

  // scrollIntoView 메서드

}