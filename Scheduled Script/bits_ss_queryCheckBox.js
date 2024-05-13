/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

define([
    'N/search', 'N/runtime', 'N/record', 'N/query'
], (search, runtime, record, query) => {
    const execute = (scriptContext) => {
        try {

            const sqlQuery=`select
                                    id,
                                     ordpicked
                            from
                                      transaction
                             where
                                     recordType='salesorder'
            `

            const queryResult=query.runSuiteQL({query:sqlQuery}).asMappedResults()
            log.debug('queryResult', queryResult)

         
           for (let so = 0; so < queryResult.length; so++) {
            log.debug('queryResult id', queryResult[so].id)
            log.debug('queryResult ordpicked', queryResult[so].ordpicked)

                    if (queryResult[so].ordpicked =='T') {
                    record.submitFields({
                        type: record.Type.SALES_ORDER,
                        id: queryResult[so].id,
                        values: {
                            custbody_ss_checkbox_task2: true,
                        }
                    });

            }
            }



        } catch (error) {
            log.error('error', error);
        }
    }


    return {
        execute
    }
});