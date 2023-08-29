import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const datetimeFormatter = Intl.DateTimeFormat("pt-br", {
  dateStyle: "short",
  timeStyle: "medium",
});

export const formatDatetime = (date: string) => {
  return datetimeFormatter.format(new Date(date));
};

export * from "./action";
export * from "./runtime";
export * from "./storage";

export const errorKey = import.meta.env.VITE_ERROR_KEY;
export const tokenKey = import.meta.env.VITE_TOKEN_KEY;
export const emailKey = import.meta.env.VITE_EMAIL_KEY;
