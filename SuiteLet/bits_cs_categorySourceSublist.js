
/**
 *@NApiVersion 2.1
*@NScriptType ClientScript
*/
define(["N/currentRecord", "N/record", "N/url"], function (currentRecord, record, url) {

    function redirectToSuiteLet(currentRec) {
        const params = {};
        params['category'] = currentRec.getValue({ fieldId:'category'}) || '';

        const redirectUrl = url.resolveScript({
            scriptId: 'customscript_bits_sl_categorysourcesl',
            deploymentId: 'customdeploy_bits_sl_categorysourcesl',
            params,
            isExternal: true,
        });
        window.onbeforeunload = null;
        window.open(redirectUrl, '_self');  
    }


    function fieldChanged(scriptContext) {
        const currentRec = currentRecord.get();
        if (scriptContext.fieldId === 'category') {
            redirectToSuiteLet(currentRec);
        }
    }





    function saveRecord(scriptContextcontext) {
        return true;
    }
    return {
        fieldChanged: fieldChanged,
    };
});



