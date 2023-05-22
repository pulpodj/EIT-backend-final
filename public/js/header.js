const signIn = document.getElementById('sign-in');
const nameUser = document.getElementById('user-navbar__name-user');
const adminUserLi = document.getElementById('user-navbar__admin-user');
const adminProductLi = document.getElementById('user-navbar__admin-product');
const adminMyAccountLi =  document.getElementById('user-navbar__my-account');
const changePassLi =  document.getElementById('user-navbar__change-pass');
const cartCount = document.getElementById('cart-count');
const linkRegister = document.getElementById('navbar-nav-register')
const linkAbout = document.getElementById('navbar-nav-about')

let Order = JSON.parse(localStorage.getItem('order')) || [];


function renderHeaderLinks(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(currentUser){
    const name = currentUser.fullName.split(" ");
    nameUser.innerHTML = `<label class="user-navbar__name-user">${name[0]}</label>`;
    signIn.innerHTML = `<a href="/index" onclick="logout()"  class="user-navbar__logout">Logout</a>`
    
    if(currentUser.role === 'ADMIN_ROLE'){
        adminUserLi.style.display = 'block';
        adminProductLi.style.display = 'block';
    }else{
        adminUserLi.style.display = 'none';
        adminProductLi.style.display = 'none';
    }
    adminMyAccountLi.style.display = 'block';
    changePassLi.style.display = 'block';
    linkRegister.style.display = 'none';
    linkAbout.style.borderBottom = 'none';

    }
    else {
        adminUserLi.style.display = 'none';
        adminProductLi.style.display = 'none';
        adminMyAccountLi.style.display = 'none';
        changePassLi.style.display = 'none';
        linkRegister.style.display = 'block';
        
    }


}

function logout(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')
    renderHeaderLinks();
    
}

renderHeaderLinks();

//Para el menu de hamburguesa
const menuBtn = document.getElementById('navbar-menu-btn');
const menuContainer = document.getElementById('navbar-nav-links-container')
const menuLabel = document.getElementById('navbar-menu-icon');


menuBtn.addEventListener('click', () => {
    menuContainer.classList.toggle('open');
    menuLabel.classList.toggle('open');
  
    if (menuLabel.classList.contains('open')){
        menuLabel.innerHTML ='<i class="fa-solid fa-xmark"></i>'
    }else{
        menuLabel.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    

})

// Funciones para el Submenu del Avatar
const userAvatar = document.getElementById('user-navbar-user-avatar-container');
const menuUser = document.getElementById('user-navbar-nav-links-container');

userAvatar.addEventListener('mouseover', (evt) => {
             menuUser.style.height = 'auto';
})
menuUser.addEventListener('mouseover', (evt) => {
    menuUser.style.height = 'auto';
})

menuUser.addEventListener('mouseout', (evt) => {
    menuUser.style.height = '0';
})


function contarProductos(){
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    let cantidad = 0;
    Order.forEach((prod) => {
        cantidad += prod.cant; 
    })
    cartCount.innerText = cantidad;
}

contarProductos();