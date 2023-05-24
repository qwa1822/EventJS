

// dom:innerHTML이 갱신될 노드
// target:목표 숫자
// second:몇 초가 걸릴지 
// term:몇 씩 증가할지 

// countTerm:한 term이 몇이 증가해야 하는 지  -> second, term으로 계산해서 넣어주기
export const countUp=(dom,target,second,term=15)=>{


  if(!dom || isNaN(Number(target)) || isNaN(Number(second)) || isNaN(Number(term))) return;


  let nowNumber=0;

  const countTerm=Math.floor((target/second)*(term/1000));
  



  // target/second-> 1초에 몇씩 증가할지?

  // target:900

  // second:9
  // target/second 씩 1초에 증가
  // 1초->100

  // term초->몇씩 증가해야 할까  -> (target/second)*(term/1000) 
  // term:0.1초 -> 10
  // term:0.1

  // 1초->100(target/second)
  // term->100*0.1(target/second)*term -> term이 100의단위로 나오기떄문에 1000으로나누어줌


  // 100*0.1




  


  const timeID=setInterval(()=>{  // 타이머가돌아감-> 자원을 쓰고 있음 
    if(nowNumber>target){
      nowNumber=target;
      clearInterval(timeID);   
    }
    nowNumber+=countTerm;  //100씩 더해줌

    dom.innerHTML=`${nowNumber.toLocaleString()}`;
  },term)   //term초마다 해당 함수 실행 

  // dom.innerHTML을 갱신
  // innerHTML이 n초를 간격으로 갱신
  // value+=10

}