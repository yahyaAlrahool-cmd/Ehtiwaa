var D=document.documentElement,B=document.body,L='ar',F='all';
function sg(k){try{return localStorage.getItem(k)}catch(e){return null}}
function ss(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function renderWorks(){
  var t=document.getElementById('tabs'),w=document.getElementById('works');
  t.innerHTML=TABS.map(function(x){return '<button class="tab'+(x[0]==F?' on':'')+'" data-f="'+x[0]+'">'+(L=='ar'?x[1]:x[2])+'</button>'}).join('');
  w.innerHTML=WORKS.filter(function(x){return F=='all'||x[0]==F}).map(function(x){
    return '<a class="work" href="'+x[0]+'/'+x[1]+'.pdf" target="_blank" rel="noopener"><img loading="lazy" src="assets/thumbs/'+x[1]+'.webp" alt=""><span>'+(L=='ar'?x[2]:x[3])+'</span></a>'}).join('');
  t.querySelectorAll('.tab').forEach(function(b){b.onclick=function(){F=b.dataset.f;renderWorks()}});
}
function stars(n){var o='';for(var i=1;i<=5;i++)o+='<span class="'+(i<=n?'on':'')+'">★</span>';return o}
function renderEh(){
  var g=document.getElementById('ehGrid'),sec=document.getElementById('ehrev');if(!g||!window.EH_REVIEWS||!EH_REVIEWS.length){if(sec)sec.hidden=true;return}if(sec)sec.hidden=false;
  var avg=EH_REVIEWS.reduce(function(s,r){return s+r[4]},0)/EH_REVIEWS.length;
  document.getElementById('rate').innerHTML='<b>'+avg.toFixed(1)+'</b> <span class="stars">'+stars(Math.round(avg))+'</span> <small>'+EH_REVIEWS.length+(L=='ar'?' تقييمات':' reviews')+'</small>';
  g.innerHTML=EH_REVIEWS.map(function(r){return '<div class="card quote"><div class="stars">'+stars(r[4])+'</div><q>'+(L=='en'&&r[1]?r[1]:r[0])+'</q><small>'+r[2]+' · '+r[3]+'</small></div>'}).join('');
  var m=L=='ar'?'مرحباً، أبغى أضيف تقييمي لخدمة احتواء:':'Hello, I would like to add my review of Ehtiwaa:';
  document.getElementById('addRev').href='https://wa.me/966545498018?text='+encodeURIComponent(m)}

var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function initCar(id,tid){
  var root=document.getElementById(id),tr=document.getElementById(tid);if(!root||!tr||!tr.children.length)return;
  var cs=[].slice.call(tr.children),dots=root.querySelector('.dots'),i=0,vis=false,hold=false;
  if(root._t)clearInterval(root._t);
  dots.innerHTML=cs.map(function(_,k){return '<button class="dot" aria-label="'+(k+1)+'"></button>'}).join('');
  var ds=dots.children;
  function mark(k){i=k;for(var j=0;j<ds.length;j++)ds[j].classList.toggle('on',j==k)}
  function go(k){k=(k+cs.length)%cs.length;cs[k].scrollIntoView({behavior:RM?'auto':'smooth',inline:'start',block:'nearest'});mark(k)}
  for(var j=0;j<ds.length;j++)(function(k){ds[k].onclick=function(){go(k)}})(j);
  tr.onscroll=function(){
    if(Math.abs(tr.scrollLeft)>=tr.scrollWidth-tr.clientWidth-3){mark(cs.length-1);return}
    var r=tr.getBoundingClientRect(),rtl=D.dir=='rtl',b=0,m=1e9;
    cs.forEach(function(c,k){var cr=c.getBoundingClientRect(),d=Math.abs(rtl?r.right-cr.right:cr.left-r.left);if(d<m){m=d;b=k}});
    mark(b)};
  root.querySelector('.nx').onclick=function(){go(i+1)};
  root.querySelector('.pv').onclick=function(){go(i-1)};
  ['mouseenter','focusin','touchstart'].forEach(function(e){root.addEventListener(e,function(){hold=true})});
  ['mouseleave','focusout'].forEach(function(e){root.addEventListener(e,function(){hold=false})});
  root.addEventListener('touchend',function(){setTimeout(function(){hold=false},4000)});
  if(window.IntersectionObserver)new IntersectionObserver(function(en){vis=en[0].isIntersecting},{threshold:.4}).observe(root);else vis=true;
  mark(0);
  if(!RM)root._t=setInterval(function(){if(vis&&!hold)go(i+1)},4500);
}
function bidi(t){return t.replace(/(&amp;)|([A-Za-z][A-Za-z0-9+#.]*(?: [A-Za-z0-9+#.]+)*)/g,function(m,a,b){return a?a:'<bdi>'+b+'</bdi>'})}
function lang(l){L=l;D.lang=l;D.dir=l=='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar]').forEach(function(e){var v=e.getAttribute('data-'+l);e.innerHTML=l=='ar'?bidi(v):v});
  document.querySelectorAll('.lg').forEach(function(b){b.textContent=l=='ar'?'EN':'ع'});ss('lang',l);renderWorks();renderEh();initCar('car2','ehGrid')}
document.querySelectorAll('.lg').forEach(function(b){b.onclick=function(){lang(L=='ar'?'en':'ar')}});
document.querySelectorAll('.th').forEach(function(b){b.onclick=function(){
  var n=D.getAttribute('data-theme')=='dark'?'light':'dark';D.setAttribute('data-theme',n);ss('theme',n)}});
D.setAttribute('data-theme',sg('theme')||'light');
lang(sg('lang')||'ar');
