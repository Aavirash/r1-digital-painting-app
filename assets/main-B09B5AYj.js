(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let s,n,S=!1,b="brush",f="#FE5F00",I="#F2F2F2",u=5,w=0,T=[],z={x:0,y:0,z:0},p=1,M=[],B=4,H=0,x=null,N=0,X=!1;const C=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function j(){s=document.getElementById("paintCanvas"),n=s.getContext("2d"),s.width=window.innerWidth,s.height=window.innerHeight,n.lineCap="round",n.lineJoin="round",n.fillStyle=I,n.fillRect(0,0,s.width,s.height),A()}function A(){M.push(n.getImageData(0,0,s.width,s.height)),M.length>20&&M.shift()}function Z(){if(M.length>1){M.pop();const t=M[M.length-1];n.putImageData(t,0,0),$()}}function $(){const t=document.createElement("div");t.textContent="Undo",t.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(254, 95, 0, 0.9);
    color: #000;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    z-index: 100;
    pointer-events: none;
  `,document.body.appendChild(t),setTimeout(()=>{t.remove()},1e3)}function Q(){n.fillStyle=I,n.fillRect(0,0,s.width,s.height),A(),y.prevPositions&&(y.prevPositions=[]),T.length=0}function h(t,e){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,h.prevX!==null&&h.prevY!==null&&(n.beginPath(),n.moveTo(h.prevX,h.prevY),n.lineTo(t,e),n.stroke()),n.beginPath(),n.arc(t,e,u*p*.5,0,Math.PI*2),n.fill(),h.prevX=t,h.prevY=e}function d(t,e){const o=s.width/2,i=s.height/2,a=12;n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.5;for(let r=0;r<a;r++){const l=r*Math.PI*2/a,c=Math.cos(l),v=Math.sin(l),P=o+(t-o)*c-(e-i)*v,E=i+(t-o)*v+(e-i)*c,L=o+(o-P),R=i+(i-E);if(d.prevX!==null&&d.prevY!==null){const F=o+(d.prevX-o)*c-(d.prevY-i)*v,q=i+(d.prevX-o)*v+(d.prevY-i)*c,J=o+(o-F),V=i+(i-q);n.beginPath(),n.moveTo(F,q),n.lineTo(P,E),n.stroke(),n.beginPath(),n.moveTo(J,V),n.lineTo(L,R),n.stroke()}n.beginPath(),n.arc(P,E,u*p*.3,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(L,R,u*p*.3,0,Math.PI*2),n.fill()}d.prevX=t,d.prevY=e}function y(t,e){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.8;const o=s.width/2,i=s.height/2;y.prevPositions||(y.prevPositions=[]);const a=[];for(let r=0;r<B;r++){const l=r*Math.PI*2/B,c=Math.cos(l),v=Math.sin(l),P=o+(t-o)*c-(e-i)*v,E=i+(t-o)*v+(e-i)*c;a.push({x:P,y:E})}y.prevPositions.length===a.length&&S&&a.forEach((r,l)=>{const c=y.prevPositions[l];n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(r.x,r.y),n.stroke(),n.beginPath(),n.arc(r.x,r.y,u*p*.3,0,Math.PI*2),n.fill()}),y.prevPositions=a}function m(t,e){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,m.prevX!==null&&m.prevY!==null&&(n.beginPath(),n.moveTo(m.prevX,m.prevY),n.lineTo(t,e),n.stroke()),m.prevX=t,m.prevY=e}function g(t,e){if(n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,g.prevX!==null&&g.prevY!==null&&(n.beginPath(),n.moveTo(g.prevX,g.prevY),n.lineTo(t,e),n.stroke()),n.beginPath(),n.arc(t,e,u*p*.5,0,Math.PI*2),n.fill(),Math.random()<.1*p){const o=Math.floor(Math.random()*3)+1;for(let i=0;i<o;i++){const a=t+(Math.random()-.5)*u,r=u*(Math.random()*2+1)*p;n.beginPath(),n.moveTo(a,e),n.lineTo(a,e+r),n.stroke()}}g.prevX=t,g.prevY=e}h.prevX=null;h.prevY=null;d.prevX=null;d.prevY=null;y.prevPositions=[];m.prevX=null;m.prevY=null;g.prevX=null;g.prevY=null;function ee(){x||(x=new(window.AudioContext||window.webkitAudioContext))}function D(t,e=1.5){if(!x)return;const o=x.currentTime,i=x.createOscillator(),a=x.createGain();i.connect(a),a.connect(x.destination),i.type="sine",i.frequency.value=t,a.gain.setValueAtTime(0,o),a.gain.linearRampToValueAtTime(.3,o+.1),a.gain.exponentialRampToValueAtTime(.01,o+e),i.start(o),i.stop(o+e)}function te(t,e){const o=["circle","triangle","square","pentagon","hexagon","star"],i=o[Math.floor(Math.random()*o.length)];return{x:t,y:e,type:i,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function O(t,e){const o=te(t,e);T.push(o);const a={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[o.type]||440;D(a,1.5),N++,N%3===0&&(D(a*1.25,1.5),D(a*1.5,1.5))}function ne(){for(let e=T.length-1;e>=0;e--){const o=T[e];o.x+=z.x*.05,o.y+=z.y*.05,o.x<-o.size&&(o.x=s.width+o.size),o.x>s.width+o.size&&(o.x=-o.size),o.y<-o.size&&(o.y=s.height+o.size),o.y>s.height+o.size&&(o.y=-o.size),o.life-=o.decay,o.life<=0&&T.splice(e,1)}}function oe(){T.forEach(t=>{switch(n.save(),n.globalAlpha=t.life,n.translate(t.x,t.y),n.rotate(t.rotation),n.strokeStyle=t.color,n.lineWidth=2,n.fillStyle=t.color.replace(")",", 0.2)").replace("hsl","hsla"),t.type){case"circle":n.beginPath(),n.arc(0,0,t.size,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,t.size*.5,0,Math.PI*2),n.stroke();break;case"triangle":n.beginPath();for(let e=0;e<3;e++){const o=e*Math.PI*2/3,i=Math.cos(o)*t.size,a=Math.sin(o)*t.size;e===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"square":n.beginPath(),n.rect(-t.size,-t.size,t.size*2,t.size*2),n.stroke(),n.beginPath(),n.moveTo(-t.size*.7,-t.size*.7),n.lineTo(t.size*.7,t.size*.7),n.moveTo(t.size*.7,-t.size*.7),n.lineTo(-t.size*.7,t.size*.7),n.stroke();break;case"pentagon":n.beginPath();for(let e=0;e<5;e++){const o=e*Math.PI*2/5-Math.PI/2,i=Math.cos(o)*t.size,a=Math.sin(o)*t.size;e===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"hexagon":n.beginPath();for(let e=0;e<6;e++){const o=e*Math.PI*2/6,i=Math.cos(o)*t.size,a=Math.sin(o)*t.size;e===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"star":n.beginPath();for(let e=0;e<10;e++){const o=e*Math.PI*2/10-Math.PI/2,i=e%2===0?t.size:t.size*.5,a=Math.cos(o)*i,r=Math.sin(o)*i;e===0?n.moveTo(a,r):n.lineTo(a,r)}n.closePath(),n.stroke();break}n.restore()}),n.globalAlpha=1}function K(){const t=document.getElementById("selectedTool");if(t){t.innerHTML=C[w].icon;const e=t.cloneNode(!0);t.parentNode.replaceChild(e,t),C[w].name==="llm"?(e.addEventListener("click",()=>{W()}),e.style.cursor="pointer"):e.style.cursor="default"}}function Y(t){if(t>0?w=(w+1)%C.length:w=(w-1+C.length)%C.length,b=C[w].name,K(),b==="llm")ie();else switch(b){case"symmetry":B=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":ee();break}}function ie(){const t=document.getElementById("selectedTool");if(t){const e=document.createElement("div");if(e.style.cssText=`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.7);
      animation: ripple 1.5s infinite;
      pointer-events: none;
      z-index: 25;
    `,!document.getElementById("ripple-animation")){const o=document.createElement("style");o.id="ripple-animation",o.textContent=`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
      `,document.head.appendChild(o)}t.appendChild(e),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},1500)}}function W(){if(typeof PluginMessageHandler<"u"){const t={message:'Give me creative drawing prompts or artistic inspiration in 2-3 sentences. Focus on visual ideas I can draw, like "Draw a tree with colorful leaves" or "Create a pattern of interlocking circles". Be encouraging and artistic.',useLLM:!0,wantsR1Response:!0};PluginMessageHandler.postMessage(JSON.stringify(t))}}function ae(){const t=document.getElementById("canvasColorPicker"),e=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===I?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function se(){const t=document.getElementById("canvasColorPicker"),e=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===f?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function re(t){I=t,n.fillStyle=I,n.fillRect(0,0,s.width,s.height),A(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",t)}function le(t){f=t,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",t)}function ce(t){S=!0;const e=s.getBoundingClientRect(),o=t.clientX-e.left,i=t.clientY-e.top;if(b==="sacred"){O(o,i);return}U(o,i)}function de(t){if(!S)return;const e=s.getBoundingClientRect(),o=t.clientX-e.left,i=t.clientY-e.top;if(b==="sacred"){Math.random()<.3&&O(o,i);return}U(o,i)}function G(){S&&(S=!1,A(),h.prevX=null,h.prevY=null,d.prevX=null,d.prevY=null,m.prevX=null,m.prevY=null,g.prevX=null,g.prevY=null)}function U(t,e){switch(b){case"brush":h(t,e);break;case"kaleidoscope":d(t,e);break;case"symmetry":y(t,e);break;case"lines":m(t,e);break;case"drip":g(t,e);break}}function ue(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",a=>{a.accelerationIncludingGravity&&(z.x=a.accelerationIncludingGravity.x||0,z.y=a.accelerationIncludingGravity.y||0,z.z=a.accelerationIncludingGravity.z||0)});let t=0,e=0,o=0,i=15;window.addEventListener("devicemotion",a=>{if(a.accelerationIncludingGravity){const r=a.accelerationIncludingGravity.x||0,l=a.accelerationIncludingGravity.y||0,c=a.accelerationIncludingGravity.z||0,v=Math.abs(r-t),P=Math.abs(l-e),E=Math.abs(c-o);if(t=r,e=l,o=c,b!=="sacred"&&(v>i||P>i||E>i)){const L=Date.now();L-H>1e3&&(H=L,Q())}}})}window.addEventListener("scrollUp",()=>{Y(-1)});window.addEventListener("scrollDown",()=>{Y(1)});window.addEventListener("sideClick",t=>(t&&(t.stopImmediatePropagation(),t.preventDefault()),k(),!1));document.addEventListener("keydown",t=>{if(t.key==="ArrowUp"&&(Y(-1),t.preventDefault()),t.key==="ArrowDown"&&(Y(1),t.preventDefault()),t.key==="Enter"){if(C[w].name==="llm"){W();return}k(),t.preventDefault()}(t.key==="e"||t.key==="E")&&(_(),t.preventDefault())});window.removeEventListener("sideClick",k);window.addEventListener("sideClick",k);window.removeEventListener("keydown",window._pttKeyHandler);window._pttKeyHandler=function(t){t.key==="Enter"&&k()};window.addEventListener("keydown",window._pttKeyHandler);window.onPluginMessage=function(t){return!1};function pe(){j(),ue(),s.addEventListener("mousedown",ce),s.addEventListener("mousemove",de),s.addEventListener("mouseup",G),s.addEventListener("mouseleave",G),s.addEventListener("touchstart",e=>{e.preventDefault();const o=e.touches[0],i=new MouseEvent("mousedown",{clientX:o.clientX,clientY:o.clientY});s.dispatchEvent(i)}),s.addEventListener("touchmove",e=>{e.preventDefault();const o=e.touches[0],i=new MouseEvent("mousemove",{clientX:o.clientX,clientY:o.clientY});s.dispatchEvent(i)}),s.addEventListener("touchend",e=>{e.preventDefault();const o=new MouseEvent("mouseup",{});s.dispatchEvent(o)}),document.getElementById("undoBtn").addEventListener("click",Z),document.getElementById("canvasColorBtn").addEventListener("click",ae),document.getElementById("eyedropperBtn").addEventListener("click",se),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(e=>{e.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(a=>a.classList.remove("selected-color")),e.classList.add("selected-color"),setTimeout(()=>{re(e.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(e=>{e.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(a=>a.classList.remove("selected-color")),e.classList.add("selected-color"),setTimeout(()=>{le(e.dataset.color)},200)})}),K();function t(){ne(),oe(),requestAnimationFrame(t)}t(),console.log("R1 Digital Painting App initialized with tool:",b)}document.addEventListener("DOMContentLoaded",pe);function k(){if(X)return;X=!0,_();const t=setTimeout(()=>{const e=document.createElement("div");e.textContent="Still sending... (LLM/email may be delayed)",e.style.cssText=`
      position: fixed;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 165, 0, 0.95);
      color: #000;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: bold;
      z-index: 100;
      pointer-events: none;
    `,document.body.appendChild(e),setTimeout(()=>{e.parentNode&&e.remove()},8e3)},15e3);setTimeout(()=>{X=!1,clearTimeout(t)},3e4)}window.removeEventListener("sideClick",k);window.addEventListener("sideClick",k);window.removeEventListener("keydown",window._pttKeyHandler);window._pttKeyHandler=function(t){t.key==="Enter"&&k()};window.addEventListener("keydown",window._pttKeyHandler);function _(){try{const e=document.createElement("canvas");e.width=80,e.height=80,e.getContext("2d").drawImage(s,0,0,s.width,s.height,0,0,80,80);const i=e.toDataURL("image/png");fe(i)}catch{X=!1;const e=document.createElement("div");e.textContent="Failed to capture artwork",e.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 0, 0, 0.9);
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: bold;
      z-index: 100;
      pointer-events: none;
      max-width: 80%;
      text-align: center;
    `,document.body.appendChild(e),setTimeout(()=>{e.parentNode&&e.remove()},3e3)}}async function fe(t){try{const e=document.createElement("div");e.textContent="Sending email...",e.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(254, 95, 0, 0.9);
      color: #000;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: bold;
      z-index: 100;
      pointer-events: none;
    `,document.body.appendChild(e);const o=t.split(",")[1];if(typeof PluginMessageHandler<"u"){const i={message:`Please send me an email with subject "Your Digital Artwork from R1 Digital Painting App". In the email body, include this message:

"Here is your digital artwork! To view the image:

1. Copy the base64 data below
2. Go to https://base64toimage.github.io/  
3. Paste the data and convert it to see your artwork

Base64 Data:
${o}

Enjoy your digital creation!"`,useLLM:!0,wantsR1Response:!1};try{PluginMessageHandler.postMessage(JSON.stringify(i)),setTimeout(()=>{e.parentNode&&(e.textContent="Email sent!",e.style.background="rgba(0, 255, 0, 0.9)",setTimeout(()=>{e.parentNode&&e.remove()},2e3))},1e3)}catch(a){throw new Error("Failed to send message: "+a.message)}}else throw new Error("PluginMessageHandler not available")}catch{const o=document.createElement("div");o.textContent="Failed to send email",o.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 0, 0, 0.9);
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: bold;
      z-index: 100;
      pointer-events: none;
      max-width: 80%;
      text-align: center;
    `,document.body.appendChild(o),setTimeout(()=>{o.parentNode&&o.remove()},3e3)}}
