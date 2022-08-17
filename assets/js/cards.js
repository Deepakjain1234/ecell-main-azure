var a = 3;
//   IMPORTING
import * as THREE from "three";

import { TWEEN } from "./jsm/libs/tween.module.min.js";
//   import { TrackballControls } from "./jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "./jsm/renderers/CSS3DRenderer.js";
//   /IMPORTING

const table = [
  "Abhishek Upmanyu",
  "Standup  Comedian",
  "&nbsp;",
  "../assets/images/spk/Abhishek Upmanyu.png",
  1,
  "Abhilash Misra",
  "CEO, NSE  Academy",
  "Jury and eminent  Advisor at  Penn GSE",
  "../assets/images/spk/Abhilash Misra.png",
  1,
  "Anurag Dobhal",
  "The UK07 Rider, 2.57M subscribers",
  "&nbsp;",
  "../assets/images/spk/Anurag Dobhal.png",
  1,
  "Greg S. Reid",
  "Forbes Top 5 Keynote Speakers",
  "&nbsp;",
  "../assets/images/spk/Greg S. Reid.png",
  1,
  "Jason Falls",
  "Author, Top Influencer",
  "Entrepreneur, Forbes",
  "../assets/images/spk/Jason Falls.png",
  1,
  "Maj General G.D. Bakshi",
  "SM, VSM",
  "&nbsp;",
  "../assets/images/spk/Major General G.D. Bakshi.png",
  1,
  "Matteo Rizzi",
  "Co-Founder of FTS Group",
  "Host of #1 Radio Show",
  "../assets/images/spk/Matteo Rizzi.png",
  1,
  "Naman Deshmukh",
  "Silver Play Button YouTube Creator",
  "&nbsp;",
  "../assets/images/spk/Naman Deshmukh.png",
  1,
  "Prerna & Harsh",
  "YouTuber with 7M+ Subscribers",
  "&nbsp;",
  "../assets/images/spk/Prerna _ Harsh.png",
  1,
  "Raoul Pal",
  "Founder of RealVision",
  "Former Head at Goldman Sachs",
  "../assets/images/spk/Raoul Pal.png",
  1,
  "Ryan Foland",
  "Founder of Expert Dojo",
  "4-times TEDx Speaker",
  "../assets/images/spk/Ryan Foland.png",
  1,
  "Shagun Malhotra",
  "235k+ Instagram Followers",
  "&nbsp;",
  "../assets/images/spk/Shagun Malhotra.png",
  1,
  "Shakti Singh Shekhawat",
  "91K+ Instagram followers",
  "&nbsp;",
  "../assets/images/spk/Shakti Singh Shekhawat.png",
  1,
  "Shivraj Singh Chouhan",
  "Hon’ Chief Minister",
  "of Madhya Pradesh",
  "../assets/images/spk/Shivraj Singh Chouhan.png",
  1,
  "Zev Siegl",
  "Co-Founder",
  "Starbucks",
  "../assets/images/spk/Zev Siegl.png",
  1
];

// console.log(table.length / 5);
let camera, scene, renderer;
//   let controls;

const objects = [];
const targets = { grid: [] };

init();
animate();

function init() {
  // init starts
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 0;

  scene = new THREE.Scene();

  // table

  for (let i = 0; i < table.length; i += 5) {
    const element = document.createElement("div");
    var bgc = "rgba(185,181,181," + (Math.random() * 0.5 + 0.25) + ")";
    // 0,127,127
    // rgba(185, 181, 181, 0.2)
    element.className = "element";
    // element.style.backgroundColor = bgc;

    const cardPic = document.createElement("div");
    cardPic.className = "cardPic";
    element.style.transform = "rotateZ(0)";
    cardPic.style.background =
      "url('"+table[i+3]+"')";
    element.appendChild(cardPic);

    // const overlay = document.createElement("div");
    // overlay.className = "overlay";
    // element.appendChild(overlay);

    const cardName = document.createElement("div");
    cardName.className = "cardName";
    cardName.textContent = table[i];
    element.appendChild(cardName);

    const details = document.createElement("div");
    details.className = "details";
    details.innerHTML = table[i + 1] + "<br>" + table[i + 2];
    element.appendChild(details);

    const objectCSS = new CSS3DObject(element);
    objectCSS.position.x = Math.random() * 4000 - 2000;
    objectCSS.position.y = Math.random() * 4000 - 2000;
    objectCSS.position.z = Math.random() * 4000 - 2000;
    scene.add(objectCSS);

    objects.push(objectCSS);
  }

  // grid MAKER

  for (let i = 0; i < objects.length; i++) {
    const object = new THREE.Object3D();
    const rows = 3;
    const cols = 3;
    const gapX = 90; //in pixels
    const gapY = 10; //in pixels
    const gapZ = 520;

    //centering logic applied
    const gridLeft =
      (innerWidth * 2 - 100) / 2 - (cols * 120 + (cols - 1) * gapX) / 2; //innerWidth * 2 -100 right edge
    const gridTop =
      (innerHeight * 2 - 35) / 2 - (rows * 160 + (rows - 1) * gapY) / 2; //innerHeight * 2 - 35 bottom edge

    object.position.x = (i % cols) * (120 + gapX) - innerWidth + 100 + gridLeft;

    object.position.y =
      -(Math.floor(i / cols) % rows) * (160 + gapY) +
      innerHeight -
      100 -
      gridTop;

    object.position.z = Math.floor(i / (rows * cols)) * gapZ - 1200;


    targets.grid.push(object);
  }

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("speakers").appendChild(renderer.domElement);

  //RESIZE boilerplate code
  window.addEventListener("resize", onWindowResize);

  // init ends
}

//TWEENING CARDS STARTS
function transform(targets, duration) {
  TWEEN.removeAll();

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i]; //INITIAL
    const target = targets[i]; //FINAL

    //TWEENING POSITION
    new TWEEN.Tween(object.position)
      .to(
        {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.Out)
      .start();

    //TWEENING ROTATION
    new TWEEN.Tween(object.rotation)
      .to(
        {
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z,
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.Out)
      .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}
//TWEENING CARD ENDS

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update(); //calling tween.update recursively for smoother tweening
}

var a = setInterval(function () {
  if (SPEAKERS == "start") {
    transform(targets.grid, 1000);
  var b = setInterval(function () {
    var n = Math.floor(Math.random() * 15);
    // var n = c % objects.length;
    // var e = document.getElementsByClassName("element")[n];
    // e.className = e.className + " elementSeen";
    // setTimeout(function () {
    //   e.className = e.className.split(" ")[0];
    // }, 3000);

    new TWEEN.Tween(camera.position)
      .to(
        {
          x: targets.grid[n].position.x,
          y: targets.grid[n].position.y,
          z: targets.grid[n].position.z + 200,
        },
        1000
      )
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(render)
      .start();
    
  }, 2000);
  console.log("bye");
  clearInterval(a);
}
}, 100);

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
