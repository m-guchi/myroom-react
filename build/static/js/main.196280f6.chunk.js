(this["webpackJsonpmyroom-react"]=this["webpackJsonpmyroom-react"]||[]).push([[0],{22:function(t,e,c){},44:function(t,e,c){"use strict";c.r(e);var n=c(0),r=c.n(n),a=c(15),o=c.n(a),s=(c(22),c(54)),i=c(5),d=c(16),j=c.n(d),u=c(2),b=Object(s.a)((function(t){return{root:{textAlign:"center",margin:"5rem auto",padding:"1rem",width:"90vw",backgroundColor:"#cbddf5"},text:{fontSize:"2rem"}}}));function l(){var t=b(),e=Object(n.useState)(),c=Object(i.a)(e,2),r=c[0],a=c[1],o=Object(n.useState)(),s=Object(i.a)(o,2),d=s[0],l=s[1];Object(n.useEffect)((function(){m()}),[]);var m=function(){j.a.get("./api/dht/last").then((function(t){console.log(t.data),a(t.data.temp),l(t.data.humid)})).catch((function(t){console.error(t)}))};return Object(u.jsxs)("div",{className:t.root,children:[Object(u.jsxs)("div",{className:t.text,children:["\u6e29\u5ea6\uff1a",r,"\u2103"]}),Object(u.jsxs)("div",{className:t.text,children:["\u6e7f\u5ea6\uff1a",d,"\uff05"]})]})}var m=Object(s.a)((function(t){return{root:{color:"#222"}}}));function O(t){var e=m();return Object(u.jsx)("div",{className:e.root,children:Object(u.jsx)(l,{})})}var f=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(O,{})})};o.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(f,{})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.196280f6.chunk.js.map