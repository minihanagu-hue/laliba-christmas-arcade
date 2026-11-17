'use strict';
(()=>{
 const stages=[{id:'snow-market',name:'雪夜市集',min:1},{id:'lantern-village',name:'暖光部落',min:4},{id:'aurora-forest',name:'極光雪林',min:7},{id:'star-festival',name:'星空慶典',min:10}];
 const screen=document.querySelector('.arcade'),level=document.getElementById('level'),caption=document.getElementById('sceneName');
 if(!screen||!level)return;
 function update(){const n=Math.max(1,parseInt(level.textContent,10)||1);const scene=stages.filter(s=>n>=s.min).at(-1);if(screen.dataset.scene===scene.id)return;screen.dataset.scene=scene.id;screen.setAttribute('aria-label',scene.name+'・街機遊戲畫面');if(caption)caption.textContent='SCENE '+String(stages.indexOf(scene)+1).padStart(2,'0')+' · '+scene.name;}
 const observer=new MutationObserver(update);observer.observe(level,{childList:true,subtree:true,characterData:true});update();
})();
