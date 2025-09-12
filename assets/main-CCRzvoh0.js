(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let a,n,S=!1,k="brush",f="#FE5F00",I="#F2F2F2",u=5,y=0,T=[],L={x:0,y:0,z:0},p=1,E=[],A=4,F=0,M=null,q=0;const w=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function V(){a=document.getElementById("paintCanvas"),n=a.getContext("2d"),a.width=window.innerWidth,a.height=window.innerHeight,n.lineCap="round",n.lineJoin="round",n.fillStyle=I,n.fillRect(0,0,a.width,a.height),X()}function X(){E.push(n.getImageData(0,0,a.width,a.height)),E.length>20&&E.shift()}function $(){if(E.length>1){E.pop();const e=E[E.length-1];n.putImageData(e,0,0),j()}}function j(){const e=document.createElement("div");e.textContent="Undo",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},1e3)}function Z(){n.fillStyle=I,n.fillRect(0,0,a.width,a.height),X(),b.prevPositions&&(b.prevPositions=[]),T.length=0}function h(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,h.prevX!==null&&h.prevY!==null&&(n.beginPath(),n.moveTo(h.prevX,h.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,u*p*.5,0,Math.PI*2),n.fill(),h.prevX=e,h.prevY=t}function d(e,t){const o=a.width/2,s=a.height/2,i=12;n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.5;for(let r=0;r<i;r++){const l=r*Math.PI*2/i,c=Math.cos(l),v=Math.sin(l),P=o+(e-o)*c-(t-s)*v,x=s+(e-o)*v+(t-s)*c,C=o+(o-P),B=s+(s-x);if(d.prevX!==null&&d.prevY!==null){const R=o+(d.prevX-o)*c-(d.prevY-s)*v,D=s+(d.prevX-o)*v+(d.prevY-s)*c,J=o+(o-R),K=s+(s-D);n.beginPath(),n.moveTo(R,D),n.lineTo(P,x),n.stroke(),n.beginPath(),n.moveTo(J,K),n.lineTo(C,B),n.stroke()}n.beginPath(),n.arc(P,x,u*p*.3,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(C,B,u*p*.3,0,Math.PI*2),n.fill()}d.prevX=e,d.prevY=t}function b(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.8;const o=a.width/2,s=a.height/2;b.prevPositions||(b.prevPositions=[]);const i=[];for(let r=0;r<A;r++){const l=r*Math.PI*2/A,c=Math.cos(l),v=Math.sin(l),P=o+(e-o)*c-(t-s)*v,x=s+(e-o)*v+(t-s)*c;i.push({x:P,y:x})}b.prevPositions.length===i.length&&S&&i.forEach((r,l)=>{const c=b.prevPositions[l];n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(r.x,r.y),n.stroke(),n.beginPath(),n.arc(r.x,r.y,u*p*.3,0,Math.PI*2),n.fill()}),b.prevPositions=i}function g(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,g.prevX!==null&&g.prevY!==null&&(n.beginPath(),n.moveTo(g.prevX,g.prevY),n.lineTo(e,t),n.stroke()),g.prevX=e,g.prevY=t}function m(e,t){if(n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,m.prevX!==null&&m.prevY!==null&&(n.beginPath(),n.moveTo(m.prevX,m.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,u*p*.5,0,Math.PI*2),n.fill(),Math.random()<.1*p){const o=Math.floor(Math.random()*3)+1;for(let s=0;s<o;s++){const i=e+(Math.random()-.5)*u,r=u*(Math.random()*2+1)*p;n.beginPath(),n.moveTo(i,t),n.lineTo(i,t+r),n.stroke()}}m.prevX=e,m.prevY=t}h.prevX=null;h.prevY=null;d.prevX=null;d.prevY=null;b.prevPositions=[];g.prevX=null;g.prevY=null;m.prevX=null;m.prevY=null;function Q(){M||(M=new(window.AudioContext||window.webkitAudioContext))}function Y(e,t=1.5){if(!M)return;const o=M.currentTime,s=M.createOscillator(),i=M.createGain();s.connect(i),i.connect(M.destination),s.type="sine",s.frequency.value=e,i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.3,o+.1),i.gain.exponentialRampToValueAtTime(.01,o+t),s.start(o),s.stop(o+t)}function _(e,t){const o=["circle","triangle","square","pentagon","hexagon","star"],s=o[Math.floor(Math.random()*o.length)];return{x:e,y:t,type:s,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function O(e,t){const o=_(e,t);T.push(o);const i={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[o.type]||440;Y(i,1.5),q++,q%3===0&&(Y(i*1.25,1.5),Y(i*1.5,1.5))}function ee(){for(let t=T.length-1;t>=0;t--){const o=T[t];o.x+=L.x*.05,o.y+=L.y*.05,o.x<-o.size&&(o.x=a.width+o.size),o.x>a.width+o.size&&(o.x=-o.size),o.y<-o.size&&(o.y=a.height+o.size),o.y>a.height+o.size&&(o.y=-o.size),o.life-=o.decay,o.life<=0&&T.splice(t,1)}}function te(){T.forEach(e=>{switch(n.save(),n.globalAlpha=e.life,n.translate(e.x,e.y),n.rotate(e.rotation),n.strokeStyle=e.color,n.lineWidth=2,n.fillStyle=e.color.replace(")",", 0.2)").replace("hsl","hsla"),e.type){case"circle":n.beginPath(),n.arc(0,0,e.size,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,e.size*.5,0,Math.PI*2),n.stroke();break;case"triangle":n.beginPath();for(let t=0;t<3;t++){const o=t*Math.PI*2/3,s=Math.cos(o)*e.size,i=Math.sin(o)*e.size;t===0?n.moveTo(s,i):n.lineTo(s,i)}n.closePath(),n.stroke();break;case"square":n.beginPath(),n.rect(-e.size,-e.size,e.size*2,e.size*2),n.stroke(),n.beginPath(),n.moveTo(-e.size*.7,-e.size*.7),n.lineTo(e.size*.7,e.size*.7),n.moveTo(e.size*.7,-e.size*.7),n.lineTo(-e.size*.7,e.size*.7),n.stroke();break;case"pentagon":n.beginPath();for(let t=0;t<5;t++){const o=t*Math.PI*2/5-Math.PI/2,s=Math.cos(o)*e.size,i=Math.sin(o)*e.size;t===0?n.moveTo(s,i):n.lineTo(s,i)}n.closePath(),n.stroke();break;case"hexagon":n.beginPath();for(let t=0;t<6;t++){const o=t*Math.PI*2/6,s=Math.cos(o)*e.size,i=Math.sin(o)*e.size;t===0?n.moveTo(s,i):n.lineTo(s,i)}n.closePath(),n.stroke();break;case"star":n.beginPath();for(let t=0;t<10;t++){const o=t*Math.PI*2/10-Math.PI/2,s=t%2===0?e.size:e.size*.5,i=Math.cos(o)*s,r=Math.sin(o)*s;t===0?n.moveTo(i,r):n.lineTo(i,r)}n.closePath(),n.stroke();break}n.restore()}),n.globalAlpha=1}function H(){const e=document.getElementById("selectedTool");if(e){e.innerHTML=w[y].icon;const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),w[y].name==="llm"?(t.addEventListener("click",()=>{G()}),t.style.cursor="pointer"):t.style.cursor="default"}}function z(e){if(e>0?y=(y+1)%w.length:y=(y-1+w.length)%w.length,k=w[y].name,H(),k==="llm")ne();else switch(k){case"symmetry":A=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":Q();break}console.log(`Selected tool: ${w[y].label}`)}function ne(){const e=document.getElementById("selectedTool");if(e){const t=document.createElement("div");if(t.style.cssText=`
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
      `,document.head.appendChild(o)}e.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},1500)}}function G(){if(typeof PluginMessageHandler<"u"){const t={message:'Give me creative drawing prompts or artistic inspiration in 2-3 sentences. Focus on visual ideas I can draw, like "Draw a tree with colorful leaves" or "Create a pattern of interlocking circles". Be encouraging and artistic.',useLLM:!0,wantsR1Response:!0};PluginMessageHandler.postMessage(JSON.stringify(t))}const e=document.createElement("div");e.textContent="Asking LLM for creative ideas...",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},2e3)}function oe(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(s=>{s.dataset.color===I?s.classList.add("selected-color"):s.classList.remove("selected-color")}))}function se(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(s=>{s.dataset.color===f?s.classList.add("selected-color"):s.classList.remove("selected-color")}))}function ie(e){I=e,n.fillStyle=I,n.fillRect(0,0,a.width,a.height),X(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",e)}function ae(e){f=e,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",e)}function re(e){S=!0;const t=a.getBoundingClientRect(),o=e.clientX-t.left,s=e.clientY-t.top;if(k==="sacred"){O(o,s);return}W(o,s)}function le(e){if(!S)return;const t=a.getBoundingClientRect(),o=e.clientX-t.left,s=e.clientY-t.top;if(k==="sacred"){Math.random()<.3&&O(o,s);return}W(o,s)}function N(){S&&(S=!1,X(),h.prevX=null,h.prevY=null,d.prevX=null,d.prevY=null,g.prevX=null,g.prevY=null,m.prevX=null,m.prevY=null)}function W(e,t){switch(k){case"brush":h(e,t);break;case"kaleidoscope":d(e,t);break;case"symmetry":b(e,t);break;case"lines":g(e,t);break;case"drip":m(e,t);break}}function ce(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",i=>{i.accelerationIncludingGravity&&(L.x=i.accelerationIncludingGravity.x||0,L.y=i.accelerationIncludingGravity.y||0,L.z=i.accelerationIncludingGravity.z||0)});let e=0,t=0,o=0,s=15;window.addEventListener("devicemotion",i=>{if(i.accelerationIncludingGravity){const r=i.accelerationIncludingGravity.x||0,l=i.accelerationIncludingGravity.y||0,c=i.accelerationIncludingGravity.z||0,v=Math.abs(r-e),P=Math.abs(l-t),x=Math.abs(c-o);if(e=r,t=l,o=c,k!=="sacred"&&(v>s||P>s||x>s)){const C=Date.now();C-F>1e3&&(F=C,Z())}}})}window.addEventListener("scrollUp",()=>{z(-1)});window.addEventListener("scrollDown",()=>{z(1)});window.addEventListener("sideClick",e=>(e&&(e.stopImmediatePropagation(),e.preventDefault()),U(),!1));document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"&&(z(-1),e.preventDefault()),e.key==="ArrowDown"&&(z(1),e.preventDefault()),e.key==="Enter"){if(w[y].name==="llm"){G();return}U(),e.preventDefault()}});window.onPluginMessage=function(e){if(console.log("Received plugin message:",e),e&&(e.message||e.data)){const t=e.message||e.data;if(console.log("LLM Response:",t),t.toLowerCase().includes("email")||t.toLowerCase().includes("sent")||t.toLowerCase().includes("delivered")){const o=document.createElement("div");o.textContent="Email sent successfully!",o.style.cssText=`
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
      `,document.body.appendChild(o),setTimeout(()=>{o.parentNode&&o.remove()},3e3)}else e.wantsR1Response!==!1&&window.handleLLMResponse(t)}return!1};function de(){V(),ce(),a.addEventListener("mousedown",re),a.addEventListener("mousemove",le),a.addEventListener("mouseup",N),a.addEventListener("mouseleave",N),a.addEventListener("touchstart",t=>{t.preventDefault();const o=t.touches[0],s=new MouseEvent("mousedown",{clientX:o.clientX,clientY:o.clientY});a.dispatchEvent(s)}),a.addEventListener("touchmove",t=>{t.preventDefault();const o=t.touches[0],s=new MouseEvent("mousemove",{clientX:o.clientX,clientY:o.clientY});a.dispatchEvent(s)}),a.addEventListener("touchend",t=>{t.preventDefault();const o=new MouseEvent("mouseup",{});a.dispatchEvent(o)}),document.getElementById("undoBtn").addEventListener("click",$),document.getElementById("canvasColorBtn").addEventListener("click",oe),document.getElementById("eyedropperBtn").addEventListener("click",se),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(i=>i.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{ie(t.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(i=>i.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{ae(t.dataset.color)},200)})}),H();function e(){ee(),te(),requestAnimationFrame(e)}e(),console.log("R1 Digital Painting App initialized with tool:",k)}document.addEventListener("DOMContentLoaded",de);window.handleLLMResponse=function(e){const t=document.getElementById("adviceText"),o=document.getElementById("adviceOverlay");t&&o&&(t.textContent=e,o.style.display="flex",setTimeout(()=>{o.style.display="none"},5e3))};document.addEventListener("click",e=>{const t=document.getElementById("adviceOverlay");t&&e.target===t&&(t.style.display="none")});function U(){console.log("PTT button pressed - starting screenshot process");try{const e=a.toDataURL("image/png");console.log("Screenshot captured successfully, data length:",e.length),ue(e)}catch(e){console.error("Error taking screenshot:",e);const t=document.createElement("div");t.textContent="Failed to capture artwork: "+e.message,t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},5e3)}}async function ue(e){console.log("Starting sendImageToR1System function");try{const t=document.createElement("div");t.textContent="Processing artwork...",t.style.cssText=`
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
    `,document.body.appendChild(t);const o=e.split(",")[1];if(console.log("Extracted base64 data, length:",o.length),t.textContent="Sending email request to LLM...",typeof PluginMessageHandler<"u"){const s={message:`Please send an email to the user with subject 'Your Digital Artwork from R1 Digital Painting App' and body 'Here is your digital artwork! Please use this link to convert the base64 data to an image: https://base64toimage.github.io/

Copy and paste the following base64 data at the converter website:

${o}

Enjoy your digital artwork!'`,useLLM:!0,wantsR1Response:!1};console.log("Sending base64 data to LLM directly in message body"),console.log("Payload message length:",s.message.length),console.log("Image data length:",o.length),console.log("Message preview:",s.message.substring(0,200)+"...");try{PluginMessageHandler.postMessage(JSON.stringify(s)),console.log("Message posted to PluginMessageHandler successfully"),setTimeout(()=>{t.parentNode&&(t.textContent="Email sent successfully!",t.style.background="rgba(0, 255, 0, 0.9)",setTimeout(()=>{t.parentNode&&t.remove()},3e3))},1e3)}catch(i){throw console.error("Error posting message to PluginMessageHandler:",i),new Error("Failed to communicate with LLM: "+i.message)}}else throw new Error("PluginMessageHandler not available - not running in R1 environment")}catch(t){console.error("Error processing image:",t);let o="Failed to process artwork: ";t.message.includes("PluginMessageHandler")?o+="Not running in R1 environment":o+=t.message;const s=document.createElement("div");s.textContent=o,s.style.cssText=`
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
