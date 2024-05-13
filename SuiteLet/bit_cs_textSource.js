/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
*/
define(['N/ui/serverWidget', 'N/record', 'N/file', 'N/currentRecord'],

    function (serverWidget, record, file, currentRecord) {

        function lineInit(scriptContext) {

        }

        function pageInit(scriptContext) {
            try {

                // create text field on transaction body field
                const currentRecord = scriptContext.currentRecord;


                const val = currentRecord.getText({
                    fieldId: 'customform'
                })
                log.debug('val', val);

                currentRecord.setValue({
                    fieldId: 'custpage_custom_text_field',
                    value: val,
                })
            } catch (error) {
                log.debug('error', error)
            }
        }

        function postSourcing(scriptContext) { }

        function saveRecord(scriptContext) { }

        function sublistChanged(scriptContext) { }

        function validateDelete(scriptContext) { }

        function validateField(scriptContext) { }

        function validateInsert(scriptContext) { }

        function validateLine(scriptContext) { }

        function fieldChanged(scriptContext) { }

        return {
            lineInit: lineInit,
            pageInit: pageInit,
            postSourcing: postSourcing,
            saveRecord: saveRecord,
            sublistChanged: sublistChanged,
            validateDelete: validateDelete,
            validateField: validateField,
            validateInsert: validateInsert,
            validateLine: validateLine,
            fieldChanged: fieldChanged
        };
    }
);
