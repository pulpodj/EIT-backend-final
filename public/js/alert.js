function showAlert(text, type){
    //vamos hacer nuestro pripio alert 

    const alertDialog = document.createElement('div');
    alertDialog.classList.add('alert-dialog');
    
    let icono = "";
    let clase = "";
    switch (type) {
      case "exito":
        icono = "fa-solid fa-square-check";
        clase = "alert-dialog__exito";
        break;
      case "advertencia":
        icono = "fa-solid fa-triangle-exclamation";
        clase = "alert-dialog__advertencia";
        break;
      case "error":
        icono = "fa-solid fa-square-xmark";
        clase = "alert-dialog__error";
        break;
      default:
        icono = "fa-solid fa-circle-info";
        clase = "alert-dialog__info";
    }

    alertDialog.classList.add(clase);
    let html = `<span class='${icono}'></span>  `;
    html += "<span class='mensaje'>" + text + "</span>";
    // html += "<button type='button' class='cerrar' onclick='this.parentElement.style.display=\"none\";'><span class='fa fa-times'></span></button>";
    

    //alertDialog.innerText = text;
    alertDialog.innerHTML = html;

    document.querySelector('body').appendChild(alertDialog);
    //demora la aparicion
    setTimeout(()=> alertDialog.classList.add('show'),10)

    setTimeout(()=>{
        alertDialog.classList.remove('show')
        //demora se borrado
        setTimeout(()=>  alertDialog.remove(),10)
         
    },3000);
}

//funcion para preguntar por Si o No
function showQuestion(text){

    return new Promise(function(resolve,reject){
        //vamos hacer nuestro pripio question 
        const alertQuestion = document.createElement('div');
        alertQuestion.classList.add('alert-question');

        html = `<span class='mensaje'>${text}</span><br>
                  <button class='alert-question__btn'
                  id='alert-question-btn-si'>Si</button>
                  <button class='alert-question__btn'
                  id='alert-question-btn-no'>No</button>`;


        //alertDialog.innerText = text;
        alertQuestion.innerHTML = html;

        document.querySelector('body').appendChild(alertQuestion);
        //demora la aparicion
        alertQuestion.classList.add('show')

        const btnSi = document.getElementById('alert-question-btn-si');
        const btnNo = document.getElementById('alert-question-btn-no');

        btnSi.onclick = ()=>{
          alertQuestion.classList.remove('show')
          alertQuestion.remove()
          resolve(true)
        }
        btnNo.onclick = ()=>{
          alertQuestion.classList.remove('show')
          alertQuestion.remove()
          resolve(false)
        }

    });

}