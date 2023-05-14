export const validEmail = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')

export const sortData =(collection,type)=>{
    if (type === 'Price Low to High') {
        collection.sort((a, b) => a.price - b.price)
    }
    if (type === 'Price High to Low') {
        collection.sort((a, b) => b.price - a.price)
    }
    if (type === 'Recommended') {
        collection.sort((a, b) => b.brand.localeCompare(a.brand))
    }
    return collection
}