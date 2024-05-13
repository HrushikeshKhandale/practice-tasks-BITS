/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(["N/currentRecord"], function (currentRecord) {
  function pageInit(context) {
    var currentRecord = context.currentRecord;

    var vendor = currentRecord.getValue({
      fieldId: "tranid",
    });

    currentRecord.setValue({
      fieldId: "memo",
      value: vendor,
    });
  }

  function checkField() {
    var field = currentRecord.getField({
      fieldId: "memo",
    });

    field.isDisable = true;
    alert(field);
  }


  function saveRecord(context) {
    return true;
  }
  return {
    pageInit: pageInit,
    saveRecord: saveRecord,

  }
};);