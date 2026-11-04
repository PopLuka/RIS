import { tripsApi } from './api/trips-api.js';
import { initializeCalendar } from './calendar/calendar.js';
import { initializeTripFilters, getFilteredTrips } from './trips/filters.js';
import { initializeTripForm } from './trips/form.js';
import { renderTripList } from './trips/list.js';

const notice = document.querySelector('#notice');
let trips = [];

function showNotice(message = '', isError = false) {
  notice.textContent = message;
  notice.classList.toggle('error', isError);
}

const updateCalendar = initializeCalendar(() => getFilteredTrips(trips));
const tripForm = initializeTripForm(saveTrip, (message) => showNotice(message, true));

function refreshViews() {
  const visibleTrips = getFilteredTrips(trips);
  renderTripList(visibleTrips, trips.length, tripForm.edit, deleteTrip);
  updateCalendar(visibleTrips);
}

async function loadTrips() {
  try {
    trips = await tripsApi.list();
    refreshViews();
    showNotice();
  } catch (error) {
    trips = [];
    refreshViews();
    showNotice(error.message, true);
  }
}

async function saveTrip(id, trip) {
  try {
    if (id) {
      await tripsApi.update(id, trip);
    } else {
      await tripsApi.create(trip);
    }

    tripForm.reset();
    await loadTrips();
    if (id) {
      showNotice('Spremembe so shranjene.');
    } else {
      showNotice('Novo potovanje je dodano.');
    }
  } catch (error) {
    showNotice(error.message, true);
  }
}

async function deleteTrip(trip) {
  if (!window.confirm(`Izbrišem potovanje »${trip.ime}«?`)) {
    return;
  }

  try {
    await tripsApi.remove(trip.id);
    if (tripForm.getEditingId() === String(trip.id)) {
      tripForm.reset();
    }
    await loadTrips();
    showNotice('Potovanje je izbrisano.');
  } catch (error) {
    showNotice(error.message, true);
  }
}

initializeTripFilters(refreshViews);
loadTrips();
