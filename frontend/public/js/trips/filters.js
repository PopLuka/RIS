const filterSelectors = ['#search', '#filter-location', '#filter-from', '#filter-to'];

export function getFilteredTrips(trips) {
  const query = document.querySelector('#search').value.trim().toLocaleLowerCase('sl');
  const location = document.querySelector('#filter-location').value.trim().toLocaleLowerCase('sl');
  const from = document.querySelector('#filter-from').value;
  const to = document.querySelector('#filter-to').value;

  if (from && to && from > to) {
    return [];
  }

  return trips.filter((trip) => {
    const searchableText = `${trip.ime} ${trip.cilj} ${trip.opis || ''}`.toLocaleLowerCase('sl');
    const matchesText = searchableText.includes(query);
    const matchesLocation = trip.cilj.toLocaleLowerCase('sl').includes(location);
    const matchesFrom = !from || trip.datumZakljucka >= from;
    const matchesTo = !to || trip.datumZacetka <= to;
    return matchesText && matchesLocation && matchesFrom && matchesTo;
  });
}

export function initializeTripFilters(onChange) {
  for (const selector of filterSelectors) {
    const input = document.querySelector(selector);
    input.addEventListener('input', onChange);
    input.addEventListener('change', onChange);
  }

  document.querySelector('#clear-filters').addEventListener('click', () => {
    for (const selector of filterSelectors) {
      document.querySelector(selector).value = '';
    }
    onChange();
  });
}
