/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
*/
define(['N/search', 'N/runtime', 'N/file'],

    function (search, runtime, file) {
        function getInputData() {
            try {

                const searchId = runtime.getCurrentScript().getParameter('custscript_file_creation') || '';
                if (!searchId) {
                    log.error({
                        title: 'MISSIING_DEPLOYMENT_PARAMETER',
                        details: 'Please provide the value for the saved search'
                    })
                    return false
                }

                const result = search.load({
                    id: searchId
                })

                return result

            } catch (error) {
                log.error(error)
            }
            return
        }

        function map(mapContext) {
            try {
                const mapValues = JSON.parse(mapContext.value)

                log.debug('mapValues', { mapValues })



                const salesOrder = file.create({
                    name: 'Sales_Order.csv',
                    fileType: file.Type.CSV,
                    contents: mapValues,
                    folder: 203,
                    encoding: file.Encoding.UTF8,
                    isOnline: true
                });


                const fileCreated = salesOrder.save();
                log.debug('fileCreated', fileCreated)
            } catch (error) {
                log.error('error', { error })
            }
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