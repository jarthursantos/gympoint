import { get } from 'fast-levenshtein';

function match(rawFilter, rawSearch) {
  const filter = rawFilter.replace(/ /g, '');
  const search = rawSearch.replace(/ /g, '');

  if (filter.length > search.length) return false;

  for (let i = filter.length; i <= search.length; i++) {
    const currentPart = search.substr(i - filter.length, filter.length);
    const distance = get(filter, currentPart, { useCollator: true });

    if (distance <= 1) return true;
  }

  return false;
}

export default function resolve(filter, data, paramName) {
  return data.filter(search => match(filter, search[paramName]));
}
