(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let r,n,z=!1,w="brush",f="#FE5F00",I="#F2F2F2",u=5,b=0,C=[],L={x:0,y:0,z:0},p=1,E=[],B=4,q=0,P=null,N=0;const M=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function V(){r=document.getElementById("paintCanvas"),n=r.getContext("2d"),r.width=window.innerWidth,r.height=window.innerHeight,n.lineCap="round",n.lineJoin="round",n.fillStyle=I,n.fillRect(0,0,r.width,r.height),X()}function X(){E.push(n.getImageData(0,0,r.width,r.height)),E.length>20&&E.shift()}function Z(){if(E.length>1){E.pop();const t=E[E.length-1];n.putImageData(t,0,0),j()}}function j(){const t=document.createElement("div");t.textContent="Undo",t.style.cssText=`
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
  `,document.body.appendChild(t),setTimeout(()=>{t.remove()},1e3)}function $(){n.fillStyle=I,n.fillRect(0,0,r.width,r.height),X(),y.prevPositions&&(y.prevPositions=[]),C.length=0}function h(t,e){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,h.prevX!==null&&h.prevY!==null&&(n.beginPath(),n.moveTo(h.prevX,h.prevY),n.lineTo(t,e),n.stroke()),n.beginPath(),n.arc(t,e,u*p*.5,0,Math.PI*2),n.fill(),h.prevX=t,h.prevY=e}function d(t,e){const o=r.width/2,i=r.height/2,s=12;n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.5;for(let a=0;a<s;a++){const l=a*Math.PI*2/s,c=Math.cos(l),v=Math.sin(l),k=o+(t-o)*c-(e-i)*v,x=i+(t-o)*v+(e-i)*c,T=o+(o-k),D=i+(i-x);if(d.prevX!==null&&d.prevY!==null){const R=o+(d.prevX-o)*c-(d.prevY-i)*v,F=i+(d.prevX-o)*v+(d.prevY-i)*c,J=o+(o-R),K=i+(i-F);n.beginPath(),n.moveTo(R,F),n.lineTo(k,x),n.stroke(),n.beginPath(),n.moveTo(J,K),n.lineTo(T,D),n.stroke()}n.beginPath(),n.arc(k,x,u*p*.3,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(T,D,u*p*.3,0,Math.PI*2),n.fill()}d.prevX=t,d.prevY=e}function y(t,e){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.8;const o=r.width/2,i=r.height/2;y.prevPositions||(y.prevPositions=[]);const s=[];for(let a=0;a<B;a++){const l=a*Math.PI*2/B,c=Math.cos(l),v=Math.sin(l),k=o+(t-o)*c-(e-i)*v,x=i+(t-o)*v+(e-i)*c;s.push({x:k,y:x})}y.prevPositions.length===s.length&&z&&s.forEach((a,l)=>{const c=y.prevPositions[l];n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(a.x,a.y),n.stroke(),n.beginPath(),n.arc(a.x,a.y,u*p*.3,0,Math.PI*2),n.fill()}),y.prevPositions=s}function m(t,e){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,m.prevX!==null&&m.prevY!==null&&(n.beginPath(),n.moveTo(m.prevX,m.prevY),n.lineTo(t,e),n.stroke()),m.prevX=t,m.prevY=e}function g(t,e){if(n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,g.prevX!==null&&g.prevY!==null&&(n.beginPath(),n.moveTo(g.prevX,g.prevY),n.lineTo(t,e),n.stroke()),n.beginPath(),n.arc(t,e,u*p*.5,0,Math.PI*2),n.fill(),Math.random()<.1*p){const o=Math.floor(Math.random()*3)+1;for(let i=0;i<o;i++){const s=t+(Math.random()-.5)*u,a=u*(Math.random()*2+1)*p;n.beginPath(),n.moveTo(s,e),n.lineTo(s,e+a),n.stroke()}}g.prevX=t,g.prevY=e}h.prevX=null;h.prevY=null;d.prevX=null;d.prevY=null;y.prevPositions=[];m.prevX=null;m.prevY=null;g.prevX=null;g.prevY=null;function Q(){P||(P=new(window.AudioContext||window.webkitAudioContext))}function Y(t,e=1.5){if(!P)return;const o=P.currentTime,i=P.createOscillator(),s=P.createGain();i.connect(s),s.connect(P.destination),i.type="sine",i.frequency.value=t,s.gain.setValueAtTime(0,o),s.gain.linearRampToValueAtTime(.3,o+.1),s.gain.exponentialRampToValueAtTime(.01,o+e),i.start(o),i.stop(o+e)}function _(t,e){const o=["circle","triangle","square","pentagon","hexagon","star"],i=o[Math.floor(Math.random()*o.length)];return{x:t,y:e,type:i,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function G(t,e){const o=_(t,e);C.push(o);const s={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[o.type]||440;Y(s,1.5),N++,N%3===0&&(Y(s*1.25,1.5),Y(s*1.5,1.5))}function ee(){for(let e=C.length-1;e>=0;e--){const o=C[e];o.x+=L.x*.05,o.y+=L.y*.05,o.x<-o.size&&(o.x=r.width+o.size),o.x>r.width+o.size&&(o.x=-o.size),o.y<-o.size&&(o.y=r.height+o.size),o.y>r.height+o.size&&(o.y=-o.size),o.life-=o.decay,o.life<=0&&C.splice(e,1)}}function te(){C.forEach(t=>{switch(n.save(),n.globalAlpha=t.life,n.translate(t.x,t.y),n.rotate(t.rotation),n.strokeStyle=t.color,n.lineWidth=2,n.fillStyle=t.color.replace(")",", 0.2)").replace("hsl","hsla"),t.type){case"circle":n.beginPath(),n.arc(0,0,t.size,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,t.size*.5,0,Math.PI*2),n.stroke();break;case"triangle":n.beginPath();for(let e=0;e<3;e++){const o=e*Math.PI*2/3,i=Math.cos(o)*t.size,s=Math.sin(o)*t.size;e===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"square":n.beginPath(),n.rect(-t.size,-t.size,t.size*2,t.size*2),n.stroke(),n.beginPath(),n.moveTo(-t.size*.7,-t.size*.7),n.lineTo(t.size*.7,t.size*.7),n.moveTo(t.size*.7,-t.size*.7),n.lineTo(-t.size*.7,t.size*.7),n.stroke();break;case"pentagon":n.beginPath();for(let e=0;e<5;e++){const o=e*Math.PI*2/5-Math.PI/2,i=Math.cos(o)*t.size,s=Math.sin(o)*t.size;e===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"hexagon":n.beginPath();for(let e=0;e<6;e++){const o=e*Math.PI*2/6,i=Math.cos(o)*t.size,s=Math.sin(o)*t.size;e===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"star":n.beginPath();for(let e=0;e<10;e++){const o=e*Math.PI*2/10-Math.PI/2,i=e%2===0?t.size:t.size*.5,s=Math.cos(o)*i,a=Math.sin(o)*i;e===0?n.moveTo(s,a):n.lineTo(s,a)}n.closePath(),n.stroke();break}n.restore()}),n.globalAlpha=1}function H(){const t=document.getElementById("selectedTool");if(t){t.innerHTML=M[b].icon;const e=t.cloneNode(!0);t.parentNode.replaceChild(e,t),M[b].name==="llm"?(e.addEventListener("click",()=>{U()}),e.style.cursor="pointer"):e.style.cursor="default"}}function S(t){if(t>0?b=(b+1)%M.length:b=(b-1+M.length)%M.length,w=M[b].name,H(),w==="llm")ne();else switch(w){case"symmetry":B=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":Q();break}}function ne(){const t=document.getElementById("selectedTool");if(t){const e=document.createElement("div");if(e.style.cssText=`
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
      `,document.head.appendChild(o)}t.appendChild(e),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},1500)}}function U(){if(typeof PluginMessageHandler<"u"){const e={message:'Give me creative drawing prompts or artistic inspiration in 2-3 sentences. Focus on visual ideas I can draw, like "Draw a tree with colorful leaves" or "Create a pattern of interlocking circles". Be encouraging and artistic.',useLLM:!0,wantsR1Response:!0};PluginMessageHandler.postMessage(JSON.stringify(e))}const t=document.createElement("div");t.textContent="Asking LLM for creative ideas...",t.style.cssText=`
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
  `,document.body.appendChild(t),setTimeout(()=>{t.remove()},2e3)}function oe(){const t=document.getElementById("canvasColorPicker"),e=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===I?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function ie(){const t=document.getElementById("canvasColorPicker"),e=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===f?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function se(t){I=t,n.fillStyle=I,n.fillRect(0,0,r.width,r.height),X(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",t)}function re(t){f=t,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",t)}function ae(t){z=!0;const e=r.getBoundingClientRect(),o=t.clientX-e.left,i=t.clientY-e.top;if(w==="sacred"){G(o,i);return}W(o,i)}function le(t){if(!z)return;const e=r.getBoundingClientRect(),o=t.clientX-e.left,i=t.clientY-e.top;if(w==="sacred"){Math.random()<.3&&G(o,i);return}W(o,i)}function O(){z&&(z=!1,X(),h.prevX=null,h.prevY=null,d.prevX=null,d.prevY=null,m.prevX=null,m.prevY=null,g.prevX=null,g.prevY=null)}function W(t,e){switch(w){case"brush":h(t,e);break;case"kaleidoscope":d(t,e);break;case"symmetry":y(t,e);break;case"lines":m(t,e);break;case"drip":g(t,e);break}}function ce(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",s=>{s.accelerationIncludingGravity&&(L.x=s.accelerationIncludingGravity.x||0,L.y=s.accelerationIncludingGravity.y||0,L.z=s.accelerationIncludingGravity.z||0)});let t=0,e=0,o=0,i=15;window.addEventListener("devicemotion",s=>{if(s.accelerationIncludingGravity){const a=s.accelerationIncludingGravity.x||0,l=s.accelerationIncludingGravity.y||0,c=s.accelerationIncludingGravity.z||0,v=Math.abs(a-t),k=Math.abs(l-e),x=Math.abs(c-o);if(t=a,e=l,o=c,w!=="sacred"&&(v>i||k>i||x>i)){const T=Date.now();T-q>1e3&&(q=T,$())}}})}window.addEventListener("scrollUp",()=>{S(-1)});window.addEventListener("scrollDown",()=>{S(1)});window.addEventListener("sideClick",t=>(t&&(t.stopImmediatePropagation(),t.preventDefault()),A(),!1));document.addEventListener("keydown",t=>{if(t.key==="ArrowUp"&&(S(-1),t.preventDefault()),t.key==="ArrowDown"&&(S(1),t.preventDefault()),t.key==="Enter"){if(M[b].name==="llm"){U();return}A(),t.preventDefault()}(t.key==="e"||t.key==="E")&&(A(),t.preventDefault())});window.onPluginMessage=function(t){if(t&&(t.message||t.data)){const e=t.message||t.data;if(e.toLowerCase().includes("email")&&(e.toLowerCase().includes("sent")||e.toLowerCase().includes("sending")||e.toLowerCase().includes("delivered"))){const o=document.createElement("div");o.textContent="Email sent successfully!",o.style.cssText=`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 255, 0, 0.9);
        color: #000;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        z-index: 100;
        pointer-events: none;
      `,document.body.appendChild(o),setTimeout(()=>{o.parentNode&&o.remove()},3e3)}else window.handleLLMResponse(e)}return!1};function de(){V(),ce(),r.addEventListener("mousedown",ae),r.addEventListener("mousemove",le),r.addEventListener("mouseup",O),r.addEventListener("mouseleave",O),r.addEventListener("touchstart",e=>{e.preventDefault();const o=e.touches[0],i=new MouseEvent("mousedown",{clientX:o.clientX,clientY:o.clientY});r.dispatchEvent(i)}),r.addEventListener("touchmove",e=>{e.preventDefault();const o=e.touches[0],i=new MouseEvent("mousemove",{clientX:o.clientX,clientY:o.clientY});r.dispatchEvent(i)}),r.addEventListener("touchend",e=>{e.preventDefault();const o=new MouseEvent("mouseup",{});r.dispatchEvent(o)}),document.getElementById("undoBtn").addEventListener("click",Z),document.getElementById("canvasColorBtn").addEventListener("click",oe),document.getElementById("eyedropperBtn").addEventListener("click",ie),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(e=>{e.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(s=>s.classList.remove("selected-color")),e.classList.add("selected-color"),setTimeout(()=>{se(e.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(e=>{e.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(s=>s.classList.remove("selected-color")),e.classList.add("selected-color"),setTimeout(()=>{re(e.dataset.color)},200)})}),H();function t(){ee(),te(),requestAnimationFrame(t)}t(),console.log("R1 Digital Painting App initialized with tool:",w)}document.addEventListener("DOMContentLoaded",de);window.handleLLMResponse=function(t){const e=document.getElementById("adviceText"),o=document.getElementById("adviceOverlay");e&&o&&(e.textContent=t,o.style.display="flex",setTimeout(()=>{o.style.display="none"},5e3))};document.addEventListener("click",t=>{const e=document.getElementById("adviceOverlay");e&&t.target===e&&(e.style.display="none")});function A(){try{const t=r.toDataURL("image/png");ue(t)}catch{const e=document.createElement("div");e.textContent="Failed to capture artwork",e.style.cssText=`
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
    `,document.body.appendChild(e),setTimeout(()=>{e.parentNode&&e.remove()},5e3)}}async function ue(t){try{const e=document.createElement("div");e.textContent="Sending email...",e.style.cssText=`
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
    `,document.body.appendChild(e);const o=t.split(",")[1];if(typeof PluginMessageHandler<"u"){const i={message:"Send me an email with my digital artwork. Subject: 'Your Digital Artwork from R1 Digital Painting App'. Include the artwork image and this converter URL in the email: https://base64toimage.github.io/",imageBase64:o,useLLM:!0,wantsR1Response:!0};try{PluginMessageHandler.postMessage(JSON.stringify(i)),setTimeout(()=>{e.parentNode&&(e.textContent="Email request sent!",e.style.background="rgba(0, 255, 0, 0.9)",setTimeout(()=>{e.parentNode&&e.remove()},2e3))},500)}catch(s){throw new Error("Failed to send message: "+s.message)}}else throw new Error("PluginMessageHandler not available")}catch(e){console.error("Error processing image:",e);let o="Failed to process artwork: ";e.message.includes("PluginMessageHandler")?o+="Not running in R1 environment":o+=e.message;const i=document.createElement("div");i.textContent=o,i.style.cssText=`
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
    `,document.body.appendChild(i),setTimeout(()=>{i.parentNode&&i.remove()},5e3)}}
