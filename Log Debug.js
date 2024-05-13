/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope Public
 */

define(["N/log"], function (log) {
  function pageInit() {
    let name = "Hrushikesh";

    log.debug({
      title: val,
      details: "My Name is " + name,
    });
  }

  return {
    pageInit: pageInit,
  };
});
