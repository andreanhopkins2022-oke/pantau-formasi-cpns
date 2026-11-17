const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const nf=n=>(+n||0).toLocaleString('id-ID');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const IC={home:'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',building:'<path d="M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M3 21h18"/>',cap:'<path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5"/>',brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3"/>',pin:'<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',layers:'<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',tag:'<path d="M3 12V3h9l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',upload:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',book:'<path d="M4 5h6a2 2 0 012 2v13a2 2 0 00-2-2H4zM20 5h-6a2 2 0 00-2 2v13a2 2 0 012-2h6z"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',db:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 2 3.5 3 8 3s8-1 8-3V5M4 12c0 2 3.5 3 8 3s8-1 8-3"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6M17 5a3.5 3.5 0 010 7M22 20c0-3-2-5-4-5.5"/>',id:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M13 10h5M13 14h4M6 15c0-2 4-2 4 0"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;
const M=[['beranda','Beranda','home'],['dashboard','Dashboard Statistik','chart'],['instansi','Rekap Instansi','building'],['jurusan','Rekap Jurusan','cap'],['jabatan','Rekap Jabatan','brief'],['lokasi','Rekap Lokasi','pin'],['pendidikan','Rekap Pendidikan','layers'],['kategori','Rekap Kategori','tag'],['cari','Pencarian Data','search'],['panduan','Panduan Penggunaan','book'],['unggah','Panel Admin','lock']];
const HB=[['beranda','Dashboard','home','pk'],['cari','Data Formasi','db','pu'],['jurusan','Analisis Jurusan','cap','bl'],['dashboard','Statistik','chart','gr'],['unggah','Admin','lock','or'],['panduan','Tentang Aplikasi','info','tq']];
const R={instansi:['agency','Instansi','building','s1','Instansi pusat dan daerah beserta total kursinya.'],jurusan:['major','Jurusan','cap','s2','Jumlah ID formasi yang menerima jurusan ini. Satu ID formasi dapat menerima beberapa jurusan, jadi angkanya bukan kursi dan tidak boleh dijumlahkan.'],jabatan:['pos','Jabatan','brief','s3','Nama jabatan beserta total kursinya.'],lokasi:['loc','Lokasi','pin','s4','Lokasi penempatan beserta total kursinya.'],pendidikan:['edu','Pendidikan','layers','s5','Rekap per tingkat pendidikan sesuai isi berkas.'],kategori:['cat','Kategori','tag','s6','Kategori formasi: umum, disabilitas, putra/putri daerah, dan lainnya.']};
const ST=[['Total Kursi Formasi','users','s1'],['ID Formasi Unik','id','s2'],['Instansi','building','s3'],['Jurusan','cap','s4'],['Jabatan','brief','s5'],['Lokasi','pin','s6']];
const fresh=()=>({agency:new Map,pos:new Map,loc:new Map,cat:new Map,major:new Map,edu:new Map,ids:0,seats:0,file:'',time:'',year:2026,ring:[]});
let D=fresh(),T,H,seen,seen2,SORT={},lim={},CH={},PW='';

// ---------- UI dasar ----------
$('#lg').innerHTML=ic('building');$('#burger').innerHTML=ic('menu');$('#hgo').innerHTML=ic('search')+'Cari';$('#hup').innerHTML=ic('cap')+'Analisis Jurusan';$('#hds').innerHTML=ic('chart')+'Dashboard Statistik';[['pick','upload','Pilih File dari Perangkat'],['nw','upload','Unggah Database Baru'],['chg','db','Ganti File'],['cl','trash','Hapus Data'],['sv','db','Simpan Data'],['ld','layers','Muat Data'],['dd','trash','Hapus Database'],['pub','chart','Terbitkan ke Publik'],['del','trash','Hapus Data Publik'],['out','lock','Keluar dari Admin'],['pl','book','Cetak Laporan'],['ps','chart','Cetak Ringkasan Statistik']].forEach(([i,c,t])=>$('#'+i).innerHTML=ic(c)+t);
$('#hn').innerHTML=HB.map(([v,t,i,c])=>`<button class="b ${c}" data-v="${v}">${ic(i)}${t}</button>`).join('');
$('nav').innerHTML=M.map(([v,t,i])=>`<button class="nv" data-v="${v}">${ic(i)}${t}</button>`).join('');
$('#home-grid').innerHTML=Object.entries(R).map(([k,r])=>`<button class="sc ${r[3]}" data-v="${k}"><span>${ic(r[2])}Rekap ${r[1]}</span><b style="font-size:16px">Buka rekap</b></button>`).join('');
$('#cards').innerHTML=ST.map(s=>`<div class="sc ${s[2]}"><span>${ic(s[1])}${s[0]}</span><b class="sv">0</b></div>`).join('');
const FL={major:'Semua jenjang (awalan nama jurusan)',edu:'Semua tingkat pendidikan',cat:'Semua kategori formasi'};
$('#views').insertAdjacentHTML('beforeend',Object.entries(R).map(([k,r])=>`<section class="view" id="v-${k}"><div class="p"><h2>Rekap ${r[1]}</h2><p class="mut">${r[4]}</p><div class="fl"><input class="inp" id="q-${k}" placeholder="Cari ${r[1].toLowerCase()}..." style="flex:2 1 220px">${FL[r[0]]?`<select class="inp" id="f-${k}"></select>`:''}<select class="inp" id="o-${k}"></select><select class="inp" id="n-${k}" style="flex:0 0 auto"><option>10</option><option selected>25</option><option>50</option><option>100</option></select></div><div class="row noprint" data-ex="${k}" style="margin:12px 0 0"><button class="b gr" data-f="xlsx">Ekspor Excel</button><button class="b bl" data-f="csv">Ekspor CSV</button><button class="b pu" data-f="print">Cetak Laporan</button></div><p class="mut" id="c-${k}" style="margin:10px 0 0"></p><div class="tw" id="t-${k}"></div><div class="pg" id="g-${k}"></div></div></section>`).join(''));
Object.keys(R).forEach(k=>{
 ['q','f','o','n'].forEach(c=>{const e=$(`#${c}-${k}`);if(e)e.oninput=()=>recap(k)});
 $('#t-'+k).onclick=e=>{const t=e.target.closest('th[data-c]');if(!t)return;const o=$('#o-'+k),c=t.dataset.c;o.value=o.value[0]===c?c+(o.value[1]==='a'?'d':'a'):c==='n'?'na':c+'d';recap(k)};
 $('#g-'+k).onclick=e=>{const b=e.target.closest('[data-p]');if(b)recap(k,+b.dataset.p)};
});
const toggle=o=>{$('nav').classList.toggle('open',o);$('#ov').classList.toggle('open',o)};
$('#burger').onclick=()=>toggle(true);$('#ov').onclick=()=>toggle(false);
document.addEventListener('click',e=>{const t=e.target.closest('[data-v]');if(t)go(t.dataset.v)});
const empty=()=>'<p class="mut">Data formasi belum tersedia. Silakan kembali lagi nanti.</p>';

function go(v){
 if(!$('#v-'+v))v='beranda';
 if(v==='unggah'&&!PW){askPw();if($('.view.on'))return;v='beranda'}
 $$('.view').forEach(x=>x.classList.toggle('on',x.id==='v-'+v));
 $$('nav .nv').forEach(x=>x.classList.toggle('on',x.dataset.v===v));
 toggle(false);scrollTo({top:0});
 if(v==='dashboard')draw();
 if(R[v]){setup(v);recap(v)}
 if(v==='cari')cari();
 history.replaceState(null,'','#'+v);
}

function stats(){
 [D.seats,D.ids,D.agency.size,D.major.size,D.pos.size,D.loc.size].forEach((n,i)=>$$('.sv')[i].textContent=nf(n));
 $('#st').textContent=D.ids?`Data formasi CPNS ${D.year}: ${nf(D.ids)} formasi`:'Data formasi belum tersedia.';
 $('#dn').hidden=!!D.ids;
 $('#i-yr').textContent=D.year;$('#nat').textContent=D.ids?`Nasional: ${nf(D.seats)} kursi dari ${nf(D.ids)} ID formasi unik, tersebar di ${nf(D.agency.size)} instansi, ${nf(D.major.size)} jurusan, ${nf(D.pos.size)} jabatan, dan ${nf(D.loc.size)} lokasi.`:'';ranks();
 const rg=D.ring&&D.ring.length;$('#rp').hidden=!rg;
 if(rg)$('#rt').innerHTML='<table>'+D.ring.map(r=>'<tr>'+r.map(c=>`<td>${esc(c)}</td>`).join('')+'</tr>').join('')+'</table>';$('#i-time').textContent=D.time||'Belum ada';
}

// ---------- Grafik ----------
const PAL=['#EC4899','#8B5CF6','#3B82F6','#10B981','#F97316','#14B8A6','#F472B6','#A78BFA','#60A5FA','#34D399'];
const vv=(m,e)=>m==='major'?e[1]:(e[0]??e[1]);
const vt=(m,e)=>m==='major'||e[0]==null?`${nf(e[1])} ID formasi`:`${nf(e[0])} kursi`;
function chart(id,type,m,n=10){
 const top=[...D[m]].map(([k,e])=>[k,vv(m,e)]).sort((a,b)=>b[1]-a[1]).slice(0,n),bar=type==='bar',w=innerWidth<600?16:30,u=m==='major'||D[m].values().next().value[0]==null?'ID formasi':'Kursi';
 if(typeof Chart==='undefined'){libErr('Chart.js');return}
 if(CH[id])CH[id].destroy();
 CH[id]=new Chart($('#'+id),{type,data:{labels:top.map(t=>t[0]),datasets:[{label:u,data:top.map(t=>t[1]),backgroundColor:PAL,borderRadius:8}]},
 options:{onClick:(ev,els,ch)=>{if(els.length)openRecap(m,ch.data.labels[els[0].index])},onHover:(ev,els)=>{ev.native.target.style.cursor=els.length?'pointer':'default'},indexAxis:bar?'y':'x',maintainAspectRatio:false,plugins:{legend:{display:!bar,position:'bottom',labels:{boxWidth:12}},tooltip:{callbacks:{title:i=>i[0].label,footer:()=>'Klik untuk melihat data terkait'}}},
 scales:bar?{x:{grid:{color:'#f6e3ec'}},y:{grid:{display:false},ticks:{callback(v){const l=this.getLabelForValue(v);return l.length>w?l.slice(0,w-1)+'…':l}}}}:{}}});
}
function draw(){[['c1','bar','major'],['c2','bar','agency'],['c3','bar','pos'],['c4','doughnut','edu',8],['c5','doughnut','cat',8],['c6','bar','loc']].forEach(a=>{if(D[a[2]].size)chart(...a);else if(CH[a[0]]){CH[a[0]].destroy();delete CH[a[0]]}})}

// ---------- Rekap & pencarian ----------
const rowsOf=m=>SORT[m]||(SORT[m]=[...D[m]].map(([n,e])=>({n,s:e[0],i:e[1],l:n.toLowerCase()})));
function setup(k){
 const m=R[k][0],rows=rowsOf(m),hs=m!=='major'&&rows.length&&rows[0].s!=null,o=$('#o-'+k),op=[];
 if(hs)op.push(['sd','Kursi terbesar'],['sa','Kursi terkecil']);
 op.push(['id','ID formasi terbanyak'],['ia','ID formasi tersedikit'],['na','Nama A-Z'],['nd','Nama Z-A']);
 o.innerHTML=op.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('');
 const f=$('#f-'+k);
 if(f){const c=new Map;rows.forEach(r=>{const t=m==='major'?r.n.split(' ')[0]:r.n;c.set(t,(c.get(t)||0)+1)});
  f.innerHTML=`<option value="">${FL[m]}</option>`+[...c].sort((a,b)=>b[1]-a[1]).slice(0,m==='major'?12:60).map(x=>`<option value="${esc(x[0])}">${esc(x[0])}${m==='major'?' ('+nf(x[1])+')':''}</option>`).join('')}
}
function recap(k,pg=1){
 const m=R[k][0],lab=R[k][1],box=$('#t-'+k),gb=$('#g-'+k),cs=$('#c-'+k);
 if(!D[m].size){box.innerHTML=empty();gb.innerHTML='';cs.textContent='';return}
 const rows=rowsOf(m),hs=m!=='major'&&rows[0].s!=null,hi=rows[0].i!=null;
 const q=$('#q-'+k).value.trim().toLowerCase(),fe=$('#f-'+k),f=fe?fe.value:'',o=$('#o-'+k).value,n=+$('#n-'+k).value,dr=o[1]==='a'?1:-1,c=o[0];
 const a=rows.filter(r=>(!q||r.l.includes(q))&&(!f||(m==='major'?r.n.split(' ')[0]:r.n)===f));
 a.sort((x,y)=>c==='n'?dr*x.n.localeCompare(y.n,'id'):dr*(c==='s'?(x.s??0)-(y.s??0):(x.i??0)-(y.i??0)));
 LAST[k]={a,hs,hi,m,lab};
 const pages=Math.max(1,Math.ceil(a.length/n)),p=Math.min(Math.max(1,pg),pages),st=(p-1)*n,ar=x=>c===x?(dr>0?' ▲':' ▼'):'';
 box.innerHTML=`<table><tr><th>No</th><th data-c="n">${lab}${ar('n')}</th>${hi?`<th data-c="i">${m==='major'?'Jumlah ID formasi yang menerima':'Jumlah ID formasi'}${ar('i')}</th>`:''}${hs?`<th data-c="s">Jumlah kursi${ar('s')}</th>`:''}</tr>`+a.slice(st,st+n).map((r,j)=>`<tr><td>${st+j+1}</td><td>${esc(r.n)}</td>${hi?`<td>${nf(r.i)}</td>`:''}${hs?`<td>${nf(r.s)}</td>`:''}</tr>`).join('')+'</table>';
 cs.textContent=`${nf(a.length)} dari ${nf(rows.length)} data, halaman ${nf(p)} dari ${nf(pages)}`;
 const pb=(x,t)=>`<button class="b pu" data-p="${x}" aria-label="Halaman ${x}">${t}</button>`;
 let h=p>1?pb(1,'«')+pb(p-1,'‹'):'';
 for(let x=Math.max(1,p-2);x<=Math.min(pages,p+2);x++)h+=`<button class="b ${x===p?'pk':'pu'}" data-p="${x}">${x}</button>`;
 if(p<pages)h+=pb(p+1,'›')+pb(pages,'»');
 gb.innerHTML=pages>1?h:'';
}
function cari(){
 const q=$('#sq').value.trim().toLowerCase(),t=$('#sd').value,o=$('#sr');
 if(!D.ids){o.innerHTML=empty();return}
 SR=[];if(q.length<2){o.innerHTML='<p class="mut">Ketik minimal 2 huruf.</p>';return}
 o.innerHTML=[['major','Jurusan'],['agency','Instansi'],['pos','Jabatan'],['loc','Lokasi']].filter(d=>t==='all'||t===d[0]).map(([m,l])=>{
  const r=[...D[m]].filter(x=>x[0].toLowerCase().includes(q)).sort((a,b)=>vv(m,b[1])-vv(m,a[1]));r.forEach(x=>SR.push([l,x[0],x[1][1],m==='major'?null:x[1][0]]));
  return `<h3 style="margin-top:16px">${l} <small class="mut">(${nf(r.length)} cocok)</small></h3>`+(r.slice(0,10).map(x=>`<div class="rs"><span>${esc(x[0])}</span><b>${vt(m,x[1])}</b></div>`).join('')||'<p class="mut">Tidak ada hasil.</p>');
 }).join('');
}
$('#sq').oninput=cari;$('#sd').onchange=cari;
$('#hq').onkeydown=e=>{if(e.key==='Enter')$('#hgo').click()};
$('#hgo').onclick=()=>{$('#sq').value=$('#hq').value;go('cari')};

// ---------- Pembacaan & agregasi data ----------
const add=(m,k,s)=>{let e=m.get(k);if(!e)m.set(k,e=[0,0]);e[0]+=s;e[1]++};
function feed(f){
 if(!H){H={};f.forEach((h,i)=>H[String(h).trim().toLowerCase()]=i);H.c=H.fomation_category??H.formation_category;return}
 if(f.length<6)return;
 const g=k=>String(f[H[k]]??'').trim()||'(Tidak diisi)',id=g('formation_id'),n=+f[H.num_of_formation]||0,lv=g('education_level');
 if(!seen.has(id)){seen.add(id);T.seats+=n;add(T.agency,g('agency'),n);add(T.pos,g('position'),n);add(T.loc,g('location'),n);add(T.cat,String(f[H.c]??'').trim()||'(Tidak diisi)',n)}
 {const k=g('education_major');let e=T.major.get(k);if(!e)T.major.set(k,e=[null,0]);e[1]++}
 if(!seen2.has(id+'|'+lv)){seen2.add(id+'|'+lv);add(T.edu,lv,n)}
}
async function readCSV(file){
 const rd=file.stream().pipeThrough(new TextDecoderStream()).getReader();
 let f=[],cur='',q=false,got=0;
 for(;;){
  const {done,value:v}=await rd.read();if(done)break;
  got+=v.length;
  for(let i=0;i<v.length;i++){
   const c=v.charCodeAt(i);
   if(q){if(c===34){if(v.charCodeAt(i+1)===34){cur+='"';i++}else q=false}else cur+=v[i]}
   else if(c===34)q=true;
   else if(c===44){f.push(cur);cur=''}
   else if(c===10){f.push(cur);cur='';feed(f);f=[]}
   else if(c!==13)cur+=v[i];
  }
  const p=Math.min(99,got/file.size*100);$('#pb').style.width=p+'%';$('#bzp').style.width=p+'%';$('#us').textContent=`Membaca ${p.toFixed(0)}% (${nf(seen.size)} formasi)...`;
 }
 if(cur||f.length){f.push(cur);feed(f)}
}
// <parse>
const nk=s=>String(s??'').toLowerCase().replace(/[^a-z0-9]/g,'');
const DIM=[['agency','instansi',['agency']],['major','jurusan',['educationmajor']],['pos','jabatan',['position']],['loc','lokasi',['location']],['edu','pendidikan',['educationlevel']],['cat','kategori',['fomationcategory','formationcategory']]];
const KN={agency:'agency',major:'education_major',pos:'position',loc:'location',edu:'education_level',cat:'fomation_category'};
const num=v=>typeof v==='number'?v:(String(v??'').trim()===''?NaN:+String(v).replace(/[^\d-]/g,''));
const toRows=ws=>XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:null,blankrows:false});
function parseBook(sheets,base,partial,log){
 const T=base?{...base}:fresh(),got={};
 for(const [name,rows] of sheets){
  const hi=rows.findIndex(r=>r.filter(c=>c!=null&&c!=='').length>=2),nn=nk(name);
  let k=nn.includes('ringkasan')?'ring':(DIM.find(x=>nn.includes(x[1]))||[])[0];
  if(hi<0&&k!=='ring'){log.push({t:'warn',m:`Sheet "${name}" kosong dan dilewati.`});continue}
  const hd=hi<0?[]:rows[hi].map(nk);
  if(!k){k=(DIM.find(x=>x[2].some(h=>hd.includes(h)))||[])[0];if(k)log.push({t:'warn',m:`Sheet "${name}" dikenali dari isi kolom sebagai ${KN[k]}.`})}
  if(!k){log.push({t:'warn',m:`Sheet "${name}" tidak dikenali dan tidak dibaca.`});continue}
  if(k==='ring'){T.ring=rows.filter(r=>r.some(c=>c!=null&&c!=='')).slice(0,60).map(r=>r.slice(0,4).map(c=>c==null?'':String(c)));got.ring=1;log.push({t:'ok',m:`${name}: ringkasan ditampilkan apa adanya.`});continue}
  const kc=DIM.find(x=>x[0]===k)[2],ki=hd.findIndex(h=>kc.includes(h)),cols=rows[hi].filter(c=>c!=null).join(', ');
  if(ki<0)throw Error(`Sheet "${name}": kolom ${KN[k]} tidak ditemukan. Kolom yang ada: ${cols}.`);
  const si=hd.findIndex(h=>h.includes('kursi')),ii=hd.findIndex(h=>h.includes('idformasi'));
  if(si<0&&ii<0)throw Error(`Sheet "${name}": kolom Jumlah_kursi atau ID_formasi tidak ditemukan. Kolom yang ada: ${cols}.`);
  const mp=new Map;let bad=0,dup=0,tot=0;
  for(const r of rows.slice(hi+1)){
   const n=String(r[ki]??'').trim();if(!n)continue;
   if(/^(total|jumlah|grandtotal)$/.test(nk(n))){tot++;continue}
   const s=si<0?null:num(r[si]),i=ii<0?null:num(r[ii]);
   if(s!==s||i!==i){bad++;continue}
   const e=mp.get(n);if(e){dup++;if(s!=null)e[0]+=s;if(i!=null)e[1]+=i}else mp.set(n,[s,i]);
  }
  if(!mp.size)throw Error(`Sheet "${name}" tidak berisi data yang bisa dibaca.`);
  T[k]=mp;got[k]=1;log.push({t:'ok',m:`${name}: dikenali sebagai ${KN[k]}, ${nf(mp.size)} baris dibaca.`});
  if(bad)log.push({t:'warn',m:`${name}: ${nf(bad)} baris dilewati karena angka kosong atau tidak valid.`});
  if(dup)log.push({t:'warn',m:`${name}: ${nf(dup)} nama ganda digabung dengan menjumlahkan angkanya.`});
  if(tot)log.push({t:'warn',m:`${name}: ${tot} baris total dilewati agar tidak terhitung dua kali.`});
 }
 if(!partial){const miss=['agency','major','pos','loc'].filter(k=>!got[k]).map(k=>KN[k]);if(miss.length)throw Error('Sheet wajib tidak ditemukan untuk: '+miss.join(', ')+'. Sheet yang dibaca: '+sheets.map(s=>s[0]).join(', ')+'.')}
 if(got.agency){let s=0,i=0,ok=1;T.agency.forEach(e=>{if(e[0]==null||e[1]==null)ok=0;s+=e[0];i+=e[1]});if(!ok)throw Error('Sheet instansi harus memuat kolom Jumlah_kursi dan ID_formasi.');T.seats=s;T.ids=i}
 else if(!T.ids)log.push({t:'warn',m:'Total kursi dan ID formasi belum bisa dihitung karena sheet instansi belum ada.'});
 if(got.agency)for(const k of ['loc','pos','cat'])if(got[k]){const sum=i=>{let t=0;T[k].forEach(e=>{t+=e[i]});return t},f0=T[k].values().next().value;const same=f0[0]!=null&&sum(0)===T.seats&&(f0[1]==null||sum(1)===T.ids);log.push({t:same?'ok':'warn',m:same?`${KN[k]}: total kursi dan ID formasi sama dengan sheet instansi.`:`${KN[k]}: total kursi atau ID formasi berbeda dari sheet instansi (data tidak diubah, periksa berkas sumber).`})}
 return T;
}
// </parse>
function libErr(n){if(!libErr.s){libErr.s=1;toast(n+' gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.',0)}}
const busy=v=>{$('#bz').hidden=!v};const ind=v=>{const e=$('#ind');e.className='ind'+(v==null?'':v?' ok':' er');e.textContent=v?'✓':v===0?'✕':''};
const fsz=b=>b>=1048576?(b/1048576).toFixed(1)+' MB':Math.max(1,Math.round(b/1024))+' KB';
let LF=null,tt;
function toast(m,ok){const e=$('#ts');e.innerHTML=`<span class="ti">${ok?'✓':'!'}</span><span class="tm">${esc(m)}</span><button class="tx" aria-label="Tutup notifikasi">×</button><i class="tb"></i>`;e.className='on '+(ok?'ok':'er');e.querySelector('.tx').onclick=()=>{e.className=''};clearTimeout(tt);tt=setTimeout(()=>e.className='',ok?6000:9000)}
const showLog=l=>$('#sl').innerHTML=l.map(x=>`<div class="lg ${x.t}">${esc(x.m)}</div>`).join('');
async function handle0(file){
 if(!file||!PW)return;
 const us=$('#us'),log=[];
 ind(null);$('#fn').textContent=file.name;$('#fz').textContent=fsz(file.size);$('#fs').textContent='...';$('#sl').innerHTML='';$('#pb').style.width='0';
 us.textContent='Membaca berkas...';await new Promise(r=>setTimeout(r,30));
 try{
  if(typeof XLSX==='undefined'&&!/\.csv$/i.test(file.name))throw Error('Pustaka pembaca Excel (SheetJS) belum termuat. Periksa koneksi internet lalu muat ulang.');
  const ext=((file.name.match(/\.(\w+)$/)||[])[1]||'').toLowerCase();
  if(!['xlsx','xls','csv'].includes(ext))throw Error(`Format .${ext||'?'} tidak didukung. Gunakan .xlsx, .xls, atau .csv.`);
  let T0,sheets;
  if(ext==='csv'){
   $('#fs').textContent='1 (CSV)';
   const hd=(await file.slice(0,4096).text()).split(/\r?\n/)[0].split(',').map(nk);
   if(hd.includes('formationid')&&hd.includes('numofformation')){
    T=fresh();H=null;seen=new Set;seen2=new Set;await readCSV(file);
    if(!H||H.formation_id==null||!seen.size)throw Error('Kolom formation_id tidak ditemukan atau berkas kosong.');
    T.ids=seen.size;T0=T;log.push({t:'ok',m:`CSV mentah SSCASN: ${nf(seen.size)} ID formasi diagregasi, kursi dihitung sekali per ID formasi.`});
   }else sheets=[['CSV',toRows(XLSX.read(await file.text(),{type:'string'}).Sheets.Sheet1)]];
  }else{
   const wb=XLSX.read(await file.arrayBuffer(),{type:'array'});$('#fs').textContent=wb.SheetNames.length+' ('+wb.SheetNames.join(', ')+')';
   sheets=wb.SheetNames.map(n=>[n,toRows(wb.Sheets[n])]);
  }
  if(!T0){us.textContent='Mengolah sheet...';await new Promise(r=>setTimeout(r,30));T0=parseBook(sheets,ext==='csv'&&D.ids?D:null,ext==='csv',log)}
  T0.file=file.name;T0.year=+$('#yr').value||2026;T0.time=new Date().toLocaleString('id-ID',{dateStyle:'long',timeStyle:'short'});
  D=T0;SORT={};LF=file;stats();showLog(log);$('#pb').style.width='100%';
  let sv='';try{sv=await idbSave(file)}catch(e){sv='Gagal menyimpan ke browser: '+e.message}
  ind(1);us.textContent=`Berhasil: ${nf(D.seats)} kursi, ${nf(D.ids)} ID formasi, ${nf(D.agency.size)} instansi, ${nf(D.major.size)} jurusan, ${nf(D.pos.size)} jabatan, ${nf(D.loc.size)} lokasi`;toast(`Berhasil: ${nf(D.ids)} ID formasi dan ${nf(D.seats)} kursi. ${sv}`,1);
 }catch(e){showLog(log);ind(0);us.textContent='Gagal';toast('Gagal: '+e.message,0);log.push({t:'err',m:e.message});showLog(log)}
}
async function handle(file){if(!file||!PW)return;busy(1);try{await handle0(file)}finally{busy(0)}}
$('#fi').onchange=e=>{handle(e.target.files[0]);e.target.value=''};
const dz=$('#dz');
dz.ondragover=e=>{e.preventDefault();dz.classList.add('hv')};dz.ondragleave=()=>dz.classList.remove('hv');
dz.ondrop=e=>{e.preventDefault();dz.classList.remove('hv');handle(e.dataTransfer.files[0])};
// ---------- Server (Cloudflare Pages Function + KV) dan login admin ----------
const MAPS=['agency','pos','loc','cat','major','edu'];
const toJ=d=>{const o={...d};MAPS.forEach(m=>o[m]=[...d[m]]);return o};
const fromJ=o=>{const d={...fresh(),...o};MAPS.forEach(m=>d[m]=new Map(o[m]||[]));return d};
const api=(method,body)=>fetch('/api/data',{method,headers:{'x-admin-password':PW,'content-type':'application/json'},body});
async function save(){try{const r=await api('PUT',JSON.stringify(toJ(D)));return r.ok?'Tersimpan di server dan tampil untuk publik (bisa tertunda sekitar 1 menit).':r.status===401?'Gagal: password ditolak.':'Gagal menyimpan ke server (kode '+r.status+').'}catch(e){return 'Server belum aktif, data hanya tampil di sesi ini.'}}
async function load(){try{const r=await fetch('/api/data');if(r.ok){const o=await r.json();if(o&&o.ids){D=fromJ(o);SORT={};stats();go(location.hash.slice(1));return}}}catch(e){}idbLoad(true)}
const dl=$('#dl');
function askPw(){if(dl.open)return;$('#pw').value='';$('#pe').textContent='';dl.showModal();$('#pw').focus()}
$('#pf').onsubmit=async e=>{e.preventDefault();PW=$('#pw').value;
 try{const r=await api('POST');if(r.ok){dl.close();go('unggah');return}$('#pe').textContent=r.status===401?'Password salah.':'Server belum siap (kode '+r.status+').'}
 catch(x){$('#pe').textContent='Server tidak dapat dihubungi.'}
 PW=''};
$('#px').onclick=()=>dl.close();
$('#out').onclick=()=>{PW='';go('beranda')};
$('#del').onclick=async()=>{if(!confirm('Hapus seluruh data di server? Tampilan publik akan kosong.'))return;
 try{const r=await api('DELETE');$('#us').textContent=r.ok?'Data di server dihapus.':'Gagal menghapus (kode '+r.status+').';if(r.ok){D=fresh();SORT={};stats()}}
 catch(e){$('#us').textContent='Server tidak dapat dihubungi.'}};
// ---------- IndexedDB (penyimpanan lokal di browser) ----------
const idb=()=>new Promise((ok,no)=>{const q=indexedDB.open('pfc',2);q.onupgradeneeded=()=>{if(!q.result.objectStoreNames.contains('s'))q.result.createObjectStore('s')};q.onsuccess=()=>ok(q.result);q.onerror=()=>no(q.error)});
const idbDo=(mode,fn)=>idb().then(d=>new Promise((ok,no)=>{const t=d.transaction('s',mode),r=fn(t.objectStore('s'));t.oncomplete=()=>{d.close();ok(r.result)};t.onerror=()=>{d.close();no(t.error)}}));
async function idbSave(file){
 const old=await idbDo('readonly',s=>s.get('d')).catch(()=>null),rec={data:toJ(D),fname:D.file,saved:Date.now()};
 if(file&&file.size<=50e6)rec.blob=file;else if(!file&&old&&old.blob)rec.blob=old.blob;
 await idbDo('readwrite',s=>s.put(rec,'d'));
 return file&&file.size>50e6?'Hasil impor tersimpan di browser; berkas asli lebih dari 50 MB sehingga tidak ikut disimpan.':'Hasil impor dan berkas tersimpan di browser ini.';
}
async function idbLoad(quiet){
 try{const r=await idbDo('readonly',s=>s.get('d'));
  if(!r||!r.data){if(!quiet)toast('Belum ada data tersimpan di browser ini.',0);return}
  D=fromJ(r.data);SORT={};stats();$('#fn').textContent=r.fname||'-';$('#fz').textContent=r.blob?fsz(r.blob.size):'-';go(location.hash.slice(1));
  if(!quiet)toast('Data dimuat dari browser ini.',1);
 }catch(e){if(!quiet)toast('Gagal memuat: '+e.message,0)}
}
['pick','nw','chg'].forEach(i=>$('#'+i).onclick=()=>$('#fi').click());
$('#cl').onclick=()=>{D=fresh();SORT={};LF=null;stats();['fn','fz','fs'].forEach(i=>$('#'+i).textContent='-');$('#sl').innerHTML='';$('#pb').style.width='0';$('#us').textContent='Data di tampilan dihapus';toast('Data dihapus dari tampilan. Database browser tidak berubah.',1)};
$('#sv').onclick=async()=>{if(!D.ids&&!D.agency.size)return toast('Belum ada data untuk disimpan.',0);try{toast(await idbSave(LF),1)}catch(e){toast('Gagal menyimpan: '+e.message,0)}};
$('#ld').onclick=()=>idbLoad(false);
$('#dd').onclick=async()=>{if(!confirm('Hapus database yang tersimpan di browser ini?'))return;try{await idbDo('readwrite',s=>s.clear());toast('Database di browser ini dihapus.',1)}catch(e){toast('Gagal menghapus: '+e.message,0)}};
$('#pub').onclick=async()=>{if(!D.ids)return toast('Belum ada data untuk diterbitkan.',0);$('#us').textContent='Menerbitkan...';busy(1);const m=await save();busy(0);$('#us').textContent=m.startsWith('Tersimpan')?'Diterbitkan':'Belum diterbitkan';toast(m,m.startsWith('Tersimpan'))};
// ---------- Peringkat, klik grafik, ekspor, cetak ----------
const LAST={},RK={agency:'instansi',major:'jurusan',pos:'jabatan',loc:'lokasi',edu:'pendidikan',cat:'kategori'};let SR=[];
function openRecap(m,label){const k=RK[m];go(k);$('#q-'+k).value=label;recap(k)}
function ranks(){
 const o=$('#rk');if(!D.ids&&!D.agency.size){o.innerHTML='';return}
 o.innerHTML=[['agency','Peringkat Instansi (jumlah kursi)'],['major','Peringkat Jurusan (ID formasi yang menerima)'],['pos','Peringkat Jabatan (jumlah kursi)']].map(([m,t])=>{
  const top=[...D[m]].map(([n,e])=>[n,vv(m,e)]).sort((a,b)=>b[1]-a[1]).slice(0,10),mx=top[0]?top[0][1]||1:1;
  return `<div class="p"><h3>${t}</h3>`+top.map((x,i)=>`<button class="rkb" data-m="${m}" data-n="${esc(x[0])}"><span>${i+1}. ${esc(x[0])}</span><b>${nf(x[1])}</b><i style="width:${x[1]/mx*100}%"></i></button>`).join('')+'</div>'}).join('');
}
$('#rk').onclick=e=>{const b=e.target.closest('.rkb');if(b)openRecap(b.dataset.m,b.dataset.n)};
function aoaOf(k){
 const L=LAST[k];if(!L||!L.a.length)return null;
 const h=['No',L.lab];if(L.hi)h.push(L.m==='major'?'Jumlah ID formasi yang menerima':'Jumlah ID formasi');if(L.hs)h.push('Jumlah kursi');
 return [h,...L.a.map((r,j)=>{const x=[j+1,r.n];if(L.hi)x.push(r.i);if(L.hs)x.push(r.s);return x})];
}
function dlf(aoa,name,fmt){
 if(typeof XLSX==='undefined')return libErr('SheetJS (XLSX)');
 const ws=XLSX.utils.aoa_to_sheet(aoa);
 if(fmt==='xlsx'){const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Data');XLSX.writeFile(wb,name+'.xlsx')}
 else{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+XLSX.utils.sheet_to_csv(ws)],{type:'text/csv;charset=utf-8'}));a.download=name+'.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
}
Object.keys(R).forEach(k=>{document.querySelector(`[data-ex="${k}"]`).onclick=e=>{
 const f=e.target.closest('[data-f]');if(!f)return;if(f.dataset.f==='print')return print();
 const x=aoaOf(k);if(!x)return toast('Tidak ada data untuk diekspor.',0);
 dlf(x,`Rekap_${R[k][1]}_CPNS_${D.year}`,f.dataset.f);toast(`${nf(x.length-1)} baris diekspor ke ${f.dataset.f.toUpperCase()}.`,1)}});
document.querySelectorAll('[data-sf]').forEach(b=>b.onclick=()=>{
 if(!SR.length)return toast('Belum ada hasil pencarian untuk diunduh.',0);
 dlf([['Kategori','Nama','Jumlah ID formasi','Jumlah kursi'],...SR],`Hasil_Pencarian_CPNS_${D.year}`,b.dataset.sf);toast(`${nf(SR.length)} baris hasil pencarian diunduh.`,1)});
$('#pl').onclick=()=>print();
$('#ps').onclick=()=>{document.body.dataset.pm='sum';print()};
addEventListener('afterprint',()=>{delete document.body.dataset.pm});
new MutationObserver(()=>{$('#bzt').textContent=$('#us').textContent}).observe($('#us'),{childList:true,characterData:true,subtree:true});
stats();go(location.hash.slice(1));load();
