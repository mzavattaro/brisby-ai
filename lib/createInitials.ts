const getFirstLetters = (str: string | null | undefined): string => {
  if (!str) return '';

  const firstLetters = str
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');
  return firstLetters;
};

export default getFirstLetters;
