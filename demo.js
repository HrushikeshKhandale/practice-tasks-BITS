
/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(["N/currentRecord", "N/ui/message"], function (currentRecord, message) {
    function fieldChanged(scriptContext) {
        const currentRecord = scriptContext.currentRecord;



        if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'quantity') {

            const val1 = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            })

            const msg = message.create({
                title: "Message",
                message: "This is my Message",
                type: message.Type.WARNING,
            });

            if (val1 > 10) {
                msg.show({
                    duration: 5000
                })
            }
        }


    }


    function saveRecord(scriptContext) {
        return true;
    }

    return {
        fieldChanged: fieldChanged

    };
});


















/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */


define([
    'N/search', 'N/currentRecord', 'N/ui/dialog'
], function (search, dialog) {
    function pageInit(context) {
        // Load the saved search
        var savedSearchId = 'customsearch176';
        var savedSearch = search.load({
            id: savedSearchId
        });




        // const searchResult=savedSearch.run();

        // searchResult.each((e)=>{
        //     let col=e.columns

        //     console.log("ID: "+ e.id);
        //     return true
        // })






        // Run the search
        var searchResults = savedSearch.runPaged({
            pageSize: 1
        })

        searchResults.pageRange.forEach((pageRange) => {
            let currentPage = searchResults.fetch(pageRange)
            currentPage.data.forEach((result) => {

                var columns = result.columns;
                dialog.alert({
                    title: 'Result ID: ',
                    message: result.id
                });
                return true;
            })
        });
    }
    function saveRecord(scriptContext) {
        return true;
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord
    }

});





// ---------------------------------------------------------------------------------------------------------------------------



/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

    function() {
        
        // /**
        //  * Function to be executed after page is initialized.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
        //  *
        //  * @since 2015.2
        //  */
        // function pageInit(scriptContext) {
    
        // }
    
        // /**
        //  * Function to be executed when field is changed.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  * @param {string} scriptContext.fieldId - Field name
        //  * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
        //  * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
        //  *
        //  * @since 2015.2
        //  */
        // function fieldChanged(scriptContext) {
    
        // }
    
        // /**
        //  * Function to be executed when field is slaved.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  * @param {string} scriptContext.fieldId - Field name
        //  *
        //  * @since 2015.2
        //  */
        function postSourcing(scriptContext) {
            const currentRecord = scriptContext.currentRecord;
    
            const fieldId = scriptContext.fieldId;
    
    
            if (fieldId === "entity") {
                const vendorId = currentRecord.getValue({
                    fieldId: 'entity'
                })
    
                const donField = currentRecord.getField({
                    fieldId: 'memo'
                })
    
    
                if (vendorId) {
                    currentRecord.setValue({
                        fieldId: donField,
                        value: "Shah Rukh Khan",
                        ignoreFieldChange: true
    
                    })
                }
    
            }
        }
    
        // /**
        //  * Function to be executed after sublist is inserted, removed, or edited.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @since 2015.2
        //  */
        // function sublistChanged(scriptContext) {
    
        // }
    
        // /**
        //  * Function to be executed after line is selected.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @since 2015.2
        //  */
        // function lineInit(scriptContext) {
    
        // }
    
        // /**
        //  * Validation function to be executed when field is changed.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  * @param {string} scriptContext.fieldId - Field name
        //  * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
        //  * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
        //  *
        //  * @returns {boolean} Return true if field is valid
        //  *
        //  * @since 2015.2
        //  */
        // function validateField(scriptContext) {
    
        // }
    
        // /**
        //  * Validation function to be executed when sublist line is committed.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @returns {boolean} Return true if sublist line is valid
        //  *
        //  * @since 2015.2
        //  */
        // function validateLine(scriptContext) {
    
        // }
    
        // /**
        //  * Validation function to be executed when sublist line is inserted.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @returns {boolean} Return true if sublist line is valid
        //  *
        //  * @since 2015.2
        //  */
        // function validateInsert(scriptContext) {
    
        // }
    
        // /**
        //  * Validation function to be executed when record is deleted.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @returns {boolean} Return true if sublist line is valid
        //  *
        //  * @since 2015.2
        //  */
        // function validateDelete(scriptContext) {
    
        // }
    
        // /**
        //  * Validation function to be executed when record is saved.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @returns {boolean} Return true if record is valid
        //  *
        //  * @since 2015.2
        //  */
        // function saveRecord(scriptContext) {
    
        // }
    
        return {
            // pageInit: pageInit,
            // fieldChanged: fieldChanged,
            postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };
        
    });
    