/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

define([
    'N/search', 'N/runtime','N/record'
], (search, runtime,record) => {
    const execute = (scriptContext) => {
        try {
            const searchId = runtime.getCurrentScript().getParameter('custscript_scheduledscript_checkbox_task' || '');
            if (!searchId) {
                log.error({
                    title: 'MISSING_DEPLOYMENT_PARAMETER',
                    details: 'Please provide the value for saved search.',
                });
                return false;
            }

            const result = search.load({ id: searchId });
            const resultSet = result.run().getRange({
                start: 0,
                end: 8
            })
            log.debug('result', result)
            log.debug('resultSet', resultSet)

            
            for (let so = 0; so < resultSet.length; so++) {
                log.debug('resultSet[so].id', resultSet[so].id);

                if (resultSet[so].recordType == 'salesorder') {
                    record.submitFields({
                        type: record.Type.SALES_ORDER,
                        id: resultSet[so].id,
                        values: {
                            custbody_scheduled_script_check_box: true,
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