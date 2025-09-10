(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let r,n,S=!1,w="brush",h="#FE5F00",L="#F2F2F2",f=5,x=0,T=[],z={x:0,y:0,z:0},m=1,C=[],Y=4,F=0,E=null,q=0;const P=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function $(){r=document.getElementById("paintCanvas"),n=r.getContext("2d"),r.width=window.innerWidth,r.height=window.innerHeight,n.lineCap="round",n.lineJoin="round",n.fillStyle=L,n.fillRect(0,0,r.width,r.height),X()}function X(){C.push(n.getImageData(0,0,r.width,r.height)),C.length>20&&C.shift()}function J(){if(C.length>1){C.pop();const e=C[C.length-1];n.putImageData(e,0,0),K()}}function K(){const e=document.createElement("div");e.textContent="Undo",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},1e3)}function Z(){n.fillStyle=L,n.fillRect(0,0,r.width,r.height),X(),b.prevPositions&&(b.prevPositions=[]),T.length=0}function g(e,t){n.fillStyle=h,n.strokeStyle=h,n.lineWidth=f*m,g.prevX!==null&&g.prevY!==null&&(n.beginPath(),n.moveTo(g.prevX,g.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,f*m*.5,0,Math.PI*2),n.fill(),g.prevX=e,g.prevY=t}function p(e,t){const o=r.width/2,i=r.height/2,s=12;n.fillStyle=h,n.strokeStyle=h,n.lineWidth=f*m*.5;for(let a=0;a<s;a++){const l=a*Math.PI*2/s,c=Math.cos(l),d=Math.sin(l),u=o+(e-o)*c-(t-i)*d,k=i+(e-o)*d+(t-i)*c,M=o+(o-u),R=i+(i-k);if(p.prevX!==null&&p.prevY!==null){const A=o+(p.prevX-o)*c-(p.prevY-i)*d,D=i+(p.prevX-o)*d+(p.prevY-i)*c,W=o+(o-A),V=i+(i-D);n.beginPath(),n.moveTo(A,D),n.lineTo(u,k),n.stroke(),n.beginPath(),n.moveTo(W,V),n.lineTo(M,R),n.stroke()}n.beginPath(),n.arc(u,k,f*m*.3,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(M,R,f*m*.3,0,Math.PI*2),n.fill()}p.prevX=e,p.prevY=t}function b(e,t){n.fillStyle=h,n.strokeStyle=h,n.lineWidth=f*m*.8;const o=r.width/2,i=r.height/2;b.prevPositions||(b.prevPositions=[]);const s=[];for(let a=0;a<Y;a++){const l=a*Math.PI*2/Y,c=Math.cos(l),d=Math.sin(l),u=o+(e-o)*c-(t-i)*d,k=i+(e-o)*d+(t-i)*c;s.push({x:u,y:k})}b.prevPositions.length===s.length&&S&&s.forEach((a,l)=>{const c=b.prevPositions[l];n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(a.x,a.y),n.stroke(),n.beginPath(),n.arc(a.x,a.y,f*m*.3,0,Math.PI*2),n.fill()}),b.prevPositions=s}function v(e,t){n.fillStyle=h,n.strokeStyle=h,n.lineWidth=f*m,v.prevX!==null&&v.prevY!==null&&(n.beginPath(),n.moveTo(v.prevX,v.prevY),n.lineTo(e,t),n.stroke()),v.prevX=e,v.prevY=t}function y(e,t){if(n.fillStyle=h,n.strokeStyle=h,n.lineWidth=f*m,y.prevX!==null&&y.prevY!==null&&(n.beginPath(),n.moveTo(y.prevX,y.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,f*m*.5,0,Math.PI*2),n.fill(),Math.random()<.1*m){const o=Math.floor(Math.random()*3)+1;for(let i=0;i<o;i++){const s=e+(Math.random()-.5)*f,a=f*(Math.random()*2+1)*m;n.beginPath(),n.moveTo(s,t),n.lineTo(s,t+a),n.stroke()}}y.prevX=e,y.prevY=t}g.prevX=null;g.prevY=null;p.prevX=null;p.prevY=null;b.prevPositions=[];v.prevX=null;v.prevY=null;y.prevX=null;y.prevY=null;function j(){E||(E=new(window.AudioContext||window.webkitAudioContext))}function B(e,t=1.5){if(!E)return;const o=E.currentTime,i=E.createOscillator(),s=E.createGain();i.connect(s),s.connect(E.destination),i.type="sine",i.frequency.value=e,s.gain.setValueAtTime(0,o),s.gain.linearRampToValueAtTime(.3,o+.1),s.gain.exponentialRampToValueAtTime(.01,o+t),i.start(o),i.stop(o+t)}function _(e,t){const o=["circle","triangle","square","pentagon","hexagon","star"],i=o[Math.floor(Math.random()*o.length)];return{x:e,y:t,type:i,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function O(e,t){const o=_(e,t);T.push(o);const s={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[o.type]||440;B(s,1.5),q++,q%3===0&&(B(s*1.25,1.5),B(s*1.5,1.5))}function Q(){for(let t=T.length-1;t>=0;t--){const o=T[t];o.x+=z.x*.05,o.y+=z.y*.05,o.x<-o.size&&(o.x=r.width+o.size),o.x>r.width+o.size&&(o.x=-o.size),o.y<-o.size&&(o.y=r.height+o.size),o.y>r.height+o.size&&(o.y=-o.size),o.life-=o.decay,o.life<=0&&T.splice(t,1)}}function ee(){T.forEach(e=>{switch(n.save(),n.globalAlpha=e.life,n.translate(e.x,e.y),n.rotate(e.rotation),n.strokeStyle=e.color,n.lineWidth=2,n.fillStyle=e.color.replace(")",", 0.2)").replace("hsl","hsla"),e.type){case"circle":n.beginPath(),n.arc(0,0,e.size,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,e.size*.5,0,Math.PI*2),n.stroke();break;case"triangle":n.beginPath();for(let t=0;t<3;t++){const o=t*Math.PI*2/3,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"square":n.beginPath(),n.rect(-e.size,-e.size,e.size*2,e.size*2),n.stroke(),n.beginPath(),n.moveTo(-e.size*.7,-e.size*.7),n.lineTo(e.size*.7,e.size*.7),n.moveTo(e.size*.7,-e.size*.7),n.lineTo(-e.size*.7,e.size*.7),n.stroke();break;case"pentagon":n.beginPath();for(let t=0;t<5;t++){const o=t*Math.PI*2/5-Math.PI/2,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"hexagon":n.beginPath();for(let t=0;t<6;t++){const o=t*Math.PI*2/6,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"star":n.beginPath();for(let t=0;t<10;t++){const o=t*Math.PI*2/10-Math.PI/2,i=t%2===0?e.size:e.size*.5,s=Math.cos(o)*i,a=Math.sin(o)*i;t===0?n.moveTo(s,a):n.lineTo(s,a)}n.closePath(),n.stroke();break}n.restore()}),n.globalAlpha=1}function G(){const e=document.getElementById("selectedTool");e&&(e.innerHTML=P[x].icon)}function I(e){if(e>0?x=(x+1)%P.length:x=(x-1+P.length)%P.length,w=P[x].name,G(),w==="llm")te();else switch(w){case"symmetry":Y=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":j();break}console.log(`Selected tool: ${P[x].label}`)}function te(){const e=document.getElementById("selectedTool");if(e){const t=document.createElement("div");if(t.style.cssText=`
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
      `,document.head.appendChild(o)}e.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},1500)}}function ne(){if(typeof PluginMessageHandler<"u"){const t={message:'Give me creative drawing prompts or artistic inspiration in 2-3 sentences. Focus on visual ideas I can draw, like "Draw a tree with colorful leaves" or "Create a pattern of interlocking circles". Be encouraging and artistic.',useLLM:!0,wantsR1Response:!0};PluginMessageHandler.postMessage(JSON.stringify(t))}const e=document.createElement("div");e.textContent="Asking LLM for creative ideas...",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},2e3)}function oe(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===L?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function ie(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===h?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function se(e){L=e,n.fillStyle=L,n.fillRect(0,0,r.width,r.height),X(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",e)}function ae(e){h=e,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",e)}function re(e){S=!0;const t=r.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(w==="sacred"){O(o,i);return}H(o,i)}function le(e){if(!S)return;const t=r.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(w==="sacred"){Math.random()<.3&&O(o,i);return}H(o,i)}function N(){S&&(S=!1,X(),g.prevX=null,g.prevY=null,p.prevX=null,p.prevY=null,v.prevX=null,v.prevY=null,y.prevX=null,y.prevY=null)}function H(e,t){switch(w){case"brush":g(e,t);break;case"kaleidoscope":p(e,t);break;case"symmetry":b(e,t);break;case"lines":v(e,t);break;case"drip":y(e,t);break}}function ce(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",s=>{s.accelerationIncludingGravity&&(z.x=s.accelerationIncludingGravity.x||0,z.y=s.accelerationIncludingGravity.y||0,z.z=s.accelerationIncludingGravity.z||0)});let e=0,t=0,o=0,i=15;window.addEventListener("devicemotion",s=>{if(s.accelerationIncludingGravity){const a=s.accelerationIncludingGravity.x||0,l=s.accelerationIncludingGravity.y||0,c=s.accelerationIncludingGravity.z||0,d=Math.abs(a-e),u=Math.abs(l-t),k=Math.abs(c-o);if(e=a,t=l,o=c,w!=="sacred"&&(d>i||u>i||k>i)){const M=Date.now();M-F>1e3&&(F=M,Z())}}})}window.addEventListener("scrollUp",()=>{I(-1)});window.addEventListener("scrollDown",()=>{I(1)});window.addEventListener("sideClick",()=>{U()});document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"&&(I(-1),e.preventDefault()),e.key==="ArrowDown"&&(I(1),e.preventDefault()),e.key==="Enter"){if(P[x].name==="llm"){ne();return}U(),e.preventDefault()}});function de(){$(),ce(),r.addEventListener("mousedown",re),r.addEventListener("mousemove",le),r.addEventListener("mouseup",N),r.addEventListener("mouseleave",N),r.addEventListener("touchstart",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousedown",{clientX:o.clientX,clientY:o.clientY});r.dispatchEvent(i)}),r.addEventListener("touchmove",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousemove",{clientX:o.clientX,clientY:o.clientY});r.dispatchEvent(i)}),r.addEventListener("touchend",t=>{t.preventDefault();const o=new MouseEvent("mouseup",{});r.dispatchEvent(o)}),document.getElementById("undoBtn").addEventListener("click",J),document.getElementById("canvasColorBtn").addEventListener("click",oe),document.getElementById("eyedropperBtn").addEventListener("click",ie),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(s=>s.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{se(t.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(s=>s.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{ae(t.dataset.color)},200)})}),G();function e(){Q(),ee(),requestAnimationFrame(e)}e(),console.log("R1 Digital Painting App initialized with tool:",w)}document.addEventListener("DOMContentLoaded",de);window.handleLLMResponse=function(e){const t=document.getElementById("adviceText"),o=document.getElementById("adviceOverlay");t&&o&&(t.textContent=e,o.style.display="flex",setTimeout(()=>{o.style.display="none"},5e3))};window.onPluginMessage=function(e){if(console.log("Received plugin message:",e),e&&e.message){console.log("Processing message response:",e.message);const t=document.createElement("div");t.textContent=e.message.includes("sent")||e.message.includes("success")?"Email sent successfully!":"Status: "+e.message,t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}if(e&&e.request&&e.request==="base64_data"){console.log("R1 system is requesting base64 data");const t=document.createElement("div");t.textContent="R1 system is processing your artwork...",t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}return e&&typeof e.preventDefault=="function"&&e.preventDefault(),!1};typeof window<"u"&&window.addEventListener("pluginMessage",function(e){if(console.log("Received pluginMessage event:",e.detail),e.detail&&e.detail.message){const t=document.createElement("div");t.textContent=e.detail.message.includes("sent")||e.detail.message.includes("success")?"Email sent successfully!":"Status: "+e.detail.message,t.style.cssText=`
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
      `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}});document.addEventListener("click",e=>{const t=document.getElementById("adviceOverlay");t&&e.target===t&&(t.style.display="none")});function U(){const e=r.toDataURL("image/png");ue(e)}function ue(e){const t=document.createElement("div");t.id="emailOverlay",t.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;const o=document.createElement("div");o.style.cssText=`
    background: #1a1a2e;
    border: 2px solid #FE5F00;
    border-radius: 10px;
    padding: 20px;
    width: 80%;
    max-width: 200px;
  `;const i=document.createElement("div");i.textContent="Enter your email:",i.style.cssText=`
    color: white;
    font-size: 14px;
    margin-bottom: 15px;
    text-align: center;
  `;const s=document.createElement("input");s.type="email",s.placeholder="your@email.com",s.style.cssText=`
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #FE5F00;
    border-radius: 5px;
    background: #2a2a4a;
    color: white;
    font-size: 12px;
  `;const a=document.createElement("div");a.style.cssText=`
    display: flex;
    gap: 10px;
  `;const l=document.createElement("button");l.textContent="Send",l.style.cssText=`
    flex: 1;
    padding: 8px;
    background: #FE5F00;
    color: black;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  `;const c=document.createElement("button");c.textContent="Cancel",c.style.cssText=`
    flex: 1;
    padding: 8px;
    background: #2a2a4a;
    color: white;
    border: 1px solid #FE5F00;
    border-radius: 5px;
    cursor: pointer;
  `,l.addEventListener("click",()=>{const d=s.value.trim();if(d&&pe(d))t.remove(),fe(e,d);else{const u=document.createElement("div");u.textContent="Please enter a valid email",u.style.cssText=`
        color: #ff4444;
        font-size: 10px;
        margin-top: 5px;
        text-align: center;
      `,o.appendChild(u),setTimeout(()=>{u.parentNode&&u.remove()},2e3)}}),c.addEventListener("click",()=>{t.remove()}),a.appendChild(l),a.appendChild(c),o.appendChild(i),o.appendChild(s),o.appendChild(a),t.appendChild(o),document.body.appendChild(t),s.focus()}function pe(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}async function fe(e,t){try{const o=document.createElement("div");o.textContent="Sending artwork to R1 system...",o.style.cssText=`
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
    `,document.body.appendChild(o);const i=e.split(",")[1];if(typeof PluginMessageHandler<"u"){const s={message:`Please upload this artwork to a public hosting service and send an email to ${t} with the artwork URL. The artwork is attached as base64 data in the imageBase64 field.`,imageBase64:i,recipientEmail:t,useLLM:!0,wantsR1Response:!0,action:"uploadAndEmailArtwork",imageFormat:"png"};console.log("Sending image to R1 system for upload and email processing"),console.log("Base64 data length:",i?i.length:"undefined");try{PluginMessageHandler.postMessage(JSON.stringify(s)),setTimeout(()=>{o.parentNode&&(o.textContent="Artwork sent to R1 system for processing!",setTimeout(()=>{o.parentNode&&o.remove()},3e3))},1e3)}catch(a){throw console.error("Error posting message to PluginMessageHandler:",a),new Error("Failed to communicate with R1 system")}}else throw new Error("PluginMessageHandler not available - not running in R1 environment")}catch(o){console.error("Error sending image to R1 system:",o);let i="Failed to send artwork: ";o.message.includes("PluginMessageHandler")?i+="Not running in R1 environment":i+=o.message;const s=document.createElement("div");s.textContent=i,s.style.cssText=`
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
    `,document.body.appendChild(s),setTimeout(()=>{s.parentNode&&s.remove()},5e3)}}
