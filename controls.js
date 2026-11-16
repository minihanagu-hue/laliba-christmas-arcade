'use strict';
window.installArcadeControls=({root,perform,isPlaying})=>{
 if(!root)return {releaseAll(){}};const held=new Map(),directions=new Set(['ArrowLeft','ArrowRight','ArrowDown']);
 function release(id){const h=held.get(id);if(!h)return;clearTimeout(h.delay);clearInterval(h.interval);held.delete(id);h.button.classList.remove('is-pressed');try{if(h.button.hasPointerCapture(id))h.button.releasePointerCapture(id)}catch{}}
 function releaseAll(){for(const id of [...held.keys()])release(id)}
 root.querySelectorAll('[data-key]').forEach(button=>{
  button.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;event.preventDefault();if(!isPlaying())return;const key=button.dataset.key;if([...held.values()].some(h=>h.button===button))return;const h={button,key};held.set(event.pointerId,h);try{button.setPointerCapture(event.pointerId)}catch{}button.classList.add('is-pressed');perform(key);if(directions.has(key)){h.delay=setTimeout(()=>{if(!held.has(event.pointerId))return;h.interval=setInterval(()=>{if(!isPlaying()){releaseAll();return}perform(key)},key==='ArrowDown'?45:65)},key==='ArrowDown'?110:170)}});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,event=>release(event.pointerId));
  button.addEventListener('click',event=>{if(event.detail===0&&isPlaying())perform(button.dataset.key)});
  button.addEventListener('contextmenu',e=>e.preventDefault());
 });
 window.addEventListener('blur',releaseAll);document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseAll()});return {releaseAll};
};
window.arcadeMobile={enter(){if(window.matchMedia?.('(max-width: 900px)').matches){document.body.classList.add('mobile-playing');window.scrollTo?.({top:0,left:0,behavior:'instant'})}},leave(){document.body.classList.remove('mobile-playing')}};
