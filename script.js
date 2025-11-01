const canvas = document.getElementById('canvas3d');
const textElement = document.getElementById('text');


const backgrounds = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
];

const animations = [
    'pulse 1s ease-in-out',
    'rotate 1s ease-in-out',
    'fadeIn 1s ease-in-out'
];

let currentIndex = 0;

// Configuration Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

// Créer des particules 3D
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 50;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x00ffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Créer des anneaux 3D autour du texte
const rings = [];
for (let i = 0; i < 3; i++) {
    const geometry = new THREE.TorusGeometry(2 + i, 0.05, 16, 100);
    const material = new THREE.MeshBasicMaterial({
        color: [0xff00ff, 0x00ffff, 0xffff00][i],
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI / 2;
    rings.push(ring);
    scene.add(ring);
}

// Créer des sphères flottantes
const spheres = [];
for (let i = 0; i < 15; i++) {
    const geometry = new THREE.SphereGeometry(0.2 + Math.random() * 0.3, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.6,
        wireframe: true
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
    );
    sphere.userData.speed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
        rotation: (Math.random() - 0.5) * 0.05
    };
    spheres.push(sphere);
    scene.add(sphere);
}

// Créer des cubes rotatifs
const cubes = [];
for (let i = 0; i < 20; i++) {
    const size = 0.3 + Math.random() * 0.5;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.5,
        wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15
    );
    cube.userData.speed = {
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03
    };
    cubes.push(cube);
    scene.add(cube);
}

// Créer des dodécaèdres
const dodecahedrons = [];
for (let i = 0; i < 12; i++) {
    const geometry = new THREE.DodecahedronGeometry(0.4 + Math.random() * 0.3);
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });
    const dodecahedron = new THREE.Mesh(geometry, material);
    dodecahedron.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12
    );
    dodecahedron.userData.speed = {
        x: (Math.random() - 0.5) * 0.025,
        y: (Math.random() - 0.5) * 0.025,
        rotation: (Math.random() - 0.5) * 0.04
    };
    dodecahedrons.push(dodecahedron);
    scene.add(dodecahedron);
}

// Créer des tores (donuts)
const torus = [];
for (let i = 0; i < 10; i++) {
    const geometry = new THREE.TorusGeometry(0.5 + Math.random() * 0.5, 0.1, 16, 100);
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.6,
        wireframe: true
    });
    const torusMesh = new THREE.Mesh(geometry, material);
    torusMesh.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 8
    );
    torusMesh.userData.speed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        rotation: (Math.random() - 0.5) * 0.03
    };
    torus.push(torusMesh);
    scene.add(torusMesh);
}

// Créer des octaèdres
const octahedrons = [];
for (let i = 0; i < 15; i++) {
    const geometry = new THREE.OctahedronGeometry(0.3 + Math.random() * 0.4);
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.65,
        wireframe: true
    });
    const octahedron = new THREE.Mesh(geometry, material);
    octahedron.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14
    );
    octahedron.userData.speed = {
        x: (Math.random() - 0.5) * 0.028,
        y: (Math.random() - 0.5) * 0.028,
        rotation: (Math.random() - 0.5) * 0.045
    };
    octahedrons.push(octahedron);
    scene.add(octahedron);
}

// Animation du texte HTML
let time = 0;

function animateText() {
    time += 0.01;
    
    // Rotation 3D fluide
    const rotX = Math.sin(time * 0.5) * 15;
    const rotY = Math.cos(time * 0.3) * 20;
    const rotZ = Math.sin(time * 0.7) * 5;
    
    // Échelle pulsante
    const textScale = 1 + Math.sin(time * 2) * 0.1;
    
    // Translation 3D
    const transY = Math.sin(time) * 20;
    const transZ = Math.cos(time * 0.5) * 100;
    
    textElement.style.transform = `
        perspective(1000px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        rotateZ(${rotZ}deg)
        translateY(${transY}px)
        translateZ(${transZ}px)
        scale(${textScale})
    `;
    
    // Changer les couleurs du texte
    const hue = (time * 50) % 360;
    textElement.style.textShadow = `
        0 0 10px hsl(${hue}, 100%, 50%),
        0 0 20px hsl(${hue}, 100%, 50%),
        0 0 30px hsl(${hue}, 100%, 50%),
        0 0 40px hsl(${hue}, 100%, 60%),
        0 0 70px hsl(${hue}, 100%, 60%),
        0 0 80px hsl(${hue}, 100%, 60%),
        0 0 100px hsl(${hue}, 100%, 60%),
        0 0 150px hsl(${hue}, 100%, 60%)
    `;
}

// Animation Three.js
function animate() {
    requestAnimationFrame(animate);
    
    // Rotation des particules
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.002;
    
    // Animation des anneaux
    rings.forEach((ring, index) => {
        ring.rotation.x += 0.003 * (index + 1);
        ring.rotation.y += 0.002 * (index + 1);
        ring.rotation.z += 0.001 * (index + 1);
        ring.scale.set(
            1 + Math.sin(Date.now() * 0.001 + index) * 0.2,
            1 + Math.sin(Date.now() * 0.001 + index) * 0.2,
            1 + Math.sin(Date.now() * 0.001 + index) * 0.2
        );
    });
    
    // Animation des sphères
    spheres.forEach((sphere, index) => {
        sphere.position.x += sphere.userData.speed.x;
        sphere.position.y += sphere.userData.speed.y;
        sphere.position.z += sphere.userData.speed.z;
        sphere.rotation.x += sphere.userData.speed.rotation;
        sphere.rotation.y += sphere.userData.speed.rotation;
        
        // Rebond
        if (Math.abs(sphere.position.x) > 10) sphere.userData.speed.x *= -1;
        if (Math.abs(sphere.position.y) > 10) sphere.userData.speed.y *= -1;
        if (Math.abs(sphere.position.z) > 5) sphere.userData.speed.z *= -1;
        
        // Pulsation
        const scale = 1 + Math.sin(Date.now() * 0.002 + index) * 0.3;
        sphere.scale.set(scale, scale, scale);
    });
    
    // Animation des cubes
    cubes.forEach((cube, index) => {
        cube.rotation.x += cube.userData.speed.x;
        cube.rotation.y += cube.userData.speed.y;
        cube.rotation.z += cube.userData.speed.z;
        
        // Mouvement orbital
        const angle = Date.now() * 0.0005 + index;
        const radius = 8 + Math.sin(angle * 2) * 3;
        cube.position.x = Math.cos(angle) * radius;
        cube.position.y = Math.sin(angle * 1.5) * radius;
        cube.position.z = Math.sin(angle) * 3;
    });
    
    // Animation des dodécaèdres
    dodecahedrons.forEach((dodeca, index) => {
        dodeca.position.x += dodeca.userData.speed.x;
        dodeca.position.y += dodeca.userData.speed.y;
        dodeca.rotation.x += dodeca.userData.speed.rotation;
        dodeca.rotation.y += dodeca.userData.speed.rotation * 1.5;
        
        if (Math.abs(dodeca.position.x) > 11) dodeca.userData.speed.x *= -1;
        if (Math.abs(dodeca.position.y) > 11) dodeca.userData.speed.y *= -1;
        
        // Changement de couleur
        const hue = (Date.now() * 0.05 + index * 30) % 360;
        dodeca.material.color.setHSL(hue / 360, 1, 0.5);
    });
    
    // Animation des tores
    torus.forEach((t, index) => {
        t.position.x += t.userData.speed.x;
        t.position.y += t.userData.speed.y;
        t.rotation.x += t.userData.speed.rotation;
        t.rotation.y += t.userData.speed.rotation * 0.5;
        t.rotation.z += t.userData.speed.rotation * 1.5;
        
        if (Math.abs(t.position.x) > 9) t.userData.speed.x *= -1;
        if (Math.abs(t.position.y) > 9) t.userData.speed.y *= -1;
    });
    
    // Animation des octaèdres
    octahedrons.forEach((octa, index) => {
        octa.position.x += octa.userData.speed.x;
        octa.position.y += octa.userData.speed.y;
        octa.rotation.x += octa.userData.speed.rotation;
        octa.rotation.z += octa.userData.speed.rotation * 2;
        
        if (Math.abs(octa.position.x) > 12) octa.userData.speed.x *= -1;
        if (Math.abs(octa.position.y) > 12) octa.userData.speed.y *= -1;
        
        // Spirale
        const spiralAngle = Date.now() * 0.001 + index;
        octa.position.z = Math.sin(spiralAngle) * 5;
    });
    
    // Animation de la caméra
    camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
    camera.position.y = Math.cos(Date.now() * 0.0003) * 2;
    camera.lookAt(0, 0, 0);
    
    animateText();
    renderer.render(scene, camera);
}

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
