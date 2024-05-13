/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 
 */

define(["N/ui/message"], function (message) {
  function myFunc() {


    var msg = message.create({
      title: "Message",
      message: "This is my Message",
      type: message.Type.CONFIRMATION,
    });

    msg.show({
        duration:5000
    })
  }

  return {
    pageInit: myFunc,
  };
});
