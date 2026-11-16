
const WEST = [
  'Динамо Минск', 'Динамо Москва', 'Лада', 'Локомотив', 'СКА',
  'Северсталь', 'Сочи', 'Спартак', 'Торпедо', 'ЦСКА', 'Шанхай Дрэгонс'
];

const EAST = [
  'Авангард', 'Автомобилист', 'Адмирал', 'Ак Барс', 'Амур',
  'Барыс', 'Металлург Мг', 'Нефтехимик', 'Салават Юлаев', 'Сибирь', 'Трактор'
];

const RATING_ORDER = [
  'Авангард', 'Автомобилист', 'Адмирал', 'Ак Барс', 'Амур', 'Барыс',
  'Динамо Минск', 'Динамо Москва', 'Лада', 'Локомотив', 'Металлург Мг',
  'Нефтехимик', 'Салават Юлаев', 'Северсталь', 'Сибирь', 'СКА', 'Сочи',
  'Спартак', 'Торпедо', 'Трактор', 'ЦСКА', 'Шанхай Дрэгонс'
];

const INITIAL_RATINGS = {
  'Авангард': 89,
  'Автомобилист': 94,
  'Адмирал': 69,
  'Ак Барс': 89,
  'Амур': 82,
  'Барыс': 79,
  'Динамо Минск': 86,
  'Динамо Москва': 87,
  'Лада': 63,
  'Локомотив': 87,
  'Металлург Мг': 85,
  'Нефтехимик': 85,
  'Салават Юлаев': 76,
  'Северсталь': 75,
  'Сибирь': 79,
  'СКА': 82,
  'Сочи': 72,
  'Спартак': 87,
  'Торпедо': 83,
  'Трактор': 82,
  'ЦСКА': 92,
  'Шанхай Дрэгонс': 85
};

// Стартовые результаты матчей 001–042.
const SEEDED_RESULTS = {
  1: {homeGoals:7, awayGoals:1, resultType:'REG'},
  2: {homeGoals:3, awayGoals:1, resultType:'REG'},
  3: {homeGoals:1, awayGoals:2, resultType:'REG'},
  4: {homeGoals:2, awayGoals:1, resultType:'REG'},
  5: {homeGoals:0, awayGoals:4, resultType:'REG'},
  6: {homeGoals:0, awayGoals:3, resultType:'REG'},
  7: {homeGoals:3, awayGoals:2, resultType:'REG'},
  8: {homeGoals:1, awayGoals:0, resultType:'REG'},
  9: {homeGoals:3, awayGoals:2, resultType:'OT'},
  10: {homeGoals:3, awayGoals:2, resultType:'REG'},
  11: {homeGoals:1, awayGoals:4, resultType:'REG'},
  12: {homeGoals:2, awayGoals:3, resultType:'SO'},
  13: {homeGoals:1, awayGoals:2, resultType:'REG'},
  14: {homeGoals:3, awayGoals:1, resultType:'REG'},
  15: {homeGoals:2, awayGoals:3, resultType:'REG'},
  16: {homeGoals:4, awayGoals:1, resultType:'REG'},
  17: {homeGoals:0, awayGoals:1, resultType:'REG'},
  18: {homeGoals:1, awayGoals:2, resultType:'OT'},
  19: {homeGoals:2, awayGoals:3, resultType:'REG'},
  20: {homeGoals:4, awayGoals:2, resultType:'REG'},
  21: {homeGoals:4, awayGoals:3, resultType:'SO'},
  22: {homeGoals:3, awayGoals:2, resultType:'REG'},
  23: {homeGoals:3, awayGoals:0, resultType:'REG'},
  24: {homeGoals:2, awayGoals:1, resultType:'OT'},
  25: {homeGoals:1, awayGoals:3, resultType:'REG'},
  26: {homeGoals:2, awayGoals:1, resultType:'REG'},
  27: {homeGoals:0, awayGoals:4, resultType:'REG'},
  28: {homeGoals:8, awayGoals:4, resultType:'REG'},
  29: {homeGoals:3, awayGoals:4, resultType:'REG'},
  30: {homeGoals:3, awayGoals:5, resultType:'REG'},
  31: {homeGoals:3, awayGoals:5, resultType:'REG'},
  32: {homeGoals:3, awayGoals:2, resultType:'REG'},
  33: {homeGoals:5, awayGoals:2, resultType:'REG'},
  34: {homeGoals:2, awayGoals:3, resultType:'REG'},
  35: {homeGoals:2, awayGoals:4, resultType:'REG'},
  36: {homeGoals:4, awayGoals:3, resultType:'OT'},
  37: {homeGoals:0, awayGoals:5, resultType:'REG'},
  38: {homeGoals:2, awayGoals:3, resultType:'REG'},
  39: {homeGoals:0, awayGoals:1, resultType:'REG'},
  40: {homeGoals:3, awayGoals:2, resultType:'REG'},
  41: {homeGoals:2, awayGoals:4, resultType:'REG'},
  42: {homeGoals:1, awayGoals:2, resultType:'REG'}
};

const STORE_KEY = 'khl-viar-season-v3';
const LEGACY_STORE_KEY = 'khl-viar-season-v2';

const TEAM_COLORS = {
  'ЦСКА': ['#D71920','#FFFFFF','Ц'],
  'Локомотив': ['#D71920','#FFFFFF','Л'],
  'Торпедо': ['#183C9B','#FFFFFF','Т'],
  'Спартак': ['#D71920','#FFFFFF','С'],
  'Северсталь': ['#F2C400','#101010','С'],
  'Шанхай Дрэгонс': ['#E94B12','#FFFFFF','Ш'],
  'Динамо Москва': ['#1764B5','#FFFFFF','Д'],
  'Динамо Минск': ['#22A9D5','#071321','Д'],
  'СКА': ['#1764B5','#FFFFFF','СКА'],
  'Сочи': ['#00A6A6','#FFFFFF','С'],
  'Лада': ['#1764B5','#FFFFFF','Л'],
  'Авангард': ['#D71920','#FFFFFF','А'],
  'Автомобилист': ['#D71920','#FFFFFF','А'],
  'Адмирал': ['#D7BD75','#101010','А'],
  'Ак Барс': ['#14815D','#FFFFFF','АБ'],
  'Амур': ['#E94B24','#FFFFFF','А'],
  'Барыс': ['#1764B5','#FFFFFF','Б'],
  'Металлург Мг': ['#1764B5','#FFFFFF','М'],
  'Нефтехимик': ['#1764B5','#FFFFFF','Н'],
  'Салават Юлаев': ['#138B56','#FFFFFF','СЮ'],
  'Сибирь': ['#2479C9','#FFFFFF','С'],
  'Трактор': ['#59616D','#FFFFFF','Т']
};

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function getTeamBadge(team) {
  const data = TEAM_COLORS[team] || ['#657080','#FFFFFF',team.slice(0,2)];

  return `
    <span class="club-badge"
      style="--club:${data[0]};--ink:${data[1]}">${data[2]}</span>
  `;
}

// Приводит сохранённый счёт к числу.
// Поддерживает как числа, так и строки из старых сохранений.
function normalizeScore(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const number = Number(value);

  if (!Number.isInteger(number) || number < 0 || number > 30) {
    return null;
  }

  return number;
}

function loadState() {
  try {
    const current = localStorage.getItem(STORE_KEY);
    const legacy = !current
      ? localStorage.getItem(LEGACY_STORE_KEY)
      : null;

    const saved = JSON.parse(current || legacy || '{}');
    const migratingLegacy = !current && !!legacy;

    const matches = window.INITIAL_MATCHES.map(match => {
      const id = Number(match.id);

      const savedMatch =
        saved.matches?.[id] ??
        saved.matches?.[String(id)] ??
        null;

      const merged = {
        ...match,
        ...(SEEDED_RESULTS[id] || {}),
        ...(savedMatch || {})
      };

      // Явно очищенный пользователем счёт не заменяем стартовым.
      const scoreCleared = savedMatch && (
        savedMatch.homeGoals === null ||
        savedMatch.awayGoals === null
      );

      if (scoreCleared) {
        merged.homeGoals = null;
        merged.awayGoals = null;
      } else {
        const homeGoals = normalizeScore(merged.homeGoals);
        const awayGoals = normalizeScore(merged.awayGoals);

        if (homeGoals !== null && awayGoals !== null) {
          merged.homeGoals = homeGoals;
          merged.awayGoals = awayGoals;
        } else {
          merged.homeGoals = null;
          merged.awayGoals = null;
        }
      }

      merged.id = id;

      return merged;
    });

    const ratings = Object.fromEntries(
      RATING_ORDER.map(team => {
        const storedValue = saved.ratings?.[team];
        const stored = Number(storedValue);

        const useStored =
          storedValue !== null &&
          storedValue !== undefined &&
          storedValue !== '' &&
          Number.isFinite(stored) &&
          stored >= 0 &&
          stored <= 100 &&
          (!migratingLegacy || stored !== 50);

        return [
          team,
          useStored ? stored : (INITIAL_RATINGS[team] ?? 50)
        ];
      })
    );

    return {matches, ratings};

  } catch (error) {
    console.error('Ошибка загрузки сезона:', error);

    return {
      matches: window.INITIAL_MATCHES.map(match => ({
        ...match,
        ...(SEEDED_RESULTS[Number(match.id)] || {})
      })),
      ratings: {...INITIAL_RATINGS}
    };
  }
}

let state = loadState();
let openedMatch = null;

function isDone(match) {
  return (
    normalizeScore(match.homeGoals) !== null &&
    normalizeScore(match.awayGoals) !== null
  );
}

function persist() {
  const matches = Object.fromEntries(
    state.matches.map(match => [
      match.id,
      {
        date: match.date || '',
        time: match.time || '',
        homeGoals: normalizeScore(match.homeGoals),
        awayGoals: normalizeScore(match.awayGoals),
        resultType: match.resultType || 'REG'
      }
    ])
  );

  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        matches,
        ratings: state.ratings
      })
    );
  } catch (error) {
    console.error('Не удалось сохранить сезон:', error);
    showToast('Ошибка локального сохранения');
  }

  updateProgress();
}

function updateProgress() {
  const done = state.matches.filter(isDone).length;
  const matchesDone = document.getElementById('matchesDone');
  const completion = document.getElementById('completionPercent');

  if (matchesDone) {
    matchesDone.textContent = `${done} / ${state.matches.length}`;
  }

  if (completion) {
    completion.textContent =
      Math.round(done / state.matches.length * 100) + '%';
  }
}

function showToast(message) {
  const element = document.getElementById('toast');
  if (!element) return;

  element.textContent = message;
  element.classList.add('show');

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    element.classList.remove('show');
  }, 2200);
}

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(button => {
    button.classList.toggle('active', button.dataset.tab === tab);
  });

  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === tab);
  });

  if (tab === 'west' || tab === 'east') {
    renderStandings();
  }
}

document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    switchTab(button.dataset.tab);
  });
});

function initFilters() {
  const select = document.getElementById('dayFilter');
  if (!select) return;

  const days = [...new Set(
    state.matches.map(match => match.day)
  )].sort((a,b) => a-b);

  days.forEach(day => {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = `Игровой день ${day}`;
    select.append(option);
  });
}

function formatDate(value) {
  if (!value) return 'Дата не задана';

  const [year, month, day] = value.split('-');
  return `${day}.${month}.${year}`;
}

function renderMatches() {
  const searchElement = document.getElementById('matchSearch');
  const dayElement = document.getElementById('dayFilter');
  const statusElement = document.getElementById('statusFilter');
  const root = document.getElementById('matchList');

  if (!searchElement || !dayElement || !statusElement || !root) return;

  const query = searchElement.value.trim().toLocaleLowerCase('ru');
  const day = dayElement.value;
  const status = statusElement.value;

  const filtered = state.matches.filter(match => {
    const teams = (
      match.home + ' ' + match.away
    ).toLocaleLowerCase('ru');

    return (
      (!query || teams.includes(query)) &&
      (day === 'all' || String(match.day) === day) &&
      (
        status === 'all' ||
        (status === 'done' ? isDone(match) : !isDone(match))
      )
    );
  });

  if (!filtered.length) {
    root.innerHTML =
      '<div class="empty-state">Матчи не найдены</div>';
    return;
  }

  let html = '';
  let lastDay = null;

  filtered.forEach(match => {
    if (match.day !== lastDay) {
      html += `
        <div class="day-heading">
          ИГРОВОЙ ДЕНЬ ${match.day}
          <span>ТУР ${match.tour}</span>
        </div>
      `;

      lastDay = match.day;
    }

    const done = isDone(match);
    const score = done
      ? `${normalizeScore(match.homeGoals)} : ${normalizeScore(match.awayGoals)}`
      : '— : —';

    const resultLabel = match.resultType === 'OT'
      ? 'ОТ'
      : match.resultType === 'SO'
        ? 'Б'
        : 'ОСН';

    html += `
      <article
        class="match-card ${done ? 'done' : ''} ${openedMatch === match.id ? 'open' : ''}"
        data-id="${match.id}">

        <div class="match-main">
          <div class="match-number">
            МАТЧ ${String(match.id).padStart(3,'0')}
            <small>ДЕНЬ ${match.day}</small>
          </div>

          <div class="teams">
            <div class="team-name">${esc(match.home)}</div>
            <div class="versus">VS</div>
            <div class="team-name away">${esc(match.away)}</div>
          </div>

          <div class="match-time">
            <b>${formatDate(match.date)}</b>
            ${esc(match.time || 'Время не задано')}
          </div>

          <div class="match-actions">
            <div class="score-mini ${done ? '' : 'empty'}">
              ${score}
              ${done ? `<small>${resultLabel}</small>` : ''}
            </div>

            <button class="edit-btn" data-edit="${match.id}">
              ${openedMatch === match.id ? 'ЗАКРЫТЬ' : 'ЗАПОЛНИТЬ'}
            </button>
          </div>
        </div>

        <div class="match-editor">
          <div class="editor-grid">

            <div class="field">
              <label>ДАТА</label>
              <input
                type="date"
                data-field="date"
                value="${esc(match.date || '')}">
            </div>

            <div class="field">
              <label>ВРЕМЯ</label>
              <input
                type="time"
                data-field="time"
                value="${esc(match.time || '')}">
            </div>

            <div class="field">
              <label>СЧЁТ · ${esc(match.home)}</label>
              <div class="score-fields">
                <input
                  type="number"
                  min="0"
                  max="30"
                  data-field="homeGoals"
                  value="${done ? normalizeScore(match.homeGoals) : ''}"
                  placeholder="0">

                <span>:</span>

                <input
                  type="number"
                  min="0"
                  max="30"
                  data-field="awayGoals"
                  value="${done ? normalizeScore(match.awayGoals) : ''}"
                  placeholder="0">
              </div>
            </div>

            <div class="field">
              <label>РЕЗУЛЬТАТ</label>
              <select data-field="resultType">
                <option
                  value="REG"
                  ${(!match.resultType || match.resultType === 'REG') ? 'selected' : ''}>
                  Основное время
                </option>

                <option
                  value="OT"
                  ${match.resultType === 'OT' ? 'selected' : ''}>
                  Овертайм
                </option>

                <option
                  value="SO"
                  ${match.resultType === 'SO' ? 'selected' : ''}>
                  Буллиты
                </option>
              </select>
            </div>

          </div>

          <div class="editor-bottom">
            <span class="editor-hint">
              Победа в основное время — 3 очка · ОТ/Б — 2 · Поражение в ОТ/Б — 1
            </span>

            <div class="editor-buttons">
              <button
                class="generate-btn"
                data-generate="${match.id}">
                ✦ СГЕНЕРИРОВАТЬ СЧЁТ
              </button>

              <button
                class="save-btn"
                data-save="${match.id}">
                СОХРАНИТЬ
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  });

  root.innerHTML = html;
}

function saveMatch(id) {
  const card = document.querySelector(
    `.match-card[data-id="${id}"]`
  );

  const match = state.matches.find(
    item => Number(item.id) === Number(id)
  );

  if (!card || !match) return;

  const val = key => {
    const field = card.querySelector(`[data-field="${key}"]`);
    return field ? field.value.trim() : '';
  };

  const hg = val('homeGoals');
  const ag = val('awayGoals');
  const type = val('resultType');

  if ((hg === '') !== (ag === '')) {
    showToast('Заполни обе ячейки счёта');
    return;
  }

  if (hg !== '' && (
    !Number.isInteger(Number(hg)) ||
    !Number.isInteger(Number(ag)) ||
    Number(hg) < 0 ||
    Number(ag) < 0 ||
    Number(hg) > 30 ||
    Number(ag) > 30
  )) {
    showToast('Проверь счёт матча');
    return;
  }

  if (hg !== '' && Number(hg) === Number(ag)) {
    showToast('Итоговый счёт должен определить победителя');
    return;
  }

  match.date = val('date');
  match.time = val('time');
  match.resultType = type || 'REG';

  if (hg === '') {
    // null сохраняется в localStorage и фиксирует очистку счёта.
    match.homeGoals = null;
    match.awayGoals = null;
  } else {
    match.homeGoals = Number(hg);
    match.awayGoals = Number(ag);
  }

  persist();

  openedMatch = null;

  renderMatches();
  renderStandings();

  showToast('Результат сохранён · таблицы пересчитаны');
}

function randomGoals(mean) {
  let goals = 0;
  const attempts = 12;

  for (let i = 0; i < attempts; i++) {
    if (Math.random() < mean / attempts) {
      goals++;
    }
  }

  return Math.min(9, goals);
}

function generateScore(id) {
  const match = state.matches.find(
    item => Number(item.id) === Number(id)
  );

  const card = document.querySelector(
    `.match-card[data-id="${id}"]`
  );

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

    if (Math.random() < 0.5) {
      home++;
    } else {
      away++;
    }
  } else if (Math.random() < 0.2) {
    type = Math.random() < 0.5 ? 'OT' : 'SO';
  }

  card.querySelector('[data-field="homeGoals"]').value = home;
  card.querySelector('[data-field="awayGoals"]').value = away;
  card.querySelector('[data-field="resultType"]').value = type;

  showToast(`Сгенерировано: ${home} : ${away}. Нажми «Сохранить».`);
}

document.getElementById('matchList').addEventListener('click', event => {
  const edit = event.target.closest('[data-edit]');
  const save = event.target.closest('[data-save]');
  const generate = event.target.closest('[data-generate]');

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

['matchSearch', 'dayFilter', 'statusFilter'].forEach(id => {
  const element = document.getElementById(id);
  if (!element) return;

  element.addEventListener(
    id === 'matchSearch' ? 'input' : 'change',
    renderMatches
  );
});

// Расчёт турнирной таблицы по системе КХЛ.
function getStandings(teams) {
  const table = Object.fromEntries(
    teams.map(team => [
      team,
      {
        team,
        gp: 0,
        wins: 0,
        losses: 0,
        ot: 0,
        gf: 0,
        ga: 0,
        pts: 0
      }
    ])
  );

  state.matches.filter(isDone).forEach(match => {
    const home = table[match.home];
    const away = table[match.away];

    if (!home || !away) return;

    // Всегда используем числовые значения.
    const hg = Number(match.homeGoals);
    const ag = Number(match.awayGoals);

    if (!Number.isInteger(hg) || !Number.isInteger(ag)) return;

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
      if (homeWin) {
        home.wins++;
        home.pts += 2;
        away.ot++;
        away.pts += 1;
      } else {
        away.wins++;
        away.pts += 2;
        home.ot++;
        home.pts += 1;
      }
    }
  });

  return Object.values(table).sort((a, b) =>
    b.pts - a.pts ||
    b.wins - a.wins ||
    (b.gf - b.ga) - (a.gf - a.ga) ||
    b.gf - a.gf ||
    a.team.localeCompare(b.team, 'ru')
  );
}

function renderTable(teams, target, leaderTarget) {
  const rows = getStandings(teams);
  const leader = document.getElementById(leaderTarget);
  const root = document.getElementById(target);

  if (!root) return;

  if (leader) {
    leader.textContent = rows[0]?.team || '—';
  }

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

      ${rows.map((row, index) => {
        const diff = row.gf - row.ga;

        return `
          <div class="standings-row">

            <span class="standings-rank">
              ${index + 1}
            </span>

            <span class="standings-team">
              ${getTeamBadge(row.team)}
              <b>${esc(row.team)}</b>
            </span>

            <span>${row.gp}</span>
            <span>${row.wins}</span>
            <span>${row.losses}</span>
            <span>${row.ot}</span>

            <span class="goal-diff ${
              diff > 0 ? 'positive' : diff < 0 ? 'negative' : ''
            }">
              ${diff > 0 ? '+' : ''}${diff}
            </span>

            <strong class="standings-points">
              ${row.pts}
            </strong>

          </div>
        `;
      }).join('')}

    </div>
  `;
}

function renderStandings() {
  renderTable(WEST, 'westTable', 'westLeader');
  renderTable(EAST, 'eastTable', 'eastLeader');
}

function renderRatings() {
  const root = document.getElementById('ratingList');
  if (!root) return;

  root.innerHTML =
    RATING_ORDER.map((team, index) => `
      <div class="rating-item">

        <span class="rating-index">
          ${String(index + 1).padStart(2, '0')}
        </span>

        <span class="rating-team">
          ${esc(team)}
        </span>

        <span class="rating-value" id="rating-value-${index}">
          ${state.ratings[team]}
        </span>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value="${state.ratings[team]}"
          data-rating="${esc(team)}">

      </div>
    `).join('');
}

document.getElementById('ratingList').addEventListener('input', event => {
  const input = event.target.closest('[data-rating]');
  if (!input) return;

  const team = input.dataset.rating;
  state.ratings[team] = Number(input.value);

  const index = RATING_ORDER.indexOf(team);
  const valueElement = document.getElementById(`rating-value-${index}`);

  if (valueElement) {
    valueElement.textContent = input.value;
  }

  persist();
});

document.getElementById('resetAll').addEventListener('click', () => {
  if (!confirm(
    'Вернуть стартовые результаты 001–042 и исходные рейтинги команд?'
  )) {
    return;
  }

  localStorage.removeItem(STORE_KEY);
  localStorage.removeItem(LEGACY_STORE_KEY);

  state = loadState();
  openedMatch = null;

  renderMatches();
  renderStandings();
  renderRatings();

  persist();

  showToast('Начальные результаты и рейтинги восстановлены');
});

// Запуск приложения.
initFilters();
renderMatches();
renderStandings();
renderRatings();
persist();
