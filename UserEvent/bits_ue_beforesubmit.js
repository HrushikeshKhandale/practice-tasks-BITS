/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/currentRecord', 'N/record'],
    (log, currentRecord, record) => {

        const beforeLoad = (scriptContext) => {
            // Add your beforeLoad logic here if needed
        }

        const beforeSubmit = (scriptContext) => {
            log.debug("before submitting triggered on type ", scriptContext.type);
            log.debug("old value of memo ", scriptContext.oldRecord.getValue('memo'));
            log.debug("new value of memo ", scriptContext.newRecord.getValue('memo'));

                log.error('Error occurred:', error);
                throw error;
        }

        const afterSubmit = (scriptContext) => {
            // Add your afterSubmit logic here if needed
        }

        return {
            beforeLoad,
            beforeSubmit,
            afterSubmit
        };
    }
);
