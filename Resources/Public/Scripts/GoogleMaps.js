(()=>{var S=window.name=="neos-content-main",O=document,L=O.documentElement,A=window.matchMedia("(prefers-color-scheme: dark)");function C(t){return[...t.querySelectorAll(".carbon-geomap-coordinate")].map(e=>{let i=e.dataset,n=JSON.parse(i?.coordinate||null);return n?{element:e,html:e.outerHTML,popup:!!e.innerHTML,lat:n.lat,lng:n.lng,pinColor:i?.pinColor||"red"}:null}).filter(e=>e!==null)}function M(t){return{html:`<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="${t}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="${t}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="30"/></svg>`,iconAnchor:[12,32],iconSize:[25,30],popupAnchor:[0,-28]}}function D(t){return t.querySelector(".carbon-geomap__canvas")}function j(t,e){[...O.querySelectorAll(`.carbon-geomap.jonnitto-maps--${t.toLowerCase()}`)].forEach(i=>{i.querySelector(".carbon-geomap__reload-button")?.remove(),!i.classList.contains("jonnitto-maps--done")&&(i.classList.add("jonnitto-maps--done"),e(i))})}function N(t,e,i=!0){if(!(!i||typeof t!="function")){if(e){new MutationObserver(o=>{o.forEach(function(r){r.type==="attributes"&&r.attributeName==="class"&&t()})}).observe(L,{attributes:!0});return}A.addEventListener("change",t)}}function z(t){return!!(!t&&A.matches||t&&L.classList.contains("dark"))}function U(t){return t?.basedOn==="class"}function q(t){return!!(typeof t=="object"&&t?.light&&t?.dark)}function _(t){if(!q(t))return;let e=()=>{let n=z(i)?t.dark:t.light;[...document.querySelectorAll(".jonnitto-maps .carbon-geomap__canvas")].forEach(o=>{o.dataset.effect=n})},i=U(t);N(e,i),e()}async function P(){return await fetch("/maps-settings.json").then(t=>t.json())}function R(t){return Object.fromEntries(Object.entries(t).filter(([e,i])=>i!=null))}function F(t){t(),window.addEventListener("jonnitto-maps:init",t,!0)}function K(t,e,i,n){function o(r){return r instanceof i?r:new i(function(a){a(r)})}return new(i||(i=Promise))(function(r,a){function l(s){try{u(n.next(s))}catch(p){a(p)}}function h(s){try{u(n.throw(s))}catch(p){a(p)}}function u(s){s.done?r(s.value):o(s.value).then(l,h)}u((n=n.apply(t,e||[])).next())})}function B(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var G=function t(e,i){if(e===i)return!0;if(e&&i&&typeof e=="object"&&typeof i=="object"){if(e.constructor!==i.constructor)return!1;var n,o,r;if(Array.isArray(e)){if(n=e.length,n!=i.length)return!1;for(o=n;o--!==0;)if(!t(e[o],i[o]))return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===i.toString();if(r=Object.keys(e),n=r.length,n!==Object.keys(i).length)return!1;for(o=n;o--!==0;)if(!Object.prototype.hasOwnProperty.call(i,r[o]))return!1;for(o=n;o--!==0;){var a=r[o];if(!t(e[a],i[a]))return!1}return!0}return e!==e&&i!==i},J=B(G),T="__googleMapsScriptId",E;(function(t){t[t.INITIALIZED=0]="INITIALIZED",t[t.LOADING=1]="LOADING",t[t.SUCCESS=2]="SUCCESS",t[t.FAILURE=3]="FAILURE"})(E||(E={}));var I=class t{constructor({apiKey:e,authReferrerPolicy:i,channel:n,client:o,id:r=T,language:a,libraries:l=[],mapIds:h,nonce:u,region:s,retries:p=3,url:v="https://maps.googleapis.com/maps/api/js",version:d}){if(this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=e,this.authReferrerPolicy=i,this.channel=n,this.client=o,this.id=r||T,this.language=a,this.libraries=l,this.mapIds=h,this.nonce=u,this.region=s,this.retries=p,this.url=v,this.version=d,t.instance){if(!J(this.options,t.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(t.instance.options)}`);return t.instance}t.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?E.FAILURE:this.done?E.SUCCESS:this.loading?E.LOADING:E.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let e=this.url;return e+="?callback=__googleMapsCallback&loading=async",this.apiKey&&(e+=`&key=${this.apiKey}`),this.channel&&(e+=`&channel=${this.channel}`),this.client&&(e+=`&client=${this.client}`),this.libraries.length>0&&(e+=`&libraries=${this.libraries.join(",")}`),this.language&&(e+=`&language=${this.language}`),this.region&&(e+=`&region=${this.region}`),this.version&&(e+=`&v=${this.version}`),this.mapIds&&(e+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(e+=`&auth_referrer_policy=${this.authReferrerPolicy}`),e}deleteScript(){let e=document.getElementById(this.id);e&&e.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((e,i)=>{this.loadCallback(n=>{n?i(n.error):e(window.google)})})}importLibrary(e){return this.execute(),google.maps.importLibrary(e)}loadCallback(e){this.callbacks.push(e),this.execute()}setScript(){var e,i;if(document.getElementById(this.id)){this.callback();return}let n={key:this.apiKey,channel:this.channel,client:this.client,libraries:this.libraries.length&&this.libraries,v:this.version,mapIds:this.mapIds,language:this.language,region:this.region,authReferrerPolicy:this.authReferrerPolicy};Object.keys(n).forEach(r=>!n[r]&&delete n[r]),!((i=(e=window?.google)===null||e===void 0?void 0:e.maps)===null||i===void 0)&&i.importLibrary||(r=>{let a,l,h,u="The Google Maps JavaScript API",s="google",p="importLibrary",v="__ib__",d=document,g=window;g=g[s]||(g[s]={});let w=g.maps||(g.maps={}),b=new Set,c=new URLSearchParams,m=()=>a||(a=new Promise((y,f)=>K(this,void 0,void 0,function*(){var k;yield l=d.createElement("script"),l.id=this.id,c.set("libraries",[...b]+"");for(h in r)c.set(h.replace(/[A-Z]/g,x=>"_"+x[0].toLowerCase()),r[h]);c.set("callback",s+".maps."+v),l.src=this.url+"?"+c,w[v]=y,l.onerror=()=>a=f(Error(u+" could not load.")),l.nonce=this.nonce||((k=d.querySelector("script[nonce]"))===null||k===void 0?void 0:k.nonce)||"",d.head.append(l)})));w[p]?console.warn(u+" only loads once. Ignoring:",r):w[p]=(y,...f)=>b.add(y)&&m().then(()=>w[p](y,...f))})(n);let o=this.libraries.map(r=>this.importLibrary(r));o.length||o.push(this.importLibrary("core")),Promise.all(o).then(()=>this.callback(),r=>{let a=new ErrorEvent("error",{error:r});this.loadErrorCallback(a)})}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(e){if(this.errors.push(e),this.errors.length<=this.retries){let i=this.errors.length*Math.pow(2,this.errors.length);console.error(`Failed to load Google Maps script, retrying in ${i} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},i)}else this.onerrorEvent=e,this.callback()}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(e=>{e(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),!this.loading)if(this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading=!0,this.setScript()}}};var Z=[];function H({element:t,service:e}){let i=D(t),n=[],o=C(t),r=o.length,a=JSON.parse(t.dataset?.center||null),l=e.options?.enableDirections||!1,h=R(e.options?.mapOptions||{}),u=parseInt(t.dataset?.zoom)||h.zoom||14;h.center=a??{lat:0,lng:0},h.zoom=u;let s=new google.maps.Map(i,h),p=new google.maps.InfoWindow({maxWidth:500}),v=l?new google.maps.DirectionsService:null,d=l?new google.maps.DirectionsRenderer({map:s,suppressMarkers:!0}):null,g=0,w=0,b=0;if(d&&d.setMap(s),o.forEach(c=>{let m=M(c.pinColor),y={url:`data:image/svg+xml;charset=UTF-8;base64,${btoa(m.html)}`,anchor:new google.maps.Point(m.iconAnchor[0],m.iconAnchor[1]),scaledSize:new google.maps.Size(m.iconSize[0],m.iconSize[1])},f=new google.maps.Marker({position:{lat:c.lat,lng:c.lng},map:s,draggable:!1,icon:y,zIndex:-20});d&&!S&&f.addListener("click",()=>{if(g++,g==1){w=f.position;return}g==3&&(d.set("directions",null),w=b,g=2),b=f.position,V(v,d,w,b)}),c.html&&f.addListener("click",()=>{p.setContent(c.html),p.open({anchor:f,map:s})}),S&&f.addListener("click",()=>{window.addressElement=c.element,["mousedown","mouseup"].forEach(k=>c.element.dispatchEvent(new Event(k,{bubbles:!0})))}),n.push(f)}),r>1){let c=new google.maps.LatLngBounds;n.forEach(m=>{c.extend(m.getPosition())}),s.fitBounds(c),setTimeout(()=>{s.getZoom()>u&&s.setZoom(u)},200)}document.dispatchEvent(new CustomEvent("initializedJonnittoMaps",{detail:{element:t,service:e,map:s,markers:n}})),Z.push(s)}async function W(){let{service:t,effect:e}=await P(),i=t.options.apiKey;if(!i){console.error("No API key found");return}let n=[];t?.options?.enableDirections&&n.push("places"),await new I({apiKey:i,libraries:n}).load(),F(()=>{_(e),j(t.name,r=>{H({element:r,service:t})})})}var $=W;function V(t,e,i,n){t.route({origin:i,destination:n,travelMode:google.maps.TravelMode.DRIVING},function(o,r){r==google.maps.DirectionsStatus.OK&&e.setDirections(o)})}$();})();
/*! For license information please see GoogleMaps.js.LEGAL.txt */
//# sourceMappingURL=GoogleMaps.js.map
