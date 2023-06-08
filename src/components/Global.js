export const validEmail = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')

export const sortData = (collection, type) => {
    if (type === 'Price Low to High') {
        collection.sort((a, b) => a.price - b.price)
    }
    if (type === 'Price High to Low') {
        collection.sort((a, b) => b.price - a.price)
    }
    if (type === 'Recommended') {
        collection.sort((a, b) => b.brand.localeCompare(a.brand))
    }
    if (type === 'New Arrival') {
        collection.sort((a, b) => a.releaseDate < b.releaseDate ? -1 : 1)
    }
    if (type === 'Top Rated') {
        collection.sort((a, b) => b.rating - a.rating)
    }
    return collection
}

export const generateRandomNumber = () => {
    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    return randomNumber;
}