export function getUniqueValues(items: string[]): string[] {
  return items.filter((value, index, items) => {
    return items.indexOf(value) === index
  })
}

export function convertToOptions(items:string[] | number[]):optionsType[]{
  return items.map((item, index)=> {
    return {
      id:index,
      label:item
    } as optionsType;
  })
}
