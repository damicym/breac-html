const añadirCard = card => {
    const cards = localStorage.getItem('cards') || []
    cards.push(card)
    localStorage.setItem('cards', JSON.stringify(cards))
}

function function1() {
    document.getElementById('input-pov').click()
}
// 
function function2() {
    document.getElementById('input-map').click()
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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

    const fechaHoy = new Date().toLocaleString('es-ES', opcionesfecha).replace(',', '')
    document.getElementById('fecha-hoy').innerHTML = fechaHoy
    console.log(fechaHoy)
}

mostrarFecha()

fetch('data/agentes.json')
    .then(data => data.json())
    .then(data => {
        agentes = data
        localStorage.setItem('test', JSON.stringify(agentes))
        // <option value="astra">Astra</option>
        agentes.map(agente => {
            let opcion = `<option value="${agente}">${capitalizeFirstLetter(agente)}</option>`
            document.getElementById('agente').innerHTML += opcion
        })
    })

// JSON.stringify(dataEnJSON) --> Devuelve un string
// JSON.parse(string) --> Devuelve un JSON

document.getElementById("input-pov").addEventListener('input', event => {
    const povPreview = document.getElementById('pov-preview')
    const povFileInput = event.target
    const povFile = povFileInput.files[0]
    if (povFile) {
        povPreview.style.display = 'inline-block'
        povPreview.style.border = "0px"
    }
    else {
        povPreview.src = "./images/pov-placeholder.png"
        povPreview.style.border = "3px solid #273E47"
        povPreview.style.borderRadius = "10px"
    }
    povPreview.src = URL.createObjectURL(povFile)
})
// 
document.getElementById("input-map").addEventListener('input', event => {
    console.log("document.getElementById")
    const mapPreview = document.getElementById('map-preview')
    const mapFileInput = event.target
    const mapFile = mapFileInput.files[0]
    if (mapFile) {
        mapPreview.style.display = 'inline-block'
        mapPreview.style.border= "3px solid rgb(216, 151, 60)";
    }
    else {
        mapPreview.src = "./images/map-placeholder.png"
        mapPreview.style.border = "3px solid #273E47"
        mapPreview.style.opacity= "1"
    }
    mapPreview.src = URL.createObjectURL(mapFile)
})

document.getElementById('form-crear').addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formObject = Object.fromEntries(formData.entries())
    //--
    const mapPreview = document.getElementById('map-preview')
    const mapFileInput = event.target
    const mapFile = mapFileInput.files[0]
    let img = document.getElementById("pov-preview")
    
    localStorage.setItem('form', JSON.stringify(formObject))
    let titulo = formData.get('title')
})


document.getElementById('agente').addEventListener('change', event => {
    console.log('agente', event.target.value)
    const inputHabilidad = document.getElementById('habilidad')
    inputHabilidad.disabled = !event.target.value
    if (!event.target.value) inputHabilidad.value = ""
})