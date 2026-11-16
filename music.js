'use strict';
(()=>{
 const el=id=>document.getElementById(id),tracks={menu:'bgm_01_0s.mp3',classic:'bgm_03_50s.mp3',60:'bgm_06_152s.mp3',180:'bgm_09_234s.mp3',300:'bgm_10_253s.mp3',urgent:'bgm_11_273s.mp3',records:'bgm_12_292s.mp3'};
 const names={menu:'市集待機',classic:'經典模式',60:'1 分鐘速攻',180:'3 分鐘挑戰',300:'5 分鐘耐力',urgent:'最後 15 秒',records:'排行榜／結算'};
 const player=new Audio();player.id='arcadeMusic';player.hidden=true;document.body.append(player);player.preload='none';player.loop=true;let current='',pending=false,generation=0,failed=false;
 function desired(){if(el('recordsDialog').open)return 'records';const status=el('status').textContent;if(status==='已暫停')return null;if(status==='遊戲進行中'){const mode=el('gameMode').value;if(mode!=='classic'){const parts=el('timeLeft').textContent.split(':').map(Number);if(parts.length===2&&parts[0]*60+parts[1]>0&&parts[0]*60+parts[1]<=15)return 'urgent'}return tracks[mode]?mode:'classic'}return ['本局結束','挑戰時間到','挑戰已中斷'].includes(status)?'records':'menu'}
 function text(id,value){if(el(id).textContent!==value)el(id).textContent=value}
 function sync(){const master=el('sound').getAttribute('aria-pressed')==='true',key=desired();text('sound','音樂／音效 '+(master?'ON':'OFF'));player.volume=Math.max(0,Math.min(1,(Number(el('volume').value)||0)/100*.5));
  if(!master||!el('musicEnabled').checked||document.hidden||!key){generation++;pending=false;player.pause();el('musicStatus').textContent=!master?'配樂隨音效開關啟用':!el('musicEnabled').checked?'背景音樂已關閉':document.hidden?'背景播放已暫停':'配樂暫停';return}
  if(current!==key){generation++;pending=false;player.pause();current=key;player.src=(window.arcadeMusicSources?.[tracks[key]])||'public/assets/audio/'+tracks[key];failed=false}
  if(!failed)text('musicStatus','配樂：'+names[key]);
  if(player.paused&&!pending&&!failed){pending=true;const token=++generation;Promise.resolve(player.play()).then(()=>{if(token===generation)pending=false}).catch(()=>{if(token!==generation)return;pending=false;failed=true;el('musicStatus').textContent='配樂未能播放，請再按音效開關重試'})}
 }
 player.addEventListener('error',()=>{generation++;player.pause();failed=true;pending=false;el('musicStatus').textContent='配樂載入失敗，遊戲仍可繼續'});
 const observer=new MutationObserver(sync);observer.observe(el('status'),{childList:true,subtree:true});observer.observe(el('timeLeft'),{childList:true,subtree:true});observer.observe(el('sound'),{attributes:true,attributeFilter:['aria-pressed']});observer.observe(el('recordsDialog'),{attributes:true,attributeFilter:['open']});
 function retry(){if(failed){player.load();failed=false}sync()}
 el('sound').addEventListener('click',retry);el('musicEnabled').addEventListener('change',retry);el('volume').addEventListener('input',sync);el('gameMode').addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
 window.addEventListener('pagehide',()=>{generation++;pending=false;player.pause()});sync();
})();
