//dividir en secciones según el agente (con un boton de mostrar todo)
//objetivo: que queden todas las cards enumeradas y divididas por agente
//1. recorrer cards segun su agente
//2. agregarlas en el momento a un nuevo container para el agente
//filtros:
//el boton de basura tiene que vaciar los inputs
// si un input está vacío y haces submit, deberia estar como por default
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}
function uncapitalize(str) {
    return str.charAt(0).toLowerCase() + str.slice(1)
}
// JSON.stringify(dataEnJSON) --> Devuelve un string
// JSON.parse(string) --> Devuelve un JSON
//mis elementos:
const maxContainer = document.getElementById("maxContainer")
const inputDivision = document.getElementById('order-input-form-hb')
const inputAutor = document.getElementById('autor-input-form-hb')
const inputHabilidad = document.getElementById('habilidad-input-form-hb')
const inputAgente = document.getElementById('agente-input-form-hb')
const inputMapa = document.getElementById('mapa-input-form-hb')
const inputComp = document.getElementById('comp-input-form-hb')
const formHb = document.getElementById('form-hb')

resetHabilidad()
let allCards = []
let agentes = []
let mapas = []
let compMaps = []
let cardsActuales = []
fetch('data/mapas.json')
    .then(data => data.json())
    .then(data => {
        mapas = data

        mapas.forEach(mapa => {
            if (mapa.compPool) compMaps.push(mapa.nombre)
        })
        fetch('data/agentes.json')
            .then(data => data.json())
            .then(data => {
                agentes = data
                fetch('data/cards.json')
                    .then(data => data.json())
                    .then(data => {
                        var cards = data
                        let localData = []
                        for (let index = 0; index < localStorage.length; index++) {
                            let key = localStorage.key(index)
                            if (key.startsWith("form")) {
                                let formData = JSON.parse(localStorage.getItem(key)) || []
                                localData.push(formData)
                            }
                        }
                        allCards = [...cards, ...localData]
                        cardsActuales = allCards
                        generarOpcionesMapas(allCards, mapas)
                        generarOpcionesAgentes(allCards, agentes)
                        generarCards(cardsActuales, agentes, mapas)
                    })
            })

    })

function generarOpcionesAgentes(cards, agentes) {
    //que se genere opciones de agentes:
    agentes.forEach(agente => {
        if (allCards.some(card => card.agente === agente.nombre)) {
            var opcion = `<option value="${agente.nombre}">${capitalizeFirstLetter(agente.nombre)}</option>`
            inputAgente.innerHTML += opcion
        }
    })
}

function generarOpcionesMapas(cards, mapas) {
    //que se genere opciones de mapas:
    mapas.forEach(mapa => {
        if (cards.some(card => card.mapa === mapa.nombre)) {
            var opcion = `<option value="${mapa.nombre}">${capitalizeFirstLetter(mapa.nombre)}</option>`
            inputMapa.innerHTML += opcion
        }
    })
}

//💀💀💀:
inputAgente.addEventListener('change', event => {
    //esta funcion es el codigo menos modularizado, organizado, apropiado, eficiente, y decente que hice en mi vida. 
    //solo sé que funciona y mientras no afecte a lo responsive de mi página nunca voy a volver a entrar a ver qué sentido tiene esta función.
    const agenteSeleccionado = event.target.value
    const indice = agentes.findIndex(obj => obj.nombre === agenteSeleccionado)
    const agente = agentes[indice]
    inputHabilidad.innerHTML = ""
    inputHabilidad.insertAdjacentHTML('beforeend', '<option value="">Elige una habilidad</option>')
    if (allCards.some(card => card.habilidad === agente.habilidades.h1)) {
        let opcion1 = `<option value="${agente.habilidades.h1}">${capitalizeFirstLetter(agente.habilidades.h1)}</option>`
        inputHabilidad.insertAdjacentHTML('beforeend', opcion1)
    }
    if (allCards.some(card => card.habilidad === agente.habilidades.h2)) {
        let opcion2 = `<option value="${agente.habilidades.h2}">${capitalizeFirstLetter(agente.habilidades.h2)}</option>`
        inputHabilidad.insertAdjacentHTML('beforeend', opcion2)
    }
    if (allCards.some(card => card.habilidad === agente.habilidades.h3)) {
        let opcion3 = `<option value="${agente.habilidades.h3}">${capitalizeFirstLetter(agente.habilidades.h3)}</option>`
        inputHabilidad.insertAdjacentHTML('beforeend', opcion3)
    }
    if (allCards.some(card => card.habilidad === agente.habilidades.h5)) {
        let opcion4 = `<option value="${agente.habilidades.h4}">${capitalizeFirstLetter(agente.habilidades.h4)}</option>`
        inputHabilidad.insertAdjacentHTML('beforeend', opcion4)
    }
    if (agente.habilidades.h5) {
        if (allCards.some(card => card.habilidad === agente.habilidades.h1)) {
            let opcion5 = `<option value="${agente.habilidades.h5}">${capitalizeFirstLetter(agente.habilidades.h5)}</option>`
            inputHabilidad.insertAdjacentHTML('beforeend', opcion5)
        }
    }
})

inputAgente.addEventListener('change', event => {
    inputHabilidad.disabled = !event.target.value
    if (!event.target.value) inputHabilidad.value = ""
})
inputComp.addEventListener('change', event => {
    inputMapa.value = ""
    inputMapa.disabled = event.target.checked
})
function resetHabilidad() {
    inputHabilidad.value = ""
    inputHabilidad.disabled = true
}
function resetMapa() {
    inputMapa.value = ""
    inputMapa.disabled = false
}
function vaciarInput(autorBool) {
    if(autorBool) inputAutor.value = ""
    inputAgente.value = ""
    inputComp.checked = false
    resetHabilidad()
    resetMapa()
    aplicarFiltros()
}
inputMapa.addEventListener('change', event => {
    aplicarFiltros()
})
inputAgente.addEventListener('change', event => {
    aplicarFiltros()
})
inputHabilidad.addEventListener('change', event => {
    aplicarFiltros()
})
inputComp.addEventListener('change', event => {
    aplicarFiltros()
})
inputAutor.addEventListener('input', event => {
    aplicarFiltros()
})


function aplicarFiltros() {
    cardsActuales = allCards
    if (inputComp.checked) cardsActuales = cardsActuales.filter(card => compMaps.includes(card.mapa))
    else if (inputMapa.value) cardsActuales = cardsActuales.filter(card => card.mapa === inputMapa.value)
    if (inputAgente.value) cardsActuales = cardsActuales.filter(card => card.agente === inputAgente.value)
    if (inputHabilidad.value) cardsActuales = cardsActuales.filter(card => card.habilidad === inputHabilidad.value)
    if (inputAutor.value) cardsActuales = cardsActuales.filter(card => card.nombre.toLowerCase().includes(inputAutor.value.toLowerCase()))
    generarCards(cardsActuales, agentes, mapas) //a esto le vas a tener q pasar mapas dsps para lo de dividir
    if (cardsActuales.length === 0) maxContainer.innerHTML += `<div class="no-result">
    <h2 class="mapa-titulo" style="margin-bottom: 10px; color: #BD632F;">No se encontró ningún resultado :(</h2>
    <span class="borrar-filtros-text" onclick="vaciarInput(true)">Borrar condiciones de filtro</span>
    </div>`
}
// declaro división:
if(localStorage.getItem('division')) inputDivision.value = localStorage.getItem('division')
    else inputDivision.value = "agente"
inputDivision.addEventListener('change', event => {
    var division = event.target.value
    localStorage.setItem('division', division)
    generarCards(cardsActuales, agentes, mapas)
})
function generarCards(cards, agentes, mapas) {
    maxContainer.innerHTML = ""
    let division
    if(localStorage.getItem('division')) division = localStorage.getItem('division')
    else division = "agente"
    localStorage.getItem('division')
    if (division === "agente") {
        agentes.map(agente => {
            const agenteCards = cards.filter(card => card.agente === agente.nombre)
            if (agenteCards.length > 0) {
                maxContainer.innerHTML += `<h2 class="mapa-titulo">${capitalizeFirstLetter(agente.nombre)}</h2>
                <div class="card-container" id="${agente.nombre}-container"></div>`
                const agenteContainer = document.getElementById(`${agente.nombre}-container`)
                agenteCards.map((card, index) => {
                    let cardHtml = `<article class="card">
                                <p class="title">
                                    <span class="title-num">${index + 1}</span>
                                    <span class="title-text">${card.mapa.toUpperCase()}</span>
                                </p>
                                <img class="map" src="${card.mapSrc}">
                                <img class="pov" src="${card.povSrc}">
                                <span class="title-text-user">${card.titleText}</span>
                                <p class="desc">${card.desc}</p>
                               <div class="firma">
                                    <span class="autor">${card.nombre} •</span>
                                    <span class="fecha-card">${card.fecha}</span>
                               </div>
                            </article>`
                    agenteContainer.innerHTML += cardHtml
                })
            }
        })
    } else {
        if (division === "mapa") {
            mapas.map(mapa => {
                const mapaCards = cards.filter(card => card.mapa === mapa.nombre)
                if (mapaCards.length > 0) {
                    maxContainer.innerHTML += `<h2 class="mapa-titulo">${capitalizeFirstLetter(mapa.nombre)}</h2>
                <div class="card-container" id="${mapa.nombre}-container"></div>`
                    const mapaContainer = document.getElementById(`${mapa.nombre}-container`)
                    mapaCards.map((card, index) => {
                        let cardHtml = `<article class="card">
                                <p class="title">
                                    <span class="title-num">${index + 1}</span>
                                    <span class="title-text">${card.agente.toUpperCase()}</span>
                                </p>
                                <img class="map" src="${card.mapSrc}">
                                <img class="pov" src="${card.povSrc}">
                                <span class="title-text-user">${card.titleText}</span>
                                <p class="desc">${card.desc}</p>
                               <div class="firma">
                                    <span class="autor">${card.nombre} •</span>
                                    <span class="fecha-card">${card.fecha}</span>
                               </div>
                            </article>`
                        mapaContainer.innerHTML += cardHtml
                    })
                }
            })
        }
    }
}

formHb.addEventListener('submit', event => {
    event.preventDefault()
})