/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
*/
define(['N/currentRecord','N/redirect','N/record'],

    (currentRecord,redirect,record) => {


        const beforeLoad = (scriptContext) => {

        }

        const afterSubmit = (scriptContext) => {
            log.debug("after submitting triggered on type ", scriptContext.type);
           
           const custValue=scriptContext.newRecord.getValue({
            fieldId:'entity'
           })

            log.debug("old value of memo ", scriptContext.oldRecord.getValue('memo'));
            log.debug("new value of memo ", scriptContext.newRecord.getValue('memo'));

            
            redirect.toRecord({
                id: custValue,
                type: record.Type.CUSTOMER,
              
            })
        }

        const beforeSubmit = (scriptContext) => {

        }

        return {
            beforeLoad: beforeLoad,
            afterSubmit: afterSubmit,
            beforeSubmit: beforeSubmit
        }
    }
)