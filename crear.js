//mis elementos:
const selectHabilidad = document.getElementById('habilidad')
const povPreview = document.getElementById('pov-preview')
const mapPreview = document.getElementById('map-preview')
const inputHabilidad = document.getElementById('habilidad')
const formCrear = document.getElementById('form-crear')


function function1() {
    document.getElementById('input-pov').click()
}

function function2() {
    document.getElementById('input-map').click()
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

var agentes = {}

const mostrarFecha = () => {
    const opcionesfecha = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }

    const fechaHoy = new Date().toLocaleString('es-ES', opcionesfecha).replace(',', ' •')
    document.getElementById('fecha-hoy').innerHTML = fechaHoy

}

mostrarFecha()
setInterval(mostrarFecha, 60000)

fetch('data/agentes.json')
    .then(data => data.json())
    .then(data => {
        agentes = data

        agentes.map(agente => {
            let opcion = `<option value="${agente.nombre}">${capitalizeFirstLetter(agente.nombre)}</option>`
            document.getElementById('agente').innerHTML += opcion
        })
    })


function uncapitalize(str) {
    return str.charAt(0).toLowerCase() + str.slice(1)

}

document.getElementById('agente').addEventListener('change', event => {
    const agenteSeleccionado = event.target.value
    const indice = agentes.findIndex(obj => obj.nombre === agenteSeleccionado)
    const agente = agentes[indice]


    selectHabilidad.innerHTML = ""

    selectHabilidad.insertAdjacentHTML('beforeend', '<option value="">Elige una habilidad</option>')
    let opcion1 = `<option value="${agente.habilidades.h1}">${capitalizeFirstLetter(agente.habilidades.h1)}</option>`
    selectHabilidad.insertAdjacentHTML('beforeend', opcion1)

    let opcion2 = `<option value="${agente.habilidades.h2}">${capitalizeFirstLetter(agente.habilidades.h2)}</option>`
    selectHabilidad.insertAdjacentHTML('beforeend', opcion2)

    let opcion3 = `<option value="${agente.habilidades.h3}">${capitalizeFirstLetter(agente.habilidades.h3)}</option>`
    selectHabilidad.insertAdjacentHTML('beforeend', opcion3)

    let opcion4 = `<option value="${agente.habilidades.h4}">${capitalizeFirstLetter(agente.habilidades.h4)}</option>`
    selectHabilidad.insertAdjacentHTML('beforeend', opcion4)

    if (agente.habilidades.h5) {
        let opcion5 = `<option value="${agente.habilidades.h5}">${capitalizeFirstLetter(agente.habilidades.h5)}</option>`
        selectHabilidad.insertAdjacentHTML('beforeend', opcion5)
    }
})


document.getElementById("input-pov").addEventListener('input', event => {

    const povFileInput = event.target
    const povFile = povFileInput.files[0]
    if (povFile) {
        povPreview.style.display = 'inline-block'
        povPreview.style.border = "0px"
    }
    else {
        povPreview.src = "./images/pov-placeholder.png"
        povPreview.style.border = "10px solid #273E47"
        povPreview.style.borderRadius = "10px"
    }
    povPreview.src = URL.createObjectURL(povFile)
})

document.getElementById("input-map").addEventListener('input', event => {

    const mapFileInput = event.target
    const mapFile = mapFileInput.files[0]
    if (mapFile) {
        mapPreview.style.display = 'inline-block'
        mapPreview.style.border = "3px solid rgb(216, 151, 60)"
    }
    else {
        mapPreview.src = "./images/map-placeholder.png"
        mapPreview.style.border = "3px solid #D8973C"
        mapPreview.style.opacity = "1"
    }
    mapPreview.src = URL.createObjectURL(mapFile)
})

document.getElementById('agente').addEventListener('change', event => {

    inputHabilidad.disabled = !event.target.value
    if (!event.target.value) inputHabilidad.value = ""
})
function resetPreviewPov() {

    povPreview.src = "./images/pov-placeholder.png"
    povPreview.style.border = "10px solid #273E47"
    povPreview.style.borderRadius = "10px"
}
function resetPreviewMap() {

    mapPreview.src = "./images/map-placeholder.png"
    mapPreview.style.border = "3px solid #D8973C"
    mapPreview.style.opacity = "1"
}
function resetHabilidad() {
    inputHabilidad.disabled = true
    inputHabilidad.value = ""
}
function vaciarInput(array) {
    formCrear.reset()
    resetPreviewPov()
    resetPreviewMap()
    resetHabilidad()
}


formCrear.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formObject = Object.fromEntries(formData.entries())

    const opcionesfecha = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const fechaHoy = new Date().toLocaleString('es-ES', opcionesfecha).replace(',', ' •')

    formObject.fecha = fechaHoy
    if(formObject.povSrc){
        let reader = new FileReader();
        reader.readAsDataURL(formObject.povSrc)
        reader.onload = () => {
            formObject.povSrc = reader.result
            //localStorage.setItem('form', JSON.stringify(formObject)) //se hace dsps del reader.result
        }
    }
    if(formObject.mapSrc){
        let reader = new FileReader();
        reader.readAsDataURL(formObject.mapSrc)
        reader.onload = () => {
            formObject.mapSrc = reader.result
           // localStorage.setItem('form', JSON.stringify(formObject))
        } 
        
    }
    const keysArray = [...formData.keys()]
    vaciarInput(keysArray)

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
    //si no tengo nada, ageragr 1 form
    //si ya tengo uno, cambiar 'form' a 'form1'
    const storageLength = localStorage.length
    localStorage.setItem(`form${storageLength +  1}`, JSON.stringify(formObject))
})

