import './styles/index.scss'

// add
function sum(a, b) {
    console.log(a, b, a + b)
    console.log('hello')
    return a + b
}

function max(a, b) {
    return a > b ? a : b
}

sum(1, 11)
sum(2, 4)
sum(3, 4)

document.querySelector('#app').innerHTML = sum(22, 0)

module.exports = {
    sum,
    max
}
