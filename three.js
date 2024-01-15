import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function addControls(scene, camera, renderer, store) {
    const controls = new OrbitControls(camera, renderer.domElement)

    store.onUpdate(() => {
        controls.update()
    })
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.1;
  controls.screenSpacePanning = true;
  controls.minDistance = 5;
  controls.maxDistance = 5;
  controls.minPolarAngle = (0.1 * Math.PI) / 2;
  controls.maxPolarAngle = (0.9 * Math.PI) / 2;
    

}
function addLight(scene, car) {
    const light = new THREE.AmbientLight( 0xffffff, 0.2 ); // soft white light
    scene.add( light );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.target = car
    directionalLight.position.setX(20)
    directionalLight.position.setY(80)
    directionalLight.position.setZ(20)

    scene.add( directionalLight );
}

function loadShadow() {
    const shadow = new THREE.TextureLoader().load('/shadow.png')

    const mesh = new THREE.Mesh(
    // new THREE.PlaneGeometry( 8 * 4,7.1 * 4 ),
        new THREE.PlaneGeometry( 5.1 * 2,5.2 * 2 ),
        new THREE.MeshBasicMaterial( {
            map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
        } )
    );
    mesh.rotation.x = - Math.PI / 2;
    // mesh.rotation.z = - Math.PI / 2;

    // mesh.position.x = -1.4;
    mesh.position.z = -1.4

    return mesh;
}

function loadCarModel(store) {
    const loader = new GLTFLoader();

    return new Promise((resolve) => {
        //loader.load( '/GV60.glb', function ( gltf ) {
        loader.load( '/GV60_color.glb', function ( gltf ) {
            gltf.scene.position.setX(-1.35)
            gltf.scene.position.setY(-0.5)
            gltf.scene.position.setZ(0)

            gltf.scene.rotation.y = -Math.PI / 2

            const shadow = loadShadow()
            gltf.scene.add(shadow)

            const colorMap = {}

            gltf.scene.traverse((object) => {
                if(object.material) {
                    // object.material.metalness = 0.2 
                    console.log(object.material.color.getHex())
                    colorMap[object.material.color.getHex()] ??= 0
                    colorMap[object.material.color.getHex()] += 1
                }
                
                if(object.material?.color.getHex() === 8363941) {
                    object.userData.isBody = true;
                    //console.log('in body')
                } else {
                    //console.log('not in body')

                }
                // if (object.material.color) {
               //  }
            })
              
            console.log(colorMap)
                        store.setCarColor = function(color, isMatte) {
                            const threeColor = new THREE.Color(color)

                gltf.scene.traverse((object) => {
                  if (object.userData.isBody) {
                    if (isMatte) {
                      object.material.metalness = 0.2;
                      // object.material.metalness = 0.2;
                    } else {
                      object.material.metalness = 0.8;
                    }
                    object.material.color.set(threeColor);
                  }
              });
            }
        const color = document.querySelector('#colors [data-value]').dataset.value
        setTimeout(() => {
            store.setColor(color)
        })

            resolve(gltf.scene)
        }, undefined, function ( error ) {
            console.error( error );
        } );
    })
}


export async function setupThree(element, store) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, element.clientWidth / element.clientHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        // powerPreference: 'high-performance',
        canvas: element
    });

    let onUpdates = []

    store.onUpdate = (cb) => onUpdates.push(cb) 
    store.setBgColor = (color) => {
        const threeColor = new THREE.Color(color)
        scene.background = threeColor
        // scene.background = new THREE.Color("black")
    }

    store.scene = scene
    renderer.setSize( element.clientWidth * 4, element.clientHeight * 4, false);
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//     renderer.physicallyCorrectLights = true;

    // renderer.gammaOutput = true;
    // renderer.gammaFactor = 2.2;


    camera.position.x = -6;
    camera.position.z = 4;
    camera.position.y = 1;

    camera.lookAt(0, 0, 0)

    const car = await loadCarModel(store)
    scene.add(car)

    addLight(scene, car)
    addControls(scene, camera, renderer, store)

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

        onUpdates.map(x => x())
    }
    animate();
}
