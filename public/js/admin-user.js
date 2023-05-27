
//Tabla de Usuarios
const tableBody = document.getElementById('admin-user-table__body');
const submitBtn = document.getElementById('admin-user__submit-btn');
const userForm = document.getElementById('admin-user-form');
const passForm = document.querySelectorAll('.password-form');
let pass1Input = document.getElementById('password1'); 
let pass2Input = document.getElementById('password2'); 

let editIndex = undefined;

let Users = [];
const URL = 'https://eit-backend-final.onrender.com';


//Funcion para rellenar la tabla del Index 
async function cargarUsuarios(){
  try {
    const token = localStorage.getItem('token');
    response = await axios.get(`${URL}/users`,{
        headers: {
            Authorization: token
        }
    });  
    Users = response.data.user;
    cargarTabla(Users);
    
} catch (error) {
  console.log(error); 
}
}

function cargarTabla(users){    
    tableBody.innerHTML = ''
    if(users.length === 0) {
        tableBody.innerHTML = '<tr class="disable"> <td colspan = "6">NO SE ENCONTRARON PRODUCTOS </td></tr>';
        return;
    }
    users.forEach((user)=>{
        
       const tableRow = `
       <tr>
                <td class="admin-user__name">${user.fullName}</td>
                <td class="admin-user__lastName">${user.email}</td>
                <td class="admin-user__lastName">${formatDateAR(user.date)}</td>
                <td class="admin-user__name">${user.country}</td>
                <td class="admin-user__lastName">${user.gender}</td>
                <td class="admin-user__name">${user.role}</td>
                <td class = "admin-user__actions">
                <button class= "admin-user__action-btn" onclick= "deleteUser('${user._id}')" >
                <i class="fa-regular fa-trash-can"></i>
                </button>
                <button class= "admin-user__action-btn admin-user__btn-edit" data-indice="${user._id}" onclick= "editUser('${user._id}')" >
                <i class="fa-solid fa-pencil"></i>
                </button>
                </td>
            </tr>
       ` 
       tableBody.innerHTML += tableRow; 
    })
    
}

cargarUsuarios();

//Funcion para agregar un nuevo usuario a la tabla
async function addUser(evt){
    evt.preventDefault();
    const elements = evt.target.elements;

    let nombres = elements.fullName.value.trim().split(/\s+/);
    let nombresConvt = '';

    nombres.forEach((palabra)=>{
        nombresConvt += palabra[0].toUpperCase() + palabra.substring(1).toLowerCase() + ' ';
    })
    
    const newUser = {
        fullName: nombresConvt,
        email: elements.email.value,
        password: elements.password1.value,
        date: elements.date.value,
        country: elements.country.value,
        gender: elements.gender.value,
        role: elements.role.value
    }
    const token = localStorage.getItem('token');

    if (editIndex) {
      const response = await axios.put(`${URL}/users/${editIndex}`,newUser,{
        headers: { Authorization: token } }); 
        if(!response)
          showAlert('No se pudo modificar el Usuario','error')
        else{    
          showAlert('El usuario fue modificado','exito')
          passForm.forEach((form)=>{
            form.style.display = 'block';
          })
          pass1Input.required = true;
          pass2Input.required = true;
        }
    }else {
        const response = await axios.post(`${URL}/users`,newUser);  
        if(!response)
          showAlert('No se pudo agregar el Usuario','error')
        else      
          showAlert('El usuario se Agrego Correctamente','exito')
    }



editIndex = undefined;
submitBtn.classList.remove('edit-btn');
submitBtn.innerText = 'Cargar'

cargarUsuarios()
limpiarInput();

}

//Limpiar input
function limpiarInput(){
  const el = userForm.elements;
   
  el.fullName.value = '';
  el.email.value = '';
  el.password1.value = '';
  el.password2.value = ''; 
  el.date.value = '';
  el.country.value = 'AR';
  el.gender.value = 'otro';
  el.role.value = 'USER_ROLE';
 
}


//Funcion para borra un usuario seleccionado de la tabla
async function deleteUser(id){
 
  showQuestion('¿Esta seguro que desea borrar el Usuario seleccionado?')
  .then(async(result) => {
      try {
         if (result) {
          const token = localStorage.getItem('token');
            //borrar usuario
            response = await  axios.delete(`${URL}/users/${id}`,{
              headers: { Authorization: token } });             
            showAlert('El Usuario ha sido borrado.', 'exito');
            cargarUsuarios();
          }
      } catch (error) {
        showAlert('Error al querer borrar el usuario.', 'error');
        console.log(error);
      }
  })
}


//Edita un usuario Seleccionado
async function editUser(id){
  try {
    submitBtn.classList.add('admin-user__edit-btn');
    submitBtn.innerText = 'Modificar'

    const token = localStorage.getItem('token');
    response = await axios.get(`${URL}/users/${id}`,{
      headers: {
          Authorization: token
      }
    });  
   const user = response.data.user;

   const el = userForm.elements;
   
  editIndex = id;
  

  el.fullName.value = user.fullName;
  el.email.value = user.email;
  passForm.forEach((form)=>{
    form.style.display = 'none';
  })
  pass1Input.required = false;
  pass2Input.required = false;

  el.date.value = formatDate(user.date);
  el.country.value = user.country;
  el.gender.value = user.gender;
  el.role.value = user.role;

  } catch (error) {
    console.log(error)
  }
    
}


//Funcion para filtrar la table de usuario al presionar el boton filtrar
function metodoFilter(){
    const text =  document.getElementById('search').value; 
    buscarUsuarios(text);

}

//Funcion para filtrar la table de usuario al presionar enter en el input
function buscarUsuariosInput(evt){
  if (evt.keyCode !== 13) return;
  const text = evt.target.value.toLowerCase().trim();
  buscarUsuarios(text);
}


//Funcion de Busqueda de usuarios por un parametro texto 
function buscarUsuarios(text){

  const usersFiltrados = Users.filter((usuario) => {
          const filtra = usuario.fullName.toLowerCase().includes(text.toLowerCase())
          return filtra
          });

const cant = usersFiltrados.length;
document.getElementById('admin-user-search-container_cant').innerText = 'Cantidad de Coincidencias: ' + cant;

if(!cant){
  cargarTabla(Users);
  showAlert('No hubo coincidencias')
}else{            
  cargarTabla(usersFiltrados);
}
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