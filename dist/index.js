(function () {
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  let KotakAPIModule;

  (function (_KotakAPIModule) {
    class KotakResponse {
      constructor() {
        _defineProperty(this, "messageId", void 0);

        _defineProperty(this, "statusCode", void 0);

        _defineProperty(this, "statusDescription", void 0);

        _defineProperty(this, "errorCode", void 0);

        _defineProperty(this, "errorDescription", void 0);

        _defineProperty(this, "debugRequest", void 0);

        _defineProperty(this, "debugResponse", void 0);

        this.errorCode = "";
        this.statusCode = "";
      }

    }

    _KotakAPIModule.KotakResponse = KotakResponse;

    class KotakHTTPAPI {
      constructor(baseUrl) {
        _defineProperty(this, "_paymentActionHeader", void 0);

        _defineProperty(this, "_reversalActionHeader", void 0);

        _defineProperty(this, "_endpoint", void 0);

        this._paymentActionHeader = "/BusinessServices/StarterProcesses/CMS_Generic_Service.serviceagent/Payment";
        this._reversalActionHeader = "/BusinessServices/StarterProcesses/CMS_Generic_Service.serviceagent/Reversal";
        this._endpoint = baseUrl;
      }

      registerPayment(request) {
        var header = request.RequestHeader;
        var instrument = request.InstrumentList.instrument;
        var body = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope
    xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"
    xmlns:ns1="http://www.kotak.com/schemas/CMS_Generic/Payment_Response.xsd"
    xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"
    xmlns:ns3="http://www.kotak.com/schemas/CMS_Generic/Reversal_Response.xsd"
    xmlns:tns="http://xmlns.kotak.com/CMS_Generic_Service">
    <soap:Body>
        <ns0:Payment
            xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"
            xmlns="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd">
            <ns0:RequestHeader>
                <ns0:MessageId>${header.MessageId}</ns0:MessageId>
                <ns0:MsgSource>${header.MsgSource}</ns0:MsgSource>
                <ns0:ClientCode>${header.ClientCode}</ns0:ClientCode>
                <ns0:BatchRefNmbr>${header.BatchRefNmbr}</ns0:BatchRefNmbr>
            </ns0:RequestHeader>
            <ns0:InstrumentList>
                <ns0:instrument>
                    <ns0:InstRefNo>${instrument.InstRefNo}</ns0:InstRefNo>
                    <ns0:MyProdCode>${instrument.MyProdCode}</ns0:MyProdCode>
                    <ns0:PayMode>${instrument.PayMode}</ns0:PayMode>
                    <ns0:TxnAmnt>${instrument.TxnAmnt}</ns0:TxnAmnt>
                    <ns0:AccountNo>${instrument.AccountNo}</ns0:AccountNo>
                    <ns0:DrDesc>${instrument.DrDesc}</ns0:DrDesc>
                    <ns0:PaymentDt>${instrument.PaymentDt}</ns0:PaymentDt>
                    <ns0:RecBrCd>${instrument.RecBrCd}</ns0:RecBrCd>
                    <ns0:BeneAcctNo>${instrument.BeneAcctNo}</ns0:BeneAcctNo>
                    <ns0:BeneName>${instrument.BeneName}</ns0:BeneName>
                    <ns0:InstDt>${instrument.InstDt}</ns0:InstDt>
                    <ns0:PaymentDtl1>${instrument.PaymentDtl1}</ns0:PaymentDtl1>
                    <ns0:EnrichmentSet>
                        <ns0:Enrichment>${instrument.EnrichmentSet.Enrichment}</ns0:Enrichment>
                    </ns0:EnrichmentSet>
                </ns0:instrument>
            </ns0:InstrumentList>
        </ns0:Payment>
    </soap:Body>
</soap:Envelope>`;
        var _ep = this._endpoint;
        var _action = this._paymentActionHeader;
        return new Promise((resolve, reject) => {
          var rr = new KotakResponse();
          rr.messageId = header.MessageId;
          rr.debugRequest = body;
          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            try {
              if (xhr.readyState !== 4) return;
              if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status + "; " + xhr.responseText);
              rr.debugResponse = xhr.responseText;
              var msgId = header.MessageId;
              var statusCode = "statusCode00";
              var statusDesc = "statusDesc00";
              rr.errorCode = "0";
              rr.messageId = msgId;
              rr.statusCode = statusCode;
              rr.statusDescription = statusDesc;
              resolve(rr);
            } catch (e) {
              rr.errorCode = "-1";
              rr.errorDescription = e.message;
              reject(rr);
            }
          };

          xhr.open("POST", _ep);
          xhr.setRequestHeader('Content-Type', 'application/soap+xml');
          xhr.setRequestHeader('action', _action);
          xhr.send(body);
        });
      }

      getPaymentState(request) {
        var body = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope
    xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ns0="http://www.kotak.com/schemas/CMS_Generic/Payment_Request.xsd"
    xmlns:ns1="http://www.kotak.com/schemas/CMS_Generic/Payment_Response.xsd"
    xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"
    xmlns:ns3="http://www.kotak.com/schemas/CMS_Generic/Reversal_Response.xsd"
    xmlns:tns="http://xmlns.kotak.com/CMS_Generic_Service">
    <soap:Body>
        <ns2:Reversal
            xmlns:ns2="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd"
            xmlns="http://www.kotak.com/schemas/CMS_Generic/Reversal_Request.xsd">
            <ns2:Header>
                <ns2:Req_Id>${request.Header.Req_Id}</ns2:Req_Id>
                <ns2:Msg_Src>${request.Header.Msg_Src}</ns2:Msg_Src>
                <ns2:Client_Code>${request.Header.Client_Code}</ns2:Client_Code>
                <ns2:Date_Post>${request.Header.Date_Post}</ns2:Date_Post>
            </ns2:Header>
            <ns2:Details>
                <ns2:Msg_Id>${request.Details.Msg_Id}</ns2:Msg_Id>
            </ns2:Details>
        </ns2:Reversal>
    </soap:Body>
</soap:Envelope>`;
        var _ep = this._endpoint;
        var _action = this._reversalActionHeader;
        return new Promise((resolve, reject) => {
          var rr = new KotakResponse();
          rr.messageId = request.Header.Req_Id;
          rr.debugRequest = body;
          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            try {
              if (xhr.readyState !== 4) return;
              if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status + "; " + xhr.responseText);
              rr.debugResponse = xhr.responseText;
              var msgId = request.Header.Req_Id;
              var statusCode = "statusCode00";
              var statusDesc = "statusDesc00";
              rr.errorCode = "0";
              rr.messageId = msgId;
              rr.statusCode = statusCode;
              rr.statusDescription = statusDesc;
              resolve(rr);
            } catch (e) {
              rr.errorCode = "-1";
              rr.errorDescription = e.message;
              reject(rr);
            }
          };

          xhr.open("POST", _ep);
          xhr.setRequestHeader('Content-Type', 'application/soap+xml');
          xhr.setRequestHeader('action', _action);
          xhr.send(body);
        });
      }

    }

    _KotakAPIModule.KotakHTTPAPI = KotakHTTPAPI;
  })(KotakAPIModule || (KotakAPIModule = {}));

  let KotakAPIWrapper;

  (function (_KotakAPIWrapper) {
    class KotakAPIWrapper {
      constructor(endpoint) {
        _defineProperty(this, "_api", void 0);

        this._api = new KotakAPIModule.KotakHTTPAPI(endpoint);
      }

      registerPayment(parameters) {
        var messageId = parameters["pMessageId"];
        var msgSource = parameters["pMessageSource"];
        var clientCode = parameters["pClientCode"];
        var prodCode = "WPAY";
        var payMode = "NEFT";
        var transactionAmount = parameters["pTxnAmount"];
        var accountNo = parameters["pAccountNo"];
        var recBrCd = parameters["pRecBrCd"];
        var paymentDt = parameters["pPaymentDt"];
        var beneAcctNo = parameters["pBeneAccountNo"];
        var drDesc = parameters["pDrDesc"];
        var beneName = parameters["pBeneName"];
        var instDt = parameters["pInstDate"];
        var paymentDtl1 = parameters["pPaymentDtl1"];
        var enrichment = parameters["pEnrichment"];
        var paymentRequest = {
          RequestHeader: {
            MessageId: messageId,
            MsgSource: msgSource,
            ClientCode: clientCode,
            BatchRefNmbr: messageId
          },
          InstrumentList: {
            instrument: {
              InstRefNo: messageId,
              MyProdCode: prodCode,
              PayMode: payMode,
              TxnAmnt: transactionAmount,
              AccountNo: accountNo,
              DrDesc: drDesc,
              PaymentDt: paymentDt,
              RecBrCd: recBrCd,
              BeneAcctNo: beneAcctNo,
              BeneName: beneName,
              InstDt: instDt,
              PaymentDtl1: paymentDtl1,
              EnrichmentSet: {
                Enrichment: enrichment
              }
            }
          }
        };
        return new Promise((resolve, reject) => {
          this._api.registerPayment(paymentRequest).then(response => {
            resolve(response);
          }).catch(err => {
            reject(err);
          });
        });
      }

      getPaymentState(parameters) {
        var messageId = parameters["pMessageId"];
        var msgSource = parameters["pMessageSource"];
        var clientCode = parameters["pClientCode"];
        var paymentStateRequest = {
          Header: {
            Req_Id: messageId,
            Msg_Src: msgSource,
            Client_Code: clientCode,
            Date_Post: ""
          },
          Details: {
            Msg_Id: messageId
          }
        };
        return new Promise((resolve, reject) => {
          this._api.getPaymentState(paymentStateRequest).then(response => {
            resolve(response);
          }).catch(err => {
            reject(err);
          });
        });
      }

    }

    _KotakAPIWrapper.KotakAPIWrapper = KotakAPIWrapper;
  })(KotakAPIWrapper || (KotakAPIWrapper = {}));

  metadata = {
    systemName: "KotakBankAPI",
    displayName: "Kotak Bank API",
    description: "An example broker that accesses to Kotak Bank API.",
    "configuration": {
      "EndpointUrl": {
        displayName: "Endpoint Url",
        type: "string",
        value: "https://apigwuat.kotak.com:8443/cms_generic_service?apikey=l7xx9e2c880d0b4549049ff62c5bf595c310"
      },
      "Param2": {
        displayName: "Param2",
        type: "string",
        value: "param2 default value"
      }
    }
  };

  ondescribe = async function ({
    configuration
  }) {
    postSchema({
      objects: {
        "KotakBankAPI": {
          displayName: "Kotak Bank payment API",
          description: "Kotak Bank payment API",
          properties: {
            "messageId": {
              displayName: "messageId",
              type: "string"
            },
            "statusCode": {
              displayName: "statusCode",
              type: "string"
            },
            "statusDescription": {
              displayName: "statusDescription",
              type: "string"
            },
            "errorCode": {
              displayName: "errorCode",
              type: "string"
            },
            "errorDescription": {
              displayName: "errorDescription",
              type: "string"
            },
            "debugRequest": {
              displayName: "debugRequest",
              type: "string"
            },
            "debugResponse": {
              displayName: "debugResponse",
              type: "string"
            }
          },
          methods: {
            "RegisterPayment": {
              displayName: "Perform payment request",
              type: "execute",
              parameters: {
                "pMessageId": {
                  displayName: "pMessageId",
                  description: "Message Id",
                  type: "string"
                },
                "pMessageSource": {
                  displayName: "pMessageSource",
                  description: "Message Source",
                  type: "string"
                },
                "pClientCode": {
                  displayName: "pClientCode",
                  description: "Client Code",
                  type: "string"
                },
                "pTxnAmount": {
                  displayName: "pTxnAmount",
                  description: "Transaction amount",
                  type: "number"
                },
                "pAccountNo": {
                  displayName: "pAccountNo",
                  description: "Account No",
                  type: "string"
                },
                "pRecBrCd": {
                  displayName: "pRecBrCd",
                  description: "RecBrCd",
                  type: "string"
                },
                "pPaymentDt": {
                  displayName: "pPaymentDt",
                  description: "Payment Date",
                  type: "string"
                },
                "pBeneAccountNo": {
                  displayName: "pBeneAccountNo",
                  description: "Bene account No",
                  type: "string"
                },
                "pDrDesc": {
                  displayName: "pDrDesc",
                  description: "DrDesc",
                  type: "string"
                },
                "pBeneName": {
                  displayName: "pBeneName",
                  description: "BeneName",
                  type: "string"
                },
                "pInstDate": {
                  displayName: "pInstDate",
                  description: "InstDt",
                  type: "string"
                },
                "pPaymentDtl1": {
                  displayName: "pPaymentDtl1",
                  description: "pPaymentDtl1",
                  type: "string"
                },
                "pEnrichment": {
                  displayName: "pEnrichment",
                  description: "pEnrichment",
                  type: "string"
                }
              },
              requiredParameters: ["pMessageId", "pMessageSource", "pClientCode", "pTxnAmount"],
              outputs: ["messageId", "statusCode", "statusDescription", "errorCode", "errorDescription", "debugRequest", "debugResponse"]
            },
            "GetPaymentState": {
              displayName: "Get payment state",
              type: "read",
              parameters: {
                "pMessageId": {
                  displayName: "pMessageId",
                  description: "Message Id",
                  type: "string"
                },
                "pMessageSource": {
                  displayName: "pMessageSource",
                  description: "Message Source",
                  type: "string"
                },
                "pClientCode": {
                  displayName: "pClientCode",
                  description: "Client Code",
                  type: "string"
                }
              },
              requiredParameters: ["pMessageId", "pMessageSource", "pClientCode"],
              outputs: ["messageId", "statusCode", "statusDescription", "errorCode", "errorDescription", "debugRequest", "debugResponse"]
            }
          }
        }
      }
    });
  };

  onexecute = async function ({
    objectName,
    methodName,
    parameters,
    properties,
    configuration,
    schema
  }) {
    switch (objectName) {
      case "KotakBankAPI":
        await onexecuteKotakBank(methodName, properties, parameters, configuration);
        break;

      default:
        throw new Error("The object " + objectName + " is not supported.");
    }
  };

  async function onexecuteKotakBank(methodName, properties, parameters, configuration) {
    switch (methodName) {
      case "RegisterPayment":
        await kotakRegisterPayment(parameters, configuration);
        break;

      case "GetPaymentState":
        await kotakGetPaymentState(parameters, configuration);
        break;

      default:
        throw new Error("The method " + methodName + " is not supported.");
    }
  }

  function kotakRegisterPayment(parameters, configuration) {
    var endpoint = configuration["EndpointUrl"];
    return new Promise((resolve, reject) => {
      var wrap = new KotakAPIWrapper.KotakAPIWrapper(endpoint);
      wrap.registerPayment(parameters).then(response => {
        console.log(response);
        postResult(toK2Result(response));
        resolve();
      }).catch(err => {
        console.log(err);
        postResult(toK2Result(err));
        reject(err);
      });
    });
  }

  function kotakGetPaymentState(parameters, configuration) {
    var endpoint = configuration["EndpointUrl"];
    return new Promise((resolve, reject) => {
      var wrap = new KotakAPIWrapper.KotakAPIWrapper(endpoint);
      wrap.getPaymentState(parameters).then(response => {
        console.log(response);
        postResult(toK2Result(response));
        resolve();
      }).catch(err => {
        console.log(err);
        postResult(toK2Result(err));
        reject(err);
      });
    });
  }

  function toK2Result(response) {
    return {
      "messageId": response.messageId,
      "statusCode": response.statusCode,
      "statusDescription": response.statusDescription,
      "errorCode": response.errorCode,
      "errorDescription": response.errorDescription,
      "debugRequest": response.debugRequest,
      "debugResponse": response.debugResponse
    };
  }

}());
//# sourceMappingURL=index.js.map
