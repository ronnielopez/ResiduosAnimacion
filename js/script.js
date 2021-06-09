const cols = 4;
const main = document.getElementById('main');
const info = document.getElementById('info');
const info2 = document.getElementById('info2');
const info3 = document.getElementById('info3');
const info4 = document.getElementById('info4');
let parts = [];

let images = [
  "https://media.gq.com.mx/photos/5d5fede9e640cd0009a45b7e/16:9/w_1920,c_limit/aire.jpg",
  "https://cdn.hovia.com/app/uploads/Green-Tropical-Plant-Wallpaper-Mural-Plain.jpg",
  "https://images.squarespace-cdn.com/content/v1/58f8719c20099e4ee8f00783/1560858968195-3VYKW8C7IK00782IBJ8N/ke17ZwdGBToddI8pDm48kM_7jmUC-RyB-fa6m4uHSml7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UWVaKOtxYD4pZkIk17N8ApxkFHPhlbZftWDkZ8jkyPQ4vb3PiBfwt-qYfVQRKl72mQ/Wallpaper-Malavida-Green-Top-Image.jpg",
  "https://wallpaperaccess.com/full/1267226.jpg"
];
let current = 0;
let playing = false;

for (let i in images) {
  new Image().src = images[i];
}

for (let col = 0; col < cols; col++) {
  let part = document.createElement('div');
  part.className = 'part';
  let el = document.createElement('div');
  el.className = "section";
  let img = document.createElement('img');
  img.src = images[current];
  el.appendChild(img);
  if (current === 0) {
    setTimeout(() => {
      info.style.display = "block";
      info2.style.display = "none";
      info3.style.display = "none";
      info4.style.display = "none";
    }, 200);
  }
  else if (current === 1) {
    setTimeout(() => {
      info.style.display = "none";
      info2.style.display = "block";
      info3.style.display = "none";
      info4.style.display = "none";
    }, 2000);
  }
  else if (current === 2) {
    setTimeout(() => {
      info.style.display = "none";
      info2.style.display = "none";
      info3.style.display = "block";
      info4.style.display = "none";
    }, 2000);
  }
  else {
    setTimeout(() => {
      info.style.display = "none";
      info2.style.display = "none";
      info3.style.display = "none";
      info4.style.display = "block";
    }, 2000);
  }
  part.style.setProperty('--x', -100 / cols * col + 'vw');
  part.appendChild(el);
  main.appendChild(part);
  parts.push(part);
}

let animOptions = {
  duration: 2.3,
  ease: Power4.easeInOut
};

function go(dir) {
  if (!playing) {
    playing = true;
    if (current + dir < 0) current = images.length - 1;
    else if (current + dir >= images.length) current = 0;
    else current += dir;

    function up(part, next) {
      part.appendChild(next);
      gsap.to(part, { ...animOptions, y: -window.innerHeight }).then(function () {
        part.children[0].remove();
        gsap.to(part, { duration: 0, y: 0 });
      })
    }

    function down(part, next) {
      part.prepend(next);
      gsap.to(part, { duration: 0, y: -window.innerHeight });
      gsap.to(part, { ...animOptions, y: 0 }).then(function () {
        part.children[1].remove();
        playing = false;
      })
    }

    for (let p in parts) {
      let part = parts[p];
      let next = document.createElement('div');
      next.className = 'section';
      let img = document.createElement('img');
      img.src = images[current];
      next.appendChild(img);
      //Aqui
      if (current === 0) {
        setTimeout(() => {
          info.style.display = "block";
          info2.style.display = "none";
          info3.style.display = "none";
          info4.style.display = "none";
        }, 2000);
      }
      else if (current === 1) {
        setTimeout(() => {
          info.style.display = "none";
          info2.style.display = "block";
          info3.style.display = "none";
          info4.style.display = "none";
        }, 2000);
      }
      else if (current === 2) {
        setTimeout(() => {
          info.style.display = "none";
          info2.style.display = "none";
          info3.style.display = "block";
          info4.style.display = "none";
        }, 2000);
      }
      else {
        setTimeout(() => {
          info.style.display = "none";
          info2.style.display = "none";
          info3.style.display = "none";
          info4.style.display = "block";
        }, 2000);
      }


      if ((p - Math.max(0, dir)) % 2) {
        down(part, next);
      } else {
        up(part, next);
      }
    }
  }
}

window.addEventListener('keydown', function (e) {
  if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
    go(1);
  }

  else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
    go(-1);
  }
});

function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end
}

const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size + 'px');
cursorF.style.setProperty('--size', sizeF + 'px');

window.addEventListener('mousemove', function (e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX - size / 2 + 'px';
  cursor.style.top = e.clientY - size / 2 + 'px';
});

function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF / 2 + 'px';
  cursorF.style.left = cursorX - sizeF / 2 + 'px';
  requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
  gsap.to(cursor, { scale: 4.5 });
  gsap.to(cursorF, { scale: .4 });

  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}
function mouseup(e) {
  gsap.to(cursor, { scale: 1 });
  gsap.to(cursorF, { scale: 1 });

  endY = e.clientY || endY;
  if (clicked && startY && Math.abs(startY - endY) >= 40) {
    go(!Math.min(0, startY - endY) ? 1 : -1);
    clicked = false;
    startY = null;
    endY = null;
  }
}
window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function (e) {
  if (clicked) {
    endY = e.touches[0].clientY || e.targetTouches[0].clientY;
  }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);

let scrollTimeout;
function wheel(e) {
  clearTimeout(scrollTimeout);
  setTimeout(function () {
    if (e.deltaY < -40) {
      go(-1);
    }
    else if (e.deltaY >= 40) {
      go(1);
    }
  })
}
window.addEventListener('mousewheel', wheel, false);
window.addEventListener('wheel', wheel, false);


setInterval(function () {
  const show = document.querySelector('span[data-show]')
  const next = show.nextElementSibling || document.querySelector('span:first-child')
  const up = document.querySelector('span[data-up]')

  if (up) {
    up.removeAttribute('data-up')
  }

  show.removeAttribute('data-show')
  show.setAttribute('data-up', '')

  next.setAttribute('data-show', '')
}, 2000)


let bandera = 1;

$("#siguienteT").click(() => {
  //primera division
  if (bandera === 1) {
    $("#section1").hide();
    $("#section2").show();
    bandera++;
  }
  //segunda division
  else if(bandera === 2){
    $("#section2").hide();
    $("#section3").show();
    $("#siguienteT").hide();
    $("#salirT").show();
  }
})

$("#salirT").click(()=>{
  bandera = 1;
  $("#section1").show();
  $("#section3").hide();
  $("#salirT").hide();
  $("#siguienteT").show();
})


