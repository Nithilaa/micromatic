/* Micro Matic — scroll-story layer */
(function(){
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* hero: words rise in, photo + logo drift with scroll */
const h1=document.querySelector('.hero-title');let n=0;
if(h1&&!reduce){
  const wrap=(node)=>{[...node.childNodes].forEach(c=>{
    if(c.nodeType===3){const f=document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim()){f.append(t);return;}
        const w=document.createElement('span');w.className='w';w.style.setProperty('--i',n++);
        w.innerHTML='<span></span>';w.firstChild.textContent=t;f.append(w);});
      c.replaceWith(f);
    }else if(c.nodeType===1&&c.tagName!=='BR'){wrap(c);}
  });};wrap(h1);
}
const heroImg=document.querySelector('.hero-bg img'),heroM=document.querySelector('.hero-m');
if(!reduce&&heroImg){addEventListener('scroll',()=>{const y=scrollY;if(y>innerHeight*1.3)return;
  heroImg.style.transform=`translateY(${y*.22}px) scale(1.12)`;
  if(heroM)heroM.style.transform=`translateY(${-y*.18}px) rotate(${y*.04}deg)`;},{passive:true});}

/* pinned process story */
const track=document.querySelector('.story-track');
if(track){
  const imgs=[...track.querySelectorAll('.story-media img')],lis=[...track.querySelectorAll('.story-steps li')],
        bar=document.getElementById('storyBar'),tag=document.getElementById('storyTag'),N=lis.length;let cur=-1;
  const upd=()=>{const r=track.getBoundingClientRect(),span=r.height-innerHeight;
    const p=Math.min(1,Math.max(0,-r.top/span));
    const i=Math.min(N-1,Math.floor(p*N));
    bar.style.width=(p*100)+'%';
    if(i!==cur){cur=i;imgs.forEach((m,k)=>m.classList.toggle('on',k===i));
      lis.forEach((l,k)=>l.classList.toggle('on',k===i));tag.textContent='Stage 0'+(i+1)+' / 0'+N;}};
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
  lis.forEach((l,k)=>l.addEventListener('click',()=>{const r=track.getBoundingClientRect(),span=r.height-innerHeight;
    scrollTo({top:scrollY+r.top+span*((k+.5)/N),behavior:'smooth'});}));
}

/* anatomy of a part */
const hots=[...document.querySelectorAll('.hot')],card=document.getElementById('anatCard'),
      list=document.querySelector('.anat-list');
if(hots.length){
  hots.forEach((h,k)=>{const b=document.createElement('button');b.textContent=h.dataset.t;list.append(b);
    const go=()=>{hots.forEach(x=>x.classList.toggle('on',x===h));
      [...list.children].forEach((x,j)=>x.classList.toggle('on',j===k));
      card.querySelector('h3').textContent=h.dataset.t;card.querySelector('p').textContent=h.dataset.d;
      card.classList.remove('swap');void card.offsetWidth;card.classList.add('swap');};
    h.addEventListener('click',go);h.addEventListener('mouseenter',go);b.addEventListener('click',go);h._go=go;});
  hots[0]._go();
}

/* tactile tilt on cards (mouse devices only) */
if(!reduce&&matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.cfg-opt,.industry-card,.contact-card').forEach(el=>{
    el.classList.add('tilt');
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-3px)`;});
    el.addEventListener('pointerleave',()=>{el.style.transform='';});
  });
}
})();

/* v2: parts drift at different speeds as you scroll */
(function(){
  const b=[...document.querySelectorAll('.bub')];
  if(!b.length||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const sp=[.07,-.05,.1,-.03,-.06,.09,-.02,.06,.04,-.08,.05,-.04];
  const run=()=>{b.forEach((el,i)=>{const r=el.getBoundingClientRect();
    if(r.bottom<-200||r.top>innerHeight+200)return;
    el.style.translate='0 '+((r.top+r.height/2-innerHeight/2)*sp[i%12]).toFixed(1)+'px';});};
  addEventListener('scroll',run,{passive:true});run();
})();
