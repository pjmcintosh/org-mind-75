import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for conditionally joining classNames together
 * Combines clsx for conditional classes and tailwind-merge for Tailwind CSS conflicts
 *
 * @param inputs - Class values to be processed
 * @returns Merged className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add any other utility functions here
