/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/record', 'N/runtime'], 
function(serverWidget, url, https, record, runtime) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'Custom Form with Drag and Drop'
            });

            // Adding a field to contain the inputs
            var inputsField = form.addField({
                id: 'custpage_inputs_container',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'Inputs Container'
            });

            var htmlContent = '<div class="input-container" id="inputs-container"></div>';
            htmlContent += '<button id="clear-btn">Clear</button>';

            inputsField.defaultValue = htmlContent;

            // Adding client script to handle drag and drop functionality
            form.clientScriptModulePath = '/SuiteScripts/client_script_file.js';

            context.response.writePage(form);
        }
    }

    return {
        onRequest: onRequest
    };
});















// ---------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.....
//SUBLIST 


/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define([
  'N/log',
  'N/record',
  'N/runtime',
  'N/ui/serverWidget',
  'N/search',
],
(log, record, runtime, serverWidget, search) => {
  const onRequest = (scriptContext) => {
    const serverRequest = scriptContext.request;
    const serverResponse = scriptContext.response;

    if (scriptContext.request.method === 'GET') {
      // Return HTML content with the necessary script files
      const form = serverWidget.createForm({
        title: 'Drag & Drop Items',
      });

      // Set the path to your client script directly
      form.clientScriptModulePath = '/SuiteScripts/client_script_file.js';

      // Add item sublist
      const sublist = form.addSublist({
        id: 'custpage_items_sublist',
        label: 'Items',
        type: serverWidget.SublistType.LIST,
      });

      sublist.addField({
        id: 'custpage_item_text',
        type: serverWidget.FieldType.TEXT,
        label: 'Item',
      });


      
      // Fetch and print item list directly
      const itemSearch = search.create({
        type: search.Type.ITEM,
        columns: ['itemid'],
      });

      const itemSearchResults = itemSearch.run().getRange({
        start: 0,
        end: 100, // Adjust as needed
      });

      let lineCount = 0; // Manually track line count

      itemSearchResults.forEach((result) => {
        sublist.setSublistValue({
          id: 'custpage_item_text',
          line: lineCount,
          value: result.getValue('itemid'),
        });

        lineCount++; // Increment line count for each item
      });

      form.addSubmitButton({
        label: 'Submit',
      });

      scriptContext.response.writePage(form);
    }
  };

  return {
    onRequest,
  };
});




















// -----------------.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/**
 * Copyright (c) Ogg Solutions - All Rights Reserved
 * This file is subject to the terms and conditions defined in
 * file 'Ogg_Licence.txt', which is part of this source code package.
 */

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @Name ogg_ss_drag_and_drop_item.js
 */

define([
    'N/log',
    'N/record',
    'N/runtime',
    'N/ui/serverWidget',
    'N/search',
  ],
  (log, record, runtime, serverWidget, search) => {
    const onRequest = (scriptContext) => {
      const serverRequest = scriptContext.request;
      const serverResponse = scriptContext.response;
  
      if (scriptContext.request.method === 'GET') {
        // Return HTML content with the necessary script files
        const form = serverWidget.createForm({
          title: 'Drag & Drop Items',
        });
  
        form.clientScriptModulePath = '/SuiteScripts/ogg_cs_sales_order.js';
  
        // Add item sublist
        const sublist = form.addSublist({
          id: 'custpage_items_sublist',
          label: 'Items',
          type: serverWidget.SublistType.LIST,
        });
  
        sublist.addField({
          id: 'custpage_item_text',
          type: serverWidget.FieldType.TEXT,
          label: 'Item',
        });
        sublist.addField({
          id: 'custpage_item_text',
          type: serverWidget.FieldType.TEXT,
          label: 'Item',
        });
        sublist.addField({
          id: 'custpage_item_text',
          type: serverWidget.FieldType.TEXT,
          label: 'Item',
        });
        sublist.addField({
          id: 'custpage_item_text',
          type: serverWidget.FieldType.TEXT,
          label: 'Item',
        });
  
        // Retrieve the new sales order record ID from the URL parameters
        const recordId = serverRequest.parameters.recId || '';
  
        // Load the sales order record
        const salesOrder = record.load({
          type: record.Type.SALES_ORDER,
          id: recordId,
          isDynamic: true,
        });
  
        // Get the line count for the sublist
        const lineCount = salesOrder.getLineCount({ sublistId: 'item' });
  
        // Add specific items from the sales order to the sublist
        for (let i = 0; i < lineCount; i++) {
          const itemName = salesOrder.getSublistText({
            sublistId: 'item',
            fieldId: 'item',
            line: i,
          });
  
          sublist.setSublistValue({
            id: 'custpage_item_text',
            line: i,
            value: itemName,
          });
        }
  
        form.addSubmitButton({
          label: 'Submit',
        });
  
        serverResponse.writePage(form);
      }
    };
  
    return {
      onRequest,
    };
  });
  
















// ======================================================SUITELET=============================================


/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/record', 'N/runtime'], 
function(serverWidget, url, https, record, runtime) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'Custom Form with Drag and Drop'
            });

            // Adding a field to contain the inputs
            var inputsField = form.addField({
                id: 'custpage_inputs_container',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'Inputs Container'
            });

            var htmlContent = '<div class="input-container" id="inputs-container"></div>';
            htmlContent += '<button id="clear-btn">Clear</button>';

            inputsField.defaultValue = htmlContent;

            // Adding client script to handle drag and drop functionality
            form.clientScriptModulePath = '/SuiteScripts/client_script_file.js';

            context.response.writePage(form);
        }
    }

    return {
        onRequest: onRequest
    };
});















// ---------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.....
//SUBLIST 


/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define([
  'N/log',
  'N/record',
  'N/runtime',
  'N/ui/serverWidget',
  'N/search',
],
(log, record, runtime, serverWidget, search) => {
  const onRequest = (scriptContext) => {
    const serverRequest = scriptContext.request;
    const serverResponse = scriptContext.response;

    if (scriptContext.request.method === 'GET') {
      // Return HTML content with the necessary script files
      const form = serverWidget.createForm({
        title: 'Drag & Drop Items',
      });

      // Set the path to your client script directly
      form.clientScriptModulePath = '/SuiteScripts/client_script_file.js';

      // Add item sublist
      const sublist = form.addSublist({
        id: 'custpage_items_sublist',
        label: 'Items',
        type: serverWidget.SublistType.LIST,
      });

      sublist.addField({
        id: 'custpage_item_text',
        type: serverWidget.FieldType.TEXT,
        label: 'Item',
      });



      
      // Fetch and print item list directly
      const itemSearch = search.create({
        type: search.Type.ITEM,
        columns: ['itemid'],
      });

      const itemSearchResults = itemSearch.run().getRange({
        start: 0,
        end: 100, // Adjust as needed
      });

      let lineCount = 0; // Manually track line count

      itemSearchResults.forEach((result) => {
        sublist.setSublistValue({
          id: 'custpage_item_text',
          line: lineCount,
          value: result.getValue('itemid'),
        });

        lineCount++; // Increment line count for each item
      });

      form.addSubmitButton({
        label: 'Submit',
      });

      scriptContext.response.writePage(form);
    }
  };

  return {
    onRequest,
  };
});
