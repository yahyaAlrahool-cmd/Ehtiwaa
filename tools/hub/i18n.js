/* النسخة الإنجليزية للنظام — يُحمَّل بعد hub.js.
   الفكرة: النصوص العربية تبقى في الكود كما هي، وهذا الملف يترجم ما يظهر على الشاشة تلقائياً ويعيده للعربية عند الرجوع.
   لإضافة ترجمة أو تصحيحها: عدّل القاموس D أدناه فقط. */
(function(){
var NK=function(s){return String(s).replace(/[\u0651\u064E\u0640]/g,'')};
var D={};
function add(list){list.forEach(function(p){D[NK(p[0])]=p[1]})}
add([
/* المنصات والمراحل */
["واتساب","WhatsApp"],["لينكد إن","LinkedIn"],["إنستغرام","Instagram"],["تيليغرام","Telegram"],["تيك توك","TikTok"],
["استفسار","Inquiry"],["تفاوض","Negotiation"],["اتفاق","Agreed"],["قيد التنفيذ","In progress"],["مسلَّم","Delivered"],
/* التنقل والهيكل */
["نظرة عامة","Overview"],["مختبر الأفكار","Idea Lab"],["العملاء","Clients"],["التقويم","Calendar"],["النشر","Publishing"],["الوضع","Theme"],
["بياناتك محفوظة على جهازك فقط","Your data is stored on this device only"],["Ehtiwaa Hub | مركز التحكم","Ehtiwaa Hub | Control Center"],["مركز التحكم","Control Center"],
/* الرئيسية */
["أفكار قيد التجربة","Ideas in testing"],["عملاء نشطون","Active clients"],["تسليمات خلال 7 أيام","Deliveries within 7 days"],["قيمة الأعمال الجارية (ريال)","Active work value (SAR)"],
["شغل اليوم والأيام القادمة","Today and upcoming work"],["اليوم","Today"],["لا توجد أعمال جارية","No active work"],["آخر الأفكار","Latest ideas"],["لا أفكار بعد","No ideas yet"],
["لا شيء مجدول","Nothing scheduled"],["إجراءات سريعة","Quick actions"],["منشور جديد","New post"],["عميل جديد","New client"],["قيد التجربة","Testing"],
/* العملاء */
["من محادثة","From a chat"],["العميل","Client"],["الخدمة","Service"],["السعر","Price"],["التسليم","Delivery"],["المرحلة","Stage"],["المتطلبات","Requirements"],
["تعديل العميل","Edit client"],["الاسم","Name"],["المنصة","Platform"],["حفظ","Save"],["إلغاء","Cancel"],["حذف","Delete"],["بدون اسم","Unnamed"],
["موعد التسليم","Delivery date"],["السعر (ريال)","Price (SAR)"],["اسم العميل","Client name"],["ملاحظات","Notes"],
/* التقويم */
["تسليم","Delivery"],["نشر","Post"],["لا مهام في هذا اليوم","No tasks on this day"],
/* النشر */
["اكتب المحتوى هنا...","Write your content here..."],["حرف","chars"],["المنصات","Platforms"],["صور أو فيديو (اختياري)","Images or video (optional)"],["إضافة ملفات","Add files"],
["لا ملفات","No files"],["وقت النشر","Publish time"],["تفعيل تنبيهات المتصفح","Enable browser notifications"],["جدولة","Schedule"],["انشر الآن","Post now"],
["نسخ","Copy"],["تم النشر","Mark posted"],["نُشر","Published"],["مجدول","Scheduled"],["لا منشورات","No posts"],
["حان وقت النشر","Time to post"],["نسخ المحتوى","Copy content"],["بعد 15 دقيقة","In 15 minutes"],
["التنبيهات مفعّلة","Notifications enabled"],["التنبيهات غير مسموحة","Notifications not allowed"],["المتصفح لا يدعم التنبيهات","This browser does not support notifications"],
["اكتب المحتوى واختر منصة واحدة على الأقل","Write the content and pick at least one platform"],["إرفاق الملفات يعمل داخل تطبيق احتواء المكتبي فقط","Attaching files works only inside the Ehtiwaa desktop app"],
["جارٍ التجهيز","Preparing..."],["نُسخ النص","Text copied"],["تعذر التجهيز","Could not prepare"],["تم النسخ","Copied"],["تم الحفظ","Saved"],
["غير مسموح","Not allowed"],["منصة غير معروفة","Unknown platform"],["تعذر فتح التبويب","Could not open the tab"],
["نُسخ النص: الصقه (Ctrl+V) وأرفق الملفات يدوياً","Text copied: paste it (Ctrl+V) and attach the files manually"],
["ما ظهرت نافذة النشر (تأكد من تسجيل الدخول). نُسخ النص بدلاً منها","The compose window did not appear (check that you are signed in). The text was copied instead"],
["رُفعت الملفات؛ النص نُسخ، الصقه بنفسك","Files uploaded; the text was copied, paste it yourself"],["جُهّز المنشور، راجعه واضغط نشر","Post prepared: review it and press Post"],
/* الاستخراج من محادثة */
["استخراج التفاصيل من محادثة","Extract details from a chat"],["الصق نص المحادثة (انسخه من تبويب الحساب)","Paste the chat text (copy it from the account tab)"],["الصق هنا...","Paste here..."],
["استخراج تلقائي","Auto-extract"],["حلّل بـ Claude","Analyze with Claude"],["نسخ الطلب فقط","Copy prompt only"],["تعليماتي لـ Claude (أسعارك وقواعدك، تُحفظ تلقائياً)","My instructions for Claude (your prices and rules, saved automatically)"],
["مثال: بحث 10 صفحات = 150 ريال، عرض 15 شريحة = 120 ريال، التسليم الافتراضي 3 أيام...","Example: research 10 pages = 150 SAR, presentation 15 slides = 120 SAR, default delivery 3 days..."],
["الصق رد Claude هنا وتنملي الحقول تلقائياً","Paste Claude's reply here and the fields fill in automatically"],["قراءة الرد","Read reply"],["تطبيق على العميل","Apply to client"],["إنشاء العميل","Create client"],
["تعذرت قراءة الرد، تأكد أنه JSON صحيح","Could not read the reply; make sure it is valid JSON"],["تعذرت القراءة","Could not read it"],["تمت القراءة، راجع الحقول","Read: review the fields"],["تمت القراءة","Read"],
["الصق المحادثة أولاً","Paste the chat first"],["تم الاستخراج، راجع الحقول","Extracted: review the fields"],["اكتب اسم العميل","Enter the client name"],
["نُسخ الطلب، الصقه في Claude ثم انسخ رده وارجع هنا","Prompt copied: paste it into Claude, then copy its reply and come back here"],
/* مختبر الأفكار */
["بنك الأفكار","Idea bank"],["الردود الجاهزة","Ready replies"],["منشورات الأسبوع","Weekly posts"],["فكرة","Idea"],["جاهزة","Ready"],["مؤجلة","Postponed"],
["عالية","High"],["متوسطة","Medium"],["منخفضة","Low"],["خدمة جديدة","New service"],["محتوى","Content"],["تطوير العمل","Business improvement"],["أخرى","Other"],
["اسحب البطاقة بين الأعمدة، أو اضغط عليها للتعديل","Drag cards between columns, or click one to edit it"],["استحدث أفكاراً بـ Claude","Generate ideas with Claude"],["فكرة جديدة","New idea"],
["الصق رد Claude هنا لتتحول أفكاره إلى بطاقات تلقائياً","Paste Claude's reply here to turn its ideas into cards automatically"],["الصق هنا، سطر لكل فكرة: العنوان | الوصف","Paste here, one idea per line: Title | Description"],
["طوّرها","Develop"],["بدون عميل (تبقى الحقول {} كما هي)","No client (the {} fields stay as they are)"],
["اختر عميلاً لتُملأ {الاسم} و{الخدمة} و{السعر} و{الموعد} تلقائياً","Pick a client to auto-fill {الاسم} {الخدمة} {السعر} {الموعد}"],["رد جديد","New reply"],["تعديل","Edit"],["لا ردود بعد","No replies yet"],
["مولّد منشورات الأسبوع","Weekly post generator"],["عدد المنشورات","Number of posts"],["النبرة","Tone"],["التركيز","Focus"],["تبدأ من","Starts on"],["وقت النشر اليومي","Daily publish time"],
["ودّية ومهنية","Friendly and professional"],["رسمية","Formal"],["حماسية","Enthusiastic"],["بسيطة ومباشرة","Simple and direct"],
["كل الخدمات","All services"],["البحوث الأكاديمية","Academic research"],["العروض التقديمية","Presentations"],["التصميم","Design"],["الدعوات الرقمية","Digital invitations"],["المواقع الإلكترونية","Websites"],["التدقيق والتنسيق","Proofreading and formatting"],
["ملاحظة إضافية (اختياري)","Extra note (optional)"],["مثال: موسم الاختبارات، عرض خاص، فكرة بعينها","e.g. exam season, a special offer, a specific idea"],["ولّد بـ Claude","Generate with Claude"],
["الصق رد Claude هنا وتظهر المنشورات تلقائياً","Paste Claude's reply here and the posts appear automatically"],["المنشورات مفصولة بسطر ---","Posts separated by a --- line"],
["جدولة الكل (واحد كل يوم)","Schedule all (one per day)"],["تظهر بعدها في قائمة النشر","They then appear in the publishing queue"],
["تعديل الفكرة","Edit idea"],["العنوان","Title"],["الحالة","Status"],["الأولوية","Priority"],["التصنيف","Category"],["تعديل الرد","Edit reply"],
["النص (يمكنك استعمال {الاسم} {الخدمة} {السعر} {الموعد})","Text (you can use {الاسم} {الخدمة} {السعر} {الموعد})"],
["نُسخ الطلب، الصقه في Claude","Prompt copied: paste it into Claude"],["نُسخ الطلب، الصقه في Claude ثم الصق رده تحت","Prompt copied: paste it into Claude, then paste its reply below"],
["اكتب عنواناً للفكرة","Enter a title for the idea"],["اكتب العنوان والنص","Enter the title and the text"],["اختر منصة واحدة على الأقل","Pick at least one platform"],["تاريخ البداية غير صحيح","The start date is not valid"],
/* الأفكار والردود الجاهزة الأولية (العرض فقط) */
["باقة «بحث + عرض» بسعر مجمّع","\"Research + presentation\" bundle at a combined price"],
["بيع البحث ومعه عرض تقديمي لنفس الموضوع. لديك أمثلة فعلية في معرضك (مثل تقنيات البناء الذكي).","Sell the research together with a presentation on the same topic. You already have real examples in your portfolio (e.g. smart construction technologies)."],
["تحويل أي بحث إلى عرض تقديمي","Turn any research paper into a presentation"],["خدمة منفصلة لمن عنده بحث جاهز ويحتاج عرضاً فقط، بسعر مستقل.","A separate service for clients who already have a paper and only need the presentation, at its own price."],
["مراجعة وتدقيق بحوث الطلاب","Review and proofreading of student papers"],["أسرع وأرخص من كتابة بحث كامل، وتناسب من كتب بحثه بنفسه.","Faster and cheaper than writing a full paper, and suits students who wrote their own."],
["دعوات رقمية بقوالب قابلة للتعديل","Digital invitations with editable templates"],["تغيير الأسماء والتاريخ فقط، وتباع بسعر أقل وبكمية أكبر.","Only names and dates change, sold at a lower price in larger volume."],
["اشتراك شهري للعروض والتصميم","Monthly subscription for presentations and design"],["عدد ثابت من التصاميم والعروض شهرياً للمؤسسات الصغيرة بسعر ثابت.","A fixed number of designs and presentations each month for small organizations at a fixed price."],
["موقع تعريفي بسعر ثابت للعملاء الصغار","Fixed-price intro website for small clients"],["استخدام موقعك الحالي كقالب لتسريع التنفيذ.","Use your current website as a template to speed up delivery."],
["منشورات «قبل وبعد»","\"Before and after\" posts"],["عرض الفرق قبل التعديل وبعده لعرض أو تصميم، بعد إخفاء أي بيانات للعميل.","Show the difference before and after editing a presentation or design, with any client data hidden."],
["نصائح قصيرة من خبرتك","Short tips from your experience"],["قواعد تصميم العرض، وأخطاء البحوث الشائعة، في منشورات قصيرة.","Presentation design rules and common research mistakes, in short posts."],
["عرض السعر","Price offer"],["ملخص الاتفاق","Agreement summary"],["طلب المتطلبات","Request requirements"],["طريقة الدفع","Payment method"],["مناقشة السعر","Price discussion"],["تسليم العمل","Work delivery"],["شكر وطلب تقييم","Thanks and review request"],
/* الشريط الجانبي */
["موضوع اليوم (اختياري)","Today's topic (optional)"],["مثال: موسم الاختبارات النهائية، أو فكرة تدور في بالي اليوم...","e.g. final exams season, or an idea on my mind today..."],
["اتركه فارغاً ليستحدث Claude بنفسه، أو اكتب الموضوع ليبني عليه الأفكار والمنشورات","Leave it empty and Claude comes up with ideas on its own, or write a topic for it to build ideas and posts around"],
["حوّل الموضوع إلى منشورات","Turn the topic into posts"],
["بيانات تجريبية","Sample data"]
]);
var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'],DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var AR_M0=AR_M.slice(),AR_D0=AR_D.slice();
var LANG='ar';try{LANG=localStorage.getItem('hub_lang')=='en'?'en':'ar'}catch(e){}
var P=[
[/^(\d+) فكرة$/,function(m){return m[1]+(m[1]=='1'?' idea':' ideas')}],
[/^(\d+) رد جاهز$/,function(m){return m[1]+' ready '+(m[1]=='1'?'reply':'replies')}],
[/^(\d+) عميل$/,function(m){return m[1]+(m[1]=='1'?' client':' clients')}],
[/^قائمة النشر \((\d+)\)$/,function(m){return 'Publishing queue ('+m[1]+')'}],
[/^المنشورات المجدولة \((\d+)\)$/,function(m){return 'Scheduled posts ('+m[1]+')'}],
[/^راجع المنشورات \((\d+)\)$/,function(m){return 'Review the posts ('+m[1]+')'}],
[/^مهام (\d{4}-\d{2}-\d{2})$/,function(m){return 'Tasks for '+m[1]}],
[/^(\d{2}:\d{2}) نشر · ([\s\S]*)$/,function(m){return m[1]+' Post · '+m[2]}],
[/^جهز في (.+)$/,function(m){return 'Prepare in '+tr(m[1])}],
[/^تعذر التجهيز: ([\s\S]*)$/,function(m){return 'Could not prepare: '+m[1]}],
[/^(?:🔔\s*)?\((\d+)\) حان وقت النشر$/,function(m){return '🔔 ('+m[1]+') Time to post'}]];
function look(t){
  var k=NK(t);if(Object.prototype.hasOwnProperty.call(D,k))return D[k];
  for(var i=0;i<P.length;i++){var m=P[i][0].exec(k);if(m)return P[i][1](m)}
  return null}
function tr(s){
  if(LANG!='en'||!s)return s;
  var t=s.trim(),r=t&&look(t);
  if(r!==null&&r!==''&&t)return s.replace(t,function(){return r});
  var m=/^([^\p{L}\p{N}]*)([\s\S]*?)([^\p{L}\p{N}]*)$/u.exec(s);
  if(m&&m[2]){r=look(m[2]);if(r!==null)return m[1]+r+m[3]}
  return s}
window.hubTr=tr;
var MAP=new WeakMap(),AMAP=new WeakMap(),ATTR=['placeholder','title','aria-label'],SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1};
function proc(n){
  var info=MAP.get(n);
  if(LANG!='en'){if(info&&n.data===info.en){n.data=info.ar}MAP.delete(n);return}
  if(info&&n.data===info.en)return;
  var t=tr(n.data);
  if(t!==n.data){
    var p=n.parentNode;if(p&&p.nodeName=='OPTION'&&!p.hasAttribute('value'))p.setAttribute('value',n.data.trim());
    MAP.set(n,{ar:n.data,en:t});n.data=t}
  else MAP.delete(n)}
function pattr(el,a){
  var v=el.getAttribute(a);if(v==null)return;
  var m=AMAP.get(el)||{},info=m[a];
  if(LANG!='en'){if(info&&v===info.en)el.setAttribute(a,info.ar);if(info){delete m[a]}return}
  if(info&&v===info.en)return;
  var t=tr(v);if(t!==v){m[a]={ar:v,en:t};AMAP.set(el,m);el.setAttribute(a,t)}}
function sweep(root){
  if(root.nodeType==3){proc(root);return}
  if(root.nodeType!=1&&root.nodeType!=9)return;
  var base=root.nodeType==9?root.documentElement:root;
  if(base.nodeType==1&&SKIP[base.nodeName])return;
  var w=document.createTreeWalker(base,4,null),n,list=[];
  while((n=w.nextNode())){if(!(n.parentNode&&SKIP[n.parentNode.nodeName]))list.push(n)}
  list.forEach(proc);
  var els=base.querySelectorAll?[].slice.call(base.querySelectorAll('[placeholder],[title],[aria-label]')):[];
  if(base.getAttribute)els.push(base);
  els.forEach(function(el){ATTR.forEach(function(a){if(el.hasAttribute&&el.hasAttribute(a))pattr(el,a)})})}
var _al=window.alert,_cf=window.confirm;
window.alert=function(m){return _al.call(window,tr(m))};
window.confirm=function(m){return _cf.call(window,tr(m))};
new MutationObserver(function(ms){
  ms.forEach(function(m){
    if(m.type=='characterData'){if(!(m.target.parentNode&&SKIP[m.target.parentNode.nodeName]))proc(m.target)}
    else if(m.type=='attributes')pattr(m.target,m.attributeName);
    else m.addedNodes.forEach(function(n){sweep(n)})})
}).observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTR});
function label(){var b=document.querySelector('#lg span');if(b)b.textContent=LANG=='en'?'العربية':'English'}
function apply(l){
  LANG=l;try{localStorage.setItem('hub_lang',l)}catch(e){}
  var H=document.documentElement;H.lang=l;H.dir=l=='en'?'ltr':'rtl';
  for(var i=0;i<12;i++)AR_M[i]=l=='en'?MONTHS[i]:AR_M0[i];
  for(var j=0;j<7;j++)AR_D[j]=l=='en'?DAYS[j]:AR_D0[j];
  render();if(window.renderRemind)renderRemind();
  sweep(document);label();
  try{if(window.deskHub&&deskHub.setLang)deskHub.setLang(l)}catch(e){}}
function switchTo(l,animate){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(animate&&!reduce&&document.startViewTransition)document.startViewTransition(function(){apply(l)});
  else apply(l)}
var btn=document.getElementById('lg');
if(btn)btn.onclick=function(){switchTo(LANG=='en'?'ar':'en',true)};
if(LANG=='en')apply('en');else label();
})();
