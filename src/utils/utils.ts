export const capitalize = (word: string) => (
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`
);

export const getNumbers = () => {
  const numbers: string[] = [];
  while (numbers.length < 9) {
    const count: number = 9 - numbers.length;
    for (let i = count - 2; i <= count; i++) {
      numbers.push(`${i}`);
    }
  }

  return numbers;
}