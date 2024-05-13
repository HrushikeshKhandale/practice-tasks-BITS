/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(["N/currentRecord", "N/ui/dialog"], function (currentRecord, dialog) {
  function pageInit(scriptContext) {
    const currentRecord = scriptContext.currentRecord;

    const lineCount = currentRecord.getLineCount({
      sublistId: 'item'
    })



    for (let i = 0; i < lineCount; i++) {

      const quantity = currentRecord.getSublistValue({
        sublistId: 'item',
        fieldId: 'quantity',
        line: i,
      });




      // currentRecord.setValue({
      //   fieldId: 'memo',
      //   value: quantity,

      // })
      // alert(`quantity: ${quantity}`)
    }

    // -------------------------------------------------------------------------------------------------------------

    // to disable the sublist field
    const quantity = currentRecord.getSublistField({
      sublistId: 'item',
      fieldId: 'quantity',
      line: 1,

    })

    quantity.isDisabled = true;

    alert('Quantity field is now disabled');
  }







  function fieldChanged(scriptContext) {
    const currentRecord = scriptContext.currentRecord;

    const q = currentRecord.getSublistValue({
      sublistId: 'item',
      fieldId: 'quantity',
      line: 0
    })

    if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'quantity') {

      const val1 = currentRecord.getCurrentSublistValue({
        sublistId: 'item',
        fieldId: 'quantity'
      })


      if (val1 < 10) {
        dialog.alert({
          title: "Unacceptable",
          message: "Quantity limit cannot be less than 10."
        })
        return true;
      }
      return true;

    }

    // ---------------------------------------------------------------------------------------------------------

    // display warning message

    if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'quantity') {

      const val1 = currentRecord.getCurrentSublistValue({
        sublistId: 'item',
        fieldId: 'quantity'
      })

      const msg = message.create({
        title: "Message",
        message: "This is my Message",
        type: message.Type.WARNING,
      });

      if (val1 > 10) {
        msg.show({
          duration: 5000
        })
      }
    }



    //set sublist line field amount value to bodyfield memo and disable the amount field

    if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'item' || scriptContext.amount === 'amount') {
      
      const amt = currentRecord.getCurrentSublistValue({
        sublistId: 'item',
        fieldId: 'amount',
        line: 0
      })
      const memo = currentRecord.setValue({
        fieldId: 'memo',
        value: amt,
      })
      // alert(amt);


    }

    // disable the amount field
    if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'rate') {
      const disableAmt = currentRecord.getSublistField({
        sublistId: 'item',
        fieldId: 'amount',
        line: 0
      }).isDisabled = true;
      // alert(disableAmt)
    }






}

  function saveRecord(scriptContext) {
    return true;
  }
  return {
  pageInit: pageInit,
  saveRecord: saveRecord,
  fieldChanged: fieldChanged
};
});
