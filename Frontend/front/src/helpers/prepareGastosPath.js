export const prepareGastosPath = (items = []) => {

    return items.map(
        (item) => ({
            ...item,
            id: item.id,
            path: `/dashboard/gastos/${item.nombre.toLowerCase()}/${item.id}`
        })
    );
}