// SUITELET SCRIPT CODE


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
        sublist.addField({
          id: 'custpage_quantity',
          type: serverWidget.FieldType.TEXT,
          label: 'Quantity',
        });
  
        sublist.addField({
          id: 'custpage_amount',
          type: serverWidget.FieldType.TEXT,
          label: 'Amount',
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
  
          const quantity = salesOrder.getSublistText({
            sublistId: 'item',
            fieldId: 'quantity',
            line: i,
          });
  
          const amount = salesOrder.getSublistText({
            sublistId: 'item',
            fieldId: 'amount',
            line: i,
          });
  
          sublist.setSublistValue({
            id: 'custpage_item_text',
            line: i,
            value: itemName,
          });
  
          sublist.setSublistValue({
            id: 'custpage_quantity',
            line: i,
            value: quantity,
          });
          sublist.setSublistValue({
            id: 'custpage_amount',
            line: i,
            value: amount,
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

  













//   CLIENTSCRIPT CODE



/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define(['N/log', 'N/https'], (log, https) => {
    function pageInit(scriptContext) {
      // Bind events when the page loads
      bindEvents();
    }
  
    function saveSublistData(sublistData) {
      const suiteletUrl = 'https://td2892885.app.netsuite.com/app/site/hosting/scriptlet.nl?script=122&deploy=1'; // Replace with your Suitelet URL
      const requestBody = {
        sublistData: JSON.stringify(sublistData),
      };
  
      const response = https.post({
        url: suiteletUrl,
        body: JSON.stringify(requestBody),
      });
  
      if (response.body) {
        // Process the response as needed
        log.debug('Response', response.body);
      }
    }
  
    function handleDragStart(event) {
      event.dataTransfer.setData('text/plain', event.target.id);
    }
  
    function handleDragOver(event) {
      event.preventDefault();
    }
  
    function handleDrop(event) {
      event.preventDefault();
      const sourceId = event.dataTransfer.getData('text/plain');
      const sourceElement = document.getElementById(sourceId);
      const targetElement = event.target.closest('tr');
  
      // Ensure we drop over a sublist row
      if (targetElement && targetElement.dataset.index) {
        const sourceIndex = parseInt(sourceElement.dataset.index);
        const targetIndex = parseInt(targetElement.dataset.index);
  
        // Swap sublist items
        const sublistRows = document.querySelectorAll('.uir-list-row-tr');
        const sublistData = Array.from(sublistRows).map((row) => row.id);
        const temp = sublistData[sourceIndex];
        sublistData[sourceIndex] = sublistData[targetIndex];
        sublistData[targetIndex] = temp;
  
        // Reorder DOM elements
        const parent = sourceElement.parentNode;
        const nextSibling = targetElement.nextElementSibling;
        parent.insertBefore(sourceElement, nextSibling);
  
        // Save updated sublist data
        saveSublistData(sublistData);
      }
    }
  
    function bindEvents() {
      const sublistRows = document.querySelectorAll('.uir-list-row-tr');
  
      // Attach dragstart event listeners to sublist rows
      sublistRows.forEach((row, index) => {
        row.setAttribute('draggable', 'true'); // Enable sublist rows to be draggable
        row.dataset.index = index; // Assign index to each row
        row.addEventListener('dragstart', handleDragStart);
      });
  
      // Attach dragover and drop event listeners to the document
      document.addEventListener('dragover', handleDragOver);
      document.addEventListener('drop', handleDrop);
    }
  
    return {
      pageInit,
    };
  });
  





//   USER-EVENT SCRIPT CODE


/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([
    'N/record',
    'N/search',
    'N/query',
    'N/url',
    'N/runtime',
  ],
  /**
       * @param{record} record
       * @param{search} search
       * @param{query} query
       * @param{url} url
       * @param{runtime} runtime
       */
  (record, search, query, url, runtime) => {
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
      /* if (scriptContext.type === scriptContext.UserEventType.VIEW) {
        const suiteletUrl = `${url.resolveScript({
          scriptId: 'customscript_bits_sl_dragndrops',
          deploymentId: 'customdeploy_bits_sl_dragndrops',
          returnExternalUrl: false,
        })}&recId=${scriptContext.newRecord.id}`;
  
        const clientScript = `require([], function() { window.open('${suiteletUrl}','_blank'); });`;
  
        scriptContext.form.addButton({
          id: 'custpage_update_item_sequence',
          label: 'item sequence',
          functionName: clientScript,
        });
      }
  
      */
  
      const { form } = scriptContext;
      const sublist = form.getSublist({
        id: 'item',
      });
  
      // Add button to the sublist
      const buttonScript = `require(['N/url'], function(url) { 
      const suiteletUrl = url.resolveScript({
          scriptId: '122',
          deploymentId: '1'
      });
      window.open(suiteletUrl, '_blank'); 
  });`;
      sublist.addButton({
        id: 'custpage_update_item_sequence',
        label: 'Item Sequence',
        functionName: buttonScript,
      });
    };
  
    /**
           * Defines the function definition that is executed before record is submitted.
           * @param {Object} scriptContext
           * @param {Record} scriptContext.newRecord - New record
           * @param {Record} scriptContext.oldRecord - Old record
           * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
           * @since 2015.2
           */
    const beforeSubmit = (scriptContext) => {
  
    };
  
    /**
           * Defines the function definition that is executed after record is submitted.
           * @param {Object} scriptContext
           * @param {Record} scriptContext.newRecord - New record
           * @param {Record} scriptContext.oldRecord - Old record
           * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
           * @since 2015.2
           */
    const afterSubmit = (scriptContext) => {
  
    };
  
    return { beforeLoad, beforeSubmit, afterSubmit };
  });
  