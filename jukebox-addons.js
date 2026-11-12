/* Earth Jukebox HD add-ons: more disasters + recording/download + pause. */
(()=>{
Object.assign(CATS,{
 earthquakes:{l:'Earthquakes',c:'#facc15',i:'fa-house-crack',about:'Sudden shaking of the ground as rock along a fault slips. Ranked by magnitude.',snd:'A deep thud with a rumble. Higher latitude = higher pitch.'},
 drought:{l:'Drought',c:'#d97706',i:'fa-sun',about:'A long period with far less rain than normal, drying soil, rivers and crops.',snd:'A slow, dry, low wind.'},
 dustHaze:{l:'Dust & Haze',c:'#c9a66b',i:'fa-smog',about:'Dust storms and haze from smoke or pollution that reduce visibility across wide areas.',snd:'A soft rising wind sweep.'},
 tempExtremes:{l:'Extreme Heat/Cold',c:'#f43f5e',i:'fa-temperature-high',about:'Unusually hot or cold temperatures lasting days: heat waves and cold snaps.',snd:'A bright, glassy chime.'},
 seaLakeIce:{l:'Sea & Lake Ice',c:'#67e8f9',i:'fa-icicles',about:'Icebergs and floating ice drifting in oceans and lakes.',snd:'High, icy pings.'},
 snow:{l:'Snow',c:'#e2e8f0',i:'fa-snowflake',about:'Heavy or unusual snowfall that can close roads and airports.',snd:'Soft, quiet bells.'}
});
const mat=(c,o={})=>new THREE.MeshBasicMaterial(Object.assign({color:c,transparent:true,depthWrite:false},o));
const rings=(g,n,c)=>[...Array(n)].map(()=>{const r=new THREE.Mesh(new THREE.RingGeometry(.9,1,48),mat(c,{side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));r.position.z=1.5;g.add(r);return r;});
const fall=(g,n,c,h,sp)=>{const p=new Float32Array(n*3);for(let i=0;i<n;i++)p.set([(Math.random()-.5)*8,(Math.random()-.5)*8,Math.random()*h],i*3);
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(p,3));g.add(new THREE.Points(geo,new THREE.PointsMaterial({color:c,size:1.2,transparent:true,depthWrite:false})));
 return dt=>{const a=geo.attributes.position;for(let i=0;i<n;i++){let z=a.getZ(i)-dt*sp;if(z<0)z=h;a.setZ(i,z);}a.needsUpdate=true;};};
MODEL.earthquakes=e=>{const g=new THREE.Group(),R=rings(g,3,0xfacc15),c=new THREE.Mesh(new THREE.OctahedronGeometry(1.6),mat(0xfde047));c.position.z=3;g.add(c);
 g.userData.tick=t=>{R.forEach((r,i)=>{const l=(t*.8+i/3)%1;r.scale.setScalar(1.5+l*8);r.material.opacity=.9*(1-l);});c.position.x=Math.sin(t*40)*.3;c.rotation.z=t*2;};return g;};
MODEL.drought=e=>{const g=new THREE.Group(),d=new THREE.Mesh(new THREE.CircleGeometry(5,24),mat(0xc2813b,{opacity:.6}));d.position.z=1;g.add(d);
 const s=new THREE.Mesh(new THREE.SphereGeometry(1.6,14,14),mat(0xffb347));s.position.z=7;g.add(s);
 g.userData.tick=t=>{s.scale.setScalar(1+.15*Math.sin(t*2));d.material.opacity=.45+.2*Math.sin(t*1.5);};return g;};
MODEL.dustHaze=e=>{const g=new THREE.Group(),P=[...Array(6)].map((_,i)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(2.2,10,10),mat(0xc9a66b,{opacity:.35}));g.add(m);return[m,i];});
 g.userData.tick=t=>P.forEach(([m,i])=>{m.position.set(Math.cos(t*.5+i*1.05)*4,Math.sin(t*.5+i*1.05)*4,3+i*.5);});return g;};
MODEL.tempExtremes=e=>{const g=new THREE.Group(),hot=/heat|hot|warm/i.test(e.title)||!/cold|freez|frost|snow/i.test(e.title),c=hot?0xf43f5e:0x60a5fa,s=new THREE.Mesh(new THREE.SphereGeometry(2.6,16,16),mat(c,{opacity:.8}));s.position.z=4;g.add(s);
 const R=rings(g,2,c);g.userData.tick=t=>{s.scale.setScalar(1+.2*Math.sin(t*4));R.forEach((r,i)=>{const l=(t*.6+i*.5)%1;r.scale.setScalar(2+l*7);r.material.opacity=.8*(1-l);});};return g;};
MODEL.seaLakeIce=e=>{const g=new THREE.Group(),b=new THREE.Mesh(new THREE.IcosahedronGeometry(3,0),new THREE.MeshStandardMaterial({color:0xbfe9ff,flatShading:true,roughness:.3,transparent:true,opacity:.9}));b.position.z=3;g.add(b);
 g.userData.tick=t=>{b.position.z=3+.4*Math.sin(t*1.5);b.rotation.z=t*.4;};return g;};
MODEL.snow=e=>{const g=new THREE.Group(),f=fall(g,28,0xffffff,14,3);g.userData.tick=(t,dt)=>f(dt);return g;};

const _sound=sound,XS=new Set(['earthquakes','drought','dustHaze','tempExtremes','seaLakeIce','snow']);
sound=function(e,g=1,light=false){
 if(!XS.has(e.cat))return _sound(e,g,light);
 try{const now=Tone.now(),t=Math.max(now+.03,last+.01);if(t-now>.8)return;last=t;
  if(!story)pan.pan.setValueAtTime(Math.max(-1,Math.min(1,e.lng/180)),t);
  const R=rng(hash(e.id+'|'+e.idx)),v=Math.max(.05,Math.min(1,g)),k=(e.lat+90)/180;
  if(e.cat==='earthquakes'){boom.triggerAttackRelease(LO[(Math.floor(k*LO.length)+Math.floor(R()*3))%LO.length],.5+R()*.5,t,v);slide.f.frequency.setValueAtTime(150+R()*200,t);slide.s.triggerAttackRelease(.5,t,v*.7);}
  else if(e.cat==='drought'){wind.f.frequency.setValueAtTime(250,t);wind.s.triggerAttackRelease(.9,t,v*.5);}
  else if(e.cat==='dustHaze'){wind.f.frequency.setValueAtTime(600,t);wind.f.exponentialRampToValueAtTime(1300,t+.8);wind.s.triggerAttackRelease(.8,t,v*.7);}
  else if(e.cat==='tempExtremes'){flood.triggerAttackRelease(pick(R,HI),'8n',t,v*.6);flood.triggerAttackRelease(pick(R,HI),'8n',t+.15,v*.5);}
  else if(e.cat==='seaLakeIce'){for(let i=0;i<(light?1:3);i++)drop.triggerAttackRelease(pick(R,HI),.08,t+i*.12,v*.7);}
  else flood.triggerAttackRelease(pick(R,HI),'16n',t,v*.35);
 }catch(err){console.warn('sound skipped',err);}};

function togglePause(){if(!story)return;
 if(story.paused){story.t0+=performance.now()-story.pausedAt;story.paused=false;master.gain.rampTo(1,.1);}
 else{story.paused=true;story.pausedAt=performance.now();master.gain.rampTo(0,.1);}}
const _upd=updateStory;updateStory=function(){if(story&&story.paused)return;_upd();};
const _pl=$('play').onclick;$('play').onclick=e=>story?togglePause():_pl(e);
let wasStory=false;setInterval(()=>{if(story){wasStory=true;$('pi').className='fa-solid fa-'+(story.paused?'play':'pause');$('play').classList.toggle('on',!story.paused);}
 else if(wasStory){wasStory=false;$('pi').className='fa-solid fa-play';$('play').classList.remove('on');}},150);
addEventListener('keydown',e=>{if(e.code==='Space'&&!/INPUT|SELECT|TEXTAREA|BUTTON/.test((e.target||{}).tagName)&&!$('play').disabled){e.preventDefault();$('play').click();}});

document.head.insertAdjacentHTML('beforeend','<style>#rec,#rpause{flex:none;width:36px;height:36px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.06);color:#fca5a5;cursor:pointer}#rec.on{background:#dc2626;color:#fff;animation:rb 1s infinite}#rpause{display:none}#rpause.on{background:var(--acc);color:#1a0d00}@keyframes rb{50%{opacity:.6}}#rect{font-size:11px;color:#fca5a5;display:none}#rdl{display:none;padding:7px 10px;border-radius:8px;background:#16a34a;color:#fff;font:700 11px Inter;text-decoration:none;white-space:nowrap}</style>');
$('gear').insertAdjacentHTML('beforebegin','<span id="rect" class="mono">00:00</span><button id="rpause" title="Pause / resume recording"><i class="fa-solid fa-pause"></i></button><button id="rec" title="Start recording"><i class="fa-solid fa-circle"></i></button><a id="rdl"><i class="fa-solid fa-download"></i> Download</a>');
$('opts').insertAdjacentHTML('beforeend','<select id="recfmt" title="Recording type"><option value="video">Record video + sound</option><option value="audio">Record sound only</option></select>');
const adst=Tone.context.createMediaStreamDestination();try{Tone.Destination.connect(adst);}catch(e){console.warn(e);}
let mr=null,chunks=[],elapsed=0,seg=0,timer=null,url=null;
const fmt=ms=>{const s=Math.floor(ms/1000);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');};
const tick=()=>{$('rect').textContent=fmt(elapsed+(mr&&mr.state==='recording'?performance.now()-seg:0));};
async function recStart(){
 if(!window.MediaRecorder){toast('Recording is not supported in this browser',4000);return;}
 await Tone.start();const aud=$('recfmt').value==='audio';
 const tr=[...adst.stream.getAudioTracks()];if(!aud)tr.unshift(...renderer.domElement.captureStream(30).getVideoTracks());
 const types=aud?['audio/webm;codecs=opus','audio/webm','audio/mp4']:['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm','video/mp4'];
 const mt=types.find(t=>MediaRecorder.isTypeSupported(t))||'';
 try{mr=new MediaRecorder(new MediaStream(tr),mt?{mimeType:mt,videoBitsPerSecond:6e6}:{});}catch(err){toast('Could not start recording: '+err.message,5000);return;}
 chunks=[];elapsed=0;$('rdl').style.display='none';if(url){URL.revokeObjectURL(url);url=null;}
 mr.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 mr.onstop=()=>{const type=mr.mimeType||(aud?'audio/webm':'video/webm'),ext=type.includes('mp4')?(aud?'m4a':'mp4'):'webm',b=new Blob(chunks,{type});
  url=URL.createObjectURL(b);const a=$('rdl');a.href=url;a.download='earth-jukebox-'+new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')+'.'+ext;a.style.display='inline-block';
  a.innerHTML='<i class="fa-solid fa-download"></i> Download '+ext+' ('+(b.size/1048576).toFixed(1)+' MB)';toast('Recording saved. Press Download.',4000);};
 mr.start(1000);seg=performance.now();timer=setInterval(tick,250);
 $('rec').classList.add('on');$('rec').title='Stop recording';$('rec').innerHTML='<i class="fa-solid fa-stop"></i>';$('rect').style.display='inline';$('rpause').style.display='inline-block';tick();
 toast('Recording... start playback or play an event',3000);}
function recStop(){if(!mr)return;if(mr.state==='recording')elapsed+=performance.now()-seg;clearInterval(timer);if(mr.state!=='inactive')mr.stop();
 $('rec').classList.remove('on');$('rec').title='Start recording';$('rec').innerHTML='<i class="fa-solid fa-circle"></i>';$('rpause').style.display='none';$('rpause').classList.remove('on');$('rpause').innerHTML='<i class="fa-solid fa-pause"></i>';}
function recPause(){if(!mr)return;
 if(mr.state==='recording'){elapsed+=performance.now()-seg;mr.pause();$('rpause').classList.add('on');$('rpause').innerHTML='<i class="fa-solid fa-play"></i>';}
 else if(mr.state==='paused'){mr.resume();seg=performance.now();$('rpause').classList.remove('on');$('rpause').innerHTML='<i class="fa-solid fa-pause"></i>';}}
$('rec').onclick=()=>mr&&mr.state!=='inactive'?recStop():recStart();$('rpause').onclick=recPause;

cat='all';load();
})();
