export const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en', { notation: 'compact' }).format(value);

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const formatRelative = (value: string) =>
  new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.round(
      (new Date(value).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ),
    'day',
  );

export const clampText = (text: string, max = 160) =>
  text.length > max ? `${text.slice(0, max - 1).trim()}...` : text;
