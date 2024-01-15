function show () {
    let timer;
    return () => {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            el.classList.remove('opacity-0')
        }, 2000)
    }
}
export function setup360(element) {
    const el = element.querySelector('#el_360')

    element.addEventListener('mousedown', () => {
        el.classList.add('opacity-0')
    })

    element.addEventListener('mouseup', () => {
        show()
    })
}

