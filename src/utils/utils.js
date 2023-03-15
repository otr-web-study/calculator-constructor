export const capitalize = (word) => (
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`
);

export const getNumbers = () => {
  const numbers = [];
  while (numbers.length < 9) {
    const count = 9 - numbers.length;
    for (let i = count - 2; i <= count; i++) {
      numbers.push(i);
    }
  }

  return numbers;
}