
const paginationReturn = (listCount,list,page,nextLink)=>{
    return {
        pages : listCount,
        list: list,
        next : page<listCount ? nextLink : ""
    }
}

const checkPaginationAttribut = (start,end)=>{
    return ((start === null || end === null) || (start > end) || start < 0);

}

export const paginationUtil = {
    paginationReturn,
    checkPaginationAttribut
}
