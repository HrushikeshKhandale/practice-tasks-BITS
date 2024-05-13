/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/http', 'N/record', 'N/ui/serverWidget'],
    /**
 * @param{http} http
 * @param{record} record
 * @param{serverWidget} serverWidget
 */
    (http, record, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {


            const form = serverWidget.createForm
                ({ title: 'Purchase Form' })

            const primary_info = form.addFieldGroup({
                id: 'primary_info',
                label: 'Primary Information'
            })


            const customForm = form.addField({
                id: 'otherrefnumcustomform',
                label: 'Custom Form',
                type: serverWidget.FieldType.SELECT,
                source: 'customlist_customform',
                container: 'primary_info'
            })



            const vendor1 = form.addField({
                id: 'otherrefnum',
                label: 'Vendor #',
                type: serverWidget.FieldType.TEXT,
                container: 'primary_info'
            })

            const vendor = form.addField({
                id: 'vendor',
                label: 'Vendor',
                type: serverWidget.FieldType.SELECT,
                source: 'vendor',
                container: 'primary_info'

            })
            vendor.isMandatory = true;


            const employee = form.addField({
                id: 'employee',
                label: 'Employee',
                type: serverWidget.FieldType.SELECT,
                source: 'employee',
                container: 'primary_info'

            })

            const supervisorApproval = form.addField({
                id: 'supervisorapproval',
                label: 'Supervisor Approval',
                type: serverWidget.FieldType.CHECKBOX,
                container: 'primary_info'

            })


            const receive = form.addField({
                id: 'receive',
                label: 'receive by',
                type: serverWidget.FieldType.DATE,
                container: 'primary_info'

            })


            const date = form.addField({
                id: 'date',
                label: 'Date',
                type: serverWidget.FieldType.DATE,
                container: 'primary_info'

            })
            date.isMandatory = true;


            const PO = form.addField({
                id: 'po',
                label: 'PO #',
                type: serverWidget.FieldType.TEXT,
                container: 'primary_info'
            });

            const memo = form.addField({
                id: 'memo',
                label: 'MEMO',
                type: serverWidget.FieldType.TEXT,
                container: 'primary_info'
            });

            // CLASSIFICATION GROUP
            const classification = form.addFieldGroup({
                id: 'classification_group',
                label: 'Classification'
            })


            const subsidiary = form.addField({
                id: 'subsidiary',
                label: 'subsidiary',
                type: serverWidget.FieldType.TEXT,
                container: 'classification_group'
            })

            const department = form.addField({
                id: 'department',
                label: 'Department',
                type: serverWidget.FieldType.TEXT,
                container: 'classification_group'
            })

            const location = form.addField({
                id: 'location',
                label: 'Location',
                type: serverWidget.FieldType.TEXT,
                container: 'classification_group'
            })
            location.isMandatory = true;


            const currency = form.addField({
                id: 'currency',
                label: 'Currency',
                type: serverWidget.FieldType.SELECT,
                source: 'currency',
                container: 'classification_group'
            })
            currency.isMandatory = true;





            // SUBTABs


            form.addTab({
                id: 'item',
                label: 'Items'
            });



            // Items's sublist
            const expenseSubList = form.addSublist({
                name: 'expenses',
                id: 'expenses',
                label: 'Expenses',
                type: serverWidget.SublistType.INLINEEDITOR,
                tab: 'item'
            })



            const exchangeRate = form.addField({
                id: 'exchangerate',
                label: 'Exchange Rate',
                type: serverWidget.FieldType.TEXT,
                container: 'item'
            })
            exchangeRate.isMandatory = true;


            const clearAllBtn = expenseSubList.addButton({
                id: 'clearbtn',
                label: 'Clear All Lines',
                container: 'expenses'
            })


            const category = expenseSubList.addField({
                id: 'category',
                label: 'category',
                type: serverWidget.FieldType.SELECT,
            })

            const account = expenseSubList.addField({
                id: 'account',
                label: 'Account',
                type: serverWidget.FieldType.SELECT,
            })
                .isMandatory = true;


            const amount = expenseSubList.addField({
                id: 'amount',
                label: 'Amount',
                type: serverWidget.FieldType.TEXT,
            })
                .isMandatory = true;

            const taxCode = expenseSubList.addField({
                id: 'taxcode',
                label: 'TAX CODE',
                type: serverWidget.FieldType.SELECT,
            })

            const taxRate = expenseSubList.addField({
                id: 'taxtrate',
                label: 'TAX RATE',
                type: serverWidget.FieldType.TEXT,
            })


            taxRate.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.DISABLED
            })


            const grossAmt = expenseSubList.addField({
                id: 'grossamt',
                label: 'GROSS AMT',
                type: serverWidget.FieldType.TEXT,
            })


            const memo2 = expenseSubList.addField({
                id: 'memo2',
                label: 'MEMO',
                type: serverWidget.FieldType.TEXT,
            })


            const department2 = expenseSubList.addField({
                id: 'department2',
                label: 'Department',
                type: serverWidget.FieldType.SELECT,
            })


            const class2 = expenseSubList.addField({
                id: 'class2',
                label: 'MEMO',
                type: serverWidget.FieldType.SELECT,
            })



            const location2 = expenseSubList.addField({
                id: 'location2',
                label: 'LOCATION',
                type: serverWidget.FieldType.SELECT,
            })


            const customer = expenseSubList.addField({
                id: 'customer',
                label: 'Customer',
                type: serverWidget.FieldType.SELECT,
            })

            const projectTask = expenseSubList.addField({
                id: 'projecttask',
                label: 'Project Task',
                type: serverWidget.FieldType.SELECT,
            })

            const billable = expenseSubList.addField({
                id: 'billable',
                label: 'Billable',
                type: serverWidget.FieldType.SELECT,
            })
            billable.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.DISABLED
            })




            // Billing
            form.addTab({
                id: 'billing',
                label: 'Billing'
            });

            const vendorSelect = form.addField({
                id: "vendorsel",
                label: "Vendor",
                type: serverWidget.FieldType.SELECT,
                source: "vendor",
                style: { width: "200px" },
                tab: 'billing',
                container: 'billing'
            });

            scriptContext.response.writePage(form);

        }

        return { onRequest }

    });
