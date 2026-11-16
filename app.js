```javascript
const WEST = ['Динамо Минск','Динамо Москва','Лада','Локомотив','СКА','Северсталь','Сочи','Спартак','Торпедо','ЦСКА','Шанхай Дрэгонс'];
const EAST = ['Авангард','Автомобилист','Адмирал','Ак Барс','Амур','Барыс','Металлург Мг','Нефтехимик','Салават Юлаев','Сибирь','Трактор'];
const ALL_TEAMS = [...new Set(window.INITIAL_MATCHES.flatMap(m => [m.home,m.away]))].sort((a,b)=>a.localeCompare(b,'ru'));
const STORE_KEY = 'khl-viar-season-v1';
let state = loadState();
let openedMatch = null;

function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return {
      matches: window.INITIAL_MATCHES.map(m => ({...m, ...(saved.matches?.[m.id] || {})})),
      ratings: Object.fromEntries(ALL_TEAMS.map(t => [t, Number.isFinite(saved.ratings?.[t]) ? saved.ratings[t] : 50]))
    };
  } catch(e) {
    return {matches: window.INITIAL_MATCHES.map(m=>({...m})),ratings:Object.fromEntries(ALL_TEAMS.map(t=>[t,50]))};
  }
}
function persist(){
  const matches = Object.fromEntries(state.matches.map(m=>[m.id,{date:m.date||'',time:m.time||'',homeGoals:m.homeGoals,awayGoals:m.awayGoals,resultType:m.resultType||'REG'}]));
  localStorage.setItem(STORE_KEY,JSON.stringify({matches,ratings:state.ratings}));
  updateProgress();
}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function showToast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>el.classList.remove('show'),2200);}
function isDone(m){return Number.isInteger(m.homeGoals)&&Number.isInteger(m.awayGoals);}
function updateProgress(){const done=state.matches.filter(isDone).length;document.getElementById('matchesDone').textContent=`${done} / ${state.matches.length}`;document.getElementById('completionPercent').textContent=Math.round(done/state.matches.length*100)+'%';}
function switchTab(tab){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===tab));}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));

function initFilters(){const select=document.getElementById('dayFilter');const days=[...new Set(state.matches.map(m=>m.day))].sort((a,b)=>a-b);days.forEach(d=>{const o=document.createElement('option');o.value=d;o.textContent=`Игровой день ${d}`;select.append(o);});}
function renderMatches(){
  const query=document.getElementById('matchSearch').value.trim().toLocaleLowerCase('ru');
  const day=document.getElementById('dayFilter').value;
  const status=document.getElementById('statusFilter').value;
  const filtered=state.matches.filter(m=>{
    const text=(m.home+' '+m.away).toLocaleLowerCase('ru');
    return (!query||text.includes(query))&&(day==='all'||String(m.day)===day)&&(status==='all'||(status==='done'?isDone(m):!isDone(m)));
  });
  const root=document.getElementById('matchList');
  if(!filtered.length){root.innerHTML='<div class="empty-state">По заданным условиям матчи не найдены</div>';return;}
  let html='',lastDay=null;
  filtered.forEach(m=>{
    if(m.day!==lastDay){html+=`<div class="day-heading">ИГРОВОЙ ДЕНЬ ${m.day}<span>ТУР ${m.tour}</span></div>`;lastDay=m.day;}
    const done=isDone(m),score=done?`${m.homeGoals} : ${m.awayGoals}`:'СЧЁТ НЕ ВВЕДЁН';
    const resultLabel=m.resultType==='OT'?'ОТ':m.resultType==='SO'?'Б':'ОСН';
    html+=`<article class="match-card ${done?'done':''} ${openedMatch===m.id?'open':''}" data-id="${m.id}">
      <div class="match-main">
        <div class="match-number">МАТЧ ${String(m.id).padStart(3,'0')}<small>ДЕНЬ ${m.day}</small></div>
        <div class="teams"><div class="team-name">${esc(m.home)}</div><div class="versus">VS</div><div class="team-name away">${esc(m.away)}</div></div>
        <div class="match-time"><b>${m.date?formatDate(m.date):'Дата не задана'}</b>${m.time?esc(m.time):'Время не задано'}</div>
        <div class="match-actions"><div class="score-mini ${done?'':'empty'}">${done?score:'— : —'}${done?`<small style="display:block;color:var(--steel);font:700 8px Manrope;margin-top:4px">${resultLabel}</small>`:''}</div><button class="edit-btn" data-edit="${m.id}">${openedMatch===m.id?'ЗАКРЫТЬ':'ЗАПОЛНИТЬ'}</button></div>
      </div>
      <div class="match-editor">
        <div class="editor-grid">
          <div class="field"><label>ДАТА МАТЧА</label><input type="date" data-field="date" value="${esc(m.date||'')}"></div>
          <div class="field"><label>ВРЕМЯ МАТЧА</label><input type="time" data-field="time" value="${esc(m.time||'')}"></div>
          <div class="field"><label>СЧЁТ · ${esc(m.home)}</label><div class="score-fields"><input type="number" min="0" max="30" step="1" data-field="homeGoals" value="${done?m.homeGoals:''}" placeholder="0"><span>:</span><input type="number" min="0" max="30" step="1" data-field="awayGoals" value="${done?m.awayGoals:''}" placeholder="0"></div></div>
          <div class="field"><label>ТИП РЕЗУЛЬТАТА</label><select data-field="resultType"><option value="REG" ${(!m.resultType||m.resultType==='REG')?'selected':''}>Основное время</option><option value="OT" ${m.resultType==='OT'?'selected':''}>Овертайм</option><option value="SO" ${m.resultType==='SO'?'selected':''}>Буллиты</option></select></div>
          <div class="field"><label>СТАТУС</label><div class="editor-hint" style="padding:12px 0">${done?'Результат сохранён':'Ожидает результата'}</div></div>
        </div>
        <div class="editor-bottom"><span class="editor-hint">КХЛ: победа в основное время — 3 очка, в ОТ/Б — 2, поражение в ОТ/Б — 1.</span><div class="editor-buttons"><button class="generate-btn" data-generate="${m.id}">✦ СГЕНЕРИРОВАТЬ СЧЁТ</button><button class="save-btn" data-save="${m.id}">СОХРАНИТЬ МАТЧ</button></div></div>
      </div></article>`;
  });
  root.innerHTML=html;
}
function formatDate(value){if(!value)return '';const [y,m,d]=value.split('-');return `${d}.${m}.${y}`;}
function saveMatch(id){
  const card=document.querySelector(`.match-card[data-id="${id}"]`);const match=state.matches.find(m=>m.id===id);if(!card||!match)return;
  const val=k=>card.querySelector(`[data-field="${k}"]`).value;
  const hg=val('homeGoals'),ag=val('awayGoals'),type=val('resultType');
  if((hg==='' )!==(ag==='')){showToast('Заполни обе ячейки счёта');return;}
  if(hg!==''&&(!Number.isInteger(Number(hg))||!Number.isInteger(Number(ag))||Number(hg)<0||Number(ag)<0||Number(hg)>30||Number(ag)>30)){showToast('Проверь счёт матча');return;}
  if(hg!==''&&Number(hg)===Number(ag)){showToast('В хоккее итоговый счёт не может быть равным');return;}
  if(hg!==''&&type==='REG'&&Number(hg)===Number(ag)){showToast('Для ничьей выбери ОТ или буллиты');return;}
  match.date=val('date');match.time=val('time');match.resultType=type;
  if(hg===''){delete match.homeGoals;delete match.awayGoals;}else{match.homeGoals=Number(hg);match.awayGoals=Number(ag);}
  persist();openedMatch=null;renderMatches();renderStandings();showToast('Матч сохранён · таблицы обновлены');
}
function randomGoals(mean){let n=0;for(let i=0;i<Math.max(1,Math.round(mean*2));i++)if(Math.random()<Math.min(.9,mean/Math.max(1,Math.round(mean*2))))n++;return Math.min(9,n);}
function generateScore(id){
  const m=state.matches.find(x=>x.id===id);const card=document.querySelector(`.match-card[data-id="${id}"]`);if(!m||!card)return;
  const diff=(state.ratings[m.home]-state.ratings[m.away])/18;
  let home=randomGoals(2.7+diff*.55),away=randomGoals(2.7-diff*.55);
  let type='REG';
  if(home===away){type=Math.random()<.58?'OT':'SO';if(Math.random()<.5)home++;else away++;}
  else if(Math.random()<.19){type=Math.random()<.5?'OT':'SO';}
  card.querySelector('[data-field="homeGoals"]').value=home;
  card.querySelector('[data-field="awayGoals"]').value=away;
  card.querySelector('[data-field="resultType"]').value=type;
  showToast(`Сгенерировано: ${m.home} ${home}:${away} ${m.away} · ${type==='REG'?'ОСН':type==='OT'?'ОТ':'Б'}`);
}

document.getElementById('matchList').addEventListener('click',e=>{
  const edit=e.target.closest('[data-edit]');if(edit){const id=Number(edit.dataset.edit);openedMatch=openedMatch===id?null:id;renderMatches();return;}
  const save=e.target.closest('[data-save]');if(save){saveMatch(Number(save.dataset.save));return;}
  const gen=e.target.closest('[data-generate]');if(gen){generateScore(Number(gen.dataset.generate));}
});
['matchSearch','dayFilter','statusFilter'].forEach(id=>document.getElementById(id).addEventListener(id==='matchSearch'?'input':'change',renderMatches));

function standings(teams){
  const table=Object.fromEntries(teams.map(team=>[team,{team,gp:0,w:0,l:0,otw:0,otl:0,sow:0,sol:0,gf:0,ga:0,pts:0}]));
  state.matches.filter(isDone).forEach(m=>{
    if(!table[m.home]||!table[m.away])return;
    const h=table[m.home],a=table[m.away],hg=m.homeGoals,ag=m.awayGoals,homeWin=hg>ag;
    h.gp++;a.gp++;h.gf+=hg;h.ga+=ag;a.gf+=ag;a.ga+=hg;
    if(m.resultType==='REG'){
      if(homeWin){h.w++;h.pts+=3;a.l++;}else{a.w++;a.pts+=3;h.l++;}
    }else if(m.resultType==='OT'){
      if(homeWin){h.otw++;h.pts+=2;a.otl++;a.pts++;}else{a.otw++;a.pts+=2;h.otl++;h.pts++;}
    }else{
      if(homeWin){h.sow++;h.pts+=2;a.sol++;a.pts++;}else{a.sow++;a.pts+=2;h.sol++;h.pts++;}
    }
  });
  return Object.values(table).sort((a,b)=>b.pts-a.pts||b.w-a.w||((b.gf-b.ga)-(a.gf-a.ga))||b.gf-a.gf||a.team.localeCompare(b.team,'ru'));
}
function renderTable(teams,target,leaderTarget){
  const rows=standings(teams);document.getElementById(leaderTarget).textContent=rows[0]?.team||'—';
  document.getElementById(target).innerHTML=`<table><thead><tr><th>#</th><th>КОМАНДА</th><th>И</th><th>В</th><th>П</th><th>ВО</th><th>ПО</th><th>БВО</th><th>БПО</th><th>Ш</th><th>О</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td class="rank">${String(i+1).padStart(2,'0')}</td><td><div class="club-cell"><span class="club-mark">${esc(r.team.split(' ').map(x=>x[0]).join('').slice(0,2))}</span>${esc(r.team)}</div></td><td>${r.gp}</td><td>${r.w}</td><td>${r.l}</td><td>${r.otw}</td><td>${r.otl}</td><td>${r.sow}</td><td>${r.sol}</td><td class="${r.gf-r.ga>0?'positive':r.gf-r.ga<0?'negative':''}">${r.gf-r.ga>0?'+':''}${r.gf-r.ga}</td><td class="points">${r.pts}</td></tr>`).join('')}</tbody></table>`;
}
function renderStandings(){renderTable(WEST,'westTable','westLeader');renderTable(EAST,'eastTable','eastLeader');}
function renderRatings(){
  document.getElementById('ratingList').innerHTML=ALL_TEAMS.map((t,i)=>`<div class="rating-item"><span class="rating-index">${String(i+1).padStart(2,'0')}</span><span class="rating-team">${esc(t)}</span><span class="rating-value" id="rating-value-${i}">${state.ratings[t]}</span><input aria-label="Рейтинг ${esc(t)}" type="range" min="0" max="100" step="1" value="${state.ratings[t]}" data-rating="${esc(t)}"></div>`).join('');
}
document.getElementById('ratingList').addEventListener('input',e=>{const input=e.target.closest('[data-rating]');if(!input)return;const team=input.dataset.rating;state.ratings[team]=Number(input.value);const index=ALL_TEAMS.indexOf(team);document.getElementById(`rating-value-${index}`).textContent=input.value;persist();});
document.getElementById('resetAll').addEventListener('click',()=>{if(!confirm('Сбросить все результаты, даты, время и рейтинги? Это действие нельзя отменить.'))return;localStorage.removeItem(STORE_KEY);state=loadState();openedMatch=null;renderMatches();renderStandings();renderRatings();updateProgress();showToast('Сезон сброшен');});

initFilters();renderMatches();renderStandings();renderRatings();updateProgress();
