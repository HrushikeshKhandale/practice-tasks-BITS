  /**
   *@NApiVersion 2.0
  *@NScriptType ClientScript
  */
  define(["N/currentRecord"], function (currentRecord) {
    function pageInit(context) {
      var currentRecord = context.currentRecord;

      //get field of memo and disabled it
      var field = currentRecord.getField({
        fieldId: "memo",
      });
      field.isDisabled = true;




      //get field of class and added mandatory property to it
      var assignMandatory = currentRecord.getField({
        fieldId: "class",
      });

      if (!assignMandatory.isMandatory) {
        assignMandatory.isMandatory = true
        //  alert(assignMandatory.id) 
      }


      //get the field and display it's label
      var getLabel = currentRecord.getField({
        fieldId: "class",
      });

      var Label1 = getLabel.label
      console.log(Label1);
      // alert("Label: "+Label1)




      //get id of field
      var getFieldId = field.id;


      
      //getSelectOptions() field method
      var entity = currentRecord.getField({
        fieldId: "entity",
      });

      var options = entity.getSelectOptions({
        filter: 'A',
        operator: 'startswith',
      });

      // var arr=[];
      // options.forEach(function(e)
      //   {
      //     arr+=e.entityid
      //   })
      // alert(options)
      console.log(options);




      //isDisplay
      var memo = currentRecord.getField({
        fieldId: "memo",
      });
      var e = memo.isDisplay
      if (memo.isDisplay) {
        // alert(e);
        console.log(e);
      }


      //isPopup
      var memo = currentRecord.getField({
        fieldId: "memo",
      });
      var m = memo.isPopup
      if (memo.isPopup) {
        // alert(m);
        console.log(m);
      }




      // isReadOnly method
      var total = currentRecord.getField({
        fieldId: "total",
      });
      var tot = total.isVisible;

      if (total.isReadOnly) {
        // alert(tot);
        console.log(tot);
      } else {
        // alert(tot);
        console.log(tot);
      }



      //isVisible method
      var total = currentRecord.getField({
        fieldId: "total",
      });
      var tot = total.isVisible;

      if (total.isVisible) {
        // alert(tot);
        console.log(tot);
      }


      //type method
      var date = currentRecord.getField({
        fieldId: "date",
      });
      var d = date.type;

      if (date.type) {
        // alert(d);
        console.log(d);
      }




    }

    function saveRecord(context) {
      return true;
    }
    return {
      pageInit: pageInit,
      saveRecord: saveRecord,
    };
  });
