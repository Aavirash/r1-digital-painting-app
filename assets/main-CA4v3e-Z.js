(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let s,n,z=!1,w="brush",h="#FE5F00",S="#F2F2F2",u=5,b=0,T=[],I={x:0,y:0,z:0},p=1,E=[],A=4,q=0,x=null,N=0;const M=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function V(){s=document.getElementById("paintCanvas"),n=s.getContext("2d"),s.width=window.innerWidth,s.height=window.innerHeight,n.lineCap="round",n.lineJoin="round",n.fillStyle=S,n.fillRect(0,0,s.width,s.height),X()}function X(){E.push(n.getImageData(0,0,s.width,s.height)),E.length>20&&E.shift()}function j(){if(E.length>1){E.pop();const e=E[E.length-1];n.putImageData(e,0,0),Z()}}function Z(){const e=document.createElement("div");e.textContent="Undo",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},1e3)}function $(){n.fillStyle=S,n.fillRect(0,0,s.width,s.height),X(),y.prevPositions&&(y.prevPositions=[]),T.length=0}function f(e,t){n.fillStyle=h,n.strokeStyle=h,n.lineWidth=u*p,f.prevX!==null&&f.prevY!==null&&(n.beginPath(),n.moveTo(f.prevX,f.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,u*p*.5,0,Math.PI*2),n.fill(),f.prevX=e,f.prevY=t}function d(e,t){const o=s.width/2,i=s.height/2,a=12;n.fillStyle=h,n.strokeStyle=h,n.lineWidth=u*p*.5;for(let r=0;r<a;r++){const l=r*Math.PI*2/a,c=Math.cos(l),v=Math.sin(l),k=o+(e-o)*c-(t-i)*v,P=i+(e-o)*v+(t-i)*c,C=o+(o-k),B=i+(i-P);if(d.prevX!==null&&d.prevY!==null){const R=o+(d.prevX-o)*c-(d.prevY-i)*v,F=i+(d.prevX-o)*v+(d.prevY-i)*c,J=o+(o-R),K=i+(i-F);n.beginPath(),n.moveTo(R,F),n.lineTo(k,P),n.stroke(),n.beginPath(),n.moveTo(J,K),n.lineTo(C,B),n.stroke()}n.beginPath(),n.arc(k,P,u*p*.3,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(C,B,u*p*.3,0,Math.PI*2),n.fill()}d.prevX=e,d.prevY=t}function y(e,t){n.fillStyle=h,n.strokeStyle=h,n.lineWidth=u*p*.8;const o=s.width/2,i=s.height/2;y.prevPositions||(y.prevPositions=[]);const a=[];for(let r=0;r<A;r++){const l=r*Math.PI*2/A,c=Math.cos(l),v=Math.sin(l),k=o+(e-o)*c-(t-i)*v,P=i+(e-o)*v+(t-i)*c;a.push({x:k,y:P})}y.prevPositions.length===a.length&&z&&a.forEach((r,l)=>{const c=y.prevPositions[l];n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(r.x,r.y),n.stroke(),n.beginPath(),n.arc(r.x,r.y,u*p*.3,0,Math.PI*2),n.fill()}),y.prevPositions=a}function m(e,t){n.fillStyle=h,n.strokeStyle=h,n.lineWidth=u*p,m.prevX!==null&&m.prevY!==null&&(n.beginPath(),n.moveTo(m.prevX,m.prevY),n.lineTo(e,t),n.stroke()),m.prevX=e,m.prevY=t}function g(e,t){if(n.fillStyle=h,n.strokeStyle=h,n.lineWidth=u*p,g.prevX!==null&&g.prevY!==null&&(n.beginPath(),n.moveTo(g.prevX,g.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,u*p*.5,0,Math.PI*2),n.fill(),Math.random()<.1*p){const o=Math.floor(Math.random()*3)+1;for(let i=0;i<o;i++){const a=e+(Math.random()-.5)*u,r=u*(Math.random()*2+1)*p;n.beginPath(),n.moveTo(a,t),n.lineTo(a,t+r),n.stroke()}}g.prevX=e,g.prevY=t}f.prevX=null;f.prevY=null;d.prevX=null;d.prevY=null;y.prevPositions=[];m.prevX=null;m.prevY=null;g.prevX=null;g.prevY=null;function Q(){x||(x=new(window.AudioContext||window.webkitAudioContext))}function Y(e,t=1.5){if(!x)return;const o=x.currentTime,i=x.createOscillator(),a=x.createGain();i.connect(a),a.connect(x.destination),i.type="sine",i.frequency.value=e,a.gain.setValueAtTime(0,o),a.gain.linearRampToValueAtTime(.3,o+.1),a.gain.exponentialRampToValueAtTime(.01,o+t),i.start(o),i.stop(o+t)}function _(e,t){const o=["circle","triangle","square","pentagon","hexagon","star"],i=o[Math.floor(Math.random()*o.length)];return{x:e,y:t,type:i,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function O(e,t){const o=_(e,t);T.push(o);const a={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[o.type]||440;Y(a,1.5),N++,N%3===0&&(Y(a*1.25,1.5),Y(a*1.5,1.5))}function ee(){for(let t=T.length-1;t>=0;t--){const o=T[t];o.x+=I.x*.05,o.y+=I.y*.05,o.x<-o.size&&(o.x=s.width+o.size),o.x>s.width+o.size&&(o.x=-o.size),o.y<-o.size&&(o.y=s.height+o.size),o.y>s.height+o.size&&(o.y=-o.size),o.life-=o.decay,o.life<=0&&T.splice(t,1)}}function te(){T.forEach(e=>{switch(n.save(),n.globalAlpha=e.life,n.translate(e.x,e.y),n.rotate(e.rotation),n.strokeStyle=e.color,n.lineWidth=2,n.fillStyle=e.color.replace(")",", 0.2)").replace("hsl","hsla"),e.type){case"circle":n.beginPath(),n.arc(0,0,e.size,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,e.size*.5,0,Math.PI*2),n.stroke();break;case"triangle":n.beginPath();for(let t=0;t<3;t++){const o=t*Math.PI*2/3,i=Math.cos(o)*e.size,a=Math.sin(o)*e.size;t===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"square":n.beginPath(),n.rect(-e.size,-e.size,e.size*2,e.size*2),n.stroke(),n.beginPath(),n.moveTo(-e.size*.7,-e.size*.7),n.lineTo(e.size*.7,e.size*.7),n.moveTo(e.size*.7,-e.size*.7),n.lineTo(-e.size*.7,e.size*.7),n.stroke();break;case"pentagon":n.beginPath();for(let t=0;t<5;t++){const o=t*Math.PI*2/5-Math.PI/2,i=Math.cos(o)*e.size,a=Math.sin(o)*e.size;t===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"hexagon":n.beginPath();for(let t=0;t<6;t++){const o=t*Math.PI*2/6,i=Math.cos(o)*e.size,a=Math.sin(o)*e.size;t===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"star":n.beginPath();for(let t=0;t<10;t++){const o=t*Math.PI*2/10-Math.PI/2,i=t%2===0?e.size:e.size*.5,a=Math.cos(o)*i,r=Math.sin(o)*i;t===0?n.moveTo(a,r):n.lineTo(a,r)}n.closePath(),n.stroke();break}n.restore()}),n.globalAlpha=1}function H(){const e=document.getElementById("selectedTool");if(e){e.innerHTML=M[b].icon;const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),M[b].name==="llm"?(t.addEventListener("click",()=>{W()}),t.style.cursor="pointer"):t.style.cursor="default"}}function L(e){if(e>0?b=(b+1)%M.length:b=(b-1+M.length)%M.length,w=M[b].name,H(),w==="llm")ne();else switch(w){case"symmetry":A=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":Q();break}}function ne(){const e=document.getElementById("selectedTool");if(e){const t=document.createElement("div");if(t.style.cssText=`
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
      `,document.head.appendChild(o)}e.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},1500)}}function W(){if(typeof PluginMessageHandler<"u"){const e={message:'Give me creative drawing prompts or artistic inspiration in 2-3 sentences. Focus on visual ideas I can draw, like "Draw a tree with colorful leaves" or "Create a pattern of interlocking circles". Be encouraging and artistic.',useLLM:!0,wantsR1Response:!0};PluginMessageHandler.postMessage(JSON.stringify(e))}}function oe(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===S?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function ie(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===h?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function ae(e){S=e,n.fillStyle=S,n.fillRect(0,0,s.width,s.height),X(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",e)}function se(e){h=e,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",e)}function re(e){z=!0;const t=s.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(w==="sacred"){O(o,i);return}U(o,i)}function le(e){if(!z)return;const t=s.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(w==="sacred"){Math.random()<.3&&O(o,i);return}U(o,i)}function G(){z&&(z=!1,X(),f.prevX=null,f.prevY=null,d.prevX=null,d.prevY=null,m.prevX=null,m.prevY=null,g.prevX=null,g.prevY=null)}function U(e,t){switch(w){case"brush":f(e,t);break;case"kaleidoscope":d(e,t);break;case"symmetry":y(e,t);break;case"lines":m(e,t);break;case"drip":g(e,t);break}}function ce(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",a=>{a.accelerationIncludingGravity&&(I.x=a.accelerationIncludingGravity.x||0,I.y=a.accelerationIncludingGravity.y||0,I.z=a.accelerationIncludingGravity.z||0)});let e=0,t=0,o=0,i=15;window.addEventListener("devicemotion",a=>{if(a.accelerationIncludingGravity){const r=a.accelerationIncludingGravity.x||0,l=a.accelerationIncludingGravity.y||0,c=a.accelerationIncludingGravity.z||0,v=Math.abs(r-e),k=Math.abs(l-t),P=Math.abs(c-o);if(e=r,t=l,o=c,w!=="sacred"&&(v>i||k>i||P>i)){const C=Date.now();C-q>1e3&&(q=C,$())}}})}window.addEventListener("scrollUp",()=>{L(-1)});window.addEventListener("scrollDown",()=>{L(1)});window.addEventListener("sideClick",e=>(e&&(e.stopImmediatePropagation(),e.preventDefault()),D(),!1));document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"&&(L(-1),e.preventDefault()),e.key==="ArrowDown"&&(L(1),e.preventDefault()),e.key==="Enter"){if(M[b].name==="llm"){W();return}D(),e.preventDefault()}(e.key==="e"||e.key==="E")&&(D(),e.preventDefault())});window.onPluginMessage=function(e){return!1};function de(){V(),ce(),s.addEventListener("mousedown",re),s.addEventListener("mousemove",le),s.addEventListener("mouseup",G),s.addEventListener("mouseleave",G),s.addEventListener("touchstart",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousedown",{clientX:o.clientX,clientY:o.clientY});s.dispatchEvent(i)}),s.addEventListener("touchmove",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousemove",{clientX:o.clientX,clientY:o.clientY});s.dispatchEvent(i)}),s.addEventListener("touchend",t=>{t.preventDefault();const o=new MouseEvent("mouseup",{});s.dispatchEvent(o)}),document.getElementById("undoBtn").addEventListener("click",j),document.getElementById("canvasColorBtn").addEventListener("click",oe),document.getElementById("eyedropperBtn").addEventListener("click",ie),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(a=>a.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{ae(t.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(a=>a.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{se(t.dataset.color)},200)})}),H();function e(){ee(),te(),requestAnimationFrame(e)}e(),console.log("R1 Digital Painting App initialized with tool:",w)}document.addEventListener("DOMContentLoaded",de);function D(){try{const e=s.toDataURL("image/png");ue(e)}catch{const t=document.createElement("div");t.textContent="Failed to capture artwork",t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}}async function ue(e){try{const t=document.createElement("div");t.textContent="Sending email...",t.style.cssText=`
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
    `,document.body.appendChild(t);const o=e.split(",")[1];if(typeof PluginMessageHandler<"u"){const i={message:`Please send me an email with subject "Your Digital Artwork from R1 Digital Painting App". In the email body, include this message:

"Here is your digital artwork! To view the image:

1. Copy the base64 data below
2. Go to https://base64toimage.github.io/  
3. Paste the data and convert it to see your artwork

Base64 Data:
${o}

Enjoy your digital creation!"`,useLLM:!0,wantsR1Response:!1};try{PluginMessageHandler.postMessage(JSON.stringify(i)),setTimeout(()=>{t.parentNode&&(t.textContent="Email sent!",t.style.background="rgba(0, 255, 0, 0.9)",setTimeout(()=>{t.parentNode&&t.remove()},2e3))},1e3)}catch(a){throw new Error("Failed to send message: "+a.message)}}else throw new Error("PluginMessageHandler not available")}catch{const o=document.createElement("div");o.textContent="Failed to send email",o.style.cssText=`
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
