/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */


define([
    'N/currentRecord', 'N/search', 'N/runtime'
], function (currentRecord, search, runtime) {
    function postSourcing(scriptContext) {
        const currentRecord = scriptContext.currentRecord;

        const fieldId = scriptContext.fieldId;


        if (fieldId === "entity") {
            const vendorId = currentRecord.getValue({
                fieldId: 'entity'
            })



            if (vendorId) {
                currentRecord.setValue({
                    fieldId: 'custbody_don',
                    value: "Shah Rukh Khan",
                    ignoreFieldChange: true

                })
            }

        }



        //      ----------------------------------------------------------------------------------------------------------------


        // get the user's data from saved search then set the data in location of inventory adjustment when selected the subsidory




        if (fieldId === 'subsidiary') {
            const subsidiaryId = currentRecord.getValue({
                fieldId: 'subsidiary',
            });
            alert(`subsidiaryId :${subsidiaryId}`);
            const employeeId = runtime.getCurrentUser().id;
            const rec = record.load({
                type: record.Type.EMPLOYEE,
                id: employeeId,
            });

            alert(`rec :${rec}`);
            const locationId = rec.getText({ fieldId: 'location' }) || '';
            currentRecord.setValue({
                fieldId: 'memo',
                value: locationId,
            });
        }
    }

    return {
        postSourcing: postSourcing
    }

});

