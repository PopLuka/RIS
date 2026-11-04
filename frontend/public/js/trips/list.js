import { formatTripDateRange } from '../utils/date-utils.js';

const list = document.querySelector('#trip-list');
const template = document.querySelector('#trip-card-template');

export function renderTripList(visibleTrips, totalTrips, onEdit, onDelete) {
  const counter = document.querySelector('#trip-count');
  if (visibleTrips.length === totalTrips) {
    counter.textContent = `(${totalTrips})`;
  } else {
    counter.textContent = `(${visibleTrips.length} od ${totalTrips})`;
  }

  list.replaceChildren();
  if (!visibleTrips.length) {
    renderEmptyState();
    return;
  }

  for (const trip of visibleTrips) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector('.trip-dates').textContent = formatTripDateRange(trip);
    card.querySelector('.trip-name').textContent = trip.ime;
    card.querySelector('.trip-destination').textContent = trip.cilj;

    const description = card.querySelector('.trip-description');
    description.textContent = trip.opis || '';
    description.hidden = !trip.opis;

    card.querySelector('.edit-button').addEventListener('click', () => onEdit(trip));
    card.querySelector('.delete-button').addEventListener('click', () => onDelete(trip));
    list.append(card);
  }
}

function renderEmptyState() {
  const empty = document.createElement('div');
  empty.className = 'empty-state';

  if (hasActiveFilters()) {
    empty.innerHTML = '<span>⌕</span><h3>Ni zadetkov</h3><p>Spremeni ali počisti filtre.</p>';
  } else {
    empty.innerHTML = '<span>✳</span><h3>Prvo poglavje je še prazno.</h3><p>Dodaj svoje prvo potovanje in začni zbirati ideje.</p>';
  }

  list.append(empty);
}

function hasActiveFilters() {
  const selectors = ['#search', '#filter-location', '#filter-from', '#filter-to'];
  return selectors.some((selector) => document.querySelector(selector).value);
}
