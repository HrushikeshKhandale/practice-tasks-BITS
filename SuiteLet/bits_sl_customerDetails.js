    /**
     * @NApiVersion 2.1
     * @NScriptType Suitelet
    */
    define(['N/https', 'N/ui/serverWidget', 'N/query'],
        (https, serverWidget, query) => {

            function runQuery() {
                const myQuery = `SELECT
                    entityid ,
                    companyname ,
                    territory 
                FROM
                    customer
                WHERE
                    territory > 1
                    order by  id
                ASC`;


                const queryResult = query.runSuiteQL({ query: myQuery }).asMappedResults();
                let arrRes = [];

                for (let i = 0; i < queryResult.length; i+=1) {
                    arrRes.push({
                        entityid: queryResult[i].entityid || '',
                        companyname: queryResult[i].companyname || '',
                        territory: queryResult[i].territory || '',

                    })
                }
                log.debug('arrRes',arrRes)

                return arrRes;
            }


            function addSublistToForm(form) {
                const sublist = form.addSublist({
                    id: 'custpage_customers',
                    label: 'Customers',
                    type: serverWidget.SublistType.LIST
                })

                sublist.addField({
                    id: 'custpage_id',
                    label: 'Company ID',
                    type: serverWidget.FieldType.TEXT
                })

                sublist.addField({
                    id: 'custpage_company_name',
                    label: 'Company Name',
                    type: serverWidget.FieldType.TEXT
                })

                sublist.addField({
                    id: 'custpage_company_territory',
                    label: 'TERRITORY',
                    type: serverWidget.FieldType.TEXT
                })

                return sublist
            }


            function setSublistValues(sublist, queryResult) {
                log.debug('setsublist',queryResult);
                for (let i = 0; i < queryResult.length; i+=1) {
                    sublist.setSublistValue({
                        id: 'custpage_id',
                        line: i,
                        value: queryResult[i].entityid || ' '
                    })

                    sublist.setSublistValue({
                        id: 'custpage_company_name',
                        line: i,
                        value: queryResult[i].companyname || ' '
                    })

                    sublist.setSublistValue({
                        id: 'custpage_company_territory',
                        line: i,
                        value: queryResult[i].territory || ' '
                    })
                }
            }

            function onRequest(scriptContext) {
                const serverRequest = scriptContext.request;
                const serverResponse = scriptContext.response;
                const { method } = serverRequest;

                if (method === https.Method.GET) {
                    const form = serverWidget.createForm({
                        title: 'Customer Details',
                        hideNavBar: true
                    })

                    const sublist = addSublistToForm(form);
                    const queryResult = runQuery();
                    setSublistValues(sublist, queryResult)


                    serverResponse.writePage(form);

                }
            }
            return {
                onRequest
            };
        }
    );