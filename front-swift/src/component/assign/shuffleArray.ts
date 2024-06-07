function shuffleArray<T>(array: T[]): T[] {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  function rotateArrayLeft<T>(array: T[], positions: number): T[] {
    const length = array.length;
    const normalizedPositions = positions % length;
    return array.slice(normalizedPositions).concat(array.slice(0, normalizedPositions));
  };
  
  function rotateArrayRight<T>(array: T[], positions: number): T[] {
    const length = array.length;
    const normalizedPositions = positions % length;
    return array.slice(length - normalizedPositions).concat(array.slice(0, length - normalizedPositions));
  };
export {shuffleArray, rotateArrayLeft, rotateArrayRight};