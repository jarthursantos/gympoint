export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export function formatInitials(str) {
  let result = '';
  const initials = str.split(' ');

  initials.forEach(word => {
    result = `${result}${word.substr(0, 1)}`;
  });

  return result.substr(0, 2);
}
