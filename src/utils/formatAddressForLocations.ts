export const formatAddressForLocation = (input: string): string => {
  const commaIndices: number[] = [];

  // Find indices of all commas
  for (let i = 0; i < input.length; i++) {
    if (input[i] === ",") {
      commaIndices.push(i);
    }
  }

  // If there are at least 4 commas, extract text up to the fourth comma
  if (commaIndices.length >= 4) {
    return input.substring(0, commaIndices[3]);
  }

  // If there are fewer than 4 commas, return the entire input
  return input;
};
