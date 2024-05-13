/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */


define([
    'N/search', 'N/currentRecord'
], function (currentRecord,search) {
    function pageInit(scriptContext) {
        // Load the saved search
        var savedSearchId = 'customsearch176';
        var savedSearch = search.load({
            id: savedSearchId
        });

        // Run the search
        var searchResults = savedSearch.run();

        // Process search results
        searchResults.each(function (result) {
            // Access and manipulate search result data as needed
            var columns = result.columns;
            // Example: Log the internal ID of each result
            console.log('Result ID: ' + result.id);
            // Return true to continue processing additional results, false to stop
            return true;
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



