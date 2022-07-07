// GET RANDOM ITEM FROM ARRAY
export const GET_RANDOM_ITEM = (array: any[]) => {
    return array.at(Math.floor(Math.random() * array.length));
}