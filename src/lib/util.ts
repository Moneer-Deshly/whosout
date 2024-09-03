import { clsx } from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tw-merge";

// merges classes provided in the component itself + classes given as a prop
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
