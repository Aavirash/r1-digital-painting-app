(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let s,n,I=!1,k="brush",f="#FE5F00",S="#F2F2F2",u=5,y=0,T=[],L={x:0,y:0,z:0},p=1,E=[],D=4,q=0,M=null,F=0;const w=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function K(){s=document.getElementById("paintCanvas"),n=s.getContext("2d"),s.width=window.innerWidth,s.height=window.innerHeight,n.lineCap="round",n.lineJoin="round",n.fillStyle=S,n.fillRect(0,0,s.width,s.height),X()}function X(){E.push(n.getImageData(0,0,s.width,s.height)),E.length>20&&E.shift()}function Z(){if(E.length>1){E.pop();const e=E[E.length-1];n.putImageData(e,0,0),$()}}function $(){const e=document.createElement("div");e.textContent="Undo",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},1e3)}function j(){n.fillStyle=S,n.fillRect(0,0,s.width,s.height),X(),b.prevPositions&&(b.prevPositions=[]),T.length=0}function h(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,h.prevX!==null&&h.prevY!==null&&(n.beginPath(),n.moveTo(h.prevX,h.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,u*p*.5,0,Math.PI*2),n.fill(),h.prevX=e,h.prevY=t}function d(e,t){const o=s.width/2,i=s.height/2,a=12;n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.5;for(let r=0;r<a;r++){const l=r*Math.PI*2/a,c=Math.cos(l),v=Math.sin(l),P=o+(e-o)*c-(t-i)*v,x=i+(e-o)*v+(t-i)*c,C=o+(o-P),A=i+(i-x);if(d.prevX!==null&&d.prevY!==null){const B=o+(d.prevX-o)*c-(d.prevY-i)*v,R=i+(d.prevX-o)*v+(d.prevY-i)*c,V=o+(o-B),J=i+(i-R);n.beginPath(),n.moveTo(B,R),n.lineTo(P,x),n.stroke(),n.beginPath(),n.moveTo(V,J),n.lineTo(C,A),n.stroke()}n.beginPath(),n.arc(P,x,u*p*.3,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(C,A,u*p*.3,0,Math.PI*2),n.fill()}d.prevX=e,d.prevY=t}function b(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p*.8;const o=s.width/2,i=s.height/2;b.prevPositions||(b.prevPositions=[]);const a=[];for(let r=0;r<D;r++){const l=r*Math.PI*2/D,c=Math.cos(l),v=Math.sin(l),P=o+(e-o)*c-(t-i)*v,x=i+(e-o)*v+(t-i)*c;a.push({x:P,y:x})}b.prevPositions.length===a.length&&I&&a.forEach((r,l)=>{const c=b.prevPositions[l];n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(r.x,r.y),n.stroke(),n.beginPath(),n.arc(r.x,r.y,u*p*.3,0,Math.PI*2),n.fill()}),b.prevPositions=a}function m(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,m.prevX!==null&&m.prevY!==null&&(n.beginPath(),n.moveTo(m.prevX,m.prevY),n.lineTo(e,t),n.stroke()),m.prevX=e,m.prevY=t}function g(e,t){if(n.fillStyle=f,n.strokeStyle=f,n.lineWidth=u*p,g.prevX!==null&&g.prevY!==null&&(n.beginPath(),n.moveTo(g.prevX,g.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,u*p*.5,0,Math.PI*2),n.fill(),Math.random()<.1*p){const o=Math.floor(Math.random()*3)+1;for(let i=0;i<o;i++){const a=e+(Math.random()-.5)*u,r=u*(Math.random()*2+1)*p;n.beginPath(),n.moveTo(a,t),n.lineTo(a,t+r),n.stroke()}}g.prevX=e,g.prevY=t}h.prevX=null;h.prevY=null;d.prevX=null;d.prevY=null;b.prevPositions=[];m.prevX=null;m.prevY=null;g.prevX=null;g.prevY=null;function Q(){M||(M=new(window.AudioContext||window.webkitAudioContext))}function Y(e,t=1.5){if(!M)return;const o=M.currentTime,i=M.createOscillator(),a=M.createGain();i.connect(a),a.connect(M.destination),i.type="sine",i.frequency.value=e,a.gain.setValueAtTime(0,o),a.gain.linearRampToValueAtTime(.3,o+.1),a.gain.exponentialRampToValueAtTime(.01,o+t),i.start(o),i.stop(o+t)}function _(e,t){const o=["circle","triangle","square","pentagon","hexagon","star"],i=o[Math.floor(Math.random()*o.length)];return{x:e,y:t,type:i,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function O(e,t){const o=_(e,t);T.push(o);const a={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[o.type]||440;Y(a,1.5),F++,F%3===0&&(Y(a*1.25,1.5),Y(a*1.5,1.5))}function ee(){for(let t=T.length-1;t>=0;t--){const o=T[t];o.x+=L.x*.05,o.y+=L.y*.05,o.x<-o.size&&(o.x=s.width+o.size),o.x>s.width+o.size&&(o.x=-o.size),o.y<-o.size&&(o.y=s.height+o.size),o.y>s.height+o.size&&(o.y=-o.size),o.life-=o.decay,o.life<=0&&T.splice(t,1)}}function te(){T.forEach(e=>{switch(n.save(),n.globalAlpha=e.life,n.translate(e.x,e.y),n.rotate(e.rotation),n.strokeStyle=e.color,n.lineWidth=2,n.fillStyle=e.color.replace(")",", 0.2)").replace("hsl","hsla"),e.type){case"circle":n.beginPath(),n.arc(0,0,e.size,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,e.size*.5,0,Math.PI*2),n.stroke();break;case"triangle":n.beginPath();for(let t=0;t<3;t++){const o=t*Math.PI*2/3,i=Math.cos(o)*e.size,a=Math.sin(o)*e.size;t===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"square":n.beginPath(),n.rect(-e.size,-e.size,e.size*2,e.size*2),n.stroke(),n.beginPath(),n.moveTo(-e.size*.7,-e.size*.7),n.lineTo(e.size*.7,e.size*.7),n.moveTo(e.size*.7,-e.size*.7),n.lineTo(-e.size*.7,e.size*.7),n.stroke();break;case"pentagon":n.beginPath();for(let t=0;t<5;t++){const o=t*Math.PI*2/5-Math.PI/2,i=Math.cos(o)*e.size,a=Math.sin(o)*e.size;t===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"hexagon":n.beginPath();for(let t=0;t<6;t++){const o=t*Math.PI*2/6,i=Math.cos(o)*e.size,a=Math.sin(o)*e.size;t===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath(),n.stroke();break;case"star":n.beginPath();for(let t=0;t<10;t++){const o=t*Math.PI*2/10-Math.PI/2,i=t%2===0?e.size:e.size*.5,a=Math.cos(o)*i,r=Math.sin(o)*i;t===0?n.moveTo(a,r):n.lineTo(a,r)}n.closePath(),n.stroke();break}n.restore()}),n.globalAlpha=1}function G(){const e=document.getElementById("selectedTool");if(e){e.innerHTML=w[y].icon;const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),w[y].name==="llm"?(t.addEventListener("click",()=>{H()}),t.style.cursor="pointer"):t.style.cursor="default"}}function z(e){if(e>0?y=(y+1)%w.length:y=(y-1+w.length)%w.length,k=w[y].name,G(),k==="llm")ne();else switch(k){case"symmetry":D=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":Q();break}console.log(`Selected tool: ${w[y].label}`)}function ne(){const e=document.getElementById("selectedTool");if(e){const t=document.createElement("div");if(t.style.cssText=`
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
      `,document.head.appendChild(o)}e.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},1500)}}function H(){if(typeof PluginMessageHandler<"u"){const t={message:'Give me creative drawing prompts or artistic inspiration in 2-3 sentences. Focus on visual ideas I can draw, like "Draw a tree with colorful leaves" or "Create a pattern of interlocking circles". Be encouraging and artistic.',useLLM:!0,wantsR1Response:!0};PluginMessageHandler.postMessage(JSON.stringify(t))}const e=document.createElement("div");e.textContent="Asking LLM for creative ideas...",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},2e3)}function oe(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===S?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function ie(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===f?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function ae(e){S=e,n.fillStyle=S,n.fillRect(0,0,s.width,s.height),X(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",e)}function se(e){f=e,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",e)}function re(e){I=!0;const t=s.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(k==="sacred"){O(o,i);return}W(o,i)}function le(e){if(!I)return;const t=s.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(k==="sacred"){Math.random()<.3&&O(o,i);return}W(o,i)}function N(){I&&(I=!1,X(),h.prevX=null,h.prevY=null,d.prevX=null,d.prevY=null,m.prevX=null,m.prevY=null,g.prevX=null,g.prevY=null)}function W(e,t){switch(k){case"brush":h(e,t);break;case"kaleidoscope":d(e,t);break;case"symmetry":b(e,t);break;case"lines":m(e,t);break;case"drip":g(e,t);break}}function ce(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",a=>{a.accelerationIncludingGravity&&(L.x=a.accelerationIncludingGravity.x||0,L.y=a.accelerationIncludingGravity.y||0,L.z=a.accelerationIncludingGravity.z||0)});let e=0,t=0,o=0,i=15;window.addEventListener("devicemotion",a=>{if(a.accelerationIncludingGravity){const r=a.accelerationIncludingGravity.x||0,l=a.accelerationIncludingGravity.y||0,c=a.accelerationIncludingGravity.z||0,v=Math.abs(r-e),P=Math.abs(l-t),x=Math.abs(c-o);if(e=r,t=l,o=c,k!=="sacred"&&(v>i||P>i||x>i)){const C=Date.now();C-q>1e3&&(q=C,j())}}})}window.addEventListener("scrollUp",()=>{z(-1)});window.addEventListener("scrollDown",()=>{z(1)});window.addEventListener("sideClick",e=>(e&&(e.stopImmediatePropagation(),e.preventDefault()),U(),!1));document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"&&(z(-1),e.preventDefault()),e.key==="ArrowDown"&&(z(1),e.preventDefault()),e.key==="Enter"){if(w[y].name==="llm"){H();return}U(),e.preventDefault()}});window.onPluginMessage=function(e){return console.log("Received plugin message:",e),event&&(event.stopImmediatePropagation(),event.preventDefault()),!1};typeof window<"u"&&(window.addEventListener("pluginMessage",function(e){return console.log("Received pluginMessage event:",e.detail),e.stopImmediatePropagation(),e.preventDefault(),!1},!0),window.addEventListener("beforeunload",function(e){return e.preventDefault(),e.returnValue="",""}),window.addEventListener("pagehide",function(e){return e.preventDefault(),!1}));function de(){K(),ce(),s.addEventListener("mousedown",re),s.addEventListener("mousemove",le),s.addEventListener("mouseup",N),s.addEventListener("mouseleave",N),s.addEventListener("touchstart",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousedown",{clientX:o.clientX,clientY:o.clientY});s.dispatchEvent(i)}),s.addEventListener("touchmove",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousemove",{clientX:o.clientX,clientY:o.clientY});s.dispatchEvent(i)}),s.addEventListener("touchend",t=>{t.preventDefault();const o=new MouseEvent("mouseup",{});s.dispatchEvent(o)}),document.getElementById("undoBtn").addEventListener("click",Z),document.getElementById("canvasColorBtn").addEventListener("click",oe),document.getElementById("eyedropperBtn").addEventListener("click",ie),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(a=>a.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{ae(t.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(a=>a.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{se(t.dataset.color)},200)})}),G();function e(){ee(),te(),requestAnimationFrame(e)}e(),console.log("R1 Digital Painting App initialized with tool:",k)}document.addEventListener("DOMContentLoaded",de);window.handleLLMResponse=function(e){const t=document.getElementById("adviceText"),o=document.getElementById("adviceOverlay");t&&o&&(t.textContent=e,o.style.display="flex",setTimeout(()=>{o.style.display="none"},5e3))};document.addEventListener("click",e=>{const t=document.getElementById("adviceOverlay");t&&e.target===t&&(t.style.display="none")});function U(){try{const e=s.toDataURL("image/png");ue(e)}catch(e){console.error("Error taking screenshot:",e);const t=document.createElement("div");t.textContent="Failed to capture artwork: "+e.message,t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},5e3)}}async function ue(e){try{const t=document.createElement("div");t.textContent="Processing artwork...",t.style.cssText=`
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
    `,document.body.appendChild(t);const o=e.split(",")[1];if(t.textContent="Sending artwork to LLM...",typeof PluginMessageHandler<"u"){const i={message:"Please send an email to the user with subject 'Your Digital Artwork from R1 Digital Painting App' and body 'Here is your digital artwork base64 data! Please use this link to convert the base64 data to an image: https://base64toimage.github.io/\\n\\nCopy and paste the following base64 data at the converter website:\\n\\n"+o+"'",useLLM:!0,wantsR1Response:!1};console.log("Sending base64 data to LLM as text in message body");try{PluginMessageHandler.postMessage(JSON.stringify(i)),setTimeout(()=>{t.parentNode&&(t.textContent="Email request sent to LLM...",setTimeout(()=>{t.parentNode&&t.remove()},3e3))},1e3)}catch(a){throw console.error("Error posting message to PluginMessageHandler:",a),new Error("Failed to communicate with LLM")}}else throw new Error("PluginMessageHandler not available - not running in R1 environment")}catch(t){console.error("Error processing image:",t);let o="Failed to process artwork: ";t.message.includes("PluginMessageHandler")?o+="Not running in R1 environment":o+=t.message;const i=document.createElement("div");i.textContent=o,i.style.cssText=`
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
