import './style.css'
import { setupThree } from './three.js'

import { setup360 } from './360.js'
import { setupColors } from './color.js'

const store = {}

const colors = [
    {name: 'Capri Blue', value: '#120490'},
    {name: 'Hanauma Mint', value: '#126490'},
    {name: 'Makalu Gray', value: '#626460'},
    {name: 'Mauna Red', value: '#f20490'},
    {name: 'Savile Silver', value: '#929490'},
    {name: 'Uyuini White', value: '#f2f4f0'},
    {name: 'Vik Black', value: '#120410'},
]

document.querySelector('#app').innerHTML = `
  <div id="offcanvas-backdrop" class="fixed top-0 left-0 top-0 bottom-0 right-0 transition-all [z-index:3] pointer-events-none"></div>
  <div class="fixed w-1/2 right-0 top-0 bottom-0 [z-index:4] translate-x-full transition-all bg-white" id="offcanvas"></div>
  <div class="flex flex-col overflow-hidden h-screen bg-gray-300 pt-12" id="parent">
    <div class="mx-auto px-4 container">
        <div class="flex mb-4">
            <div id="exterior-tab-btn" class="cursor-pointer text-black border-b-2 border-black flex-1 pb-4 text-white border-white">Exterior</div>
            <div id="interior-tab-btn" class="cursor-pointer text-black border-b-2 border-black flex-1 pb-4">Interior</div>
        </div>
    </div>

    <div class="relative">
        <div class="container px-4 mx-auto flex" id="exterior-tab">
            <div class="flex flex-col md:flex-row w-full h-full"> 
                <div class="absolute top-0 bottom-0 [z-index:2]"> 
                    <div class="flex gap-2">
                        <div class="text-black cursor-pointer text-white" id="glossy-tab-btn" onclick="activeGlossyTab()">Glossy</div>
                        <div class="text-black cursor-pointer" id="matte-tab-btn" onclick="activeMatteTab()">Matte</div>

                    </div>
                    <div class="h-full text-xl mt-2 flex flex-col gap-2 text-gray-500" id="colors">
                        <div class="block" id="glossy-tab">
                            ${colors.map(x => `<div class="cursor-pointer whitespace-nowrap pe-8" data-value="${x.value}">${x.name}</div>`).join('')}
                        </div>
                        <div class="hidden" id="matte-tab">
                            ${colors.map(x => `<div class="cursor-pointer whitespace-nowrap pe-8" data-value="${x.value}" data-matte="trutruee">${x.name} (Matte)</div>`).join('')}
                        </div>
                    </div>
                    <div>
                    <button id="open-form">open form</button>
                    </div>

                </div>
                <div class="relative aspect-video -mr-[100px] ml-[100px] w-full h-full" id="parent">
                    <div id="el_360" class="absolute transition top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div class="bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center text-white flex-col">360
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M17 15.328c2.414-.718 4-1.94 4-3.328c0-2.21-4.03-4-9-4s-9 1.79-9 4s4.03 4 9 4"/><path d="m9 13l3 3l-3 3"/></g></svg>
                        </div>
                    </div>
                    <canvas id="scene" class="w-full h-full"/>
                </div>
            </div>
        </div>
    </div>

    <div class="relative h-full hidden" id="interior-tab">

        <div class="container mx-auto px-4 h-full">
            <div>left content<div>

            <div class="md:absolute bg-red-300 right-0 top-0 bottom-0 w-3/4">
                
            </div>
        </div>
        interior tab

    </div>
  </div>
`

function setupTabs() {
    let tabs = ['interior-tab', 'exterior-tab']
    for(let tab of tabs) {
        const btn = document.getElementById(tab + '-btn')

        btn.addEventListener('click', () => {
            for(let otherTab of tabs) {
                const tabBtn = document.getElementById(otherTab + '-btn')
                const tabpanel = document.getElementById(otherTab)

                tabBtn.classList.remove('text-white')
                tabBtn.classList.remove('border-white')

                tabpanel.classList.remove('flex')
                tabpanel.classList.add('hidden')
            }

            console.log('clicked on tab', tab)
            btn.classList.add('text-white')
            btn.classList.add('border-white')

            const tabpanel = document.getElementById(tab)

            tabpanel.classList.remove('hidden')
            tabpanel.classList.add('flex')
        })
    }
}

window.activeGlossyTab = () => {
    console.log('activate glossy tab')

    const glossyBtn = document.getElementById("glossy-tab-btn")
    const matteBtn = document.getElementById("matte-tab-btn")

    const glossyPanel = document.getElementById('glossy-tab')
    const mattePanel = document.getElementById('matte-tab')
    
    glossyBtn.classList.add('text-white')
    matteBtn.classList.remove('text-white')

    glossyPanel.classList.add('block')
    glossyPanel.classList.remove('hidden')

    mattePanel.classList.remove('block')
    mattePanel.classList.add('hidden')
}

window.activeMatteTab = () => {
    console.log('activate matte tab')

    const glossyBtn = document.getElementById("glossy-tab-btn")
    const matteBtn = document.getElementById("matte-tab-btn")

    const glossyPanel = document.getElementById('glossy-tab')
    const mattePanel = document.getElementById('matte-tab')
    
    glossyBtn.classList.remove('text-white')
    matteBtn.classList.add('text-white')

    glossyPanel.classList.remove('block')
    glossyPanel.classList.add('hidden')

    mattePanel.classList.add('block')
    mattePanel.classList.remove('hidden')
}

function setupOffcanvas() {
    const form = `

<div class="absolute cursor-pointer -mx-12 transition opacity-0 text-white top-0 bottom-0 flex items-center h-full text-4xl" id="close-form">&times;</div>
<div class="p-12">
    <h1 class="font-bold text-xl">DOWNLOAD SPEC SHEET</h1>
    <p class="mb-8">lorem ipsum 123oa sadfaksldf jas dkfl asfkj sdfasoidfj sakdfasdkfjas dlfkj sdlkfjasdf jasdofij asdifojasdfjlaskdfj asdkfja sldkfja sldkfj asld.</p>

    <span>Required fields*</span>

    <div>
    Form Content

    </div>

</div>
    `
    const offcanvas = document.getElementById('offcanvas')

    offcanvas.innerHTML = form

    const offcanvasBackdrop = document.getElementById('offcanvas-backdrop')

    const closeFormBtn = document.getElementById("close-form")
    const openFormBtn = document.getElementById("open-form")

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

    closeFormBtn.addEventListener('click', () => {
        closeForm()
    })

}

setupOffcanvas()
setupTabs()

setupColors(document.querySelectorAll('#colors'), document.querySelector('#parent'), store)
setup360(document.querySelector("#parent"), store)
setupThree(document.querySelector('#scene'), store)
