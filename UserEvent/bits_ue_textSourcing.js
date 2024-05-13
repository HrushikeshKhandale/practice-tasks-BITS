/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
*/
define(['N/record', 'N/ui/serverWidget'],

    (record, serverWidget) => {


        const beforeLoad = (scriptContext) => {
            try {

                // create text field on transaction body field
                const rec = scriptContext.newRecord;
                log.debug('rec', rec);
                const form = scriptContext.form
                log.debug('form', form)



                // const textField = form.addField({
                //     id: 'custpage_custom_text_field',
                //     label: 'New Text Field',
                //     type: serverWidget.FieldType.TEXT,
                // })
                // log.debug('textField', textField)


                const val = rec.getValue({
                    fieldId: 'customform'
                })
                log.debug('val', val);
                
                form.clientScriptModulePath = '/SuiteScripts/bits_cs_textSource.js';

                // rec.setValue({
                //     fieldId: 'custpage_custom_text_field',
                //     value: val,
                // })
                
            } catch (error) {
                log.debug('error', error)
            }



        }

        const afterSubmit = (scriptContext) => { }

        const beforeSubmit = (scriptContext) => { }

        return {
            beforeLoad,
            afterSubmit,
            beforeSubmit
        }
    }
)