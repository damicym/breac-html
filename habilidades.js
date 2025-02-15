//dividir en secciones según el agente (con un boton de mostrar todo)


//mis elementos:
// const breachContainer = document.getElementById("breach-container")
// const cypherContainer = document.getElementById("cypher-container")

//objetivo: que queden todas las cards enumeradas y divididas por agente
//1. recorrer cards segun su agente
//2. agregarlas en el momento a un nuevo container para el agente
const maxContainer = document.getElementById("maxContainer")


fetch('data/agentes.json')
    .then(data => data.json())
    .then(data => {
        agentes = data
        fetch('data/cards.json')
            .then(data => data.json())
            .then(data => {
                cards = data
                agentes.map(agente => {
                    const agenteCards = cards.filter(card => card.agente === agente.nombre)
                    if (agenteCards.length > 0) {
                        maxContainer.innerHTML += `<h2 class="mapa-titulo">${capitalizeFirstLetter(agente.nombre)}</h2>
                            <div class="card-container" id="${agente.nombre}-container"></div>`
                        const agenteContainer = document.getElementById("${agente.nombre}-container")
                        agenteCards.map(card => {
                            let cardHtml = `<article class="card">
                                            <p class="title">
                                                <span class="title-num">${num}</span>
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
                            num++
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