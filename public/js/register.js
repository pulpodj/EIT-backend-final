// obtener formulario y guardarlo en una 
const registerForm = document.querySelector('#registerForm');
//obtener boton submit
const resgisterBtn = document.getElementById('registerSubmit');
const URL = 'https://eit-backend-final.onrender.com';

registerForm.addEventListener('submit', async (evt)=>{

    try {
        evt.preventDefault();
        //tomar los datos y amar el objeto usuario
        const el = evt.target.elements;
        if (el.password1.value !== el.password2.value) {
                console.warn('El password no coincide')
        }

        const use = {
            fullName: el.fullName.value,
            email: el.email.value,
            password: el.password1.value,
            date: el.fechaNac.value,
            country: el.country.value,
            gender: el.gender.value,
            role: 'USER_ROLE'
        }

        const response = await axios.post(`${URL}/users`,use);  
        Users = response.data.user; 
              

    showAlert('El usuario se registro correctamente','success');
    setTimeout(() => {
        window.location.href = "/login";
    }, 1500)
    } catch (error) {
        console.log(error)
    }
    
})




// Funciones con parámetros nombrados
function customFont({ color, size, weight }) {
    const divTexto = document.createElement('p');
    divTexto.innerText = 'Un texto a modificar'

    divTexto.style.color = color || '#DDF40A';
    divTexto.style.fontSize = size || '16px';
    divTexto.style.fontWeight = weight || 500;

    document.body.appendChild(divTexto);
}

customFont({ weight: 800 });