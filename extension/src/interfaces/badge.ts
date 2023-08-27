type BadgeColor = chrome.action.ColorArray;

export type BadgeColors = {
  bg: BadgeColor;
  fg: BadgeColor;
};

export type BadgeCountColors = {
  zero: BadgeColors;
  low: BadgeColors;
  medium: BadgeColors;
  high: BadgeColors;
};
