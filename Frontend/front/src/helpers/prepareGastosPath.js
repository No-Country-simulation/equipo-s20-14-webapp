export const prepareGastosPath = (items = []) => {
  return items.map((item) => ({
    ...item,
    id: item.id,
    path: `/dashboard/gastos/${item.name.toLowerCase()}/${item.id}`,
  }));
};
