export const prepareGastosPath = (items = []) => {

    return items.map(
        (item) => ({
            ...item,
            id: item.id,
            path: `/dashboard/categorias/${item.nombre.toLowerCase()}`
        })
    );
}