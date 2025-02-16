//dividir en secciones según el agente (con un boton de mostrar todo)

//mis elementos:
// const breachContainer = document.getElementById("breach-container")
// const cypherContainer = document.getElementById("cypher-container")

//objetivo: que queden todas las cards enumeradas y divididas por agente
//1. recorrer cards segun su agente
//2. agregarlas en el momento a un nuevo container para el agente

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

const maxContainer = document.getElementById("maxContainer")

// JSON.stringify(dataEnJSON) --> Devuelve un string
// JSON.parse(string) --> Devuelve un JSON


fetch('data/agentes.json')
    .then(data => data.json())
    .then(data => {
        agentes = data
        fetch('data/cards.json')
            .then(data => data.json())
            .then(data => {
                let localData = []
                for (let index = 0; index < localStorage.length; index++) {
                    let key = localStorage.key(index)
                    if (key.startsWith("form")) { 
                        let formData = JSON.parse(localStorage.getItem(key)) || []
                        localData.push(formData)
                    }
                }
                cards = [...data, ...localData]
                // cards = data + JSON.parse(localStorage.getItem('form'))
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
                                                <span class="title-text">${card.titleText}</span>
                                            </p>
                                            <img class="map" src="${card.mapSrc}">
                                            <img class="pov" src="${card.povSrc}">
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
            })
    })



// fetch('data/cards.json')
//     .then(data => data.json())
//     .then(data => {
//         cards = data

//         const breachCards = cards.filter(card => card.agente === "breach")
//         if (breachCards.length > 0) {
//             var num = 1
//             breachCards.map(card => {
//                 let cardHtml = `<article class="card">
//             <p class="title">
//                 <span class="title-num">${num}</span>
//                 <span class="title-text">${card.titleText}</span>
//             </p>
//             <img class="map" src="${card.mapSrc}">
//             <img class="pov" src="${card.povSrc}">
//             <p class="desc">${card.desc}</p>
//            <div class="firma">
//                 <span class="autor">${card.nombre} •</span>
//                 <span class="fecha-card">${card.fecha}</span>
//            </div>
//         </article>`
//                 breachContainer.innerHTML += cardHtml
//                 num++
//             })
//         }


//     })
// switch (card.agente) {
//     case "breach":
//         breachContainer.innerHTML += cardHtml
//         break
//     case "cypher":
//         cypherContainer.innerHTML += cardHtml
//         break
// }