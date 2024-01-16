import {$, $$} from './utils'

import './style.css'
import { setupThree } from './three.js'

import { setup360 } from './360.js'
import { setupColors } from './color.js'

const store = {}


function setupTabs() {
    let tabs = ['interior-tab', 'exterior-tab']
    for(let tab of tabs) {
        const btn = $('#' + tab + '-btn')

        btn.addEventListener('click', () => {
            for(let otherTab of tabs) {
                const tabBtn = $("#" + otherTab + '-btn')
                const tabpanel = $("#" + otherTab)

                tabBtn.classList.remove('text-white')
                tabBtn.classList.remove('border-white')

                tabpanel.classList.remove('flex')
                tabpanel.classList.add('hidden')
            }

            btn.classList.add('text-white')
            btn.classList.add('border-white')

            const tabpanel = $('#' + tab)

            tabpanel.classList.remove('hidden')
            tabpanel.classList.add('flex')
        })
    }
}

window.activeGlossyTab = () => {
    console.log('activate glossy tab')

    const glossyBtn = $("#glossy-tab-btn")
    const matteBtn = $("#matte-tab-btn")

    const glossyPanel = $('#glossy-tab')
    const mattePanel = $('#matte-tab')
    
    glossyBtn.classList.add('text-white')
    matteBtn.classList.remove('text-white')

    glossyPanel.classList.add('block')
    glossyPanel.classList.remove('hidden')

    mattePanel.classList.remove('block')
    mattePanel.classList.add('hidden')
}

window.activeMatteTab = () => {
    console.log('activate matte tab')

    const glossyBtn = $("#glossy-tab-btn")
    const matteBtn = $("#matte-tab-btn")

    const glossyPanel = $('#glossy-tab')
    const mattePanel = $('#matte-tab')
    
    glossyBtn.classList.remove('text-white')
    matteBtn.classList.add('text-white')

    glossyPanel.classList.remove('block')
    glossyPanel.classList.add('hidden')

    mattePanel.classList.add('block')
    mattePanel.classList.remove('hidden')
}

function setupOffcanvas() {
    const offcanvas = $('#offcanvas')
    const offcanvasBackdrop = $('#offcanvas-backdrop')

    const closeFormBtn = $("#close-form")
    const openFormBtn = $("#open-form")

    function openForm() {

        offcanvas.classList.remove('translate-x-full')
        offcanvasBackdrop.classList.add('backdrop-blur-sm')
        offcanvasBackdrop.classList.remove('pointer-events-none')

        closeFormBtn.classList.add('opacity-100')
    }

    function closeForm() {
        offcanvas.classList.add('translate-x-full')
        offcanvasBackdrop.classList.remove('backdrop-blur-sm')
        offcanvasBackdrop.classList.add('pointer-events-none')

        closeFormBtn.classList.remove('opacity-100')
    }

    openFormBtn.addEventListener('click', () => {
        openForm()
    })

    console.log(closeFormBtn)
    closeFormBtn?.addEventListener('click', () => {
        closeForm()
    })

}

setupOffcanvas()
setupTabs()

setupColors(store)
setup360($("#parent"), store)
setupThree($('#scene'), store)
