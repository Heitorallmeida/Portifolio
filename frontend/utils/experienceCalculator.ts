import { Experience } from "@/api/user/user.types";

/**
 * Finds the earliest initial date from an array of experiences
 * and calculates the years between that date and the current date
 * @param experiences - Array of experience objects
 * @returns Number of years of experience (rounded to 1 decimal place)
 */
export function calculateYearsOfExperience(experiences: Experience[]): number {
  if (!experiences || experiences.length === 0) {
    return 0;
  }

  // Find the earliest initial date
  const earliestDate = experiences.reduce((earliest, experience) => {
    const currentDate = new Date(experience.initialDate);
    return currentDate < earliest ? currentDate : earliest;
  }, new Date(experiences[0].initialDate));

  // Calculate the difference in years between earliest date and now
  const currentDate = new Date();
  const diffInMilliseconds = currentDate.getTime() - earliestDate.getTime();
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  return Math.round(diffInYears * 10) / 10; // Round to 1 decimal place
}

/**
 * Gets the earliest experience from an array
 * @param experiences - Array of experience objects
 * @returns The experience with the earliest initial date, or null if array is empty
 */
export function getEarliestExperience(experiences: Experience[]): Experience | null {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return experiences.reduce((earliest, current) => {
    const currentDate = new Date(current.initialDate);
    const earliestDate = new Date(earliest.initialDate);
    return currentDate < earliestDate ? current : earliest;
  });
}
