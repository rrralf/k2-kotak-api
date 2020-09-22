!function(){function e(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}let t,s;function n(e){return{messageId:e.messageId,statusCode:e.statusCode,statusDescription:e.statusDescription,errorCode:e.errorCode,errorDescription:e.errorDescription,debugRequest:e.debugRequest,debugResponse:e.debugResponse}}!function(t){class s{constructor(){e(this,"messageId",void 0),e(this,"statusCode",void 0),e(this,"statusDescription",void 0),e(this,"errorCode",void 0),e(this,"errorDescription",void 0),e(this,"debugRequest",void 0),e(this,"debugResponse",void 0),this.errorCode="",this.statusCode=""}}t.KotakResponse=s;t.KotakHTTPAPI=class{constructor(t){e(this,"_paymentActionHeader",void 0),e(this,"_reversalActionHeader",void 0),e(this,"_endpoint",void 0),this._paymentActionHeader="/BusinessServices/StarterProcesses/CMS_Generic_Service.serviceagent/Payment",this._reversalActionHeader="/BusinessServices/StarterProcesses/CMS_Generic_Service.serviceagent/Reversal",this._endpoint=t}registerPayment(e){var t=e.RequestHeader,n=e.InstrumentList.instrument,a=`<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope\n    xmlns:soap="http://www.w3.org/2003/05/soap-envelope"\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n    xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"\n    xmlns:ns1="http://www.kotak.com/schemas/CMS_Generic/Payment_Response.xsd"\n    xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"\n    xmlns:ns3="http://www.kotak.com/schemas/CMS_Generic/Reversal_Response.xsd"\n    xmlns:tns="http://xmlns.kotak.com/CMS_Generic_Service">\n    <soap:Body>\n        <ns0:Payment\n            xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"\n            xmlns="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd">\n            <ns0:RequestHeader>\n                <ns0:MessageId>${t.MessageId}</ns0:MessageId>\n                <ns0:MsgSource>${t.MsgSource}</ns0:MsgSource>\n                <ns0:ClientCode>${t.ClientCode}</ns0:ClientCode>\n                <ns0:BatchRefNmbr>${t.BatchRefNmbr}</ns0:BatchRefNmbr>\n            </ns0:RequestHeader>\n            <ns0:InstrumentList>\n                <ns0:instrument>\n                    <ns0:InstRefNo>${n.InstRefNo}</ns0:InstRefNo>\n                    <ns0:MyProdCode>${n.MyProdCode}</ns0:MyProdCode>\n                    <ns0:PayMode>${n.PayMode}</ns0:PayMode>\n                    <ns0:TxnAmnt>${n.TxnAmnt}</ns0:TxnAmnt>\n                    <ns0:AccountNo>${n.AccountNo}</ns0:AccountNo>\n                    <ns0:DrDesc>${n.DrDesc}</ns0:DrDesc>\n                    <ns0:PaymentDt>${n.PaymentDt}</ns0:PaymentDt>\n                    <ns0:RecBrCd>${n.RecBrCd}</ns0:RecBrCd>\n                    <ns0:BeneAcctNo>${n.BeneAcctNo}</ns0:BeneAcctNo>\n                    <ns0:BeneName>${n.BeneName}</ns0:BeneName>\n                    <ns0:InstDt>${n.InstDt}</ns0:InstDt>\n                    <ns0:PaymentDtl1>${n.PaymentDtl1}</ns0:PaymentDtl1>\n                    <ns0:EnrichmentSet>\n                        <ns0:Enrichment>${n.EnrichmentSet.Enrichment}</ns0:Enrichment>\n                    </ns0:EnrichmentSet>\n                </ns0:instrument>\n            </ns0:InstrumentList>\n        </ns0:Payment>\n    </soap:Body>\n</soap:Envelope>`,r=this._endpoint,o=this._paymentActionHeader;return new Promise((e,n)=>{var i=new s;i.messageId=t.MessageId,i.debugRequest=a;var p=new XMLHttpRequest;p.onreadystatechange=function(){try{if(4!==p.readyState)return;if(200!==p.status)throw new Error("Failed with status "+p.status+"; "+p.responseText);i.debugResponse=p.responseText;var t=p.responseXML.documentElement.getElementsByTagName("ns0:AckHeader")[0],s=t.getElementsByTagName("ns0:MessageId")[0].textContent,a=t.getElementsByTagName("ns0:StatusCd")[0].textContent,r=t.getElementsByTagName("ns0:StatusRem")[0].textContent;i.errorCode="0",i.messageId=s,i.statusCode=a,i.statusDescription=r,e(i)}catch(e){i.errorCode="-1",i.errorDescription=e.message,n(i)}},p.open("POST",r),p.setRequestHeader("Content-Type","application/soap+xml"),p.setRequestHeader("action",o),p.send(a)})}getPaymentState(e){var t=`<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope\n    xmlns:soap="http://www.w3.org/2003/05/soap-envelope"\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n    xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"\n    xmlns:ns1="http://www.kotak.com/schemas/CMS_Generic/Payment_Response.xsd"\n    xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"\n    xmlns:ns3="http://www.kotak.com/schemas/CMS_Generic/Reversal_Response.xsd"\n    xmlns:tns="http://xmlns.kotak.com/CMS_Generic_Service">\n    <soap:Body>\n        <ns2:Reversal\n            xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"\n            xmlns="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd">\n            <ns2:Header>\n                <ns2:Req_Id>${e.Header.Req_Id}</ns2:Req_Id>\n                <ns2:Msg_Src>${e.Header.Msg_Src}</ns2:Msg_Src>\n                <ns2:Client_Code>${e.Header.Client_Code}</ns2:Client_Code>\n                <ns2:Date_Post>${e.Header.Date_Post}</ns2:Date_Post>\n            </ns2:Header>\n            <ns2:Details>\n                <ns2:Msg_Id>${e.Details.Msg_Id}</ns2:Msg_Id>\n            </ns2:Details>\n        </ns2:Reversal>\n    </soap:Body>\n</soap:Envelope>`,n=this._endpoint,a=this._reversalActionHeader;return new Promise((r,o)=>{var i=new s;i.messageId=e.Header.Req_Id,i.debugRequest=t;var p=new XMLHttpRequest;p.onreadystatechange=function(){try{if(4!==p.readyState)return;if(200!==p.status)throw new Error("Failed with status "+p.status+"; "+p.responseText);i.debugResponse=p.responseText;var e=p.responseXML.documentElement.getElementsByTagName("ns0:Rev_Detail")[0],t=e.getElementsByTagName("ns0:Msg_Id")[0].textContent,s=e.getElementsByTagName("ns0:Status_Code")[0].textContent,n=e.getElementsByTagName("ns0:Status_Desc")[0].textContent;i.errorCode="0",i.messageId=t,i.statusCode=s,i.statusDescription=n,r(i)}catch(e){i.errorCode="-1",i.errorDescription=e.message,o(i)}},p.open("POST",n),p.setRequestHeader("Content-Type","application/soap+xml"),p.setRequestHeader("action",a),p.send(t)})}}}(t||(t={})),(s||(s={})).KotakAPIWrapper=class{constructor(s){e(this,"_api",void 0),this._api=new t.KotakHTTPAPI(s)}registerPayment(e){var t=e.pMessageId,s=e.pMessageSource,n=e.pClientCode,a=e.pTxnAmount,r=e.pAccountNo,o=e.pRecBrCd,i=e.pPaymentDt,p=e.pBeneAccountNo,d={RequestHeader:{MessageId:t,MsgSource:s,ClientCode:n,BatchRefNmbr:t},InstrumentList:{instrument:{InstRefNo:t,MyProdCode:"WPAY",PayMode:"NEFT",TxnAmnt:a,AccountNo:r,DrDesc:e.pDrDesc,PaymentDt:i,RecBrCd:o,BeneAcctNo:p,BeneName:e.pBeneName,InstDt:e.pInstDate,PaymentDtl1:e.pPaymentDtl1,EnrichmentSet:{Enrichment:e.pEnrichment}}}};return new Promise((e,t)=>{this._api.registerPayment(d).then(t=>{e(t)}).catch(e=>{t(e)})})}getPaymentState(e){var t=e.pMessageId,s={Header:{Req_Id:t,Msg_Src:e.pMessageSource,Client_Code:e.pClientCode,Date_Post:""},Details:{Msg_Id:t}};return new Promise((e,t)=>{this._api.getPaymentState(s).then(t=>{e(t)}).catch(e=>{t(e)})})}},metadata={systemName:"KotakBankAPI",displayName:"Kotak Bank API",description:"An example broker that accesses to Kotak Bank API.",configuration:{EndpointUrl:{displayName:"Endpoint Url",type:"string",value:"https://apigwuat.kotak.com:8443/cms_generic_service?apikey=l7xx9e2c880d0b4549049ff62c5bf595c310"},Param2:{displayName:"Param2",type:"string",value:"param2 default value"}}},ondescribe=async function({configuration:e}){postSchema({objects:{KotakBankAPI:{displayName:"Kotak Bank payment API",description:"Kotak Bank payment API",properties:{messageId:{displayName:"messageId",type:"string"},statusCode:{displayName:"statusCode",type:"string"},statusDescription:{displayName:"statusDescription",type:"string"},errorCode:{displayName:"errorCode",type:"string"},errorDescription:{displayName:"errorDescription",type:"string"},debugRequest:{displayName:"debugRequest",type:"string"},debugResponse:{displayName:"debugResponse",type:"string"},version:{displayName:"version",type:"string"}},methods:{RegisterPayment:{displayName:"Perform payment request",type:"execute",parameters:{pMessageId:{displayName:"pMessageId",description:"Message Id",type:"string"},pMessageSource:{displayName:"pMessageSource",description:"Message Source",type:"string"},pClientCode:{displayName:"pClientCode",description:"Client Code",type:"string"},pTxnAmount:{displayName:"pTxnAmount",description:"Transaction amount",type:"number"},pAccountNo:{displayName:"pAccountNo",description:"Account No",type:"string"},pRecBrCd:{displayName:"pRecBrCd",description:"RecBrCd",type:"string"},pPaymentDt:{displayName:"pPaymentDt",description:"Payment Date",type:"string"},pBeneAccountNo:{displayName:"pBeneAccountNo",description:"Bene account No",type:"string"},pDrDesc:{displayName:"pDrDesc",description:"DrDesc",type:"string"},pBeneName:{displayName:"pBeneName",description:"BeneName",type:"string"},pInstDate:{displayName:"pInstDate",description:"InstDt",type:"string"},pPaymentDtl1:{displayName:"pPaymentDtl1",description:"pPaymentDtl1",type:"string"},pEnrichment:{displayName:"pEnrichment",description:"pEnrichment",type:"string"}},requiredParameters:["pMessageId","pMessageSource","pClientCode","pTxnAmount"],outputs:["messageId","statusCode","statusDescription","errorCode","errorDescription","debugRequest","debugResponse"]},GetPaymentState:{displayName:"Get payment state",type:"read",parameters:{pMessageId:{displayName:"pMessageId",description:"Message Id",type:"string"},pMessageSource:{displayName:"pMessageSource",description:"Message Source",type:"string"},pClientCode:{displayName:"pClientCode",description:"Client Code",type:"string"}},requiredParameters:["pMessageId","pMessageSource","pClientCode"],outputs:["messageId","statusCode","statusDescription","errorCode","errorDescription","debugRequest","debugResponse"]},GetMessageId:{displayName:"Generate new messageId",type:"read",parameters:{pLeadNumber:{displayName:"pLeadNumber",description:"Lead Number",type:"string"},pTypeOfRequest:{displayName:"pTypeOfRequest",description:"Type of request",type:"string"}},requiredParameters:["pLeadNumber","pTypeOfRequest"],outputs:["messageId"]},GetVersion:{displayName:"Get gateway version",type:"read",outputs:["version"]}}}}})},onexecute=async function({objectName:e,methodName:t,parameters:a,properties:r,configuration:o,schema:i}){switch(e){case"KotakBankAPI":await async function(e,t,a,r){switch(e){case"RegisterPayment":await function(e,t){var a=t.EndpointUrl;return new Promise((t,r)=>{new s.KotakAPIWrapper(a).registerPayment(e).then(e=>{console.log(e),postResult(n(e)),t()}).catch(e=>{console.log(e),postResult(n(e)),r(e)})})}(a,r);break;case"GetPaymentState":await function(e,t){var a=t.EndpointUrl;return new Promise((t,r)=>{new s.KotakAPIWrapper(a).getPaymentState(e).then(e=>{console.log(e),postResult(n(e)),t()}).catch(e=>{console.log(e),postResult(n(e)),r(e)})})}(a,r);break;case"GetMessageId":await function(e,t){return new Promise((t,s)=>{var n=e.pLeadNumber.toString(),a=e.pTypeOfRequest.toString(),r=`${n=n.substr(0,9).padStart(9,"0")}${a=a.substr(0,3).padStart(3,"0")}${function(e){for(var t="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=s.length,a=0;a<e;a++)t+=s.charAt(Math.floor(Math.random()*n));return t}(8)}`;r=(r=r.split("&").join("_")).split(" ").join("_"),postResult({messageId:r}),t()})}(a);break;case"GetVersion":await new Promise((e,t)=>{postResult({version:"202009230021"})});break;default:throw new Error("The method "+e+" is not supported.")}}(t,0,a,o);break;default:throw new Error("The object "+e+" is not supported.")}}}();
//# sourceMappingURL=index.js.map
