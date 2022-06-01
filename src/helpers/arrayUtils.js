
export const dateComparator = (event1, event2) => {
    if(new Date(event1.startTime) < new Date(event2.startTime)) return -1;
    if(new Date(event1.startTime) > new Date(event2.startTime)) return 1;
    return 0;
}

export const sortDateArray =(array, comparator) => {
    if(!Array.isArray(array) || array.length < 2) return array;

    const sortedArray = [...array];
    sortedArray.sort(comparator);

    return sortedArray;
}

export const isAvailableArray = (array) => {
    return array != null && Array.isArray(array) && array.length > 0;
}