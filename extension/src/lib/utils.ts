import { BadgeColors, BadgeCountColors } from "@/interfaces/interfaces";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const badgeCountColors: BadgeCountColors = {
  zero: { bg: [255, 255, 255, 255], fg: [0, 0, 0, 255] },
  low: { bg: [165, 243, 252, 255], fg: [8, 145, 178, 255] },
  medium: { bg: [16, 185, 129, 255], fg: [209, 250, 229, 255] },
  high: { bg: [239, 68, 68, 255], fg: [248, 250, 252, 255] },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setBadge = (count: number | null) => {
  if (count === null) {
    chrome.action.setBadgeText({ text: "" });
    return;
  }

  let badgeColors: BadgeColors;
  if (count === 0) {
    badgeColors = badgeCountColors.zero;
  } else if (count < 4) {
    badgeColors = badgeCountColors.low;
  } else if (count < 7) {
    badgeColors = badgeCountColors.medium;
  } else {
    badgeColors = badgeCountColors.high;
  }

  chrome.action.setBadgeText({ text: String(count) });
  chrome.action.setBadgeBackgroundColor({ color: badgeColors.bg });
  chrome.action.setBadgeTextColor({ color: badgeColors.fg });
};

export const getToken = async () =>
  getItem<string>(import.meta.env.VITE_TOKEN_KEY);
export const getEmail = async () =>
  getItem<string>(import.meta.env.VITE_EMAIL_KEY);

const getItem = async <T>(key: string): Promise<T | undefined> => {
  return (await chrome.storage.sync.get(key))[key];
};
