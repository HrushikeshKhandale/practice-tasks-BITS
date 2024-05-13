/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/http','N/ui/serverWidget','N/record','N/query','N/search','N/file'],

    (http,serverWidget,record,query,search,file) => {

        const onRequest = (scriptContext) => {

            const serverRequest = scriptContext.request;
            const serverResponse = scriptContext.response;

            const recordId = serverRequest.parameters.recId || '';
            log.debug('recordId',recordId);

            const form =  serverWidget.form;

            const  myQuery =  `select 
            salesOrder.tranid,
            builtin.DF(salesOrder.entity) as entity ,
            builtin.DF(salesOrderLine.item) as Item,
            builtin.DF(salesOrderLine.DEPARTMENT) as department,
            builtin.DF(salesOrderLine.CLASS) as class,
            salesOrderLine.Rate,
            salesOrderLine.Price level,
            ABS(salesOrderLine.QUANTITY) as quantity
         from
             transaction salesOrder
        left join
              transactionline salesOrderLine
        on
              salesOrderLine.transaction = salesOrder.id
        where
              salesOrder.id = ${recordId}`
            log.debug('typeof myQuery',typeof myQuery);
            log.debug('myQuery',myQuery);

            const queryResult =  query.runSuiteQL({query: myQuery}).asMappedResults();
            log.debug('queryResult',queryResult);

            const res = [];
            for (let i = 0; i < queryResult.length; i += 1) {
                res.push({
                    tranid: queryResult[i].tranid || ' ',
                    entity: queryResult[i].entity || ' ',
                    item: queryResult[i].item || ' ',
                    department: queryResult[i].department || ' ',
                    class: queryResult[i].class || ' ',
                    rate: queryResult[i].rate || ' ',
                    level: queryResult[i].level || ' ',
                    quantity: queryResult[i].quantity || ' '
                });
            }

          log.debug('res',res);

            let csvContents = `tranid , customer , Item , dept , class , rate , level , Quantity\n`;

            for (let i = 0; i < res.length; i++) {
                csvLine = `${res[i].tranid},`;
                csvLine += `${res[i].entity},`;
                csvLine += `${res[i].item},`;
                csvLine += `${res[i].department},`;
                csvLine += `${res[i].class},`;
                csvLine += `${res[i].rate},`;
                csvLine += `${res[i].level},`;
                csvLine += `${res[i].quantity}\n`;

                csvContents += csvLine;
            }

            log.debug('csvContents', csvContents);
            // log.debug('csvContents',typeof(csvContents));

            const fileObj = file.create({
                name: 'salesOrderData.csv',
                fileType: file.Type.CSV,
                contents: csvContents,
                folder: 203
            });

            const fileId = fileObj.save();
            log.debug('fileId', fileId);

            serverResponse.writeFile({
                file: fileObj,
                 inline:true
            });
        }

        return {
            onRequest
        }

    });
