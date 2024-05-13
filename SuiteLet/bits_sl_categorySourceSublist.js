/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/http', 'N/record', 'N/ui/serverWidget', 'N/query'],
    /**
 * @param{http} http
 * @param{record} record
 * @param{serverWidget} serverWidget
 * @param{query} query
 */
    (http, record, serverWidget, query) => {



        function getCustomers(cust) {
            const sqlQuery = `
        SELECT
                entityid, category                 ,
        FROM
                customer
        WHERE
                 category=${cust}`;
           
                 log.debug('sql', sqlQuery)

            return query.runSuiteQL({ query: sqlQuery }).asMappedResults();
        }



        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            const serverRequest = scriptContext.request;
            const serverResponse = scriptContext.response;

            if (serverRequest.method === http.Method.GET) {
                const category = serverRequest.parameters['category'] || null;
                log.debug('category', category)
                const form = serverWidget.createForm
                    ({ title: 'Customers' })


                const primary_info = form.addFieldGroup({
                    id: 'primary_info',
                    label: 'Primary Information'
                })


                const customForm = form.addField({
                    id: 'category',
                    label: 'Category',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customercategory',
                    container: 'primary_info',
                    value: category
                })

                form.addButton({
                    id: 'submit',
                    label: 'Submit',
                })




                // SUBTABs

                form.addTab({
                    id: 'customer',
                    label: 'Customers'
                });


                // Items's sublist
                const customersSublist = form.addSublist({
                    name: 'Customers',
                    id: 'customers',
                    label: 'Customers',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    tab: 'item'
                })



                const name = customersSublist.addField({
                    id: 'name',
                    label: 'Name',
                    type: serverWidget.FieldType.TEXT,
                }).isReadOnly = true



                form.clientScriptModulePath = '/SuiteScripts/bits_cs_categorySourceSublist.js';

                scriptContext.response.writePage(form);




                if (category) {
                    const customer = getCustomers(category);


                    for (let i = 0; i < customer.length; i++) {
                        customersSublist.setSublistValue({
                            id: 'name',
                            line: i,
                            value: customer[i].entityid,
                        });
                    }
                }

            }

        }

        return { onRequest }

    });

