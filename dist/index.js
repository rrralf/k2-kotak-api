!function(){function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var t=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,n=new RegExp("[\\-\\.0-9"+t.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),r=new RegExp("^"+t.source+n.source+"*(?::"+t.source+n.source+"*)?$");function s(){}function a(e,t){return t.lineNumber=e.lineNumber,t.columnNumber=e.columnNumber,t}function o(e,t,n,r,s,a){for(var o,i=++t,c=0;;){var u=e.charAt(i);switch(u){case"=":if(1===c)o=e.slice(t,i),c=3;else{if(2!==c)throw new Error("attribute equal must after attrName");c=3}break;case"'":case'"':if(3===c||1===c){if(1===c&&(a.warning('attribute value must after "="'),o=e.slice(t,i)),t=i+1,!((i=e.indexOf(u,t))>0))throw new Error("attribute value no end '"+u+"' match");l=e.slice(t,i).replace(/&#?\w+;/g,s),n.add(o,l,t-1),c=5}else{if(4!=c)throw new Error('attribute value must after "="');l=e.slice(t,i).replace(/&#?\w+;/g,s),n.add(o,l,t),a.warning('attribute "'+o+'" missed start quot('+u+")!!"),t=i+1,c=5}break;case"/":switch(c){case 0:n.setTagName(e.slice(t,i));case 5:case 6:case 7:c=7,n.closed=!0;case 4:case 1:case 2:break;default:throw new Error("attribute invalid close char('/')")}break;case"":return a.error("unexpected end of input"),0==c&&n.setTagName(e.slice(t,i)),i;case">":switch(c){case 0:n.setTagName(e.slice(t,i));case 5:case 6:case 7:break;case 4:case 1:"/"===(l=e.slice(t,i)).slice(-1)&&(n.closed=!0,l=l.slice(0,-1));case 2:2===c&&(l=o),4==c?(a.warning('attribute "'+l+'" missed quot(")!!'),n.add(o,l.replace(/&#?\w+;/g,s),t)):("http://www.w3.org/1999/xhtml"===r[""]&&l.match(/^(?:disabled|checked|selected)$/i)||a.warning('attribute "'+l+'" missed value!! "'+l+'" instead!!'),n.add(l,l,t));break;case 3:throw new Error("attribute value missed!!")}return i;case"":u=" ";default:if(u<=" ")switch(c){case 0:n.setTagName(e.slice(t,i)),c=6;break;case 1:o=e.slice(t,i),c=2;break;case 4:var l=e.slice(t,i).replace(/&#?\w+;/g,s);a.warning('attribute "'+l+'" missed quot(")!!'),n.add(o,l,t);case 5:c=6}else switch(c){case 2:n.tagName;"http://www.w3.org/1999/xhtml"===r[""]&&o.match(/^(?:disabled|checked|selected)$/i)||a.warning('attribute "'+o+'" missed value!! "'+o+'" instead2!!'),n.add(o,o,t),t=i,c=1;break;case 5:a.warning('attribute space is required"'+o+'"!!');case 6:c=1,t=i;break;case 3:c=4,t=i;break;case 7:throw new Error("elements closed character '/' and '>' must be connected to")}}i++}}function i(e,t,n){for(var r=e.tagName,s=null,a=e.length;a--;){var o=e[a],i=o.qName,c=o.value;if((m=i.indexOf(":"))>0)var u=o.prefix=i.slice(0,m),p=i.slice(m+1),d="xmlns"===u&&p;else p=i,u=null,d="xmlns"===i&&"";o.localName=p,!1!==d&&(null==s&&(s={},l(n,n={})),n[d]=s[d]=c,o.uri="http://www.w3.org/2000/xmlns/",t.startPrefixMapping(d,c))}for(a=e.length;a--;){(u=(o=e[a]).prefix)&&("xml"===u&&(o.uri="http://www.w3.org/XML/1998/namespace"),"xmlns"!==u&&(o.uri=n[u||""]))}var m;(m=r.indexOf(":"))>0?(u=e.prefix=r.slice(0,m),p=e.localName=r.slice(m+1)):(u=null,p=e.localName=r);var h=e.uri=n[u||""];if(t.startElement(h,p,r,e),!e.closed)return e.currentNSMap=n,e.localNSMap=s,!0;if(t.endElement(h,p,r),s)for(u in s)t.endPrefixMapping(u)}function c(e,t,n,r,s){if(/^(?:script|textarea)$/i.test(n)){var a=e.indexOf("</"+n+">",t),o=e.substring(t+1,a);if(/[&<]/.test(o))return/^script$/i.test(n)?(s.characters(o,0,o.length),a):(o=o.replace(/&#?\w+;/g,r),s.characters(o,0,o.length),a)}return t+1}function u(e,t,n,r){var s=r[n];return null==s&&((s=e.lastIndexOf("</"+n+">"))<t&&(s=e.lastIndexOf("</"+n)),r[n]=s),s<t}function l(e,t){for(var n in e)t[n]=e[n]}function p(e,t,n,r){switch(e.charAt(t+2)){case"-":return"-"===e.charAt(t+3)?(s=e.indexOf("--\x3e",t+4))>t?(n.comment(e,t+4,s-t-4),s+3):(r.error("Unclosed comment"),-1):-1;default:if("CDATA["==e.substr(t+3,6)){var s=e.indexOf("]]>",t+9);return n.startCDATA(),n.characters(e,t+9,s-t-9),n.endCDATA(),s+3}var a=function(e,t){var n,r=[],s=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;s.lastIndex=t,s.exec(e);for(;n=s.exec(e);)if(r.push(n),n[1])return r}(e,t),o=a.length;if(o>1&&/!doctype/i.test(a[0][0])){var i=a[1][0],c=o>3&&/^public$/i.test(a[2][0])&&a[3][0],u=o>4&&a[4][0],l=a[o-1];return n.startDTD(i,c&&c.replace(/^(['"])(.*?)\1$/,"$2"),u&&u.replace(/^(['"])(.*?)\1$/,"$2")),n.endDTD(),l.index+l[0].length}}return-1}function d(e,t,n){var r=e.indexOf("?>",t);if(r){var s=e.substring(t,r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);if(s){s[0].length;return n.processingInstruction(s[1],s[2]),r+2}return-1}return-1}function m(e){}function h(e,t){return e.__proto__=t,e}s.prototype={parse:function(e,t,n){var r=this.domBuilder;r.startDocument(),l(t,t={}),function(e,t,n,r,s){function l(e){var t=e.slice(1,-1);return t in n?n[t]:"#"===t.charAt(0)?function(e){if(e>65535){var t=55296+((e-=65536)>>10),n=56320+(1023&e);return String.fromCharCode(t,n)}return String.fromCharCode(e)}(parseInt(t.substr(1).replace("x","0x"))):(s.error("entity not found:"+e),e)}function h(t){if(t>C){var n=e.substring(C,t).replace(/&#?\w+;/g,l);w&&f(C),r.characters(n,0,t-C),C=t}}function f(t,n){for(;t>=N&&(n=y.exec(e));)g=n.index,N=g+n[0].length,w.lineNumber++;w.columnNumber=t-g+1}var g=0,N=0,y=/.*(?:\r\n?|\n)|.*$/g,w=r.locator,v=[{currentNSMap:t}],b={},C=0;for(;;){try{var D=e.indexOf("<",C);if(D<0){if(!e.substr(C).match(/^\s*$/)){var x=r.doc,E=x.createTextNode(e.substr(C));x.appendChild(E),r.currentElement=E}return}switch(D>C&&h(D),e.charAt(D+1)){case"/":var S=e.indexOf(">",D+3),_=e.substring(D+2,S),I=v.pop();S<0?(_=e.substring(D+2).replace(/[\s<].*/,""),s.error("end tag name: "+_+" is not complete:"+I.tagName),S=D+1+_.length):_.match(/\s</)&&(_=_.replace(/[\s<].*/,""),s.error("end tag name: "+_+" maybe not complete"),S=D+1+_.length);var R=I.localNSMap,T=I.tagName==_;if(T||I.tagName&&I.tagName.toLowerCase()==_.toLowerCase()){if(r.endElement(I.uri,I.localName,_),R)for(var A in R)r.endPrefixMapping(A);T||s.fatalError("end tag name: "+_+" is not match the current start tagName:"+I.tagName)}else v.push(I);S++;break;case"?":w&&f(D),S=d(e,D,r);break;case"!":w&&f(D),S=p(e,D,r,s);break;default:w&&f(D);var M=new m,P=v[v.length-1].currentNSMap,k=(S=o(e,D,M,P,l,s),M.length);if(!M.closed&&u(e,S,M.tagName,b)&&(M.closed=!0,n.nbsp||s.warning("unclosed xml attribute")),w&&k){for(var B=a(w,{}),O=0;O<k;O++){var q=M[O];f(q.offset),q.locator=a(w,{})}r.locator=B,i(M,r,P)&&v.push(M),r.locator=w}else i(M,r,P)&&v.push(M);"http://www.w3.org/1999/xhtml"!==M.uri||M.closed?S++:S=c(e,S,M.tagName,l,r)}}catch(e){s.error("element parse error: "+e),S=-1}S>C?C=S:h(Math.max(D,C)+1)}}(e,t,n,r,this.errorHandler),r.endDocument()}},m.prototype={setTagName:function(e){if(!r.test(e))throw new Error("invalid tagName:"+e);this.tagName=e},add:function(e,t,n){if(!r.test(e))throw new Error("invalid attribute:"+e);this[this.length++]={qName:e,value:t,offset:n}},length:0,getLocalName:function(e){return this[e].localName},getLocator:function(e){return this[e].locator},getQName:function(e){return this[e].qName},getURI:function(e){return this[e].uri},getValue:function(e){return this[e].value}},h({},h.prototype)instanceof h||(h=function(e,t){function n(){}for(t in n.prototype=t,n=new n,e)n[t]=e[t];return n});var f={XMLReader:s};function g(e,t){for(var n in e)t[n]=e[n]}function N(e,t){var n=e.prototype;if(Object.create){var r=Object.create(t.prototype);n.__proto__=r}if(!(n instanceof t)){function s(){}s.prototype=t.prototype,g(n,s=new s),e.prototype=n=s}n.constructor!=e&&("function"!=typeof e&&console.error("unknow Class:"+e),n.constructor=e)}var y={},w=y.ELEMENT_NODE=1,v=y.ATTRIBUTE_NODE=2,b=y.TEXT_NODE=3,C=y.CDATA_SECTION_NODE=4,D=y.ENTITY_REFERENCE_NODE=5,x=y.ENTITY_NODE=6,E=y.PROCESSING_INSTRUCTION_NODE=7,S=y.COMMENT_NODE=8,_=y.DOCUMENT_NODE=9,I=y.DOCUMENT_TYPE_NODE=10,R=y.DOCUMENT_FRAGMENT_NODE=11,T=y.NOTATION_NODE=12,A={},M={},P=(A.INDEX_SIZE_ERR=(M[1]="Index size error",1),A.DOMSTRING_SIZE_ERR=(M[2]="DOMString size error",2),A.HIERARCHY_REQUEST_ERR=(M[3]="Hierarchy request error",3)),k=(A.WRONG_DOCUMENT_ERR=(M[4]="Wrong document",4),A.INVALID_CHARACTER_ERR=(M[5]="Invalid character",5),A.NO_DATA_ALLOWED_ERR=(M[6]="No data allowed",6),A.NO_MODIFICATION_ALLOWED_ERR=(M[7]="No modification allowed",7),A.NOT_FOUND_ERR=(M[8]="Not found",8)),B=(A.NOT_SUPPORTED_ERR=(M[9]="Not supported",9),A.INUSE_ATTRIBUTE_ERR=(M[10]="Attribute in use",10));A.INVALID_STATE_ERR=(M[11]="Invalid state",11),A.SYNTAX_ERR=(M[12]="Syntax error",12),A.INVALID_MODIFICATION_ERR=(M[13]="Invalid modification",13),A.NAMESPACE_ERR=(M[14]="Invalid namespace",14),A.INVALID_ACCESS_ERR=(M[15]="Invalid access",15);function O(e,t){if(t instanceof Error)var n=t;else n=this,Error.call(this,M[e]),this.message=M[e],Error.captureStackTrace&&Error.captureStackTrace(this,O);return n.code=e,t&&(this.message=this.message+": "+t),n}function q(){}function $(e,t){this._node=e,this._refresh=t,L(this)}function L(e){var t=e._node._inc||e._node.ownerDocument._inc;if(e._inc!=t){var n=e._refresh(e._node);fe(e,"length",n.length),g(n,e),e._inc=t}}function F(){}function H(e,t){for(var n=e.length;n--;)if(e[n]===t)return n}function U(e,t,n,r){if(r?t[H(t,r)]=n:t[t.length++]=n,e){n.ownerElement=e;var s=e.ownerDocument;s&&(r&&W(s,e,r),function(e,t,n){e&&e._inc++,"http://www.w3.org/2000/xmlns/"==n.namespaceURI&&(t._nsMap[n.prefix?n.localName:""]=n.value)}(s,e,n))}}function G(e,t,n){var r=H(t,n);if(!(r>=0))throw O(k,new Error(e.tagName+"@"+n));for(var s=t.length-1;r<s;)t[r]=t[++r];if(t.length=s,e){var a=e.ownerDocument;a&&(W(a,e,n),n.ownerElement=null)}}function V(e){if(this._features={},e)for(var t in e)this._features=e[t]}function j(){}function X(e){return("<"==e?"&lt;":">"==e&&"&gt;")||"&"==e&&"&amp;"||'"'==e&&"&quot;"||"&#"+e.charCodeAt()+";"}function K(e,t){if(t(e))return!0;if(e=e.firstChild)do{if(K(e,t))return!0}while(e=e.nextSibling)}function z(){}function W(e,t,n,r){e&&e._inc++,"http://www.w3.org/2000/xmlns/"==n.namespaceURI&&delete t._nsMap[n.prefix?n.localName:""]}function Y(e,t,n){if(e&&e._inc){e._inc++;var r=t.childNodes;if(n)r[r.length++]=n;else{for(var s=t.firstChild,a=0;s;)r[a++]=s,s=s.nextSibling;r.length=a}}}function Q(e,t){var n=t.previousSibling,r=t.nextSibling;return n?n.nextSibling=r:e.firstChild=r,r?r.previousSibling=n:e.lastChild=n,Y(e.ownerDocument,e),t}function Z(e,t,n){var r=t.parentNode;if(r&&r.removeChild(t),t.nodeType===R){var s=t.firstChild;if(null==s)return t;var a=t.lastChild}else s=a=t;var o=n?n.previousSibling:e.lastChild;s.previousSibling=o,a.nextSibling=n,o?o.nextSibling=s:e.firstChild=s,null==n?e.lastChild=a:n.previousSibling=a;do{s.parentNode=e}while(s!==a&&(s=s.nextSibling));return Y(e.ownerDocument||e,e),t.nodeType==R&&(t.firstChild=t.lastChild=null),t}function J(){this._nsMap={}}function ee(){}function te(){}function ne(){}function re(){}function se(){}function ae(){}function oe(){}function ie(){}function ce(){}function ue(){}function le(){}function pe(){}function de(e,t){var n=[],r=9==this.nodeType?this.documentElement:this,s=r.prefix,a=r.namespaceURI;if(a&&null==s&&null==(s=r.lookupPrefix(a)))var o=[{namespace:a,prefix:null}];return he(this,n,e,t,o),n.join("")}function me(e,t,n){var r=e.prefix||"",s=e.namespaceURI;if(!r&&!s)return!1;if("xml"===r&&"http://www.w3.org/XML/1998/namespace"===s||"http://www.w3.org/2000/xmlns/"==s)return!1;for(var a=n.length;a--;){var o=n[a];if(o.prefix==r)return o.namespace!=s}return!0}function he(e,t,n,r,s){if(r){if(!(e=r(e)))return;if("string"==typeof e)return void t.push(e)}switch(e.nodeType){case w:s||(s=[]);s.length;var a=e.attributes,o=a.length,i=e.firstChild,c=e.tagName;n="http://www.w3.org/1999/xhtml"===e.namespaceURI||n,t.push("<",c);for(var u=0;u<o;u++){"xmlns"==(l=a.item(u)).prefix?s.push({prefix:l.localName,namespace:l.value}):"xmlns"==l.nodeName&&s.push({prefix:"",namespace:l.value})}for(u=0;u<o;u++){var l;if(me(l=a.item(u),0,s)){var p=l.prefix||"",d=l.namespaceURI,m=p?" xmlns:"+p:" xmlns";t.push(m,'="',d,'"'),s.push({prefix:p,namespace:d})}he(l,t,n,r,s)}if(me(e,0,s)){p=e.prefix||"",d=e.namespaceURI,m=p?" xmlns:"+p:" xmlns";t.push(m,'="',d,'"'),s.push({prefix:p,namespace:d})}if(i||n&&!/^(?:meta|link|img|br|hr|input)$/i.test(c)){if(t.push(">"),n&&/^script$/i.test(c))for(;i;)i.data?t.push(i.data):he(i,t,n,r,s),i=i.nextSibling;else for(;i;)he(i,t,n,r,s),i=i.nextSibling;t.push("</",c,">")}else t.push("/>");return;case _:case R:for(i=e.firstChild;i;)he(i,t,n,r,s),i=i.nextSibling;return;case v:return t.push(" ",e.name,'="',e.value.replace(/[<&"]/g,X),'"');case b:return t.push(e.data.replace(/[<&]/g,X));case C:return t.push("<![CDATA[",e.data,"]]>");case S:return t.push("\x3c!--",e.data,"--\x3e");case I:var h=e.publicId,f=e.systemId;if(t.push("<!DOCTYPE ",e.name),h)t.push(' PUBLIC "',h),f&&"."!=f&&t.push('" "',f),t.push('">');else if(f&&"."!=f)t.push(' SYSTEM "',f,'">');else{var g=e.internalSubset;g&&t.push(" [",g,"]"),t.push(">")}return;case E:return t.push("<?",e.target," ",e.data,"?>");case D:return t.push("&",e.nodeName,";");default:t.push("??",e.nodeName)}}function fe(e,t,n){e[t]=n}O.prototype=Error.prototype,g(A,O),q.prototype={length:0,item:function(e){return this[e]||null},toString:function(e,t){for(var n=[],r=0;r<this.length;r++)he(this[r],n,e,t);return n.join("")}},$.prototype.item=function(e){return L(this),this[e]},N($,q),F.prototype={length:0,item:q.prototype.item,getNamedItem:function(e){for(var t=this.length;t--;){var n=this[t];if(n.nodeName==e)return n}},setNamedItem:function(e){var t=e.ownerElement;if(t&&t!=this._ownerElement)throw new O(B);var n=this.getNamedItem(e.nodeName);return U(this._ownerElement,this,e,n),n},setNamedItemNS:function(e){var t,n=e.ownerElement;if(n&&n!=this._ownerElement)throw new O(B);return t=this.getNamedItemNS(e.namespaceURI,e.localName),U(this._ownerElement,this,e,t),t},removeNamedItem:function(e){var t=this.getNamedItem(e);return G(this._ownerElement,this,t),t},removeNamedItemNS:function(e,t){var n=this.getNamedItemNS(e,t);return G(this._ownerElement,this,n),n},getNamedItemNS:function(e,t){for(var n=this.length;n--;){var r=this[n];if(r.localName==t&&r.namespaceURI==e)return r}return null}},V.prototype={hasFeature:function(e,t){var n=this._features[e.toLowerCase()];return!(!n||t&&!(t in n))},createDocument:function(e,t,n){var r=new z;if(r.implementation=this,r.childNodes=new q,r.doctype=n,n&&r.appendChild(n),t){var s=r.createElementNS(e,t);r.appendChild(s)}return r},createDocumentType:function(e,t,n){var r=new ae;return r.name=e,r.nodeName=e,r.publicId=t,r.systemId=n,r}},j.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(e,t){return Z(this,e,t)},replaceChild:function(e,t){this.insertBefore(e,t),t&&this.removeChild(t)},removeChild:function(e){return Q(this,e)},appendChild:function(e){return this.insertBefore(e,null)},hasChildNodes:function(){return null!=this.firstChild},cloneNode:function(e){return function e(t,n,r){var s=new n.constructor;for(var a in n){var o=n[a];"object"!=typeof o&&o!=s[a]&&(s[a]=o)}n.childNodes&&(s.childNodes=new q);switch(s.ownerDocument=t,s.nodeType){case w:var i=n.attributes,c=s.attributes=new F,u=i.length;c._ownerElement=s;for(var l=0;l<u;l++)s.setAttributeNode(e(t,i.item(l),!0));break;case v:r=!0}if(r)for(var p=n.firstChild;p;)s.appendChild(e(t,p,r)),p=p.nextSibling;return s}(this.ownerDocument||this,this,e)},normalize:function(){for(var e=this.firstChild;e;){var t=e.nextSibling;t&&t.nodeType==b&&e.nodeType==b?(this.removeChild(t),e.appendData(t.data)):(e.normalize(),e=t)}},isSupported:function(e,t){return this.ownerDocument.implementation.hasFeature(e,t)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(e){for(var t=this;t;){var n=t._nsMap;if(n)for(var r in n)if(n[r]==e)return r;t=t.nodeType==v?t.ownerDocument:t.parentNode}return null},lookupNamespaceURI:function(e){for(var t=this;t;){var n=t._nsMap;if(n&&e in n)return n[e];t=t.nodeType==v?t.ownerDocument:t.parentNode}return null},isDefaultNamespace:function(e){return null==this.lookupPrefix(e)}},g(y,j),g(y,j.prototype),z.prototype={nodeName:"#document",nodeType:_,doctype:null,documentElement:null,_inc:1,insertBefore:function(e,t){if(e.nodeType==R){for(var n=e.firstChild;n;){var r=n.nextSibling;this.insertBefore(n,t),n=r}return e}return null==this.documentElement&&e.nodeType==w&&(this.documentElement=e),Z(this,e,t),e.ownerDocument=this,e},removeChild:function(e){return this.documentElement==e&&(this.documentElement=null),Q(this,e)},importNode:function(e,t){return function e(t,n,r){var s;switch(n.nodeType){case w:(s=n.cloneNode(!1)).ownerDocument=t;case R:break;case v:r=!0}s||(s=n.cloneNode(!1));if(s.ownerDocument=t,s.parentNode=null,r)for(var a=n.firstChild;a;)s.appendChild(e(t,a,r)),a=a.nextSibling;return s}(this,e,t)},getElementById:function(e){var t=null;return K(this.documentElement,(function(n){if(n.nodeType==w&&n.getAttribute("id")==e)return t=n,!0})),t},createElement:function(e){var t=new J;return t.ownerDocument=this,t.nodeName=e,t.tagName=e,t.childNodes=new q,(t.attributes=new F)._ownerElement=t,t},createDocumentFragment:function(){var e=new ue;return e.ownerDocument=this,e.childNodes=new q,e},createTextNode:function(e){var t=new ne;return t.ownerDocument=this,t.appendData(e),t},createComment:function(e){var t=new re;return t.ownerDocument=this,t.appendData(e),t},createCDATASection:function(e){var t=new se;return t.ownerDocument=this,t.appendData(e),t},createProcessingInstruction:function(e,t){var n=new le;return n.ownerDocument=this,n.tagName=n.target=e,n.nodeValue=n.data=t,n},createAttribute:function(e){var t=new ee;return t.ownerDocument=this,t.name=e,t.nodeName=e,t.localName=e,t.specified=!0,t},createEntityReference:function(e){var t=new ce;return t.ownerDocument=this,t.nodeName=e,t},createElementNS:function(e,t){var n=new J,r=t.split(":"),s=n.attributes=new F;return n.childNodes=new q,n.ownerDocument=this,n.nodeName=t,n.tagName=t,n.namespaceURI=e,2==r.length?(n.prefix=r[0],n.localName=r[1]):n.localName=t,s._ownerElement=n,n},createAttributeNS:function(e,t){var n=new ee,r=t.split(":");return n.ownerDocument=this,n.nodeName=t,n.name=t,n.namespaceURI=e,n.specified=!0,2==r.length?(n.prefix=r[0],n.localName=r[1]):n.localName=t,n}},N(z,j),J.prototype={nodeType:w,hasAttribute:function(e){return null!=this.getAttributeNode(e)},getAttribute:function(e){var t=this.getAttributeNode(e);return t&&t.value||""},getAttributeNode:function(e){return this.attributes.getNamedItem(e)},setAttribute:function(e,t){var n=this.ownerDocument.createAttribute(e);n.value=n.nodeValue=""+t,this.setAttributeNode(n)},removeAttribute:function(e){var t=this.getAttributeNode(e);t&&this.removeAttributeNode(t)},appendChild:function(e){return e.nodeType===R?this.insertBefore(e,null):function(e,t){var n=t.parentNode;if(n){var r=e.lastChild;n.removeChild(t);r=e.lastChild}return r=e.lastChild,t.parentNode=e,t.previousSibling=r,t.nextSibling=null,r?r.nextSibling=t:e.firstChild=t,e.lastChild=t,Y(e.ownerDocument,e,t),t}(this,e)},setAttributeNode:function(e){return this.attributes.setNamedItem(e)},setAttributeNodeNS:function(e){return this.attributes.setNamedItemNS(e)},removeAttributeNode:function(e){return this.attributes.removeNamedItem(e.nodeName)},removeAttributeNS:function(e,t){var n=this.getAttributeNodeNS(e,t);n&&this.removeAttributeNode(n)},hasAttributeNS:function(e,t){return null!=this.getAttributeNodeNS(e,t)},getAttributeNS:function(e,t){var n=this.getAttributeNodeNS(e,t);return n&&n.value||""},setAttributeNS:function(e,t,n){var r=this.ownerDocument.createAttributeNS(e,t);r.value=r.nodeValue=""+n,this.setAttributeNode(r)},getAttributeNodeNS:function(e,t){return this.attributes.getNamedItemNS(e,t)},getElementsByTagName:function(e){return new $(this,(function(t){var n=[];return K(t,(function(r){r===t||r.nodeType!=w||"*"!==e&&r.tagName!=e||n.push(r)})),n}))},getElementsByTagNameNS:function(e,t){return new $(this,(function(n){var r=[];return K(n,(function(s){s===n||s.nodeType!==w||"*"!==e&&s.namespaceURI!==e||"*"!==t&&s.localName!=t||r.push(s)})),r}))}},z.prototype.getElementsByTagName=J.prototype.getElementsByTagName,z.prototype.getElementsByTagNameNS=J.prototype.getElementsByTagNameNS,N(J,j),ee.prototype.nodeType=v,N(ee,j),te.prototype={data:"",substringData:function(e,t){return this.data.substring(e,e+t)},appendData:function(e){e=this.data+e,this.nodeValue=this.data=e,this.length=e.length},insertData:function(e,t){this.replaceData(e,0,t)},appendChild:function(e){throw new Error(M[P])},deleteData:function(e,t){this.replaceData(e,t,"")},replaceData:function(e,t,n){n=this.data.substring(0,e)+n+this.data.substring(e+t),this.nodeValue=this.data=n,this.length=n.length}},N(te,j),ne.prototype={nodeName:"#text",nodeType:b,splitText:function(e){var t=this.data,n=t.substring(e);t=t.substring(0,e),this.data=this.nodeValue=t,this.length=t.length;var r=this.ownerDocument.createTextNode(n);return this.parentNode&&this.parentNode.insertBefore(r,this.nextSibling),r}},N(ne,te),re.prototype={nodeName:"#comment",nodeType:S},N(re,te),se.prototype={nodeName:"#cdata-section",nodeType:C},N(se,te),ae.prototype.nodeType=I,N(ae,j),oe.prototype.nodeType=T,N(oe,j),ie.prototype.nodeType=x,N(ie,j),ce.prototype.nodeType=D,N(ce,j),ue.prototype.nodeName="#document-fragment",ue.prototype.nodeType=R,N(ue,j),le.prototype.nodeType=E,N(le,j),pe.prototype.serializeToString=function(e,t,n){return de.call(e,t,n)},j.prototype.toString=de;try{if(Object.defineProperty){Object.defineProperty($.prototype,"length",{get:function(){return L(this),this.$$length}}),Object.defineProperty(j.prototype,"textContent",{get:function(){return function e(t){switch(t.nodeType){case w:case R:var n=[];for(t=t.firstChild;t;)7!==t.nodeType&&8!==t.nodeType&&n.push(e(t)),t=t.nextSibling;return n.join("");default:return t.nodeValue}}(this)},set:function(e){switch(this.nodeType){case w:case R:for(;this.firstChild;)this.removeChild(this.firstChild);(e||String(e))&&this.appendChild(this.ownerDocument.createTextNode(e));break;default:this.data=e,this.value=e,this.nodeValue=e}}}),fe=function(e,t,n){e["$$"+t]=n}}}catch(e){}var ge,Ne={DOMImplementation:V,XMLSerializer:pe},ye=(function(e,t){function n(e){this.options=e||{locator:{}}}function r(){this.cdata=!1}function s(e,t){t.lineNumber=e.lineNumber,t.columnNumber=e.columnNumber}function a(e){if(e)return"\n@"+(e.systemId||"")+"#[line:"+e.lineNumber+",col:"+e.columnNumber+"]"}function o(e,t,n){return"string"==typeof e?e.substr(t,n):e.length>=t+n||t?new java.lang.String(e,t,n)+"":e}function i(e,t){e.currentElement?e.currentElement.appendChild(t):e.doc.appendChild(t)}n.prototype.parseFromString=function(e,t){var n=this.options,s=new c,o=n.domBuilder||new r,i=n.errorHandler,u=n.locator,l=n.xmlns||{},p={lt:"<",gt:">",amp:"&",quot:'"',apos:"'"};return u&&o.setDocumentLocator(u),s.errorHandler=function(e,t,n){if(!e){if(t instanceof r)return t;e=t}var s={},o=e instanceof Function;function i(t){var r=e[t];!r&&o&&(r=2==e.length?function(n){e(t,n)}:e),s[t]=r&&function(e){r("[xmldom "+t+"]\t"+e+a(n))}||function(){}}return n=n||{},i("warning"),i("error"),i("fatalError"),s}(i,o,u),s.domBuilder=n.domBuilder||o,/\/x?html?$/.test(t)&&(p.nbsp=" ",p.copy="©",l[""]="http://www.w3.org/1999/xhtml"),l.xml=l.xml||"http://www.w3.org/XML/1998/namespace",e?s.parse(e,l,p):s.errorHandler.error("invalid doc source"),o.doc},r.prototype={startDocument:function(){this.doc=(new u).createDocument(null,null,null),this.locator&&(this.doc.documentURI=this.locator.systemId)},startElement:function(e,t,n,r){var a=this.doc,o=a.createElementNS(e,n||t),c=r.length;i(this,o),this.currentElement=o,this.locator&&s(this.locator,o);for(var u=0;u<c;u++){e=r.getURI(u);var l=r.getValue(u),p=(n=r.getQName(u),a.createAttributeNS(e,n));this.locator&&s(r.getLocator(u),p),p.value=p.nodeValue=l,o.setAttributeNode(p)}},endElement:function(e,t,n){var r=this.currentElement;r.tagName,this.currentElement=r.parentNode},startPrefixMapping:function(e,t){},endPrefixMapping:function(e){},processingInstruction:function(e,t){var n=this.doc.createProcessingInstruction(e,t);this.locator&&s(this.locator,n),i(this,n)},ignorableWhitespace:function(e,t,n){},characters:function(e,t,n){if(e=o.apply(this,arguments)){if(this.cdata)var r=this.doc.createCDATASection(e);else r=this.doc.createTextNode(e);this.currentElement?this.currentElement.appendChild(r):/^\s*$/.test(e)&&this.doc.appendChild(r),this.locator&&s(this.locator,r)}},skippedEntity:function(e){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(e){(this.locator=e)&&(e.lineNumber=0)},comment:function(e,t,n){e=o.apply(this,arguments);var r=this.doc.createComment(e);this.locator&&s(this.locator,r),i(this,r)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(e,t,n){var r=this.doc.implementation;if(r&&r.createDocumentType){var a=r.createDocumentType(e,t,n);this.locator&&s(this.locator,a),i(this,a)}},warning:function(e){console.warn("[xmldom warning]\t"+e,a(this.locator))},error:function(e){console.error("[xmldom error]\t"+e,a(this.locator))},fatalError:function(e){throw console.error("[xmldom fatalError]\t"+e,a(this.locator)),e}},"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,(function(e){r.prototype[e]=function(){return null}}));var c=f.XMLReader,u=t.DOMImplementation=Ne.DOMImplementation;t.XMLSerializer=Ne.XMLSerializer,t.DOMParser=n}(ge={exports:{}},ge.exports),ge.exports),we=(ye.DOMImplementation,ye.XMLSerializer,ye.DOMParser);let ve,be;function Ce(e){return{messageId:e.messageId,statusCode:e.statusCode,statusDescription:e.statusDescription,errorCode:e.errorCode,errorDescription:e.errorDescription,debugRequest:e.debugRequest,debugResponse:e.debugResponse}}!function(t){class n{constructor(){e(this,"messageId",void 0),e(this,"statusCode",void 0),e(this,"statusDescription",void 0),e(this,"errorCode",void 0),e(this,"errorDescription",void 0),e(this,"debugRequest",void 0),e(this,"debugResponse",void 0),this.errorCode="",this.statusCode=""}}t.KotakResponse=n;t.KotakHTTPAPI=class{constructor(t){e(this,"_paymentActionHeader",void 0),e(this,"_reversalActionHeader",void 0),e(this,"_endpoint",void 0),this._paymentActionHeader="/BusinessServices/StarterProcesses/CMS_Generic_Service.serviceagent/Payment",this._reversalActionHeader="/BusinessServices/StarterProcesses/CMS_Generic_Service.serviceagent/Reversal",this._endpoint=t}registerPayment(e){var t=e.RequestHeader,r=e.InstrumentList.instrument,s=`<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope\n    xmlns:soap="http://www.w3.org/2003/05/soap-envelope"\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n    xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"\n    xmlns:ns1="http://www.kotak.com/schemas/CMS_Generic/Payment_Response.xsd"\n    xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"\n    xmlns:ns3="http://www.kotak.com/schemas/CMS_Generic/Reversal_Response.xsd"\n    xmlns:tns="http://xmlns.kotak.com/CMS_Generic_Service">\n    <soap:Body>\n        <ns0:Payment\n            xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"\n            xmlns="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd">\n            <ns0:RequestHeader>\n                <ns0:MessageId>${t.MessageId}</ns0:MessageId>\n                <ns0:MsgSource>${t.MsgSource}</ns0:MsgSource>\n                <ns0:ClientCode>${t.ClientCode}</ns0:ClientCode>\n                <ns0:BatchRefNmbr>${t.BatchRefNmbr}</ns0:BatchRefNmbr>\n            </ns0:RequestHeader>\n            <ns0:InstrumentList>\n                <ns0:instrument>\n                    <ns0:InstRefNo>${r.InstRefNo}</ns0:InstRefNo>\n                    <ns0:MyProdCode>${r.MyProdCode}</ns0:MyProdCode>\n                    <ns0:PayMode>${r.PayMode}</ns0:PayMode>\n                    <ns0:TxnAmnt>${r.TxnAmnt}</ns0:TxnAmnt>\n                    <ns0:AccountNo>${r.AccountNo}</ns0:AccountNo>\n                    <ns0:DrDesc>${r.DrDesc}</ns0:DrDesc>\n                    <ns0:PaymentDt>${r.PaymentDt}</ns0:PaymentDt>\n                    <ns0:RecBrCd>${r.RecBrCd}</ns0:RecBrCd>\n                    <ns0:BeneAcctNo>${r.BeneAcctNo}</ns0:BeneAcctNo>\n                    <ns0:BeneName>${r.BeneName}</ns0:BeneName>\n                    <ns0:InstDt>${r.InstDt}</ns0:InstDt>\n                    <ns0:PaymentDtl1>${r.PaymentDtl1}</ns0:PaymentDtl1>\n                    <ns0:EnrichmentSet>\n                        <ns0:Enrichment>${r.EnrichmentSet.Enrichment}</ns0:Enrichment>\n                    </ns0:EnrichmentSet>\n                </ns0:instrument>\n            </ns0:InstrumentList>\n        </ns0:Payment>\n    </soap:Body>\n</soap:Envelope>`,a=this._endpoint,o=this._paymentActionHeader;return new Promise((e,r)=>{var i=new n;i.messageId=t.MessageId,i.debugRequest=s;var c=new XMLHttpRequest;c.onreadystatechange=function(){try{if(4!==c.readyState)return;if(200!==c.status)throw new Error("Failed with status "+c.status+"; "+c.responseText);i.debugResponse=c.responseText;var t=(new we).parseFromString(c.responseText).documentElement.getElementsByTagName("ns0:AckHeader")[0],n=t.getElementsByTagName("ns0:MessageId")[0].textContent,s=t.getElementsByTagName("ns0:StatusCd")[0].textContent,a=t.getElementsByTagName("ns0:StatusRem")[0].textContent;i.errorCode="0",i.messageId=n,i.statusCode=s,i.statusDescription=a,e(i)}catch(e){i.errorCode="-1",i.errorDescription=e.message,r(i)}},c.open("POST",a),c.setRequestHeader("Content-Type","application/soap+xml"),c.setRequestHeader("action",o),c.send(s)})}getPaymentState(e){var t=`<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope\n    xmlns:soap="http://www.w3.org/2003/05/soap-envelope"\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n    xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"\n    xmlns:ns1="http://www.kotak.com/schemas/CMS_Generic/Payment_Response.xsd"\n    xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"\n    xmlns:ns3="http://www.kotak.com/schemas/CMS_Generic/Reversal_Response.xsd"\n    xmlns:tns="http://xmlns.kotak.com/CMS_Generic_Service">\n    <soap:Body>\n        <ns2:Reversal\n            xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"\n            xmlns="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd">\n            <ns2:Header>\n                <ns2:Req_Id>${e.Header.Req_Id}</ns2:Req_Id>\n                <ns2:Msg_Src>${e.Header.Msg_Src}</ns2:Msg_Src>\n                <ns2:Client_Code>${e.Header.Client_Code}</ns2:Client_Code>\n                <ns2:Date_Post>${e.Header.Date_Post}</ns2:Date_Post>\n            </ns2:Header>\n            <ns2:Details>\n                <ns2:Msg_Id>${e.Details.Msg_Id}</ns2:Msg_Id>\n            </ns2:Details>\n        </ns2:Reversal>\n    </soap:Body>\n</soap:Envelope>`,r=this._endpoint,s=this._reversalActionHeader;return new Promise((a,o)=>{var i=new n;i.messageId=e.Header.Req_Id,i.debugRequest=t;var c=new XMLHttpRequest;c.onreadystatechange=function(){try{if(4!==c.readyState)return;if(200!==c.status)throw new Error("Failed with status "+c.status+"; "+c.responseText);i.debugResponse=c.responseText;var e=(new we).parseFromString(c.responseText).documentElement.getElementsByTagName("ns0:Rev_Detail")[0],t=e.getElementsByTagName("ns0:Msg_Id")[0].textContent,n=e.getElementsByTagName("ns0:Status_Code")[0].textContent,r=e.getElementsByTagName("ns0:Status_Desc")[0].textContent;i.errorCode="0",i.messageId=t,i.statusCode=n,i.statusDescription=r,a(i)}catch(e){i.errorCode="-1",i.errorDescription=e.message,a(i)}},c.open("POST",r),c.setRequestHeader("Content-Type","application/soap+xml"),c.setRequestHeader("action",s),c.send(t)})}}}(ve||(ve={})),(be||(be={})).KotakAPIWrapper=class{constructor(t){e(this,"_api",void 0),this._api=new ve.KotakHTTPAPI(t)}registerPayment(e){var t=e.pMessageId,n={RequestHeader:{MessageId:t,MsgSource:e.pMessageSource,ClientCode:e.pClientCode,BatchRefNmbr:t},InstrumentList:{instrument:{InstRefNo:t,MyProdCode:e.pMyProdCode,PayMode:e.pPayMode,TxnAmnt:e.pTxnAmount,AccountNo:e.pAccountNo,DrDesc:e.pDrDesc,PaymentDt:e.pPaymentDt,RecBrCd:e.pRecBrCd,BeneAcctNo:e.pBeneAccountNo,BeneName:e.pBeneName,InstDt:e.pInstDate,PaymentDtl1:e.pPaymentDtl1,EnrichmentSet:{Enrichment:e.pEnrichment}}}};return new Promise((e,t)=>{this._api.registerPayment(n).then(t=>{e(t)}).catch(e=>{t(e)})})}getPaymentState(e){var t=e.pMessageId,n={Header:{Req_Id:t,Msg_Src:e.pMessageSource,Client_Code:e.pClientCode,Date_Post:""},Details:{Msg_Id:t}};return new Promise((e,t)=>{this._api.getPaymentState(n).then(t=>{e(t)}).catch(e=>{t(e)})})}},metadata={systemName:"KotakBankAPI",displayName:"Kotak Bank API",description:"An example broker that accesses to Kotak Bank API.",configuration:{EndpointUrl:{displayName:"Endpoint Url",type:"string",value:"https://apigwuat.kotak.com:8443/cms_generic_service?apikey=l7xx9e2c880d0b4549049ff62c5bf595c310"},Param2:{displayName:"Param2",type:"string",value:"param2 default value"}}},ondescribe=async function({configuration:e}){postSchema({objects:{KotakBankAPI:{displayName:"Kotak Bank payment API",description:"Kotak Bank payment API",properties:{messageId:{displayName:"messageId",type:"string"},statusCode:{displayName:"statusCode",type:"string"},statusDescription:{displayName:"statusDescription",type:"string"},errorCode:{displayName:"errorCode",type:"string"},errorDescription:{displayName:"errorDescription",type:"string"},debugRequest:{displayName:"debugRequest",type:"string"},debugResponse:{displayName:"debugResponse",type:"string"},version:{displayName:"version",type:"string"}},methods:{RegisterPayment:{displayName:"Perform payment request",type:"execute",parameters:{pMessageId:{displayName:"pMessageId",description:"Message Id",type:"string"},pMessageSource:{displayName:"pMessageSource",description:"Message Source",type:"string"},pClientCode:{displayName:"pClientCode",description:"Client Code",type:"string"},pMyProdCode:{displayName:"pMyProdCode",description:"My product code",type:"string"},pPayMode:{displayName:"pPayMode",description:"Payment Mode",type:"string"},pTxnAmount:{displayName:"pTxnAmount",description:"Transaction amount",type:"string"},pAccountNo:{displayName:"pAccountNo",description:"Account No",type:"string"},pDrDesc:{displayName:"pDrDesc",description:"Debit Description",type:"string"},pPaymentDt:{displayName:"pPaymentDt",description:"Payment Date",type:"string"},pRecBrCd:{displayName:"pRecBrCd",description:"IFSC Code for beneficiary branch",type:"string"},pBeneAccountNo:{displayName:"pBeneAccountNo",description:"Beneficiary Account Number",type:"string"},pBeneName:{displayName:"pBeneName",description:"Beneficiary name",type:"string"},pInstDate:{displayName:"pInstDate",description:"Instrument Date",type:"string"},pPaymentDtl1:{displayName:"pPaymentDtl1",description:"Payment Detail 2",type:"string"},pEnrichment:{displayName:"pEnrichment",description:"pEnrichment",type:"string"}},requiredParameters:["pMessageId","pMessageSource","pClientCode","pMyProdCode","pPayMode","pTxnAmount","pAccountNo","pDrDesc","pPaymentDt","pRecBrCd","pBeneAccountNo","pInstDate","pPaymentDtl1"],outputs:["messageId","statusCode","statusDescription","errorCode","errorDescription","debugRequest","debugResponse"]},GetPaymentState:{displayName:"Get payment state",type:"read",parameters:{pMessageId:{displayName:"pMessageId",description:"Message Id",type:"string"},pMessageSource:{displayName:"pMessageSource",description:"Message Source",type:"string"},pClientCode:{displayName:"pClientCode",description:"Client Code",type:"string"}},requiredParameters:["pMessageId","pMessageSource","pClientCode"],outputs:["messageId","statusCode","statusDescription","errorCode","errorDescription","debugRequest","debugResponse"]},GetMessageId:{displayName:"Generate new messageId",type:"read",parameters:{pLeadNumber:{displayName:"pLeadNumber",description:"Lead Number",type:"string"},pTypeOfRequest:{displayName:"pTypeOfRequest",description:"Type of request",type:"string"}},requiredParameters:["pLeadNumber","pTypeOfRequest"],outputs:["messageId"]},GetVersion:{displayName:"Get gateway version",type:"read",outputs:["version"]}}}}})},onexecute=async function({objectName:e,methodName:t,parameters:n,properties:r,configuration:s,schema:a}){switch(e){case"KotakBankAPI":await async function(e,t,n,r){switch(e){case"RegisterPayment":await function(e,t){var n=t.EndpointUrl;return new Promise((t,r)=>{new be.KotakAPIWrapper(n).registerPayment(e).then(e=>{console.log(e),postResult(Ce(e)),t()}).catch(e=>{console.log(e),postResult(Ce(e)),r(e)})})}(n,r);break;case"GetPaymentState":await function(e,t){var n=t.EndpointUrl;return new Promise((t,r)=>{new be.KotakAPIWrapper(n).getPaymentState(e).then(e=>{console.log(e),postResult(Ce(e)),t()}).catch(e=>{console.log(e),postResult(Ce(e)),r(e)})})}(n,r);break;case"GetMessageId":await function(e,t){return new Promise((t,n)=>{var r=e.pLeadNumber.toString(),s=e.pTypeOfRequest.toString(),a=`${r=r.substr(0,9).padStart(9,"0")}${s=s.substr(0,3).padStart(3,"0")}${function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,s=0;s<e;s++)t+=n.charAt(Math.floor(Math.random()*r));return t}(8)}`;a=(a=a.split("&").join("_")).split(" ").join("_"),postResult({messageId:a}),t()})}(n);break;case"GetVersion":await new Promise((e,t)=>{postResult({version:"202009230118"})});break;default:throw new Error("The method "+e+" is not supported.")}}(t,0,n,s);break;default:throw new Error("The object "+e+" is not supported.")}}}();
//# sourceMappingURL=index.js.map
