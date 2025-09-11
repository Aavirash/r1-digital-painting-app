(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let r,n,S=!1,w="brush",f="#FE5F00",I="#F2F2F2",u=5,b=0,C=[],L={x:0,y:0,z:0},p=1,M=[],X=4,N=0,P=null,O=0;const E=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function K(){r=document.getElementById("paintCanvas"),n=r.getContext("2d"),r.width=window.innerWidth,r.height=window.innerHeight,n.lineCap="round",n.lineJoin="round",n.fillStyle=I,n.fillRect(0,0,r.width,r.height),Y()}function Y(){M.push(n.getImageData(0,0,r.width,r.height)),M.length>20&&M.shift()}function J(){if(M.length>1){M.pop();const e=M[M.length-1];n.putImageData(e,0,0),Z()}}function Z(){const e=document.createElement("div");e.textContent="Undo",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},1e3)}function $(){n.fillStyle=I,n.fillRect(0,0,r.width,r.height),Y(),y.prevPositions&&(y.prevPositions=[]),C.length=0}function g(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,g.prevX!==null&&g.prevY!==null&&(n.beginPath(),n.moveTo(g.prevX,g.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,u*p*.5,0,Math.PI*2),n.fill(),g.prevX=e,g.prevY=t}function d(e,t){const o=r.width/2,i=r.height/2,s=12;n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.5;for(let a=0;a<s;a++){const l=a*Math.PI*2/s,c=Math.cos(l),v=Math.sin(l),k=o+(e-o)*c-(t-i)*v,x=i+(e-o)*v+(t-i)*c,T=o+(o-k),D=i+(i-x);if(d.prevX!==null&&d.prevY!==null){const B=o+(d.prevX-o)*c-(d.prevY-i)*v,R=i+(d.prevX-o)*v+(d.prevY-i)*c,W=o+(o-B),V=i+(i-R);n.beginPath(),n.moveTo(B,R),n.lineTo(k,x),n.stroke(),n.beginPath(),n.moveTo(W,V),n.lineTo(T,D),n.stroke()}n.beginPath(),n.arc(k,x,u*p*.3,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(T,D,u*p*.3,0,Math.PI*2),n.fill()}d.prevX=e,d.prevY=t}function y(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.8;const o=r.width/2,i=r.height/2;y.prevPositions||(y.prevPositions=[]);const s=[];for(let a=0;a<X;a++){const l=a*Math.PI*2/X,c=Math.cos(l),v=Math.sin(l),k=o+(e-o)*c-(t-i)*v,x=i+(e-o)*v+(t-i)*c;s.push({x:k,y:x})}y.prevPositions.length===s.length&&S&&s.forEach((a,l)=>{const c=y.prevPositions[l];n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(a.x,a.y),n.stroke(),n.beginPath(),n.arc(a.x,a.y,u*p*.3,0,Math.PI*2),n.fill()}),y.prevPositions=s}function m(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,m.prevX!==null&&m.prevY!==null&&(n.beginPath(),n.moveTo(m.prevX,m.prevY),n.lineTo(e,t),n.stroke()),m.prevX=e,m.prevY=t}function h(e,t){if(n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,h.prevX!==null&&h.prevY!==null&&(n.beginPath(),n.moveTo(h.prevX,h.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,u*p*.5,0,Math.PI*2),n.fill(),Math.random()<.1*p){const o=Math.floor(Math.random()*3)+1;for(let i=0;i<o;i++){const s=e+(Math.random()-.5)*u,a=u*(Math.random()*2+1)*p;n.beginPath(),n.moveTo(s,t),n.lineTo(s,t+a),n.stroke()}}h.prevX=e,h.prevY=t}g.prevX=null;g.prevY=null;d.prevX=null;d.prevY=null;y.prevPositions=[];m.prevX=null;m.prevY=null;h.prevX=null;h.prevY=null;function j(){P||(P=new(window.AudioContext||window.webkitAudioContext))}function A(e,t=1.5){if(!P)return;const o=P.currentTime,i=P.createOscillator(),s=P.createGain();i.connect(s),s.connect(P.destination),i.type="sine",i.frequency.value=e,s.gain.setValueAtTime(0,o),s.gain.linearRampToValueAtTime(.3,o+.1),s.gain.exponentialRampToValueAtTime(.01,o+t),i.start(o),i.stop(o+t)}function Q(e,t){const o=["circle","triangle","square","pentagon","hexagon","star"],i=o[Math.floor(Math.random()*o.length)];return{x:e,y:t,type:i,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function F(e,t){const o=Q(e,t);C.push(o);const s={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[o.type]||440;A(s,1.5),O++,O%3===0&&(A(s*1.25,1.5),A(s*1.5,1.5))}function _(){for(let t=C.length-1;t>=0;t--){const o=C[t];o.x+=L.x*.05,o.y+=L.y*.05,o.x<-o.size&&(o.x=r.width+o.size),o.x>r.width+o.size&&(o.x=-o.size),o.y<-o.size&&(o.y=r.height+o.size),o.y>r.height+o.size&&(o.y=-o.size),o.life-=o.decay,o.life<=0&&C.splice(t,1)}}function ee(){C.forEach(e=>{switch(n.save(),n.globalAlpha=e.life,n.translate(e.x,e.y),n.rotate(e.rotation),n.strokeStyle=e.color,n.lineWidth=2,n.fillStyle=e.color.replace(")",", 0.2)").replace("hsl","hsla"),e.type){case"circle":n.beginPath(),n.arc(0,0,e.size,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,e.size*.5,0,Math.PI*2),n.stroke();break;case"triangle":n.beginPath();for(let t=0;t<3;t++){const o=t*Math.PI*2/3,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"square":n.beginPath(),n.rect(-e.size,-e.size,e.size*2,e.size*2),n.stroke(),n.beginPath(),n.moveTo(-e.size*.7,-e.size*.7),n.lineTo(e.size*.7,e.size*.7),n.moveTo(e.size*.7,-e.size*.7),n.lineTo(-e.size*.7,e.size*.7),n.stroke();break;case"pentagon":n.beginPath();for(let t=0;t<5;t++){const o=t*Math.PI*2/5-Math.PI/2,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"hexagon":n.beginPath();for(let t=0;t<6;t++){const o=t*Math.PI*2/6,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"star":n.beginPath();for(let t=0;t<10;t++){const o=t*Math.PI*2/10-Math.PI/2,i=t%2===0?e.size:e.size*.5,s=Math.cos(o)*i,a=Math.sin(o)*i;t===0?n.moveTo(s,a):n.lineTo(s,a)}n.closePath(),n.stroke();break}n.restore()}),n.globalAlpha=1}function G(){const e=document.getElementById("selectedTool");e&&(e.innerHTML=E[b].icon)}function z(e){if(e>0?b=(b+1)%E.length:b=(b-1+E.length)%E.length,w=E[b].name,G(),w==="llm")te();else switch(w){case"symmetry":X=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":j();break}console.log(`Selected tool: ${E[b].label}`)}function te(){const e=document.getElementById("selectedTool");if(e){const t=document.createElement("div");if(t.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},2e3)}function oe(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===I?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function ie(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===f?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function se(e){I=e,n.fillStyle=I,n.fillRect(0,0,r.width,r.height),Y(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",e)}function re(e){f=e,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",e)}function ae(e){S=!0;const t=r.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(w==="sacred"){F(o,i);return}H(o,i)}function le(e){if(!S)return;const t=r.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(w==="sacred"){Math.random()<.3&&F(o,i);return}H(o,i)}function q(){S&&(S=!1,Y(),g.prevX=null,g.prevY=null,d.prevX=null,d.prevY=null,m.prevX=null,m.prevY=null,h.prevX=null,h.prevY=null)}function H(e,t){switch(w){case"brush":g(e,t);break;case"kaleidoscope":d(e,t);break;case"symmetry":y(e,t);break;case"lines":m(e,t);break;case"drip":h(e,t);break}}function ce(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",s=>{s.accelerationIncludingGravity&&(L.x=s.accelerationIncludingGravity.x||0,L.y=s.accelerationIncludingGravity.y||0,L.z=s.accelerationIncludingGravity.z||0)});let e=0,t=0,o=0,i=15;window.addEventListener("devicemotion",s=>{if(s.accelerationIncludingGravity){const a=s.accelerationIncludingGravity.x||0,l=s.accelerationIncludingGravity.y||0,c=s.accelerationIncludingGravity.z||0,v=Math.abs(a-e),k=Math.abs(l-t),x=Math.abs(c-o);if(e=a,t=l,o=c,w!=="sacred"&&(v>i||k>i||x>i)){const T=Date.now();T-N>1e3&&(N=T,$())}}})}window.addEventListener("scrollUp",()=>{z(-1)});window.addEventListener("scrollDown",()=>{z(1)});window.addEventListener("sideClick",()=>{U()});document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"&&(z(-1),e.preventDefault()),e.key==="ArrowDown"&&(z(1),e.preventDefault()),e.key==="Enter"){if(E[b].name==="llm"){ne();return}U(),e.preventDefault()}});function de(){K(),ce(),r.addEventListener("mousedown",ae),r.addEventListener("mousemove",le),r.addEventListener("mouseup",q),r.addEventListener("mouseleave",q),r.addEventListener("touchstart",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousedown",{clientX:o.clientX,clientY:o.clientY});r.dispatchEvent(i)}),r.addEventListener("touchmove",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousemove",{clientX:o.clientX,clientY:o.clientY});r.dispatchEvent(i)}),r.addEventListener("touchend",t=>{t.preventDefault();const o=new MouseEvent("mouseup",{});r.dispatchEvent(o)}),document.getElementById("undoBtn").addEventListener("click",J),document.getElementById("canvasColorBtn").addEventListener("click",oe),document.getElementById("eyedropperBtn").addEventListener("click",ie),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(s=>s.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{se(t.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(s=>s.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{re(t.dataset.color)},200)})}),G();function e(){_(),ee(),requestAnimationFrame(e)}e(),console.log("R1 Digital Painting App initialized with tool:",w)}document.addEventListener("DOMContentLoaded",de);window.handleLLMResponse=function(e){const t=document.getElementById("adviceText"),o=document.getElementById("adviceOverlay");t&&o&&(t.textContent=e,o.style.display="flex",setTimeout(()=>{o.style.display="none"},5e3))};window.onPluginMessage=function(e){if(console.log("Received plugin message:",e),e&&e.message){console.log("Processing message response:",e.message);const t=document.createElement("div");e.message.includes("sent")||e.message.includes("success")||e.message.includes("uploaded")?t.textContent="Artwork uploaded and email sent successfully!":e.message.includes("upload")||e.message.includes("Upload")?t.textContent="Uploading artwork...":e.message.includes("email")||e.message.includes("Email")?t.textContent="Sending email with artwork...":t.textContent="Status: "+e.message,t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}if(e&&(e.status||e.processing||e.working)){console.log("R1 system is processing request");const t=document.createElement("div");t.textContent="Processing artwork...",t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}return e&&typeof e.preventDefault=="function"&&e.preventDefault(),e&&typeof e.stopPropagation=="function"&&e.stopPropagation(),!1};typeof window<"u"&&(window.addEventListener("pluginMessage",function(e){if(console.log("Received pluginMessage event:",e.detail),e.detail&&e.detail.message){const t=document.createElement("div");t.textContent=e.detail.message.includes("sent")||e.detail.message.includes("success")?"Email sent successfully!":"Status: "+e.detail.message,t.style.cssText=`
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
      `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}e.stopImmediatePropagation(),e.preventDefault()},!0),window.addEventListener("beforeunload",function(e){return e.preventDefault(),e.returnValue="",""}),window.addEventListener("pagehide",function(e){return e.preventDefault(),!1}));document.addEventListener("click",e=>{const t=document.getElementById("adviceOverlay");t&&e.target===t&&(t.style.display="none")});function U(){const e=r.toDataURL("image/png");ue(e)}async function ue(e){try{const t=document.createElement("div");t.textContent="Processing artwork...",t.style.cssText=`
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
    `,document.body.appendChild(t);const o=e.split(",")[1];if(t.textContent="Sending artwork to LLM...",typeof PluginMessageHandler<"u"){const i={message:"SEND EMAIL ONLY - DO NOT CREATE ANY LINKS OR UPLOAD TO ANY SERVICE. Create an email with subject 'Your Digital Artwork from R1 Digital Painting App' and body 'Here is your digital artwork!' then attach the image data I'm providing as a PNG file attachment named 'artwork.png'.",imageBase64:o,useLLM:!0,wantsR1Response:!1};console.log("Sending base64 data to LLM for email with instructions");try{PluginMessageHandler.postMessage(JSON.stringify(i)),setTimeout(()=>{t.parentNode&&(t.textContent="Email request sent to LLM...",setTimeout(()=>{t.parentNode&&t.remove()},3e3))},1e3)}catch(s){throw console.error("Error posting message to PluginMessageHandler:",s),new Error("Failed to communicate with LLM")}}else throw new Error("PluginMessageHandler not available - not running in R1 environment")}catch(t){console.error("Error processing image:",t);let o="Failed to process artwork: ";t.message.includes("PluginMessageHandler")?o+="Not running in R1 environment":o+=t.message;const i=document.createElement("div");i.textContent=o,i.style.cssText=`
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
