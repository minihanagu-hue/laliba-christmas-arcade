const fullButton=document.getElementById('fullscreen');
fullButton.addEventListener('click',async()=>{
 const entering=!document.body.classList.contains('showcase');document.body.classList.toggle('showcase',entering);
 try{if(entering&&!document.fullscreenElement)await document.documentElement.requestFullscreen();else if(!entering&&document.fullscreenElement)await document.exitFullscreen()}catch{}
 fullButton.textContent=entering?'離開展示 Esc':'全螢幕展示 ⛶';
});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement){document.body.classList.remove('showcase');fullButton.textContent='全螢幕展示 ⛶'}});
document.addEventListener('keydown',e=>{if(e.code==='Escape')document.body.classList.remove('showcase')});
