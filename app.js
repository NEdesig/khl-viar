
const WEST = [
  'Динамо Минск','Динамо Москва','Лада','Локомотив','СКА',
  'Северсталь','Сочи','Спартак','Торпедо','ЦСКА','Шанхай Дрэгонс'
];

const EAST = [
  'Авангард','Автомобилист','Адмирал','Ак Барс','Амур',
  'Барыс','Металлург Мг','Нефтехимик','Салават Юлаев','Сибирь','Трактор'
];

const ALL_TEAMS = [...new Set(
  window.INITIAL_MATCHES.flatMap(m => [m.home, m.away])
)];

const STORE_KEY = 'khl-viar-season-v2';

const TEAM_COLORS = {
  'ЦСКА':['#D71920','#FFFFFF','Ц'],
  'Локомотив':['#D71920','#FFFFFF','Л'],
  'Торпедо':['#183C9B','#FFFFFF','Т'],
  'Спартак':['#D71920','#FFFFFF','С'],
  'Северсталь':['#F2C400','#101010','С'],
  'Шанхай Дрэгонс':['#E94B12','#FFFFFF','Ш'],
  'Динамо Москва':['#1764B5','#FFFFFF','Д'],
  'Динамо Минск':['#22A9D5','#071321','Д'],
  'СКА':['#1764B5','#FFFFFF','СКА'],
  'Сочи':['#00A6A6','#FFFFFF','С'],
  'Лада':['#1764B5','#FFFFFF','Л'],
  'Авангард':['#D71920','#FFFFFF','А'],
  'Автомобилист':['#D71920','#FFFFFF','А'],
  'Адмирал':['#D7BD75','#101010','А'],
  'Ак Барс':['#14815D','#FFFFFF','АБ'],
  'Амур':['#E94B24','#FFFFFF','А'],
  'Барыс':['#1764B5','#FFFFFF','Б'],
  'Металлург Мг':['#1764B5','#FFFFFF','М'],
  'Нефтехимик':['#1764B5','#FFFFFF','Н'],
  'Салават Юлаев':['#138B56','#FFFFFF','СЮ'],
  'Сибирь':['#2479C9','#FFFFFF','С'],
  'Трактор':['#59616D','#FFFFFF','Т']
};

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function getTeamBadge(team) {
  const data = TEAM_COLORS[team] || ['#657080','#FFFFFF',team.slice(0,2)];
  return `<span class="club-badge" style="--club:${data[0]};--ink:${data[1]}">${data[2]}</span>`;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');

    return {
      matches: window.INITIAL_MATCHES.map(m => ({
        ...m,
        ...(saved.matches?.[m.id] || {})
      })),
      ratings: Object.fromEntries(
        ALL_TEAMS.map(t => [
          t,
          Number.isFinite(saved.ratings?.[t]) ? saved.ratings[t] : 50
        ])
      )
    };
  } catch (error) {
    return {
      matches: window.INITIAL_MATCHES.map(m => ({...m})),
      ratings: Object.fromEntries(ALL_TEAMS.map(t => [t,50]))
    };
  }
}

let state = loadState();
let openedMatch = null;

function isDone(match) {
  return Number.isInteger(match.homeGoals) &&
         Number.isInteger(match.awayGoals);
}

function persist() {
  const matches = Object.fromEntries(
    state.matches.map(m => [
      m.id,
      {
        date:m.date || '',
        time:m.time || '',
        homeGoals:m.homeGoals,
        awayGoals:m.awayGoals,
        resultType:m.resultType || 'REG'
      }
    ])
  );

  localStorage.setItem(STORE_KEY, JSON.stringify({
    matches,
    ratings:state.ratings
  }));

  updateProgress();
}

function updateProgress() {
  const done = state.matches.filter(isDone).length;
  document.getElementById('matchesDone').textContent =
    `${done} / ${state.matches.length}`;

  document.getElementById('completionPercent').textContent =
    Math.round(done / state.matches.length * 100) + '%';
}

function showToast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => el.classList.remove('show'), 2200);
}

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab)
  );

  document.querySelectorAll('.view').forEach(v =>
    v.classList.toggle('active', v.id === tab)
  );

  if (tab === 'west' || tab === 'east') renderStandings();
}

document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => switchTab(button.dataset.tab));
});

function initFilters() {
  const select = document.getElementById('dayFilter');
  const days = [...new Set(state.matches.map(m => m.day))]
    .sort((a,b) => a-b);

  days.forEach(day => {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = `Игровой день ${day}`;
    select.append(option);
  });
}

function formatDate(value) {
  if (!value) return 'Дата не задана';
  const [year,month,day] = value.split('-');
  return `${day}.${month}.${year}`;
}

function renderMatches() {
  const query = document.getElementById('matchSearch')
    .value.trim().toLocaleLowerCase('ru');

  const day = document.getElementById('dayFilter').value;
  const status = document.getElementById('statusFilter').value;

  const filtered = state.matches.filter(m => {
    const text = (m.home + ' ' + m.away).toLocaleLowerCase('ru');

    return (!query || text.includes(query)) &&
      (day === 'all' || String(m.day) === day) &&
      (status === 'all' ||
       (status === 'done' ? isDone(m) : !isDone(m)));
  });

  const root = document.getElementById('matchList');

  if (!filtered.length) {
    root.innerHTML = '<div class="empty-state">Матчи не найдены</div>';
    return;
  }

  let html = '';
  let lastDay = null;

  filtered.forEach(m => {
    if (m.day !== lastDay) {
      html += `
        <div class="day-heading">
          ИГРОВОЙ ДЕНЬ ${m.day}
          <span>ТУР ${m.tour}</span>
        </div>`;
      lastDay = m.day;
    }

    const done = isDone(m);
    const score = done
      ? `${m.homeGoals} : ${m.awayGoals}`
      : '— : —';

    const resultLabel = m.resultType === 'OT' ? 'ОТ'
      : m.resultType === 'SO' ? 'Б' : 'ОСН';

    html += `
      <article class="match-card ${done ? 'done' : ''} ${openedMatch === m.id ? 'open' : ''}"
        data-id="${m.id}">

        <div class="match-main">
          <div class="match-number">
            МАТЧ ${String(m.id).padStart(3,'0')}
            <small>ДЕНЬ ${m.day}</small>
          </div>

          <div class="teams">
            <div class="team-name">${esc(m.home)}</div>
            <div class="versus">VS</div>
            <div class="team-name away">${esc(m.away)}</div>
          </div>

          <div class="match-time">
            <b>${formatDate(m.date)}</b>
            ${esc(m.time || 'Время не задано')}
          </div>

          <div class="match-actions">
            <div class="score-mini ${done ? '' : 'empty'}">
              ${score}
              ${done ? `<small>${resultLabel}</small>` : ''}
            </div>
            <button class="edit-btn" data-edit="${m.id}">
              ${openedMatch === m.id ? 'ЗАКРЫТЬ' : 'ЗАПОЛНИТЬ'}
            </button>
          </div>
        </div>

        <div class="match-editor">
          <div class="editor-grid">
            <div class="field">
              <label>ДАТА</label>
              <input type="date" data-field="date" value="${esc(m.date || '')}">
            </div>

            <div class="field">
              <label>ВРЕМЯ</label>
              <input type="time" data-field="time" value="${esc(m.time || '')}">
            </div>

            <div class="field">
              <label>СЧЁТ · ${esc(m.home)}</label>
              <div class="score-fields">
                <input type="number" min="0" max="30" data-field="homeGoals"
                  value="${done ? m.homeGoals : ''}" placeholder="0">
                <span>:</span>
                <input type="number" min="0" max="30" data-field="awayGoals"
                  value="${done ? m.awayGoals : ''}" placeholder="0">
              </div>
            </div>

            <div class="field">
              <label>РЕЗУЛЬТАТ</label>
              <select data-field="resultType">
                <option value="REG" ${(!m.resultType || m.resultType === 'REG') ? 'selected' : ''}>Основное время</option>
                <option value="OT" ${m.resultType === 'OT' ? 'selected' : ''}>Овертайм</option>
                <option value="SO" ${m.resultType === 'SO' ? 'selected' : ''}>Буллиты</option>
              </select>
            </div>
          </div>

          <div class="editor-bottom">
            <span class="editor-hint">
              ОВ — 2 очка · ПОБЕДА В ОСН. ВРЕМЯ — 3 · ПОРАЖЕНИЕ В ОТ/Б — 1
            </span>

            <div class="editor-buttons">
              <button class="generate-btn" data-generate="${m.id}">
                ✦ СГЕНЕРИРОВАТЬ СЧЁТ
              </button>
              <button class="save-btn" data-save="${m.id}">
                СОХРАНИТЬ
              </button>
            </div>
          </div>
        </div>
      </article>`;
  });

  root.innerHTML = html;
}

function saveMatch(id) {
  const card = document.querySelector(`.match-card[data-id="${id}"]`);
  const match = state.matches.find(m => m.id === id);

  if (!card || !match) return;

  const val = key => card.querySelector(`[data-field="${key}"]`).value;
  const hg = val('homeGoals');
  const ag = val('awayGoals');
  const type = val('resultType');

  if ((hg === '') !== (ag === '')) {
    showToast('Заполни обе ячейки счёта');
    return;
  }

  if (hg !== '' &&
    (!Number.isInteger(Number(hg)) ||
     !Number.isInteger(Number(ag)) ||
     Number(hg) < 0 || Number(ag) < 0 ||
     Number(hg) > 30 || Number(ag) > 30)) {
    showToast('Проверь счёт матча');
    return;
  }

  if (hg !== '' && Number(hg) === Number(ag)) {
    showToast('Итоговый счёт должен определить победителя');
    return;
  }

  match.date = val('date');
  match.time = val('time');
  match.resultType = type;

  if (hg === '') {
    delete match.homeGoals;
    delete match.awayGoals;
  } else {
    match.homeGoals = Number(hg);
    match.awayGoals = Number(ag);
  }

  persist();
  openedMatch = null;

  renderMatches();
  renderStandings();
  showToast('Результат сохранён · таблицы обновлены');
}

function randomGoals(mean) {
  let goals = 0;
  const attempts = 12;

  for (let i = 0; i < attempts; i++) {
    if (Math.random() < mean / attempts) goals++;
  }

  return Math.min(9, goals);
}

function generateScore(id) {
  const match = state.matches.find(m => m.id === id);
  const card = document.querySelector(`.match-card[data-id="${id}"]`);

  if (!match || !card) return;

  const difference =
    (state.ratings[match.home] - state.ratings[match.away]) / 100;

  const homeMean = Math.max(1.2, 2.7 + difference * 2.2 + 0.15);
  const awayMean = Math.max(1.2, 2.7 - difference * 2.2);

  let home = randomGoals(homeMean);
  let away = randomGoals(awayMean);
  let type = 'REG';

  if (home === away) {
    type = Math.random() < 0.6 ? 'OT' : 'SO';
    if (Math.random() < 0.5) home++;
    else away++;
  } else if (Math.random() < 0.2) {
    type = Math.random() < 0.5 ? 'OT' : 'SO';
  }

  card.querySelector('[data-field="homeGoals"]').value = home;
  card.querySelector('[data-field="awayGoals"]').value = away;
  card.querySelector('[data-field="resultType"]').value = type;

  showToast(`Сгенерировано: ${home} : ${away}. Не забудь сохранить.`);
}

document.getElementById('matchList').addEventListener('click', e => {
  const edit = e.target.closest('[data-edit]');
  const save = e.target.closest('[data-save]');
  const generate = e.target.closest('[data-generate]');

  if (edit) {
    const id = Number(edit.dataset.edit);
    openedMatch = openedMatch === id ? null : id;
    renderMatches();
    return;
  }

  if (save) {
    saveMatch(Number(save.dataset.save));
    return;
  }

  if (generate) {
    generateScore(Number(generate.dataset.generate));
  }
});

['matchSearch','dayFilter','statusFilter'].forEach(id => {
  document.getElementById(id).addEventListener(
    id === 'matchSearch' ? 'input' : 'change',
    renderMatches
  );
});

// ПОДСЧЁТ СТАТИСТИКИ
function getStandings(teams) {
  const table = Object.fromEntries(teams.map(team => [
    team,
    {
      team,
      gp:0,
      wins:0,
      losses:0,
      ot:0,
      gf:0,
      ga:0,
      pts:0
    }
  ]));

  state.matches.filter(isDone).forEach(match => {
    const home = table[match.home];
    const away = table[match.away];

    if (!home || !away) return;

    const hg = match.homeGoals;
    const ag = match.awayGoals;
    const homeWin = hg > ag;
    const type = match.resultType || 'REG';

    home.gp++;
    away.gp++;

    home.gf += hg;
    home.ga += ag;
    away.gf += ag;
    away.ga += hg;

    if (type === 'REG') {
      if (homeWin) {
        home.wins++;
        home.pts += 3;
        away.losses++;
      } else {
        away.wins++;
        away.pts += 3;
        home.losses++;
      }
    } else {
      home.ot++;
      away.ot++;

      if (homeWin) {
        home.wins++;
        home.pts += 2;
        away.losses++;
        away.pts += 1;
      } else {
        away.wins++;
        away.pts += 2;
        home.losses++;
        home.pts += 1;
      }
    }
  });

  return Object.values(table).sort((a,b) =>
    b.pts - a.pts ||
    b.wins - a.wins ||
    (b.gf - b.ga) - (a.gf - a.ga) ||
    b.gf - a.gf ||
    a.team.localeCompare(b.team,'ru')
  );
}

// ОТРИСОВКА ТУРНИРНОЙ ТАБЛИЦЫ
function renderTable(teams, target, leaderTarget) {
  const rows = getStandings(teams);

  document.getElementById(leaderTarget).textContent =
    rows[0]?.team || '—';

  const root = document.getElementById(target);

  root.innerHTML = `
    <div class="standings-board">
      <div class="standings-title">
        <span>МЕСТО</span>
        <span>КЛУБ</span>
        <span>И</span>
        <span>В</span>
        <span>П</span>
        <span>ОТ</span>
        <span>РШ</span>
        <span>ОЧКИ</span>
      </div>

      ${rows.map((r,i) => {
        const diff = r.gf - r.ga;

        return `
          <div class="standings-row">
            <span class="standings-rank">${i+1}</span>

            <span class="standings-team">
              ${getTeamBadge(r.team)}
              <b>${esc(r.team)}</b>
            </span>

            <span>${r.gp}</span>
            <span>${r.wins}</span>
            <span>${r.losses}</span>
            <span>${r.ot}</span>

            <span class="goal-diff ${diff > 0 ? 'positive' : diff < 0 ? 'negative' : ''}">
              ${diff > 0 ? '+' : ''}${diff}
            </span>

            <strong class="standings-points">${r.pts}</strong>
          </div>`;
      }).join('')}
    </div>`;
}

function renderStandings() {
  renderTable(WEST, 'westTable', 'westLeader');
  renderTable(EAST, 'eastTable', 'eastLeader');
}

// РЕЙТИНГИ
function renderRatings() {
  document.getElementById('ratingList').innerHTML =
    ALL_TEAMS.map((team,i) => `
      <div class="rating-item">
        <span class="rating-index">${String(i+1).padStart(2,'0')}</span>
        <span class="rating-team">${esc(team)}</span>
        <span class="rating-value" id="rating-value-${i}">
          ${state.ratings[team]}
        </span>
        <input type="range" min="0" max="100" step="1"
          value="${state.ratings[team]}"
          data-rating="${esc(team)}">
      </div>
    `).join('');
}

document.getElementById('ratingList').addEventListener('input', e => {
  const input = e.target.closest('[data-rating]');
  if (!input) return;

  const team = input.dataset.rating;
  state.ratings[team] = Number(input.value);

  const index = ALL_TEAMS.indexOf(team);
  document.getElementById(`rating-value-${index}`).textContent = input.value;

  persist();
});

document.getElementById('resetAll').addEventListener('click', () => {
  if (!confirm('Сбросить результаты, даты, время и рейтинги сезона?')) return;

  localStorage.removeItem(STORE_KEY);
  state = loadState();
  openedMatch = null;

  renderMatches();
  renderStandings();
  renderRatings();
  updateProgress();

  showToast('Сезон сброшен');
});

// ЗАПУСК
initFilters();
renderMatches();
renderStandings();
renderRatings();
updateProgress();
