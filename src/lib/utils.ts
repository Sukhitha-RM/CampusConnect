import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getShortDate(dateString: string): { month: string; day: number } {
  const date = new Date(dateString + "T00:00:00");
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.getDate(),
  };
}

export function getProgressPercent(registered: number, capacity: number): number {
  return Math.round((registered / capacity) * 100);
}
