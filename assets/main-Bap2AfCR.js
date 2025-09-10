(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();console.log(typeof PluginMessageHandler<"u"?"Running as R1 Creation - Digital Painting App":"Running in browser mode - Digital Painting App");let r,n,S=!1,w="brush",f="#FE5F00",z="#F2F2F2",m=5,x=0,T=[],L={x:0,y:0,z:0},h=1,C=[],X=4,D=0,E=null,U=0;const P=[{name:"brush",icon:'<i class="fas fa-paint-brush"></i>',label:"Brush"},{name:"kaleidoscope",icon:'<i class="fas fa-magic"></i>',label:"Kaleidoscope"},{name:"symmetry",icon:'<i class="fas fa-sync-alt"></i>',label:"Symmetry"},{name:"drip",icon:'<i class="fas fa-fill-drip"></i>',label:"Drip Paint"},{name:"lines",icon:'<i class="fas fa-slash"></i>',label:"Lines"},{name:"llm",icon:'<i class="fas fa-microphone"></i>',label:"AI Advice"},{name:"sacred",icon:'<i class="fas fa-spa"></i>',label:"Sacred Geometry"}];function J(){r=document.getElementById("paintCanvas"),n=r.getContext("2d"),r.width=window.innerWidth,r.height=window.innerHeight,n.lineCap="round",n.lineJoin="round",n.fillStyle=z,n.fillRect(0,0,r.width,r.height),A()}function A(){C.push(n.getImageData(0,0,r.width,r.height)),C.length>20&&C.shift()}function K(){if(C.length>1){C.pop();const e=C[C.length-1];n.putImageData(e,0,0),j()}}function j(){const e=document.createElement("div");e.textContent="Undo",e.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},1e3)}function Z(){n.fillStyle=z,n.fillRect(0,0,r.width,r.height),A(),b.prevPositions&&(b.prevPositions=[]),T.length=0}function g(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=m*h,g.prevX!==null&&g.prevY!==null&&(n.beginPath(),n.moveTo(g.prevX,g.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,m*h*.5,0,Math.PI*2),n.fill(),g.prevX=e,g.prevY=t}function u(e,t){const o=r.width/2,i=r.height/2,s=12;n.fillStyle=f,n.strokeStyle=f,n.lineWidth=m*h*.5;for(let a=0;a<s;a++){const l=a*Math.PI*2/s,c=Math.cos(l),d=Math.sin(l),p=o+(e-o)*c-(t-i)*d,k=i+(e-o)*d+(t-i)*c,M=o+(o-p),Y=i+(i-k);if(u.prevX!==null&&u.prevY!==null){const F=o+(u.prevX-o)*c-(u.prevY-i)*d,R=i+(u.prevX-o)*d+(u.prevY-i)*c,$=o+(o-F),V=i+(i-R);n.beginPath(),n.moveTo(F,R),n.lineTo(p,k),n.stroke(),n.beginPath(),n.moveTo($,V),n.lineTo(M,Y),n.stroke()}n.beginPath(),n.arc(p,k,m*h*.3,0,Math.PI*2),n.fill(),n.beginPath(),n.arc(M,Y,m*h*.3,0,Math.PI*2),n.fill()}u.prevX=e,u.prevY=t}function b(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=m*h*.8;const o=r.width/2,i=r.height/2;b.prevPositions||(b.prevPositions=[]);const s=[];for(let a=0;a<X;a++){const l=a*Math.PI*2/X,c=Math.cos(l),d=Math.sin(l),p=o+(e-o)*c-(t-i)*d,k=i+(e-o)*d+(t-i)*c;s.push({x:p,y:k})}b.prevPositions.length===s.length&&S&&s.forEach((a,l)=>{const c=b.prevPositions[l];n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(a.x,a.y),n.stroke(),n.beginPath(),n.arc(a.x,a.y,m*h*.3,0,Math.PI*2),n.fill()}),b.prevPositions=s}function y(e,t){n.fillStyle=f,n.strokeStyle=f,n.lineWidth=m*h,y.prevX!==null&&y.prevY!==null&&(n.beginPath(),n.moveTo(y.prevX,y.prevY),n.lineTo(e,t),n.stroke()),y.prevX=e,y.prevY=t}function v(e,t){if(n.fillStyle=f,n.strokeStyle=f,n.lineWidth=m*h,v.prevX!==null&&v.prevY!==null&&(n.beginPath(),n.moveTo(v.prevX,v.prevY),n.lineTo(e,t),n.stroke()),n.beginPath(),n.arc(e,t,m*h*.5,0,Math.PI*2),n.fill(),Math.random()<.1*h){const o=Math.floor(Math.random()*3)+1;for(let i=0;i<o;i++){const s=e+(Math.random()-.5)*m,a=m*(Math.random()*2+1)*h;n.beginPath(),n.moveTo(s,t),n.lineTo(s,t+a),n.stroke()}}v.prevX=e,v.prevY=t}g.prevX=null;g.prevY=null;u.prevX=null;u.prevY=null;b.prevPositions=[];y.prevX=null;y.prevY=null;v.prevX=null;v.prevY=null;function Q(){E||(E=new(window.AudioContext||window.webkitAudioContext))}function B(e,t=1.5){if(!E)return;const o=E.currentTime,i=E.createOscillator(),s=E.createGain();i.connect(s),s.connect(E.destination),i.type="sine",i.frequency.value=e,s.gain.setValueAtTime(0,o),s.gain.linearRampToValueAtTime(.3,o+.1),s.gain.exponentialRampToValueAtTime(.01,o+t),i.start(o),i.stop(o+t)}function _(e,t){const o=["circle","triangle","square","pentagon","hexagon","star"],i=o[Math.floor(Math.random()*o.length)];return{x:e,y:t,type:i,size:20+Math.random()*30,color:`hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`,life:1,decay:.01+Math.random()*.01,rotation:Math.random()*Math.PI*2}}function N(e,t){const o=_(e,t);T.push(o);const s={circle:261.63,triangle:329.63,square:392,pentagon:440,hexagon:523.25,star:659.25}[o.type]||440;B(s,1.5),U++,U%3===0&&(B(s*1.25,1.5),B(s*1.5,1.5))}function ee(){for(let t=T.length-1;t>=0;t--){const o=T[t];o.x+=L.x*.05,o.y+=L.y*.05,o.x<-o.size&&(o.x=r.width+o.size),o.x>r.width+o.size&&(o.x=-o.size),o.y<-o.size&&(o.y=r.height+o.size),o.y>r.height+o.size&&(o.y=-o.size),o.life-=o.decay,o.life<=0&&T.splice(t,1)}}function te(){T.forEach(e=>{switch(n.save(),n.globalAlpha=e.life,n.translate(e.x,e.y),n.rotate(e.rotation),n.strokeStyle=e.color,n.lineWidth=2,n.fillStyle=e.color.replace(")",", 0.2)").replace("hsl","hsla"),e.type){case"circle":n.beginPath(),n.arc(0,0,e.size,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,e.size*.5,0,Math.PI*2),n.stroke();break;case"triangle":n.beginPath();for(let t=0;t<3;t++){const o=t*Math.PI*2/3,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"square":n.beginPath(),n.rect(-e.size,-e.size,e.size*2,e.size*2),n.stroke(),n.beginPath(),n.moveTo(-e.size*.7,-e.size*.7),n.lineTo(e.size*.7,e.size*.7),n.moveTo(e.size*.7,-e.size*.7),n.lineTo(-e.size*.7,e.size*.7),n.stroke();break;case"pentagon":n.beginPath();for(let t=0;t<5;t++){const o=t*Math.PI*2/5-Math.PI/2,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"hexagon":n.beginPath();for(let t=0;t<6;t++){const o=t*Math.PI*2/6,i=Math.cos(o)*e.size,s=Math.sin(o)*e.size;t===0?n.moveTo(i,s):n.lineTo(i,s)}n.closePath(),n.stroke();break;case"star":n.beginPath();for(let t=0;t<10;t++){const o=t*Math.PI*2/10-Math.PI/2,i=t%2===0?e.size:e.size*.5,s=Math.cos(o)*i,a=Math.sin(o)*i;t===0?n.moveTo(s,a):n.lineTo(s,a)}n.closePath(),n.stroke();break}n.restore()}),n.globalAlpha=1}function G(){const e=document.getElementById("selectedTool");e&&(e.innerHTML=P[x].icon)}function I(e){if(e>0?x=(x+1)%P.length:x=(x-1+P.length)%P.length,w=P[x].name,G(),w==="llm")oe();else switch(w){case"symmetry":X=4;break;case"kaleidoscope":break;case"brush":break;case"lines":break;case"drip":break;case"sacred":Q();break}console.log(`Selected tool: ${P[x].label}`)}function oe(){const e=document.getElementById("selectedTool");if(e){const t=document.createElement("div");if(t.style.cssText=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.remove()},2e3)}function ie(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");t.style.display==="flex"&&(t.style.display="none"),e.style.display==="flex"?e.style.display="none":(e.style.display="flex",e.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===z?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function se(){const e=document.getElementById("canvasColorPicker"),t=document.getElementById("brushColorPicker");e.style.display==="flex"&&(e.style.display="none"),t.style.display==="flex"?t.style.display="none":(t.style.display="flex",t.querySelectorAll(".color-swatch").forEach(i=>{i.dataset.color===f?i.classList.add("selected-color"):i.classList.remove("selected-color")}))}function ae(e){z=e,n.fillStyle=z,n.fillRect(0,0,r.width,r.height),A(),document.getElementById("canvasColorPicker").style.display="none",console.log("Canvas background color set to:",e)}function re(e){f=e,document.getElementById("brushColorPicker").style.display="none",console.log("Brush color set to:",e)}function le(e){S=!0;const t=r.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(w==="sacred"){N(o,i);return}H(o,i)}function ce(e){if(!S)return;const t=r.getBoundingClientRect(),o=e.clientX-t.left,i=e.clientY-t.top;if(w==="sacred"){Math.random()<.3&&N(o,i);return}H(o,i)}function O(){S&&(S=!1,A(),g.prevX=null,g.prevY=null,u.prevX=null,u.prevY=null,y.prevX=null,y.prevY=null,v.prevX=null,v.prevY=null)}function H(e,t){switch(w){case"brush":g(e,t);break;case"kaleidoscope":u(e,t);break;case"symmetry":b(e,t);break;case"lines":y(e,t);break;case"drip":v(e,t);break}}function de(){window.DeviceMotionEvent&&window.addEventListener("devicemotion",s=>{s.accelerationIncludingGravity&&(L.x=s.accelerationIncludingGravity.x||0,L.y=s.accelerationIncludingGravity.y||0,L.z=s.accelerationIncludingGravity.z||0)});let e=0,t=0,o=0,i=15;window.addEventListener("devicemotion",s=>{if(s.accelerationIncludingGravity){const a=s.accelerationIncludingGravity.x||0,l=s.accelerationIncludingGravity.y||0,c=s.accelerationIncludingGravity.z||0,d=Math.abs(a-e),p=Math.abs(l-t),k=Math.abs(c-o);if(e=a,t=l,o=c,w!=="sacred"&&(d>i||p>i||k>i)){const M=Date.now();M-D>1e3&&(D=M,Z())}}})}window.addEventListener("scrollUp",()=>{I(-1)});window.addEventListener("scrollDown",()=>{I(1)});window.addEventListener("sideClick",()=>{W()});document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"&&(I(-1),e.preventDefault()),e.key==="ArrowDown"&&(I(1),e.preventDefault()),e.key==="Enter"){if(P[x].name==="llm"){ne();return}W(),e.preventDefault()}});function pe(){J(),de(),r.addEventListener("mousedown",le),r.addEventListener("mousemove",ce),r.addEventListener("mouseup",O),r.addEventListener("mouseleave",O),r.addEventListener("touchstart",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousedown",{clientX:o.clientX,clientY:o.clientY});r.dispatchEvent(i)}),r.addEventListener("touchmove",t=>{t.preventDefault();const o=t.touches[0],i=new MouseEvent("mousemove",{clientX:o.clientX,clientY:o.clientY});r.dispatchEvent(i)}),r.addEventListener("touchend",t=>{t.preventDefault();const o=new MouseEvent("mouseup",{});r.dispatchEvent(o)}),document.getElementById("undoBtn").addEventListener("click",K),document.getElementById("canvasColorBtn").addEventListener("click",ie),document.getElementById("eyedropperBtn").addEventListener("click",se),document.querySelectorAll("#canvasColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("canvasColorPicker").querySelectorAll(".color-swatch").forEach(s=>s.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{ae(t.dataset.color)},200)})}),document.querySelectorAll("#brushColorPicker .color-swatch").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("brushColorPicker").querySelectorAll(".color-swatch").forEach(s=>s.classList.remove("selected-color")),t.classList.add("selected-color"),setTimeout(()=>{re(t.dataset.color)},200)})}),G();function e(){ee(),te(),requestAnimationFrame(e)}e(),console.log("R1 Digital Painting App initialized with tool:",w)}document.addEventListener("DOMContentLoaded",pe);window.handleLLMResponse=function(e){const t=document.getElementById("adviceText"),o=document.getElementById("adviceOverlay");t&&o&&(t.textContent=e,o.style.display="flex",setTimeout(()=>{o.style.display="none"},5e3))};window.onPluginMessage=function(e){if(console.log("Received plugin message:",e),e&&e.message){const t=document.createElement("div");t.textContent=e.message.includes("sent")||e.message.includes("success")?"Email sent successfully!":"Status: "+e.message,t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}};document.addEventListener("click",e=>{const t=document.getElementById("adviceOverlay");t&&e.target===t&&(t.style.display="none")});function W(){const e=r.toDataURL("image/png");ue(e)}function ue(e){const t=document.createElement("div");t.id="emailOverlay",t.style.cssText=`
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
  `,l.addEventListener("click",()=>{const d=s.value.trim();if(d&&me(d))t.remove(),he(e,d);else{const p=document.createElement("div");p.textContent="Please enter a valid email",p.style.cssText=`
        color: #ff4444;
        font-size: 10px;
        margin-top: 5px;
        text-align: center;
      `,o.appendChild(p),setTimeout(()=>{p.parentNode&&p.remove()},2e3)}}),c.addEventListener("click",()=>{t.remove()}),a.appendChild(l),a.appendChild(c),o.appendChild(i),o.appendChild(s),o.appendChild(a),t.appendChild(o),document.body.appendChild(t),s.focus()}function me(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}async function he(e,t){const o=document.createElement("div");o.textContent="Processing artwork...",o.style.cssText=`
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
  `,document.body.appendChild(o);try{const i=ge(e),s=new FormData;s.append("fileToUpload",i,"artwork.png"),s.append("reqtype","fileupload"),o.textContent="Uploading artwork...",console.log("Starting upload to catbox.moe");const a=new AbortController,l=setTimeout(()=>a.abort(),15e3),c=await fetch("https://catbox.moe/user/api.php",{method:"POST",body:s,signal:a.signal});if(clearTimeout(l),!c.ok)throw new Error(`Upload failed with status: ${c.status} - ${c.statusText}`);const d=await c.text();if(console.log("Image uploaded successfully. URL:",d),!d||!d.startsWith("http"))throw new Error("Invalid image URL received from catbox: "+d);o.textContent="Sending email...",await fe(d,t,o)}catch(i){console.error("Error in upload and email process:",i);let s="Failed: ";i.name==="AbortError"?s+="Upload timed out. Check internet connection.":i.message.includes("Failed to fetch")?s+="Network error. R1 may block external uploads.":i.message.includes("Upload failed")?s+="Upload server error. Try again later.":s+=i.message,o.parentNode&&(o.textContent=s,setTimeout(()=>{o.parentNode&&o.remove()},8e3))}}async function fe(e,t,o){try{if(console.log("Sending email with image URL:",e,"to:",t),typeof PluginMessageHandler<"u"){const i={message:`Please send an email to ${t} with the digital artwork. The artwork can be viewed at: ${e}`,imageUrl:e,recipientEmail:t,useLLM:!0,wantsR1Response:!0,action:"sendEmailWithArtwork"};console.log("Sending payload to PluginMessageHandler:",i),PluginMessageHandler.postMessage(JSON.stringify(i)),setTimeout(()=>{o.parentNode&&(o.textContent="Email request sent to R1 system!",setTimeout(()=>{o.parentNode&&o.remove()},2e3))},1e3)}else q(e,o)}catch(i){console.error("Error sending email:",i),q(e,o)}}function q(e,t){t.parentNode&&t.remove();const o=document.createElement("div");o.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
    color: white;
    font-size: 12px;
    text-align: center;
  `,o.innerHTML=`
    <h3 style="color: #FE5F00; margin-bottom: 15px;">Artwork Uploaded Successfully!</h3>
    <p style="margin-bottom: 15px;">Your artwork has been uploaded to a public URL:</p>
    <div style="background: #2a2a4a; padding: 10px; border-radius: 5px; 
                border: 1px solid #FE5F00; word-break: break-all; 
                font-size: 10px; margin-bottom: 20px; width: 90%;">
      ${e}
    </div>
    <p style="margin-bottom: 15px; color: #FE5F00;">How to share via email:</p>
    <ol style="text-align: left; margin-bottom: 20px; padding-left: 20px; font-size: 11px;">
      <li>Copy the URL above (long press on mobile)</li>
      <li>Open your email app</li>
      <li>Create a new email</li>
      <li>Paste the URL in the message body</li>
      <li>Send to your friends!</li>
    </ol>
    <p style="font-size: 10px; margin-bottom: 20px; color: #aaa;">
      Note: On R1 device, the system will automatically send the email.
    </p>
    <button id="closeUrlOverlay" style="
      padding: 10px 20px;
      background: #FE5F00;
      color: black;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
    ">Close</button>
  `,document.body.appendChild(o),document.getElementById("closeUrlOverlay").addEventListener("click",()=>{o.remove()})}function ge(e){const t=e.split(";base64,"),o=t[0].split(":")[1],i=atob(t[1]),s=new ArrayBuffer(i.length),a=new Uint8Array(s);for(let l=0;l<i.length;l++)a[l]=i.charCodeAt(l);return new Blob([s],{type:o})}
