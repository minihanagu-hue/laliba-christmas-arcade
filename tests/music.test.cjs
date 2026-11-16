const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=require('node:path').join(__dirname,'..');
class E{constructor(){this.textContent='';this.value='';this.checked=true;this.events={};this.open=false;this.attrs={}}addEventListener(k,f){this.events[k]=f}getAttribute(k){return this.attrs[k]}}
const els=Object.fromEntries(['sound','status','volume','musicEnabled','musicStatus','gameMode','timeLeft','recordsDialog'].map(k=>[k,new E()]));els.sound.attrs['aria-pressed']='false';els.volume.value='45';els.gameMode.value='classic';els.status.textContent='等待挑戰';
let audio,notify;class A{constructor(){audio=this;this.paused=true;this.events={};this.playCount=0}play(){this.paused=false;this.playCount++;return Promise.resolve()}pause(){this.paused=true}load(){this.paused=true}addEventListener(k,f){this.events[k]=f}}
const document={body:{append(){}},hidden:false,getElementById:id=>els[id],events:{},addEventListener(k,f){this.events[k]=f}},window={addEventListener(){}};
vm.runInNewContext(fs.readFileSync(root+'/music.js','utf8'),{document,window,Audio:A,MutationObserver:class{constructor(cb){notify=cb}observe(){}},Promise});
assert.equal(audio.playCount,0);els.sound.attrs['aria-pressed']='true';els.sound.events.click();assert(audio.src.endsWith('bgm_01_0s.mp3'));assert.equal(audio.volume,.225);assert(audio.loop);
els.status.textContent='遊戲進行中';notify();assert(audio.src.endsWith('bgm_03_50s.mp3'));
for(const [mode,file] of [['60','bgm_06_152s.mp3'],['180','bgm_09_234s.mp3'],['300','bgm_10_253s.mp3']]){els.gameMode.value=mode;els.timeLeft.textContent='00:30';notify();assert(audio.src.endsWith(file))}
els.timeLeft.textContent='00:15';notify();assert(audio.src.endsWith('bgm_11_273s.mp3'));els.status.textContent='已暫停';notify();assert(audio.paused);els.status.textContent='遊戲進行中';notify();assert(!audio.paused);
els.recordsDialog.open=true;notify();assert(audio.src.endsWith('bgm_12_292s.mp3'));document.hidden=true;document.events.visibilitychange();assert(audio.paused);document.hidden=false;document.events.visibilitychange();assert(!audio.paused);
els.musicEnabled.checked=false;els.musicEnabled.events.change();assert(audio.paused);els.musicEnabled.checked=true;els.musicEnabled.events.change();assert(!audio.paused);els.sound.attrs['aria-pressed']='false';notify();assert(audio.paused);els.sound.attrs['aria-pressed']='true';els.sound.events.click();audio.events.error();const n=audio.playCount;notify();assert.equal(audio.playCount,n);assert(els.musicStatus.textContent.includes('失敗'));els.sound.events.click();assert(audio.playCount>n);
console.log('PASS: gesture-gated master switch, seven scene tracks, urgent timer, pause/resume, records, visibility, music mute, volume, error recovery; no player-data writes');
