const userAdminLS = JSON.parse(localStorage.getItem('currentUser'));


if(!userAdminLS || userAdminLS.role !== 'ADMIN_ROLE'){
    //Sacar o redireccionar al usuario
    window.location.href = '/'
}