/**
@NApiVersion 2.0 
@NScriptType ClientScript
@ModuleScope Public

*/

define(["N/ui/dialog"], function (dialog) {
  function pageInit() {
    var buttons = {
      title: "Three Buttons",
      buttons: [
        {
          label: "1",
          value: 1,
        },
        {
          label: "2",
          value: 2,
        },
        {
          label: "3",
          value: 3,
        },
      ],
      message: "Click a button to continue",
    };

    function success(result) {
      console.log("Success: " + result);
    }
    function failure(reason) {
      console.log("Failure: " + reason);
    }

    dialog.create(buttons).then(success).catch(failure);
  }

  return {
    pageInit: pageInit,
  };
});
