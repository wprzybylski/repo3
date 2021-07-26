WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.atlassian.analytics.analytics-client:js-events', location = 'js/store-1.3.1.js' */
(function(){var l={},h=window,k=h.document,c="localStorage",n="globalStorage",d="__storejs__",g;l.disabled=false;l.set=function(e,o){};l.get=function(e){};l.remove=function(e){};l.clear=function(){};l.transact=function(e,o){var p=l.get(e);if(typeof p=="undefined"){p={}}o(p);l.set(e,p)};l.serialize=function(e){return JSON.stringify(e)};l.deserialize=function(e){if(typeof e!="string"){return undefined}return JSON.parse(e)};function b(){try{return(c in h&&h[c])}catch(e){return false}}function m(){try{return(n in h&&h[n]&&h[n][h.location.hostname])}catch(e){return false}}if(b()){g=h[c];l.set=function(e,o){if(o===undefined){return l.remove(e)}g.setItem(e,l.serialize(o))};l.get=function(e){return l.deserialize(g.getItem(e))};l.remove=function(e){g.removeItem(e)};l.clear=function(){g.clear()}}else{if(m()){g=h[n][h.location.hostname];l.set=function(e,o){if(o===undefined){return l.remove(e)}g[e]=l.serialize(o)};l.get=function(e){return l.deserialize(g[e]&&g[e].value)};l.remove=function(e){delete g[e]};l.clear=function(){for(var e in g){delete g[e]}}}else{if(k.documentElement.addBehavior){var j,f;try{f=new ActiveXObject("htmlfile");f.open();f.write('<script>document.w=window<\/script><iframe src="/favicon.ico"></frame>');f.close();j=f.w.frames[0].document;g=j.createElement("div")}catch(i){g=k.createElement("div");j=k.body}function a(e){return function(){var p=Array.prototype.slice.call(arguments,0);p.unshift(g);j.appendChild(g);g.addBehavior("#default#userData");g.load(c);var o=e.apply(l,p);j.removeChild(g);return o}}l.set=a(function(p,e,o){if(o===undefined){return l.remove(e)}p.setAttribute(e,l.serialize(o));p.save(c)});l.get=a(function(o,e){return l.deserialize(o.getAttribute(e))});l.remove=a(function(o,e){o.removeAttribute(e);o.save(c)});l.clear=a(function(q){var o=q.XMLDocument.documentElement.attributes;q.load(c);for(var p=0,e;e=o[p];p++){q.removeAttribute(e.name)}q.save(c)})}}}try{l.set(d,d);if(l.get(d)!=d){l.disabled=true}l.remove(d)}catch(i){l.disabled=true}if(typeof module!="undefined"){module.exports=l}else{if(typeof define==="function"&&define.amd){define(l)}else{this.store=l}}})();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.analytics.analytics-client:js-events', location = 'js/page-visibility.js' */
define("atlassian/analytics/page-visibility",function(){var a=(document.hidden!==undefined);var b={supported:a,isHidden:function(){return a?document.hidden:false}};return b});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.analytics.analytics-client:js-events', location = 'js/user-activity-xhr-header.js' */
define("atlassian/analytics/user-activity-xhr-header",["atlassian/analytics/page-visibility"],function(c){var e="x-atlassian-mau-ignore";var d=XMLHttpRequest.prototype.send;var a=window.fetch;var b=false;return{install:function(){if(!b&&c.supported){XMLHttpRequest.prototype.send=function(){if(c.isHidden()){this.setRequestHeader(e,c.isHidden())}d.apply(this,arguments)};if(a){window.fetch=function(f,i){var g=i||{};var h=g.headers;if(c.isHidden()){g.headers=(h)?new Headers(h):new Headers();g.headers.set(e,c.isHidden())}return a.call(this,f,g)}}b=true}},uninstall:function(){if(b){XMLHttpRequest.prototype.send=d;if(a){window.fetch=a}}b=false}}});require("atlassian/analytics/user-activity-xhr-header").install();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.analytics.analytics-client:js-events', location = 'js/atlassian-analytics.js' */
(function(d){var q=AJS.$.ajax;var l="atlassian-analytics";var j=typeof AJS.contextPath==="function"?AJS.contextPath():"";var p=null;var m=null;var g=null;var r="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(z){var y=Math.random()*16|0,x=z=="x"?y:(y&3|8);return x.toString(16)});var t=function(){var x="unknown";if(document.body.id=="jira"){x="jira"}else{if(document.body.id=="com-atlassian-confluence"){x="confluence"}}m=l+"."+x;g=m+".lock"};var f=function(){if(store.get(g)){return false}store.set(g,r);return(store.get(g)===r)};var u=function(){store.set(g,null)};var i=function(){var y=[],A,B,x,z;if(AJS.EventQueue.length==0){return}y=store.get(m)||y;for(x=0,z=AJS.EventQueue.length;x<z;++x){B=AJS.EventQueue[x];if(B.name){A={name:B.name,properties:B.properties,time:B.time||0};y.push(A)}}AJS.EventQueue.length=0;store.set(m,y)};var v=0;var a=function(x){return Math.min(5000*Math.pow(2,x),5*60*1000)};var e=0;var h=function(){var A;function y(){setTimeout(h,a(v=0))}function x(){setTimeout(h,a(++v))}if(!f()){++e;if(e<20){return y()}}else{e=0}try{i();A=store.get(m);if(!A||!A.length){return y()}store.remove(m);if(!o(A)){return y()}var B=new Date().getTime();for(var z=0;z<A.length;z++){if(A[z].time>0){A[z].timeDelta=A[z].time-B}else{A[z].timeDelta=z-A.length}delete A[z].time}p=q({type:"POST",url:j+"/rest/analytics/1.0/publish/bulk",data:JSON.stringify(A),contentType:"application/json",dataType:"json"});p.fail(function(){AJS.EventQueue.concat(A);i();x()});p.done(function(){y()})}finally{u()}};var o=function(z){for(var y=z.length-1;y>=0;y--){var B="";var A=z[y];var x=A.properties;if(typeof A.name==="undefined"){B="you must provide a name for the event."}else{if(typeof x!=="undefined"&&x!==null){if(x.constructor!==Object){B="properties must be an object with key value pairs."}else{b(x)}}}if(B!==""){AJS.log("WARN: Invalid analytics event detected and ignored, "+B+"\nEvent: "+JSON.stringify(A));z.splice(y,1)}}return z.length};var b=function(z){for(var y in z){if(z.hasOwnProperty(y)){var x=z[y];if(c(x)&&k(x)){}else{if(c(x)&&x.toString){z[y]=x.toString()}else{z[y]=""}}}}};function c(x){return typeof x!=="undefined"&&x!==null}function k(x){return typeof x==="number"||typeof x==="string"||typeof x==="boolean"}var n=function(){if(p&&!(p.state()==="resolved"||p.state()==="rejected")){p.abort()}};AJS.EventQueue=AJS.EventQueue||[];var s=Array.prototype.push;AJS.EventQueue.push=function(x){x.time=new Date().getTime();s.call(AJS.EventQueue,x)};AJS.toInit(function(){t();setTimeout(h,500);w()});d(window).on("beforeunload",function(){n();i()});AJS.Analytics={triggerPrivacyPolicySafeEvent:function(x,y){AJS.log("WARN: 'triggerPrivacyPolicySafeEvent' has been deprecated");AJS.EventQueue.push({name:x,properties:y})}};AJS.bind("analytics",function(x,y){AJS.EventQueue.push({name:y.name,properties:y.data})});AJS.bind("analyticsEvent",function(x,y){AJS.EventQueue.push({name:y.name,properties:y.data})});var w=function(){if(window.location.pathname.indexOf("/secure/admin/ViewApplicationProperties")>-1){AJS.$("[data-property-id='analytics-enabled']").remove()}else{if(window.location.pathname.indexOf("/secure/admin/EditApplicationProperties")>-1){var y=AJS.$(":contains(Enable Atlassian analytics)");if(y.size()>0){var x=y[y.size()-2];if(x){x.remove()}}}}}}(AJS.$));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.analytics.analytics-client:policy-update-init', location = 'js/policy-update-init.js' */
AJS.toInit(function(){var a=WRM.data.claim("com.atlassian.analytics.analytics-client:policy-update-init.policy-update-data-provider");if(a){WRM.require("wrc!com.atlassian.analytics.analytics-client:policy-update")}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.analytics.analytics-client:programmatic-analytics-init', location = 'js/programmatic-analytics-init.js' */
(function(){var a=WRM.data.claim("com.atlassian.analytics.analytics-client:programmatic-analytics-init.programmatic-analytics-data-provider");if(a){WRM.require("wrc!com.atlassian.analytics.analytics-client:programmatic-analytics")}}());
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:application-header-administration-cog-resource', location = 'header/cog.js' */
var NavLinks=(function(a){a.ApplicationHeader=function(b){b.Cog=(function(){var c=function(){var d=AJS.$("#system-admin-menu-content");if(d.length>0){return d}var e=AJS.$("#admin-menu-link-content");if(e.length>0){return e}return AJS.$("#bamboo\\.global\\.header-admin\\.menu")};return{getDropdown:c}}());return b}(a.ApplicationHeader||{});return a}(NavLinks||{}));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:administration-shortcuts-resources', location = 'adminshortcuts/adminshortcuts.soy' */
// This file was automatically generated from adminshortcuts.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace navlinks.templates.adminshortcuts.
 */

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.adminshortcuts == 'undefined') { navlinks.templates.adminshortcuts = {}; }


navlinks.templates.adminshortcuts.section = function(opt_data, opt_ignored) {
  var param5 = '<ul class="aui-list-truncate">';
  var linkList7 = opt_data.links;
  var linkListLen7 = linkList7.length;
  for (var linkIndex7 = 0; linkIndex7 < linkListLen7; linkIndex7++) {
    var linkData7 = linkList7[linkIndex7];
    param5 += '<li><a href="' + soy.$$escapeHtml(linkData7.link) + '">' + soy.$$escapeHtml(linkData7.label) + '</a></li>';
  }
  param5 += '</ul>';
  var output = '' + aui.dropdown2.section({id: 'nl-remote-admin-section', label: 'Other applications', content: param5});
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.adminshortcuts.section.soyTemplateName = 'navlinks.templates.adminshortcuts.section';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:administration-shortcuts-resources', location = 'adminshortcuts/adminnavlinks.js' */
var NavLinks=(function(a){a.AdminShortcuts=(function(){var c=function(){return AJS.$.ajax({url:AJS.contextPath()+"/rest/menu/latest/admin",cache:false,dataType:"json"})};var b=function(){AJS.$("#nl-remote-admin-section").on("click","a",function(){NL.trackEvent("remoteAdminItemSelected",NL.getCurrentApplication(),$(this).attr("href"))})};return{render:function(){c().done(function(e){e=_.reject(e,function(f){return f.local===true});if(e.length){var d=navlinks.templates.adminshortcuts.section({links:e});a.ApplicationHeader.Cog.getDropdown().append(d);b()}})}}}());return a}(NavLinks||{}));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:administration-shortcuts', location = 'adminshortcuts/adminshortcuts-cdn.js' */
AJS.toInit(function(){if(AJS.DarkFeatures&&AJS.DarkFeatures.isEnabled("rotp.admin.shortcuts")){NavLinks.AdminShortcuts.render()}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_aui.splitchunk.vendors--02a4084a95', location = 'aui.chunk.44a84b38d918ac48f23e--0bb7ce9e7417a425cdd3.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["aui.splitchunk.vendors--02a4084a95"],{M4tZ:function(E,n,o){var i,u,A;u=[o("oDIA"),o("O+lX")],void 0===(A="function"==typeof(i=function(E){return E.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}})?i.apply(n,u):i)||(E.exports=A)}}]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_jquery.ui.keycode', location = 'aui.chunk.d175379a9b4e384fcbc6--5bd6af766d5f5cd45e54.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["jquery.ui.keycode"],{wrJm:function(u,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i("M4tZ"),e.default="jquery",u.exports=e.default}},[["wrJm","runtime","aui.splitchunk.vendors--20a97d6a33","aui.splitchunk.vendors--02a4084a95","aui.splitchunk.172ffb6da7"]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-projectshortcuts', location = 'projectshortcuts/projectshortcuts.soy' */
// This file was automatically generated from projectshortcuts.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace navlinks.templates.projectshortcuts.
 */

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.projectshortcuts == 'undefined') { navlinks.templates.projectshortcuts = {}; }


navlinks.templates.projectshortcuts.dialogContent = function(opt_data, opt_ignored) {
  return '' + ((opt_data.localShortcuts && opt_data.localShortcuts.length > 0) ? navlinks.templates.projectshortcuts.dialogContentShortcuts({shortcuts: opt_data.localShortcuts, listClass: 'projectshortcut-links'}) : '') + ((opt_data.remoteShortcuts != null) ? (opt_data.remoteShortcuts.length > 0) ? '<h2 class="projectshortcuts-heading">Related Links</h2>' + navlinks.templates.projectshortcuts.dialogContentShortcuts(soy.$$augmentMap(opt_data.remoteShortcuts, {shortcuts: opt_data.remoteShortcuts, listClass: 'projectshortcut-links'})) : '' : navlinks.templates.projectshortcuts.dialogLoading(null));
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.dialogContent.soyTemplateName = 'navlinks.templates.projectshortcuts.dialogContent';
}


navlinks.templates.projectshortcuts.headingWrapper = function(opt_data, opt_ignored) {
  return '<div class="project-dialog-header-wrapper"><div class="project-header"><img class="project-img" src="' + soy.$$escapeHtml(opt_data.logoUrl) + '"><h2 class="dialog-title">' + soy.$$escapeHtml(opt_data.title) + '</h2></div><div class="project-content-wrapper">' + soy.$$filterNoAutoescape(opt_data.contentHtml) + '</div></div>';
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.headingWrapper.soyTemplateName = 'navlinks.templates.projectshortcuts.headingWrapper';
}


navlinks.templates.projectshortcuts.dialogContentShortcuts = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '<ul' + ((opt_data.listClass) ? ' class="' + soy.$$escapeHtml(opt_data.listClass) + '"' : '') + '>';
  var shortcutList35 = opt_data.shortcuts;
  var shortcutListLen35 = shortcutList35.length;
  for (var shortcutIndex35 = 0; shortcutIndex35 < shortcutListLen35; shortcutIndex35++) {
    var shortcutData35 = shortcutList35[shortcutIndex35];
    output += '<li' + ((shortcutIndex35 == shortcutListLen35 - 1) ? ' class="last"' : '') + '>' + navlinks.templates.projectshortcuts.dialogContentShortcut(shortcutData35) + '</li>';
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.dialogContentShortcuts.soyTemplateName = 'navlinks.templates.projectshortcuts.dialogContentShortcuts';
}


navlinks.templates.projectshortcuts.dialogContentShortcut = function(opt_data, opt_ignored) {
  return '<a href="' + soy.$$escapeHtml(opt_data.link) + '"' + ((opt_data.tooltip) ? ' title="' + soy.$$escapeHtml(opt_data.tooltip) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.label) + '</a>';
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.dialogContentShortcut.soyTemplateName = 'navlinks.templates.projectshortcuts.dialogContentShortcut';
}


navlinks.templates.projectshortcuts.dialogLoading = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div class="projectshortcuts-loading">' + ((opt_data.text) ? soy.$$escapeHtml(opt_data.text) : '') + '</div>';
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.dialogLoading.soyTemplateName = 'navlinks.templates.projectshortcuts.dialogLoading';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-projectshortcuts', location = 'projectshortcuts/projectshortcuts.js' */
(function(e,g){var i,k={},m="key",b="name",j="entity-type";function f(s){var n=e(this),o=n.data(m),q=n.data(b),p=n.data(j);if(typeof o==="undefined"){return}s.preventDefault();i=new AJS.Dialog({width:600,keypressListener:function(u){if(u.which==jQuery.ui.keyCode.ESCAPE){i.remove()}},id:"project-shortcuts-dialog"}).addCancel("Close",function(){i.remove()}).addPanel("",navlinks.templates.projectshortcuts.headingWrapper({title:q,logoUrl:h(),contentHtml:navlinks.templates.projectshortcuts.dialogLoading({text:"Retrieving links…"})})).show();c(i);if(!k[o]){k[o]={entity:{title:q},localShortcuts:null,remoteShortcuts:null};d(AJS.contextPath()+"/rest/project-shortcuts/1.0/local/"+o,{entityType:p}).done(t);d(AJS.contextPath()+"/rest/project-shortcuts/1.0/remote/"+o,{entityType:p}).done(r).fail(function(){var u=i.getCurrentPanel().body.find(".project-content-wrapper");u.find(".projectshortcuts-loading").remove();AJS.messages.error(u,{body:"Could not retrieve remote project shortcuts",closeable:false});c(i)})}else{l(k[o])}function t(u){k[o].localShortcuts=u.shortcuts;l(k[o])}function r(u){k[o].remoteShortcuts=u.shortcuts;l(k[o])}}function h(){return e(".project-shortcut-dialog-trigger img").attr("src")}function l(n){if(n.localShortcuts){i.getCurrentPanel().html(navlinks.templates.projectshortcuts.headingWrapper({title:n.entity.title,logoUrl:h(),contentHtml:navlinks.templates.projectshortcuts.dialogContent(n)}));c(i)}}function a(p){var o=210;if(!p||p.length<=o){return p}var n=o;while(n>0&&p.charAt(n)!=" "){n--}if(n==0){n=o}p=p.substring(0,n);if(p.length>=n){p=p+"..."}return p}function c(n){var q=n.popup.element,p=q.find(".dialog-panel-body"),o=q.find(".dialog-components");p.height("auto");q.height(o.outerHeight()-1);e(".aui-shadow").remove()}function d(n,o){return e.ajax({url:n,cache:false,data:o,dataType:"json"})}e(document).on("click",".project-shortcut-dialog-trigger",f)}(jQuery,window.NL=(window.NL||{})));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:atlassian-ui-popup-display-controller', location = 'popups/DisplayController.js' */
AJS.Popups=AJS.Popups||{};AJS.Popups.DisplayController=function(){var c=[];var a=false;var b=false;AJS.toInit(function(){setTimeout(function(){AJS.Popups.DisplayController.render()},0)});return{request:function(d){c.push(d);if(a&&b===false){this.render()}},render:function(){c.sort(function(e,d){return e.weight-d.weight});a=true;if(c.length!==0){b=true;c[0].show()}}}}();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_aui.page.iconography', location = 'aui.chunk.bdafbba768eff22233fc--8f22190d7e95afd6cbd1.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["aui.page.iconography"],[],[["rSV2","runtime","aui.splitchunk.b0831cc7d0","aui.splitchunk.336ae4f9e7","aui.splitchunk.56dfb54d0c","aui.splitchunk.908fe798b4"]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jira-issues-view-mode-resources', location = 'jira/jira-issues-view-mode/main.js' */
require(["ajs","jquery"],function(b,d){var a="wr!confluence.extra.jira:jira-issues-view-mode-async-resource";var c=function(){var e=d(".wiki-content [data-jira-key][data-client-id]");if(e.length==0){return false}WRM.require(a,function(){require(["confluence/jim/jira/jira-issues-view-mode/lazy-loading","confluence/jim/jira/jira-issues-view-mode/fix-ui"],function(g,f){g.init(e).done(function(){f.fixBreakIconInOldConf()})})})};b.toInit(c);b.bind("ic-jim-async-supported",c)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:amd-support', location = 'amd/confluence-shim.js' */
define("confluence/jim/confluence-shim",function(){return window.Confluence});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:amd-support', location = 'amd/amd-exporter.js' */
define("confluence/jim/amd/module-exporter",[],function(){var a={};a.namespace=function(f,g,e){var h=f.split(".");var c=e||window;var d;var j=h.length-1;for(d=0;d<j;d++){var b=c[h[d]];c=(b!=null)?b:c[h[d]]={}}if(c[h[d]]){if(window.console&&window.console.warn){window.console.warn('Value of "'+f+'" was overridden')}}c[h[d]]=g||c[h[d]]||{};return c[h[d]]};a.safeRequire=function(c,b){if(define&&define.amd===undefined){var d=require(c);if(b){b(d)}}};a.exportModuleAsGlobal=function(c,d,b){a.safeRequire(c,function(e){a.namespace(d,e);if(b){b(e)}})};return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:querystring', location = '/includes/js/api/querystring.js' */
define("confluence/api/querystring",[],function(){return{stringify:function(a){var b="",c;for(c in a)for(var d=0;d<a[c].length;d++)b+="&"+c,a[c][d]&&(b+="="+a[c][d]);return b.substring(1)},parse:function(a){var b={};if(a){"?"===a.substr(0,1)&&(a=a.substr(1));for(var a=a.split("&"),c=0;c<a.length;c++){var d=a[c].split("=");b[d[0]]||(b[d[0]]=[]);b[d[0]].push(a[c].substring(d[0].length+1))}}return b}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:url', location = '/includes/js/api/url.js' */
define("confluence/api/url",["confluence/api/querystring","jquery"],function(d,e){var g=/([^?|#]+)[?]?([^#]*)[#]?(.*)/,f=["source","urlPath","queryParams","anchor"];return{parse:function(a){var b={};if(a=g.exec(a)){for(var c=0;c<f.length;c++)b[f[c]]=a[c];b.queryParams=d.parse(b.queryParams)}return b},format:function(a){return e.isEmptyObject(a)?"":(!a.urlPath?"":a.urlPath)+(e.isEmptyObject(a.queryParams)?"":"?"+d.stringify(a.queryParams))+(!a.anchor?"":"#"+a.anchor)}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:analytics-support', location = '/includes/js/analytics-support.js' */
define("confluence/analytics-support","jquery ajs confluence/meta window document confluence/api/url".split(" "),function(j,o,l,k,m,h){var b={},n;b.setAnalyticsSource=function(a,d){if(typeof n==="undefined"){var c=j._data(k,"events");n=c&&c.analytics&&c.analytics.length>0}n&&a.attr("href",function(a,c){var b=encodeURIComponent(d),g=h.parse(c);if(!j.isEmptyObject(g))g.queryParams.src=[b];return h.format(g)})};b.srcRemovedUrl=function(a){a=h.parse(a);delete a.queryParams.src;for(var d=Object.keys(a.queryParams),
c=0;c<d.length;c++){var b=d[c],f=b.split(".");f.length===3&&f[0]==="src"&&delete a.queryParams[b];b==="jwt"&&delete a.queryParams[b]}return h.format(a)};b.srcParamValues=function(a){return(a=h.parse(a).queryParams)&&a.src?a.src:[]};b.srcAttrParamValues=function(a){for(var a=h.parse(a).queryParams,b={},c=Object.keys(a),e=0;e<c.length;e++){var f=c[e],i=f.split(".");if(i.length===3&&i[0]==="src"){var g=i[1],i=i[2];b[g]=b[g]||{};b[g][i]=decodeURIComponent(a[f][0])}}return b};b.extractAnalyticsData=function(a){for(var d=
[],c=b.srcParamValues(a),a=b.srcAttrParamValues(a),e=0;e<c.length;e++){var f=c[e];d.push({src:f,attr:a[f]||{}})}return d};b.publish=function(a,b){o.trigger("analytics",{name:a,data:b||{}})};b.init=function(){var a=b.extractAnalyticsData(m.URL),d={userKey:l.get("remote-user-key"),pageID:l.get("page-id"),draftID:l.get("draft-id")};if(a.length>0){for(var c=0;c<a.length;c++){var e=a[c],f=j.extend({},d,e.attr);b.publish("confluence.viewpage.src."+e.src,f)}if(k.history&&k.history.replaceState){a=b.srcRemovedUrl(m.URL);
m.URL!==a&&k.history.replaceState(null,"",a)}}else b.publish("confluence.viewpage.src.empty",d)};return b});require("confluence/module-exporter").exportModuleAsGlobal("confluence/analytics-support","AJS.Confluence.Analytics",function(j){require("ajs").toInit(j.init)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:lodash-amd', location = 'applinks/internal/lib/lodash-amd-global.js' */
define('applinks/lib/lodash', function() {
        if (!window._) {
            throw "lodash not found";
        }
        return window._;
    });
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/lib-version.js' */
// NOTE: this is in "lib" because it's required by aui-amd.js. This module _cannot_ have any dependencies on non-lib
// modules (like "common")
define('applinks/lib/version', [
    'applinks/lib/lodash'
], function(
    _
) {

    function checkIntValue(value, desc) {
        if (_.isUndefined(value)) {
            return 0;
        } else if (typeof value !== 'number' || isNaN(value)) {
            throw new Error(desc + ': expected a number, was: <' + value + '>');
        } else {
            return Math.floor(value);
        }
    }

    function checkVersionObject(object, desc) {
        if (!object || !(object instanceof Version)) {
            throw new Error(desc + ': expected a Version object, was: <' + object + '>');
        }
        return object;
    }

    function compareInt(intOne, intTwo) {
        return intOne > intTwo ? 1 : intOne == intTwo ? 0 : -1;
    }

    /**
     * Constructs a version object that contains version information and can be compared with other version objects.
     *
     * @param major major version component
     * @param minor minor version component
     * @param bugfix bugfix version component
     * @constructor
     */
    function Version(major, minor, bugfix) {
        this.major = checkIntValue(major, 'major');
        this.minor = checkIntValue(minor, 'minor');
        this.bugfix = checkIntValue(bugfix, 'bugfix');
    }

    /**
     * Constructs a Version by parsing a version string.
     *
     * @param versionString version string to parse, expected to be in the form of <major>.<minor>.<bugfix>
     * @param versionDesc what version does the `versionString` represent
     */
    Version.parse = function(versionString, versionDesc) {
        versionDesc = versionDesc || 'versionString';
        if (!versionString) {
            throw new Error(versionDesc + ': expected a non-empty string');
        }
        var versionSplit = versionString.split('.');
        if (versionSplit.length !== 3) {
            throw new Error(versionDesc + ': expected <major>.<minor>.<bugfix> string, was: <' + versionString + '>');
        }
        return new Version(parseInt(versionSplit[0]), parseInt(versionSplit[1]), parseInt(versionSplit[2]));
    };

    /**
     * Comparator function to sort Version objects.
     *
     * @param versionOne first version object
     * @param versionTwo second version object
     * @returns {Number} comparison result
     * @see Version.compareTo(that)
     */
    Version.comparator = function(versionOne, versionTwo) {
        return checkVersionObject(versionOne, 'versionOne').compareTo(checkVersionObject(versionTwo, 'versionTwo'));
    };

    /**
     * Return -1, 0 or 1 as this Version object represents a version less than, equal to, or greater than `that`.
     *
     * @param that the other version to compare to
     * @returns {Number} comparison result
     */
    Version.prototype.compareTo = function(that) {
        checkVersionObject(that, 'that');
        var majorResult = compareInt(this.major, that.major);
        if (majorResult != 0) {
            return majorResult;
        }
        var minorResult = compareInt(this.minor, that.minor);
        if (minorResult != 0) {
            return minorResult;
        }
        return compareInt(this.bugfix, that.bugfix);
    };

    Version.prototype.greaterThan = function(that) {
        return this.compareTo(that) > 0;
    };

    Version.prototype.greaterThanOrEqual = function(that) {
        return this.compareTo(that) >= 0;
    };

    Version.prototype.lessThan = function(that) {
        return this.compareTo(that) < 0;
    };

    Version.prototype.lessThanOrEqual = function(that) {
        return this.compareTo(that) <= 0;
    };

    Version.prototype.equals = function(that) {
        return this.compareTo(that) == 0;
    };

    Version.prototype.toMinor = function() {
        return new Version(this.major, this.minor);
    };

    Version.prototype.toMajor = function() {
        return new Version(this.major);
    };

    Version.prototype.toString = function() {
        return this.major + '.' + this.minor + '.' + this.bugfix;
    };

    return Version;
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/aui-version-details.js' */
define('applinks/lib/aui-version-details', [
    'applinks/lib/version'
], function(
    Version
) {
    // minimum 5.9.x AUI versions - lower versions ship with bugs that break some of the Applinks functionality.
    var MINIMUM_59_VERSION = new Version(5, 9, 13);
    var VERSION_58 = new Version(5, 8);
    var VERSION_59 = new Version(5, 9);

    function checkVersion(version) {
        // if 5.9, must be >= the minimum required 5.9.x version
        if (version.lessThan(MINIMUM_59_VERSION) || version.lessThan(VERSION_59)) {
            throw new Error('AUI version ' + version + ' is too low, you need to upgrade AUI to ' + MINIMUM_59_VERSION
                + ' for Applinks to work');
        }
    }

    function addVersionDetails(AJS) {
        var ajsVersion = Version.parse(AJS.version, 'AUI version');
        checkVersion(ajsVersion);

        AJS.versionDetails = ajsVersion;
        AJS.versionDetails.is58 = ajsVersion.toMinor().equals(VERSION_58);
        AJS.versionDetails.is59 = ajsVersion.toMinor().equals(VERSION_59);

        return AJS;
    }

    return  {
        /**
         * Check AUI version for compatibility with Applinks and add `versionDetails` field.
         */
        addVersionDetails: addVersionDetails
    };
});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/console-amd.js' */
define('applinks/lib/console', function() {
    return window.console;
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/jquery-amd.js' */
define('applinks/lib/jquery', function() {
   return window.jQuery;
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/aui-amd.js' */
define('applinks/lib/aui', [
    'applinks/lib/window',
    'applinks/lib/aui-version-details'
], function(
    window,
    VersionDetails
) {
    var AJS = window.AJS;
    if (!AJS) {
        throw new Error('window.AJS not defined, cannot load AUI');
    }

    return VersionDetails.addVersionDetails(AJS);
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/wrm-amd.js' */
/**
 * Define Web resource manager as an AMD dependency. This should also be present in apps using Atlassian Plugins Web
 * Resources framework.
 */
define('applinks/lib/wrm', function() {
   return window.WRM;
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/skate-amd.js' */
define('applinks/lib/skate', function() {
   // window.skate is not exposed as a global from AUI 5.9, this will return undefined with that version or later
   return window.skate;
});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/window-amd.js' */
/**
 * Define window as AMD module to facilitate unit testing of some modules
 */
define('applinks/lib/window', function() {
    return window;
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/spi-amd.js' */
/**
 * Define the Applinks SPI functions as AMD module to facilitate unit testing of some modules
 */
define('applinks/lib/spi', function() {
    return {get:
        function (){
            //required since code that depends on this global is run before the global is defined,
            // can be eliminated once this module is made properly AMD
            return AppLinks.SPI;
    }}
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/applinks-creation-amd.js' */
/**
 * Define the Applinks creation resources  as AMD module to facilitate unit testing of some modules
 */
define('applinks/lib/creation', function() {
    return {
        get: function () {
            //required since code that depends on this global is run before the global is defined,
            // can be eliminated once this module is made properly AMD
            return AppLinks.Creation;
        }
    }
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/docs.js' */
define('applinks/common/docs', [
    'applinks/lib/jquery',
    'applinks/lib/aui',
    'applinks/common/help-paths'
], function(
    $,
    AJS,
    ApplinksHelpPaths
) {
    // NOTE: should be moved to applinks/feature/help-link, see APLDEV-593

    return {
        /**
         * NOTE: this is a dynamically generated version of the link build in _help_link.vm, any update here should be
         * applied there.
         * @method createDocLink
         * @param pageKey a key that maps to a page in ual-help-paths.properties
         * @param sectionKey (Optional) a key that maps to an anchor section id in ual-help-paths.properties
         * @param classNames (Optional) Whitespace separated list of additional class names
         * @return an html &lt;a&gt; element targeting the specified page & section
         */
        createDocLink: function(pageKey, sectionKey, classNames) {
            return this._createDocLink(pageKey, sectionKey, classNames, "Help");
        },
        createDocLinkIcon: function(pageKey, sectionKey, classNames) {
            return this._createDocLink(pageKey, sectionKey, classNames, '')
                .append($('<span/>', {
                    "class": 'aui-icon aui-icon-small aui-iconfont-help',
                    "text": "Help"
                }));
        },

        _createDocLink: function(pageKey, sectionKey, classNames, text) {
            if (!classNames) {
                classNames = '';
            } else {
                classNames = ' ' + classNames;
            }
            return $('<a/>', {
                'class': 'ual-help-link help-link' + classNames,
                href: this.getDocHref(pageKey, sectionKey),
                target: '_blank',
                'data-help-link-key': pageKey,
                text: text,
                title: "Help"
            });
        },

        /**
         * @method getDocHref
         * @param pageKey a key that maps to a page in ual-help-paths.properties
         * @param sectionKey (Optional) a key that maps to an anchor section id in ual-help-paths.properties
         * @return the url of the given page and section (if specified)
         */
        getDocHref: function(pageKey, sectionKey) {
            var link = ApplinksHelpPaths.getFullPath(pageKey);
            if (sectionKey) {
                link += '#' + ApplinksHelpPaths.getPath(sectionKey);
            }
            return link;
        }
    };

});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/help-paths.js' */
define('applinks/common/help-paths', [
    'applinks/lib/console',
    'applinks/lib/wrm',
    'applinks/lib/lodash',
    'applinks/common/modules',
    'applinks/common/preconditions'
], function(
    console,
    WRM,
    _,
    ApplinksModules,
    Preconditions
) {
    // NOTE: should be moved to applinks/feature/help-link, see APLDEV-593

    // lazy-load help paths, facilitates unit-testing
    var allHelpPaths = _.memoize(function() {
        var helpPaths = WRM.data.claim(ApplinksModules.dataFqn(ApplinksModules.COMMON_EXPORTED, 'applinks-help-paths'));
        if (!helpPaths.entries) {
            console.warn('Help paths not found, all help links are likely to be broken.');
        }
        return helpPaths.entries || {};
    });

    var getPath = function(key, sectionKey) {
        Preconditions.nonEmptyString(key, 'key');
        var path = allHelpPaths()[key] || key;
        if (sectionKey) {
            Preconditions.nonEmptyString(sectionKey, 'sectionKey');
            var prefix = path.replace(/\+/g, ''); // "g" flag to remove _all_ '+' signs
            path += '#' +prefix + '-' + sectionKey;
        }
        return path;
    };

    function endsWith(string, suffix) {
        return string.indexOf(suffix, string.length - suffix.length) !== -1;
    }

    function addSuffixIfRequired(string, suffix) {
        return endsWith(string, suffix) ? string : string + suffix;
    }

    return {
        /**
         * @param key {string} key to get the path for
         * @returns {string} relative help path that can be appended to any relevant docs base URL
         */
        getPath: getPath,

        /**
         * @param key {string} key to get the path for
         * @param sectionKey {string} optional key of the anchor on the target page
         * @returns {string} full help path including the base URL
         */
        getFullPath: function(key, sectionKey) {
            var baseUrl = this.baseUrl();
            return addSuffixIfRequired(baseUrl, '/') + this.getPath(key, sectionKey);
        },

        /**
         * @returns {string} configured base URL for the help paths
         */
        baseUrl: _.partial(getPath, 'applinks.docs.root')
    }
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/events.js' */
define('applinks/common/events', [
    'applinks/lib/jquery',
    'applinks/lib/lodash',
    'applinks/lib/window',
    'applinks/common/preconditions'
], function(
    $,
    _,
    window,
    Preconditions
) {
    var PREFIX = 'applinks.event.';

    function applinksEvent(eventId) {
        return PREFIX + Preconditions.nonEmptyString(eventId, 'eventId');
    }

    /**
     * Provides common Applinks event IDs and a simple event system facade API. This is a preferred way to subscribe to
     * and raise Applinks-specific events as it does not depend on a specific event bus or event target (such as
     * `document`), as well as facilitates unit testing.
     */
    return {
        PREREADY: applinksEvent('preready'),
        READY: applinksEvent('ready'),

        /**
         * Raised when applinks list is first loaded
         */
        APPLINKS_LOADED: applinksEvent('loaded'),
        /**
         * Raised when applinks list is updated
         */
        APPLINKS_UPDATED: applinksEvent('updated'),

        /**
         * This event is only raised when linking to Atlassian applications
         * Can be consumed by other plugins
         */
        NEW_APPLINK_CREATED: applinksEvent('created'),

        /**
         * Raised when orphaned upgrade operation succeeds in creating a new Applink from the orphaned relationship
         */
        ORPHANED_UPGRADE: applinksEvent('orphaned.upgrade'),

        /**
         * Raised when v3 onboarding has finished or, or has never run on the current page (and won't).
         */
        V3_ONBOARDING_FINISHED: applinksEvent('v3-onboarding-finished'),

        // legacy events
        Legacy: {
            MESSAGE_BOX_DISPLAYED: applinksEvent('message-box-displayed')
        },

        applinksEvent: applinksEvent,

        on: function(events, handler, context) {
            var handlerWithContext = context ? _.bind(handler, context) : handler;
            $(window.document).on(events, handlerWithContext);
        },

        off: function(events, handler) {
            $(window.document).off(events, handler);
        },

        trigger: function(event, data) {
            $(window.document).trigger(event, data);
        }
    }
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/i18n.js' */
define('applinks/common/i18n', [
    'applinks/lib/lodash',
    'applinks/lib/jquery',
    'applinks/lib/wrm',
    'applinks/common/modules',
    'applinks/common/preconditions',
    'applinks/common/products'
], function(
    _,
    $,
    WRM,
    ApplinksModules,
    Preconditions,
    ApplinksProducts
) {
    var getAllEntityTypes = _.memoize(function() {
        var val = WRM.data.claim(ApplinksModules.dataFqn(ApplinksModules.COMMON_EXPORTED, 'entity-types'));
        return Preconditions.hasValue(val, 'entity-types', 'Entity Types data not found');
    });

    var getAllAuthTypes = _.memoize(function() {
        var val = WRM.data.claim(ApplinksModules.dataFqn(ApplinksModules.COMMON_EXPORTED, 'authentication-types'));
        return Preconditions.hasValue(val, 'authentication-types', 'Authentication Types data not found');
    });

    return {
        
        /**
         * @param typeId ID of the application type to resolve
         * @returns {string} resolved i18n-ed type name, or the original `typeId` if there is no mapping
         */
        getApplicationTypeName: function(typeId) {
            return ApplinksProducts.getTypeName(typeId);
        },

        /**
         * @param typeId ID of the entity type to resolve
         * @returns {string} resolved i18n-ed singular entity type name, or the original `typeId` if there is no mapping
         */
        getEntityTypeName: function(typeId) {
            return getAllEntityTypes().singular[typeId] || typeId;
        },

        /**
         * @param typeId ID of the entity type to resolve
         * @returns {string} resolved i18n-ed plural entity type name, or the original `typeId` if there is no mapping
         */
        getPluralizedEntityTypeName: function(typeId) {
            return getAllEntityTypes().plural[typeId] || typeId;
        },

        /**
         * @param type ID of the authentication type to resolve (usually in a form of full class name)
         * @returns {string} resolved i18n-ed authentication type name, or the original `type` if there is no mapping
         */
        getAuthenticationTypeName: function(type) {
            return getAllAuthTypes()[type] || type;
        }
    };
});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/modules.js' */
/**
 * Applinks plugin modules core constants and definitions.
 */
define('applinks/common/modules', function() {
    return {
        /**
         * Applinks plugin key
         */
        PLUGIN_KEY: 'com.atlassian.applinks.applinks-plugin',

        // key web resource keys
        COMMON_EXPORTED: 'applinks-common-exported',
        COMMON: 'applinks-common',

        /**
         * Fully qualifies a module name using the plugin key.
         *
         * @param {string} moduleName module name to qualify
         * @returns {string} fully qualified name
         */
        fqn: function(moduleName) {
            return this.PLUGIN_KEY + ':' + moduleName;
        },

        /**
         * Fully qualifies web-resource data using module name and data key.
         *
         * @param {string} moduleName module name
         * @param {string} dataKey key of the data element
         * @returns {string} fully qualified name
         */
        dataFqn: function(moduleName, dataKey) {
            return this.fqn(moduleName) + '.' + dataKey;
        }
    };
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/preconditions.js' */
define('applinks/common/preconditions', [
    'applinks/lib/lodash'
], function(
    _
) {
    function nonEmptyString(value, varName, customMessage) {
        return _checkArgument(
            _.isString(value) && !_.isEmpty(value),
            customMessage,
            _withVarName(varName, ': expected a non-empty string, was: <' + value + '>'),
            value
        );
    }

    function isFunction(value, varName, customMessage) {
        return _checkArgument(
            _.isFunction(value),
            customMessage,
            _withVarName(varName, ': expected a function, was: ' + value),
            value
        );
    }

    function isArray(value, varName, customMessage) {
        return _checkArgument(
            _.isArray(value),
            customMessage,
            _withVarName(varName, ': expected an array, was: ' + value),
            value
        );
    }

    function hasValue(value, varName, customMessage) {
        return _checkArgument(
            value,
            customMessage,
            _withVarName(varName, ': expected a value'),
            value
        );
    }

    function _checkArgument(test, message, defaultMessage, actualValue) {
        var actualMessage = message ? message : defaultMessage;
        if (!test) {
            throw new Error(actualMessage)
        }
        return actualValue || test;
    }

    function _withVarName(varName, msg) {
        return (varName || '[unspecified]') + msg;
    }

    return {
        // applinks support 1.5.2+ underscore and its lodash counterparts
        // _.partial works differently in lodash@2.x vs its newer and underscore versions
        //  thus replacing _.partial with vanilla JS for full compatibility
        checkArgument: function(test, message, actualValue) {
            return _checkArgument(test, message, '', actualValue);
        },
        nonEmptyString: nonEmptyString,
        isArray: isArray,
        isFunction: isFunction,
        hasValue: hasValue
    };
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/products.js' */
define('applinks/common/products', [
    'applinks/lib/lodash',
    'applinks/lib/wrm',
    'applinks/common/modules',
    'applinks/common/preconditions'
], function(
    _,
    WRM,
    ApplinksModules,
    Preconditions
) {
    var getAllTypes = _.memoize(function() {
        var val = WRM.data.claim(ApplinksModules.dataFqn(ApplinksModules.COMMON_EXPORTED, 'applinks-types'));
        return Preconditions.hasValue(val, 'types', 'Application Types data not found');
    });

    /**
     * @param typeId ID of the application type to resolve
     * @returns {string} resolved i18n-ed type name, or the original `typeId` if there is no mapping
     */
    function getTypeName(typeId) {
        return getAllTypes()[typeId] || typeId;
    }

    /**
     * Map of Atlassian product keys to application type IDs
     */
    return {
        BAMBOO: 'bamboo',
        BITBUCKET: 'stash', // special case, see java class com.atlassian.applinks.application.bitbucket.BitbucketApplicationTypeImpl.TYPE_ID
        CONFLUENCE: 'confluence',
        FECRU: 'fecru',
        JIRA: 'jira',
        REFAPP: 'refapp',
        STASH: 'stash',
        getTypeName: getTypeName
    };
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_aui.core', location = 'aui.chunk.bcc4a9ceb5e493d06f24--5f9f540fcdddcfc7c28c.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["aui.core"],[],[["7KGX","runtime","aui.splitchunk.172ffb6da7","aui.splitchunk.087aba7911","aui.splitchunk.fbd1a5ab27","aui.splitchunk.1659111a3c","aui.splitchunk.792781e698","aui.splitchunk.8771ceac91","aui.splitchunk.e7c127e2cc","aui.splitchunk.7873ba9060","aui.splitchunk.0fc208f3fe","aui.splitchunk.2a34183e72"]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'applinks/internal/non-amd/rest-service.js' */
// NOTE: this is used outside of Applinks. See atlassian-plugin.xml for more details about the associated restrictions

(function(AppLinksI18n, ApplinksDocs, ApplinksEvents) {
    var $ = AJS.$;

    /**
     * The triggering of AppLinks initialisation can be customised by setting a function on
     * AJS.AppLinksInitialisationBinder. The binder function should take a single argument which is a zero-arg function to
     * run and should execute this function when appropriate.
     */
    AppLinks = $.extend(window.AppLinks || {}, {
        Event: {
            NAMESPACE: 'applinks'
        },
        I18n: AppLinksI18n,
        Docs: ApplinksDocs
    });
    AppLinks.Event = $.extend(window.AppLinks.Event, ApplinksEvents);

    // Is there an overridden initialisation binder?
    if (AJS.AppLinksInitialisationBinder) {
        AppLinks.initialisationBinder = AJS.AppLinksInitialisationBinder;
    } else {
        // The default bind if no specific binder is specified
        AppLinks.initialisationBinder = function(f) {
            AJS.toInit(f);
        }
    }

    function parseJsonResponse(xhr) {
        var respJSON = xhr.responseText;
        var respObj;
        try {
            respObj = JSON.parse(respJSON);
        } catch (e) {
            console && console.error && console.error('invalid JSON response', respJSON, xhr);
        }
        return respObj || {};
    }

    var restUrlVersionMatch = new RegExp('rest/applinks(?:.*?)/(\\d\\.\\d|\\d)/');
    /**
     * Determine the REST endpoint version of a given URL.
     * @param url
     */
    function versionOf(url) {
        var results = restUrlVersionMatch.exec(url);
        return results && results.length === 2 ? results[1] : false;
    }

    AppLinks.initialisationBinder(function() {
        AppLinks = $.extend(window.AppLinks || {}, {
            failure: function(data) {
                if (data.status == 401) {
                    window.location.reload();
                } else {
                    var message = AppLinks.parseError(data);
                    var errorDivs = $('.page-error');

                    if (errorDivs.length > 0) {
                        errorDivs.html(message).fadeIn('slow');
                    } else {
                        alert('REST request failed: ' + message);
                    }
                }
            },
            jsonRequest: function(url, type, data, success, error, beforeSend) {
                if (data) {
                    data = JSON.stringify(data);
                }
                $(".page-error").fadeOut('fast');
                if (!error) error = AppLinks.failure;
                return jQuery.ajax({
                    url: url,
                    type: type,
                    data: data,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    beforeSend: beforeSend,
                    cache: false,
                    success: success,
                    error: error,
                    jsonp: false
                });
            },
            xmlRequest: function(url, type, data, success, error, beforeSend) {
                if (data) {
                    data = JSON.stringify(data);
                }
                $(".page-error").fadeOut('fast');
                if (!error) error = AppLinks.failure;
                return jQuery.ajax({
                    url: url,
                    type: type,
                    data: data,
                    dataType: 'xml',
                    contentType: "application/xml; charset=utf-8",
                    beforeSend: beforeSend,
                    cache: false,
                    success: success,
                    error: error
                });
            },
            parseError: function(errorData) {
                var error = parseJsonResponse(errorData);
                var message = error && error.message;
                if (message) {
                    return $.isArray(message) ? message.join(' ') : message;
                }
                if (errorData) {
                    return errorData.statusText ? errorData.statusText : errorData;
                }
                return 'An unknown error occurred. Check the console logs for details.';
            },
            put: function(url, data, success, error, beforeSend) {
                return AppLinks.jsonRequest(url, 'PUT', data, success, error, beforeSend);
            },
            post: function(url, data, success, error, beforeSend) {
                return AppLinks.jsonRequest(url, 'POST', data, success, error, beforeSend);
            },
            update: function(data, success, error, beforeSend) {
                var selfLink = AppLinks.self_link(data);
                /**
                 * Adapt to the version of the endpoint and the HTTP verb it uses.
                 * yes, this is not "REST-ful". The verb is wrong. It has been wrong since 2014.
                 * It is simpler to adapt than it is to release a new endpoint.
                 */
                var restMethod = versionOf(selfLink) === '1.0' ? AppLinks.put : AppLinks.post;
                restMethod(selfLink, data, success, error, beforeSend);
            },
            get: function(url, success, error, beforeSend) {
                return AppLinks.jsonRequest(url, 'GET', null, success, error, beforeSend);
            },
            getXml: function(url, success, error, beforeSend) {
                return AppLinks.xmlRequest(url, 'GET', null, success, error, beforeSend);
            },
            self_link: function(item) {
                for (var i = 0, _i = item.link.length; i < _i; i++) {
                    var link = item.link[i];
                    if (link.rel == "self") return link.href;
                }

                throw "No self-link found";
            },
            del: function(urlOrObject, success, error, beforeSend) {
                var url;
                if (typeof(urlOrObject) == 'string') url = urlOrObject;
                else url = AppLinks.self_link(urlOrObject);
                return AppLinks.jsonRequest(url, 'DELETE', null, success, error, beforeSend);
            },
            SPI: $.extend({}, {
                API_VERSION: "1.0",
                REST_RESOURCE_URL: AJS.contextPath() + "/rest/applinks/",
                BASE_URL: AJS.contextPath() + "/rest/applinks/1.0",
                OAUTH_REST_RESOURCE_URL: AJS.contextPath() + "/rest/applinks-oauth/",
                OAUTH_BASE_URL: AJS.contextPath() + "/rest/applinks-oauth/1.0",

                /**
                 * Update the API version and associated urls.
                 * @param version
                 */
                setApiVersion: function(version){
                    AppLinks.SPI.API_VERSION = version;
                    AppLinks.SPI.setBaseUrl(AppLinks.SPI.REST_RESOURCE_URL + AppLinks.SPI.API_VERSION);
                },
                setBaseUrl: function(url){
                    AppLinks.SPI.BASE_URL = url;
                },
                setOAuthBaseUrl: function(url){
                    AppLinks.SPI.OAUTH_BASE_URL = url;
                },
                /**
                 * Build a base URL for rest calls using the specified baseUrl.
                 * @param baseUrl
                 * @returns {string}
                 */
                getRemoteRestBaseUrl: function(baseUrl) {
                    return baseUrl + "/rest/applinks/" + AppLinks.SPI.API_VERSION;
                },
                /**
                 * Build a base URL for plugin servlet calls using the specified baseUrl.
                 * @param baseUrl
                 * @returns {string}
                 */
                getRemotePluginServletBaseUrl: function(baseUrl) {
                    return baseUrl + "/plugins/servlet";
                },
                getAllLinks: function(success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlink";
                    return AppLinks.get(url, success, failure);
                },
                getAllLinksWithAuthInfo: function(success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/listApplicationlinks";
                    return AppLinks.get(url, success, failure);
                },
                getApplicationLinkState: function(id, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/listApplicationlinkstates/id/" + id;
                    return AppLinks.get(url, success, failure);
                },
                getLinksOfType: function(typeId, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlink/type/" + typeId;
                    return AppLinks.get(url, success, failure);
                },
                tryToFetchManifest: function(url, success, failure) {
                    var restUrl = AppLinks.SPI.BASE_URL + '/applicationlinkForm/manifest.json?url=' + encodeURIComponent(url);
                    return AppLinks.get(restUrl, success, failure, function(jqxhr) {
                        jqxhr.setRequestHeader("X-Atlassian-Token", "no-check");
                    });
                },
                getManifestFor: function(id, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/manifest/' + id + ".json";
                    return AppLinks.get(url, success, failure);
                },
                getLocalManifest: function(success, failure){
                    var url = AppLinks.SPI.BASE_URL + '/manifest.json';
                    return AppLinks.get(url, success, failure);
                },
                /**
                 * Attempt to get the Manifest of the remote application, via a direct REST call.
                 * Requires CORS enabled on the REST resource.
                 * @param url
                 * @param success
                 * @param failure
                 * @returns {*}
                 */
                getRemoteManifest: function(remoteBaseUrl, success, failure){
                    var remoteManifestUrl = AppLinks.SPI.getRemoteRestBaseUrl(remoteBaseUrl) + '/manifest.json';
                    return AppLinks.get(remoteManifestUrl, success, failure);
                },
                /**
                 * Attempt to get the OAuth Consumer Info of the remote application, via a direct call.
                 * Requires CORS enabled on the REST resource.
                 * @param url
                 * @param success
                 * @param failure
                 * @returns {*}
                 */
                getRemoteOAuthConsumerInfo: function(remoteBaseUrl, success, failure){
                    var remoteManifestUrl = AppLinks.SPI.getRemotePluginServletBaseUrl(remoteBaseUrl) + '/oauth/consumer-info';
                    return AppLinks.getXml(remoteManifestUrl, success, failure);
                },
                getApplinkStatus: function (applinkId, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/status/' + applinkId;
                    return AppLinks.get(url, success, failure);
                },
                createStaticUrlAppLink: function(applicationType, success, failure) {
                    var restUrl = AppLinks.SPI.BASE_URL + '/applicationlinkForm/createStaticUrlAppLink?typeId=' + applicationType;
                    return AppLinks.post(restUrl, null, success, failure);
                },
                createLink: function(applicationLink, username, password, createTwoWayLink, customRpcUrl, rpcUrl, configFormValues, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlinkForm/createAppLink';
                    var data = {
                        applicationLink: applicationLink,
                        username: username,
                        password: password,
                        createTwoWayLink: createTwoWayLink,
                        customRpcURL: customRpcUrl,
                        rpcUrl: rpcUrl,
                        configFormValues: configFormValues
                    };
                    return AppLinks.post(url, data, success, failure);
                },
                createLinkWithOrphanedTrust : function(applicationLink, username, password, createTwoWayLink, customRpcUrl, rpcUrl, configFormValues, orphanedTrust, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlinkForm/createAppLink';
                    var data = {
                        applicationLink: applicationLink,
                        username: username,
                        password: password,
                        createTwoWayLink: createTwoWayLink,
                        customRpcURL: customRpcUrl,
                        rpcUrl: rpcUrl,
                        configFormValues: configFormValues,
                        orphanedTrust: orphanedTrust
                    };
                    return AppLinks.post(url, data, success, failure);
                },
                verifyTwoWayLinkDetails : function (remoteUrl, rpcUrl, username, password, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlinkForm/details';
                    var data = {
                        username: username,
                        password: password,
                        remoteUrl: remoteUrl,
                        rpcUrl: rpcUrl
                    };
                    return AppLinks.post(url, data, success, failure);
                },
                getApplicationLinkInfo: function (appId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlinkInfo/id/" + appId;
                    return AppLinks.get(url, success, error);
                },
                deleteLink: function(applicationLink, reciprocate, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlink/" + applicationLink.id;
                    if (reciprocate) url += "?reciprocate=true";
                    return AppLinks.del(url, success, error);
                },
                makePrimary: function(applicationLink, success) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlink/primary/" + applicationLink.id;
                    return AppLinks.post(url, null, success);
                },
                relocate: function(applicationLink, newUrl, suppressWarnings, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/relocateApplicationlink/" + applicationLink.id + "?newUrl=" + encodeURIComponent(newUrl) +
                        "&nowarning=" + (suppressWarnings ? "true" : "false");
                    return AppLinks.post(url, null, success, error);
                },
                legacyUpgrade: function(applicationLink, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/upgrade/legacy/" + applicationLink.id;
                    return AppLinks.post(url, null, success, error);
                },
                ualUpgrade: function(applicationLink, body, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/upgrade/ual/" + applicationLink.id;
                    return AppLinks.post(url, body, success, error);
                },
                getEntityTypesForApplicationType: function(applicationType, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/type/entity/" + applicationType;
                    return AppLinks.get(url, success, error);
                },
                getLocalEntitiesWithLinksToApplication: function(applicationLinkId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/localEntitiesWithLinksTo/" + applicationLinkId + ".json";
                    return AppLinks.get(url, success, error);
                },
                getEntityLinksForApplication: function(applicationLinkId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entities/" + applicationLinkId + ".json";
                    AppLinks.get(url, success, error);
                },
                getEntityLinksForApplicationUsingAnonymousAccess: function(applicationLinkId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entities/anonymous/" + applicationLinkId + ".json";
                    return AppLinks.get(url, success, error);
                },
                createNonUalEntityLink: function(localType, localKey, applicationId, remoteTypeId, remoteKey, name, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/" + localType + "/" + localKey + "?reciprocate=false";
                    var data = {
                        applicationId: applicationId,
                        typeId: remoteTypeId,
                        key: remoteKey,
                        name: name,
                        isPrimary: false
                    };
                    return AppLinks.put(url, data, success, error);
                },
                createEntityLink: function(localType, localKey, entity, reciprocate, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/" + localType + "/" + localKey + "?reciprocate=";
                    url += (reciprocate ? "true" : "false");
                    return AppLinks.put(url, entity, success, failure);
                },
                getConfiguredEntityLinks: function(localType, localKey, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/primaryLinks/" + localType + "/" + localKey + ".json";
                    return AppLinks.get(url, success, error);
                },
                deleteEntityLink: function(localTypeId, localKey, entity, reciprocate, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/" + localTypeId + "/" + localKey + "?typeId=" + entity.typeId + "&key=" + entity.key + "&applicationId=" + entity.applicationId + "&reciprocate=" + reciprocate;
                    return AppLinks.del(url, success, error);
                },
                makePrimaryEntityLink: function(localTypeID, localKey, entity, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/primary/" + localTypeID + "/" + localKey + "?typeId=" + entity.typeId + "&key=" + entity.key + "&applicationId=" + entity.applicationId;
                    return AppLinks.post(url, null, success, error);
                },
                canDeleteAppLink: function(applicationId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/permission/reciprocate-application-delete/" + applicationId;
                    return AppLinks.get(url, success, error);
                },
                canDeleteEntityLink: function(localTypeId, localKey, entity, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/permission/reciprocate-entity-delete/" + entity.applicationId + "/" + localTypeId + "/" + localKey + "/" + entity.typeId + "/" + entity.key;
                    return AppLinks.get(url, success, error);
                },
                canCreateReciprocateEntityLink: function(applicationId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/permission/reciprocate-entity-create/" + applicationId;
                    return AppLinks.get(url, success, error);
                },
                processPermissionCode: function(settings) {
                    var config = {
                        noPermission: function() {},
                        missing: function() {},
                        credentialsRequired: function(authUrl) {},
                        authenticationFailed: function(authUrl) {},
                        noAuthentication: function(authUrl) {},
                        noAuthenticationConfigured: function() {},
                        noConnection: function() {},
                        allowed: function() {},
                        unrecognisedCode: function(code) {},
                        updateView: function(message, icon, button) {}
                    };

                    if (!settings) settings = {};

                    settings = $.extend(config, settings);

                    return function(data) {
                        var code = data.code;
                        if (code == "NO_PERMISSION") {
                            settings.noPermission();
                        } else if (code == "MISSING") {
                            settings.missing();
                        } else if (code == "CREDENTIALS_REQUIRED") {
                            settings.credentialsRequired(data.url);
                        } else if (code == "AUTHENTICATION_FAILED") {
                            settings.authenticationFailed(data.url);
                        } else if (code == "NO_AUTHENTICATION") {
                            settings.noAuthentication(data.url);
                        } else if (code == "NO_AUTHENTICATION_CONFIGURED") {
                            settings.noAuthenticationConfigured();
                        } else if (code == "NO_CONNECTION") {
                            settings.noConnection();
                        } else if (code == "ALLOWED") {
                            settings.allowed();
                        } else {
                            settings.unrecognisedCode(data.code);
                        }
                    };
                },
                addAuthenticationTrigger: function(target, authUrl, callbacks) {
                    if (!callbacks) {
                        callbacks = {};
                    }

                    if (typeof callbacks.onSuccess == "undefined") {
                        callbacks.onSuccess = function() {
                            location.reload();
                        }
                    }

                    if (typeof callbacks.onFailure == "undefined") {
                        callbacks.onFailure = function() {
                            return true;
                        }
                    }
                    //Unbind previous click listener, otherwise we might end up opening multiple windows.
                    $(target).off('click.applinks');
                    $(target).on('click.applinks', function() {
                        if (callbacks.before) {
                            callbacks.before();
                        }
                        AppLinks.authenticateRemoteCredentials(authUrl, callbacks.onSuccess, callbacks.onFailure);
                    });
                },
                deleteOrphanedTrust: function(id, type, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/orphaned-trust/" + type + "/" + id;
                    return AppLinks.del(url, success, error);
                },
                getOrphanedTrust: function(success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/orphaned-trust/";
                    return AppLinks.get(url, success, error);
                },
                showCreateEntityLinkSuggestion: function() {
                    return true;
                },
                getApplicationLink: function(id, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlink/' + id;
                    return AppLinks.get(url, success, failure);
                },
                createApplicationLink: function(id, name, rpcUrl, displayUrl, typeId, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlink';
                    var data = {
                        id: id,
                        name: name,
                        rpcUrl: rpcUrl,
                        displayUrl: displayUrl,
                        typeId: typeId
                    };
                    return AppLinks.put(url, data, success, failure);
                },
// TODO APLDEV-3 extract OAuth creation code into OAuth specific js files in the Oauth plugin.
                createConsumer: function(id, key, name, description, sharedSecret, publicKey, twoLOAllowed, executingTwoLOUser, twoLOImpersonationAllowed, outgoing, success, failure) {
                    var url = AppLinks.SPI.OAUTH_BASE_URL + '/applicationlink/' + id + '/authentication/consumer';
                    var data = {
                        key: key,
                        name: name,
                        description: description,
                        sharedSecret: sharedSecret,
                        publicKey: publicKey,
                        outgoing: outgoing,
                        twoLOAllowed: twoLOAllowed,
                        executingTwoLOUser: executingTwoLOUser,
                        twoLOImpersonationAllowed: twoLOImpersonationAllowed
                    };
                    return AppLinks.put(url, data, success, failure);
                },
                createConsumerAutoConfigure: function(id, twoLOAllowed, executingTwoLOUser, twoLOImpersonationAllowed, success, failure) {
                    var url = AppLinks.SPI.OAUTH_BASE_URL + '/applicationlink/' + id + '/authentication/consumer?autoConfigure=true';
                    var data = {
                        twoLOAllowed: twoLOAllowed,
                        executingTwoLOUser: executingTwoLOUser,
                        twoLOImpersonationAllowed: twoLOImpersonationAllowed
                    };
                    return AppLinks.put(url, data, success, failure);
                },
                registerProvider: function(id, provider, config, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlink/' + id + '/authentication/provider';
                    var data = {
                        config : config,
                        provider : provider
                    };
                    return AppLinks.put(url, data, success, failure);
                },
                enableFeature: function(featureName, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/features/' + featureName;
                    return AppLinks.put(url, {}, success, failure);
                },
                disableFeature: function(featureName, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/features/' + featureName;
                    return AppLinks.del(url, success, failure);
                }
            }, (window.AppLinks && window.AppLinks.SPI) || {})
        });

        AppLinks.UI = {
            showInfoBox: function(message) {
                $('.aui-message.aui-message-success').remove();
                AppLinks.UI.createMessage('success', message, 'page-info');
            },
            hideInfoBox: function() {
                $('.aui-message.aui-message-success').remove();
            },
            showErrorBox: function(message) {
                AppLinks.UI.createMessage('error', message, 'page-error');
            },
            hideErrorBox: function() {
                $('.aui-message.aui-message-error').remove();
            },
            showWarningBox: function(messages) {
                if ($.isArray(messages) && messages.length > 0) {
                    var ulEl = $("<ul></ul>");
                    $(messages).each(function(index) {
                        ulEl.append($("<li/>", {
                            text: messages[index]
                        }));
                    });
                    var messageEl = $('<div class="page-warning"></div>').append(ulEl);
                    AppLinks.UI.createMessage('warning', messageEl.html(), 'page-warning');
                } else {
                    AppLinks.UI.createMessage('warning', messages, 'page-warning');
                }
            },
            hideWarningBox: function() {
                $('.aui-message.aui-message-warning').remove();
            },
            shortenString: function(message, maxLength) {
                if (message.length  > maxLength) {
                    message = message.substring(0, maxLength) + "...";
                }
                return message;
            },
            createMessage: function(type, message, cssClass) {
                var messageEl = $('<div class="' + cssClass + '">');
                messageEl.html(message);
                AJS.messages[type](".applinks-message-bar", {
                    title: "",
                    body: messageEl.wrap('<div></div>').parent().html(),
                    closeable: true
                });
                $(document).trigger(AppLinks.Event.Legacy.MESSAGE_BOX_DISPLAYED);
            },
            displayValidationErrorMessages: function (errorClass, rootEl, messages) {
                if ($.isArray(messages)) {
                    $(messages).each(function(i,v) {
                        var d = $('<div class="error applinks-error">');
                        d.text(v);
                        $(rootEl).find("." + errorClass).append(d);
                    });
                } else if(typeof messages != 'undefined'){
                    var d = $('<div class="error applinks-error">');
                    d.text(messages.toString());
                    $(rootEl).find("." + errorClass).append(d);
                }
            },
            displayValidationError: function(errorClass, rootEl, errorFn) {
                return function(xhr) {
                    if (xhr.status == 401) {
                        window.location.reload();
                        return;
                    }
                    $('.applinks-error').remove();
                    $('aui-spinner').remove();

                    var respObj = parseJsonResponse(xhr);
                    var messages = respObj.message;

                    if (typeof respObj.fields == "undefined") {
                        AppLinks.UI.displayValidationErrorMessages(errorClass, rootEl, messages);
                    } else {
                        var fields = respObj.fields;
                        $(fields).each(function(index) {
                            var d = $('<div class="error applinks-error" id="' + fields[index] + '-error">');
                            d.text(messages[index]);
                            if ($(rootEl).find('.' + fields[index]).length > 0) {
                                d.insertAfter($(rootEl).find('.' + fields[index]));
                            } else {
                                d.insertAfter($(rootEl).find('.' + errorClass).append(d));
                            }
                        });
                    }
                    $(rootEl).find('.' + errorClass).addClass("fully-populated-errors");
                    if (errorFn) {
                        errorFn();
                    }
                }
            },
            addProtocolToURL : function(url) {
                var newUrl = $.trim(url);
                var tempURL = newUrl.toLowerCase();
                var hasProtocol = false;
                if (tempURL.length >= 7) {
                    if (tempURL.substring(0,7).indexOf('http') != -1) {
                        hasProtocol = true;
                    }
                }
                //default protocol is http
                if (!hasProtocol) {
                    newUrl = 'http://' + newUrl;
                }
                return newUrl;
            },
            /**
             * Similar to the standard Javascript join() method, but nicer in that
             * it uses a different delimiter for the last node (by default "and"),
             * so that:
             * {code}
             * "1, 2 and 3" == prettyJoin(['1', '2', '3'], function(value) {return value;});
             * {code}
             *
             * @param inputArray
             * @param resolveFn
             * @param finalDelimiter
             */
            prettyJoin : function(inputArray, resolveFn, finalDelimiter) {
                if (!finalDelimiter) {
                    finalDelimiter = "and";
                }
                var maxLength = inputArray.length;
                var message = "";
                $.each(inputArray, function(index, value) {
                    if (index == (maxLength - 1) && maxLength > 1) {
                        message += " " + finalDelimiter + "  " + resolveFn(value);
                    } else {
                        message += resolveFn(value);
                        if (index + 2 < maxLength) {
                            message += ", ";
                        }
                    }
                });
                return message;
            },
            showLoadingIcon: function(element) {
                $('<aui-spinner size="small" class="applinks-loading"></aui-spinner>').insertBefore(element);
            },
            hideLoadingIcon: function(element) {
                $(element).prev('aui-spinner').remove();
            },
            findUrl: function(text) {
                var url = undefined;
                var lcText = text.toLowerCase();
                var startOfUrl = lcText.indexOf('http:');
                if (startOfUrl == -1) {
                    startOfUrl = lcText.indexOf('https:');
                }
                if (startOfUrl > -1) {
                    var endOfUrl = lcText.indexOf(' ', startOfUrl);
                    if (endOfUrl == -1) {
                        endOfUrl = lcText.length;
                    }
                    url = text.substring(startOfUrl, endOfUrl); // use _case-sensitive_ version to retrieve the actual URL
                }
                return url;
            },
            findApplicationType : function(id) {
                id = id.toLowerCase();
                if (id.indexOf("jira") != -1) {
                    return "jira";
                } else if (id.indexOf("fisheye") != -1) {
                    return "fecru";
                } else if (id.indexOf("confluence") != -1) {
                    return "confluence";
                } else if (id.indexOf("refapp") != -1) {
                    return "refapp";
                } else {
                    return undefined;
                }
            },
            escapeSelector: function(selector) {
                // based on http://samuelsjoberg.com/archive/2009/09/escape-jquery-selectors
                return selector.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
            },
            sanitiseHTML: function(input) {
                var replacements = {
                    "<": "&lt;",
                    '"': "&quot;",
                    "&": "&amp;"
                };
                return input.replace(/[<"&]/g, function(match) {
                    return replacements[match];
                });
            },
            refreshOrphanedTrust: function() {
                // post dialog -- check whether we need to remove any orphaned-trust entries
                var updateOrphanedTrust = function(data) {
                    $("tr.orphaned-trust-row").each(function() {
                        var $this = $(this);
                        var id = $this.attr("data-id");
                        var type = $this.attr("data-type");
                        var stillExists = false;
                        for (var i = 0; i < data.orphanedTrust.length; i++) {
                            var ot = data.orphanedTrust[i];
                            if (id == ot.id && type == ot.type) {
                                stillExists = true;
                                break;
                            }
                        }
                        if (!stillExists) {
                            $this.remove();
                            if (data.orphanedTrust.length == 0) {
                                // we just removed the last orphaned trust cert, hide warning!
                                $(".orphaned-trust-warning").hide();
                            }
                        }
                    });
                };

                AppLinks.SPI.getOrphanedTrust(updateOrphanedTrust);
            },
            removeCssClass: function(element, prefix) {
                $(element).removeClass( function(index, className) {
                    var classes = className.split(' ');
                    var classToRemove = "";
                    $.each(classes, function(index, value) {
                        if (value.indexOf(prefix) != -1) {
                            classToRemove = value;
                        }
                    });
                    return classToRemove;
                } );
            }
        };

        /**
         * Add jQuery event system to AppLinks.UI namespace.
         */
        (function(){
            var eventBus = $({});
            $.each(['bind', 'unbind', 'trigger'], function(i, current){
                AppLinks.UI[current] = function(){
                    return eventBus[current].apply(eventBus, arguments);
                }
            });
        })();

        $(document).trigger(AppLinks.Event.PREREADY);
        $(document).trigger(AppLinks.Event.READY);
    });
})(require('applinks/common/i18n'), require('applinks/common/docs'), require('applinks/common/events'));

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'applinks/internal/non-amd/autocomplete.js' */
// NOTE: this is used outside of Applinks. See atlassian-plugin.xml for more details about the associated restrictions

AJS.$(document).bind(AppLinks.Event.READY, function() {
/**
 * TODO: THIS CODE IS COPIED FROM CONFLUENCE and should be part of AUI/AJS.
 * IF AUI comes with the InputDrivenDropDown when can remove this file.
 * https://studio.atlassian.com/browse/AJS-471
 *
 * A simple cache manager that supports a
 * FIFO cache invalidation strategy.
 *
 * @class cacheManager
 * @namespace AJS.Confluence
 * @constructor
 * @param cacheSize the size of the cache before keys are invalidated
 */
AppLinks.autoComplete = {
        cacheManager : function (cacheSize) {
    var cache = {},
        cacheStack = [],
        cacheSize = cacheSize || 30;

    return {
        /**
         * Return the value stored in the cache for the given key
         * @method get
         * @param key {String}
         */
        get: function(key) {
            return cache[key];
        },
        /**
         * Put the given key, value in the cache
         * @method put
         * @param key {String}
         * @param value {Object}
         */
        put: function(key, value) {
            cache[key] = value;
            cacheStack.push(key);
            if (cacheStack.length > cacheSize) {
                delete cache[cacheStack.shift()];
            }
        },
        /**
         * Clear the cache.
         */
        clear : function() {
            cache = {};
            cacheStack = [];
        }
    };
}};


(function($){
    /**
     * Check that all items in the drop down can be displayed - show ellipses at the end of any that
     * are too long. Also remove any unused properties that the dropDown may have stored for each
     * item in the list.
     *
     * @method truncateText
     * @private
     */
    var truncateText = function (dd) {
        AJS.log("InputDrivenDropDown: truncating text");
        var width = dd.$.closest(".aui-dropdown").width(),
            rightPadding = 20; // add some padding so the ellipsis doesn't run over the edge of the box

        $("a span:not(.icon)", dd.$).each(function () {
            var $a = $(this),
                elpss = $("<var></var>").html("&#8230;"),
                elwidth = elpss.width(),
                isLong = false;

            $a.wrapInner($("<em>"));
            $("em", $a).each(function () {
                var $label = $(this);

                $label.show();
                if (this.offsetLeft + this.offsetWidth > width) {
                    var childNodes = this.childNodes,
                        success = false;

                    for (var j = childNodes.length - 1; j >= 0; j--) {
                        var childNode = childNodes[j],
                            truncatedChars = 1,
                            valueAttr = (childNode.nodeType == 3) ? "nodeValue" : "innerHTML",
                            nodeText = childNode[valueAttr];

                        do {
                            if (truncatedChars <= nodeText.length) {
                                childNode[valueAttr] = nodeText.substr(0, nodeText.length - truncatedChars++);
                            } else { // if we cannot fit even one character of the next word, then try truncating the node just previous to this
                                break;
                            }
                        } while (this.offsetLeft + this.offsetWidth + elwidth > width - rightPadding);

                        if (truncatedChars <= nodeText.length) {
                            // we've managed truncate part of the word and fit it in
                            success = true;
                            break;
                        }
                    }

                    if (success) {
                        isLong = true;
                    } else {
                        $label.hide();
                    }
                }
            });
            if (isLong) {
                $a.append(elpss);
                this.elpss = elpss;
            }
        });
    };

    var highlightTokens = function(dd, tokens) {
        if (!tokens.length || !tokens[0]) return;

        AJS.log("InputDrivenDropDown: highlighting tokens");

        // escape regex chars .*+?|()[]{}\ first
        for (var i = 0, ii = tokens.length; i < ii; i++) {
            var token = tokens[i];
            tokens[i] = token ? token.replace(/[\.\*\+\?\|\(\)\[\]{}\\]/g, "\\$") : "";
        }

        var regex = new RegExp("(" + tokens.join("|") + ")", "gi");

        $("li a:not(.dropdown-prevent-highlight) span", dd.$).each(function() {
            var span = $(this),
                html = span.html().replace(regex, "<strong>$1</strong>");
            span.html(html);
        });
    };

    /**
     * Builds and shows the dropdown.
     *
     * @param idd the InputDrivenDropdown
     * @param dropdownData in the form { matrix, query, queryTokens }
     * @private
     */
    var makeDropdown = function (idd, dropdownData) {
        var options = idd.options,
            old_dd = idd.dd;

        if (old_dd) {
            old_dd.hide();
            old_dd.$.remove();
        }

        options.ajsDropDownOptions = options.ajsDropDownOptions || {};
        if (options.ajsDropDownOptions && !options.ajsDropDownOptions.alignment) { // default to left alignment
            options.ajsDropDownOptions.alignment = "left";
        }
        //this needs to be moved into aui
        options.ajsDropDownOptions.selectionHandler = options.ajsDropDownOptions.selectionHandler || function(e, element) {
            if(e.type != "click") {
                e.preventDefault();
                $("a",element).click();
                document.location = $("a",element).attr("href");
            }
        };

        /* Fixing an AUI bug in here:  AJS.dropdown puts the raw 'matrix[i].name' as html, without escaping it !
           The solution is to override their displayHandler
         */
        /**
         * Escape obj.name and return it
         */
        options.ajsDropDownOptions.displayHandler = function (obj) {
            return AJS.escapeHtml(obj.name);
        }

        var dd = idd.dd = new AJS.dropDown(dropdownData.matrix, options.ajsDropDownOptions)[0];

        // could move into dropdown.js in AUI
        if (options.ajsDropDownOptions && options.ajsDropDownOptions.className) {
            dd.$.addClass(options.ajsDropDownOptions.className);
        }

        // place the created drop down using the configured dropdownPlacement function
        // if there is none then use a default behaviour
        if (options.dropdownPlacement) {
            options.dropdownPlacement(dd.$);
        } else {
            AJS.log("No dropdownPlacement function specified. Appending dropdown to the body.");
            $("body").append(dd.$);
        }

        highlightTokens(dd, dropdownData.queryTokens || [dropdownData.query]);
        truncateText(dd);

        if (options.dropdownPostprocess) {
            options.dropdownPostprocess(dd.$);
        }
        dd.show(idd._effect);

        if (typeof options.onShow == "function") {
            options.onShow.call(dd, dd.$);
        }

        return dd;
    };

    /**
     * Provides a controller-agnostic object that listens for controller changes and populates a dropdown
     * via a callback. Most aspects can be customized via the options object parameter.
     * <br>
     * Options are:
     * <li>
     *   getDataAndRunCallback - (required) callback method used to provide data for the dropdown. It must take
     *                          two parameters, user input value and the callback function to execute.
     * </li>
     * <li>
     *   onShow - function to call when the drop-down is displayed
     * </li>
     * <li>
     *   dropdownPlacement - a function that will be called with the drop down and which should place it in the
     *                          correct place on the page. The supplied arguments are 1) the input that issued the
     *                          search, 2) the dropDown to be placed.
     * </li>
     * <li>
     *   ajsDropDownOptions - any options the underlying dropDown component can handle expects
     * </li>
     * <li>
     *   onDeath - callback to run when dropdown dies
     * </li>
     * @class InputDrivenDropDown
     * @namespace AJS
     */
    function InputDrivenDropDown(id, options) {
        this._effect = "appear";
        this._timer = null;

        this.id = id;
        this.options = options;
        this.inactive = false;
        this.busy = false;
        this.cacheManager = AppLinks.autoComplete.cacheManager();
    }

    /**
     * Clears the cache.
     */
    InputDrivenDropDown.prototype.clearCache = function () {
        this.cacheManager.clear();
    };

    /**
     * This method should be called when the user input for this dropdown has changed.
     * It will check the cache before fetching data (via options.getDataAndRunCallback)
     * and displaying the dropdown.
     *
     * @param value {String} the new value of the user input
     * @param force {Boolean} force a change to occur regardless of user input
     */
    InputDrivenDropDown.prototype.change = function (value, force) {
        var t = this;
        if (value != t._value || force) {
            t._value = value;
            t.busy = false;

            clearTimeout(t._timer);

            if (force || (/\S{0,}/).test(value)) {
                var cachedVal = t.cacheManager.get(value);
                if (cachedVal) {
                    makeDropdown(t, cachedVal);
                } else {
                    t.busy = true;
                    t._timer = setTimeout(function () { // delay sending a request to give the user a chance to finish typing their search term(s)
                        t.options.getDataAndRunCallback.call(t, value, t.show);
                    }, 200);
                }
            } else {
                t.dd && t.dd.hide();
            }
        }
    };

    /**
     * Gets the number of visible options in the dropdown.
     */
    InputDrivenDropDown.prototype.dropDownLength = function () {
        return this.dd.links ? this.dd.links.length : 0;
    };
    
    /**
     * Gets the specified menu item from the dropdown list.
     * 
     * @param index {Integer} the 0-based index of the dropdown option list
     */
    InputDrivenDropDown.prototype.dropDownItem = function (index) {
        return this.dropDownLength() > index ? this.dd.links[index] : null;
    };
    
    /**
     * Hides the drop down
     */
    InputDrivenDropDown.prototype.hide = function () {
        this.dd && this.dd.hide();
    };

    /**
     * Hides and removes the drop down from the DOM.
     */
    InputDrivenDropDown.prototype.remove = function () {
        var dd = this.dd;
        if (dd) {
            this.hide();
            dd.$.remove();
        }
        this.inactive = true;
        this.options.onDeath && this.options.onDeath();
    };

    /**
     * Shows the drop down with the given matrix data and query.
     * <br>
     * Matrix property should be an array of arrays, where the sub-arrays represent the different
     * search categories.
     *
     * Expected properties of category sub-array objects are:
     *  - href
     *  - name
     *  - className
     *  - html (optional, replaces href and name)
     *  - icon (optional)
     *
     *
     * @param matrix {Array} matrix to populate the drop down from
     * @param query {String} the user input string that triggered this show
     * @param queryTokens {Array} an array of strings of the query tokens. Use for highlighting search terms.
     */
    InputDrivenDropDown.prototype.show = function (matrix, query, queryTokens) {
        if (this.inactive) {
            AJS.log("Quick search abandoned before server response received, ignoring. " + this);
            return;
        }

        var dropdownData = {
            matrix: matrix,
            query: query,
            queryTokens: queryTokens
        };
        this.cacheManager.put(query, dropdownData);

        makeDropdown(this, dropdownData);
        this.busy = false;
    };

    /**
     * Returns an InputDrivenDropDown. See InputDrivenDropDown for more documentation.
     * @param options {Object} options for the InputDrivenDropDown
     * @constructor
     */
    AppLinks.inputDrivenDropdown = function (options) {
        return new InputDrivenDropDown("inputdriven-dropdown", options);
    };

})(jQuery);
});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'js/fecru-compatibility.js' */
if (jQuery != undefined && AJS != undefined) jQuery = AJS.$; // make sure we're extending the correct jQuery
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:feature-oauth-dance', location = 'applinks/internal/feature/oauth/oauth-callback.js' */
define('applinks/feature/oauth-callback', [
    'applinks/lib/window',
    'applinks/lib/lodash',
    'applinks/common/preconditions'
], function(
    window,
    _,
    Preconditions
) {
    function OAuthCallback(url) {
        Preconditions.nonEmptyString(url, 'url');
        this._url = url;
    }

    OAuthCallback.prototype.source = function(source) {
        Preconditions.hasValue(source, 'source');
        this._source = source;
        return this;
    };

    OAuthCallback.prototype.onSuccess = function(callback) {
        Preconditions.isFunction(callback, 'onSuccess');
        this._onSuccess = callback;
        return this;
    };

    OAuthCallback.prototype.onFailure = function(callback) {
        Preconditions.isFunction(callback, 'onFailure');
        this._onFailure = callback;
        return this;
    };

    // API for OAuth to invoke callbacks
    OAuthCallback.prototype.success = function() {
        this.oauthWindow.close();
        if (this._onSuccess) {
            this._onSuccess(this._source);
        }
        // free up the oauthCallback object
        delete window.oauthCallback;
    };

    OAuthCallback.prototype.failure = function() {
        this.oauthWindow.close();
        if (this._onFailure) {
            this._onFailure(this._source);
        }
        // free up the oauthCallback object
        delete window.oauthCallback;
    };

    // start the dance
    OAuthCallback.prototype.open = function() {
        // required for OAuth callbacks to fire
        window.oauthCallback = this;
        this.oauthWindow = window.open(this._url, 'com_atlassian_applinks_authentication');
    };

    return OAuthCallback;
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:feature-oauth-dance', location = 'applinks/internal/feature/oauth/oauth-dance.js' */
define('applinks/feature/oauth-dance', [
    'applinks/lib/console',
    'applinks/lib/jquery',
    'applinks/lib/lodash',
    'applinks/lib/window',
    'applinks/common/events',
    'applinks/common/preconditions',
    'applinks/feature/oauth-callback'
], function(
    console,
    $,
    _,
    window,
    ApplinksEvents,
    Preconditions,
    OAuthCallback
) {
    /**
     * Creates a new OAuth Dance. This initializes elements found by `selector` within `scope` to initiate the OAuth
     * dance on click. The elements need to have a `data-authorisation-uri` attribute that points to the authorisation
     * page to open.
     *
     * @param scope {string} optional selector for scope, if not defined then global `document` will be used
     * @param selector {string} selector for the DOM elements to initialize OAuth dance for. If not defined then scope will be used
     * @constructor
     */
    function OAuthDance(scope, selector) {
        this._scope = scope || window.document;
        this._selector = selector;
    }

    OAuthDance.prototype.onSuccess = function(callback) {
        Preconditions.isFunction(callback, 'onSuccess');
        this._onSuccess = callback;
        return this;
    };

    OAuthDance.prototype.onFailure = function(callback) {
        Preconditions.isFunction(callback, 'onFailure');
        this._onFailure = callback;
        return this;
    };

    OAuthDance.prototype.defaultSuccess = function() {
        return this.onSuccess(function() {
            window.location.reload()
        });
    };

    OAuthDance.prototype.defaultFailure = function() {
        return this.onFailure(function() { return true });
    };

    /**
     * Wire up click events for the selected elements to initiate OAuth dance.
     */
    OAuthDance.prototype.initialize = function() {
        var that = this;
        if (this._selector) {
            $(this._scope).on('click', this._selector, function(e) {
                e.preventDefault();
                that._open($(this));
            });
        } else {
            $(this._scope).on('click', function(e) {
                e.preventDefault();
                that._open($(this));
            });
        }
    };

    /**
     * Start the OAuth dance for the given selector/scope.
     */
    OAuthDance.prototype.start = function() {
        var $scope = $(this._scope);
        var $element = this._selector ? $scope.find(this._selector) : $scope;
        this._open($element);
    };

    OAuthDance.prototype._open = function(element) {
        if (element.length !== 1) {
            console.warn('Could not trigger OAuth dance, the source is not a single HTML element: ' + element);
            return;
        }
        
        var authorisationUri = element.attr('data-authorisation-uri');

        if (authorisationUri) {
            this._onSuccess || this.defaultSuccess();
            this._onFailure || this.defaultFailure();
            new OAuthCallback(authorisationUri)
                .source(element)
                .onSuccess(this._onSuccess)
                .onFailure(this._onFailure)
                .open();
        } else {
            console.warn('Could not trigger OAuth dance, data-authorisation-uri missing for: ' + element);
        }
    };

    return OAuthDance;
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-oauth-ui', location = 'js/oauth-dialog.js' */
// NOTE: this is used outside of Applinks. See atlassian-plugin.xml for more details about the associated restrictions

/**
 * @deprecated use applinks/feature/oauth-callback and applinks/feature/oauth-dance AMD module
 */
(function($, ApplinksEvents, OAuthCallback) {
    // rest-service.js will load the AppLinks name space
    AppLinks.authenticateRemoteCredentials = function (url, onSuccess, onFailure) {
        $('.applinks-error').remove();
        new OAuthCallback(url).onSuccess(onSuccess).onFailure(onFailure).open();
    };
})(require('applinks/lib/jquery'), require('applinks/common/events'), require('applinks/feature/oauth-callback'));

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:common', location = 'util/retry-caller.js' */
define("confluence/jim/util/retry-caller",["ajs","jquery","underscore"],function(b,d,c){var a=function(g,p){p=p||{};var h=p.args;var j=(typeof p.tester==="function")?p.tester:function(){return true};var i=p.delays||[0.1,0.3,0.5,0.7,1];var l=i.length;var e=p.name||"";var k=d.Deferred(),o=k.promise();var f=p.context||k;var n=0;var m=function(){if(n===l){return k.rejectWith(f,[f,"exceed-maximum-called-times",""])}var r=i[n++];var q=function(){d.when(g.apply(f,h)).then(function(){k.notify.apply(f,arguments);if(j.apply(f,arguments)){m()}else{k.resolveWith(f,arguments)}},function(){k.rejectWith(f,arguments)})};c.delay(q,r)};m();return o};return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:common', location = 'util/common.js' */
AJS.JiraIssues={Remote:{}};var appLinksI18n={entries:{}};jQuery(document).ready(function(){AJS.JiraIssues=jQuery.extend(AJS.JiraIssues||{},{bindOAuthLink:function(c,f){var e={onSuccess:function(){f()},onFailure:function(){}};var d=c.attr("href");c.click(function(g){AppLinks.authenticateRemoteCredentials(d,e.onSuccess,e.onFailure);g.preventDefault()})},getOAuthRealm:function(f){var d=f.getResponseHeader("WWW-Authenticate")||"";var c=/OAuth realm\=\"([^\"]+)\"/;var e=c.exec(d);if(e){return e[1]}else{return null}}});jQuery("a.static-oauth-init").each(function(){AJS.JiraIssues.bindOAuthLink(jQuery(this),function(){window.location.reload()})});jQuery("a.anonymous-init").each(function(f,e){var c=encodeURIComponent(window.location.pathname.replace(Confluence.getContextPath(),""));var d=Confluence.getContextPath()+"/login.action?os_destination="+c;AJS.$(e).attr("href",d)});var a=function(j){var e=AJS.JiraIssues.Remote[j];var h="";for(var g=0;g<e.length;g++){h=h+(e[g].key+(g<e.length-1?",":""))}var d=function(l){var i="issuekey in ("+l+")";var m="/sr/jira.issueviews:searchrequest-xml/temp/SearchRequest.xml?jqlQuery="+encodeURIComponent(i)+"&returnMax=true";var k=contextPath+"/plugins/servlet/issue-retriever?appId="+j+"&url="+encodeURIComponent(m)+"&columns=summary&columns=type&columns=resolution&columns=status";return k};var f=function(k){var i=AJS.$("item",k);i.each(function(){var u=AJS.$("link",this).text();var v=AJS.$("key",this).text();var r=AJS.$("summary",this).text();var s=AJS.$("type",this);var m=AJS.$("resolution",this);var w=m.attr("id")!="-1";var o=AJS.$("status",this);var n=AJS.$(".unknown-jira-issue."+v);for(var p=0;p<n.length;p++){var t=AJS.$("<a style=\"background-image: url('"+s.attr("iconUrl")+'\')" href="'+u+'"></a>');t.text(v);var l=AJS.$('<span class="jira-status"></span>');l.text(o.text().toUpperCase());var q=AJS.$('<span class="jira-issue'+(w?" resolved":"")+'" ></span>');q.append(t);q.append(document.createTextNode(" - "+r+" - "));q.append(l);AJS.$(n[p]).replaceWith(q)}})};var c=d(h);AJS.$.ajax({url:c,success:f,error:function(l){if(l.status==401){var k=AJS.JiraIssues.getOAuthRealm(l);if(k){var i={};AJS.$(e).each(function(){if(!i[this.key]){i[this.key]=true;var m=AJS.$('<span class="oauth-msg"> - <a class="oauth-init" href="'+k+'">'+"Authenticate"+"</a> "+"to see issue details"+"</span>");AJS.$(".unknown-jira-issue."+this.key).addClass("single-issue-oauth").append(m)}});AJS.JiraIssues.bindOAuthLink(AJS.$(".single-issue-oauth a.oauth-init"),function(){window.location.reload()})}}else{if(l.status==400&&e.length>1){AJS.$(e).each(function(){var m=this.key;var n=d(m);AJS.$.ajax({url:n,success:f,error:function(p){var o=AJS.$(".unknown-jira-issue."+m);o.removeClass("single-issue-oauth");AJS.$(".oauth-msg",o).remove();o.addClass("jira-error")}})})}}}})};AJS.$(".unknown-jira-issue").each(function(e,f){var d=AJS.$(f);var g=d.attr("data-app-link");var c=d.attr("data-key");AJS.JiraIssues.Remote[g]=AJS.JiraIssues.Remote[g]||[];AJS.JiraIssues.Remote[g].push({key:c})});for(var b in AJS.JiraIssues.Remote){a(b)}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:web-resources', location = 'templates/extra/jira/jiraIssues.js' */
jQuery(document).ready(function(){var a=jQuery.extend(window.JiraIssues||{},{ADG_ENABLED:AJS.Meta.getNumber("build-number")>=4000,ADG_FONT_SIZE_OVER_FLEXIGRID_FONT_SIZE_RATIO:14/11,onSuccessFunction:function(d){if(!jQuery("fieldset input[name='height']",d).length){var b=jQuery(".bDiv table[id^='jiraissues_table']",d)[0];var e=b.grid;var c=b.clientHeight+jQuery(".hDiv",d)[0].clientHeight;jQuery(".bDiv",d).css("height",c+"px");e.options.height=c;e.fixHeight(c)}},onErrorFunction:function(h,c,b,n,f){var o=jQuery("#"+c);var g=b+": ";if(n.status=="200"){g+=f}else{g+=n.responseText}var i=n.getResponseHeader("WWW-Authenticate")||"";if(n.status=="401"&&i.indexOf("OAuth")!=-1){var m=/OAuth realm\=\"([^\"]+)\"/;var e=m.exec(i);if(e){o.empty();a.bigMessageFunction(c,'<a class="oauth-init" href="'+e[1]+'">'+"Authenticate"+"</a> "+"to retrieve your issues"+"</span>");jQuery(".bmDiv",h).css({"z-index":2});var j={onSuccess:function(){window.location.reload()},onFailure:function(){}};var l=jQuery(".oauth-init",o.parent());var d=l.attr("href");l.click(function(p){AppLinks.authenticateRemoteCredentials(d,j.onSuccess,j.onFailure);p.preventDefault()});AJS.$(".gBlock").remove()}}else{if(n.status=="400"){a.bigMessageFunction(c,"The Jira server was not able to process the search. This may indicate a problem with the syntax of this macro. Alternatively, if this table is requesting specific issue keys, you may not have permission to view one of these issues.")}else{var k=jQuery("iframe.jiraissues_errorMsgSandbox",h);k.load(function(){var r=this.contentWindow||this.contentDocument;var q=jQuery((r.document?r.document:r).body);jQuery("a",q).each(function(){this.target="_top"});jQuery(".pPageStat",h).empty().text(q.text());var p=jQuery("div.bmDiv",h)[0];k.removeClass("hidden");k.css({height:p.clientHeight+"px",width:p.clientWidth+"px"})});k[0].src=jQuery("fieldset input[name='retrieverUrlHtml']",h).val();a.bigMessageFunction(c,k)}}jQuery(h).find(".pReload").removeClass("loading");o[0].grid.loading=false;jQuery(h).find(".pButton").each(function(){jQuery(this).removeClass("pBtnOver");jQuery(this).css({cursor:"default",opacity:"0.3"})});jQuery(h).find("span.pcontrol input").attr("readonly","true")},onReloadFunction:function(b,d,c){jQuery(".bmDiv",d).remove();jQuery(".bmDistance",d).remove();c.onSubmit=function(){a.reloadOnSubmitFunction(b,c);return true}},reloadOnSubmitFunction:function(b,c){c.params=[{name:"useCache",value:false}];c.onSubmit=function(){a.onSubmitFunction(b,c);return true}},onSubmitFunction:function(b,c){c.params=[{name:"useCache",value:b}]},showTrustWarningsFunction:function(d,c){var b=jQuery(d).children(".trusted_warnings");if(c.trustedMessage){b.find("td:last").html(c.trustedMessage);b.css("display","block")}else{b.css("display","none")}},preProcessFunction:function(e,b,d,c,f){if(d){a.showTrustWarningsFunction(e,c)}if(c.total==0){jQuery(".pPageStat",e).html(f);a.bigMessageFunction(b,f);jQuery(".pReload",e).removeClass("loading");return}},bigMessageFunction:function(e,f){var d=jQuery("<div></div>");var b=jQuery("<div></div>");d.addClass("bmDistance");b.addClass("bmDiv");if(typeof f=="string"){b.html("<p><strong>"+f+"</strong></p>")}else{f.appendTo(b)}var c=jQuery("#"+e);c.after(b).after(d)},getParamsFrom:function(c){var b={};c.children("input").each(function(){b[jQuery(this).attr("name")]=jQuery(this).attr("value")});return b},initializeColumnWidth:function(f,p){var d={},m=function(i){return a.ADG_ENABLED?Math.round(i*a.ADG_FONT_SIZE_OVER_FLEXIGRID_FONT_SIZE_RATIO):i};if(!(p&&p.length)){return d}var h=37,n=11,k=f.width()-(h+(p.length*n)),j=false,q=false,o=0,c=m(140);for(var l=0,e=p.length;l<e;l++){var g=p[l].name;switch(g){case"summary":j=true;o++;break;case"description":q=true;o++;break;case"type":o++;d[g]=30;k-=30;break;case"priority":o++;d[g]=50;k-=50;break;case"status":o++;d[g]=m(100);k-=m(100);break;case"key":o++;d[g]=m(90);k-=m(90);break;case"comments":case"attachments":case"version":case"component":case"resolution":o++;d[g]=m(80);k-=m(80);break;default:d[g]=c}}if(j||q){k-=(c*(p.length-o));var b=250;if(j&&q){d.summary=Math.max(k/2,b);d.description=Math.max(k/2,b)}else{if(j){d.summary=Math.max(k,b)}else{d.description=Math.max(k,b)}}}else{if(!j&&!q&&(p.length>o)){c=k/(p.length-o);for(l=0;l<e;l++){if(!{resolution:true,key:true,type:true,priority:true,status:true}[p[l]]){d[p[l]]=c}}}}return d}});jQuery(".jiraissues_table").each(function(f,j){var k=jQuery(j),h=k.children("fieldset"),e=a.getParamsFrom(h),c="jiraissues_table_"+f;k.append('<table id="'+c+'" style="display:none"></table>');k.css("width",e.width);var d=[];h.children(".columns").each(function(l){var m=jQuery(this).hasClass("nowrap");d[l]={display:this.name,name:this.value,nowrap:m,sortable:true,align:"left"}});var b=a.initializeColumnWidth(k,d);jQuery.each(d,function(l,m){m.width=b[m.name]});var g=jQuery("<div></div>");jQuery("<a></a>").attr({rel:"nofollow",href:e.clickableUrl}).text(e.title).appendTo(g);jQuery("#"+c).flexigrid({url:e.retrieverUrlHtml,method:"GET",dataType:"json",colModel:d,sortname:e.sortField,sortorder:e.sortOrder,usepager:true,title:g.html(),page:parseInt(e.requestedPage,10),useRp:false,rp:parseInt(e.resultsPerPage,10),showTableToggleBtn:true,height:(function(){return e.height?parseInt(e.height,10):480})(),onSuccess:function(){a.onSuccessFunction(j)},onSubmit:function(){a.onSubmitFunction(e.useCache,this);return true},preProcess:function(i){a.preProcessFunction(j,c,e.showTrustWarnings,i,e.nomsg);return i},onError:function(m,l,i){a.onErrorFunction(j,c,e.jiraissuesError,m,l,i)},onReload:function(){a.onReloadFunction(e.useCache,j,this);return true},errormsg:e.errormsg,pagestat:e.pagestat,procmsg:e.procmsg,nomsg:e.nomsg})});jQuery(".jiraissues_count").each(function(b,d){var c=jQuery(d);jQuery.ajax({cache:false,type:"GET",url:c.find(".url").text(),data:{useCache:c.find(".use-cache").text(),rp:c.find(".rp").text(),showCount:"true"},success:function(f){var e=c.find(".result");if(f==1){e.text(AJS.format("{0} issue",f))}else{e.text(AJS.format("{0} issues",f))}e.removeClass("hidden");jQuery(".calculating, .error, .data",c).remove()},error:function(h){var f=jQuery(".error",c).removeClass("hidden"),g=h.getResponseHeader("WWW-Authenticate")||"",j=false;if(h.status===401&&g.indexOf("OAuth")!=-1){var e=/OAuth realm\=\"([^\"]+)\"/,i=e.exec(g);if(i){f.empty().append(AJS.$("<a/>",{href:i[1],"class":"oauth-init"}).text("Authenticate").click(function(){AppLinks.authenticateRemoteCredentials(i[1],function(){window.location.reload()},function(){});return false})).append(AJS.$("<span/>",{text:" "+"to retrieve your issues"}));j=true}}if(!j){f.text(AJS.format(f.text(),h.status))}jQuery(".calculating, .result, .data",c).remove()}})})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.synchrony-interop:synchrony-status-banner-loader', location = '/js/synchrony-down-banner-loader.js' */
require(["ajs","wrm"],function(b,a){b.toInit(function(){!0===a.data.claim("com.atlassian.confluence.plugins.synchrony-interop:synchrony-status-banner-loader.synchrony-status")&&a.require("wrc!synchrony-interop-down-banner")})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'templates/recently.soy' */
// This file was automatically generated from recently.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace RY.Templates.
 */

if (typeof RY == 'undefined') { var RY = {}; }
if (typeof RY.Templates == 'undefined') { RY.Templates = {}; }


RY.Templates.body = function(opt_data, opt_ignored) {
  return '<div id="recently-viewed" class="aui-group"><div class="aui-item"><div class="top"><div class="filter"><form class="aui"><input class="filter-input text" type="text" placeholder="' + soy.$$escapeHtmlAttribute('Filter') + '"></form></div></div><div class="pages"></div></div></div>';
};
if (goog.DEBUG) {
  RY.Templates.body.soyTemplateName = 'RY.Templates.body';
}


RY.Templates.pageCollection = function(opt_data, opt_ignored) {
  return '<div class="groups"></div><div class="empty"></div>';
};
if (goog.DEBUG) {
  RY.Templates.pageCollection.soyTemplateName = 'RY.Templates.pageCollection';
}


RY.Templates.pageGroup = function(opt_data, opt_ignored) {
  return '<h3>' + soy.$$escapeHtml(opt_data.title) + '</h3><ul></ul>';
};
if (goog.DEBUG) {
  RY.Templates.pageGroup.soyTemplateName = 'RY.Templates.pageGroup';
}


RY.Templates.pageItem = function(opt_data, opt_ignored) {
  return '<a href=' + soy.$$escapeHtmlAttributeNospace(soy.$$filterNormalizeUri(opt_data.href)) + '><div class="page-icon"><span class="aui-icon content-type-' + soy.$$escapeHtmlAttribute(opt_data.type) + '">' + soy.$$escapeHtml(opt_data.type) + '</span></div><div class="page-title"><span class="ellipsis" href=' + soy.$$escapeHtmlAttributeNospace(soy.$$filterNormalizeUri(opt_data.href)) + '>' + soy.$$escapeHtml(opt_data.title) + ' - ' + soy.$$escapeHtml(opt_data.space) + '</span></div></a>';
};
if (goog.DEBUG) {
  RY.Templates.pageItem.soyTemplateName = 'RY.Templates.pageItem';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/util.js' */
var RY=RY||{};
(function(){var a=new Date,c=(new Date(a)).getTime(),d=(new Date(a.getFullYear(),a.getMonth(),a.getDate())).getTime(),h=(new Date(a.getFullYear(),a.getMonth(),a.getDate()-1)).getTime();RY.util=RY.Util={analytics:{trackDialogOpen:function(){AJS.trigger("analytics",{name:"recently-viewed-dialog-open"})},trackPageOpen:function(){AJS.trigger("analytics",{name:"recently-viewed-page-open"})}},quote:function(b){return b.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},diffInDays:function(b,a){return Math.floor((b-a)/
864E5)},daysSince:function(a){return a>=d?0:a>=h?1:RY.util.diffInDays(c,a)},wait:function(a,e,c){var b,f,g,d=function(){f=setTimeout(function(){a.apply(c,g)},e)};return function(){g=arguments;var a=new Date;b&&a-b<e&&clearTimeout(f);d();b=a}}}})();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/page-storage.js' */
var RY=RY||{};
RY.RecentPageStorage=function(d){var c={},e=function(){var a=function(b,a){return"lastSeen"===b&&_.isString(a)?(new Date(a)).getTime():a};try{c=JSON.parse(d.getItem("com.atlassian.confluence.plugins.recently.viewed.pages.v1"),a)||{}}catch(b){c={}}return c},f=function(){var a=_.values(c),b=a.length-100;if(0<b){var d=_.sortBy(a,function(a){return a.lastSeen});_.times(b,function(){var a=d.shift();delete c[a.id]})}};this.addCurrentPage=function(a){if(a.id&&a.title){e();var b=c[a.id];b||(c[a.id]=b={});
b=_.extend(b,a);b.lastSeen=(new Date).getTime();b.count=b.count+1||1;f();try{d.setItem("com.atlassian.confluence.plugins.recently.viewed.pages.v1",JSON.stringify(c))}catch(g){}}};this.getPages=function(){return _.values(e())}};
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/filter.js' */
var RY=RY||{};
RY.FilterView=Backbone.View.extend({className:"filter",events:{"input .filter-input":"onInput","keyup .filter-input":"onInput","keydown .filter-input":"onKeydown"},initialize:function(){_.bindAll(this,"render","onInput","onKeydown","search");this.navigationEvents=this.options.navigationEvents;this.onInput=RY.util.wait(this.onInput,100,this)},render:function(){this.$input=this.$(".filter-input");return this},onInput:function(a){a&&_.contains([37,38,39,40],a.which)||this.search()},onKeydown:function(a){switch(a.which){case 13:this.navigationEvents.trigger("select");a.preventDefault();
a.stopPropagation();break;case 38:this.navigationEvents.trigger("previous");a.preventDefault();break;case 40:this.navigationEvents.trigger("next"),a.preventDefault()}},search:function(){var a=this.$input.val();this.collection.search(a)}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/page-model.js' */
var RY=RY||{};
(function(){var c="undefined"!=typeof ConfluenceMobile?ConfluenceMobile.AppData.get("confluence-context-path"):AJS.contextPath();RY.Page=Backbone.Model.extend({href:function(){return c+this.get("url")},daysSinceLastSeen:function(){return RY.util.daysSince(this.get("lastSeen"))}});RY.PageCollection=Backbone.Collection.extend({model:RY.Page,url:c+"/rest/recentlyviewed/1.0/recent?includeTrashedContent\x3dtrue",search:function(a){if(0===this._queryLength(a))var b=this.models;else{var c=a.match(/[^\s-]+/g);
b=this.filter(function(a){var b=a.get("title");a=a.get("space");var d=(b+a).toLowerCase();return _.all(c,function(a){return-1!==d.indexOf(a.toLowerCase())})})}this.trigger("filter",b,a);return b},_queryLength:function(a){return String.prototype.trim?a.trim().length:AJS.$.trim(a).length},comparator:function(a){return-a.get("lastSeen")}})})();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/page.js' */
var RY=RY||{};RY.PageView=Backbone.View.extend({tagName:"li",className:"ry-page",template:RY.Templates.pageItem,initialize:function(){_.bindAll(this,"hide","show","render")},hide:function(){this.$el.hide().removeClass("shown")},show:function(){this.$el.show().addClass("shown")},render:function(){var a=this.model.toJSON();a.href=this.model.href();this.$el.html(this.template(a));return this}});
RY.PageGroupView=Backbone.View.extend({className:"group",template:RY.Templates.pageGroup,initialize:function(){_.bindAll(this,"hide","hideAll","show","showBorder","showPages","add","render");this.title=this.options.title;this.modelViews={}},hide:function(){this.$el.hide()},hideAll:function(){this.$el.removeClass("border").hide();_.invoke(_.values(this.modelViews),"hide")},show:function(){this.$el.show()},showBorder:function(){this.$el.addClass("border")},showPages:function(a){var b=this,c=!1;_.each(a,
function(a){if(a=b.modelViews[a.cid])c=!0,a.show()});c&&this.show();return c},add:function(a){var b=new RY.PageView({model:a});this.modelViews[a.cid]=b;this.$list.append(b.render().el)},render:function(){this.$el.html(this.template({title:this.title}));this.$list=this.$("ul");return this}});
RY.PageNavigator=function(a,b,c){function e(b){pageItems=a.find("li.shown");var c=pageItems.index(pageItems.filter(".highlight"));d&&d.removeClass("highlight");b+=c;0>b&&(b=pageItems.length-1);b>=pageItems.length&&(b=0);d=pageItems.eq(b);d.addClass("highlight")}function f(){if(d.length){var c=b.children(),e=b.height(),f=d.outerHeight(!0),g=d.position().top;0>g?0===a.find("li.shown").index(d)?b.scrollTop(0):b.scrollTop(d.offset().top-c.offset().top):g>e&&b.scrollTop(d.offset().top-c.offset().top-e+
f)}}var d=null;c.on("select",function(){if(d&&d.is(":visible")){RY.util.analytics.trackPageOpen();var a=d.find(".page-title span").attr("href");window.location=a}},this);c.on("previous",function(){e(-1);f()},this);c.on("next",function(){e(1);f()},this)};
RY.PageCollectionView=Backbone.View.extend({template:RY.Templates.pageCollection,events:{"click .page-title a":RY.util.analytics.trackPageOpen},initialize:function(){_.bindAll(this,"checkEmpty","filter","_groupForPage","addOne","showEmptyMessage","clearEmptyMessage","addAll","render");this.modelViews={};this.collection.on("reset",this.addAll,this);this.collection.on("add",this.addOne,this);this.collection.on("filter",this.filter,this)},checkEmpty:function(a,b){var c=this.collection.isEmpty();a=0===
a.length;c||a?(c?b="Sorry mate, looks like you haven\u0027t visited any pages yet.":(b=AJS.contextPath()+"/dosearchsite.action?queryString\x3d"+encodeURIComponent(b),b="We didn\u0027t find any matching pages in your history."+" "+AJS.format("\u003ca href=\u0022{0}\u0022\u003eClick here\u003c/a\u003e to search for this term instead.",b)),this.showEmptyMessage(b)):this.clearEmptyMessage()},filter:function(a,b){this.checkEmpty(a,b||"");b=[this.$today,this.$yesterday,this.$older];_.invoke(b,
"hideAll");var c=[];_.each(b,function(b){b.showPages(a)&&c.push(b)});1<c.length&&(c.pop(),_.invoke(c,"showBorder"))},_groupForPage:function(a){a=a.daysSinceLastSeen();return 0===a?this.$today:1===a?this.$yesterday:this.$older},addOne:function(a){this._groupForPage(a).add(a)},showEmptyMessage:function(a){this.$(".empty").html(AJS.$("\x3cp\x3e").html(a))},clearEmptyMessage:function(){this.$(".empty").html("")},addAll:function(){this.collection.each(this.addOne)},render:function(){this.$el.html(this.template());
this.$today=new RY.PageGroupView({title:"Today"});this.$yesterday=new RY.PageGroupView({title:"Yesterday"});this.$older=new RY.PageGroupView({title:"Older"});var a=this.$(".groups");a.append(this.$today.render().el);a.append(this.$yesterday.render().el);a.append(this.$older.render().el);
_.invoke([this.$today,this.$yesterday,this.$older],"hideAll");return this}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:main-resources', location = 'js/main.js' */
var RY=RY||{};
AJS.toInit(function(b){b("#view-user-history-link").unbind("click");b("#view-user-history-link").click(function(a){a.preventDefault();a=new AJS.Dialog({width:600,height:500,id:"recently-viewed-dialog",closeOnOutsideClick:!0});var c=b(RY.Templates.body());a.addHeader("Recently viewed pages");a.addPanel("SinglePanel",c);a.addLink("Close",function(a){a.hide()});var f=b("\x3cdiv\x3e",{"class":"dialog-tip"}).text("Hint: type \u0022g\u0022 and then \u0022r\u0022 anywhere to quickly open this menu");
a.popup.element.find(".dialog-button-panel").append(f);var d=new RY.PageCollection,e=new RY.PageCollectionView({collection:d});c.find(".pages").html(e.render().el);a.gotoPanel(0);a.show();var g=b("#recently-viewed-dialog").spin("large");d.fetch({success:function(){g.spinStop();var a=_.extend({},Backbone.Events);new RY.PageNavigator(e.$el,c.parent(),a);(new RY.FilterView({collection:d,el:c.find(".filter"),navigationEvents:a})).render().search()}});RY.util.analytics.trackDialogOpen()})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-ia:spacemenu-resources', location = 'js/space-menu.js' */
AJS.toInit(function(a){var b=a(Confluence.Templates.BrowseSpaces.spacesLink());a("#space-directory-link").replaceWith(a(b));var d=function(b){var c=a("#space-menu-link-content");c.html(b.template);AJS&&AJS.Confluence&&AJS.Confluence.Analytics&&AJS.Confluence.Analytics.setAnalyticsSource&&AJS.Confluence.Analytics.setAnalyticsSource(c.find("a"),"spacemenu");a("#create-space-header").click(function(){AJS.trigger("analytics",{name:"create-space-from-header"});Confluence.SpaceBlueprint.Dialog.launch();
return!1})};a("#space-menu-link-content").on("aui-dropdown2-show",function(){AJS.trigger("analytics",{name:"open-space-menu"});a("#space-menu-link-content .aui-dropdown2-section")&&a("#space-menu-link-content .aui-dropdown2-section").length||a.ajax({url:Confluence.getContextPath()+"/rest/ia/1.0/spacesmenu",type:"GET",dataType:"json",cache:!1,success:d});return!1})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-ia:spacemenu-resources', location = 'soy/space-menu.soy' */
// This file was automatically generated from space-menu.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.BrowseSpaces.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.BrowseSpaces == 'undefined') { Confluence.Templates.BrowseSpaces = {}; }


Confluence.Templates.BrowseSpaces.spacesLink = function(opt_data, opt_ignored) {
  return '' + aui.dropdown2.trigger({menu: {id: 'space-menu-link-content'}, id: 'space-menu-link', tagName: 'a', extraClasses: 'aui-nav-link', title: 'Spaces', showIcon: false, text: 'Spaces'}) + aui.dropdown2.contents({id: 'space-menu-link-content', extraClasses: 'aui-style-default aui-dropdown2-in-header'});
};
if (goog.DEBUG) {
  Confluence.Templates.BrowseSpaces.spacesLink.soyTemplateName = 'Confluence.Templates.BrowseSpaces.spacesLink';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-ia:space-ia-analytics', location = 'js/space-ia-analytics.js' */
(function(f){function d(){var a=f(".acs-side-bar"),b=a.find("a:not(.external_link a, #acs-configure-link)");c(b,"sidebar");b=a.find("[data-collapsed-tooltip\x3d'"+AJS.I18n.getText("Pages")+"']");c(b,"sidebar-pages");b=a.find("[data-collapsed-tooltip\x3d'"+AJS.I18n.getText("Blog")+"']");c(b,"sidebar-blogs");b=a.find(".quick-links-section li:not(.external_link) a");c(b,"spaceshortcut");b=a.find(".ia-secondary-container a:not(.more-children-link)");"pages"==a.find(".ia-secondary-container").data("tree-type")?
c(b,"contextnavchildmode"):"page-tree"==a.find(".ia-secondary-container").data("tree-type")?c(b,"contextnavpagetreemode"):c(b,"contextnav")}function e(a){return function(){AJS.trigger("analytics",{name:"space-ia-nav",data:{linkType:a}})}}var c=AJS.Confluence.Analytics.setAnalyticsSource;AJS.toInit(function(a){a(".acs-side-bar").find(".ia-secondary-container .more-children-link").click(e("context-nav.more-children"));AJS.bind("sidebar.exit-configure-mode",d);AJS.bind("sidebar.flyout-triggered",function(b,
a){e("flyout-triggered."+a.flyout)()});AJS.bind("pagetree-children-loaded",d);d()})})(AJS.$);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugin.jslibs:skate-0.12.6', location = 'libs/skate/0.12.6/skate-0.12.6.js' */
(function e(g,c,j){function h(a,k){if(!c[a]){if(!g[a]){var d="function"==typeof require&&require;if(!k&&d)return d(a,!0);if(f)return f(a,!0);d=Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d;}d=c[a]={exports:{}};g[a][0].call(d.exports,function(c){var f=g[a][1][c];return h(f?f:c)},d,d.exports,e,g,c,j)}return c[a].exports}for(var f="function"==typeof require&&require,d=0;d<j.length;d++)h(j[d]);return h})({1:[function(b,g,c){Object.defineProperty(c,"__esModule",{value:!0});"use strict";
c.ATTR_IGNORE="data-skate-ignore";c.types={ANY:"act",ATTR:"a",CLASS:"c",NOATTR:"ct",NOCLASS:"at",NOTAG:"ac",TAG:"t"}},{}],2:[function(b,g){g.exports={get:function(c,b){if(c.__SKATE_DATA)return c.__SKATE_DATA[b]},set:function(c,b,h){c.__SKATE_DATA||(c.__SKATE_DATA={});c.__SKATE_DATA[b]=h;return c}}},{}],3:[function(b,g){function c(c){for(var f=c.length,b=0;b<f;b++){var i=c[b],o=i.addedNodes,i=i.removedNodes;o&&(o.length&&!p(o[0].parentNode))&&d(o);i&&i.length&&a(i)}}var j=function(c){return c&&c.__esModule?
c["default"]:c},h=j(b("./globals")),f=b("./lifecycle"),d=f.initElements,a=f.removeElements,k=j(b("./mutation-observer")),p=b("./utils").getClosestIgnoredElement;g.exports={register:function(a){a&&(k.fixIe(),this.unregister());h.observer||(a=new k(c),a.observe(document,{childList:!0,subtree:!0}),h.observer=a);return this},unregister:function(){h.observer&&(h.observer.disconnect(),h.observer=void 0);return this}}},{"./globals":4,"./lifecycle":5,"./mutation-observer":6,"./utils":9}],4:[function(b,g){window.__skate||
(window.__skate={observer:void 0,registry:{}});g.exports=window.__skate},{}],5:[function(b,g,c){function j(o,c,a){if(k.get(o,c.id+":lifecycle:"+a))return!0;k.set(o,c.id+":lifecycle:"+a,!0);return!1}function h(c,a){if(!j(c,a,"created")){m(c,a.prototype,!0);a.template&&a.template(c);var b=function(a,b){return function(f){if(!b)return a(c,f,c);for(var d=f.target;d&&d!==document&&d!==c.parentNode;){if(i.call(d,b))return a(c,f,d);d=d.parentNode}}};"object"===typeof a.events&&l(a.events,function(a,d){var f,
i;i=d.split(" ");f=i.shift();i=i.join(" ");c.addEventListener(f,b(a,i),!!i&&("blur"===f||"focus"===f))});var f=function(i,f,d,b){var k;a.attributes&&a.attributes[f]&&"function"===typeof a.attributes[f][i]?k=a.attributes[f][i]:a.attributes&&"function"===typeof a.attributes[f]?k=a.attributes[f]:"function"===typeof a.attributes&&(k=a.attributes);k&&k(c,{type:i,name:f,newValue:d,oldValue:b})},d,k=c.attributes,h=[],g=k.length;(new p(function(a){a.forEach(function(a){var c,i=a.attributeName,d=k[i];d&&null===
a.oldValue?c="created":d&&null!==a.oldValue?c="updated":d||(c="removed");f(c,i,d?d.value||d.nodeValue:void 0,a.oldValue)})})).observe(c,{attributes:!0,attributeOldValue:!0});for(d=0;d<g;d++)h.push(k[d]);for(d=0;d<g;d++){var n=h[d];f("created",n.nodeName,n.value||n.nodeValue)}a.created&&a.created(c)}}function f(c){for(var i=c.length,d=0;d<i;d++){var b=c[d];if(!(1!==b.nodeType||b.attributes[a])){for(var k=n.getForElement(b),g=k.length,m=0;m<g;m++){var l=b,p=k[m];h(l,p);j(l,p,"attached")||(l.removeAttribute(p.unresolvedAttribute),
l.setAttribute(p.resolvedAttribute,""),p.attached&&p.attached(l))}b=b.childNodes;b.length&&f(b)}}}function d(a){for(var c=a.length,i=0;i<c;i++){var f=a[i];if(1===f.nodeType){d(f.childNodes);for(var b=n.getForElement(f),g=b.length,j=0;j<g;j++){var h=f,m=b[j];m.detached&&m.detached(h);k.set(h,m.id+":lifecycle:attached",!1)}}}}g=function(a){return a&&a.__esModule?a["default"]:a};Object.defineProperty(c,"__esModule",{value:!0});"use strict";var a=b("./constants").ATTR_IGNORE,k=g(b("./data")),p=g(b("./mutation-observer")),
n=g(b("./registry")),b=b("./utils"),m=b.inherit,l=b.objEach,b=window.HTMLElement.prototype,i=b.matches||b.msMatchesSelector||b.webkitMatchesSelector||b.mozMatchesSelector||b.oMatchesSelector;c.triggerCreated=h;c.initElements=f;c.removeElements=d},{"./constants":1,"./data":2,"./mutation-observer":6,"./registry":7,"./utils":9}],6:[function(b,g){function c(a,c){return{addedNodes:null,attributeName:null,attributeNamespace:null,nextSibling:null,oldValue:null,previousSibling:null,removedNodes:null,target:a,
type:c||"childList"}}function j(a,c){var f=a.childNodes;if(f)for(var d=f.length,b=0;b<d;b++){var k=f[b];c(k);j(k,c)}}function h(a){if(n&&!m)return new n(a);this.callback=a;this.elements=[]}var f=b("./utils"),d=f.debounce,a=f.objEach,k=window.HTMLElement.prototype,p=window.HTMLElement.prototype.contains,n=window.MutationObserver||window.WebkitMutationObserver||window.MozMutationObserver,m=!1,l=-1<window.navigator.userAgent.indexOf("Trident");h.fixIe=function(){if(l&&!m){var a=Object.getOwnPropertyDescriptor(k,
"innerHTML");Object.defineProperty(k,"innerHTML",{get:function(){return a.get.call(this)},set:function(c){j(this,function(a){var c=document.createEvent("MutationEvent");c.initMutationEvent("DOMNodeRemoved",!0,!1,null,null,null,null,null);a.dispatchEvent(c)});a.set.call(this,c)}});m=!0}};Object.defineProperty(h,"isFixingIe",{get:function(){return m}});h.prototype={observe:function(a,f){function b(a){h.push(a);n()}var k=this,j,g,h=[],l=[],n=d(function(){for(var b=h.length,d=0;d<b;d++){var n=h[d],r=
n.target;if(r){var n=n.type,q=r.parentNode;if(f.childList&&(f.subtree||q===a)){var s=m&&"DOMNodeRemoved"===n,t=j&&(1!==j.nodeType?!1:j.contains?j.contains(r):p.call(j,r));if(s||!t){if(!g||g.target!==q)l.push(g=c(q));"DOMNodeInserted"===n?(g.addedNodes||(g.addedNodes=[]),g.addedNodes.push(r)):(g.removedNodes||(g.removedNodes=[]),g.removedNodes.push(r));j=r}}}}k.callback(l);h=[];l=[];g=j=void 0}),t={},q=[],u=d(function(){var a=q.length;k.callback(q);q.splice(0,a)}),s={target:a,options:f,insertHandler:b,
removeHandler:b,attributeHandler:function(d){var b=d.target;if(f.attributes&&(f.subtree||b===a)){var k=d.attrName,g=d.prevValue,d=d.newValue,b=c(b,"attributes");b.attributeName=k;f.attributeOldValue&&(b.oldValue=t[k]||g||null);q.push(b);f.attributeOldValue&&(t[k]=d);u()}}};this.elements.push(s);f.childList&&(a.addEventListener("DOMNodeInserted",s.insertHandler),a.addEventListener("DOMNodeRemoved",s.removeHandler));f.attributes&&a.addEventListener("DOMAttrModified",s.attributeHandler);return this},
disconnect:function(){a(this.elements,function(a){a.target.removeEventListener("DOMNodeInserted",a.insertHandler);a.target.removeEventListener("DOMNodeRemoved",a.removeHandler);a.target.removeEventListener("DOMAttrModified",a.attributeHandler)});this.elements=[];return this}};g.exports=h},{"./utils":9}],7:[function(b,g){function c(a,c){return d(j.registry,a)&&-1<j.registry[a].type.indexOf(c)}var j,h=b("./globals");j=h&&h.__esModule?h["default"]:h;var f=b("./constants.js").types,d=b("./utils").hasOwn;
g.exports={clear:function(){j.registry={};return this},getForElement:function(a){var d=a.attributes,b=d.length,g=[],h=d.is,l=h&&(h.value||h.nodeValue),h=a.tagName.toLowerCase(),i=l||h,o;c(i,f.TAG)&&(i=j.registry[i],o=i["extends"],l?h===o&&g.push(i):o||g.push(i));for(l=0;l<b;l++)i=d[l].nodeName,c(i,f.ATTR)&&(i=j.registry[i],o=i["extends"],(!o||h===o)&&g.push(i));(d=a.classList)?a=d:(a=a.attributes,a=a["class"]&&a["class"].nodeValue.split(/\s+/)||[]);d=a.length;for(b=0;b<d;b++)i=a[b],c(i,f.CLASS)&&
(i=j.registry[i],o=i["extends"],(!o||h===o)&&g.push(i));return g},has:function(a){return d(j.registry,a)},set:function(a,c){if(this.has(a))throw Error('A definition of type "'+c.type+'" with the ID of "'+a+'" already exists.');j.registry[a]=c;return this},remove:function(a){this.has(a)&&delete j.registry[a];return this}}},{"./constants.js":1,"./globals":4,"./utils":9}],8:[function(b,g){function c(a,b){b=n(b||{},c.defaults);b.id=a;if(k.has(b.id))throw Error('A definition of type "'+b.type+'" with the ID of "'+
a+'" already exists.');k.set(b.id,b);i();h.register(b.remove);if(-1<b.type.indexOf(m.TAG)){var f=b,g=function(){var a;a=f["extends"];var b=f.id;a?(a=document.createElement(a),a.setAttribute("is",b)):a=document.createElement(b);f.prototype=g.prototype;d(a,f);return a};g.prototype=f.prototype;return g}}var j=function(a){return a&&a.__esModule?a["default"]:a},h=j(b("./document-observer")),f=b("./lifecycle"),d=f.triggerCreated,a=f.initElements,k=j(b("./registry")),p=b("./utils"),f=p.debounce,n=p.inherit,
j=j(b("./version")),m=b("./constants").types,l=!!document.attachEvent,i=f(function(){var b=function(){a(document.getElementsByTagName("html"))},c;c=l?"complete"===document.readyState:"interactive"===document.readyState||"complete"===document.readyState;c?b():l?window.addEventListener("load",b):document.addEventListener("DOMContentLoaded",b)});c.init=function(b){if(b)return"string"===typeof b&&(b=document.querySelectorAll(b)),a("undefined"===typeof b.length?[b]:b),b};c.types=m;c.version=j;c.defaults=
{attributes:void 0,events:void 0,"extends":"",id:"",prototype:{},resolvedAttribute:"resolved",template:void 0,type:m.ANY,unresolvedAttribute:"unresolved"};var o=window.skate;c.noConflict=function(){window.skate=o;return this};window.skate=c;g.exports=c},{"./constants":1,"./document-observer":3,"./lifecycle":5,"./registry":7,"./utils":9,"./version":10}],9:[function(b,g,c){function j(b,c){return Object.prototype.hasOwnProperty.call(b,c)}c.hasOwn=j;c.debounce=function(b){var c=!1;return function(){c||
(c=!0,setTimeout(function(){c=!1;b()},1))}};c.getClosestIgnoredElement=function(b){for(;b&&b!==document&&!(b instanceof DocumentFragment);){if(b.hasAttribute(h))return b;b=b.parentNode}};c.inherit=function(b,c,a){for(var g=Object.getOwnPropertyNames(c),h=g.length,j=0;j<h;j++){var m=g[j];if(a||void 0===b[m]){var l=Object.getOwnPropertyDescriptor(c,m);l.get||l.set||!l.writable||!l.enumerable||!l.configurable?Object.defineProperty(b,m,l):b[m]=c[m]}}return b};c.objEach=function(b,c){for(var a in b)j(b,
a)&&c(b[a],a)};Object.defineProperty(c,"__esModule",{value:!0});"use strict";var h=b("./constants").ATTR_IGNORE},{"./constants":1}],10:[function(b,g){g.exports="0.12.6"},{}]},{},[8]);(function(b){var g=b.skate.noConflict();define("atlassian/libs/skate-0.12.6",[],function(){return g})})(window);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.aui.staging:skate', location = '/includes/js/amd/shim/skate-amd.js' */
define("skate",["atlassian/libs/skate-0.12.6"],function(a){return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.aui.staging:persistable', location = 'js/persistable.js' */
define("confluence/persistable",["skate","confluence/storage-manager"],function(f,g){var d=g("confluence","userSettings");return f("data-persist",{type:f.types.ATTRIBUTE,created:function(b){if(!b.name)throw'Missing attribute "name"';var c=b.getAttribute("data-persist"),a=b.getAttribute("data-persist-scope"),a=a?b.name+"."+a.replace(/\./g,"-"):b.name,a=d.getItem(a),e=b.getAttribute("data-default-value");if(/value|checked/.test(c))a=a||e||null,null!==a&&("checked"===c&&(a="true"===a),b[c]=a);else throw"Persistable only works with 'value' or 'checked' attributes!";
},events:{change:function(b){var c=b.getAttribute("data-persist"),a=b.getAttribute("data-persist-scope"),a=a?b.name+"."+a.replace(/\./g,"-"):b.name,e=b.getAttribute("data-default-value");String(b[c])===e?d.removeItem(a):d.setItem(a,b[c],2592E3)}}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-feature-discovery-plugin:confluence-feature-discovery-plugin-resources', location = '/js/confluence-feature-discovery-plugin.js' */
(function(n){function k(a){void 0===d&&(d=JSON.parse(AJS.Meta.get("discovered-plugin-features")||"{}"));return a?d[a]||[]:d}function l(a,g){a=k(a);for(var f=0,e=a.length;f<e;f++)if(a[f]===g)return!0;return!1}Confluence.FeatureDiscovery={};var d,m=!1,p=WRM.data.claim("com.atlassian.confluence.plugins.confluence-feature-discovery-plugin:confluence-feature-discovery-plugin-resources.test-mode");Confluence.FeatureDiscovery.forPlugin=function(a,g){function f(b){b=parseInt(e.getItem(b),10);return isNaN(b)?
0:b}var e=Confluence.storageManager("feature-discovery."+a);g=g||3;return{addDiscoveryView:function(b){var a=f(b)+1;e.setItem(b,a)},shouldShow:function(b,c){if(c=!0===c&&p){a:{c="com.atlassian.webdriver.discovery\x3d"+a+":"+b;for(var e=document.cookie.split(";"),d=0;d<e.length;d++){for(var h=e[d];" "===h.charAt(0);)h=h.substring(1);if(-1!==h.indexOf(c)){c=!0;break a}}c=!1}c=!c}return c||m||l(a,b)?!1:f(b)>=g?(this.markDiscovered(b),!1):m=!0},markDiscovered:function(b,c){l(a,b)||AJS.safeAjax({url:AJS.contextPath()+
"/rest/feature-discovery/1.0/discovered/"+a+"/"+b,type:"POST",data:{},success:function(){k(a).unshift(b);e.removeItem(b);AJS.trigger("feature-discovered",{pluginKey:a,featureKey:b});c&&n.isFunction(c)&&c()}})},listDiscovered:function(){return k(a).slice(0)}}}})(AJS.$);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-quicknav:quicknav-resources', location = 'js/quick-nav.js' */
define("confluence-quicknav/quick-nav",["jquery","confluence/api/logger"],function(b,l){var f=[],d,g=function(a){return function(e){a.closest("form").find(".quick-nav-drop-down").append(e)}},h=function(a){"undefined"!==typeof a?f.push(a):l.log("WARN: Attempted to add a dropdown post-process function that was undefined.")},m=function(a){b("a",a).each(function(){var a=b(this),c=a.find("span").data("properties");(c=c?c.spaceName:null)&&!a.is(".content-type-spacedesc")&&(a.after(a.clone().attr("class",
"space-name").html(c)),a.parent().addClass("with-space-name"))})};return{addDropDownPostProcess:h,setMakeParams:function(a){d=a},init:function(){var a=b("#quick-search-query"),e=g(a),c=b("#space-blog-quick-search-query"),k=b("#confluence-space-key");a.quicksearch("/rest/quicknav/1/search",null,{dropdownPlacement:e,dropdownPostprocess:function(a){b.each(f,function(c,b){b&&b(a)})},makeParams:function(a){return d?d(a):{query:a}},ajsDropDownOptions:{className:"quick-search-dropdown"}});h(m);c.length&&
k.length&&c.quicksearch("/rest/quicknav/1/search?type\x3dblogpost\x26spaceKey\x3d"+b("\x3ci\x3e\x3c/i\x3e").html(k.attr("content")).text(),null,{dropdownPlacement:g(c)})}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-quicknav/quick-nav","Confluence.QuickNav");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-license-banner:confluence-license-banner-resources', location = '/js/confluence-license-banner.js' */
require(["ajs","jquery"],function(a,c){a.toInit(function(){var e=WRM.data.claim("com.atlassian.confluence.plugins.confluence-license-banner:confluence-license-banner-resources.license-details");if(e){var d={destroyBanner:function(){c("#license-banner").slideUp(function(){c("#license-banner").remove()})},remindMeLater:function(){c.ajax({type:"POST",dataType:"json",contentType:"application/json; charset\x3dutf-8",data:JSON.stringify({atl_token:a.Meta.get("atl-token")}),url:a.contextPath()+"/rest/licensebanner/1.0/reminder/later"});
d.destroyBanner()},remindMeNever:function(){c.ajax({type:"POST",dataType:"json",contentType:"application/json; charset\x3dutf-8",data:JSON.stringify({atl_token:a.Meta.get("atl-token")}),url:a.contextPath()+"/rest/licensebanner/1.0/reminder/never"});d.destroyBanner()},createBanner:function(b){var a;b.showLicenseExpiryBanner?a=Confluence.Templates.LicenseBanner.expiryBanner({days:b.daysBeforeLicenseExpiry,mac:b.renewUrl,sales:b.salesUrl}):b.showMaintenanceExpiryBanner&&(a=Confluence.Templates.LicenseBanner.maintenanceBanner({days:b.daysBeforeMaintenanceExpiry,
mac:b.renewUrl,sales:b.salesUrl}));a&&(b=c(a),c("#full-height-container").prepend(b),c("#license-banner-later").click(function(a){a.preventDefault();d.remindMeLater()}),c("#license-banner-never").click(function(a){a.preventDefault();d.remindMeNever()}),b.find(".icon-close").click(function(a){a.preventDefault();d.remindMeLater()}))}};d.createBanner(e)}else a.warn("Unable to claim my required data")})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-license-banner:confluence-license-banner-resources', location = 'soy/confluence-license-banner.soy' */
// This file was automatically generated from confluence-license-banner.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.LicenseBanner.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.LicenseBanner == 'undefined') { Confluence.Templates.LicenseBanner = {}; }


Confluence.Templates.LicenseBanner.wrapper = function(opt_data, opt_ignored) {
  return '<div>' + soy.$$filterNoAutoescape(opt_data.contentHTML) + '</div>';
};
if (goog.DEBUG) {
  Confluence.Templates.LicenseBanner.wrapper.soyTemplateName = 'Confluence.Templates.LicenseBanner.wrapper';
}


Confluence.Templates.LicenseBanner.expiryBanner = function(opt_data, opt_ignored) {
  var output = '';
  var renewTag__soy8 = '<a id="license-banner-my-link" target="_blank" href="' + soy.$$escapeHtml(opt_data.mac) + '">';
  var end__soy12 = '</a>';
  var mailTag__soy14 = '<a id="license-banner-sales-link" target="_blank" href="' + soy.$$escapeHtml(opt_data.sales) + '">';
  output += Confluence.Templates.LicenseBanner.wrapper({contentHTML: '' + aui.message.warning({content: '<div id="license-banner-content" data-days="' + soy.$$escapeHtml(opt_data.days) + '" data-subscription="true">' + ((opt_data.days < 0) ? soy.$$filterNoAutoescape(AJS.format('Your subscription has expired. This site is now read-only. To keep using Confluence, {0}renew online{1} or {2}contact us{3}.',renewTag__soy8,end__soy12,mailTag__soy14,end__soy12)) : (opt_data.days == 0) ? soy.$$filterNoAutoescape(AJS.format('Your subscription will expire today and your site will become read-only. To keep using Confluence, {0}renew online{1} or {2}contact us{3}.',renewTag__soy8,end__soy12,mailTag__soy14,end__soy12)) : soy.$$filterNoAutoescape(AJS.format('Your subscription will expire in {0,choice,1#{0} day|1\x3c{0} days}. Your site will become read-only after the expiry. To keep using Confluence, {1}renew online{2} or {3}contact us{4}.',opt_data.days,renewTag__soy8,end__soy12,mailTag__soy14,end__soy12))) + '</div>', isCloseable: opt_data.days > 7, id: 'license-banner'})});
  return output;
};
if (goog.DEBUG) {
  Confluence.Templates.LicenseBanner.expiryBanner.soyTemplateName = 'Confluence.Templates.LicenseBanner.expiryBanner';
}


Confluence.Templates.LicenseBanner.maintenanceBanner = function(opt_data, opt_ignored) {
  var output = '';
  var renewTag__soy39 = '<a id="license-banner-my-link" target="_blank" href="' + soy.$$escapeHtml(opt_data.mac) + '">';
  var end__soy43 = '</a>';
  var later__soy45 = '<a href="#" id="license-banner-later">';
  var never__soy47 = '<a href="#" id="license-banner-never">';
  output += Confluence.Templates.LicenseBanner.wrapper({contentHTML: '' + aui.message.warning({content: '<div id="license-banner-content" data-days="' + soy.$$escapeHtml(opt_data.days) + '" data-subscription="false">' + ((opt_data.days < 0) ? soy.$$filterNoAutoescape(AJS.format('You no longer have access Support and Updates. {0}Renew online{1}, {2}remind me later{3} or {4}never remind me again{5}.',renewTag__soy39,end__soy43,later__soy45,end__soy43,never__soy47,end__soy43)) : (opt_data.days == 0) ? soy.$$filterNoAutoescape(AJS.format('You will lose access to Support and Updates today. {0}Renew online{1}, {2}remind me later{3} or {4}never remind me again{5}.',renewTag__soy39,end__soy43,later__soy45,end__soy43,never__soy47,end__soy43)) : soy.$$filterNoAutoescape(AJS.format('You will lose access to Support and Updates in {0,choice,1#{0} day|1\x3c{0} days}. {1}Renew online{2}, {3}remind me later{4} or {5}never remind me again{6}.',opt_data.days,renewTag__soy39,end__soy43,later__soy45,end__soy43,never__soy47,end__soy43))) + '</div>', id: 'license-banner'})});
  return output;
};
if (goog.DEBUG) {
  Confluence.Templates.LicenseBanner.maintenanceBanner.soyTemplateName = 'Confluence.Templates.LicenseBanner.maintenanceBanner';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-browser-metrics:legacy-browser-metrics', location = '/js/legacy/browser-metrics.js' */
(function(){var a=window.BrowserMetrics||{};a.isFunction=function(b){return !!(b&&b.constructor&&b.call&&b.apply)};a.isEnabled=function(){if(a.enabled===undefined){a.enabled=true}return a.enabled};window.BrowserMetrics=a}());(function(){var b=window.BrowserMetrics||{};if(b.isEnabled()){var f=5;var e=12000;var c=function(g){return Math.round(g)};var a=function(g){return Math.round(g*100)/100};var d=function(k){var h=(function(){var n=/^(\w+):\/\/([^\/]*)(.*)$/;return function(p){var o=p.match(n);if(!o){return{path:p}}return{scheme:o[1],host:o[2],path:o[3]}}}());var i=(function(){var n=["secureConnectionStart","requestStart","responseStart","responseEnd","domContentLoadedEventStart","domContentLoadedEventEnd","loadEventEnd"];return function(o){if(k.performance){var s=k.performance.timing;var p=s.navigationStart;if(p){for(var r=0;r<n.length;++r){var q=n[r];var t=s[q];if(t){o(q,t-p)}}}}}}());var g=(function(){var o=[{key:"LOGIN",pattern:/^\/login.*/i},{key:"J-DASH",pattern:/^\/secure\/dashboard\.jspa.*/i},{key:"J-ISSUE",pattern:/^\/browse\/\w+\-\w+.*/i},{key:"J-NAV",pattern:/^\/issues.*/i},{key:"J-RAPID",pattern:/secure\/rapidboard\.jspa/i},{key:"SD-AGENT",pattern:/^(\/\w+)?\/servicedesk\/agent\/.*/i},{key:"SD-CUSTOMER",pattern:/^(\/\w+)?\/servicedesk\/customer\/.*/i},{key:"C-DASH",pattern:/^\/wiki(\/)?(\?.*|#.*)?$/i},{key:"C-DASH",pattern:/^\/wiki\/dashboard\.action.*$/i},{key:"C-SPACE",pattern:/^\/wiki\/display\/\w+(\?.*|#.*)?$/i},{key:"C-PAGE",pattern:/^\/wiki\/display\/\w+\/.*/i},{key:"C-PAGE",pattern:/^\/wiki\/pages\/viewpage\.action.*/i},{key:"C-BLOG",pattern:/^\/wiki\/display\/~\w+\/\d+\/\d+\/\d+\/.*/i},{key:"C-EDITOR",pattern:/^\/wiki\/pages\/editpage\.action.*/i},{key:"C-CREATE",pattern:/^\/wiki\/pages\/createpage\.action.*/i}];return function n(){var r=h(k.location.href).path;for(var p=0;p<o.length;++p){var q=o[p];if(r.match(q.pattern)){return q.key}}return null}}());function j(){var n=g();if(n){i(function(p,r){var o="browser.metrics."+p,q={version:f,page:n,value:r>e?"x":Math.ceil((r)/100),rawValue:c(r)};AJS.Analytics?AJS.Analytics.triggerPrivacyPolicySafeEvent(o,q):AJS.trigger("analyticsEvent",{name:o,data:q})})}}function m(){try{j()}catch(n){if(window.console){window.console.log("Error reporting browser metrics: "+n)}}}function l(){if(k.performance.timing.loadEventEnd){m()}else{setTimeout(l,1000)}}if(k.performance&&k.performance.timing){l()}};if(!window.ATL_PERF){window.ATL_PERF={}}window.ATL_PERF.initPageLoad=d}}());
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-browser-metrics:legacy-browser-metrics', location = '/js/legacy/browser-metrics-events.js' */
(function(){var b=window.BrowserMetrics||{};if(b.isEnabled()){var e=5;var d=12000;var a=function(f){return Math.round(f*100)/100};var c=function(g){var l={};function h(){return g.performance&&g.performance.now?g.performance.now():new Date().getTime()}function n(o){return o===Object(o)}function k(o){if(n(o)){return o.eventName+"."+o.eventType}else{return o}}function m(o){if(n(o)){return o.eventName}else{return o}}function j(o){if(n(o)){return o.eventType}else{return""}}function f(o){var p=k(o);l[p]=h()}function i(r,u){var v=k(r);if(!l[v]){throw ("Error logging browser metrics event end: no start event for key '"+v+"'")}var t=h()-l[v];l[v]=null;var o=m(r),q=j(r);var p="browser.metrics.e."+o+(u?"."+u:""),s={version:e,value:t>d?"x":Math.ceil((t)/100),rawValue:a(t),eventType:q};g.AJS.Analytics?g.AJS.Analytics.triggerPrivacyPolicySafeEvent(p,s):g.AJS.trigger("analyticsEvent",{name:p,data:s})}return{start:f,end:i}};if(!window.ATL_PERF){window.ATL_PERF={}}window.ATL_PERF.initEvents=c}}());
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-browser-metrics:legacy-browser-metrics', location = '/js/legacy/browser-metrics-init.js' */
(function(){var a=window.BrowserMetrics||{};if(a.isEnabled()){if(Math.random()<0.1){window.ATL_PERF&&window.ATL_PERF.initPageLoad&&window.ATL_PERF.initPageLoad(window)}window.ATL_PERF&&window.ATL_PERF.initEvents&&(function(){window.BrowserMetrics=window.ATL_PERF.initEvents(window)}())}}());
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher.soy' */
// This file was automatically generated from appswitcher.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace navlinks.templates.appswitcher.
 */

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.appswitcher == 'undefined') { navlinks.templates.appswitcher = {}; }


navlinks.templates.appswitcher.linkSection = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.list.length > 0) {
    output += '<div class="aui-nav-heading sidebar-section-header">' + soy.$$escapeHtml(opt_data.title) + '</div><ul class="aui-nav nav-links">';
    var linkList8 = opt_data.list;
    var linkListLen8 = linkList8.length;
    for (var linkIndex8 = 0; linkIndex8 < linkListLen8; linkIndex8++) {
      var linkData8 = linkList8[linkIndex8];
      output += navlinks.templates.appswitcher.applicationsItem(linkData8);
    }
    output += '</ul>';
  }
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.linkSection.soyTemplateName = 'navlinks.templates.appswitcher.linkSection';
}


navlinks.templates.appswitcher.applicationsItem = function(opt_data, opt_ignored) {
  return '<li class="nav-link"><a href="' + soy.$$escapeHtml(opt_data.link) + '" ' + ((opt_data.self) ? 'class="checked"' : '') + ' title="' + soy.$$escapeHtml(opt_data.link) + '"><span class="nav-link-label">' + soy.$$escapeHtml(opt_data.label) + '</span></a></li>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.applicationsItem.soyTemplateName = 'navlinks.templates.appswitcher.applicationsItem';
}


navlinks.templates.appswitcher.shortcutsItem = function(opt_data, opt_ignored) {
  return '<li class="nav-link"><a href="' + soy.$$escapeHtml(opt_data.link) + '" ' + ((opt_data.self) ? 'class="checked"' : '') + ' title="' + soy.$$escapeHtml(opt_data.link) + '"><span class="nav-link-label">' + soy.$$escapeHtml(opt_data.label) + '</span>' + ((opt_data.showDescription && opt_data.description) ? '<span class="nav-link-description">' + soy.$$escapeHtml(opt_data.description) + '</span>' : '') + '</a></li>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.shortcutsItem.soyTemplateName = 'navlinks.templates.appswitcher.shortcutsItem';
}


navlinks.templates.appswitcher.error = function(opt_data, opt_ignored) {
  return '<div class="app-switcher-error">' + soy.$$filterNoAutoescape('Something went wrong, please \x3cspan class\x3d\x22app-switcher-retry\x22\x3etry again\x3c/span\x3e.') + '</div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.error.soyTemplateName = 'navlinks.templates.appswitcher.error';
}


navlinks.templates.appswitcher.sidebarContents = function(opt_data, opt_ignored) {
  return '<div class="aui-page-panel-nav"><nav class="aui-navgroup aui-navgroup-vertical"><div class="app-switcher-section app-switcher-applications"><div class="aui-nav-heading">' + soy.$$escapeHtml('Application Links') + '</div><div class="app-switcher-loading">' + soy.$$filterNoAutoescape('Loading...') + '</div></div><div class="app-switcher-section app-switcher-shortcuts"><div class="aui-nav-heading">' + soy.$$escapeHtml('Shortcuts') + '</div><div class="app-switcher-loading">' + soy.$$filterNoAutoescape('Loading...') + '</div></div></nav></div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.sidebarContents.soyTemplateName = 'navlinks.templates.appswitcher.sidebarContents';
}


navlinks.templates.appswitcher.trigger = function(opt_data, opt_ignored) {
  return '<span class="aui-icon aui-icon-small aui-iconfont-appswitcher">' + soy.$$escapeHtml('Linked Applications') + '</span>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.trigger.soyTemplateName = 'navlinks.templates.appswitcher.trigger';
}


navlinks.templates.appswitcher.projectHeaderSection = function(opt_data, opt_ignored) {
  return '<div class="app-switcher-title">' + aui.avatar.avatar({size: 'large', avatarImageUrl: opt_data.avatarUrl, isProject: true, title: opt_data.name}) + '<div class="sidebar-project-name">' + soy.$$escapeHtml(opt_data.name) + '</div></div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.projectHeaderSection.soyTemplateName = 'navlinks.templates.appswitcher.projectHeaderSection';
}


navlinks.templates.appswitcher.cogDropdown = function(opt_data, opt_ignored) {
  var output = '';
  var dropdownList__soy74 = '' + navlinks.templates.appswitcher.dropdownList({list: opt_data.links});
  output += aui.dropdown2.dropdown2({menu: {id: opt_data.id, content: dropdownList__soy74, extraClasses: 'aui-style-default sidebar-customize-section'}, trigger: {showIcon: false, content: '<span class="aui-icon aui-icon-small aui-iconfont-configure"></span>', container: '#app-switcher'}});
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.cogDropdown.soyTemplateName = 'navlinks.templates.appswitcher.cogDropdown';
}


navlinks.templates.appswitcher.dropdownList = function(opt_data, opt_ignored) {
  var output = '<ul class="sidebar-admin-links">';
  var linkList82 = opt_data.list;
  var linkListLen82 = linkList82.length;
  for (var linkIndex82 = 0; linkIndex82 < linkListLen82; linkIndex82++) {
    var linkData82 = linkList82[linkIndex82];
    output += '<li class="nav-link"><a href="' + soy.$$escapeHtml(linkData82.href) + '" title="' + soy.$$escapeHtml(linkData82.title) + '"><span class="nav-link-label">' + soy.$$escapeHtml(linkData82.label) + '</span></a></li>';
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.dropdownList.soyTemplateName = 'navlinks.templates.appswitcher.dropdownList';
}


navlinks.templates.appswitcher.switcher = function(opt_data, opt_ignored) {
  var output = '';
  if (true) {
    if (AJS.DarkFeatures.isEnabled('rotp.sidebar')) {
      var sidebarContents__soy97 = '' + navlinks.templates.appswitcher.sidebarContents(null);
      var triggerContent__soy99 = '' + navlinks.templates.appswitcher.trigger(null);
      output += navlinks.templates.appswitcher.sidebar({sidebar: {id: 'app-switcher', content: sidebarContents__soy97}, trigger: {showIcon: false, content: triggerContent__soy99}});
    } else {
      output += navlinks.templates.appswitcher_old.switcher(null);
    }
  }
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.switcher.soyTemplateName = 'navlinks.templates.appswitcher.switcher';
}


navlinks.templates.appswitcher.sidebar = function(opt_data, opt_ignored) {
  return '<a href="' + soy.$$escapeHtml(opt_data.sidebar.id) + '" class="sidebar-trigger app-switcher-trigger" aria-owns="' + soy.$$escapeHtml(opt_data.sidebar.id) + '" aria-haspopup="true" data-is-user-admin="' + soy.$$escapeHtml(false) + '" data-is-sidebar="true" >' + soy.$$filterNoAutoescape(opt_data.trigger.content) + '</a><div id=' + soy.$$escapeHtml(opt_data.sidebar.id) + ' class="app-switcher-sidebar aui-style-default sidebar-offscreen">' + soy.$$filterNoAutoescape(opt_data.sidebar.content) + '</div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.sidebar.soyTemplateName = 'navlinks.templates.appswitcher.sidebar';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher.js' */
(function(e,a){var d="is-user-admin";var c="#app-switcher";a.SideBar=function(f){var g=this;this.$sidebar=null;f=e.extend({sidebarContents:null},f);this.getLinks=function(){return e.ajax({url:AJS.contextPath()+"/rest/menu/latest/appswitcher",cache:false,dataType:"json"}).done(this.updateAppLinks).fail(this.showAppSwitcherError)};this.populateProjectHeader=function(i,h){g.getSidebar().find(".app-switcher-shortcuts .aui-nav-heading").after(navlinks.templates.appswitcher.projectHeaderSection({avatarUrl:h,name:i}))};this.getProjectData=function(){var h=e(".project-shortcut-dialog-trigger"),i=h.data("key"),j=h.data("entity-type");if(h.size()==0||!i||!j){e(".app-switcher-shortcuts").remove();return}var l,k;k=e.ajax({url:AJS.contextPath()+"/rest/project-shortcuts/1.0/local/"+i,cache:false,data:{entityType:j},dataType:"json"});l=e.ajax({url:AJS.contextPath()+"/rest/project-shortcuts/1.0/remote/"+i,cache:false,data:{entityType:j},dataType:"json"});e.when(k,l).then(function(n,m){g.updateProjectShortcuts(n,m,{key:i,entityType:j,name:h.data("name"),avatarUrl:h.find("img").prop("src")})},g.showProjectShortcutsError)};this.getSidebar=function(){if(!this.$sidebar){this.$sidebar=e(f.sidebarContents)}return this.$sidebar};this.addApplicationsCog=function(){e(".app-switcher-applications .aui-nav-heading").before(navlinks.templates.appswitcher.cogDropdown({id:"sidebar-applications-admin-dropdown",links:[{href:AJS.contextPath()+"/plugins/servlet/customize-application-navigator",label:"Customize navigator",title:"Add new entries, hide existing or restrict who sees what"},{href:AJS.contextPath()+"/plugins/servlet/applinks/listApplicationLinks",label:"Manage application links",title:"Link to more Atlassian applications"}]}))};this.addProjectShortcutsCog=function(h,j){var i=[{href:AJS.contextPath()+"/plugins/servlet/custom-content-links-admin?entityKey="+h,label:"Customize shortcuts",title:""}];if(g.entityMappings[j]){i.push({href:g.generateEntityLinksUrl(h,g.entityMappings[j]),label:"Manage product links",title:""})}g.getSidebar().find(".app-switcher-shortcuts .aui-nav-heading").before(navlinks.templates.appswitcher.cogDropdown({id:"sidebar-project-shortcuts-admin-dropdown",links:i}))};this.updateAppLinks=function(h){e(function(){g.getSidebar().find(".app-switcher-applications").html(navlinks.templates.appswitcher.linkSection({title:"Application Links",list:h}));if(g.getSidebar().data(d)){g.addApplicationsCog()}g.bindAnalyticsHandlers(g.getSidebar(),h)})};this.updateProjectShortcuts=function(k,i,j){var l=k[0].shortcuts,h=i[0].shortcuts;g.getSidebar().find(".app-switcher-shortcuts").html(navlinks.templates.appswitcher.linkSection({title:"Shortcuts",list:l.concat(h)}));if(g.getSidebar().data(d)){g.addProjectShortcutsCog(j.key,j.entityType)}g.populateProjectHeader(j.name,j.avatarUrl);g.bindAnalyticsHandlers(g.getSidebar(),data)};this.entityMappings={"confluence.space":"com.atlassian.applinks.api.application.confluence.ConfluenceSpaceEntityType","jira.project":"com.atlassian.applinks.api.application.jira.JiraProjectEntityType","bamboo.project":"com.atlassian.applinks.api.application.bamboo.BambooProjectEntityType","stash.project":"com.atlassian.applinks.api.application.stash.StashProjectEntityType"};this.generateEntityLinksUrl=function(h,i){if(i===g.entityMappings["confluence.space"]){return AJS.contextPath()+"/spaces/listentitylinks.action?typeId="+i+"&key="+h}else{return AJS.contextPath()+"/plugins/servlet/applinks/listEntityLinks/"+i+"/"+h}};this.showAppSwitcherError=function(){e(function(){var h=g.getSidebar();h.find(".app-switcher-applications .app-switcher-loading").replaceWith(navlinks.templates.appswitcher.error());h.off(".appswitcher").on("click.appswitcher",".app-switcher-retry",e.proxy(g.retryLoading,g))})};this.showProjectShortcutsError=function(){e(function(){var h=g.getSidebar();h.find(".app-switcher-shortcuts .app-switcher-loading").replaceWith(navlinks.templates.appswitcher.error());h.off(".appswitcher").on("click.appswitcher",".app-switcher-retry",e.proxy(g.retryLoading,g))})};this.retryLoading=function(h){this.getSidebar().html(navlinks.templates.appswitcher.sidebarContents());this.getLinks();this.getProjectData();h&&h.stopPropagation()};this.bindAnalyticsHandlers=function(h,i){};this.getLinks();e(this.getProjectData);this.toggleSidebar=function(j){var k=g.getSidebar(),i=e("body"),h=e(window.document);if(!i.hasClass("app-switcher-open")){var m=e("#header");k.css("left",-k.width());k.parent("body").length||k.appendTo("body");b({data:k});k.animate({left:0},300);function l(n){var p=n.target&&e(n.target),o=n.keyCode;if(n.originalEvent===j.originalEvent){return}if(p&&!o&&!(p.closest(k).length||p.closest(m).length)&&j.which==1&&!(n.shiftKey||n.ctrlKey||n.metaKey)){g.toggleSidebar()}else{if(o===27){g.toggleSidebar()}}}h.on("click.appSwitcher",l);h.on("keydown.appSwitcher",l);h.on("scroll.appSwitcher",k,b)}else{h.off(".appSwitcher")}i.toggleClass("app-switcher-open")};e("#header").on("click",".app-switcher-trigger",this.toggleSidebar)};function b(h){var f=e(document).scrollTop(),i=e("#header"),g=(i.height()+i.offset().top)-f;if(g>=0){h.data.css({top:g,position:"fixed"})}else{h.data.css({top:0,left:0,position:"fixed"})}}e(function(){if(e(c).data("is-sidebar")===true){new a.SideBar({sidebarContents:c})}})}(jQuery,window.NL=(window.NL||{})));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher_old.js' */
var APPSWITCHER_TRIGGER_CLICK="appswitcher.trigger.click";var APPSWITCHER_DROPDOWN_SHOW="appswitcher.dropdown.show";var APPSWITCHER_DROPDOWN_DISPLAY_ERROR="appswitcher.dropdown.display.error";var APPSWITCHER_APP_LINK_CLICK="appswitcher.app.link.click";var APPSWITCHER_CONFIGURE_LINK_CLICK="appswitcher.configure.link.click";(function(c,f){var b="isAppSuggestionAvailable";var d="isSiteAdminUser";var e="isUserAdmin";var a="#app-switcher";f.AppSwitcher=function(j){var l=AJS.contextPath()+"/plugins/servlet/customize-application-navigator";var k="unified.usermanagement";var m=this;this.$dropdown=null;j=c.extend({dropdownContents:null},j);this.getLinks=function(){return c.ajax({url:AJS.contextPath()+"/rest/menu/latest/appswitcher",cache:false,dataType:"json"}).done(this.updateDropdown).fail(this.showError)};this.getDropdown=function(){if(!this.$dropdown){this.$dropdown=c(j.dropdownContents);this.envData=this.$dropdown.data("environment")}return this.$dropdown};this.updateDropdown=function(n){c(function(){m.getDropdown().html(navlinks.templates.appswitcher_old.applications({apps:n,showAdminLink:m.envData[e],adminLink:l}));m.bindAnalyticsHandlers();if(m.envData[b]===true){m.handleSuggestionApps(n)}})};this.bindAnalyticsHandlers=function(){c(".app-switcher-trigger").on("click",function(){AJS.trigger("analyticsEvent",{name:APPSWITCHER_TRIGGER_CLICK})});c("#app-switcher").on("aui-dropdown2-show",function(){AJS.trigger("analyticsEvent",{name:APPSWITCHER_DROPDOWN_SHOW})});c("#app-switcher .nav-link").on("click",function(){var p="custom";var q=c(this).find("a");var o=q.attr("href");var n=window.location.hostname;if(o&&o.indexOf("bitbucket.org")>-1){p="bitbucket-cloud"}else{if(o.indexOf(n+"/wiki")>-1){p="confluence"}else{if(o.indexOf(n+"/build")>-1){p="bamboo"}else{if(o.indexOf(n)>-1){p="jira"}}}}AJS.trigger("analyticsEvent",{name:APPSWITCHER_APP_LINK_CLICK,data:{product:p}})});c(".nav-link-edit-wrapper").on("click",function(){AJS.trigger("analyticsEvent",{name:APPSWITCHER_CONFIGURE_LINK_CLICK})})};this.isBillingSystemEnabled=function(){return(this.envData[d]===true)&&AJS.DarkFeatures.isEnabled(k)};this.handleSuggestionApps=function(q){var r=_.map(q,function(s){return s.applicationType.toLowerCase()});var o=c("<div id='app-switcher-suggestion-apps' class='aui-dropdown2-section'/>");o.html(navlinks.templates.appswitcher_old.suggestionApps);var p=o.find(".suggestion-apps");var n=false;_.each(g,function(s){if(!_.contains(r,s.appName)){n=true;p.append(navlinks.templates.appswitcher_old.suggestionApp({suggestionApp:s,isBillingSystemEnabled:m.isBillingSystemEnabled()}))}});if(!n){return}c("#app-switcher").append(o);c(".app-discovery-suggestion-app").click(function(){var t=c(this).find("a");var s;if(m.envData[d]===true){s="appswitcher.discovery.siteadmin.select.inproduct."}else{s="appswitcher.discovery.user.select."}s=s+t.attr("id").toLowerCase();AJS.trigger("analytics",{name:s})});c(".app-discovery-suggestion-app").hover(function(){c(this).find("a").removeClass("active").removeClass("aui-dropdown2-active")});c(".app-discovery-cancel-button").click(function(){AJS.trigger("analytics",{name:"appswitcher.discovery.nothanks.button.click"});i(h,"true");o.remove()})};this.showError=function(){c(function(){AJS.trigger("analyticsEvent",{name:APPSWITCHER_DROPDOWN_DISPLAY_ERROR});m.getDropdown().html(navlinks.templates.appswitcher_old.error()).off(".appswitcher").on("click.appswitcher",".app-switcher-retry",c.proxy(m.retryLoading,m))})};this.retryLoading=function(n){this.getDropdown().html(navlinks.templates.appswitcher_old.loading());this.getLinks();n&&n.stopPropagation()};this.getLinks()};var h="key-no-thanks";var g=[{appName:"jira",appDesc:"Issue & Project Tracking Software",discoveryUrl:"https://www.atlassian.com/software/jira",billingSystemDiscoveryUrl:"/admin/billing/addapplication"},{appName:"confluence",appDesc:"Collaboration and content sharing",discoveryUrl:"https://www.atlassian.com/software/confluence",billingSystemDiscoveryUrl:"/admin/billing/addapplication?product=confluence.ondemand"},{appName:"bamboo",appDesc:"Continuous integration",discoveryUrl:"https://www.atlassian.com/software/bamboo",billingSystemDiscoveryUrl:"/admin/billing/addapplication?product=bamboo.ondemand"}];var i=function(j,k){c.ajax({url:AJS.contextPath()+"/rest/menu/latest/userdata/",type:"PUT",contentType:"application/json",data:JSON.stringify({key:j,value:k})})};c(function(){if(c(a).data("is-switcher")===true){new f.AppSwitcher({dropdownContents:a})}})}(jQuery,window.NL=(window.NL||{})));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher_old.soy' */
// This file was automatically generated from appswitcher_old.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace navlinks.templates.appswitcher_old.
 */

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.appswitcher_old == 'undefined') { navlinks.templates.appswitcher_old = {}; }


navlinks.templates.appswitcher_old.applications = function(opt_data, opt_ignored) {
  return '' + navlinks.templates.appswitcher_old.applicationsSection({list: opt_data.apps, listClass: 'nav-links', showDescription: opt_data.showDescription}) + ((opt_data.custom) ? navlinks.templates.appswitcher_old.applicationsSection({list: opt_data.custom, showDescription: opt_data.showDescription}) : '') + ((opt_data.showAdminLink) ? navlinks.templates.appswitcher_old.adminSection(opt_data) : '');
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.applications.soyTemplateName = 'navlinks.templates.appswitcher_old.applications';
}


navlinks.templates.appswitcher_old.applicationsSection = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.list.length > 0) {
    var param19 = '<ul' + ((opt_data.listClass) ? ' class="' + soy.$$escapeHtml(opt_data.listClass) + '"' : '') + '>';
    var linkList27 = opt_data.list;
    var linkListLen27 = linkList27.length;
    for (var linkIndex27 = 0; linkIndex27 < linkListLen27; linkIndex27++) {
      var linkData27 = linkList27[linkIndex27];
      param19 += navlinks.templates.appswitcher_old.applicationsItem(soy.$$augmentMap(linkData27, {showDescription: opt_data.showDescription}));
    }
    param19 += '</ul>';
    output += aui.dropdown2.section({content: param19});
  }
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.applicationsSection.soyTemplateName = 'navlinks.templates.appswitcher_old.applicationsSection';
}


navlinks.templates.appswitcher_old.applicationsItem = function(opt_data, opt_ignored) {
  return '<li class="nav-link' + ((opt_data.self) ? ' nav-link-local' : '') + '"><a href="' + soy.$$escapeHtml(opt_data.link) + '" class="aui-dropdown2-radio ' + ((opt_data.self) ? 'aui-dropdown2-checked' : '') + '" title="' + soy.$$escapeHtml(opt_data.link) + '"><span class="nav-link-label">' + soy.$$escapeHtml(opt_data.label) + '</span>' + ((opt_data.showDescription && opt_data.description) ? '<span class="nav-link-description">' + soy.$$escapeHtml(opt_data.description) + '</span>' : '') + '</a></li>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.applicationsItem.soyTemplateName = 'navlinks.templates.appswitcher_old.applicationsItem';
}


navlinks.templates.appswitcher_old.adminSection = function(opt_data, opt_ignored) {
  return '' + aui.dropdown2.section({content: '<ul class="nav-links"><li><a class="nav-link-edit-wrapper" href="' + soy.$$escapeHtml(opt_data.adminLink) + '"><span class="nav-link-edit">' + soy.$$filterNoAutoescape('Configure...') + '</span></a></li></ul>'});
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.adminSection.soyTemplateName = 'navlinks.templates.appswitcher_old.adminSection';
}


navlinks.templates.appswitcher_old.error = function(opt_data, opt_ignored) {
  return '<div class="app-switcher-error">' + soy.$$filterNoAutoescape('Something went wrong, please \x3cspan class\x3d\x22app-switcher-retry\x22\x3etry again\x3c/span\x3e.') + '</div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.error.soyTemplateName = 'navlinks.templates.appswitcher_old.error';
}


navlinks.templates.appswitcher_old.loading = function(opt_data, opt_ignored) {
  return '<div class="app-switcher-loading">' + soy.$$filterNoAutoescape('Loading...') + '</div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.loading.soyTemplateName = 'navlinks.templates.appswitcher_old.loading';
}


navlinks.templates.appswitcher_old.trigger = function(opt_data, opt_ignored) {
  return '<span class="aui-icon aui-icon-small aui-iconfont-appswitcher">' + soy.$$escapeHtml('Linked Applications') + '</span>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.trigger.soyTemplateName = 'navlinks.templates.appswitcher_old.trigger';
}


navlinks.templates.appswitcher_old.switcher = function(opt_data, opt_ignored) {
  var output = '';
  if (true) {
    var loadingContent__soy81 = '' + navlinks.templates.appswitcher_old.loading(null);
    var triggerContent__soy83 = '' + navlinks.templates.appswitcher_old.trigger(null);
    output += aui.dropdown2.dropdown2({menu: {id: 'app-switcher', content: loadingContent__soy81, extraClasses: 'aui-style-default', extraAttributes: {'data-environment': {}, 'data-is-switcher': 'true'}}, trigger: {showIcon: false, content: triggerContent__soy83, extraClasses: 'app-switcher-trigger', extraAttributes: {href: '#app-switcher'}}});
  }
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.switcher.soyTemplateName = 'navlinks.templates.appswitcher_old.switcher';
}


navlinks.templates.appswitcher_old.suggestionApp = function(opt_data, opt_ignored) {
  var output = '';
  var href__soy89 = opt_data.isBillingSystemEnabled == true ? opt_data.suggestionApp.billingSystemDiscoveryUrl : opt_data.suggestionApp.discoveryUrl;
  output += '<li class="app-discovery-suggestion-app"><a id="' + soy.$$escapeHtml(opt_data.suggestionApp.appName) + '" href="' + soy.$$escapeHtml(href__soy89) + '" class="app-discovery-link aui-icon-container app-discovery-' + soy.$$escapeHtml(opt_data.suggestionApp.appName) + '-product-icon" title="' + soy.$$escapeHtml(href__soy89) + '" target="_blank"></a><div class="app-discovery-small">' + soy.$$escapeHtml(opt_data.suggestionApp.appDesc) + '</div></li>';
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.suggestionApp.soyTemplateName = 'navlinks.templates.appswitcher_old.suggestionApp';
}


navlinks.templates.appswitcher_old.suggestionApps = function(opt_data, opt_ignored) {
  return '<ul class=\'nav-links suggestion-apps\'><li><span class=\'app-discovery-suggest-title nav-link-label\'><h6>' + soy.$$escapeHtml('Try other Atlassian apps') + '</h6></span></li></ul><div class=\'buttons-container app-discovery-suggest-apps-buttons\'><div class=\'buttons\'><button class=\'aui-button aui-button-link app-discovery-cancel-button\' name=\'cancel\' accesskey=\'c\' href=\'#\'>' + soy.$$escapeHtml('Don\x27t show this again') + '</button></div></div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher_old.suggestionApps.soyTemplateName = 'navlinks.templates.appswitcher_old.suggestionApps';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:common-header-resources', location = '/includes/js/header-user-menu.js' */
define("confluence/header-user-menu",["jquery","confluence/meta","underscore"],function(a,c,b){function d(){var b=c.get("current-user-avatar-uri-reference");a("#user-menu-link").find(".aui-avatar-inner img").attr("src",b)}return function(){b.defer(d)}});require("confluence/module-exporter").safeRequire("confluence/header-user-menu",function(a){require("ajs").toInit(a)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:general-analytics-bindings', location = '/includes/js/analytics-bindings.js' */
define("confluence/analytics-bindings",["jquery","confluence/analytics-support"],function(b,d){return function(){function e(a,c){b(a).on("click",".view-historical-version-trigger",function(){d.publish("confluence.page.view-historical.from-"+(c||"unknown"))})}function f(a,c){b(a).on("click",".restore-historical-version-trigger",function(){d.publish("confluence.page.restore-historical.from-"+(c||"unknown"))})}function g(a,c){b("#header .aui-header-secondary "+a).on("click",function(){var a=b(this).hasClass("aui-dropdown2-active")?
"expanded":"collapsed";d.publish("confluence.header.dropdown."+c,{state:a})})}e("#page-history-warning","navigation");e("#page-history-container","history");e(".diff-menu","diff");f("#page-history-warning","navigation");f("#page-history-container","history");g("#admin-menu-link","administration");g("#user-menu-link","profile")}});require("confluence/module-exporter").safeRequire("confluence/analytics-bindings",function(b){require("ajs").toInit(b)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.quickreload:quick-reload-core', location = 'utils/quick-reload-timer.js' */
define("confluence-quick-reload/utils/quick-reload-timer",["jquery","underscore"],function(c,d){function a(b,a){this.options=c.extend({min:3E4,max:36E5,inactivity:12E4},a);d.bindAll(this,"start","stop","_now","_timeSinceLastSeen","_setActive","_setActivityTrigger","_clamp","_intervalMultiplier");this.callback=b;this._timer=null;this._setActivityTrigger(this._setActive)}a.prototype.start=function(b){this.lastSeenTimestamp=this._now();this.stop();b&&this.callback();var a=function(){this.callback();
c.call(this)},c=function(){this.stop();this._timer=setTimeout(d.bind(a,this),this.options.min*this._intervalMultiplier())};c.call(this)};a.prototype.stop=function(){null!==this._timer&&(clearTimeout(this._timer),this._timer=null)};a.prototype._setActive=function(){if(null!==this._timer){var b=this._timeSinceLastSeen()>this.options.inactivity;this.lastSeenTimestamp=this._now();b&&this.start(!0)}};a.prototype._setActivityTrigger=function(b){document.addEventListener("visibilitychange",function(){document.hidden||
b()},!1);c(window).focus(b);c("body").click(b);c(window).scroll(b)};a.prototype._now=function(){return(new Date).getTime()};a.prototype._timeSinceLastSeen=function(){return this._now()+1-this.lastSeenTimestamp};a.prototype._clamp=function(b,a,c){a=Math.max(Math.min(a,c),b);return isNaN(a)?b:a};a.prototype._intervalMultiplier=function(){var a=(document.hidden?3:1)*Math.ceil(this._timeSinceLastSeen()/this.options.inactivity);return this._clamp(1,this.options.max/this.options.min,a)};return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.quickreload:quick-reload-core', location = 'main/quick-reload-manager.js' */
define("confluence-quick-reload/main/quick-reload-manager","underscore jquery ajs confluence/api/constants confluence-quick-reload/utils/quick-reload-timer confluence/meta confluence/api/logger".split(" "),function(f,e,m,h,k,g,l){function a(){this.enabled=!1;this.handlers=[];this.lastFetchTime=e('meta[name\x3d"confluence-request-time"]').attr("content")||(new Date).getTime();this.timer=null;f.bindAll(this,"addHandler","removeHandler","update","enable","disable","onUpdateSuccess","onUpdateError")}
a.prototype.addHandler=function(b){var a=!1,d;for(d=0;d<this.handlers.length;d++)this.handlers[d]===b&&(a=!0);!0!==a&&this.handlers.push(b)};a.prototype.removeHandler=function(b){var a;if(b)for(a=0;a<this.handlers.length;a++)if(this.handlers[a]===b){this.handlers.splice(a,1);break}};a.prototype.update=function(){var a=void 0!==g.get("page-id")?g.get("page-id"):"0";e("body").hasClass("contenteditor")?this.disable():e.ajax({type:"GET",url:h.CONTEXT_PATH+"/rest/quickreload/latest/"+a+"?since\x3d"+encodeURIComponent(this.lastFetchTime),
dataType:"json"}).done(this.onUpdateSuccess).fail(this.onUpdateError)};a.prototype.enable=function(){this.enabled||(null===this.timer&&(this.timer=new k(this.update)),this.timer.start(),this.enabled=!0)};a.prototype.disable=function(){null!==this.timer&&this.timer.stop();this.enabled=!1};a.prototype.isEnabled=function(){return this.enabled};a.prototype.onUpdateSuccess=function(a,e,d){204!==d.status&&(this.lastFetchTime=a.time,f.map(this.handlers,function(b){var c=a[b.property];Array.isArray(c)||(c=
[c]);c=b.filterNewResults(b.results,c);0<c.length&&(b.results=b.results.concat(c),b.render(c))},this))};a.prototype.onUpdateError=function(a){if(a={404:"not found - the plugin has been probably been removed or disabled from Confluence",500:"generic server error",503:"service unavailable",504:"gateway timeout"}[(a||{}).status])this.disable(),l.error('Quick comment reload plugin has been disabled in this page due to a server error: "'+a+'". Please refresh the page to get it back.')};return new a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.quickreload:quick-reload-read-only-mode-handler', location = 'handlers/quick-reload-read-only-mode.js' */
define("confluence-quick-reload/handlers/quick-reload-read-only-mode",["ajs","jquery","confluence/message-controller","confluence/meta","confluence/api/event"],function(f,k,a,e,g){return{results:[],property:"readOnlyMode",filterNewResults:function(a,c){return 0<c.length&&"string"!==typeof c[0]?c:[]},render:function(b){b=b[0];var c=e.get("access-mode"),d=b.isEnabled?"READ_ONLY":"READ_WRITE",h="READ_ONLY"===e.get("render-mode")?"We\u0027re back! \u003ca onclick=\u0022location.reload()\u0022\u003eRefresh\u003c/a\u003e the page to edit and make changes.":"We\u0027re back! You can now edit and make changes.";
if(!a.hasSuccess(a.Location.BANNER)||b.isEnabled)e.set("access-mode",d),d!==c&&g.trigger("qr:access-mode",{accessMode:d}),this.shouldDisplayError(b)?a.hasErrors(a.Location.BANNER)||this.showError(b.bannerMessage):"READ_ONLY"===c&&"READ_WRITE"===d?this.showSuccess(h):this.clearAll()},clearAll:function(){a.clearErrors(a.Location.ALL);a.clearSuccess(a.Location.ALL)},showError:function(b){a.clearSuccess(a.Location.ALL);a.showError(b,a.Location.BANNER)},showSuccess:function(b){a.clearErrors(a.Location.ALL);
a.showSuccess(b,a.Location.BANNER,{closeable:!0})},shouldDisplayError:function(a){return a.isBannerMessageOn||a.isEnabled}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.quickreload:quick-reload-read-only-mode-bootstrap', location = 'main/quick-reload-read-only-mode-bootstrap.js' */
require(["ajs","confluence/dark-features","confluence-quick-reload/main/quick-reload-manager","confluence-quick-reload/handlers/quick-reload-read-only-mode"],function(b,c,a,d){b.toInit(function(){c.isEnabled("quickreload.disabled")||(a.addHandler(d),a.enable())})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.mywork.mywork-confluence-host-plugin:mw-header-anchor', location = 'templates/anchor.soy' */
// This file was automatically generated from anchor.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace MyWork.Templates.Anchor.
 */

if (typeof MyWork == 'undefined') { var MyWork = {}; }
if (typeof MyWork.Templates == 'undefined') { MyWork.Templates = {}; }
if (typeof MyWork.Templates.Anchor == 'undefined') { MyWork.Templates.Anchor = {}; }


MyWork.Templates.Anchor.tasksFeatureDiscovery = function(opt_data, opt_ignored) {
  return '<p>' + soy.$$escapeHtml('See the tasks assigned to you, or created by you, in the Tasks tab of your profile.') + '</p><ul class="mw-tasks-discovery-controls"><li><a id="mw-tasks-discovery-view" href="' + soy.$$escapeHtml(opt_data.tasksUrl) + '" class="aui-button aui-style"><p>' + soy.$$escapeHtml('View Tasks') + '</p></a></li><li><a id="mw-tasks-discovery-dismiss" href="#">' + soy.$$escapeHtml('Dismiss') + '</a></li></ul>';
};
if (goog.DEBUG) {
  MyWork.Templates.Anchor.tasksFeatureDiscovery.soyTemplateName = 'MyWork.Templates.Anchor.tasksFeatureDiscovery';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.mywork.mywork-confluence-host-plugin:mw-header-anchor', location = 'js/miniview-anchor.js' */
var MW=MW||{$:jQuery};MW.MV={};AJS.toInit(function(){if(AJS.Meta&&!AJS.Meta.get("remote-user")){return}MW.MV.AnchorManager=function(){var l=contextPath,h=l+"/plugins/servlet/notifications-miniview",p=0,e=/[?&]show-miniview/.test(window.location.search);function r(t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var s="[\\?\\#&]"+t+"=([^&#]*)";var v=new RegExp(s);var u=v.exec(window.location.search);if(u!==null){return decodeURIComponent(u[1].replace(/\+/g," "))}}var o=r("show-miniview");if(o){h+="#notification/"+o}function q(){var s="badge-i aui-icon aui-icon-small aui-iconfont-notification";MW.$("#notifications-anchor").html('<div class="'+s+'"></div><span class="badge-w"><span class="badge"></span></span>').attr("title","Open Notifications")}function f(u){var t=false,s;return function(){if(t){return s}t=true;s=u.apply(this,arguments);return s}}var n=f(function(){MW.Dialog.getOptions().closeOthers=false;MW.Dialog.preload=true;MW.Dialog.show();MW.Dialog.hide();MW.Dialog.getOptions().closeOthers=true});function k(s){return s<=9?s:"9+"}function j(s){var t=MW.$("#notifications-anchor"),u=t.find(".badge"),v=t.find(".aui-icon");u.html(k(s));p=s;if(s>0){t.addClass("unread").removeClass("read");if(t.is(":visible")&&!e){n()}}else{t.addClass("read").removeClass("unread")}}function m(){c("notifications",h);d()}function d(){MW.$(document).keydown(function(s){if(AJS.InlineDialog.current&&s.which==27&&!MW.$(s.target).is(":input")){AJS.InlineDialog.current.hide()}})}function i(){MW.$("#header-menu-bar").find(".ajs-drop-down").each(function(){this.hide()})}function c(x,v){var w;var u=function(){w=this};var s=function(){if(this.preload!==true){var y=JSON.stringify({markAllRead:true});MW.$("#"+x+"-miniview-iframe")[0].contentWindow.postMessage(y,"*")}};if(!window.addEventListener){window.attachEvent("onmessage",t)}else{window.addEventListener("message",t,false)}function t(A){function B(C){return C===location.protocol+"//"+location.host}if("escKey"===A.data){w.hide();MW.$("#notifications-anchor").focus();document.activeElement.blur()}else{if("getParentConfig"===A.data&&B(A.origin)){var z=JSON.stringify({parentConfig:{parentUrl:location.href,preload:MW.Dialog.preload,unread:p}}),y=MW.$("#"+x+"-miniview-iframe")[0].contentWindow;y.postMessage(z,"*");if(MW.Dialog.preload){MW.Dialog.preload=false}else{y.focus()}}}}MW.Dialog=AJS.InlineDialog(MW.$("#"+x+"-anchor"),x+"-miniview",function(B,z,C){if(MW.$(B).children().length===0){MW.$(B).append(MW.$('<iframe id="'+x+'-miniview-iframe" src="'+v+'" frameborder="0"></iframe>'))}else{var A=JSON.stringify({unread:p}),y=MW.$("#"+x+"-miniview-iframe")[0].contentWindow;y.postMessage(A,"*");setTimeout(function(){y.focus()},100)}i();C()},{width:500,height:520,hideDelay:null,initCallback:u,hideCallback:s,noBind:true});MW.Tasks=(function(){var A=300;var z=20;var B=16;var G;var D=$("#user-menu-link");var C=$("#user-menu-link-content");var y=C.find("#view-mytasks-link");var E=function(J,H,K){var I=MyWork.Templates.Anchor.tasksFeatureDiscovery({tasksUrl:AJS.contextPath()+"/plugins/inlinetasks/mytasks.action"});J.html(I);J.find("#mw-tasks-discovery-dismiss").click(function(){G.hide()});K()};var F=function(){MW.Dialog.hide();var J=function(){return C.is(":visible")};if(!J()){D.trigger("aui-button-invoke")}var H=function(){G.hide()};C.one("aui-dropdown2-hide",H);G=AJS.InlineDialog(y,"my-tasks-discovery",E,{hideCallback:function(){G.unbind("click focusin mousedown",I);C.unbind("aui-dropdown2-hide",H);if(J()){D.trigger("aui-button-invoke")}MW.$("#inline-dialog-my-tasks-discovery").remove()},gravity:"w",useLiveEvents:true,width:A,noBind:true});C.find(".user-item.active").removeClass("active");y.addClass("active");y.focus();var I=function(K){K.stopPropagation()};G.on("click focusin mousedown",I);G.show()};return{closeAndDiscoverMyTasks:F}})();MW.$("#"+x+"-anchor").click(function(y){y.preventDefault();if(MW.$("#"+x+"-miniview-iframe").is(":visible")){MW.Dialog.hide()}else{MW.Dialog.show()}});if(e){MW.$("#"+x+"-anchor").click()}}function g(){q();m()}return{setupAnchors:g,updateNotificationCount:j}}();MW.MV.AnchorManager.setupAnchors();var b=new MW.AnchorUtil(MW.$,contextPath,MW.MV.AnchorManager.updateNotificationCount);b.setupAnchors();MW.$("#notifications-anchor").click(function(){AJS.trigger("analytics",{name:"mywork.host.button.clicked.notifications",data:{}});MW.MV.AnchorManager.updateNotificationCount(0)});var a=function(){if(document.hidden){b.stopRequests(true)}else{b.startRequests()}};document.addEventListener("visibilitychange",a,false);if(typeof document.hidden==="undefined"){MW.$(window).focus(function(){b.startRequests()})}MW.$("body").click(function(){b.startRequests()})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.mywork.mywork-confluence-host-plugin:mw-header-anchor', location = 'js/util/anchor-util.js' */
MW.AnchorUtil=function(d,k,e){var f=30000,i=f,s,p=k+"/rest/mywork/latest/status/notification/count";var r=new Date().getTime();var b=5*60*1000;var t=1000*60*5;var h=1.25;var c=0;function q(u){window.clearInterval(s);s=undefined;if(u===true){i=f}}function o(){return(new Date().getTime()-r)<t}function m(){if(!o()||!s){l()}r=new Date().getTime()}function l(){if(s){clearTimeout(s)}s=setTimeout(function(){g()},c=n(c))}function a(w,u){var v=w*1000;b=u*1000||b;if(v&&v!=i){i=v;m()}}function n(u){return Math.min(o()?i:u*h,b)}function g(u){MW.$.getJSON(p+((u)?"?pageid="+u:""),function(w){a(w.timeout,w.maxTimeout);var v=w.count;e(v)});l()}function j(){var u=AJS&&AJS.Meta&&AJS.Meta.get&&(AJS.Meta.get("content-type")==="page"||AJS.Meta.get("content-type")==="blogpost");if(u){g(AJS.Meta.get("page-id"))}else{g()}m()}return{setupAnchors:j,startRequests:m,stopRequests:q,updateAnchors:g}};
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-search-ui-plugin:search-ui-client-templates', location = 'soy/search-ui-client-templates.soy' */
// This file was automatically generated from search-ui-client-templates.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.SearchUI.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.SearchUI == 'undefined') { Confluence.Templates.SearchUI = {}; }


Confluence.Templates.SearchUI.helpUrl = function(opt_data, opt_ignored) {
  return '' + soy.$$escapeHtml("https:\/\/docs.atlassian.com\/confluence\/docs-711\/Search");
};
if (goog.DEBUG) {
  Confluence.Templates.SearchUI.helpUrl.soyTemplateName = 'Confluence.Templates.SearchUI.helpUrl';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-search-ui-plugin:confluence-search-ui-plugin-resources', location = '/js/confluence-search-ui-analytics-support.js' */
'use strict';

/**
 * Utility functions for publishing new search ui analytics
 * @module confluence/searchui/analytics-support
 */
define('confluence/search-ui/analytics-support', ['window', 'document', 'confluence/api/event', 'confluence/api/url'], function (window, document, eventApi, url) {
    "use strict";

    var SEARCH_UI_LEAVE_CONTENT_FROM_SEARCH_RESULT = 'confluence-search-ui-leave-content-from-new-search';
    var SEARCH_UI_EDIT_CONTENT_FROM_SEARCH_RESULT = 'confluence-search-ui-edit-content-from-new-search';
    /**
     * trigger analytic
     * @since 6.13.0
     * @public
     * @param name the analytic name
     * @param data the analytic data
     */
    function triggerAnalytic(name, data) {
        data = data || {};
        eventApi.trigger('analytics', { name: name, data: data });
    }

    /**
     * @param urlString
     * @returns {*} return array of searchId
     */
    function extractAnalyticsData(urlString) {
        var params = url.parse(urlString).queryParams;
        return params && params.searchId ? params.searchId : [];
    }

    /**
     * trigger period analytic event when beforeunload event happen
     * @param searchId searchId
     * @param period the period in millisecond
     */
    function triggerPeriodEventViewContentFromSearch(searchId, period) {
        triggerAnalytic(SEARCH_UI_LEAVE_CONTENT_FROM_SEARCH_RESULT, { searchId: searchId, period: period });
    }

    /**
     * trigger period analytic event when enter editor init.rte
     * @param searchId searchId
     * @param period the period in millisecond
     */
    function triggerPeriodEvenEditContentFromSearch(searchId, period) {
        triggerAnalytic(SEARCH_UI_EDIT_CONTENT_FROM_SEARCH_RESULT, { searchId: searchId, period: period });
    }

    /**
     * Remove
     * @param urlString
     * @returns {*}
     */
    function removeSearchIdUrl(urlString) {
        var parsedUrl = url.parse(urlString);
        delete parsedUrl.queryParams.searchId;
        return url.format(parsedUrl);
    }

    /**
     * Clean analytic parameter
     */
    function replaceStateAfterCleaningUpAnalyticsParameters() {
        var cleanUrl = removeSearchIdUrl(document.URL);
        if (document.URL !== cleanUrl) {
            window.history.replaceState(null, '', cleanUrl);
        }
    }

    /**
     * Init analytic for period
     * @since 6.13
     * @public
     */
    function initAnalytic() {
        var analyticsData = extractAnalyticsData(document.URL);
        var searchId = analyticsData[0];
        if (!searchId) {
            return;
        }

        var currentDate = new Date();
        window.addEventListener('beforeunload', function () {
            var currentTriggerTime = new Date();
            var period = currentTriggerTime.getTime() - currentDate.getTime();
            triggerPeriodEventViewContentFromSearch(searchId, period);
        });
        eventApi.bind('init.rte', function () {
            var currentTriggerTime = new Date();
            var period = currentTriggerTime.getTime() - currentDate.getTime();
            triggerPeriodEvenEditContentFromSearch(searchId, period);
        });
        // Check if browser supports HTML5 replaceState()
        if (window.history && window.history.replaceState) {
            replaceStateAfterCleaningUpAnalyticsParameters();
        }
    }

    return {
        init: initAnalytic
    };
});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-search-ui-plugin:confluence-search-ui-plugin-resources', location = '/js/confluence-search-ui-plugin.js' */
require(['ajs', 'wrm', 'document', 'confluence/api/logger', 'confluence/meta', 'confluence/api/constants', 'confluence/search-ui/analytics-support'],
    function (ajs, wrm, document, logger, meta, constants, analyticsSupport) {
        const events = ['click', 'focus'];
        var searchUI;
        var searchInput;
        var spinner;
        var tooltip;
        var isTooltipShown = false;
        var isLoading = false;

        function toggleIcon() {
            searchUI.classList.toggle("hide-icon");
        }

        function startLoading() {
            isLoading = true;
            toggleIcon();
            spinner.style.display = 'block';
        }

        function stopLoading() {
            isLoading = false;
            toggleIcon();
            spinner.style.display = 'none';
        }

        function unregisterHandlers() {
            events.forEach(function (event) {
                searchInput.removeEventListener(event, lazyLoad);
            });
        }

        function showTooltip() {
            if (!isTooltipShown) {
                tooltip.style.display = 'block';
                isTooltipShown = true;
            }
        }

        function hideTooltip() {
            if (isTooltipShown) {
                tooltip.style.display = 'none';
                isTooltipShown = false;
            }
        }

        function handleClickAndFocusEvent(event) {
            showTooltip();
            event.stopPropagation();
        }

        function handleInputEvent(event) {
            if (event.target.value) {
                showTooltip();
            } else {
                hideTooltip();
            }
        }

        function handleKeyDownEvent(event) {
            const ENTER_KEY_CODE = 13;
            if (event.keyCode === ENTER_KEY_CODE) {
                const searchTerm = event.target.value;
                const cql = searchTerm ? '?cql=&queryString=' + encodeURIComponent(searchTerm) : '';
                window.location.href = constants.CONTEXT_PATH + '/dosearchsite.action' + cql;
            }
        }

        function handleDocumentClick(event) {
            if (searchUI.contains(event.target)) {
                showTooltip();
            } else {
                hideTooltip();
            }
        }

        function lazyLoad() {
            if (isLoading) return;

            startLoading();
            wrm
                .require(['wrc!confluence-search-ui-plugin-main'])
                .done(function () {
                    require(['confluence-search-ui-plugin-main'], function (SearchUI) {
                        SearchUI.init();
                        unregisterHandlers();
                        stopLoading();
                    });
                })
                .fail(function () {
                    stopLoading();
                    logger.error('fail to load confluence-search-ui-plugin-main');
                });
        }

        ajs.toInit(function () {
            searchUI = document.getElementById('search-ui');
            // login screen doesn't have navigation search
            if (!searchUI) {
                logger.log('no search-ui element found');
                return;
            }

            analyticsSupport.init();
            searchInput = searchUI.querySelector('#quick-search-query');
            spinner = searchUI.querySelector('aui-spinner');
            tooltip = searchUI.querySelector('[role=alert]');

            if (!meta.get('global-settings-quick-search-enabled')) {
                searchInput.addEventListener('keydown', handleKeyDownEvent);
                searchInput.addEventListener('input', handleInputEvent);

                events.forEach(function (event) {
                    searchInput.addEventListener(event, handleClickAndFocusEvent);
                });

                document.addEventListener('click', handleDocumentClick);
            } else {
                events.forEach(function (event) {
                    searchInput.addEventListener(event, lazyLoad);
                });
            }
        });
    });

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.dialog-wizard:dialog-wizard-resources', location = '/soy/dialog-wizard.soy' */
// This file was automatically generated from dialog-wizard.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.DialogWizard.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.DialogWizard == 'undefined') { Confluence.Templates.DialogWizard = {}; }


Confluence.Templates.DialogWizard.pageContainer = function(opt_data, opt_ignored) {
  return '<div class="dialog-wizard-page-wrapper"><div class="dialog-wizard-page-main"></div><div class="dialog-wizard-page-description">' + ((opt_data.descriptionHeaderLink && opt_data.descriptionHeader) ? '<h3><a href=\'' + soy.$$escapeHtml(opt_data.descriptionHeaderLink) + '\' target=\'_blank\'>' + soy.$$escapeHtml(opt_data.descriptionHeader) + '</a></h3>' : (opt_data.descriptionHeader) ? '<h3>' + soy.$$escapeHtml(opt_data.descriptionHeader) + '</h3>' : '') + '<p>' + soy.$$escapeHtml(opt_data.descriptionContent) + '</p></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.DialogWizard.pageContainer.soyTemplateName = 'Confluence.Templates.DialogWizard.pageContainer';
}


Confluence.Templates.DialogWizard.waitIcon = function(opt_data, opt_ignored) {
  return '<img class="wait-icon" src="' + soy.$$escapeHtml("") + '/images/icons/wait.gif">';
};
if (goog.DEBUG) {
  Confluence.Templates.DialogWizard.waitIcon.soyTemplateName = 'Confluence.Templates.DialogWizard.waitIcon';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.dialog-wizard:dialog-wizard-resources', location = '/js/dialog-wizard.js' */
(function($){var FormStateControl=require("confluence/form-state-control");function findNextPageId(pageId,pages){var thisPageIdIndex=-1;_.each(pages,function(element,index){if(element.id==pageId){thisPageIdIndex=index;return}});return pages[thisPageIdIndex+1].id}Confluence.DialogWizard=function(dialog,finalAction){function newPage(config,pageId,soyRenderContext,wizardData,wizard){var wizardPage=_.find(config.wizard.pages,function(page){return page.id==pageId});wizard.trigger("pre-render."+pageId,{soyRenderContext:soyRenderContext,wizardData:wizardData});try{var soyTemplateFunction=eval(wizardPage.templateKey);var $soyRender=$(soyTemplateFunction(soyRenderContext))}catch(e){throw Error("wizard points to a non-existent Soy template '"+wizardPage.templateKey+"'. Check your web-resources or server logs.")}$soyRender.find("a, area, button, input, object, select, textarea").attr("tabindex","10");var $panelContent;if(wizardPage.descriptionContent){$panelContent=$(Confluence.Templates.DialogWizard.pageContainer({descriptionHeaderLink:wizardPage.descriptionHeaderLink,descriptionHeader:wizardPage.descriptionHeader,descriptionContent:wizardPage.descriptionContent}));$panelContent.addClass("with-description").find(".dialog-wizard-page-main").append($soyRender)}else{$panelContent=$soyRender}var dialogPageId=pageId;if(dialog.id=="create-dialog"){dialogPageId="create-dialog-"+pageId}var page=dialog.addPage(dialogPageId).page[dialog.curpage];page.addHeader(wizardPage.title).addPanel("SinglePanel",$panelContent,"singlePanel");page.element.find("form").submit(function(){return false});if(wizardPage.descriptionContent){page.element.find(".dialog-panel-body").css({padding:0})}Confluence.Binder.autocompleteMultiUser($soyRender);Confluence.Binder.placeholder($soyRender);function nextCallback(ev){$soyRender.find(".placeholded").val("");var pageData={};var formArray=$soyRender.parent().find("form").serializeArray();_.each(formArray,function(item){pageData[item.name]=item.value});var e=$.Event("submit."+pageId);var state={$container:$soyRender,wizardData:wizardData,pageData:pageData};var validationDeferred=$.Deferred();validationDeferred.done(function(){wizardData.pages[pageId]=pageData;var nextPageId;if(state.nextPageId){nextPageId=state.nextPageId}else{nextPageId=!wizardPage.last&&findNextPageId(pageId,config.wizard.pages)}if(!state.nextPageId&&wizardPage.last){doFinalAction(ev,state,wizardData,finalAction,wizard);FormStateControl.disableElement(dialog.popup.element.find(":input,a").filter(":visible"));buttons.prepend(Confluence.Templates.DialogWizard.waitIcon())}else{newPage(config,nextPageId,soyRenderContext,wizardData,wizard)}});validationDeferred.fail(function(){AJS.log("dialog aborted by on-submit callback on page: "+pageId)});state.validationDeferred=validationDeferred;wizard.trigger(e,state);if(state.async){return}if(e.isDefaultPrevented()){validationDeferred.reject();return}validationDeferred.resolve()}var buttons=dialog.addFullButtonPanel(page,nextCallback,null,wizardPage.last);buttons.find(".button-panel-back").click(function(){delete wizardData.pages[pageId]});buttons.find(".aui-button-primary").attr("tabindex","10");$soyRender.find("input, select, textarea").eq(0).focus();wizard.trigger("post-render."+pageId,{$container:$soyRender,wizardData:wizardData})}function doFinalAction(ev,state,wizardData,finalAction,wizard){if(state.finalUrl){if(ev.type==="click"&&ev.which===2){var windowOpened=window.open(state.finalUrl);windowOpened.opener=null}else{window.location=state.finalUrl}}else{_.each(wizardData.pages,function(pageData){_.extend(wizardData,pageData)});delete wizardData.pages;finalAction(ev,wizardData,null,wizard)}return{success:function(callback){callback()}}}return{newPage:newPage,doFinalAction:doFinalAction}}})(AJS.$);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:common-template-resources', location = 'com/atlassian/confluence/plugins/blueprint/common/soy/common-templates.soy' */
// This file was automatically generated from common-templates.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Blueprints.Common.Index.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Common == 'undefined') { Confluence.Blueprints.Common = {}; }
if (typeof Confluence.Blueprints.Common.Index == 'undefined') { Confluence.Blueprints.Common.Index = {}; }


Confluence.Blueprints.Common.Index.detailsSummaryMacro = function(opt_data, opt_ignored) {
  return '<ac:macro ac:name="detailssummary"><ac:parameter ac:name="label">' + soy.$$escapeHtml(opt_data.label) + '</ac:parameter><ac:parameter ac:name="spaces">' + soy.$$escapeHtml(opt_data.spaces) + '</ac:parameter><ac:parameter ac:name="firstcolumn">' + soy.$$escapeHtml(opt_data.firstcolumn) + '</ac:parameter><ac:parameter ac:name="headings">' + soy.$$escapeHtml(opt_data.headings) + '</ac:parameter><ac:parameter ac:name="blankTitle">' + soy.$$escapeHtml(opt_data.blankTitle) + '</ac:parameter><ac:parameter ac:name="blankDescription">' + soy.$$escapeHtml(opt_data.blankDescription) + '</ac:parameter><ac:parameter ac:name="contentBlueprintId">' + soy.$$escapeHtml(opt_data.contentBlueprintId) + '</ac:parameter><ac:parameter ac:name="blueprintModuleCompleteKey">' + soy.$$escapeHtml(opt_data.blueprintModuleCompleteKey) + '</ac:parameter><ac:parameter ac:name="createButtonLabel">' + soy.$$escapeHtml(opt_data.createButtonLabel) + '</ac:parameter></ac:macro>';
};
if (goog.DEBUG) {
  Confluence.Blueprints.Common.Index.detailsSummaryMacro.soyTemplateName = 'Confluence.Blueprints.Common.Index.detailsSummaryMacro';
}


Confluence.Blueprints.Common.Index.createFromTemplateMacro = function(opt_data, opt_ignored) {
  return '<ac:macro ac:name="create-from-template"><ac:parameter ac:name="blueprintModuleCompleteKey">' + soy.$$escapeHtml(opt_data.moduleKey) + '</ac:parameter><ac:parameter ac:name="buttonLabel">' + soy.$$escapeHtml(opt_data.buttonLabel) + '</ac:parameter><ac:parameter ac:name="spaceKey">' + soy.$$escapeHtml(opt_data.spaceKey) + '</ac:parameter><ac:parameter ac:name="templateName">' + soy.$$escapeHtml(opt_data.templateName) + '</ac:parameter></ac:macro>';
};
if (goog.DEBUG) {
  Confluence.Blueprints.Common.Index.createFromTemplateMacro.soyTemplateName = 'Confluence.Blueprints.Common.Index.createFromTemplateMacro';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:meeting-notes-resources', location = 'com/atlassian/confluence/plugins/meetingnotes/soy/how-to.soy' */
// This file was automatically generated from how-to.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Blueprints.Meeting.Notes.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Meeting == 'undefined') { Confluence.Blueprints.Meeting = {}; }
if (typeof Confluence.Blueprints.Meeting.Notes == 'undefined') { Confluence.Blueprints.Meeting.Notes = {}; }


Confluence.Blueprints.Meeting.Notes.howTo = function(opt_data, opt_ignored) {
  return '<h1>' + soy.$$escapeHtml('With meeting notes you can...') + '</h1><ol class="howto-steps"><li class="howto-step"><div><h3>' + soy.$$escapeHtml('Crowd-source your agenda') + '</h3><p>' + soy.$$escapeHtml('Distribute an agenda and keep meetings focused.') + '</p></div></li><li class="howto-step"><div><h3>' + soy.$$escapeHtml('Capture meeting minutes') + '</h3><p>' + soy.$$escapeHtml('Take notes and make them available to everyone.') + '</p></div></li><li class="howto-step"><div><h3>' + soy.$$escapeHtml('Create and assign tasks') + '</h3><p>' + soy.$$escapeHtml('Assign action items for attendees to work on afterward.') + '</p></div></li></ol>';
};
if (goog.DEBUG) {
  Confluence.Blueprints.Meeting.Notes.howTo.soyTemplateName = 'Confluence.Blueprints.Meeting.Notes.howTo';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:meeting-notes-resources', location = 'com/atlassian/confluence/plugins/meetingnotes/soy/user-mention.soy' */
// This file was automatically generated from user-mention.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.Meeting.Notes.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Meeting == 'undefined') { Confluence.Templates.Meeting = {}; }
if (typeof Confluence.Templates.Meeting.Notes == 'undefined') { Confluence.Templates.Meeting.Notes = {}; }


Confluence.Templates.Meeting.Notes.userMention = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '' + ((opt_data.userkey) ? '<li><p><ac:link><ri:user ri:userkey="' + soy.$$escapeHtml(opt_data.userkey) + '" /></ac:link></p></li><li><p><ac:placeholder ac:type="mention">' + soy.$$escapeHtml('@mention a person to add them as an attendee and they will be notified.') + '</ac:placeholder></p></li>' : '<li><p><ac:placeholder ac:type="mention">' + soy.$$escapeHtml('@mention a person to add them as an attendee and they will be notified.') + '</ac:placeholder></p></li>');
};
if (goog.DEBUG) {
  Confluence.Templates.Meeting.Notes.userMention.soyTemplateName = 'Confluence.Templates.Meeting.Notes.userMention';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.troubleshooting.plugin-confluence:atst-common', location = 'js/ajs-amd.js' */
define('troubleshooting/ajs', [], function () {
    'use strict';

    return AJS;
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.troubleshooting.plugin-confluence:atst-healthcheck-sensors', location = 'js/sensors.js' */
require([
    'troubleshooting/sensors/page-protocols',
    'troubleshooting/ajs'
], function(
    protocolSensor,
    AJS
) {
    var sensors = [protocolSensor];

    AJS.toInit(function() {

        function hash(str) {
            var hash = 0;
            for (var i = 0; i < str.length; ++i) {
                hash = 31 * hash + str.charCodeAt(i);
                hash |= 0; // this reduces the number to 32bits and prevents Infinity
            }
            return hash;
        }

        //this handles cases when the user disabled access to local storage
        var localStorageWrapper = {
            getWithDefaultOnError: function(sensorName, defaultValue) {
                try {
                    return window.localStorage.getItem(sensorName) || "0";
                } catch (e) {
                    return defaultValue;
                }
            },
            setItemQuietly: function (key, value) {
                try {
                    window.localStorage.setItem(key, value);
                } catch (ignored) {
                }
            }
        };

        // Iterate through each sensor and ingest any data it has for us...
        // but only if it's actually working properly in this client.
        sensors.forEach(function(sensor) {
            if (!sensor.isWorking()) {
                return
            }

            var sensorData = {};
            var newData = sensor.getData();
            for (var key in newData) {
                if (newData.hasOwnProperty(key)) {
                    sensorData[key] = newData[key];
                }
            }

            var sensorName = 'atst.healthcheck.sensors.' + sensor.getName();
            var currentHash = hash(JSON.stringify(sensorData)).toString(36);
            var previousHash = localStorageWrapper.getWithDefaultOnError(sensorName, currentHash);
            if (previousHash===currentHash && Math.random()>0.01) {
                return;
            }
            // What's one more analytics event to the world? A drop in the data ocean.
            AJS.trigger('analytics', {
                name: sensorName,
                data: sensorData
            });
            localStorageWrapper.setItemQuietly(sensorName, currentHash);
        });

    });
});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.troubleshooting.plugin-confluence:atst-healthcheck-sensors', location = 'js/sensors/page-protocols.js' */
define('troubleshooting/sensors/page-protocols', ['troubleshooting/ajs'], function(AJS) {
    var baseUrl = AJS.contextPath();
    var hasPerfData = window.performance && typeof window.performance.getEntriesByType === 'function';

    // WARNING: This is a rough assumption based on how the WRM works.
    // Consuming this from the WRM would be a better option, but meh.
    // See: https://bitbucket.org/atlassian/atlassian-plugins-webresource/src/master/atlassian-plugins-webresource/src/main/java/com/atlassian/plugin/webresource/WebResourceUrlProviderImpl.java
    // See also: https://stash.atlassian.com/projects/CP/repos/static-assets-url/browse/src/main/resources/ui/health-checks/health-checks.js
    var WRM_STATIC_ASSET_REGEX = new RegExp(baseUrl + '/s/.+?/_/');

    function isStaticResource(resource) {
        return WRM_STATIC_ASSET_REGEX.test(resource.name);
    }

    function getNextHopData(resource) {
        return (resource && resource.nextHopProtocol) || 'unknown';
    }

    function unique(elem, pos, arr) {
        return arr.indexOf(elem) === pos;
    }

    return {
        isWorking: function() {
            return hasPerfData;
        },
        getName: function() {
          return 'page-protocols';
        },
        getData: function() {
            var resources = window.performance.getEntriesByType('resource');
            var navigation = window.performance.getEntriesByType('navigation');
            var resourceProtocols = resources
                .filter(isStaticResource)
                .map(getNextHopData)
                .filter(unique)
                .sort();
            if (!resourceProtocols.length) {
                resourceProtocols.push('unknown');
            }
            return {
                resourceProtocols: resourceProtocols,
                navigationProtocol: getNextHopData(navigation[0]),
                userAgent: navigator.getUserAgent && "use-js-client-hints" || navigator.userAgent
            };
        }
    }
});

}catch(e){WRMCB(e)};