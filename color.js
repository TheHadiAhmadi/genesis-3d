import * as THREE from 'three'

export function setupColors(colors, parent, store) {
    console.log(colors, parent)

    function setColor(color) {
        parent.style.backgroundColor = color
        store.setBgColor(color)
        store.setCarColor(color)
    }
    store.setColor = setColor

    let firstRun = true
    
    colors.forEach(colorEl => {
        console.log('color', colorEl)
        colorEl.querySelectorAll('[data-value]').forEach(colorItemEl => {
            colorItemEl.addEventListener('click', (e) => {
                const color = colorItemEl.dataset.value

                setColor(color)
            })
        })
    })
}
