//1- Obtener los datos del Formulario
const loginForm = document.getElementById('loginForm');
const URL = 'http://localhost:13000'

loginForm.addEventListener('submit',async (event) => {
    event.preventDefault();

    const {email,password} = loginForm.elements;
    
    try {
        const dataBody = {
            email:email.value,
            password: password.value
        }
        const resp = await axios.post(`${URL}/login`,dataBody)

        const {token, user, msg} = resp.data;

        localStorage.setItem('token', token);
        localStorage.setItem('currentUser',JSON.stringify(user))

        showAlert(msg)
        setTimeout(() => {
                     window.location.href = "/index";
                 }, 1500)
    } catch (error) {
        console.log(error)
        showAlert('Error al hacel el Login','error')
    }
   
})

