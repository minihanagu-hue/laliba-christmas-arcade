'use strict';
(()=>{
 const el=id=>document.getElementById(id),select=el('gameMode');let mode='classic',duration=0,remaining=0,running=false,lastSecond=0;
 const names={60:'挑戰者 I・速攻',180:'挑戰者 II・標準',300:'挑戰者 III・耐力'};
 function render(){el('timerMode').textContent=mode==='challenge'?names[duration]:'經典模式';const seconds=Math.ceil(remaining/1000);el('timeLeft').textContent=mode==='challenge'?`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`:'∞';el('timeProgress').max=duration||1;el('timeProgress').value=mode==='challenge'?remaining/1000:1;el('challengeTimer').classList.toggle('urgent',mode==='challenge'&&remaining>0&&remaining<=10000);el('timerHint').textContent=mode==='challenge'?'暫停時倒數停止':'不限時';}
 function choose(){duration=[60,180,300].includes(Number(select.value))?Number(select.value):0;mode=duration?'challenge':'classic';remaining=duration*1000;el('challengeHelp').textContent=duration?`${names[duration]}｜${duration/60} 分鐘內挑戰最高分・時間到自動結算・提早堆滿也會記錄成績。`:'經典模式不限時；切換挑戰者關卡，在時限內爭取最高分。';render()}
 select.addEventListener('change',choose);choose();
 window.arcadeChallenge={begin(){choose();running=true;select.disabled=true;lastSecond=duration;return {mode,duration}},step(ms,sound){if(!running||mode!=='challenge')return ms;const active=Math.min(Math.max(0,ms),remaining);remaining=Math.max(0,remaining-active);const seconds=Math.ceil(remaining/1000);if(seconds!==lastSecond&&seconds<=10&&seconds>0)window.arcadeFX?.sound('tick',sound);lastSecond=seconds;render();return active},expired:()=>running&&mode==='challenge'&&remaining<=0,config:()=>({mode,duration}),release(){running=false;select.disabled=false;render()}};
})();
