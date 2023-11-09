import{c as k,d as O,e as A,f as D,g as L,m as C,n as P,o as R}from"./chunk-DN2P5LLP.js";function $(i,e,t,o){function r(n){return n instanceof t?n:new t(function(a){a(n)})}return new(t||(t=Promise))(function(n,a){function c(s){try{p(o.next(s))}catch(u){a(u)}}function h(s){try{p(o.throw(s))}catch(u){a(u)}}function p(s){s.done?n(s.value):r(s.value).then(c,h)}p((o=o.apply(i,e||[])).next())})}var x=function i(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var o,r,n;if(Array.isArray(e)){if(o=e.length,o!=t.length)return!1;for(r=o;r--!==0;)if(!i(e[r],t[r]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(n=Object.keys(e),o=n.length,o!==Object.keys(t).length)return!1;for(r=o;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,n[r]))return!1;for(r=o;r--!==0;){var a=n[r];if(!i(e[a],t[a]))return!1}return!0}return e!==e&&t!==t},M="__googleMapsScriptId",I;(function(i){i[i.INITIALIZED=0]="INITIALIZED",i[i.LOADING=1]="LOADING",i[i.SUCCESS=2]="SUCCESS",i[i.FAILURE=3]="FAILURE"})(I||(I={}));var S=class i{constructor({apiKey:e,authReferrerPolicy:t,channel:o,client:r,id:n=M,language:a,libraries:c=[],mapIds:h,nonce:p,region:s,retries:u=3,url:y="https://maps.googleapis.com/maps/api/js",version:d}){if(this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=e,this.authReferrerPolicy=t,this.channel=o,this.client=r,this.id=n||M,this.language=a,this.libraries=c,this.mapIds=h,this.nonce=p,this.region=s,this.retries=u,this.url=y,this.version=d,i.instance){if(!x(this.options,i.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(i.instance.options)}`);return i.instance}i.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?I.FAILURE:this.done?I.SUCCESS:this.loading?I.LOADING:I.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let e=this.url;return e+="?callback=__googleMapsCallback",this.apiKey&&(e+=`&key=${this.apiKey}`),this.channel&&(e+=`&channel=${this.channel}`),this.client&&(e+=`&client=${this.client}`),this.libraries.length>0&&(e+=`&libraries=${this.libraries.join(",")}`),this.language&&(e+=`&language=${this.language}`),this.region&&(e+=`&region=${this.region}`),this.version&&(e+=`&v=${this.version}`),this.mapIds&&(e+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(e+=`&auth_referrer_policy=${this.authReferrerPolicy}`),e}deleteScript(){let e=document.getElementById(this.id);e&&e.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((e,t)=>{this.loadCallback(o=>{o?t(o.error):e(window.google)})})}importLibrary(e){return this.execute(),google.maps.importLibrary(e)}loadCallback(e){this.callbacks.push(e),this.execute()}setScript(){var e,t;if(document.getElementById(this.id)){this.callback();return}let o={key:this.apiKey,channel:this.channel,client:this.client,libraries:this.libraries.length&&this.libraries,v:this.version,mapIds:this.mapIds,language:this.language,region:this.region,authReferrerPolicy:this.authReferrerPolicy};Object.keys(o).forEach(n=>!o[n]&&delete o[n]),!((t=(e=window?.google)===null||e===void 0?void 0:e.maps)===null||t===void 0)&&t.importLibrary||(n=>{let a,c,h,p="The Google Maps JavaScript API",s="google",u="importLibrary",y="__ib__",d=document,g=window;g=g[s]||(g[s]={});let w=g.maps||(g.maps={}),b=new Set,l=new URLSearchParams,m=()=>a||(a=new Promise((v,f)=>$(this,void 0,void 0,function*(){var E;yield c=d.createElement("script"),c.id=this.id,l.set("libraries",[...b]+"");for(h in n)l.set(h.replace(/[A-Z]/g,_=>"_"+_[0].toLowerCase()),n[h]);l.set("callback",s+".maps."+y),c.src=this.url+"?"+l,w[y]=v,c.onerror=()=>a=f(Error(p+" could not load.")),c.nonce=this.nonce||((E=d.querySelector("script[nonce]"))===null||E===void 0?void 0:E.nonce)||"",d.head.append(c)})));w[u]?console.warn(p+" only loads once. Ignoring:",n):w[u]=(v,...f)=>b.add(v)&&m().then(()=>w[u](v,...f))})(o);let r=this.libraries.map(n=>this.importLibrary(n));r.length||r.push(this.importLibrary("core")),Promise.all(r).then(()=>this.callback(),n=>{let a=new ErrorEvent("error",{error:n});this.loadErrorCallback(a)})}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(e){if(this.errors.push(e),this.errors.length<=this.retries){let t=this.errors.length*Math.pow(2,this.errors.length);console.error(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},t)}else this.onerrorEvent=e,this.callback()}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(e=>{e(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading||(this.loading=!0,this.setScript())}}};var N=[];function z({element:i,service:e}){let t=D(i),o=[],r=O(i),n=r.length,a=JSON.parse(i.dataset?.center||null),c=e.options?.enableDirections||!1,h=R(e.options?.mapOptions||{}),p=parseInt(i.dataset?.zoom)||h.zoom||14;h.center=a??{lat:0,lng:0},h.zoom=p;let s=new google.maps.Map(t,h),u=new google.maps.InfoWindow({maxWidth:500}),y=c?new google.maps.DirectionsService:null,d=c?new google.maps.DirectionsRenderer({map:s,suppressMarkers:!0}):null,g=0,w=0,b=0;if(d&&d.setMap(s),r.forEach(l=>{let m=A(l.pinColor),v={url:`data:image/svg+xml;charset=UTF-8;base64,${btoa(m.html)}`,anchor:new google.maps.Point(m.iconAnchor[0],m.iconAnchor[1]),scaledSize:new google.maps.Size(m.iconSize[0],m.iconSize[1])},f=new google.maps.Marker({position:{lat:l.lat,lng:l.lng},map:s,draggable:!1,icon:v,zIndex:-20});d&&!k&&f.addListener("click",()=>{if(g++,g==1){w=f.position;return}g==3&&(d.set("directions",null),w=b,g=2),b=f.position,U(y,d,w,b)}),l.html&&f.addListener("click",()=>{u.setContent(l.html),u.open({anchor:f,map:s})}),k&&f.addListener("click",()=>{window.addressElement=l.element,["mousedown","mouseup"].forEach(E=>l.element.dispatchEvent(new Event(E,{bubbles:!0})))}),o.push(f)}),n>1){let l=new google.maps.LatLngBounds;o.forEach(m=>{l.extend(m.getPosition())}),s.fitBounds(l),setTimeout(()=>{s.getZoom()>p&&s.setZoom(p)},200)}document.dispatchEvent(new CustomEvent("initializedJonnittoMaps",{detail:{element:i,service:e,map:s,markers:o}})),N.push(s)}async function T(){let{service:i,effect:e}=await P(),t=i.options.apiKey;if(!t){console.error("No API key found");return}C(e);let o=[];i?.options?.enableDirections&&o.push("places"),await new S({apiKey:t,libraries:o}).load(),L(i.name,n=>{z({element:n,service:i})})}var j=T;function U(i,e,t,o){i.route({origin:t,destination:o,travelMode:google.maps.TravelMode.DRIVING},function(r,n){n==google.maps.DirectionsStatus.OK&&e.setDirections(r)})}j();
/*! For license information please see GoogleMaps.js.LEGAL.txt */
//# sourceMappingURL=GoogleMaps.js.map
