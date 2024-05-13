/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

define([
    'N/query','N/file'
], ( query,file) => {
    const execute = (scriptContext) => {
        try {

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

            log.debug('queryResult', { queryResult })

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

            let csvContents = `Transaction_date Transaction_id  Item Quantity\n,`;

            for (let i = 0; i < res.length; i++) {
                csvLine = `${res[i].trandate},${res[i].item},${res[i].quantity},${res[i].tranid}\n`;
                csvContents += csvLine;

            }

            log.debug('csvContents', csvContents)

            const fileObj = file.create({
                name: 'Query_to_CSV2_SS.txt',
                fileType: file.Type.PLAINTEXT,
                contents: csvContents,
                folder: 203

            })


            const fileId = fileObj.save();
            log.debug('fileId', fileId)
        } catch (error) {
            log.error('error', error);
        }
    }

    return {
        execute
    }
});