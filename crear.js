const añadirCard = card => {
    const cards = localStorage.getItem('cards') || []
    cards.push(card)
    localStorage.setItem('cards', JSON.stringify(cards))
}

function function1() {
    document.getElementById('input-pov').click()
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

var agentes = {}

const fechaHoy = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
document.getElementById('fecha-hoy').innerHTML = fechaHoy

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

document.getElementById('form-crear').addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formObject = Object.fromEntries(formData.entries())

    localStorage.setItem('form', JSON.stringify(formObject))
    let titulo = formData.get('title')
})

document.getElementById('agente').addEventListener('change', event => {
    console.log('agente', event.target.value)
    const inputHabilidad = document.getElementById('habilidad')
    inputHabilidad.disabled = !event.target.value
    if (!event.target.value) inputHabilidad.value = ""
})