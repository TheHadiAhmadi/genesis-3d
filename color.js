import {$} from './utils'
const colors = [
    {name: 'Capri Blue', value: '#092346'},
    {name: 'Hanauma Mint', value: '#79a6ac'},
    {name: 'Makalu Gray', value: '#494e57'},
    // {name: 'Mauna Red', value: ''},
    {name: 'Savile Silver', value: '#999a9b'},
    {name: 'Uyuini White', value: '#e8e9ea'},
    {name: 'Vik Black', value: '#151d22'},
]

export function setupColors(store) {
    function setColor(color, isMatte) {
        $('#parent').style.backgroundColor = color
        store.setBgColor(color)
        store.setCarColor(color, isMatte)
    }

    store.setColor = setColor
    const colorsParent = $('#glossy-color-template').parentElement
    const matteColorsParent = $('#matte-color-template').parentElement

    function onColorClick(el) {
        const isMatte = el.dataset.matte === 'true'

        colorsParent.querySelector('.text-white')?.classList.remove('text-white')
        matteColorsParent.querySelector('.text-white')?.classList.remove('text-white')
        const color = el.dataset.value
        el.classList.add('text-white')

        setColor(color, isMatte)

    }

    const colorTemplate = $('#glossy-color-template').innerHTML
    const colorsHTML = colors.map(x => colorTemplate.replace('%value%', x.value).replace('%name%', x.name)).join('')
    colorsParent.innerHTML = colorsHTML
    colorsParent.querySelectorAll('div').forEach(colorItemEl => {

        colorItemEl.addEventListener('click', (e) => {
            onColorClick(colorItemEl)
        })
    })

    const matteColorTemplate = $('#matte-color-template').innerHTML
    const matteColorsHTML = colors.map(x => matteColorTemplate.replace('%value%', x.value).replace('%name%', x.name)).join('')

    matteColorsParent.innerHTML = matteColorsHTML
    matteColorsParent.querySelectorAll('div').forEach(colorItemEl => {

        colorItemEl.addEventListener('click', (e) => {
            onColorClick(colorItemEl)
        })
    })
}
