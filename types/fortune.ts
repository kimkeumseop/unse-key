export type Zodiac =
  | 'rat'
  | 'ox'
  | 'tiger'
  | 'rabbit'
  | 'dragon'
  | 'snake'
  | 'horse'
  | 'goat'
  | 'monkey'
  | 'rooster'
  | 'dog'
  | 'pig';

export const ZODIAC_INFO: Record<Zodiac, { ko: string; emoji: string; years: number[] }> = {
  rat: { ko: '쥐띠', emoji: '🐭', years: [1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020] },
  ox: { ko: '소띠', emoji: '🐮', years: [1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021] },
  tiger: { ko: '호랑이띠', emoji: '🐯', years: [1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022] },
  rabbit: { ko: '토끼띠', emoji: '🐰', years: [1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023] },
  dragon: { ko: '용띠', emoji: '🐲', years: [1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024] },
  snake: { ko: '뱀띠', emoji: '🐍', years: [1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025] },
  horse: { ko: '말띠', emoji: '🐴', years: [1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026] },
  goat: { ko: '양띠', emoji: '🐑', years: [1943, 1955, 1967, 1979, 1991, 2003, 2015] },
  monkey: { ko: '원숭이띠', emoji: '🐒', years: [1944, 1956, 1968, 1980, 1992, 2004, 2016] },
  rooster: { ko: '닭띠', emoji: '🐓', years: [1945, 1957, 1969, 1981, 1993, 2005, 2017] },
  dog: { ko: '개띠', emoji: '🐶', years: [1946, 1958, 1970, 1982, 1994, 2006, 2018] },
  pig: { ko: '돼지띠', emoji: '🐷', years: [1947, 1959, 1971, 1983, 1995, 2007, 2019] }
};

export const ZODIAC_ORDER: Zodiac[] = [
  'rat',
  'ox',
  'tiger',
  'rabbit',
  'dragon',
  'snake',
  'horse',
  'goat',
  'monkey',
  'rooster',
  'dog',
  'pig'
];

export interface FortuneData {
  id: string;
  year: number;
  month: number;
  zodiac: Zodiac;
  title: string;
  stars_overall: number;
  stars_love: number;
  stars_money: number;
  stars_health: number;
  content_overall: string;
  content_love: string;
  content_money: string;
  content_health: string;
  lucky_color: string;
  lucky_numbers: number[];
  caution_dates: number[];
  created_at?: string;
}
