/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define([
    'N/ui/dialog',
], function (dialog) {

    function validateField(scriptContext) {
        const currentRecord = scriptContext.currentRecord;
        const fieldId = scriptContext.fieldId;

        const email = currentRecord.getValue({
            fieldId: 'custrecord_emaildata'
        });

        const age = currentRecord.getValue({
            fieldId: 'custrecord_agedata'
        });


        // Regular expression for validating age format
        const agePattern = /^\d+$/g;

        // Regular expression for validating email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // Check if the field is filled with valid data
        if (!emailPattern.test(email)) {
            dialog.alert({
                title: "Validation Error",
                message: "Please enter a valid email."
            });
            return false;
        }


        // Check if the field is filled with valid data
        if (!agePattern.test(age)) {
            dialog.alert({
                title: 'Validation Error',
                message: "Age can be in numbers only, please enter valid age."
            })
            return false;
        }


        // -----------------------------------------------------------------------------------------
        //  Task 1
        
        
    
        const quantity =currentRecord.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
        })
        if(quantity!==parseInt(quantity) && quantity<5){
            dialog.alert({
                title:"Validation error",
                message: 'Please enter valid quantity'
            })
        }
        console.log(quantity)

        const rateField=currentRecord.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'rate'
        })


        if(rateField<0){
            dialog.alert({
                title:'Validation error',
                message: 'Please enter valid rate'
            })
        }


        // ------------------------------------------------------------------------------
        // Task 2
        const dateField = currentRecord.getValue({
            fieldId: 'duedate'
        })

        const date = new Date();
        if (dateField < date) {
            dialog.alert({
                title: 'Validation Error',
                message: 'Date cannot be in past.'
            })
        }



        const vendor = currentRecord.getValue({
            fieldId: 'entity'
        })


        if (vendor === "") {
            dialog.alert({
                title: 'Validation error',
                message: 'Vendor field cannot be empty.'
            })
            return false
        }
        //-----------------------------------------------------------------------------------
     
        // ------------------------------------------------------------------------------------
        return true;
    }




    function saveRecord(scriptContext) {
        return validateField(scriptContext);
    }
    return {
        saveRecord: saveRecord
    };
});
