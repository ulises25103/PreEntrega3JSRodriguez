function toggleSlideOver() {
    document.getElementById('slideover-container').classList.toggle('invisible');
    document.getElementById('slideover-bg').classList.toggle('opacity-0');
    document.getElementById('slideover-bg').classList.toggle('opacity-50');
    document.getElementById('slideover').classList.toggle('translate-x-full');
}

const botonCarrito = document.querySelector('.boton-carrito');
botonCarrito.addEventListener('click', toggleSlideOver);


function closeSlideOver() {
    const slideoverContainer = document.getElementById('slideover-container');
    const slideover = document.getElementById('slideover');
    
    slideoverContainer.classList.add('invisible');
    slideover.classList.add('translate-x-full');
}

const slideoverBg = document.getElementById('slideover-bg');
slideoverBg.addEventListener('click', closeSlideOver);

const btnCerrar = document.getElementById('btnCerrar');
btnCerrar.addEventListener('click', closeSlideOver);



function agregarAlCarrito(id, nombre, precio) {
    const cartItemsContainer = document.querySelector('.cart-items');

    // Crea un nuevo elemento para el carrito
    const item = document.createElement('div');

    // Agrega contenido al elemento del carrito
    item.innerHTML = `
    <div class="cart-item">
    <img src="../../public/${id}.avif" class="item-id" alt="${nombre}">
    <div class="item-details mb-2 flex flex-col items-start">
    <p class="item-id">${id}</p>
    <p class="item-name font-semibold text-gray-900 self-center">${nombre}</p>
    <p class="item-price text-gray-900 self-center">${precio}</p>
    <div class="mb-2 gap-2 m-3 flex items-center justify-center">
    <button class="btnEliminar px-4 p-2 bg-red-500 text-white text-xs">Eliminar</button>
    <button class="px-4 p-2 bg-blue-500 text-white text-xs">Comprar</button>
    </div>
    </div>
    </div>
    `;

    const deleteButton = item.querySelector('.btnEliminar');
    deleteButton.addEventListener('click', eliminarDelCarrito);

    // Agrega el elemento al contenedor del carrito
    cartItemsContainer.appendChild(item);


    actualizarAlmacenamientoLocal(); 

}

const agregarCarritoButtons = document.querySelectorAll('.agregar-btn');

agregarCarritoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const nombre = button.getAttribute('data-nombre');
        const precio = button.getAttribute('data-precio');
        agregarAlCarrito(id, nombre, precio);
    });
})


function actualizarAlmacenamientoLocal() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartData = [];

    cartItems.forEach(item => {
        const id = item.querySelector('.item-id').textContent;
        const nombre = item.querySelector('.item-name').textContent;
        const precio = item.querySelector('.item-price').textContent;
        cartData.push({ id, nombre, precio });
    });

    localStorage.setItem('cart', JSON.stringify(cartData));  
}

cargarElementosDelAlmacenamientoLocal();


function eliminarDelCarrito(event) {
const cartItem = event.target.closest('.cart-item');
if (cartItem) {
    cartItem.remove();
    actualizarAlmacenamientoLocal();
} 
}
const deleteButtons = document.querySelectorAll('.btnEliminar');
deleteButtons.forEach(button => {
    button.addEventListener('click', eliminarDelCarrito);
});



function cargarElementosDelAlmacenamientoLocal() {
    const cartData = JSON.parse(localStorage.getItem('cart'))
    if (cartData) {
        cartData.forEach(item => {
        agregarElementoDesdeAlmacenamiento(item.id, item.nombre, item.precio);
        }); 
    }
}

function agregarElementoDesdeAlmacenamiento(id, nombre, precio) {
    const cartItemsContainer = document.querySelector('.cart-items');


    // Crea un nuevo elemento para el carrito
    const item = document.createElement('div');

    // Agrega contenido al elemento del carrito
    item.innerHTML = `
    <div class="cart-item">
    <img src="../../public/${id}.avif" class="item-id" alt="${nombre}">
    <div class="item-details mb-2 flex flex-col items-start">
    <p class="item-id">${id}</p>
    <p class="item-name font-semibold text-gray-900 self-center">${nombre}</p>
    <p class="item-price text-gray-900 self-center">${precio}</p>
    <div class="mb-2 gap-2 m-3 flex items-center justify-center">
    <button class="btnEliminar px-4 p-2 bg-red-500 text-white text-xs">Eliminar</button>
    <button class="px-4 p-2 bg-blue-500 text-white text-xs">Comprar</button>
    </div>
    </div>
    </div>
    `;

    // Agrega el elemento al contenedor del carrito
    cartItemsContainer.appendChild(item);

    actualizarAlmacenamientoLocal(); 
}



const agregarAlCarritoBtn = document.querySelectorAll('.agregar-btn');

agregarAlCarritoBtn.forEach(btn => {
    btn.addEventListener('click', function() {
        btn.classList.add('bg-green-500');
        btn.classList.add('border-green-500');
        setTimeout(() => {
            btn.classList.remove('bg-green-500');
            btn.classList.remove('border-green-500');
        }, 500);
    });
});