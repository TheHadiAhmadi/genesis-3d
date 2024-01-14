import * as THREE from 'three'

export function setupColors(colors, parent, store) {
    console.log(colors, parent)

    function setColor(color, isMatte) {
        parent.style.backgroundColor = color
        store.setBgColor(color)
        store.setCarColor(color, isMatte)
    }
    store.setColor = setColor

    colors.forEach(colorEl => {
        console.log('color', colorEl)
        colorEl.querySelectorAll('[data-value]').forEach(colorItemEl => {
            colorItemEl.addEventListener('click', (e) => {
                const isMatte = colorItemEl.dataset.matte === 'true'
                const color = colorItemEl.dataset.value

                setColor(color, isMatte)
            })
        })
    })
}
