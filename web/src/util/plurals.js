import { format } from 'util';

export function month(count) {
  return format(count === 1 ? '%d mês' : '%d meses', count);
}
