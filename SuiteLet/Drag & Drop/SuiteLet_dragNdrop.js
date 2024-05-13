

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
            id:'submitBtn'
          });

          serverResponse.writePage(form);
        }
      };

      return {
        onRequest,
      };
    });













//
// /**
//  * @NApiVersion 2.1
//  * @NScriptType Suitelet
//  */
//
// define([
//       'N/record',
//       'N/runtime',
//       'N/ui/serverWidget',
//       'N/search',
//       'N/https',
//       'N/query',
//     ],
//     (record, runtime, serverWidget, search, https, query) => {
//       const customFields = {};
//       customFields.sublist = {
//         id: 'custpage_list_item_id',
//         item: 'custpage_list_item',
//         quantity: 'custpage_list_item_quantity',
//         amount: 'custpage_list_item_amount',
//
//       };



//       function getSalesOrderItem(salesOrder) {
//         const sqlQuery = `select
//              BUILTIN.DF(salesOrderLine.item),
//              salesOrderLine.quantity,
//              salesOrderLine.rate,
//         from
//             transaction salesOrder
//             left join
//                 transactionline  salesOrderLine
//                 on
//                   salesOrderLine.transaction = salesOrder.id
//
//       where
//           recordType                  = 'salesorder'
//      and
//           salesOrder.id=${salesOrder}`;
//         return query.runSuiteQL({ query: sqlQuery }).asMappedResults();
//       }



//       const onRequest = (scriptContext) => {
//         const serverRequest = scriptContext.request;
//         const serverResponse = scriptContext.response;
//         const recordId = serverRequest.parameters.recId || '';
//         if (!recordId) {
//           return;
//         }
//         if (serverRequest.method === 'GET') {
//           // Return HTML content with the necessary script files
//           const form = serverWidget.createForm({
//             title: 'Drag & Drop Items',
//           });
//
//           form.clientScriptModulePath = '/SuiteScripts/client_script_file.js';
//
//           // Add item sublist
//           const sublist = form.addSublist({
//             id: customFields.sublist.id,
//             type: serverWidget.SublistType.LIST,
//             label: 'Item',
//           });
//
//           sublist.addField({
//             id: customFields.sublist.item,
//             type: serverWidget.FieldType.TEXT,
//             label: 'Item',
//           });
//           sublist.addField({
//             id: customFields.sublist.quantity,
//             type: serverWidget.FieldType.TEXT,
//             label: 'Quantity',
//           });
//
//           sublist.addField({
//             id: customFields.sublist.amount,
//             type: serverWidget.FieldType.TEXT,
//             label: 'Rate',
//           });
//
//           const salesOrderItem = getSalesOrderItem(recordId);
//           for (let i = 0; i < salesOrderItem.length; i++) {
//             sublist.setSublistValue({
//               id: customFields.sublist.item,
//               line: i,
//               value: salesOrderItem[i].item,
//             });
//
//             sublist.setSublistValue({
//               id: customFields.sublist.quantity,
//               line: i,
//               value: salesOrderItem[i].quantity,
//             });
//
//             sublist.setSublistValue({
//               id: customFields.sublist.amount,
//               line: i,
//               value: salesOrderItem[i].rate,
//             });
//           }
//
//           form.addSubmitButton({
//             label: 'Submit',
//           });
//
//           serverResponse.writePage(form);
//         }
//       };
//
//       return {
//         onRequest,
//       };
//     });





