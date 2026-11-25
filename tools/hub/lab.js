/* مختبر الأفكار — يُحمَّل قبل hub.js، ويستعمل S وsave وesc وغيرها وقت التشغيل فقط */
var LV={tab:'ideas',f:null,rc:'',posts:null,open:false};
var LB_ST=['فكرة','قيد التجربة','جاهزة','مؤجلة'],LB_PR=['عالية','متوسطة','منخفضة'],LB_CAT=['خدمة جديدة','محتوى','تطوير العمل','أخرى'],LB_PL=['x','ig','in','tt','tg'];
var LB_SEED=[
['باقة «بحث + عرض» بسعر مجمّع','بيع البحث ومعه عرض تقديمي لنفس الموضوع. لديك أمثلة فعلية في معرضك (مثل تقنيات البناء الذكي).','خدمة جديدة','عالية'],
['تحويل أي بحث إلى عرض تقديمي','خدمة منفصلة لمن عنده بحث جاهز ويحتاج عرضاً فقط، بسعر مستقل.','خدمة جديدة','عالية'],
['مراجعة وتدقيق بحوث الطلاب','أسرع وأرخص من كتابة بحث كامل، وتناسب من كتب بحثه بنفسه.','خدمة جديدة','متوسطة'],
['دعوات رقمية بقوالب قابلة للتعديل','تغيير الأسماء والتاريخ فقط، وتباع بسعر أقل وبكمية أكبر.','خدمة جديدة','متوسطة'],
['اشتراك شهري للعروض والتصميم','عدد ثابت من التصاميم والعروض شهرياً للمؤسسات الصغيرة بسعر ثابت.','خدمة جديدة','متوسطة'],
['موقع تعريفي بسعر ثابت للعملاء الصغار','استخدام موقعك الحالي كقالب لتسريع التنفيذ.','خدمة جديدة','متوسطة'],
['منشورات «قبل وبعد»','عرض الفرق قبل التعديل وبعده لعرض أو تصميم، بعد إخفاء أي بيانات للعميل.','محتوى','متوسطة'],
['نصائح قصيرة من خبرتك','قواعد تصميم العرض، وأخطاء البحوث الشائعة، في منشورات قصيرة.','محتوى','منخفضة']];
var RP_SEED=[
['عرض السعر','أهلاً {الاسم}، سعر {الخدمة} {السعر} ريال، والتسليم بحدود {الموعد}. تحب نبدأ؟'],
['ملخص الاتفاق','ملخص الاتفاق: الخدمة: {الخدمة}، السعر: {السعر} ريال، موعد التسليم: {الموعد}. أرجو تأكيدك لأبدأ التنفيذ.'],
['طلب المتطلبات','لأضبط لك العمل أحتاج: الموضوع، وعدد الصفحات أو الشرائح، واللغة، وأي ملاحظات أو قالب معين تفضله.'],
['طريقة الدفع','طريقة الدفع: [اكتب هنا تفاصيل الدفع]. بعد التحويل أرسل لي الإيصال لأبدأ.'],
['مناقشة السعر','أقدّر طلبك {الاسم}. السعر مبني على نطاق العمل المتفق عليه، وإن رغبت بتخفيض التكلفة نقدر نعدّل النطاق (مثل عدد الصفحات أو الشرائح).'],
['تسليم العمل','تم تجهيز {الخدمة} وأرفقته لك. إن كانت عندك أي تعديلات أخبرني وأعدّلها.'],
['شكر وطلب تقييم','شكراً لثقتك {الاسم}. إن كانت التجربة جيدة يسعدني أن تضيف تقييمك.']];
function lab(){
  if(!S.lab)S.lab={ideas:[],replies:[],seeded:0};
  if(!S.lab.seeded){
    LB_SEED.forEach(function(x,i){S.lab.ideas.push({id:uid(),title:x[0],note:x[1],cat:x[2],pr:x[3],status:'فكرة',t:Date.now()-i})});
    RP_SEED.forEach(function(x){S.lab.replies.push({id:uid(),title:x[0],text:x[1]})});
    S.lab.seeded=1;save();
  }
  return S.lab}
function labCount(st){return lab().ideas.filter(function(i){return i.status==st}).length}
function labRecent(){
  var a=lab().ideas.slice().sort(function(x,y){return (y.t||0)-(x.t||0)}).slice(0,5);
  return a.length?a.map(function(i){return '<a class="row" href="#lab" style="text-decoration:none;color:inherit"><b>'+esc(i.title)+'</b><span class="m"><span class="tag '+(i.status=='قيد التجربة'?'g':'')+'">'+esc(i.status)+'</span></span></a>'}).join(''):'<div class="empty">لا أفكار بعد</div>'}
function lf(){if(!LV.f)LV.f={gp_n:'5',gp_tone:'ودّية ومهنية',gp_focus:'كل الخدمات',gp_time:'10:00',gp_start:dd(1),gp_note:'',gp_pl_x:true,gp_pl_ig:true};return LV.f}
function lopt(list,sel){return list.map(function(s){return '<option '+(s==sel?'selected':'')+'>'+esc(s)+'</option>'}).join('')}
function lbTopic(){return (lab().topic||'').trim()}
function topicBox(id){return '<label class="mu">موضوع اليوم (اختياري)</label><textarea id="'+id+'" rows="2" placeholder="مثال: موسم الاختبارات النهائية، أو فكرة تدور في بالي اليوم...">'+esc(lab().topic||'')+'</textarea><small class="mu">اتركه فارغاً ليستحدث Claude بنفسه، أو اكتب الموضوع ليبني عليه الأفكار والمنشورات</small>'}
function lbT(s){return window.hubTr?window.hubTr(s):s}
function lbOpen(){window.open('https://claude.ai/new','_blank')}
function lbRules(){var r='';try{r=RL()}catch(e){}return r?'\n\nتعليماتي وأسعاري (التزم بها ولا تخترع غيرها):\n'+r:''}

/* ---------- الواجهة ---------- */
function vLab(){
  var tabs=[['ideas','بنك الأفكار'],['replies','الردود الجاهزة'],['posts','منشورات الأسبوع']].map(function(t){return '<button data-lab="tab" data-v="'+t[0]+'" class="'+(LV.tab==t[0]?'on':'')+'">'+t[1]+'</button>'}).join('');
  return '<div class="tabs" style="border:0;padding:0 0 14px">'+tabs+'</div>'+(LV.tab=='replies'?vRep():LV.tab=='posts'?vLabPosts():vIdeas())}
function vIdeas(){
  var L=lab();
  var topic='<div class="card" style="margin-bottom:14px">'+topicBox('lb_topic')+'<p style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 0"><button class="btn o sm" data-lab="brain">✦ استحدث أفكاراً بـ Claude</button><button class="btn o sm" data-lab="topicposts">✎ حوّل الموضوع إلى منشورات</button></p></div>';
  var bar='<div class="card" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:14px"><b>'+L.ideas.length+' فكرة</b><span class="mu">اسحب البطاقة بين الأعمدة، أو اضغط عليها للتعديل</span><span style="margin-inline-start:auto;display:flex;gap:6px;flex-wrap:wrap"><button class="btn sm" data-lab="addidea">+ فكرة جديدة</button></span></div>'+
  '<details class="card" style="margin-bottom:14px" '+(LV.open?'open':'')+'><summary class="mu">الصق رد Claude هنا لتتحول أفكاره إلى بطاقات تلقائياً</summary><textarea id="lb_paste" rows="3" placeholder="الصق هنا، سطر لكل فكرة: العنوان | الوصف" style="margin-top:8px"></textarea><small id="lb_msg" class="mu"></small></details>';
  var board=LB_ST.map(function(st){
    var items=L.ideas.filter(function(i){return i.status==st}).sort(function(a,b){return LB_PR.indexOf(a.pr)-LB_PR.indexOf(b.pr)||(b.t||0)-(a.t||0)});
    return '<div class="col" data-st="'+st+'"><h4><span>'+st+'</span><span class="tag">'+items.length+'</span></h4>'+items.map(function(i){
      return '<div class="idea" draggable="true" data-lab="editidea" data-id="'+i.id+'"><b>'+esc(i.title)+'</b>'+(i.note?'<small>'+esc(lbT(i.note).slice(0,90))+(lbT(i.note).length>90?'…':'')+'</small>':'')+'<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;align-items:center"><span class="tag '+(i.pr=='عالية'?'g':'')+'">'+esc(i.pr)+'</span><span class="tag">'+esc(i.cat)+'</span><button class="btn o sm" style="margin-inline-start:auto" data-lab="develop" data-id="'+i.id+'">✦ طوّرها</button></div></div>'}).join('')+'</div>'}).join('');
  return topic+bar+'<div class="board">'+board+'</div>'}
function vRep(){
  var L=lab(),cs=S.clients;
  var sel='<select id="rp_client" style="max-width:260px"><option value="">بدون عميل (تبقى الحقول {} كما هي)</option>'+cs.map(function(c){return '<option value="'+c.id+'" '+(c.id==LV.rc?'selected':'')+'>'+esc(c.name)+'</option>'}).join('')+'</select>';
  return '<div class="card" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:14px"><b>'+L.replies.length+' رد جاهز</b><span class="mu">اختر عميلاً لتُملأ {الاسم} و{الخدمة} و{السعر} و{الموعد} تلقائياً</span><span style="margin-inline-start:auto;display:flex;gap:6px;flex-wrap:wrap;align-items:center">'+sel+'<button class="btn sm" data-lab="addrep">+ رد جديد</button></span></div>'+
  '<div class="grid g2">'+(L.replies.map(function(r){return '<div class="card"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b>'+esc(r.title)+'</b><button class="btn d sm" style="margin-inline-start:auto" data-lab="editrep" data-id="'+r.id+'">تعديل</button></div><div style="white-space:pre-wrap;margin-bottom:10px">'+esc(fillRp(r.text))+'</div><button class="btn sm" data-lab="copyrep" data-id="'+r.id+'">نسخ</button></div>'}).join('')||'<div class="empty">لا ردود بعد</div>')+'</div>'}
function fillRp(txt){
  var c=LV.rc?cl(LV.rc):null;if(!c)return txt;
  var m={'الاسم':c.name,'الخدمة':c.service,'السعر':c.price,'الموعد':c.deadline};
  return txt.replace(/\{([^}]+)\}/g,function(a,k){return m[k]?m[k]:a})}
function vLabPosts(){
  var f=lf();
  var pls=LB_PL.map(function(k){return '<label><input type="checkbox" id="gp_pl_'+k+'" '+(f['gp_pl_'+k]?'checked':'')+'> '+pbadge(k)+PL[k][0]+'</label>'}).join('');
  var form='<div class="card"><h3>مولّد منشورات الأسبوع</h3>'+topicBox('gp_topic')+'<label class="mu">المنصات</label><div class="chk">'+pls+'</div>'+
  '<div class="cn"><div><label class="mu">عدد المنشورات</label><select id="gp_n">'+lopt(['3','5','7'],f.gp_n)+'</select></div><div><label class="mu">النبرة</label><select id="gp_tone">'+lopt(['ودّية ومهنية','رسمية','حماسية','بسيطة ومباشرة'],f.gp_tone)+'</select></div>'+
  '<div><label class="mu">التركيز</label><select id="gp_focus">'+lopt(['كل الخدمات','البحوث الأكاديمية','العروض التقديمية','التصميم','الدعوات الرقمية','المواقع الإلكترونية','التدقيق والتنسيق'],f.gp_focus)+'</select></div><div><label class="mu">تبدأ من</label><input type="date" id="gp_start" value="'+esc(f.gp_start)+'"></div><div><label class="mu">وقت النشر اليومي</label><input type="time" id="gp_time" value="'+esc(f.gp_time)+'"></div>'+
  '<div class="f"><label class="mu">ملاحظة إضافية (اختياري)</label><input id="gp_note" value="'+esc(f.gp_note)+'" placeholder="مثال: موسم الاختبارات، عرض خاص، فكرة بعينها"></div></div>'+
  '<p style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-lab="genposts">✦ ولّد بـ Claude</button></p><label class="mu">الصق رد Claude هنا وتظهر المنشورات تلقائياً</label><textarea id="gp_paste" rows="3" placeholder="المنشورات مفصولة بسطر ---"></textarea></div>';
  var prev='';
  if(LV.posts&&LV.posts.length)prev='<div class="card" style="margin-top:16px"><h3>راجع المنشورات ('+LV.posts.length+')</h3>'+LV.posts.map(function(p,i){return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px"><textarea class="gp_t" data-i="'+i+'" rows="3">'+esc(p)+'</textarea><button class="btn d sm" data-lab="rmpost" data-i="'+i+'">✕</button></div>'}).join('')+'<p style="display:flex;gap:8px;margin-bottom:0"><button class="btn" data-lab="schedposts">جدولة الكل (واحد كل يوم)</button><span class="mu" style="align-self:center">تظهر بعدها في قائمة النشر</span></p></div>';
  return form+prev}

/* ---------- نوافذ ---------- */
function ideaModal(id){
  var i=id?lab().ideas.filter(function(x){return x.id==id})[0]:{title:'',note:'',cat:'خدمة جديدة',pr:'متوسطة',status:'فكرة'};
  var m=$('#modal');m.hidden=false;
  m.innerHTML='<div class="mbox"><h3 style="margin-top:0">'+(id?'تعديل الفكرة':'فكرة جديدة')+'</h3><div class="cn"><div class="f"><label class="mu">العنوان</label><input id="li_title" value="'+esc(i.title)+'"></div><div><label class="mu">الحالة</label><select id="li_st">'+lopt(LB_ST,i.status)+'</select></div><div><label class="mu">الأولوية</label><select id="li_pr">'+lopt(LB_PR,i.pr)+'</select></div><div class="f"><label class="mu">التصنيف</label><select id="li_cat">'+lopt(LB_CAT,i.cat)+'</select></div><div class="f"><label class="mu">ملاحظات</label><textarea id="li_note" rows="5">'+esc(i.note)+'</textarea></div></div><p style="display:flex;gap:8px;margin-bottom:0"><button class="btn" data-lab="saveidea" data-id="'+(id||'')+'">حفظ</button><button class="btn d" data-lab="closem">إلغاء</button>'+(id?'<button class="btn d" data-lab="delidea" data-id="'+id+'" style="margin-inline-start:auto">حذف</button>':'')+'</p></div>'}
function repModal(id){
  var r=id?lab().replies.filter(function(x){return x.id==id})[0]:{title:'',text:''};
  var m=$('#modal');m.hidden=false;
  m.innerHTML='<div class="mbox"><h3 style="margin-top:0">'+(id?'تعديل الرد':'رد جديد')+'</h3><label class="mu">العنوان</label><input id="lr_title" value="'+esc(r.title)+'"><label class="mu">النص (يمكنك استعمال {الاسم} {الخدمة} {السعر} {الموعد})</label><textarea id="lr_text" rows="6">'+esc(r.text)+'</textarea><p style="display:flex;gap:8px;margin-bottom:0"><button class="btn" data-lab="saverep" data-id="'+(id||'')+'">حفظ</button><button class="btn d" data-lab="closem">إلغاء</button>'+(id?'<button class="btn d" data-lab="delrep" data-id="'+id+'" style="margin-inline-start:auto">حذف</button>':'')+'</p></div>'}

/* ---------- طلبات Claude ---------- */
var SVC='بحوث أكاديمية، عروض تقديمية، تصميم، دعوات رقمية، مواقع إلكترونية، تدقيق وتنسيق';
function promptBrain(){
  var cur=lab().ideas.map(function(i){return '- '+i.title}).join('\n');
  return 'أنا يحيى الرحول، صاحب علامة Ehtiwaa (احتواء) وخدماتها: '+SVC+'. أعمل مع طلاب وعملاء أفراد وأعمال صغيرة عبر واتساب وإنستغرام وX وتيك توك.\n\n'+(lbTopic()?'الموضوع الذي في بالي اليوم: «'+lbTopic()+'»\nاقترح 8 أفكار جديدة وعملية تدور حول هذا الموضوع وتفيد عملي (خدمات أو باقات أو محتوى أو تحسين طريقة العمل)، ولا تكرر الأفكار الموجودة عندي:\n':'اقترح 8 أفكار جديدة وعملية لتطوير عملي وزيادة طلباته (خدمات أو باقات أو محتوى أو تحسين طريقة العمل)، ولا تكرر الأفكار الموجودة عندي:\n')+(cur||'(لا شيء بعد)')+'\n\nالقواعد:\n1) أعد الرد داخل كتلة كود واحدة فقط، سطر واحد لكل فكرة بهذه الصيغة: العنوان | وصف في جملة واحدة\n2) بدون ترقيم ولا عناوين ولا كلام خارج الكتلة.\n3) لا تخترع أرقاماً أو أسعاراً أو آراء عملاء.'+lbRules()}
function promptDevelop(i){
  return 'أنا يحيى الرحول، صاحب علامة Ehtiwaa (احتواء) وخدماتها: '+SVC+'.\n\nأريد تطوير هذه الفكرة:\nالعنوان: '+i.title+'\nالوصف: '+(i.note||'-')+'\n\nأعطني بالعربية وبإيجاز: 1) من هو العميل المستهدف، 2) شكل العرض أو الباقة، 3) كيف أحسب السعر (اقترح طريقة حساب ولا تخترع أرقاماً)، 4) خطوات التنفيذ، 5) المخاطر، 6) أصغر تجربة أقدر أجرّبها هذا الأسبوع.'+lbRules()}
function promptPosts(f,pl){
  var ideas=lab().ideas.filter(function(i){return i.status=='قيد التجربة'||i.status=='جاهزة'}).map(function(i){return '- '+i.title}).join('\n');
  var names=pl.map(function(k){return PL[k][0]}).join('، ');
  return 'أنت كاتب محتوى لعلامة Ehtiwaa (احتواء) لصاحبها يحيى الرحول، وخدماتها: '+SVC+'.\n\nاكتب '+f.gp_n+' منشورات لأسبوع على: '+names+'.\nالنبرة: '+f.gp_tone+'.\n'+(lbTopic()?'الموضوع الرئيسي لهذا الأسبوع: «'+lbTopic()+'». اجعل المنشورات تدور حوله من زوايا مختلفة بما يخدم علامتي، ولا تذكر خدمات لا علاقة لها به.\n':'التركيز: '+f.gp_focus+'.')+(f.gp_note?'\nملاحظة: '+f.gp_note:'')+'\n\nالقواعد:\n1) كل منشور بفكرة مختلفة (نصيحة، قبل وبعد، تعريف بخدمة، سؤال تفاعلي...).\n2) لا تخترع آراء عملاء أو أرقاماً أو أسعاراً أو وعوداً غير مذكورة هنا.\n3) '+(pl.indexOf('x')>-1?'لأن X ضمن المنصات: لا يزيد أي منشور عن 270 حرفاً.':'اجعل المنشور مناسباً لطول المنصات المختارة.')+'\n4) أضف دعوة لطيفة للتواصل في بعضها فقط، وبحد أقصى 3 وسوم.\n5) أعد الرد داخل كتلة كود واحدة، وافصل بين المنشورات بسطر فيه --- فقط، بدون ترقيم ولا عناوين ولا كلام خارج الكتلة.'+(ideas?'\n\nأفكار أعمل عليها يمكنك الاستفادة منها:\n'+ideas:'')+lbRules()}

/* ---------- قراءة ردود Claude ---------- */
function parseIdeas(raw){
  return raw.replace(/```[a-z]*/gi,'').split(/\n+/).map(function(l){return l.replace(/^[\s\-\*•\d\.\)\(]+/,'').trim()}).filter(function(l){return l.length>3}).map(function(l){var k=l.indexOf('|');return k>0?[l.slice(0,k).trim(),l.slice(k+1).trim()]:[l,'']}).filter(function(x){return x[0]})}
function parsePosts(raw){
  return raw.replace(/```[a-z]*/gi,'').split(/\n\s*-{3,}\s*\n?/).map(function(p){return p.replace(/^\s*\d+[\)\.\-]\s*/,'').trim()}).filter(function(p){return p.length>5})}

/* ---------- الأحداث ---------- */
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-lab]');if(!t)return;
  var a=t.dataset.lab,id=t.dataset.id,L=lab();
  if(a=='tab'){LV.tab=t.dataset.v;render();return}
  if(a=='addidea'){ideaModal('');return}
  if(a=='editidea'){ideaModal(id);return}
  if(a=='closem'){$('#modal').hidden=true;return}
  if(a=='saveidea'){
    var ti=$('#li_title').value.trim();if(!ti){alert('اكتب عنواناً للفكرة');return}
    var o=id?L.ideas.filter(function(x){return x.id==id})[0]:{id:uid(),t:Date.now()};
    o.title=ti;o.status=$('#li_st').value;o.pr=$('#li_pr').value;o.cat=$('#li_cat').value;o.note=$('#li_note').value;
    if(!id)L.ideas.push(o);save();$('#modal').hidden=true;render();return}
  if(a=='delidea'){L.ideas=L.ideas.filter(function(x){return x.id!=id});save();$('#modal').hidden=true;render();return}
  if(a=='develop'){var i=L.ideas.filter(function(x){return x.id==id})[0];if(!i)return;copyText(promptDevelop(i));lbOpen();t.textContent='✓ نُسخ الطلب، الصقه في Claude';return}
  if(a=='brain'){copyText(promptBrain());lbOpen();LV.open=true;t.textContent='✓ نُسخ الطلب، الصقه في Claude ثم الصق رده تحت';var d=document.querySelector('details.card');if(d)d.open=true;return}
  if(a=='topicposts'){LV.tab='posts';render();return}
  if(a=='addrep'){repModal('');return}
  if(a=='editrep'){repModal(id);return}
  if(a=='saverep'){
    var rt=$('#lr_title').value.trim(),tx=$('#lr_text').value.trim();if(!rt||!tx){alert('اكتب العنوان والنص');return}
    var r=id?L.replies.filter(function(x){return x.id==id})[0]:{id:uid()};r.title=rt;r.text=tx;if(!id)L.replies.push(r);save();$('#modal').hidden=true;render();return}
  if(a=='delrep'){L.replies=L.replies.filter(function(x){return x.id!=id});save();$('#modal').hidden=true;render();return}
  if(a=='copyrep'){var q=L.replies.filter(function(x){return x.id==id})[0];if(q){copyText(fillRp(q.text));t.textContent='✓ تم النسخ'}return}
  if(a=='genposts'){
    var f=lf(),pl=LB_PL.filter(function(k){return f['gp_pl_'+k]});if(!pl.length){alert('اختر منصة واحدة على الأقل');return}
    copyText(promptPosts(f,pl));lbOpen();t.textContent='✓ نُسخ الطلب، الصقه في Claude ثم الصق رده تحت';return}
  if(a=='rmpost'){LV.posts.splice(+t.dataset.i,1);if(!LV.posts.length)LV.posts=null;render();return}
  if(a=='schedposts'){
    var g=lf(),pls=LB_PL.filter(function(k){return g['gp_pl_'+k]});if(!pls.length){alert('اختر منصة واحدة على الأقل');return}
    var base=new Date(g.gp_start+'T00:00:00');if(isNaN(base)){alert('تاريخ البداية غير صحيح');return}
    LV.posts.filter(function(x){return x.trim()}).forEach(function(tx2,k){var d=new Date(base);d.setDate(base.getDate()+k);S.posts.push({id:uid(),text:tx2.trim(),platforms:pls.slice(),at:iso(d)+'T'+(g.gp_time||'10:00'),state:'scheduled',media:[]})});
    LV.posts=null;save();location.hash='#post';return}
});
document.addEventListener('input',function(e){
  var el=e.target,id=el.id||'';
  if(id=='lb_topic'||id=='gp_topic'){lab().topic=el.value;return}
  if(id.indexOf('gp_')==0&&id!='gp_paste'){lf()[id]=el.type=='checkbox'?el.checked:el.value}
  if(el.classList&&el.classList.contains('gp_t')&&LV.posts)LV.posts[+el.dataset.i]=el.value});
document.addEventListener('change',function(e){
  var el=e.target,id=el.id||'';
  if(id=='lb_topic'||id=='gp_topic'){lab().topic=el.value;save();return}
  if(id.indexOf('gp_')==0&&id!='gp_paste')lf()[id]=el.type=='checkbox'?el.checked:el.value;
  if(id=='rp_client'){LV.rc=el.value;render()}});
document.addEventListener('paste',function(e){
  var el=e.target,id=el.id||'';
  if(id!='lb_paste'&&id!='gp_paste')return;
  setTimeout(function(){
    var v=el.value;
    if(id=='lb_paste'){var a=parseIdeas(v);if(!a.length)return;a.forEach(function(x,i){lab().ideas.push({id:uid(),title:x[0],note:x[1],cat:'خدمة جديدة',pr:'متوسطة',status:'فكرة',t:Date.now()+i})});LV.open=false;save();render()}
    else{var p=parsePosts(v);if(!p.length)return;LV.posts=p;render()}
  },60)});

/* سحب وإفلات البطاقات بين الأعمدة */
document.addEventListener('dragstart',function(e){var c=e.target.closest&&e.target.closest('.idea');if(!c)return;e.dataTransfer.setData('text/plain',c.dataset.id);e.dataTransfer.effectAllowed='move';c.classList.add('drag')});
document.addEventListener('dragend',function(){document.querySelectorAll('.drag,.over').forEach(function(x){x.classList.remove('drag');x.classList.remove('over')})});
document.addEventListener('dragover',function(e){var c=e.target.closest&&e.target.closest('.col');if(!c)return;e.preventDefault();c.classList.add('over')});
document.addEventListener('dragleave',function(e){var c=e.target.closest&&e.target.closest('.col');if(c&&!c.contains(e.relatedTarget))c.classList.remove('over')});
document.addEventListener('drop',function(e){
  var c=e.target.closest&&e.target.closest('.col');if(!c)return;e.preventDefault();
  var id=e.dataTransfer.getData('text/plain'),i=lab().ideas.filter(function(x){return x.id==id})[0];
  if(i&&i.status!=c.dataset.st){i.status=c.dataset.st;save()}render()});
