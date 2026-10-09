export const formatNumber = (n) => (n === null || n === undefined ? '—' : Number(n).toLocaleString());

export const formatHours = (n) => (n === null || n === undefined ? '—' : `${Number(n).toFixed(1)} hrs`);

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const trendDirection = (series, key) => {
  if (!series || series.length < 2) return 'flat';
  const first = series[0][key];
  const last = series[series.length - 1][key];
  if (last > first) return 'up';
  if (last < first) return 'down';
  return 'flat';
};
