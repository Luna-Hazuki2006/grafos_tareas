let NODOS = []
let MATRIZ = []

let tabla = document.getElementById('matriz')
let lista = document.getElementById('lista')
let nodear = document.getElementById('nodear')
nodear.addEventListener('submit', (evento) => {
    evento.preventDefault()
    let info = new FormData(nodear)
    let dato = info.get('dato').replace(' ', '')
    if (!NODOS.includes(dato)) {
        NODOS.push(dato)
        let li = document.createElement('li')
        let span = document.createElement('span')
        span.innerText = dato
        li.appendChild(span)
        let button = document.createElement('button')
        button.innerText = '❌'
        button.addEventListener('click', () => {
            let indice = NODOS.indexOf(dato)
            NODOS.splice(indice, 1)
            quitar_matriz(indice)
            button.parentElement.remove()
        })
        li.appendChild(button)
        lista.appendChild(li)
        nodear.reset()
        agregar_matriz()
    }
})

function agregar_matriz() {
    if (NODOS.length == 1) {
        MATRIZ = [[0]]
    } else {
        for (const esto of MATRIZ) {
            esto.push(0)
        }
        MATRIZ.push([])
        for (const esto of MATRIZ) {
            MATRIZ[MATRIZ.length - 1].push(0)
        }
    }
    console.log(MATRIZ);
    modificar_matriz()
}

function quitar_matriz(indice) {
    MATRIZ.splice(indice, 1)
    for (const esto of MATRIZ) {
        esto.splice(indice, 1)
    }
    modificar_matriz()
}

function escribir() {
    let texto = ''
    for (const esto of NODOS) {
        console.log(esto);
        let fila = MATRIZ[NODOS.indexOf(esto)]
        console.log(fila);
        let columnas = []
        MATRIZ.forEach((individuo, i) => {
            columnas.push.apply(columnas, individuo.filter((cada, j) => j == NODOS.indexOf(esto)))
        })
        if (!isNaN(fila.find((valor) => valor != 0)) || !isNaN(columnas.find((valor) => valor != 0))) {
            texto += `${esto}: `
            for (let i = 0; i < fila.length; i++) {
                const dato = fila[i];
                if (dato != 0) {
                    texto += `con ${NODOS[i]} (${dato}); `
                }
            }
            for (let i = 0; i < columnas.length; i++) {
                const dato = columnas[i];
                if (dato != 0) {
                    texto += `con ${NODOS[i]} (${dato}); `
                }
            }
            texto += '\n'
        }
        console.log(columnas);
    }
    document.getElementById('relaciones').innerText = texto
}

function modificar_matriz() {
    tabla.innerHTML = ''
    let tr = document.createElement('tr')
    let th = document.createElement('th')
    tr.appendChild(th)
    for (const esto of NODOS) {
        th = document.createElement('th')
        th.innerText = esto
        tr.appendChild(th)
    }
    tabla.appendChild(tr)
    for (let i = 0; i < NODOS.length; i++) {
        tr = document.createElement('tr')
        th = document.createElement('th')
        th.innerText = NODOS[i]
        tr.appendChild(th)
        for (let j = 0; j < NODOS.length ; j++) {
            let td = document.createElement('th')
            let input = document.createElement('input')
            input.type = 'number'
            input.id = `${i}-${j}`
            input.name = `${i}-${j}`
            input.value = MATRIZ[i][j]
            if (i >= j) input.disabled = 'disabled'
            input.addEventListener('change', () => {
                document.getElementById(`${j}-${i}`).value = input.value
                MATRIZ[i][j] = Number(input.value)
                // console.log(MATRIZ);
                escribir()
            })
            td.appendChild(input)
            tr.appendChild(td)
        }
        tabla.appendChild(tr)
    }
}