/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
*/
define(['N/query', 'N/file'],

    function (query, file) {
        function getInputData() {


            const getSalesQuery = ` SELECT
               *                      
 FROM 
           	transaction
WHERE

		recordtype='salesorder'

`;

            const queryResult = query.runSuiteQL({ query: getSalesQuery }).asMappedResults();

            const resData = { queryResult }

            log.debug('resData', resData)


          return queryResult


        }


        function map(mapContext) {
            try {

                const mapValues = mapContext.value
                log.debug('mapValues', { mapValues })


                const salesData = file.create({
                    name: 'salesData.csv',
                    fileType: file.Type.CSV,
                    contents: mapValues,
                    folder: 203,
                    encoding: file.Encoding.UTF8,
                    isOnline: true
                });


                const savedFile = salesData.save();
                log.debug('savedFile', savedFile);
            } catch (error) {
                log.error('error', error)
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