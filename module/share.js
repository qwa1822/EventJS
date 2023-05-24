

const shareUrlBtn=document.getElementById('url-share-button');



export const setShareUrlButton=()=>{

  shareUrlBtn.onclick = () => {
    
    const tempInput=document.createElement('input');
    tempInput.value=location.href;

    document.body.appendChild(tempInput);
    tempInput.select();

    document.execCommand('copy');
    
    document.body.removeChild(tempInput);
  };
}