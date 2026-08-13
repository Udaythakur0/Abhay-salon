/* =========================================================
   UDAY THAKUR - 3D PORTFOLIO
   Three.js laptop + smartphone + code cube
========================================================= */

const THREE = window.THREE;


/* =========================================================
   BASIC MATERIALS
========================================================= */

const ORANGE = 0xff570f;

const metalMaterial = new THREE.MeshStandardMaterial({
  color: 0x15181c,
  metalness: 0.9,
  roughness: 0.2
});

const darkMaterial = new THREE.MeshStandardMaterial({
  color: 0x08090a,
  metalness: 0.6,
  roughness: 0.25
});

const silverMaterial = new THREE.MeshStandardMaterial({
  color: 0x555a60,
  metalness: 0.95,
  roughness: 0.18
});


/* =========================================================
   ROUNDED BOX
========================================================= */

function roundedBox(
  width,
  height,
  depth,
  radius,
  material
){

  const shape = new THREE.Shape();

  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);

  shape.lineTo(
    x + width - radius,
    y
  );

  shape.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  shape.lineTo(
    x + width,
    y + height - radius
  );

  shape.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  shape.lineTo(
    x + radius,
    y + height
  );

  shape.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  shape.lineTo(
    x,
    y + radius
  );

  shape.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );


  const geometry =
    new THREE.ExtrudeGeometry(
      shape,
      {
        depth:depth,
        bevelEnabled:true,
        bevelSegments:3,
        bevelSize:.04,
        bevelThickness:.04
      }
    );

  geometry.center();

  return new THREE.Mesh(
    geometry,
    material
  );
}


/* =========================================================
   CODE SCREEN TEXTURE
========================================================= */

function codeTexture(){

  const canvas =
    document.createElement("canvas");

  canvas.width = 1000;
  canvas.height = 600;

  const ctx =
    canvas.getContext("2d");


  ctx.fillStyle = "#050709";
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  ctx.fillStyle = "#10151a";
  ctx.fillRect(
    30,
    30,
    940,
    540
  );


  /* TOP BAR */

  ctx.fillStyle = "#ff5b16";

  ctx.beginPath();
  ctx.arc(60,60,8,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle = "#ffd34d";

  ctx.beginPath();
  ctx.arc(88,60,8,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle = "#29d17d";

  ctx.beginPath();
  ctx.arc(116,60,8,0,Math.PI*2);
  ctx.fill();


  /* CODE */

  ctx.font =
    "bold 25px monospace";

  const lines = [

    ["const developer =", "#ff7043"],
    ['"Uday Thakur";', "#66ff99"],
    ["", "#fff"],
    ["function buildWebsite() {", "#55ccff"],
    ['  return "Ideas → Reality";', "#fff"],
    ["}", "#55ccff"],
    ["", "#fff"],
    ["// AI Assisted", "#ffcc55"],
    ["// 3D Web Experience", "#ffcc55"],
    ["", "#fff"],
    ["HTML  •  CSS  •  JS", "#55ffcc"],
    ["Three.js • AI • UI", "#ff66aa"]

  ];


  let y = 120;

  lines.forEach(line=>{

    ctx.fillStyle = line[1];

    ctx.fillText(
      line[0],
      60,
      y
    );

    y += 38;

  });


  return new THREE.CanvasTexture(
    canvas
  );
}


/* =========================================================
   CREATE LAPTOP
========================================================= */

function createLaptop(){

  const laptop =
    new THREE.Group();


  /* BASE */

  const base =
    roundedBox(
      5.8,
      .18,
      3.7,
      .16,
      metalMaterial
    );

  base.rotation.x =
    -Math.PI / 2;

  base.position.y =
    -1.35;

  laptop.add(base);


  /* PALM REST */

  const palm =
    roundedBox(
      5.45,
      .10,
      2.75,
      .12,
      silverMaterial
    );

  palm.rotation.x =
    -Math.PI / 2;

  palm.position.set(
    0,
    -1.25,
    .25
  );

  laptop.add(palm);


  /* KEYBOARD */

  const keyboard =
    new THREE.Group();


  const keyMaterial =
    new THREE.MeshStandardMaterial({
      color:0x070809,
      metalness:.35,
      roughness:.4
    });


  for(
    let row=0;
    row<4;
    row++
  ){

    for(
      let col=0;
      col<12;
      col++
    ){

      const key =
        roundedBox(
          .32,
          .025,
          .25,
          .035,
          keyMaterial
        );

      key.rotation.x =
        -Math.PI / 2;

      key.position.set(
        -2.02 + col*.365,
        -1.17,
        -.48 + row*.35
      );

      keyboard.add(key);

    }

  }


  laptop.add(keyboard);


  /* TRACKPAD */

  const trackpad =
    roundedBox(
      1.5,
      .025,
      1,
      .10,
      darkMaterial
    );

  trackpad.rotation.x =
    -Math.PI / 2;

  trackpad.position.set(
    0,
    -1.18,
    .48
  );

  laptop.add(trackpad);


  /* SCREEN OUTER */

  const screenBody =
    roundedBox(
      5.45,
      3.45,
      .14,
      .18,
      metalMaterial
    );

  screenBody.position.set(
    0,
    .35,
    -1.60
  );

  screenBody.rotation.x =
    -.04;

  laptop.add(screenBody);


  /* SCREEN */

  const screenMaterial =
    new THREE.MeshStandardMaterial({

      map:codeTexture(),

      metalness:.1,

      roughness:.2,

      emissive:
        new THREE.Color(
          0x001b15
        ),

      emissiveIntensity:.25

    });


  const display =
    roundedBox(
      4.92,
      2.85,
      .035,
      .10,
      screenMaterial
    );

  display.position.set(
    0,
    .35,
    -1.69
  );

  display.rotation.x =
    -.04;

  laptop.add(display);


  /* HINGE */

  const hinge =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .12,
        .12,
        4.7,
        32
      ),

      silverMaterial

    );

  hinge.rotation.z =
    Math.PI / 2;

  hinge.position.set(
    0,
    -1.18,
    -1.37
  );

  laptop.add(hinge);


  return laptop;
}



/* =========================================================
   CREATE SMARTPHONE
========================================================= */

function createPhone(){

  const phone =
    new THREE.Group();


  const body =
    roundedBox(
      2.25,
      .16,
      4.65,
      .22,
      metalMaterial
    );

  body.rotation.x =
    -Math.PI / 2;

  phone.add(body);


  /* FRONT GLASS */

  const glassMaterial =
    new THREE.MeshStandardMaterial({

      color:0x02070a,

      metalness:.15,

      roughness:.08,

      emissive:
        new THREE.Color(
          0x00151b
        ),

      emissiveIntensity:.35

    });


  const glass =
    roundedBox(
      2.03,
      .025,
      4.32,
      .18,
      glassMaterial
    );

  glass.rotation.x =
    -Math.PI / 2;

  glass.position.y =
    .105;

  phone.add(glass);


  /* PHONE SCREEN */

  const texture =
    codeTexture();


  const screen =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        1.82,
        3.90
      ),

      new THREE.MeshBasicMaterial({
        map:texture
      })

    );

  screen.rotation.x =
    -Math.PI / 2;

  screen.position.y =
    .125;

  phone.add(screen);


  /* CAMERA */

  const cameraMaterial =
    new THREE.MeshStandardMaterial({
      color:0x020202,
      metalness:.8,
      roughness:.15
    });


  const camera =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .20,
        .20,
        .05,
        32
      ),

      cameraMaterial

    );

  camera.rotation.x =
    -Math.PI / 2;

  camera.position.set(
    .65,
    .14,
    -1.85
  );

  phone.add(camera);


  return phone;
}



/* =========================================================
   CREATE CODE CUBE
========================================================= */

function createCube(){

  const group =
    new THREE.Group();


  const cubeMaterial =
    new THREE.MeshStandardMaterial({

      color:0x111316,

      metalness:.65,

      roughness:.22

    });


  const cube =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2.6,
        2.6,
        2.6
      ),

      cubeMaterial

    );


  group.add(cube);


  /* ORANGE EDGES */

  const edges =
    new THREE.LineSegments(

      new THREE.EdgesGeometry(
        cube.geometry
      ),

      new THREE.LineBasicMaterial({
        color:ORANGE
      })

    );

  group.add(edges);


  /*
     FACE LABELS
  */

  const labels = [
    ["HTML",0,0,1.32,0,0],
    ["CSS",0,0,-1.32,0,Math.PI],
    ["JS",1.32,0,0,0,Math.PI/2],
    ["AI",-1.32,0,0,0,-Math.PI/2],
    ["UI",0,1.32,0,-Math.PI/2,0],
    ["WEB",0,-1.32,0,Math.PI/2,0]
  ];


  labels.forEach(data=>{

    const [
      text,
      x,
      y,
      z,
      rx,
      ry
    ] = data;


    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width = 500;
    canvas.height = 300;

    const ctx =
      canvas.getContext("2d");


    ctx.fillStyle =
      "#050505";

    ctx.fillRect(
      0,
      0,
      500,
      300
    );


    ctx.fillStyle =
      "#ff570f";

    ctx.font =
      "bold 55px monospace";

    ctx.textAlign =
      "center";

    ctx.textBaseline =
      "middle";

    ctx.fillText(
      text,
      250,
      150
    );


    const texture =
      new THREE.CanvasTexture(
        canvas
      );


    const material =
      new THREE.MeshBasicMaterial({
        map:texture
      });


    const label =
      new THREE.Mesh(

        new THREE.PlaneGeometry(
          1.65,
          1
        ),

        material

      );


    label.position.set(
      x,
      y,
      z
    );

    label.rotation.set(
      rx,
      ry,
      0
    );


    group.add(label);

  });


  return group;
}



/* =========================================================
   3D SCENE
========================================================= */

function setup3D(
  canvasId,
  createObject,
  cameraZ = 7
){

  const canvas =
    document.getElementById(
      canvasId
    );

  if(!canvas) return;


  const parent =
    canvas.parentElement;


  const scene =
    new THREE.Scene();


  scene.background =
    new THREE.Color(
      0x050505
    );


  const camera =
    new THREE.PerspectiveCamera(
      32,
      1,
      .1,
      100
    );


  camera.position.set(
    0,
    .5,
    cameraZ
  );


  const renderer =
    new THREE.WebGLRenderer({

      canvas:canvas,

      antialias:true,

      alpha:true

    });


  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );


  /* LIGHT */

  scene.add(
    new THREE.HemisphereLight(
      0xffffff,
      0x111111,
      2.3
    )
  );


  const mainLight =
    new THREE.DirectionalLight(
      0xffffff,
      3
    );

  mainLight.position.set(
    4,
    6,
    6
  );

  scene.add(mainLight);


  const orangeLight =
    new THREE.PointLight(
      ORANGE,
      5,
      12
    );

  orangeLight.position.set(
    -4,
    2,
    4
  );

  scene.add(
    orangeLight
  );


  const object =
    createObject();


  scene.add(
    object
  );


  /* ROTATION */

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  let dragging = false;

  let lastX = 0;
  let lastY = 0;


  canvas.style.touchAction =
    "none";


  canvas.addEventListener(
    "pointerdown",
    e=>{

      dragging = true;

      lastX =
        e.clientX;

      lastY =
        e.clientY;

      canvas.setPointerCapture(
        e.pointerId
      );

    }
  );


  canvas.addEventListener(
    "pointermove",
    e=>{

      if(!dragging) return;


      targetX +=
        (e.clientX-lastX)
        * .012;


      targetY +=
        (e.clientY-lastY)
        * .008;


      lastX =
        e.clientX;

      lastY =
        e.clientY;

    }
  );


  canvas.addEventListener(
    "pointerup",
    ()=>{
      dragging=false;
    }
  );


  canvas.addEventListener(
    "pointercancel",
    ()=>{
      dragging=false;
    }
  );


  /* RESIZE */

  function resize(){

    const rect =
      parent.getBoundingClientRect();


    renderer.setSize(
      rect.width,
      rect.height,
      false
    );


    camera.aspect =
      rect.width /
      rect.height;


    camera.updateProjectionMatrix();

  }


  window.addEventListener(
    "resize",
    resize
  );


  resize();


  /* ANIMATION */

  function animate(){

    requestAnimationFrame(
      animate
    );


    if(!dragging){

      targetX +=
        .0018;

    }


    currentX +=
      (targetX-currentX)
      * .07;


    currentY +=
      (targetY-currentY)
      * .07;


    object.rotation.y =
      currentX;


    object.rotation.x =
      Math.max(
        -.45,
        Math.min(
          .45,
          currentY
        )
      );


    renderer.render(
      scene,
      camera
    );

  }


  animate();

}



/* =========================================================
   START 3D OBJECTS
========================================================= */

setup3D(
  "heroLaptop",
  createLaptop,
  7
);


setup3D(
  "techLaptop",
  createLaptop,
  7
);


setup3D(
  "phone",
  createPhone,
  6
);


setup3D(
  "cube",
  createCube,
  6
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer =
  new IntersectionObserver(
    entries=>{

      entries.forEach(
        entry=>{

          if(
            entry.isIntersecting
          ){

            entry.target.classList.add(
              "show"
            );

          }

        }
      );

    },
    {
      threshold:.12
    }
  );


document
  .querySelectorAll(
    ".reveal"
  )
  .forEach(
    element=>
      observer.observe(
        element
      )
  );



/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
  document.getElementById(
    "menuBtn"
  );

const navMenu =
  document.getElementById(
    "navMenu"
  );


menuBtn.addEventListener(
  "click",
  ()=>{

    navMenu.classList.toggle(
      "open"
    );

  }
);


document
  .querySelectorAll(
    "#navMenu a"
  )
  .forEach(
    link=>{

      link.addEventListener(
        "click",
        ()=>{
          navMenu.classList.remove(
            "open"
          );
        }
      );

    }
  );



/* =========================================================
   CONTACT FORM
========================================================= */

const form =
  document.querySelector(
    ".contact-form"
  );


form.addEventListener(
  "submit",
  event=>{

    event.preventDefault();

    alert(
      "Thank you! Your message is ready."
    );

  }
);



/* =========================================================
   REMOVE LOADER
========================================================= */

window.addEventListener(
  "load",
  ()=>{

    setTimeout(
      ()=>{

        const loader =
          document.getElementById(
            "loader"
          );

        if(loader){
          loader.remove();
        }

      },
      800
    );

  }
);
