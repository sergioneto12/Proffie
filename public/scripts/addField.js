//procurar  o botão, quando encontrar 
document.querySelector('#add-time')
.addEventListener('click', cloneField)

//executar uma ação
function cloneField() {
    //duplicar os campos
    const newFieldscontainer = document.querySelector('.schedule-item').cloneNode(true) //clonenode duplica, e node se refere às tags html,e o true se refere ao conteúdo dentro da div
    //const fica para que o newFieldscontainer não possa ser mudado
    
    //limpar os campos
    const fields = newFieldscontainer.querySelectorAll('input')

    fields.forEach(function(field){
        //pegar o field do momento
        console.log(field)
        field.value = " "
    })

    //colocar a página
    document.querySelector('#schedule-items').appendChild(newFieldscontainer)
}   

