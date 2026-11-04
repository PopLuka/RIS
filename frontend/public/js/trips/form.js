const form = document.querySelector('#trip-form');

export function initializeTripForm(onSave, onValidationError) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const trip = readTripForm();

    if (trip.datumZakljucka < trip.datumZacetka) {
      onValidationError('Datum vrnitve ne sme biti pred datumom odhoda.');
      return;
    }

    await onSave(getEditingTripId(), trip);
  });

  document.querySelector('#cancel-edit').addEventListener('click', resetTripForm);

  return {
    edit: editTrip,
    reset: resetTripForm,
    getEditingId: getEditingTripId,
  };
}

function readTripForm() {
  return {
    ime: document.querySelector('#name').value.trim(),
    cilj: document.querySelector('#destination').value.trim(),
    datumZacetka: document.querySelector('#start-date').value,
    datumZakljucka: document.querySelector('#end-date').value,
    opis: document.querySelector('#description').value.trim(),
  };
}

function getEditingTripId() {
  return document.querySelector('#trip-id').value;
}

function editTrip(trip) {
  document.querySelector('#trip-id').value = trip.id;
  document.querySelector('#name').value = trip.ime;
  document.querySelector('#destination').value = trip.cilj;
  document.querySelector('#start-date').value = trip.datumZacetka;
  document.querySelector('#end-date').value = trip.datumZakljucka;
  document.querySelector('#description').value = trip.opis || '';
  document.querySelector('#form-title').innerHTML = 'Uredi svoj <span>načrt.</span>';
  document.querySelector('#submit-button').innerHTML = 'Shrani spremembe <span>↗</span>';
  document.querySelector('#cancel-edit').hidden = false;
  document.querySelector('#urejevalnik').scrollIntoView({ behavior: 'smooth' });
}

function resetTripForm() {
  form.reset();
  document.querySelector('#trip-id').value = '';
  document.querySelector('#form-title').innerHTML = 'Zapiši si <span>idejo.</span>';
  document.querySelector('#submit-button').innerHTML = 'Shrani potovanje <span>↗</span>';
  document.querySelector('#cancel-edit').hidden = true;
}
