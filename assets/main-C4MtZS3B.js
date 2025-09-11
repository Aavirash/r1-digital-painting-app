(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let l,o,z=!1,w="brush",g="#FE5F00",S="#F2F2F2",m=5,x=0,M=[],L={x:0,y:0,z:0},f=1,C=[],B=4,F=0,E=null,q=0;const P=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function V(){l=document.getElementById("paintCanvas"),o=l.getContext("2d"),l.width=window.innerWidth,l.height=window.innerHeight,o.lineCap="round",o.lineJoin="round",o.fillStyle=S,o.fillRect(0,0,l.width,l.height),X()}function X(){C.push(o.getImageData(0,0,l.width,l.height)),C.length>20&&C.shift()}function J(){if(C.length>1){C.pop();const e=C[C.length-1];o.putImageData(e,0,0),K()}}function K(){const e=document.createElement("div");e.textContent="Undo",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},1e3)}function Z(){o.fillStyle=S,o.fillRect(0,0,l.width,l.height),X(),b.prevPositions&&(b.prevPositions=[]),M.length=0}function h(e,t){o.fillStyle=g,o.strokeStyle=g,o.lineWidth=m*f,h.prevX!==null&&h.prevY!==null&&(o.beginPath(),o.moveTo(h.prevX,h.prevY),o.lineTo(e,t),o.stroke()),o.beginPath(),o.arc(e,t,m*f*.5,0,Math.PI*2),o.fill(),h.prevX=e,h.prevY=t}function p(e,t){const n=l.width/2,s=l.height/2,i=12;o.fillStyle=g,o.strokeStyle=g,o.lineWidth=m*f*.5;for(let r=0;r<i;r++){const a=r*Math.PI*2/i,c=Math.cos(a),d=Math.sin(a),u=n+(e-n)*c-(t-s)*d,k=s+(e-n)*d+(t-s)*c,T=n+(n-u),R=s+(s-k);if(p.prevX!==null&&p.prevY!==null){const A=n+(p.prevX-n)*c-(p.prevY-s)*d,D=s+(p.prevX-n)*d+(p.prevY-s)*c,W=n+(n-A),$=s+(s-D);o.beginPath(),o.moveTo(A,D),o.lineTo(u,k),o.stroke(),o.beginPath(),o.moveTo(W,$),o.lineTo(T,R),o.stroke()}o.beginPath(),o.arc(u,k,m*f*.3,0,Math.PI*2),o.fill(),o.beginPath(),o.arc(T,R,m*f*.3,0,Math.PI*2),o.fill()}p.prevX=e,p.prevY=t}function b(e,t){o.fillStyle=g,o.strokeStyle=g,o.lineWidth=m*f*.8;const n=l.width/2,s=l.height/2;b.prevPositions||(b.prevPositions=[]);const i=[];for(let r=0;r<B;r++){const a=r*Math.PI*2/B,c=Math.cos(a),d=Math.sin(a),u=n+(e-n)*c-(t-s)*d,k=s+(e-n)*d+(t-s)*c;i.push({x:u,y:k})}b.prevPositions.length===i.length&&z&&i.forEach((r,a)=>{const c=b.prevPositions[a];o.beginPath(),o.moveTo(c.x,c.y),o.lineTo(r.x,r.y),o.stroke(),o.beginPath(),o.arc(r.x,r.y,m*f*.3,0,Math.PI*2),o.fill()}),b.prevPositions=i}function v(e,t){o.fillStyle=g,o.strokeStyle=g,o.lineWidth=m*f,v.prevX!==null&&v.prevY!==null&&(o.beginPath(),o.moveTo(v.prevX,v.prevY),o.lineTo(e,t),o.stroke()),v.prevX=e,v.prevY=t}function y(e,t){if(o.fillStyle=g,o.strokeStyle=g,o.lineWidth=m*f,y.prevX!==null&&y.prevY!==null&&(o.beginPath(),o.moveTo(y.prevX,y.prevY),o.lineTo(e,t),o.stroke()),o.beginPath(),o.arc(e,t,m*f*.5,0,Math.PI*2),o.fill(),Math.random()<.1*f){const n=Math.floor(Math.random()*3)+1;for(let s=0;s<n;s++){const i=e+(Math.random()-.5)*m,r=m*(Math.random()*2+1)*f;o.beginPath(),o.moveTo(i,t),o.lineTo(i,t+r),o.stroke()}}y.prevX=e,y.prevY=t}h.prevX=null;h.prevY=null;p.prevX=null;p.prevY=null;b.prevPositions=[];v.prevX=null;v.prevY=null;y.prevX=null;y.prevY=null;function j(){E||(E=new(window.AudioContext||window.webkitAudioContext))}function Y(e,t=1.5){if(!E)return;const n=E.currentTime,s=E.createOscillator(),i=E.createGain();s.connect(i),i.connect(E.destination),s.type="sine",s.frequency.value=e,i.gain.setValueAtTime(0,n),i.gain.linearRampToValueAtTime(.3,n+.1),i.gain.exponentialRampToValueAtTime(.01,n+t),s.start(n),s.stop(n+t)}function Q(e,t){const n=["circle","triangle","square","pentagon","hexagon","star"],s=n[Math.floor(Math.random()*n.length)];return{x:e,y:t,type:s,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function O(e,t){const n=Q(e,t);M.push(n);const i={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[n.type]||440;Y(i,1.5),q++,q%3===0&&(Y(i*1.25,1.5),Y(i*1.5,1.5))}function _(){for(let t=M.length-1;t>=0;t--){const n=M[t];n.x+=L.x*.05,n.y+=L.y*.05,n.x<-n.size&&(n.x=l.width+n.size),n.x>l.width+n.size&&(n.x=-n.size),n.y<-n.size&&(n.y=l.height+n.size),n.y>l.height+n.size&&(n.y=-n.size),n.life-=n.decay,n.life<=0&&M.splice(t,1)}}function ee(){M.forEach(e=>{switch(o.save(),o.globalAlpha=e.life,o.translate(e.x,e.y),o.rotate(e.rotation),o.strokeStyle=e.color,o.lineWidth=2,o.fillStyle=e.color.replace(")",", 0.2)").replace("hsl","hsla"),e.type){case"circle":o.beginPath(),o.arc(0,0,e.size,0,Math.PI*2),o.stroke(),o.beginPath(),o.arc(0,0,e.size*.5,0,Math.PI*2),o.stroke();break;case"triangle":o.beginPath();for(let t=0;t<3;t++){const n=t*Math.PI*2/3,s=Math.cos(n)*e.size,i=Math.sin(n)*e.size;t===0?o.moveTo(s,i):o.lineTo(s,i)}o.closePath(),o.stroke();break;case"square":o.beginPath(),o.rect(-e.size,-e.size,e.size*2,e.size*2),o.stroke(),o.beginPath(),o.moveTo(-e.size*.7,-e.size*.7),o.lineTo(e.size*.7,e.size*.7),o.moveTo(e.size*.7,-e.size*.7),o.lineTo(-e.size*.7,e.size*.7),o.stroke();break;case"pentagon":o.beginPath();for(let t=0;t<5;t++){const n=t*Math.PI*2/5-Math.PI/2,s=Math.cos(n)*e.size,i=Math.sin(n)*e.size;t===0?o.moveTo(s,i):o.lineTo(s,i)}o.closePath(),o.stroke();break;case"hexagon":o.beginPath();for(let t=0;t<6;t++){const n=t*Math.PI*2/6,s=Math.cos(n)*e.size,i=Math.sin(n)*e.size;t===0?o.moveTo(s,i):o.lineTo(s,i)}o.closePath(),o.stroke();break;case"star":o.beginPath();for(let t=0;t<10;t++){const n=t*Math.PI*2/10-Math.PI/2,s=t%2===0?e.size:e.size*.5,i=Math.cos(n)*s,r=Math.sin(n)*s;t===0?o.moveTo(i,r):o.lineTo(i,r)}o.closePath(),o.stroke();break}o.restore()}),o.globalAlpha=1}function U(){const e=document.getElementById("selectedTool");e&&(e.innerHTML=P[x].icon)}function I(e){if(e>0?x=(x+1)%P.length:x=(x-1+P.length)%P.length,w=P[x].name,U(),w==="llm")te();else switch(w){case"symmetry":B=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":j();break}console.log(`Selected tool: ${P[x].label}`)}function te(){const e=document.getElementById("selectedTool");if(e){const t=document.createElement("div");if(t.style.cssText=`
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
    `,!document.getElementById("ripple-animation")){const n=document.createElement("style");n.id="ripple-animation",n.textContent=`
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
      `,document.head.appendChild(n)}e.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},1500)}}function ne(){if(typeof PluginMessageHandler<"u"){const t={message:'Give me creative drawing prompts or artistic inspiration in 2-3 sentences. Focus on visual ideas I can draw, like "Draw a tree with colorful leaves" or "Create a pattern of interlocking circles". Be encouraging and artistic.',useLLM:!0,wantsR1Response:!0};PluginMessageHandler.postMessage(JSON.stringify(t))}const e=document.createElement("div");e.textContent="Asking LLM for creative ideas...",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},2e3)}function oe(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(s=>{s.dataset.color===S?s.classList.add("selected-color"):s.classList.remove("selected-color")}))}function ie(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(s=>{s.dataset.color===g?s.classList.add("selected-color"):s.classList.remove("selected-color")}))}function se(e){S=e,o.fillStyle=S,o.fillRect(0,0,l.width,l.height),X(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",e)}function re(e){g=e,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",e)}function le(e){z=!0;const t=l.getBoundingClientRect(),n=e.clientX-t.left,s=e.clientY-t.top;if(w==="sacred"){O(n,s);return}G(n,s)}function ae(e){if(!z)return;const t=l.getBoundingClientRect(),n=e.clientX-t.left,s=e.clientY-t.top;if(w==="sacred"){Math.random()<.3&&O(n,s);return}G(n,s)}function N(){z&&(z=!1,X(),h.prevX=null,h.prevY=null,p.prevX=null,p.prevY=null,v.prevX=null,v.prevY=null,y.prevX=null,y.prevY=null)}function G(e,t){switch(w){case"brush":h(e,t);break;case"kaleidoscope":p(e,t);break;case"symmetry":b(e,t);break;case"lines":v(e,t);break;case"drip":y(e,t);break}}function ce(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",i=>{i.accelerationIncludingGravity&&(L.x=i.accelerationIncludingGravity.x||0,L.y=i.accelerationIncludingGravity.y||0,L.z=i.accelerationIncludingGravity.z||0)});let e=0,t=0,n=0,s=15;window.addEventListener("devicemotion",i=>{if(i.accelerationIncludingGravity){const r=i.accelerationIncludingGravity.x||0,a=i.accelerationIncludingGravity.y||0,c=i.accelerationIncludingGravity.z||0,d=Math.abs(r-e),u=Math.abs(a-t),k=Math.abs(c-n);if(e=r,t=a,n=c,w!=="sacred"&&(d>s||u>s||k>s)){const T=Date.now();T-F>1e3&&(F=T,Z())}}})}window.addEventListener("scrollUp",()=>{I(-1)});window.addEventListener("scrollDown",()=>{I(1)});window.addEventListener("sideClick",()=>{H()});document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"&&(I(-1),e.preventDefault()),e.key==="ArrowDown"&&(I(1),e.preventDefault()),e.key==="Enter"){if(P[x].name==="llm"){ne();return}H(),e.preventDefault()}});function de(){V(),ce(),l.addEventListener("mousedown",le),l.addEventListener("mousemove",ae),l.addEventListener("mouseup",N),l.addEventListener("mouseleave",N),l.addEventListener("touchstart",t=>{t.preventDefault();const n=t.touches[0],s=new MouseEvent("mousedown",{clientX:n.clientX,clientY:n.clientY});l.dispatchEvent(s)}),l.addEventListener("touchmove",t=>{t.preventDefault();const n=t.touches[0],s=new MouseEvent("mousemove",{clientX:n.clientX,clientY:n.clientY});l.dispatchEvent(s)}),l.addEventListener("touchend",t=>{t.preventDefault();const n=new MouseEvent("mouseup",{});l.dispatchEvent(n)}),document.getElementById("undoBtn").addEventListener("click",J),document.getElementById("canvasColorBtn").addEventListener("click",oe),document.getElementById("eyedropperBtn").addEventListener("click",ie),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(i=>i.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{se(t.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(i=>i.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{re(t.dataset.color)},200)})}),U();function e(){_(),ee(),requestAnimationFrame(e)}e(),console.log("R1 Digital Painting App initialized with tool:",w)}document.addEventListener("DOMContentLoaded",de);window.handleLLMResponse=function(e){const t=document.getElementById("adviceText"),n=document.getElementById("adviceOverlay");t&&n&&(t.textContent=e,n.style.display="flex",setTimeout(()=>{n.style.display="none"},5e3))};window.onPluginMessage=function(e){if(console.log("Received plugin message:",e),e&&e.message){console.log("Processing message response:",e.message);const t=document.createElement("div");e.message.includes("uploaded")||e.message.includes("Upload complete")?t.textContent="Artwork uploaded successfully!":e.message.includes("email sent")||e.message.includes("Email sent")?t.textContent="Email with artwork URL sent successfully!":e.message.includes("upload")||e.message.includes("Upload")?t.textContent="Uploading artwork to ImgBB...":e.message.includes("email")||e.message.includes("Email")?t.textContent="Sending email with artwork URL...":e.message.includes("error")||e.message.includes("Error")?(t.textContent="Error: "+e.message,t.style.background="rgba(255, 0, 0, 0.9)",t.style.color="white"):t.textContent=e.message,t.style.cssText=`
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
      `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}});document.addEventListener("click",e=>{const t=document.getElementById("adviceOverlay");t&&e.target===t&&(t.style.display="none")});function H(){const e=l.toDataURL("image/png");ue(e)}function ue(e){const t=document.createElement("div");t.id="emailOverlay",t.style.cssText=`
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
  `;const n=document.createElement("div");n.style.cssText=`
    background: #1a1a2e;
    border: 2px solid #FE5F00;
    border-radius: 10px;
    padding: 20px;
    width: 80%;
    max-width: 200px;
  `;const s=document.createElement("div");s.textContent="Enter your email:",s.style.cssText=`
    color: white;
    font-size: 14px;
    margin-bottom: 15px;
    text-align: center;
  `;const i=document.createElement("input");i.type="email",i.placeholder="your@email.com",i.style.cssText=`
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #FE5F00;
    border-radius: 5px;
    background: #2a2a4a;
    color: white;
    font-size: 12px;
  `;const r=document.createElement("div");r.style.cssText=`
    display: flex;
    gap: 10px;
  `;const a=document.createElement("button");a.textContent="Send",a.style.cssText=`
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
  `,a.addEventListener("click",()=>{const d=i.value.trim();if(d&&pe(d))t.remove(),me(e,d);else{const u=document.createElement("div");u.textContent="Please enter a valid email",u.style.cssText=`
        color: #ff4444;
        font-size: 10px;
        margin-top: 5px;
        text-align: center;
      `,n.appendChild(u),setTimeout(()=>{u.parentNode&&u.remove()},2e3)}}),c.addEventListener("click",()=>{t.remove()}),r.appendChild(a),r.appendChild(c),n.appendChild(s),n.appendChild(i),n.appendChild(r),t.appendChild(n),document.body.appendChild(t),i.focus()}function pe(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}async function me(e,t){try{const n=document.createElement("div");if(n.textContent="Processing artwork...",n.style.cssText=`
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
    `,document.body.appendChild(n),n.textContent="Sending artwork to LLM for email...",typeof PluginMessageHandler<"u"){const s={message:`Please send an email to ${t} with the artwork attached. The artwork is provided as a data URL: ${e}. Please format the email so the image is displayed properly, either as an inline image or attachment.`,useLLM:!0,wantsR1Response:!0};console.log("Sending image data URL to LLM for email");try{PluginMessageHandler.postMessage(JSON.stringify(s)),setTimeout(()=>{n.parentNode&&(n.textContent="Request sent to LLM for email processing...",setTimeout(()=>{n.parentNode&&n.remove()},3e3))},1e3)}catch(i){throw console.error("Error posting message to PluginMessageHandler:",i),new Error("Failed to communicate with LLM")}}else throw new Error("PluginMessageHandler not available - not running in R1 environment")}catch(n){console.error("Error processing image:",n);let s="Failed to process artwork: ";n.message.includes("PluginMessageHandler")?s+="Not running in R1 environment":s+=n.message;const i=document.createElement("div");i.textContent=s,i.style.cssText=`
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
