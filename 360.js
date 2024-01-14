export function setup360(element) {
    const el = element.querySelector('#el_360')

    element.addEventListener('mousedown', () => {
        el.classList.add('opacity-0')
    })

    element.addEventListener('mouseup', () => {
        setTimeout(() => {
            el.classList.remove('opacity-0')
        }, 300)
    })
}

