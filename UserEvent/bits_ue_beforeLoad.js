/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/currentRecord', 'N/record', 'N/ui/serverWidget'],
    /**
     * @param{currentRecord} currentRecord
     * @param{record} record
     * @param{serverWidget} serverWidget
     */
    (currentRecord, record, serverWidget) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

            const newRec = scriptContext.newRecord

            const form = scriptContext.form




            const dropdownField = form.addField({
                id: 'custpage_cust_currency',
                label: 'Custom Currency',
                type: serverWidget.FieldType.SELECT,
                source:'currency'
            });

            const dropdownLocation = form.addField({
                id: 'custpage_custom_location',
                label: 'Custom Location',
                type: serverWidget.FieldType.TEXT
            });

            const dropdoenEmp=  form.addField({
                id: 'custpage_custom_employee',
                label: 'Custom employee',
                type: serverWidget.FieldType.SELECT,
                source:'employee'
            });
            log.debug('dropdoenEmp',dropdoenEmp);

            newRec.setValue({
                fieldId:'entity',
                value:916
            });


            newRec.setValue({
                fieldId:'location',
                value:7
            });

            //cust_location Value Set
            newRec.setValue({
                fieldId:'custpage_custom_location',
                value:'Mumbai'
            })

            const cur= newRec.getValue({
                fieldId:'currency'
            })

            newRec.setValue({
                fieldId:'custpage_cust_currency',
                value:cur
            })

            newRec.setValue({
                fieldId:'employee',
                value:817
            })

            const emp=newRec.getValue({
                fieldId:'employee'

            })


            newRec.setValue({
                fieldId:'custpage_custom_employee',
                value:emp
            })




            newRec.setValue({
                fieldId:'memo',
                value:'bits'
            });

            const totalField = form.getField({
                id: 'custbody_validation',
            });

            totalField.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });

