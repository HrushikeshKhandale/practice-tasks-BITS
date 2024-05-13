/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
*/
define(['N/search', 'N/record', 'N/runtime'],

    function (search, record,runtime) {
        function getInputData() {

            try {
                const searchId = runtime.getCurrentScript().getParameter('custscript1') || '';
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

                return results;
            } catch (error) {
                log.error(error)
            }
            return
        }
        function map(mapContext) {
            const mapValues = JSON.parse(mapContext.value);

            const mapKey = mapContext.key;
        

            const result = mapValues.values;

            const invoiceRec = record.transform({
                fromType: record.Type.SALES_ORDER,
                fromId: mapKey,
                toType: record.Type.INVOICE,
                isDynamic: true,
            });

            const invoid = invoiceRec.save({
                enableSourcing: true,
                ignoreMandatoryFields: true,
            })
            log.debug('invoid', invoid)
        }
        function reduce(ctx) { }
        function summarize(summary) { }
        return {
            getInputData: getInputData,
            map: map,
            reduce: reduce,
            summarize: summarize
        };
    }
);