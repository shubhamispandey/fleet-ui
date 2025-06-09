"use client";

export const getCookie = (name: string) => {
  console.log(name, document.cookie);
};

export const debouncedSearch = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  time: number
): ((...args: Args) => void) => {
  let t: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), time);
  };
};
