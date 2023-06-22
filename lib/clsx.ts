export const clsx = (
  ...classes: (number | string | false | null | undefined)[]
): string => classes.filter(Boolean).join(' ');
