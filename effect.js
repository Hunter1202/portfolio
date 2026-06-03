const bg = document.getElementById("bg");
const light = document.querySelector(".light");

const svgCrystal = `
<svg viewBox="0 0 200 240">
<polygon
points="100,0 180,60 140,220 60,220 20,60"
fill="rgba(255,255,255,0.03)"
stroke="rgba(255,255,255,0.2)"
stroke-width="1"/>
<polygon
points="100,0 180,60 100,120"
fill="rgba(255,255,255,0.15)"/>
<polygon
points="20,60 100,0 100,120"
fill="rgba(255,255,255,0.08)"/>
<polygon
points="20,60 100,120 60,220"
fill="rgba(255,255,255,0.05)"/>
<polygon
points="180,60 100,120 140,220"
fill="rgba(255,255,255,0.10)"/>
</svg>`;
const isMobile = window.innerWidth < 768;
const crystalCount = isMobile ? 20 : 45;
const starCount = isMobile ? 50 : 150;
const crystals = [];
for(let i=0;i<crystalCount;i++){
    const div = document.createElement("div");
    const size = 60 + Math.random()*220;
    div.classList.add("crystal");
    //phân tầng
    if(i<15){
        div.classList.add("near");
    }else if(i<30){
        div.classList.add("mid");
    }else{
        div.classList.add("far");
    }
    div.style.width = size+"px";
    div.style.height = size+"px";
    div.innerHTML = svgCrystal;
    div.x = Math.random()*window.innerWidth;
    div.y = Math.random()*window.innerHeight;
    div.speed = 0.1 + Math.random()*0.3;
    div.floatRange = 10 + Math.random()*40;
    div.rotation = Math.random()*360;
    bg.appendChild(div);
    crystals.push(div);
}
for(let i=0;i<starCount;i++){
    const dot = document.createElement("div");
    dot.style.position="absolute";
    const size = 1;
    dot.style.width=size+"px";
    dot.style.height=size+"px";
    dot.style.borderRadius="50%";
    dot.style.background= "rgba(255,255,255,.3)";
    dot.style.left= Math.random()*100+"%";
    dot.style.top= Math.random()*100+"%";
    bg.appendChild(dot);
}
let mx = 0;
let my = 0;
function updatePointer(x,y){

    mx = (x/window.innerWidth)-0.5;
    my = (y/window.innerHeight)-0.5;

    light.style.left =
        (x-500)+"px";

    light.style.top =
        (y-500)+"px";
}

/* Desktop */
window.addEventListener("mousemove",e=>{
    updatePointer(
        e.clientX,
        e.clientY
    );
});
/* Mobile */
window.addEventListener(
    "touchmove",
    e=>{
        const touch =
            e.touches[0];
        updatePointer(
            touch.clientX,
            touch.clientY
        );
    },
    {passive:true}
);

function animate(){
    const t = performance.now()/1000;
    crystals.forEach((c,index)=>{
        const offsetY =
            Math.sin(
                t*c.speed + index
            ) * c.floatRange;
        const px =
            mx*(index+1)*2;
        const py =
            my*(index+1)*2;
        c.style.transform =
            `
        translate(
            ${c.x+px}px,
            ${c.y+offsetY+py}px
        )
        rotate(
            ${c.rotation+t*5*c.speed}deg
        )
        `;
    });
    requestAnimationFrame(animate);
}
animate();