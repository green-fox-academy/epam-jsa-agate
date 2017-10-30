'use strict';

function decideTheme() {
  let theme = 'red';
  let storedTheme = localStorage.getItem('theme');

  if (storedTheme && (storedTheme === 'red' || storedTheme === 'dark')) {
    theme = storedTheme;
  } else {
    localStorage.setItem('theme', theme);
  }

  return theme;
}

export default {decideTheme: decideTheme};
