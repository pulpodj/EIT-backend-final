//1- Obtener los datos del Formulario
const passForm = document.getElementById('passForm');
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const token = localStorage.getItem('token');

const URL = 'http://localhost:13000'

passForm.addEventListener('submit',async (event) => {
    event.preventDefault();

    const {passOld,passNew1,passNew2} = passForm.elements;
    
    if (passNew1.value !== passNew2.value) {
       return showAlert('El nuevo password no coincide','advertencia');
    }
    
    try {
        const dataBody = {
            oldPassword: passOld.value,
            newPassword: passNew1.value
        }
        const resp = await axios.put(`${URL}/users/${currentUser._id}/password`,dataBody,{
            headers: {Authorization: token}}); 

        
        showAlert('La contraseña se Cambio Correctamente','exito')
        logout();
        setTimeout(() => {
            window.location.href = "/index";
        }, 1500)
        
    } catch (error) {
        showAlert('Error al querer cambiar la contraseña','error')
        console.log(error)
    }
   
})