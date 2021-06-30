export const formatArray = (items: any[], result='') => {
  items.forEach((item, i) => {
    result += item;
    if ((i + 1) < items.length) result += ', ';
  });
  return result;
};