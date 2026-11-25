/* Ehtiwaa Hub — واجهة نظام إدارة المحادثات والعملاء والنشر. البيانات محلية (localStorage) حتى يُربط الـ Backend. */
var $=function(s){return document.querySelector(s)};
var PL={wa:['واتساب','#25D366'],in:['لينكد إن','#0A66C2'],ig:['إنستغرام','#E1306C'],tg:['تيليغرام','#229ED9'],x:['X','#8a8a8a'],tt:['تيك توك','#fe2c55']};
var ST=['استفسار','تفاوض','اتفاق','قيد التنفيذ','مسلَّم'];
var AR_M=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
var AR_D=['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'];
function p2(n){return n<10?'0'+n:''+n}
function iso(x){return x.getFullYear()+'-'+p2(x.getMonth()+1)+'-'+p2(x.getDate())}
function dd(n){var x=new Date();x.setDate(x.getDate()+n);return iso(x)}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function uid(){return Math.random().toString(36).slice(2,9)}
function now(){var x=new Date();return p2(x.getHours())+':'+p2(x.getMinutes())}
function seed(){return{
 clients:[
  {id:'c1',name:'سارة القحطاني',platform:'wa',service:'عرض تقديمي',price:350,deadline:dd(2),status:'قيد التنفيذ',req:'20 شريحة، قالب بألوان الجامعة، تسليم PowerPoint',notes:''},
  {id:'c2',name:'مؤسسة الأفق',platform:'in',service:'موقع إلكتروني',price:2500,deadline:dd(9),status:'اتفاق',req:'موقع تعريفي من 4 صفحات عربي/إنجليزي',notes:'دفعة أولى 50%'},
  {id:'c3',name:'عبدالله الزهراني',platform:'tg',service:'بحث أكاديمي',price:600,deadline:dd(0),status:'قيد التنفيذ',req:'15 صفحة، APA، 10 مصادر',notes:''},
  {id:'c4',name:'نورة الحربي',platform:'ig',service:'دعوة رقمية',price:120,deadline:dd(5),status:'تفاوض',req:'دعوة حفل تخرج',notes:''}],
 convs:[
  {id:'v1',name:'ريم الشمري',platform:'wa',status:'new',clientId:null,unread:2,msgs:[{f:'in',t:'السلام عليكم، أبغى عرض تقديمي لمادة التسويق',time:'09:12'},{f:'in',t:'كم السعر وكم المدة؟',time:'09:13'}]},
  {id:'v2',name:'خالد المطيري',platform:'in',status:'new',clientId:null,unread:1,msgs:[{f:'in',t:'مرحباً يحيى، نبحث عن مصمم لموقع شركتنا. هل أنت متاح؟',time:'08:40'}]},
  {id:'v3',name:'سارة القحطاني',platform:'wa',status:'open',clientId:'c1',unread:0,msgs:[{f:'in',t:'تمام على السعر 350',time:'أمس'},{f:'out',t:'أبشري، أبدأ اليوم وأرسل لك مسودة بعد غد',time:'أمس'},{f:'in',t:'ممتاز، شكراً',time:'أمس'}]},
  {id:'v4',name:'مؤسسة الأفق',platform:'in',status:'open',clientId:'c2',unread:1,msgs:[{f:'out',t:'ملخص الاتفاق: 4 صفحات، 2500 ريال، تسليم خلال 9 أيام',time:'أمس'},{f:'in',t:'موافقين، نرسل الدفعة الأولى اليوم',time:'10:05'}]},
  {id:'v5',name:'نورة الحربي',platform:'ig',status:'open',clientId:'c4',unread:0,msgs:[{f:'in',t:'ممكن تخفض السعر شوي؟',time:'أمس'}]},
  {id:'v6',name:'فهد العتيبي',platform:'tg',status:'done',clientId:null,unread:0,msgs:[{f:'in',t:'شكراً على التسليم',time:'الأسبوع الماضي'}]}],
 posts:[
  {id:'p1',text:'نصائح لتصميم عرض تقديمي لا يُنسى: 3 قواعد بسيطة.',platforms:['in','ig'],at:dd(1)+'T10:00',state:'scheduled'},
  {id:'p2',text:'أعمال هذا الأسبوع من احتواء.',platforms:['tg'],at:dd(3)+'T18:30',state:'scheduled'},{id:'p3',text:'تذكير: خدمات احتواء للبحوث والعروض والمواقع.',platforms:['x','in'],at:dd(0)+'T00:05',state:'scheduled'}],
 theme:'light'}}
seed=function(){return{clients:[],convs:[],posts:[],theme:'light'}};
var S;try{S=JSON.parse(localStorage.getItem('hub1'))}catch(e){}if(!S)S=seed();
if(!S.cl2){var SD={clients:['c1','c2','c3','c4'],convs:['v1','v2','v3','v4','v5','v6'],posts:['p1','p2','p3']};Object.keys(SD).forEach(function(k){S[k]=(S[k]||[]).filter(function(x){return SD[k].indexOf(x.id)<0})});S.cl2=1;try{localStorage.setItem('hub1',JSON.stringify(S))}catch(e){}}
function save(){try{localStorage.setItem('hub1',JSON.stringify(S))}catch(e){}}
var V={tab:'new',pf:'all',cur:null,month:new Date(),sel:iso(new Date())};
function pbadge(p){return '<span class="dot" style="background:'+PL[p][1]+'"></span>'}
function initial(n){return esc((n||'؟').trim().charAt(0))}
function cl(id){return S.clients.filter(function(c){return c.id==id})[0]}
function cv(id){return S.convs.filter(function(c){return c.id==id})[0]}
var NAV=[['home','⌂','نظرة عامة'],['lab','✦','مختبر الأفكار'],['clients','☰','العملاء'],['cal','▦','التقويم'],['post','✎','النشر']];
function route(){var h=(location.hash||'#home').slice(1);return h=='inbox'?'lab':h}
function render(){
  document.documentElement.setAttribute('data-theme',S.theme||'light');
  var r=route(),nn=S.convs.filter(function(c){return c.status=='new'}).length;
  $('#nav').innerHTML=NAV.map(function(n){return '<a href="#'+n[0]+'" class="'+(r==n[0]?'on':'')+'"><i>'+n[1]+'</i><span>'+n[2]+'</span>'+(n[0]=='inbox'&&nn?'<b class="bd">'+nn+'</b>':'')+'</a>'}).join('');
  $('#title').textContent=(NAV.filter(function(n){return n[0]==r})[0]||NAV[0])[2];
  var f={home:vHome,lab:vLab,inbox:vLab,clients:vClients,cal:vCal,post:vPost,links:vLinks}[r]||vHome;
  $('#view').innerHTML=f();
  var t=$('.thread');if(t)t.scrollTop=t.scrollHeight;if(window.renderRemind)renderRemind();
}
function itemsOn(day){var o=[];S.clients.forEach(function(c){if(c.deadline==day&&c.status!='مسلَّم')o.push({k:'dl',t:c.name+' · '+c.service})});S.posts.forEach(function(p){if(p.at.slice(0,10)==day)o.push({k:'po',t:p.at.slice(11)+' نشر · '+p.text.slice(0,18)})});return o}
/* ---- home ---- */
function vHome(){
  var today=iso(new Date()),active=S.clients.filter(function(c){return c.status!='مسلَّم'}),
  week=active.filter(function(c){return c.deadline>=today&&c.deadline<=dd(7)}),
  nn=S.convs.filter(function(c){return c.status=='new'}).length,
  sch=S.posts.filter(function(p){return p.state=='scheduled'}).length,
  rev=active.reduce(function(s,c){return s+(+c.price||0)},0);
  var up=active.slice().sort(function(a,b){return a.deadline<b.deadline?-1:1}).slice(0,5);
  return '<div class="grid g4"><div class="card kpi"><b>'+labCount('قيد التجربة')+'</b><span>أفكار قيد التجربة</span></div><div class="card kpi"><b>'+active.length+'</b><span>عملاء نشطون</span></div><div class="card kpi"><b>'+week.length+'</b><span>تسليمات خلال 7 أيام</span></div><div class="card kpi"><b>'+rev.toLocaleString('en')+'</b><span>قيمة الأعمال الجارية (ريال)</span></div></div>'+
  '<div class="grid g2" style="margin-top:16px"><div class="card"><h3>شغل اليوم والأيام القادمة</h3>'+(up.length?up.map(function(c){var late=c.deadline<today;return '<div class="row"><span class="dot" style="background:'+PL[c.platform][1]+'"></span><div><b>'+esc(c.name)+'</b><br><span class="mu">'+esc(c.service)+' · '+esc(c.req).slice(0,40)+'</span></div><span class="m"><span class="tag '+(c.deadline==today||late?'g':'')+'">'+(c.deadline==today?'اليوم':c.deadline)+'</span></span></div>'}).join(''):'<div class="empty">لا توجد أعمال جارية</div>')+'</div>'+
  '<div class="card"><h3>آخر الأفكار</h3>'+labRecent()+'</div></div>'+
  '<div class="grid g2" style="margin-top:16px"><div class="card"><h3>المنشورات المجدولة ('+sch+')</h3>'+(S.posts.filter(function(p){return p.state=='scheduled'}).slice(0,3).map(function(p){return '<div class="row"><span>'+esc(p.text.slice(0,50))+'</span><span class="m">'+p.at.replace('T',' ')+'</span></div>'}).join('')||'<div class="empty">لا شيء مجدول</div>')+'</div>'+
  '<div class="card"><h3>إجراءات سريعة</h3><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn" href="#lab" style="text-decoration:none">مختبر الأفكار</a><a class="btn o" href="#post" style="text-decoration:none">منشور جديد</a><button class="btn o" data-act="newclient">عميل جديد</button></div></div></div>'}
/* ---- inbox ---- */
function vInbox(){
  var list=S.convs.filter(function(c){return c.status==V.tab&&(V.pf=='all'||c.platform==V.pf)});
  var counts={new:0,open:0,done:0};S.convs.forEach(function(c){counts[c.status]++});
  var c=cv(V.cur);if(!c||c.status!=V.tab){c=list[0];V.cur=c?c.id:null}
  var tabs=[['new','طلبات جديدة'],['open','مفتوحة'],['done','منتهية']].map(function(t){return '<button data-act="tab" data-v="'+t[0]+'" class="'+(V.tab==t[0]?'on':'')+'">'+t[1]+' ('+counts[t[0]]+')</button>'}).join('');
  var pf='<button data-act="pf" data-v="all" class="'+(V.pf=='all'?'on':'')+'">الكل</button>'+Object.keys(PL).map(function(k){return '<button data-act="pf" data-v="'+k+'" class="'+(V.pf==k?'on':'')+'">'+PL[k][0]+'</button>'}).join('');
  var L=list.map(function(x){var last=x.msgs[x.msgs.length-1];return '<div class="conv '+(c&&x.id==c.id?'on':'')+'" data-act="open" data-id="'+x.id+'"><div class="av" style="--pc:'+PL[x.platform][1]+'">'+initial(x.name)+'</div><div style="min-width:0"><b>'+esc(x.name)+(x.unread?' <span class="tag g">'+x.unread+'</span>':'')+'</b><small>'+esc(last.t)+'</small></div></div>'}).join('')||'<div class="empty">لا توجد محادثات</div>';
  var mid='<div class="empty" style="margin:auto">اختر محادثة</div>',right='';
  if(c){
    var cli=c.clientId?cl(c.clientId):null;
    mid='<div class="head"><div class="av" style="--pc:'+PL[c.platform][1]+'">'+initial(c.name)+'</div><div><b>'+esc(c.name)+'</b><br><span class="mu" style="font-size:.82rem">'+PL[c.platform][0]+'</span></div>'+(c.status=='open'?'<button class="btn d sm" data-act="done" style="margin-inline-start:auto">إنهاء المحادثة</button>':'')+'</div>'+
    (c.status=='new'?'<div class="newbox"><b>طلب جديد من '+esc(c.name)+'</b><p class="mu" style="margin:4px 0 10px">وافق لإضافة المحادثة إلى النظام والرد من هنا، دون إضافة الشخص في حسابك.</p><button class="btn" data-act="accept">قبول وإضافة للنظام</button> <button class="btn d" data-act="ignore">تجاهل</button></div>':'')+
    '<div class="thread">'+c.msgs.map(function(m){return '<div class="msg '+m.f+'">'+esc(m.t)+'<small>'+m.time+'</small></div>'}).join('')+'</div>'+
    (c.status=='open'?'<div class="comp"><textarea id="rt" placeholder="اكتب ردك..."></textarea><div style="display:flex;flex-direction:column;gap:4px"><button class="btn o sm" data-act="suggest">✦ اقتراح رد</button><button class="btn" data-act="send">إرسال</button></div></div>':'');
    right=cli?'<div class="side"><h3 style="margin:0">بيانات العميل</h3><label>الخدمة</label><input id="f_service" value="'+esc(cli.service)+'"><label>السعر (ريال)</label><input id="f_price" type="number" value="'+esc(cli.price)+'"><label>موعد التسليم</label><input id="f_deadline" type="date" value="'+esc(cli.deadline)+'"><label>المرحلة</label><select id="f_status">'+ST.map(function(s){return '<option '+(s==cli.status?'selected':'')+'>'+s+'</option>'}).join('')+'</select><label>المتطلبات</label><textarea id="f_req" rows="4">'+esc(cli.req)+'</textarea><label>ملاحظات</label><textarea id="f_notes" rows="2">'+esc(cli.notes)+'</textarea><p style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap"><button class="btn" data-act="savecli" data-id="'+cli.id+'">حفظ في الجدول</button><button class="btn o" data-act="extractopen" data-id="'+cli.id+'">الصق المحادثة</button></p></div>':'<div class="side"><h3 style="margin:0">بيانات العميل</h3><p class="mu">تظهر هنا بعد قبول الطلب، وتُحفظ تلقائياً في جدول العملاء والتقويم.</p></div>';
  }
  return '<div class="inbox"><div><div class="tabs">'+tabs+'</div><div class="tabs">'+pf+'</div><div class="list">'+L+'</div></div><div>'+mid+'</div><div>'+right+'</div></div>'}
/* ---- clients ---- */
function vClients(){
  return '<div class="card"><div style="display:flex;margin-bottom:10px"><b>'+S.clients.length+' عميل</b><span style="margin-inline-start:auto;display:flex;gap:6px"><button class="btn o sm" data-act="extractopen" data-id="">من محادثة</button><button class="btn sm" data-act="newclient">+ عميل جديد</button></span></div><div class="wrapx"><table><tr><th>العميل</th><th>الخدمة</th><th>السعر</th><th>التسليم</th><th>المرحلة</th><th>المتطلبات</th></tr>'+
  S.clients.slice().sort(function(a,b){return a.deadline<b.deadline?-1:1}).map(function(c){return '<tr class="c" data-act="editclient" data-id="'+c.id+'"><td>'+pbadge(c.platform)+' <b>'+esc(c.name)+'</b></td><td>'+esc(c.service)+'</td><td>'+esc(c.price)+'</td><td>'+esc(c.deadline)+'</td><td><span class="tag g">'+esc(c.status)+'</span></td><td class="mu">'+esc(c.req).slice(0,40)+'</td></tr>'}).join('')+'</table></div></div>'}
function clientModal(id){
  var c=id?cl(id):{id:'',name:'',platform:'wa',service:'',price:'',deadline:dd(7),status:'استفسار',req:'',notes:''};
  var m=$('#modal');m.hidden=false;
  m.innerHTML='<div class="mbox"><h3 style="margin-top:0">'+(id?'تعديل العميل':'عميل جديد')+'</h3><div class="cn"><div><label class="mu">الاسم</label><input id="m_name" value="'+esc(c.name)+'"></div><div><label class="mu">المنصة</label><select id="m_pl">'+Object.keys(PL).map(function(k){return '<option value="'+k+'" '+(k==c.platform?'selected':'')+'>'+PL[k][0]+'</option>'}).join('')+'</select></div><div><label class="mu">الخدمة</label><input id="m_service" value="'+esc(c.service)+'"></div><div><label class="mu">السعر</label><input id="m_price" type="number" value="'+esc(c.price)+'"></div><div><label class="mu">التسليم</label><input id="m_deadline" type="date" value="'+esc(c.deadline)+'"></div><div><label class="mu">المرحلة</label><select id="m_status">'+ST.map(function(s){return '<option '+(s==c.status?'selected':'')+'>'+s+'</option>'}).join('')+'</select></div><div class="f"><label class="mu">المتطلبات</label><textarea id="m_req" rows="3">'+esc(c.req)+'</textarea></div></div><p style="display:flex;gap:8px;margin-bottom:0"><button class="btn" data-act="savemodal" data-id="'+id+'">حفظ</button><button class="btn d" data-act="closemodal">إلغاء</button>'+(id?'<button class="btn d" data-act="delclient" data-id="'+id+'" style="margin-inline-start:auto">حذف</button>':'')+'</p></div>'}
/* ---- calendar ---- */
function vCal(){
  var y=V.month.getFullYear(),m=V.month.getMonth(),first=new Date(y,m,1),start=new Date(y,m,1-first.getDay()),today=iso(new Date()),h='';
  AR_D.forEach(function(x){h+='<div class="h">'+x+'</div>'});
  for(var i=0;i<42;i++){var x=new Date(start);x.setDate(start.getDate()+i);var k=iso(x),it=itemsOn(k);
    h+='<div class="day '+(x.getMonth()!=m?'o ':'')+(k==today?'t ':'')+(k==V.sel?'s':'')+'" data-act="selday" data-v="'+k+'"><b>'+x.getDate()+'</b>'+it.slice(0,3).map(function(e){return '<div class="ev '+e.k+'">'+esc(e.t)+'</div>'}).join('')+(it.length>3?'<div class="mu" style="font-size:.7rem">+'+(it.length-3)+'</div>':'')+'</div>'}
  var sel=itemsOn(V.sel);
  return '<div class="card"><div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><button class="btn o sm" data-act="mnext">→</button><b style="min-width:120px;text-align:center">'+AR_M[m]+' '+y+'</b><button class="btn o sm" data-act="mprev">←</button><span class="mu" style="margin-inline-start:auto;font-size:.85rem"><span class="dot" style="background:var(--ac)"></span> تسليم &nbsp;<span class="dot" style="background:var(--navy)"></span> نشر</span></div><div class="cal">'+h+'</div></div>'+
  '<div class="card" style="margin-top:16px"><h3>مهام '+V.sel+'</h3>'+(sel.length?sel.map(function(e){return '<div class="row"><span class="tag '+(e.k=='dl'?'g':'')+'">'+(e.k=='dl'?'تسليم':'نشر')+'</span>'+esc(e.t)+'</div>'}).join(''):'<div class="empty">لا مهام في هذا اليوم</div>')+'</div>'}
/* ---- post ---- */
function vPost(){
  var q=S.posts.slice().sort(function(a,b){return a.at<b.at?-1:1});
  return '<div class="grid g2"><div class="card"><h3>منشور جديد</h3><textarea id="p_text" rows="6" placeholder="اكتب المحتوى هنا..."></textarea><div class="mu" style="font-size:.8rem;text-align:end"><span id="cc">0</span> حرف</div><label class="mu">المنصات</label><div class="chk">'+Object.keys(PL).filter(function(k){return k!='wa'}).map(function(k){return '<label><input type="checkbox" class="p_pl" value="'+k+'"> '+pbadge(k)+PL[k][0]+'</label>'}).join('')+'</div><label class="mu">صور أو فيديو (اختياري)</label><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px"><input id="p_files" type="file" multiple accept="image/*,video/*" style="display:none"><button class="btn o sm" type="button" data-act="pickfiles">＋ إضافة ملفات</button><span id="p_fl" class="mu">'+mediaList()+'</span></div><label class="mu">وقت النشر</label><input id="p_at" type="datetime-local" value="'+dd(1)+'T10:00"><p style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn d sm" data-act="notif">🔔 تفعيل تنبيهات المتصفح</button></p><p style="display:flex;gap:8px"><button class="btn" data-act="schedule">جدولة</button><button class="btn o" data-act="postnow">انشر الآن</button></p></div>'+
  '<div class="card"><h3>قائمة النشر ('+q.length+')</h3>'+(q.map(function(p){return '<div class="row" style="align-items:flex-start"><div style="flex:1"><div>'+esc(p.text.slice(0,70))+'</div><div style="margin-top:4px">'+p.platforms.map(function(k){return '<span class="tag">'+PL[k][0]+'</span> '}).join('')+'</div></div><div class="m" style="text-align:end">'+p.at.replace('T','<br>')+'<br><span class="tag '+(p.state=='published'?'':'g')+'">'+(p.state=='published'?'نُشر':'مجدول')+'</span></div>'+(p.state=='scheduled'?'<button class="btn o sm" data-act="copypost" data-id="'+p.id+'">نسخ</button>'+prepBtns(p)+'<button class="btn sm" data-act="donepost" data-id="'+p.id+'">تم النشر</button>':'')+'<button class="btn d sm" data-act="delpost" data-id="'+p.id+'">✕</button></div>'}).join('')||'<div class="empty">لا منشورات</div>')+'</div></div>'}
/* ---- links ---- */
var ACC=[
 {k:'wa',h:'0545498018',prof:'https://wa.me/966545498018',web:'https://web.whatsapp.com/',chk:['ثبّت تطبيق واتساب للأعمال (مجاني) على الرقم','أضف وصف النشاط وساعات العمل والرد السريع','سجّل الدخول من تبويبه في تطبيق احتواء بمسح QR']},
 {k:'ig',h:'@ehtiwaa1',prof:'https://www.instagram.com/ehtiwaa1/',web:'https://www.instagram.com/direct/inbox/',chk:['حوّل الحساب إلى مهني (Creator أو Business)','أضف رابط الموقع في السيرة','فعّل الجدولة من Meta Business Suite (مجاني)','سجّل الدخول من تبويبه في تطبيق احتواء']},
 {k:'x',h:'@Ehtiwaa1',prof:'https://x.com/Ehtiwaa1',web:'https://x.com/messages',chk:['فعّل المصادقة الثنائية','ثبّت منشوراً تعريفياً بالخدمات','سجّل الدخول من تبويبه في تطبيق احتواء']},
 {k:'tt',h:'@.ehtiwaa',prof:'https://www.tiktok.com/@.ehtiwaa',web:'https://www.tiktok.com/tiktokstudio/upload',chk:['حوّل الحساب إلى حساب أعمال','أضف رابط الموقع إن توفر','جرّب الرفع والجدولة من TikTok Studio','سجّل الدخول من تبويبه في تطبيق احتواء']}];
function vLinks(){
  S.chk=S.chk||{};
  return '<div class="card" style="margin-bottom:16px;border-color:var(--ac)"><b>حسابات احتواء</b><p class="mu" style="margin:6px 0 0">المحادثات تُدار داخل تطبيق احتواء المكتبي (مجاني)، وهنا تتابع جاهزية كل حساب وتفتحه بنقرة. لا تدخل كلمات المرور في هذه اللوحة، ولا ترسلها لأحد.</p></div><div class="grid g2">'+
  ACC.map(function(x){var done=0;x.chk.forEach(function(_,i){if(S.chk[x.k+i])done++});
   return '<div class="card"><div style="display:flex;gap:10px;align-items:center">'+pbadge(x.k)+'<b>'+PL[x.k][0]+'</b><span class="tag g" style="margin-inline-start:auto">'+done+'/'+x.chk.length+'</span></div><p dir="ltr" style="margin:6px 0;text-align:right;color:var(--ac);font-weight:700">'+esc(x.h)+'</p>'+
   x.chk.map(function(c,i){return '<label style="display:flex;gap:8px;align-items:flex-start;margin:4px 0;cursor:pointer"><input type="checkbox" style="width:auto;margin-top:7px" data-act="chk" data-id="'+x.k+i+'" '+(S.chk[x.k+i]?'checked':'')+'><span class="'+(S.chk[x.k+i]?'mu':'')+'">'+c+'</span></label>'}).join('')+
   '<p style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:0"><a class="btn sm" href="'+x.prof+'" target="_blank" rel="noopener" style="text-decoration:none">فتح الحساب</a><a class="btn o sm" href="'+x.web+'" target="_blank" rel="noopener" style="text-decoration:none">فتح الرسائل/النشر</a></p></div>'}).join('')+'</div>'}
/* ---- actions ---- */

/* ===== استخراج من محادثة (محلي ومجاني) + تذكيرات النشر ===== */
var PURL={ig:'https://www.instagram.com/',in:'https://www.linkedin.com/feed/',x:'https://x.com/compose/post',tt:'https://www.tiktok.com/tiktokstudio/upload',tg:'https://web.telegram.org/',wa:'https://web.whatsapp.com/'};
var NEWACTS=['chk','extractopen','extract','copyprompt','readai','applyext','copypost','openpl','donepost','snooze','notif','askclaude','prep','pickfiles'];
function ndig(s){return s.replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)})}
function extractLocal(raw){
  var t=ndig(raw),o={service:'',price:'',deadline:'',req:''},m,all;
  var SV=[['عرض تقديمي',/عرض تقديمي|بوربوينت|باوربوينت|powerpoint|شرائح|شريحة/i],['بحث أكاديمي',/بحث|تقرير|ورقة بحثية/],['موقع إلكتروني',/موقع|ويب|صفحة هبوط/],['تصميم',/تصميم|بوستر|شعار|لوقو|هوية/],['دعوة رقمية',/دعوة|دعوات|بطاقة/]];
  for(var i=0;i<SV.length;i++)if(SV[i][1].test(t)){o.service=SV[i][0];break}
  var re=/(\d{2,6})\s*(ريال|ر\.?\s?س|sar|﷼)/ig;all=[];while((m=re.exec(t)))all.push(m[1]);
  if(!all.length){var r2=/(?:السعر|المبلغ|بسعر|ب)\s*:?\s*(\d{2,6})/g;while((m=r2.exec(t)))all.push(m[1])}
  if(all.length)o.price=all[all.length-1];
  var days=null;
  if(/بعد\s*غد/.test(t))days=2;else if(/غدا|غداً|بكرة|بكره/.test(t))days=1;else if(/اسبوعين|أسبوعين/.test(t))days=14;
  else if((m=/(\d{1,2})\s*(?:يوم|ايام|أيام)/.exec(t)))days=+m[1];else if(/اسبوع|أسبوع/.test(t))days=7;else if(/اليوم/.test(t))days=0;
  if((m=/(\d{1,2})[\/\-](\d{1,2})(?![\d])/.exec(t))&&+m[1]<=31&&+m[2]<=12){var y=new Date().getFullYear(),dt=new Date(y,+m[2]-1,+m[1]);if(dt<new Date(new Date().toDateString()))dt=new Date(y+1,+m[2]-1,+m[1]);o.deadline=iso(dt)}
  else if(days!==null)o.deadline=dd(days);
  var KW=/شريحة|شرائح|صفحة|صفحات|مصدر|مصادر|قالب|ألوان|لون|apa|ملف|powerpoint|word|إنجليزي|انجليزي|عربي|لغة|شعار|يشمل|مطلوب|أبغى|ابغى|أريد|اريد/i;
  var parts=t.split(/[\n.؟!]+/).map(function(s){return s.trim()}).filter(function(s){return s&&KW.test(s)});
  o.req=parts.slice(0,5).join(' · ').slice(0,300);
  return o}
function extModal(cid){
  var c=cid?cl(cid):null,m=$('#modal');m.hidden=false;
  m.innerHTML='<div class="mbox"><h3 style="margin-top:0">استخراج التفاصيل من محادثة</h3>'+
  (c?'<p class="mu" style="margin-top:0">العميل: <b>'+esc(c.name)+'</b></p>':'<div class="cn"><div><label class="mu">اسم العميل</label><input id="x_name"></div><div><label class="mu">المنصة</label><select id="x_pl">'+Object.keys(PL).map(function(k){return '<option value="'+k+'">'+PL[k][0]+'</option>'}).join('')+'</select></div></div>')+
  '<label class="mu">الصق نص المحادثة (انسخه من تبويب الحساب)</label><textarea id="x_text" rows="6" placeholder="الصق هنا..."></textarea>'+
  '<p style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-act="extract" data-id="'+(cid||'')+'">استخراج تلقائي</button><button class="btn sm" data-act="askclaude">حلّل بـ Claude ↗</button><button class="btn o sm" data-act="copyprompt">نسخ الطلب فقط</button></p>'+
  '<details style="margin-bottom:10px"><summary class="mu">تعليماتي لـ Claude (أسعارك وقواعدك، تُحفظ تلقائياً)</summary><textarea id="x_rules" rows="4" placeholder="مثال: بحث 10 صفحات = 150 ريال، عرض 15 شريحة = 120 ريال، التسليم الافتراضي 3 أيام...">'+esc(RL())+'</textarea></details>'+
  '<div class="cn"><div><label class="mu">الخدمة</label><input id="x_service"></div><div><label class="mu">السعر (ريال)</label><input id="x_price" type="number"></div><div><label class="mu">موعد التسليم</label><input id="x_deadline" type="date"></div><div class="f"><label class="mu">المتطلبات</label><textarea id="x_req" rows="3"></textarea></div></div>'+
  '<label class="mu">الصق رد Claude هنا وتنملي الحقول تلقائياً</label><textarea id="x_ai" rows="2" placeholder=\'{"service":"...","price":350,"deadline":"2026-11-01","req":"..."}\'></textarea><p><button class="btn o sm" data-act="readai">قراءة الرد</button> <small id="x_aimsg" class="mu"></small></p>'+
  '<p style="display:flex;gap:8px;margin-bottom:0"><button class="btn" data-act="applyext" data-id="'+(cid||'')+'">'+(c?'تطبيق على العميل':'إنشاء العميل')+'</button><button class="btn d" data-act="closemodal">إلغاء</button></p></div>'}
window.PMEDIA=[];
function mediaList(){return (window.PMEDIA||[]).map(function(m){return esc(m.n)}).join(' · ')||'لا ملفات'}
function prepBtns(p){return p.platforms.map(function(k){return '<button class="btn o sm" data-act="prep" data-id="'+p.id+'" data-v="'+k+'">جهّز في '+PL[k][0]+'</button>'}).join('')}
function prepPost(p,k,btn){var files=(p.media||[]).map(function(m){return m.p}),lab=PL[k][0];
  function done(ok,msg){if(btn)btn.textContent=(ok?'✓ ':'✗ ')+msg;else if(!ok)alert(msg)}
  if(window.deskHub){window.deskHub.publish({id:k,text:p.text,files:files}).then(function(r){done(r.ok,r.msg)}).catch(function(){done(false,'تعذر التجهيز')})}
  else{copyText(p.text);window.open(PURL[k],'_blank');done(true,'نُسخ النص')}}
document.addEventListener('change',function(e){if(e.target.id!='p_files')return;var L=[].slice.call(e.target.files);
  L.forEach(function(f){var pth='';try{pth=window.deskHub.pathOf(f)}catch(x){}if(pth)PMEDIA.push({p:pth,n:f.name})});
  if(L.length&&!window.deskHub)alert('إرفاق الملفات يعمل داخل تطبيق احتواء المكتبي فقط');
  var el=$('#p_fl');if(el)el.textContent=mediaList()});
function RL(){try{return localStorage.getItem('hub_rules')||''}catch(e){return ''}}
function buildPrompt(tx,rules){return 'أنت مساعد دقيق تستخرج بيانات طلب من محادثة واتساب. أنا مقدم الخدمة (Ehtiwaa) والعميل هو الطرف الآخر. في الملف المنسوخ قد يظهر اسمي كنقطة (.) أو بدون اسم.\n\nالمطلوب: أعد الرد داخل كتلة كود واحدة فقط (```json) تحتوي كائن JSON بهذه المفاتيح الأربعة وبعلامات اقتباس مستقيمة " فقط، وبدون أي كلام خارج الكتلة:\n{"service":"","price":0,"deadline":"","req":""}\n\nالقواعد:\n1) service: اسم الخدمة من 2 إلى 6 كلمات (مثل: بحث أكاديمي، عرض تقديمي، تصميم، دعوة رقمية، موقع إلكتروني، تدقيق وتنسيق).\n2) price: رقم واحد فقط بالريال بدون نص، وهو آخر سعر عرضته أنا أو اتفقنا عليه. إن لم يُذكر سعر اكتب 0.\n3) deadline: بصيغة YYYY-MM-DD. اليوم هو '+iso(new Date())+'. إن ذُكر تاريخ استخدمه. وإن ذُكرت مدة مثل من 14 إلى 30 يوماً فاحسب التاريخ من اليوم بأطول مدة. وإن لم يُذكر شيء اتركه "".\n4) req: جملة أو جملتان بحد أقصى 250 حرفاً، فيها ما سأنفذه بالضبط، وطريقة الدفع، وأي شرط أو انتظار (مثل اعتماد العنوان). لا تضف شيئاً غير موجود في المحادثة.\n5) لا تضع علامة " داخل النصوص.\n6) لا تخمّن، وما لم يُذكر اتركه فارغاً.'+(rules?'\n\nتعليماتي وأسعاري:\n'+rules:'')+'\n\nالمحادثة:\n'+tx}
function readAI(){var v=($('#x_ai').value||'').replace(/[“”„‟«»]/g,'"').replace(/```(?:json)?/g,''),o={},msg=$('#x_aimsg');
  try{o=JSON.parse(v.match(/\{[\s\S]*\}/)[0])}catch(e){o={};var keys='service|price|deadline|req';
    ['service','price','deadline','req'].forEach(function(k){var m=v.match(new RegExp('"?'+k+'"?\\s*:\\s*(?:"([\\s\\S]*?)"|([0-9٠-٩.,]+))\\s*(?:,\\s*"?(?:'+keys+')"?\\s*:|\\}|$)'));if(m)o[k]=m[1]!==undefined?m[1]:m[2]})}
  if(!Object.keys(o).length){if(msg)msg.textContent=v.trim().length>15?'✗ تعذرت القراءة':'';return false}
  var pr=String(o.price==null?'':o.price).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace(/[^0-9.]/g,'');if(pr=='0')pr='';
  var dl=/^\d{4}-\d{2}-\d{2}$/.test(o.deadline||'')?o.deadline:'';
  setExt({service:o.service,price:pr,deadline:dl,req:o.req});if(msg)msg.textContent='✓ تمت القراءة، راجع الحقول';return true}
document.addEventListener('input',function(e){if(e.target.id=='x_rules'){try{localStorage.setItem('hub_rules',e.target.value)}catch(x){}}if(e.target.id=='x_ai')readAI()});
function setExt(o){['service','price','deadline','req'].forEach(function(k){if(o[k]!==undefined&&o[k]!=='')$('#x_'+k).value=o[k]})}
function copyText(s){try{navigator.clipboard.writeText(s)}catch(e){var a=document.createElement('textarea');a.value=s;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}}
function dueNow(){var n=iso(new Date())+'T'+now();return S.posts.filter(function(p){return p.state=='scheduled'&&(p.snooze||p.at)<=n})}
var NOTI={};
function renderRemind(){
  var d=dueNow(),el=$('#remind');
  el.innerHTML=d.map(function(p){return '<div class="rem"><b>🔔 حان وقت النشر</b> <span class="mu" style="color:#cfd8d8">('+p.at.replace('T',' ')+')</span><div style="margin:6px 0">'+esc(p.text)+'</div><div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn sm" data-act="copypost" data-id="'+p.id+'">نسخ المحتوى</button>'+p.platforms.map(function(k){return '<button class="btn o sm" data-act="prep" data-id="'+p.id+'" data-v="'+k+'">جهّز في '+PL[k][0]+'</button>'}).join('')+'<button class="btn sm" data-act="donepost" data-id="'+p.id+'">تم النشر</button><button class="btn d sm" style="color:#cfd8d8" data-act="snooze" data-id="'+p.id+'">بعد 15 دقيقة</button></div></div>'}).join('');
  el.hidden=!d.length;
  document.title=d.length?'🔔 ('+d.length+') حان وقت النشر':'Ehtiwaa Hub | مركز التحكم';
  d.forEach(function(p){if(!NOTI[p.id]){NOTI[p.id]=1;try{if(window.Notification&&Notification.permission=='granted')new Notification('حان وقت النشر',{body:p.text.slice(0,80)})}catch(e){}}})}
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-act]');if(!t)return;var a=t.dataset.act,id=t.dataset.id;if(NEWACTS.indexOf(a)<0)return;
  if(a=='chk'){S.chk=S.chk||{};S.chk[id]=t.checked;save();render()}
  else if(a=='extractopen')extModal(id||'');
  else if(a=='extract'){var tx=$('#x_text').value.trim();if(!tx){alert('الصق المحادثة أولاً');return}setExt(extractLocal(tx));t.textContent='✓ تم الاستخراج، راجع الحقول'}
  else if(a=='copyprompt'||a=='askclaude'){var tx2=$('#x_text').value.trim();if(!tx2){alert('الصق المحادثة أولاً');return}copyText(buildPrompt(tx2,($('#x_rules')||{}).value||RL()));if(a=='askclaude'){window.open('https://claude.ai/new','_blank');t.textContent='✓ نُسخ الطلب، الصقه في Claude ثم انسخ رده وارجع هنا'}else t.textContent='✓ تم النسخ'}
  else if(a=='pickfiles'){var fi=$('#p_files');if(fi)fi.click()}
  else if(a=='prep'){var pp=S.posts.filter(function(x){return x.id==id})[0];if(pp){t.textContent='… جارٍ التجهيز';prepPost(pp,t.dataset.v,t)}}
  else if(a=='readai'){if(readAI())t.textContent='✓ تمت القراءة';else alert('تعذرت قراءة الرد، تأكد أنه JSON صحيح')}
  else if(a=='applyext'){var o;if(id){o=cl(id)}else{var nm=($('#x_name').value||'').trim();if(!nm){alert('اكتب اسم العميل');return}o={id:uid(),name:nm,platform:$('#x_pl').value,status:'استفسار',notes:''};S.clients.push(o)}
    if($('#x_service').value)o.service=$('#x_service').value;if($('#x_price').value)o.price=$('#x_price').value;o.deadline=$('#x_deadline').value||o.deadline||dd(7);if($('#x_req').value)o.req=$('#x_req').value;o.req=o.req||'';o.service=o.service||'';o.price=o.price||'';save();$('#modal').hidden=true;render()}
  else if(a=='copypost'){var p=S.posts.filter(function(x){return x.id==id})[0];if(p){copyText(p.text);t.textContent='✓ تم النسخ'}}
  else if(a=='openpl')window.open(PURL[t.dataset.v],'_blank','noopener');
  else if(a=='donepost'){S.posts.forEach(function(x){if(x.id==id)x.state='published'});save();render();renderRemind()}
  else if(a=='snooze'){var d=new Date(Date.now()+15*60000);S.posts.forEach(function(x){if(x.id==id){x.snooze=iso(d)+'T'+p2(d.getHours())+':'+p2(d.getMinutes());NOTI[id]=0}});save();renderRemind()}
  else if(a=='notif'){if(!window.Notification){alert('المتصفح لا يدعم التنبيهات');return}Notification.requestPermission().then(function(r){t.textContent=r=='granted'?'✓ التنبيهات مفعّلة':'التنبيهات غير مسموحة'})}
});
setInterval(renderRemind,20000);
var SUG=['أهلاً بك! يسعدني خدمتك. تفضل بإرسال المتطلبات والموعد المطلوب وأرسل لك السعر مباشرة.','تم، سأبدأ العمل وأرسل لك مسودة قبل الموعد بيوم. هل لديك ملاحظات إضافية؟','ملخص الاتفاق: الخدمة والسعر والموعد كما اتفقنا. أرجو تأكيدك لأبدأ التنفيذ.'];
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-act]');if(!t)return;var a=t.dataset.act,id=t.dataset.id,c;if(NEWACTS.indexOf(a)>-1)return;
  if(a=='tab'){V.tab=t.dataset.v;V.cur=null}
  else if(a=='pf')V.pf=t.dataset.v;
  else if(a=='open'){c=cv(id);V.cur=id;V.tab=c.status;V.pf='all';c.unread=0;if(route()!='inbox'){location.hash='#inbox';save();return}}
  else if(a=='accept'){c=cv(V.cur);var n={id:uid(),name:c.name,platform:c.platform,service:'',price:'',deadline:dd(7),status:'استفسار',req:'',notes:''};S.clients.push(n);c.clientId=n.id;c.status='open';c.unread=0;V.tab='open'}
  else if(a=='ignore'){cv(V.cur).status='done';V.tab='done'}
  else if(a=='done'){cv(V.cur).status='done';V.tab='done'}
  else if(a=='suggest'){$('#rt').value=SUG[Math.floor(Math.random()*SUG.length)];return}
  else if(a=='send'){var v=$('#rt').value.trim();if(!v)return;cv(V.cur).msgs.push({f:'out',t:v,time:now()})}
  else if(a=='savecli'){var q=cl(id);q.service=$('#f_service').value;q.price=$('#f_price').value;q.deadline=$('#f_deadline').value;q.status=$('#f_status').value;q.req=$('#f_req').value;q.notes=$('#f_notes').value;t.textContent='✓ تم الحفظ';save();return}
  else if(a=='newclient')return clientModal('');
  else if(a=='editclient')return clientModal(id);
  else if(a=='closemodal'){$('#modal').hidden=true;return}
  else if(a=='savemodal'){var o=id?cl(id):{id:uid()};o.name=$('#m_name').value||'بدون اسم';o.platform=$('#m_pl').value;o.service=$('#m_service').value;o.price=$('#m_price').value;o.deadline=$('#m_deadline').value||dd(7);o.status=$('#m_status').value;o.req=$('#m_req').value;o.notes=o.notes||'';if(!id)S.clients.push(o);$('#modal').hidden=true}
  else if(a=='delclient'){S.clients=S.clients.filter(function(x){return x.id!=id});$('#modal').hidden=true}
  else if(a=='mprev')V.month=new Date(V.month.getFullYear(),V.month.getMonth()-1,1);
  else if(a=='mnext')V.month=new Date(V.month.getFullYear(),V.month.getMonth()+1,1);
  else if(a=='selday')V.sel=t.dataset.v;
  else if(a=='schedule'||a=='postnow'){var tx=$('#p_text').value.trim(),pl=[].slice.call(document.querySelectorAll('.p_pl:checked')).map(function(x){return x.value});if(!tx||!pl.length){alert('اكتب المحتوى واختر منصة واحدة على الأقل');return}
    var at=a=='postnow'?iso(new Date())+'T'+now():$('#p_at').value;var np={id:uid(),text:tx,platforms:pl,at:at,state:'scheduled',media:(window.PMEDIA||[]).slice()};S.posts.push(np);window.PMEDIA=[];if(a=='postnow'&&pl.length==1)setTimeout(function(){prepPost(np,pl[0])},400)}
  else if(a=='delpost')S.posts=S.posts.filter(function(x){return x.id!=id});
  save();render()});
document.addEventListener('input',function(e){if(e.target.id=='p_text')$('#cc').textContent=e.target.value.length});
$('#th').onclick=function(){S.theme=S.theme=='dark'?'light':'dark';save();render()};
$('#reset').onclick=function(){if(confirm('إعادة البيانات التجريبية؟ سيتم حذف بياناتك الحالية في هذا المتصفح.')){S=seed();save();render()}};
$('#modal').onclick=function(e){if(e.target.id=='modal')this.hidden=true};
addEventListener('hashchange',render);render();renderRemind();

/* شريط جانبي قابل للطي: اسحب لليمين للإغلاق ولليسار للفتح، أو اضغط المقبض */
(function(){var B=document.body,sh=document.getElementById('sh'),sd=document.getElementById('side');
  function set(off){B.classList.toggle('nav-off',off);try{localStorage.setItem('hub_nav',off?'1':'0')}catch(e){}}
  try{if(localStorage.getItem('hub_nav')=='1')B.classList.add('nav-off')}catch(e){}
  var x0=null,moved=false;
  function down(e){if(e.target.closest&&e.target.closest('a,button:not(#sh),input,select,textarea'))return;x0=e.clientX;moved=false;try{e.currentTarget.setPointerCapture(e.pointerId)}catch(x){}}
  function move(e){if(x0===null)return;var dx=e.clientX-x0;if(Math.abs(dx)>40){moved=true;set(document.documentElement.dir=='rtl'?dx>0:dx<0);x0=null}}
  function up(){x0=null}
  [sh,sd].forEach(function(el){if(!el)return;el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up)});
  if(sh)sh.addEventListener('click',function(){if(moved){moved=false;return}set(!B.classList.contains('nav-off'))});
})();
