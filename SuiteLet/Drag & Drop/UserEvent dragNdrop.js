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
      if (scriptContext.type === scriptContext.UserEventType.VIEW) {
        const suiteletUrl = `${url.resolveScript({
            scriptId: 'customscript_bits_sl_dragndrops',
          deploymentId: 'customdeploy_bits_sl_dragndrops',
          returnExternalUrl: false,
        })}&recId=${scriptContext.newRecord.id}`;
  
        const clientScript = `window.open('${suiteletUrl}','_blank','width=1000,height=450');`;
  
        scriptContext.form.addButton({
          id: 'custpage_sort_item',
          label: 'Sort Items',
          functionName: clientScript,
        });
      }
    };
  
    /* const { form } = scriptContext;
      const sublist = form.getSublist({
        id: 'item',
      });
  
      // Add button to the sublist
      const buttonScript = `require(['N/url'], function(url) {
      const suiteletUrl = url.resolveScript({
          scriptId: '836',
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
  
      */
  
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
  