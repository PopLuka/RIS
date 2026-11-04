export function formatTripDateRange(trip) {
  const formatDate = (value) => new Intl.DateTimeFormat('sl-SI', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));

  return `${formatDate(trip.datumZacetka)} — ${formatDate(trip.datumZakljucka)}`;
}
