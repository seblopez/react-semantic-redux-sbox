export const calculatePageRowIndexes = (entity, activePage, pageSize) => {
    if(!entity) { return { firstIndex: 0, lastIndex: 0 }; }

    const entityCount = entity.length;
    const lastPage = entityCount % pageSize > 0 ? Math.floor(entityCount / pageSize) + 1 : Math.floor(entityCount / pageSize);
    const lastPageIndex = activePage > lastPage ? (activePage - 1) * pageSize : activePage * pageSize;
    const firstPageIndex = lastPageIndex - pageSize;

    return { firstIndex: firstPageIndex, lastIndex: lastPageIndex };

}