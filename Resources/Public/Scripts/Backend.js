(()=>{var n="jonnitto-maps",a=[...document.querySelectorAll(".neos-contentcollection")],r={childList:!0},f=t=>{let o=!1;for(let c of t){let{type:i,addedNodes:l}=c;i==="childList"&&[...l].forEach(e=>{let s=e.classList.contains(n)?e:e.querySelector(`.${n}`);s&&!s.classList.contains(`${n}--done`)&&(o=!0)})}o&&window.dispatchEvent(new Event("jonnitto-maps:init"))},d=new MutationObserver(f);a.forEach(t=>d.observe(t,r));})();
/*! For license information please see Backend.js.LEGAL.txt */
//# sourceMappingURL=Backend.js.map
