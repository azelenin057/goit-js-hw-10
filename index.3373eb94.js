function e(e){return fetch(`https://api.thecatapi.com/v1/images/seah?api_key=live_c3rFUokWMhzXC4qp5HYr4so0a73lviRVj9JyJbbjMGF6hwvN5ennXkFnIC69TWBF&breed_ids=${e}`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))}const s={selector:document.querySelector(".breed-select"),divCatInfo:document.querySelector(".cat-info"),error:document.querySelector(".error"),loader:document.querySelector(".loader")},{selector:t,divCatInfo:i,loader:d,error:a}=s;function n(){a.classList.remove("is-hidden")}a.classList.add("is-hidden"),fetch("https://api.thecatapi.com/v1/breeds?api_key=live_c3rFUokWMhzXC4qp5HYr4so0a73lviRVj9JyJbbjMGF6hwvN5ennXkFnIC69TWBF").then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>{e.map((e=>({text:e.name,value:e.id}))).forEach((e=>{const s=document.createElement("option");s.value=e.value,s.text=e.text,t.appendChild(s),d.classList.add("is-hidden"),t.classList.remove("is-hidden")}))})).catch((e=>{t.classList.add("is-hidden"),d.classList.add("is-hidden"),n()})),t.addEventListener("change",(function(s){d.classList.remove("is-hidden"),t.classList.add("is-hidden"),i.classList.add("is-hidden"),a.classList.add("is-hidden");e(s.currentTarget.value).then((e=>{d.classList.add("is-hidden"),t.classList.remove("is-hidden");const{url:s,breeds:a}=e[0];i.innerHTML=`<div class="box-img"><img src="${s}" alt="${a[0].name}" width="400"/></div><div class="box"><h1>${a[0].name}</h1><p>${a[0].description}</p><p><b>Temperament:</b> ${a[0].temperament}</p></div>`,i.classList.remove("is-hidden")})).catch((e=>{t.classList.remove("is-hidden"),d.classList.add("is-hidden"),n()}))}));
//# sourceMappingURL=index.3373eb94.js.map
