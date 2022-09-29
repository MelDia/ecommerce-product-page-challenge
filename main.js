// SLIDER DE IMAGENES 
let next = document.querySelector('.gallery-next');
let prev = document.querySelector('.gallery-prev');
let imgContainer = document.querySelector('.gallery-img-container');
let imgIndex = 0;

next.addEventListener('click', () => {
    changeNextImg(imgContainer);
})

prev.addEventListener('click', () => {
    changePrevImg(imgContainer);
})

function changeNextImg(imgContainer) {
    if (imgIndex == 3) {
        imgIndex = 0;
    } else {
        imgIndex++;
    }

    imgContainer.style.backgroundImage = `url(images/image-product-${imgIndex + 1}.jpg)`;
    eraseThumStyle(modalGalleryThumnails);
    modalGalleryThumnails[imgIndex].style.border = '2px solid hsl(26,100%,55%)';
}

function changePrevImg(imgContainer) {
    if (imgIndex == 0) {
        imgIndex = 3;
    } else {
        imgIndex--;
    }

    imgContainer.style.backgroundImage = `url(images/image-product-${imgIndex + 1}.jpg)`;
    eraseThumStyle(modalGalleryThumnails);
    modalGalleryThumnails[imgIndex].style.border = '2px solid hsl(26,100%,55%)';
}

// INPUT
let minus = document.querySelector('.input-minus');
let max = document.querySelector('.input-max');
let number = document.querySelector('.input-number');
let productCounter = 0;

minus.addEventListener('click', () => {
    productCounter--;
    number.value = productCounter;
});

max.addEventListener('click', () => {
    productCounter++;
    number.value = productCounter;
});

// AGREGAR AL CARRITO
let headerCartNotif = document.querySelector('.header-cart-notif');
let addToCart = document.querySelector('.details-btn')
let productCartNumber = 0;

addToCart.addEventListener('click', () => {
    productCartNumber = productCartNumber + parseInt(number.value);
    headerCartNotif.innerText = productCartNumber;

    if (headerCartNotif.innerText == 0) {
        headerCartNotif.style.display = 'none'
    } else {
        headerCartNotif.style.display = 'block'

        let cartModalCheckoutContainer = document.querySelector('.cart-modal-checkout-container')

        cartModalCheckoutContainer.innerHTML = `
        <div class="cart-modal-details-container">
            <img class="cart-modal-img" src="images/image-product-1.jpg" alt="">
            <div>
                <p class="cart-modal-product">Autum Limited Edition...</p>
                <p class="cart-modal-price">$125 x 3 </p>
                
            </div>
            <img src="images/icon-delete.svg" alt="" class="cart-modal-delete">
        </div>
        <button class="cart-modal-checkout-btn">Checkout</button>
        `

        let priceMulti = document.querySelector('.cart-modal-price');
        priceMulti.innerHTML = `
        <p class="cart-modal-price">$125 x ${productCartNumber} </p>
        <span>Total $${productCartNumber * 125}</span>
        `

        deleteItems();
    }
})

// MOSTRAR MODAL CART => abrir y cerrar
let cart = document.querySelector('.header-cart');
let cartModal = document.querySelector('.cart-modal');
let cartModalCheckoutContainer = document.querySelector('.cart-modal-checkout-container')
headerCartNotif.innerHTML = 0;

cart.addEventListener('click', () => {
    if (cartModal.style.display == 'block') {
        cartModal.style.display = 'none'
    } else {
        if (headerCartNotif.innerHTML == 0) {
            cartModalCheckoutContainer.innerHTML = `
                <p class="cart-modal-empty">Your cart is empty.</p>
            `
        }

        cartModal.style.display = 'block'

        if (headerCartNotif.innerHTML !== '0') {
            deleteItems()
        }
    }
})

// // CERRAR CART HACIENDO CLICK FUERA DEL ICON
// function close() {
//     document.addEventListener('click', event => {
//         if(event.target.className != 'cart-modal') {
//             cartModal.style.display = 'none';
//         }
//     })
// }

// ELIMINAR ELEMENTO DEL CART
function deleteItems() {
    cartDeleteBtn = document.querySelector('.cart-modal-delete');
    cartDeleteBtn.addEventListener('click', event => {
        cartModalCheckoutContainer.innerHTML = `
            <p class="cart-modal-empty">Your cart is empty.</p>
        `
        headerCartNotif.style.display = 'none';
        productCartNumber = 0;
    })
}

// SIDEBAR
let menuBtn = document.querySelector('.header-menu');
let modalNavbar = document.querySelector('.sidebar-navbar');
let closeBtnSidebar = document.querySelector('.sidebar-close');
let sidebarBg = document.querySelector('.sidebar-bg');

closeBtnSidebar.addEventListener('click', () => {
    sidebarBg.style.display = 'none'
})

menuBtn.addEventListener('click', () => {
    modalNavbar.style.display = 'block';
    sidebarBg.style.display = 'block';
})

sidebarBg.addEventListener('click', () => {
    sidebarBg.style.display = 'none';
})

// ABRIR MODAL DE IMAGENES
let modalGallery = document.querySelector('.modal-gallery-bg');
let modalGalleryBg = document.querySelector('.modal-gallery-bg');
let modalGalleryImgContainer = document.querySelector('.modal-gallery-img-container');
let modalGalleryThumnails = document.querySelectorAll('.modal-gallery-thumnail');
modalGalleryThumnails = [...modalGalleryThumnails];
let modalGalleryPrev = document.querySelector('.modal-gallery-prev');
let modalGalleryNext = document.querySelector('.modal-gallery-next');
let modalGalleryClose = document.querySelector('.modal-gallery-close');


imgContainer.addEventListener('click', event => {
    if(event.target.className == 'gallery-img-container') {
        modalGallery.style.display = 'block'
    }
    modalGalleryThumnails[0].style.border = '2px solid hsl(26,100%,55%';
})

modalGalleryNext.addEventListener('click', () => {
    changeNextImg(modalGalleryImgContainer);
})

modalGalleryPrev.addEventListener('click', () => {
    changePrevImg(modalGalleryImgContainer);
})

modalGalleryThumnails.forEach(thum => {
    thum.addEventListener('click', event => {
        let id = event.target.id.slice(-1);
        changeImgById(id, modalGalleryImgContainer, modalGalleryThumnails)
    })
})

modalGalleryClose.addEventListener('click', () => {
    modalGallery.style.display = 'none'
})

modalGalleryBg.addEventListener('click', event => {
    if(event.target.className === 'modal-gallery-bg') {
        modalGallery.style.display = 'none';
    }
})

// CAMBIAR THUMNAILS
let galleryThum = document.querySelectorAll('.gallery-thumnail');
let galleryThums = document.querySelector('.gallery-thumnails');
let galleryImgContainer = document.querySelector('.gallery-img-container');

galleryThum = [...galleryThum];
galleryThum[0].style.border = '2px solid hsl(26,100%,55%';

galleryThum.forEach(thum => {
    thum.addEventListener('click', event => {
        let id = event.target.id.slice(-1);
        changeImgById(id, galleryImgContainer, galleryThum)
    })
})

// FUNCION CAMBIAR BY ID
function changeImgById(id, imgContainer, thumnailsContainer) {
    imgIndex = id-1;
    imgContainer.style.backgroundImage = `url(images/image-product-${imgIndex + 1}.jpg)`;
    eraseThumStyle(thumnailsContainer);
    thumnailsContainer[imgIndex].style.border = '2px solid hsl(26,100%,55%';
}

function eraseThumStyle(thumnails) {
    thumnails.forEach(thum => {
        thum.style.border = 'none'
    })
}