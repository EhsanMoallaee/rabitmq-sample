async function calculateTotalPrice(products) {
    if(products && products.length > 0) {
        const totalPrice =  products.reduce((acc, curr) => acc + curr.price, 0);
        return totalPrice
    }
}

module.exports = {
    calculateTotalPrice
}
