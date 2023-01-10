export const sortAsc = (array, attr) => {
  array.sort((a, b) =>
    a.attributes[attr] > b.attributes[attr]
      ? 1
      : b.attributes[attr] > a.attributes[attr]
      ? -1
      : 0
  );
};

export const sortDesc = (array, attr) => {
  array.reverse((a, b) =>
    a.attributes[attr] > b.attributes[attr]
      ? 1
      : b.attributes[attr] > a.attributes[attr]
      ? -1
      : 0
  );
};
