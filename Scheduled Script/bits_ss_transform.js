/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

define([
    'N/search', 'N/runtime', 'N/record', 'N/query'
], (search, runtime, record, query) => {
    const execute = (scriptContext) => {
        try {

            const searchId = runtime.getCurrentScript().getParameter('custscript_ss_transform_task') || '';
            if (!searchId) {
                log.error({
                    title: 'MISSING_DEPLOYMENT_PARAMETER',
                    details: 'Please provide the value for saved search.',
                });
                return false;
            }
            const results = search.load({
                id: searchId
            })
            log.debug('results', results)

            const data = results.run().getRange({
                start: 0,
                end: 10
            })
            log.debug('data', data)
            log.debug('data id', data[0].id)


            for (let i = 0; i < data.length; i++) {


                const invoiceRec = record.transform({
                    fromType: record.Type.SALES_ORDER,
                    fromId: data[i].id,
                    toType: record.Type.INVOICE,
                    isDynamic: true,
                });

                log.debug('invoiceRec', invoiceRec)

                const invoid = invoiceRec.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true,
                })
                log.debug('invoid', invoid)
            }

        } catch (error) {
            log.error('error', error);
        }
    }


    return {
        execute
    }
});