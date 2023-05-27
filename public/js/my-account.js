const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const URL = 'https://eit-backend-final.onrender.com';
const token = localStorage.getItem('token');
const orderContainer = document.getElementById('orders-container');
const userForm = document.getElementById('my-account-form');


async function cargarOrdenes(){
    try {
        
        const respuesta = await axios.get(`${URL}/orders/${currentUser._id}/user`)
        const orders = respuesta.data.Ordenes;
        renderizarTabla(orders)
        
    } catch (error) {
        console.log(error)
    }
}

function renderizarTabla(orders){  
    
    orderContainer.innerHTML = '<h2 class="my-account__title-form">Mis Ordenes</h2>'
        if(orders.length === 0) { 
            orderContainer.innerHTML += `<article class="my-acoount-article"> 
                                        <div class = 'my-account-order-title'>
                                            NO SE ENCONTRARON Ordenes </div>
                                        </article>`;
            return;
        } 
       
    orders.forEach((order) => {
        let articleOrder = document.createElement("article")
        articleOrder.classList.add('my-acoount-article')
        let titleArticle = document.createElement("div");
        titleArticle = `
                    <div class = 'my-account-order-title'>   
                    <div class='my-account-order-title__date'>
                    Fecha: ${formatDateAR(order.updateAt)}
                    </div >
                    <div class='my-account-order-title__status'>
                    Estado: ${order.status}   
                    </div >
                    </div>
                    `;
        
        articleOrder.innerHTML += titleArticle; 
        
        order.products.forEach((producto)=>{
        let imageSrc = producto.productId.image ? `${URL}/upload/product/${producto.productId.image}` : '/assets/images/no-product.png';
        let tableRow = document.createElement("div");
        tableRow = `
        <div class = 'my-account-order'>
        <div >
        <img class= "my-account-order__img" src="${imageSrc}" alt="${producto.productId.name}">
        </div>
        <div class = 'my-account-order__name'>${producto.productId.name}</div>
        <div class = 'my-account-order__desc'>
        <p class = 'my-account-order__desc-p'>${producto.productId.description} </p>
        </div>   
        <div class = 'my-account-order__quantity'>Cant: ${producto.quantity}</div>
        <div class = 'my-account-order__price'>$${producto.price}</div>
        </div>
` 
        articleOrder.innerHTML += tableRow; 
        })

        let buttonArticle = document.createElement("div");
        buttonArticle = `
         <div class = 'my-account-order-button'>   
         <div class='my-account-order-button__total'>
         Total: $ ${order.total}
         </div >
         </div>
        `;
        
        articleOrder.innerHTML += buttonArticle;

        orderContainer.appendChild(articleOrder);
    })

}

async function cargarDatosUsuario(){
    try {
        response = await axios.get(`${URL}/users/${currentUser._id}`,{
                headers: {Authorization: token} });
 
        const user = response.data.user;
        const el = userForm.elements;
        
        el.fullName.value = user.fullName;
        el.email.value = user.email;
        el.date.value = formatDate(user.date);
        el.country.value = user.country;
        el.gender.value = user.gender;
        const role = document.getElementById('role')
        role.innerText = user.role; 
    
    } catch (error) {
        console.log(error) 
    }
   

}

cargarDatosUsuario()
cargarOrdenes()

async function editUser(evt){
    try {
        evt.preventDefault();
        //tomar los datos y amar el objeto usuario
        const el = evt.target.elements;
        const use = {
            fullName: el.fullName.value,
            email: el.email.value,
            date: el.date.value,
            country: el.country.value,
            gender: el.gender.value,
            role: currentUser.role
        }

        const response = await axios.put(`${URL}/users/${currentUser._id}`,use,{
                        headers: {Authorization: token} });  
        
        showAlert('Los datos se actualizaron correctamente','exito');
        
    } catch (error) {
        console.log(error)
        showAlert('No se pudieron actualizar los datos','error');
    }
    cargarDatosUsuario()
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
  
  //formatea la fecha devuelta por mondo db
  function formatDate(fechaMongoDB){
    // Obtener los componentes de la fecha
    var dia = fechaMongoDB.substring(8,10);
    // Los meses comienzan en 0, por lo que se suma 1
    var mes = fechaMongoDB.substring(5,7); 
    var anio = fechaMongoDB.substring(0,4);
    // Formatear la fecha y la retorno
    return fechaFormateada = anio + "-" + mes + "-" + dia;
  }

