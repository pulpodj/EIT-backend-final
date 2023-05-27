//Guardo la orden del local storage en la variable Products
let Products = JSON.parse(sessionStorage.getItem('order')) || [];
const URL = 'https://eit-backend-final.onrender.com';

//Tabla de productos
const tableBody = document.getElementById('order-table_body');
const submitBtn = document.getElementById('admin-product__submit-btn');
const productForm = document.getElementById('admin-product-form');

let editIndex;

function renderizarTabla(){
  let totalOrden = 0;
    tableBody.innerHTML = ''
    if(Products.length === 0) {
        tableBody.innerHTML = '<tr class="disable"> <td coldspan = 6>NO SE ENCONTRARON PRODUCTOS </td></tr>';
        return;
    }
    
    Products.forEach((producto,index)=>{
        let imageSrc = '/assest/image/no-product.png';
       if(producto.image) 
            imageSrc  = producto.image;
       const tableRow = `
       <tr>
                <td><img class= "order__img" src="${imageSrc}" alt="${producto.name}" width="80px"></td>
                <td>${producto.name}</td>
                <td class="order__price">$ ${producto.price}</td>
                <td class="order__cant">
                <div class="order-cant-btn">
                <button class="order-cant-btn__decrement" onclick="decrement('${index}')"
                id="order-cant-btn__decrement" >-</button>
                <input class="order-cant-btn__input" id="order-cant-input${index}" type="text" 
                       value="${producto.cant}" onchange="updateTotal('${index}')">
                <button class="order-cant-btn__increment" onclick="increment('${index}')"
                id="order-cant-btn__increment">+</button>
                </div>
                </td>
                <td class="order__total">$ ${producto.total}
                <button class= "order__delete-btn" onclick= "deleteProduct(${index})" >
                <i class="fa-regular fa-trash-can"></i>
                </button></td>
                
                </td>
            </tr>
       ` 
       tableBody.innerHTML += tableRow; 
       totalOrden += producto.total;
    })
    const tableRow = `
        <tr>
                <td class="order-import-total" colspan = '4'>
                TOTAL
                </td>
                <td class="order-import-total">
                 $ ${totalOrden}
                </td>
        </tr>
       ` 
       tableBody.innerHTML += tableRow; 
}

renderizarTabla();


function deleteProduct(id){
    Products.splice(id,1)
    //Guardarlo en el local storage
    sessionStorage.setItem('order',JSON.stringify( Products));
    
    renderizarTabla();
    showAlert('Producto Eliminado de la Orden')
    contarProductos();

}

async function finalizarCompra(){
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(!currentUser){
    showAlert('Debe estar logueado para poder Finalizar la compra','info')
  } 
  else{
    if(Products.length === 0){
      showAlert('Debe seleccionar un producto para poder Finalizar la compra','info')
    }else{
      try {
      let totalOrden = 0;  
      const orden = {};
      const productos = [];
      Products.forEach((product) => {
        const producto = {
          productId: product.id,
          quantity: product.cant,
          price: product.price
        }
        totalOrden += product.total
        productos.push(producto)
      });
      
      orden.products = productos;
      orden.total = totalOrden;
      orden.userId = currentUser._id;
      orden.createdAt = Date.now;
      orden.status = 'onhold';
      orden.updateAt = Date.now;
      
      await axios.post(`${URL}/orders`,orden);
      
      sessionStorage.removeItem('order')
      Products = [];
      renderizarTabla();
      showAlert('Compra Finalizada','exito')
      contarProductos();
      } catch (error) {
        showAlert('No se pudo procesar la Orden','error');
        console.log(error);
      }



      
    }
    
  } 
  
}

function increment(id) {
    var input = document.getElementById(`order-cant-input${id}`)
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value + 1;
    updateTotal(id);
  }
  
  function decrement(id) {
    var input = document.getElementById(`order-cant-input${id}`)
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value - 1;
    if (input.value < 1) {
      input.value = 1;
    }
    updateTotal(id)
  }

  function updateTotal(id){

    const cantProd = document.getElementById(`order-cant-input${id}`); 
            
    Products[id].cant =  parseInt(cantProd.value);
    Products[id].total = Products[id].cant * parseInt(Products[id].price);
      
//Guardarlo en el local storage
sessionStorage.setItem('order',JSON.stringify( Products));
renderizarTabla();

contarProductos();

  }