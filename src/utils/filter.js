const sortByDate = (list, state) => {
    if (state.sortByDate === "oldest") {
      return list.sort((note1, note2) => note1.createdAt - note2.createdAt);
    } else {
      return list.sort((note1, note2) => note2.createdAt - note1.createdAt);
    }
  };
  
  const filterByTag = (list, state) => {
    if (state.tag === "all") return list;
    return list.filter((note) => note.tags.includes(state.tag));
  };
  
const filterByPriority = (list, state) => {
    console.log(state)
    if (state.priority === "all") return list;
    return [...list.filter((note) => note.priority === state.priority)];
  };
  
  export const getFilteredList = (list, state) => {
    let newList;
    newList = sortByDate(list, state);
    newList = filterByPriority(newList, state);
    newList = filterByTag(newList, state);
    return newList;
  };