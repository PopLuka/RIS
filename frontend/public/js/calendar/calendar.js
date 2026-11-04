import { formatTripDateRange } from '../utils/date-utils.js';

const grid = document.querySelector('#calendar-grid');
const monthTitle = document.querySelector('#calendar-month');

export function initializeCalendar(getTrips) {
  let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  document.querySelector('#previous-month').addEventListener('click', () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
    renderCalendar(getTrips(), calendarMonth);
  });

  document.querySelector('#next-month').addEventListener('click', () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
    renderCalendar(getTrips(), calendarMonth);
  });

  return function updateCalendar(trips) {
    renderCalendar(trips, calendarMonth);
  };
}

function renderCalendar(trips, month) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const monthName = new Intl.DateTimeFormat('sl-SI', { month: 'long', year: 'numeric' }).format(month);
  monthTitle.textContent = monthName[0].toLocaleUpperCase('sl') + monthName.slice(1);
  grid.replaceChildren();

  renderWeekdays();

  const firstDayOffset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cellCount = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;

  for (let cellIndex = 0; cellIndex < cellCount; cellIndex += 1) {
    const day = cellIndex - firstDayOffset + 1;
    const cell = document.createElement('div');
    cell.className = 'calendar-day';

    if (day < 1 || day > daysInMonth) {
      cell.classList.add('calendar-day-outside');
      grid.append(cell);
      continue;
    }

    const date = makeDateKey(year, monthIndex, day);
    renderDayNumber(cell, day);
    renderTripsForDay(cell, trips, date);
    grid.append(cell);
  }
}

function renderWeekdays() {
  const dayNames = ['Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob', 'Ned'];
  for (const dayName of dayNames) {
    const heading = document.createElement('div');
    heading.className = 'calendar-weekday';
    heading.textContent = dayName;
    grid.append(heading);
  }
}

function makeDateKey(year, monthIndex, day) {
  const month = String(monthIndex + 1).padStart(2, '0');
  const date = String(day).padStart(2, '0');
  return `${year}-${month}-${date}`;
}

function renderDayNumber(cell, day) {
  const number = document.createElement('span');
  number.className = 'calendar-day-number';
  number.textContent = String(day);
  cell.append(number);
}

function renderTripsForDay(cell, trips, date) {
  const activeTrips = trips.filter((trip) => trip.datumZacetka <= date && trip.datumZakljucka >= date);
  for (const trip of activeTrips) {
    const isStart = trip.datumZacetka === date;
    const isEnd = trip.datumZakljucka === date;
    const event = document.createElement('div');
    event.className = 'calendar-trip';

    if (isStart) {
      event.classList.add('trip-start');
    }
    if (isEnd) {
      event.classList.add('trip-end');
    }

    event.textContent = getTripLabel(trip, isStart, isEnd);
    event.title = `${trip.ime} — ${trip.cilj}: ${formatTripDateRange(trip)}`;
    cell.append(event);
  }
}

function getTripLabel(trip, isStart, isEnd) {
  if (isStart && isEnd) {
    return `${trip.ime} · odhod in vrnitev`;
  }
  if (isStart) {
    return `${trip.ime} · odhod`;
  }
  if (isEnd) {
    return `Vrnitev · ${trip.cilj}`;
  }
  return trip.cilj;
}
