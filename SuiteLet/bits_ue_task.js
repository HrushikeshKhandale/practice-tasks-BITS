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


            const newRec = scriptContext.newRecord;

            var form = scriptContext.form;
            newRec.setValue({
                fieldId: 'memo',
                value: 'purchase order'
            });

            form.addButton({
                id: 'custpage_custom_button',
                label: 'print'
            })

            newRec.setValue({
                fieldId: 'entity',
                value: 901
            })

            newRec.setValue({
                fieldId: 'location',
                value: 2
            });

            const pur = form.getField({
                id: 'custbody_purchase',
            })
            pur.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });

            // creating custom field

            var dropdownLocation = form.addField({
                id: 'custpage_custom_location',
                label: 'Custom Location',
                type: serverWidget.FieldType.TEXT
            });

            newRec.setValue({
                fieldId: 'custpage_custom_location',
                value: 'mumbai',
            });

            newRec.setValue({
                fieldId: 'department',
                value: 4
            });

            const dept =  newRec.getValue({
                fieldId: 'department',
            });


            var dropdowndepartment= form.addField({
                id: 'custpage_custom_department',
                label: 'Custom Department',
                type: serverWidget.FieldType.SELECT,
                source: 'department'

            });
            newRec.setValue({
                fieldId: 'custpage_custom_department',
                value: dept
            });

            var dropdowncurrency= form.addField({
                id: 'custpage_custom_currency',
                label: 'Custom Currency',
                type: serverWidget.FieldType.SELECT,
                source: 'currency'
            });

            const cur =  newRec.getValue({
                fieldId: 'currency',
            });
            
            newRec.setValue({
                fieldId:'custpage_custom_currency',
                value: cur
            })
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