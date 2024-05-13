/**
@NApiVersion 2.0 
@NScriptType ClientScript
@ModuleScope Public

*/


define(["N/ui/dialog",], function (dialog) {
    function pageInit() {
      dialog.alert({
        title:'it is called as alert',
        message:"This is my First Suitescript2.0"
      });
    
    
    }



    return{
        pageInit:pageInit
    }
  });
  