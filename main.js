import './style.css'
import { setupThree } from './three.js'

import { setup360 } from './360.js'
import { setupColors } from './color.js'

const store = {}

document.querySelector('#app').innerHTML = `
  <div class="flex flex-col p-4 h-screen bg-gray-300" id="parent">
    <div class="flex gap-2 mb-4">
        <div class="text-white border-b border-white flex-1 pb-4">Exterior</div>
        <div class="text-black border-b border-black flex-1 pb-4">Interior</div>
    </div>

    <div class="flex h-full"> <div class="w-[300px]"> 
        <div class="flex gap-2">
            <div class="text-white">Glossy</div>
            <div>Matte</div>

        </div>
        <div class="h-full text-xl mt-2" id="colors">
            <div class="cursor-pointer" data-value="#4060a0">Capri Blue</div>
            <div class="cursor-pointer" data-value="#a06040">Red</div>
        </div>

    </div>
    <div class="relative w-full h-full bg-red-400" id="parent">
        <div id="el_360" class="absolute transition top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div class="bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center text-white flex-col">360
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M17 15.328c2.414-.718 4-1.94 4-3.328c0-2.21-4.03-4-9-4s-9 1.79-9 4s4.03 4 9 4"/><path d="m9 13l3 3l-3 3"/></g></svg>
            </div>
        </div>
        <canvas id="scene" class="w-full h-full"/>
    </div>
    </div>
  </div>
`


setupColors(document.querySelectorAll('#colors'), document.querySelector('#parent'), store)
setup360(document.querySelector("#parent"), store)
setupThree(document.querySelector('#scene'), store)
