/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
*/
define([
    'N/url',
],

    function (url) {

        function beforeLoad(scriptContext) {
            const newRecord = scriptContext.newRecord;

            if (scriptContext.type === scriptContext.UserEventType.VIEW) {
                const suiteletUrl = `${url.resolveScript({
                    scriptId: 'customscript_bits_sl_create_csv_file',
                    deploymentId: 'customdeploy_bits_sl_create_csv_file',
                    returnExternalUrl: false,
                })}&recId=${scriptContext.newRecord.id}`;



                const clientScript = `window.open('${suiteletUrl}','_self');`;

                scriptContext.form.addButton({
                    id: 'custpage_create_csv_file',
                    label: 'Create CSV File',
                    functionName: clientScript,
                });
            }

        };

        function afterSubmit(scriptContext) {

        }

        function beforeSubmit(scriptContext) { }

        return {
            beforeLoad: beforeLoad,
            afterSubmit: afterSubmit,
            beforeSubmit: beforeSubmit
        }
    }
)