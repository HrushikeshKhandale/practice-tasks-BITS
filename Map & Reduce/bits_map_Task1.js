/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
*/
define(['N/search', 'N/runtime','N/record'], (search, runtime, record) => {
    const getInputData = (inputContext) => {
        try {
            const searchId = runtime.getCurrentScript().getParameter('custscript_map_task1' || '');
            if (!searchId) {
                log.error({
                    title: 'MISSING_DEPLOYMENT_PARAMETER',
                    details: 'Please provide the value for saved search.',
                });
                return false;
            }

            const result = search.load({ id: searchId });
            log.debug(result)
            return result;

        } catch (e) {
            log.error({
                title: 'GET_INPUT_ERROR',
                details: e,
            });
        }
        return;
    };

    const map = (mapContext) => {
        const mapValues = JSON.parse(mapContext.value);
log.debug('mapValues',mapValues);
        const mapKey = mapContext.key;
        log.debug('mapKey', mapKey);

        const result = mapValues.values;
        log.debug('result',result);
        const amount = result.amount;
        
        log.debug('amount', amount);

        try {

            log.debug('condi', amount > 1);
            if (amount > 1) {
                record.submitFields({
                    type: record.Type.SALES_ORDER,
                    id: mapKey,
                    values: {
                        custbodychkbox: true,
                    }
                });
                
            Log.debug('test')
            }

        } catch (e) {
            log.error({
            title: 'MAP_ERROR',
            details: e,
        });

    

        }

    }
    
    return {
        getInputData: getInputData,
        map: map,
        
    };
}
);