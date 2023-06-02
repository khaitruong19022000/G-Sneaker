window.onload = function() {

    let storage = localStorage.getItem('cart')

    if (storage) {
        cart = JSON.parse(storage)
    }

    showCart(cart)

}

let cart = []
const addCart = async (id, name, avatar, price, color) => {

        let storage = localStorage.getItem('cart')

        if (storage) {
            cart = JSON.parse(storage)
        }
    
        let product = {
            product: {id, name, avatar, price, color},
            quantity: 1
        }
    
        let item = cart.find(c => c.product.id == id)

        if (item) {
            item.quantity += 1
        } else {
            cart.push(product)
        }

        localStorage.setItem('cart', JSON.stringify(cart))

        showCart(cart)
}

const reduceItem = (id) => {

    let storage = localStorage.getItem('cart')

    if (storage) {
        cart = JSON.parse(storage)
    }

    let item = cart.find(c => c.product.id == id)
    if (item) {
        if(item.quantity <= 1) removeItem(id)
        else item.quantity -= 1
    } else {
        document.getElementById(`${id}`).getElementsByTagName('button')[0].style.display ='';
        document.getElementById(`${id}`).getElementsByTagName('button')[1].style.display ='none';
        removeItem(id)
    }


    localStorage.setItem('cart', JSON.stringify(cart))

    showCart(cart)
}

const removeItem = (id) => {
    let storage = localStorage.getItem('cart')

    if (storage) {
        cart = JSON.parse(storage)
    }

    cart = cart.filter(item => item.product.id !== id)

    localStorage.setItem('cart', JSON.stringify(cart))

    document.getElementById(`${id}`).getElementsByTagName('button')[0].style.display ='';
    document.getElementById(`${id}`).getElementsByTagName('button')[1].style.display ='none';

    showCart(cart)

}

const showCart = (shoppingCart) => {

    let totalCart = 0
    let cartBody = document.getElementById('top-add-cart')
    cartBody.innerHTML = ''

    if (shoppingCart.length === 0) {
        cartBody.innerHTML += `Your card is empty`
    }

    shoppingCart.map(item => {

        document.getElementById(`${item.product.id}`).getElementsByTagName('button')[0].style.display ='none';
        document.getElementById(`${item.product.id}`).getElementsByTagName('button')[1].style.display ='';

        totalCart += item.product.price * item.quantity
        cartBody.innerHTML += `<div class="cart-item">
                                    <div class="left">
                                        <div class="img-ctn" style="background-color: ${item.product.color};">
                                            <img src="${item.product.avatar}"
                                                alt="product-image">
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="name">${item.product.name}</div>
                                        <div class="price">$${item.product.price}</div>
                                        <div class="button-group">
                                            <div class="count">
                                                <div class="decrease count-btn" onclick="reduceItem('${item.product.id}')">-</div>
                                                <div class="quantity">${item.quantity}</div>
                                                <div class="increase count-btn" onclick="addCart('${item.product.id}', '${item.product.name}', '${item.product.avatar}', '${item.product.price}', '${item.product.color}')">+</div>
                                            </div>
                                            <div class="remove-btn">
                                                <img src="./assets/trash.png" alt="remove button" onclick="removeItem('${item.product.id}')">
                                            </div>
                                        </div>
                                    </div>
                                </div>`
    })

    let cartTotal = document.getElementById('totalCart')
    let roundedcartTotal = totalCart.toFixed(2)
    cartTotal.innerHTML = `$${roundedcartTotal}`

}
