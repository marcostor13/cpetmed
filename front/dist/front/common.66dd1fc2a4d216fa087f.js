(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"5u0j":function(e,t,i){"use strict";i.d(t,"a",(function(){return p}));var a=i("wd/R"),r=i("fXoL"),s=i("H+bZ"),n=i("FQVY");a.locale("es");let p=(()=>{class e{constructor(e,t){this.api=e,this.general=t,this.model="appointment"}save(e){return this.api.api({service:e._id?"update-"+this.model:"save-"+this.model,type:e._id?"patch":"post",data:e})}sendMailPatient(e){return this.api.api({service:"send-email-patient",type:"post",data:e})}sendMailAdmin(e){return this.api.api({service:"send-email-admin",type:"post",data:e})}get(){return this.api.api({service:"get-"+this.model,type:"get",data:null})}delete(e){return this.api.api({service:`delete-${this.model}/${e}`,type:"delete",data:null})}getHours(e,t){let i=[];return t.map(t=>{t.date===e&&(i=[...i,{hour:t.hour,inactive:t.inactive}])}),i}}return e.\u0275fac=function(t){return new(t||e)(r.Yb(s.a),r.Yb(n.a))},e.\u0275prov=r.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},"D/9S":function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var a=i("fXoL"),r=i("H+bZ");let s=(()=>{class e{constructor(e){this.api=e,this.model="specialty"}save(e){return this.api.api({service:e._id?`update-${this.model}/${e._id}`:"save-"+this.model,type:e._id?"patch":"post",data:e})}get(){return this.api.api({service:"get-"+this.model,type:"get",data:null})}delete(e){return this.api.api({service:`delete-${this.model}/${e}`,type:"delete",data:null})}}return e.\u0275fac=function(t){return new(t||e)(a.Yb(r.a))},e.\u0275prov=a.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},x4NB:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var a=i("fXoL"),r=i("H+bZ");let s=(()=>{class e{constructor(e){this.api=e}saveUser(e){return this.api.api({service:e._id?"update-user/"+e._id:"save-user",type:e._id?"patch":"post",data:e})}getUsers(){return this.api.api({service:"get-user",type:"get",data:null})}deleteUser(e){return this.api.api({service:"delete-user/"+e,type:"delete",data:null})}}return e.\u0275fac=function(t){return new(t||e)(a.Yb(r.a))},e.\u0275prov=a.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);