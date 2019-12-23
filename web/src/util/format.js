export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export function formatInitials(str) {
  let result = '';
  const initials = str.trim().split(' ');

  initials.forEach(word => {
    if (word.length > 3) result = result.concat(word.substr(0, 1));
  });

  return result.substr(0, 2);
}
