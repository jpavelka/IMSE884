function w(){}const A=t=>t;function j(t,n){for(const e in n)t[e]=n[e];return t}function E(t){return t()}function B(){return Object.create(null)}function v(t){t.forEach(E)}function C(t){return typeof t=="function"}function F(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let i;function P(t,n){return t===n?!0:(i||(i=document.createElement("a")),i.href=n,t===i.href)}function S(t){return Object.keys(t).length===0}function y(t,...n){if(t==null){for(const r of n)r(void 0);return w}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function U(t){let n;return y(t,e=>n=e)(),n}function D(t,n,e){t.$$.on_destroy.push(y(n,e))}function G(t,n,e,r){if(t){const o=m(t,n,e,r);return t[0](o)}}function m(t,n,e,r){return t[1]&&r?j(e.ctx.slice(),t[1](r(n))):e.ctx}function H(t,n,e,r){if(t[2]&&r){const o=t[2](r(e));if(n.dirty===void 0)return o;if(typeof o=="object"){const a=[],_=Math.max(n.dirty.length,o.length);for(let s=0;s<_;s+=1)a[s]=n.dirty[s]|o[s];return a}return n.dirty|o}return n.dirty}function I(t,n,e,r,o,a){if(o){const _=m(n,e,r,a);t.p(_,o)}}function J(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}function K(t){const n={};for(const e in t)n[e]=!0;return n}function L(t){return t??""}let f;function d(t){f=t}function k(){if(!f)throw new Error("Function called outside component initialization");return f}function N(t){k().$$.on_mount.push(t)}function Q(t){k().$$.after_update.push(t)}const l=[],g=[];let c=[];const b=[],x=Promise.resolve();let p=!1;function q(){p||(p=!0,x.then(z))}function R(){return q(),x}function O(t){c.push(t)}const h=new Set;let u=0;function z(){if(u!==0)return;const t=f;do{try{for(;u<l.length;){const n=l[u];u++,d(n),M(n.$$)}}catch(n){throw l.length=0,u=0,n}for(d(null),l.length=0,u=0;g.length;)g.pop()();for(let n=0;n<c.length;n+=1){const e=c[n];h.has(e)||(h.add(e),e())}c.length=0}while(l.length);for(;b.length;)b.pop()();p=!1,h.clear(),d(t)}function M(t){if(t.fragment!==null){t.update(),v(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function T(t){const n=[],e=[];c.forEach(r=>t.indexOf(r)===-1?n.push(r):e.push(r)),e.forEach(r=>r()),c=n}export{U as A,K as B,P as C,H as a,D as b,G as c,Q as d,g as e,O as f,J as g,A as h,C as i,B as j,z as k,S as l,T as m,w as n,N as o,f as p,d as q,v as r,F as s,R as t,I as u,E as v,l as w,q as x,j as y,L as z};
