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
