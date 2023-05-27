const cardContainer = document.getElementById('#card-container');
const btnCloseCategory = document.getElementById("category-btn-close");
let Products = [];
const URL = 'https://eit-backend-final.onrender.com';


async function cargarProductos(){
    try {
        const respuesta = await axios.get(`${URL}/products`)
        Products = respuesta.data.productos
        renderizarProductos(Products)
        
    } catch (error) {
        console.log(error)
    }
}

function renderizarProductos(products){

    cardContainer.innerHTML = ``;

    products.forEach((product,index )=> {
        
    const card = document.createElement('article');
    card.classList.add('card');

    card.innerHTML = `<div class="card__header">
        <img src="/upload/product/${product.image}" alt="${product.name}" class="card__image">
    </div>
    <div class="card__body">
        <div class="card__title">
        ${product.name}
        </div>
        <p class="card__description">
        ${product.description}    
        </p>
        <div class="card__date-price">
            <div class="card__date">
                ${formatDateAR(product.updateAt)}
            </div>
            <div class="card__price">
                $ ${product.price}
            </div>
        </div>
    </div>
    <div class="card__footer">
        <div class="card__btn-container">
            <a href="/product-detail?id=${product._id}" class="card__btn-detail" >
            Detalle
            </a>
        </div>  
        <div class="card__btn-container">
            <button onclick="agregarOrden('${product._id}')" class="card__btn" >
                Agregar
            </button>
        </div>
    </div>`


    cardContainer.appendChild(card);

    });

}

cargarProductos();

// funcion para los botones de eleccion de categoria
function elegirCategoria(category){
    const cartCategory = document.getElementById('cards__category');
    const divCategory = document.getElementById(category);
    const divCatAll = document.querySelectorAll('.section-cards-title')
    let text;

    switch (category) {
        case "Hacienda":
            text = 'Categoria: Consig. Hacienda';
            break;
        case "Nutricion Animal":
            text = 'Categoria: Nutrición Animal';
            break;
        case "Acopio":
            text = 'Categoria: Acopio de Granos';
            break;
        case "Agroinsumos":
            text = 'Categoria: Agroinsumos';
            break;
        case "Semillero":
            text = 'Categoria: Semillero';
            break;
        case "Ccombustibles":
            text = 'Categoria: Combustibles';
            break;  
        case "Seguros":
            text = 'Categoria: Seguros';
            break;  
        default:
            text = 'Categoria: Todos';
        }

        if(isSelectCategory(category)){
            text = 'Categoria: Todos';
            category = 'Todos'
        };
             
        divCatAll.forEach((div)=>{
            div.classList.remove('select');
        })
        
        if(category != 'Todos'){
            btnCloseCategory.style.display = 'block';
            divCategory.classList.toggle('select');
           }
        else
            btnCloseCategory.style.display = 'none';
        cartCategory.innerHTML = `${text}`;
        
        filtrarProductos(category);
       

}

function isSelectCategory(category){
    
    const divSelect = document.querySelectorAll('.select')
    if(divSelect.length > 0)
    
       return(divSelect[0].id == category)
       
    
}

btnCloseCategory.addEventListener('click',() => {
    elegirCategoria('Todos')

})

async function agregarOrden(id){
    try {
        const respuesta = await axios.get(`${URL}/products/${id}`);
        const product = respuesta.data.product;
    if (!product)
        return showAlert('No se encontro el producto','info')   
        
    const newOrder = {
        id: product._id,
        image: '/upload/product/' + product.image,
        name: product.name,
        price: product.price,
        cant: 1,
        total: product.price
        
    }
        
    const prod = Order.find((prod)=>{
        if(prod.name === product.name){
          prod.cant = parseInt(prod.cant) + 1 ;
          prod.total = prod.cant * parseInt(prod.price);
          return prod;
        }
      })
  
      if(!prod) {
        Order.push(newOrder);
      }

    //Guardarlo en el local storage
    sessionStorage.setItem('order',JSON.stringify( Order));

    //Alerta de Producto agregado
    showAlert('Producto agregado al carrito','exito')

    contarProductos();



    } catch (error) {
        console.log(error);
    }

    

}

//Funcion para filtrar las cards de productos
function filtrarProductos(category){
        let productsFiltrados = [];
    if(category === 'Todos'){
        productsFiltrados = Products;
    }else{
        productsFiltrados = Products.filter((producto) => {
            producto.category.name == category ? filtra = true : filtra = false;
            return filtra
             });
            }
renderizarProductos(productsFiltrados);

}

//Funcion los productos al presionar enter en el input de busqueda
function buscarProductosInput(evt){
    if (evt.keyCode !== 13) return;
    const text = evt.target.value.toLowerCase().trim();
    buscarProductos(text)
}

//Filtra los productos al precionar el boton buscar
function buscarProductosBtn(){
    const text =  document.getElementById('products-search').value;
    buscarProductos(text)
}

//Funcion para filtrar la table de Productos segun un texto pasado como parametro
function buscarProductos(text){
    const productsFiltrados = Products.filter((product) => {
            const filtra = product.name.toLowerCase().includes(text.toLowerCase())
            return filtra
             });

const cant = productsFiltrados.length;

document.getElementById('products-search-count').innerText = 'Se encontraron ' + cant + ' productos';

renderizarProductos(productsFiltrados);

}

//formatea la fecha devuelta por mondo db
function formatDateAR(fechaMongoDB){
   // Obtener los componentes de la fecha
  var dia = fechaMongoDB.substring(8,10);
  // Los meses comienzan en 0, por lo que se suma 1
  var mes = fechaMongoDB.substring(5,7); 
  var anio = fechaMongoDB.substring(0,4);
    // Formatear la fecha y la retorno
    return fechaFormateada = dia + "/" + mes + "/" + anio;
}



