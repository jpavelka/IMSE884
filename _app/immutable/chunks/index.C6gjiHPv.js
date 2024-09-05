var X=Object.defineProperty;var Y=(t,e,n)=>e in t?X(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var p=(t,e,n)=>(Y(t,typeof e!="symbol"?e+"":e,n),n);import{n as v,r as N,i as O,f as j,h as Z,j as q,k as tt,l as et,m as nt,p as it,q as z,v as st,w as rt,x as lt}from"./scheduler.G9ZNS5Ay.js";const F=typeof window<"u";let ot=F?()=>window.performance.now():()=>Date.now(),R=F?t=>requestAnimationFrame(t):v;const w=new Set;function U(t){w.forEach(e=>{e.c(t)||(w.delete(e),e.f())}),w.size!==0&&R(U)}function ct(t){let e;return w.size===0&&R(U),{promise:new Promise(n=>{w.add(e={c:t,f:n})}),abort(){w.delete(e)}}}let S=!1;function at(){S=!0}function ft(){S=!1}function ut(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function _t(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let c=0;c<e.length;c++){const _=e[c];_.claim_order!==void 0&&r.push(_)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let r=0;r<e.length;r++){const c=e[r].claim_order,_=(s>0&&e[n[s]].claim_order<=c?s+1:ut(1,s,h=>e[n[h]].claim_order,c))-1;i[r]=n[_]+1;const f=_+1;n[f]=r,s=Math.max(f,s)}const a=[],l=[];let o=e.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(a.push(e[r-1]);o>=r;o--)l.push(e[o]);o--}for(;o>=0;o--)l.push(e[o]);a.reverse(),l.sort((r,c)=>r.claim_order-c.claim_order);for(let r=0,c=0;r<l.length;r++){for(;c<a.length&&l[r].claim_order>=a[c].claim_order;)c++;const _=c<a.length?a[c]:null;t.insertBefore(l[r],_)}}function dt(t,e){t.appendChild(e)}function V(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function ht(t){const e=B("style");return e.textContent="/* empty */",mt(V(t),e),e.sheet}function mt(t,e){return dt(t.head||t,e),e.sheet}function pt(t,e){if(S){for(_t(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function yt(t,e,n){t.insertBefore(e,n||null)}function $t(t,e,n){S&&!n?pt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function E(t){t.parentNode&&t.parentNode.removeChild(t)}function It(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function B(t){return document.createElement(t)}function gt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function Gt(){return k(" ")}function Ft(){return k("")}function Ut(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function W(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const wt=["width","height"];function xt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&wt.indexOf(i)===-1?t[i]=e[i]:W(t,i,e[i])}function vt(t,e){Object.keys(e).forEach(n=>{Et(t,n,e[n])})}function Et(t,e,n){const i=e.toLowerCase();i in t?t[i]=typeof t[i]=="boolean"&&n===""?!0:n:e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:W(t,e,n)}function Vt(t){return/-/.test(t)?vt:xt}function Wt(t){return t.dataset.svelteH}function Nt(t){return Array.from(t.childNodes)}function J(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function K(t,e,n,i,s=!1){J(t);const a=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const o=t[l];if(e(o)){const r=n(o);return r===void 0?t.splice(l,1):t[l]=r,s||(t.claim_info.last_index=l),o}}for(let l=t.claim_info.last_index-1;l>=0;l--){const o=t[l];if(e(o)){const r=n(o);return r===void 0?t.splice(l,1):t[l]=r,s?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,o}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function Tt(t,e,n,i){return K(t,s=>s.nodeName===e,s=>{const a=[];for(let l=0;l<s.attributes.length;l++){const o=s.attributes[l];n[o.name]||a.push(o.name)}a.forEach(l=>s.removeAttribute(l))},()=>i(e))}function Jt(t,e,n){return Tt(t,e,n,B)}function At(t,e){return K(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>k(e),!0)}function Kt(t){return At(t," ")}function I(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Qt(t,e){const n=I(t,"HTML_TAG_START",0),i=I(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new M(e);J(t);const s=t.splice(n,i-n+1);E(s[0]),E(s[s.length-1]);const a=s.slice(1,s.length-1);if(a.length===0)return new M(e);for(const l of a)l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new M(e,a)}function Xt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Yt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function bt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Zt(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const a=s.textContent.trim();a===`HEAD_${t}_END`?(i-=1,n.push(s)):a===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class Ct{constructor(e=!1){p(this,"is_svg",!1);p(this,"e");p(this,"n");p(this,"t");p(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=gt(n.nodeName):this.e=B(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)yt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(E)}}class M extends Ct{constructor(n=!1,i){super(n);p(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)$t(this.t,this.n[i],n)}}function te(t,e){return new t(e)}const b=new Map;let C=0;function St(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ht(t,e){const n={stylesheet:ht(e),rules:{}};return b.set(t,n),n}function G(t,e,n,i,s,a,l,o=0){const r=16.666/i;let c=`{
`;for(let d=0;d<=1;d+=r){const g=e+(n-e)*a(d);c+=d*100+`%{${l(g,1-g)}}
`}const _=c+`100% {${l(n,1-n)}}
}`,f=`__svelte_${St(_)}_${o}`,h=V(t),{stylesheet:$,rules:u}=b.get(h)||Ht(h,t);u[f]||(u[f]=!0,$.insertRule(`@keyframes ${f} ${_}`,$.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${f} ${i}ms linear ${s}ms 1 both`,C+=1,f}function Dt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?a=>a.indexOf(e)<0:a=>a.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),C-=s,C||Lt())}function Lt(){R(()=>{C||(b.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&E(e)}),b.clear())})}let x;function Mt(){return x||(x=Promise.resolve(),x.then(()=>{x=null})),x}function P(t,e,n){t.dispatchEvent(bt(`${e?"intro":"outro"}${n}`))}const A=new Set;let y;function ee(){y={r:0,c:[],p:y}}function ne(){y.r||N(y.c),y=y.p}function Pt(t,e){t&&t.i&&(A.delete(t),t.i(e))}function ie(t,e,n,i){if(t&&t.o){if(A.has(t))return;A.add(t),y.c.push(()=>{A.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const jt={duration:0};function se(t,e,n,i){let a=e(t,n,{direction:"both"}),l=i?0:1,o=null,r=null,c=null,_;function f(){c&&Dt(t,c)}function h(u,m){const d=u.b-l;return m*=Math.abs(d),{a:l,b:u.b,d,duration:m,start:u.start,end:u.start+m,group:u.group}}function $(u){const{delay:m=0,duration:d=300,easing:g=Z,tick:H=v,css:D}=a||jt,L={start:ot()+m,b:u};u||(L.group=y,y.r+=1),"inert"in t&&(u?_!==void 0&&(t.inert=_):(_=t.inert,t.inert=!0)),o||r?r=L:(D&&(f(),c=G(t,l,u,d,m,g,D)),u&&H(0,1),o=h(L,d),j(()=>P(t,u,"start")),ct(T=>{if(r&&T>r.start&&(o=h(r,d),r=null,P(t,o.b,"start"),D&&(f(),c=G(t,l,o.b,o.duration,0,g,a.css))),o){if(T>=o.end)H(l=o.b,1-l),P(t,o.b,"end"),r||(o.b?f():--o.group.r||N(o.group.c)),o=null;else if(T>=o.start){const Q=T-o.start;l=o.a+o.d*g(Q/o.duration),H(l,1-l)}}return!!(o||r)}))}return{run(u){O(a)?Mt().then(()=>{a=a({direction:u?"in":"out"}),$(u)}):$(u)},end(){f(),o=r=null}}}function re(t){t&&t.c()}function le(t,e){t&&t.l(e)}function Ot(t,e,n){const{fragment:i,after_update:s}=t.$$;i&&i.m(e,n),j(()=>{const a=t.$$.on_mount.map(st).filter(O);t.$$.on_destroy?t.$$.on_destroy.push(...a):N(a),t.$$.on_mount=[]}),s.forEach(j)}function Rt(t,e){const n=t.$$;n.fragment!==null&&(nt(n.after_update),N(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Bt(t,e){t.$$.dirty[0]===-1&&(rt.push(t),lt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function oe(t,e,n,i,s,a,l=null,o=[-1]){const r=it;z(t);const c=t.$$={fragment:null,ctx:[],props:a,update:v,not_equal:s,bound:q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:q(),dirty:o,skip_bound:!1,root:e.target||r.$$.root};l&&l(c.root);let _=!1;if(c.ctx=n?n(t,e.props||{},(f,h,...$)=>{const u=$.length?$[0]:h;return c.ctx&&s(c.ctx[f],c.ctx[f]=u)&&(!c.skip_bound&&c.bound[f]&&c.bound[f](u),_&&Bt(t,f)),h}):[],c.update(),_=!0,N(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){at();const f=Nt(e.target);c.fragment&&c.fragment.l(f),f.forEach(E)}else c.fragment&&c.fragment.c();e.intro&&Pt(t.$$.fragment),Ot(t,e.target,e.anchor),ft(),tt()}z(r)}class ce{constructor(){p(this,"$$");p(this,"$$set")}$destroy(){Rt(this,1),this.$destroy=v}$on(e,n){if(!O(n))return v;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const kt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(kt);export{It as A,Qt as B,se as C,Vt as D,Zt as E,M as H,ce as S,ie as a,k as b,Jt as c,Nt as d,B as e,At as f,E as g,Kt as h,oe as i,$t as j,pt as k,Xt as l,Ft as m,ne as n,W as o,Yt as p,ee as q,te as r,Gt as s,Pt as t,re as u,le as v,Ot as w,Rt as x,Wt as y,Ut as z};
