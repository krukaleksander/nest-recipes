import { IRecipe } from '../../interfaces';

export function chunkArray(arr: IRecipe[], chunkSize: number) {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}
