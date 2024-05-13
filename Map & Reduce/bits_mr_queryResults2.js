/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
*/
define(['N/query', 'N/file'],

    function (query, file) {
        const getInputData = (inputContext) => {

            const sqlQuery = `select top 15
            transaction .trandate as trandate,
            transaction .tranid as tranid,
            BuiltIN.DF(transactionline .item) as item,
            ABS(transactionline.quantity) as quantity,
            from transaction 
            left join
            transactionline 
            on
            transactionline .transaction =transaction .id
            where recordtype ='salesorder'
            and transactionline.quantity NOT like '0%'`

            const queryResult = query.runSuiteQL({ query: sqlQuery }).asMappedResults();

            log.debug('queryResult', {queryResult})

            const res = [];
            for (let i = 0; i < queryResult.length; i += 1) {
                res.push({
                    trandate: queryResult[i].trandate,
                    tranid: queryResult[i].tranid,
                    item: queryResult[i].item,
                    quantity: queryResult[i].quantity
                })

            }
            log.debug('res', res)
            
            let csvContents = `Transaction_date Transaction_id  Item Quantity,`;
              
            // const csvLine = `${mapValue[i].trandate} ${mapValue[i].item} ${mapValue[i].quantity} ${mapValue[i].tranid}`;
            for (let i = 0; i <res.length; i++) {
                  csvLine = `${res[i].trandate},${res[i].item},${res[i].quantity},${res[i].tranid}`;
                  csvContents += csvLine;
                  
              }
            
            log.debug('csvContents',csvContents)
            
            const fileObj = file.create({
                  name: 'Query_to_CSV2.txt',
                  fileType: file.Type.PLAINTEXT,
                  contents: csvContents,
                  folder: 203

              })

              
              const fileId = fileObj.save();
              log.debug('fileId', fileId)

        }


        function map(mapContext) {
            try {
                const mapValue = JSON.parse(mapContext.value);
              
                const results=[ mapValue];
             
                log.debug('results',results)
                

            } catch (error) {
                log.debug('error', error)
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








