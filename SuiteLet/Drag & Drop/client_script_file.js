/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/log', 'N/https'], function(log, https) {
  
    function pageInit(scriptContext) {
      // Bind events when the page loads
      bindEvents();
    }
  
    function saveInputValue(inputId, value) {
      var suiteletUrl = 'https://td2892885.app.netsuite.com/app/site/hosting/scriptlet.nl?script=122&deploy=1'; 
      var requestBody = {
        inputId: inputId,
        value: value
      };
  
      try {
        var response = https.post({
          url: suiteletUrl,
          body: JSON.stringify(requestBody)
        });
  
        if (response.body) {
          // Process the response as needed
          log.debug('Response', response.body);
        }
      } catch (e) {
        log.error('Error saving input value', e);
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
      var sourceId = event.dataTransfer.getData('text/plain');
      var sourceElement = document.getElementById(sourceId);
      var targetElement = event.target;
  
      // Ensure we drop over an input field
      if (targetElement.nodeName === 'INPUT') {
        var sourceIndex = sourceId.split('_')[2];
        var targetIndex = targetElement.id.split('_')[2];
  
        // Swap values
        var temp = sourceElement.value;
        sourceElement.value = targetElement.value;
        targetElement.value = temp;
  
        // Save updated input values
        saveInputValue(sourceId, sourceElement.value);
        saveInputValue(targetElement.id, targetElement.value);
      }
    }
  
    function bindEvents() {
      var inputs = document.querySelectorAll('input[type="text"]');
      inputs.forEach(function(input) {
        input.setAttribute('draggable', 'true'); 
        input.addEventListener('dragstart', handleDragStart);
        input.addEventListener('dragover', handleDragOver);
        input.addEventListener('drop', handleDrop);
      });
  
      // Bind events for dragging from anywhere
      document.addEventListener('dragstart', function(event) {
        if (event.target.nodeName === 'INPUT') {
          handleDragStart(event);
        }
      });
    }
  
    return {
      pageInit: pageInit
    };
  });
  










//   -----------------------------------------------------
// Logic of drag and drop functionality on the sublist


/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define(['N/log', 'N/https'], function(log, https) {
  
    function pageInit(scriptContext) {
      // Bind events when the page loads
      bindEvents();
    }
  
    function saveSublistData(sublistData) {
      var suiteletUrl = 'https://td2892885.app.netsuite.com/app/site/hosting/scriptlet.nl?script=122&deploy=1'; // Replace with your Suitelet URL
      var requestBody = {
        sublistData: JSON.stringify(sublistData)
      };
  
      var response = https.post({
        url: suiteletUrl,
        body: JSON.stringify(requestBody)
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
  
    function handleDrop(event, sublistData) {
      event.preventDefault();
      var sourceId = event.dataTransfer.getData('text/plain');
      var sourceElement = document.getElementById(sourceId);
      var targetElement = event.target;
  
      // Ensure we drop over a sublist row
      if (targetElement.nodeName === 'TR' && targetElement.dataset.index) {
        var sourceIndex = sourceElement.dataset.index;
        var targetIndex = targetElement.dataset.index;
  
        // Swap sublist items
        var temp = sublistData[sourceIndex];
        sublistData[sourceIndex] = sublistData[targetIndex];
        sublistData[targetIndex] = temp;
  
        // Save updated sublist data
        saveSublistData(sublistData);
      }
    }
  
    function bindEvents() {
      var sublistRows = document.querySelectorAll('.uir-list-row-tr');
      var sublistData = [];
  
      // Populate sublistData array with sublist row IDs
      sublistRows.forEach(function(row, index) {
        row.setAttribute('draggable', 'true'); // Enable sublist rows to be draggable
        row.dataset.index = index; // Assign index to each row
        sublistData.push(row.id);
        
        // Attach drag and drop event listeners to sublist rows
        row.addEventListener('dragstart', handleDragStart);
        row.addEventListener('dragover', handleDragOver);
        row.addEventListener('drop', function(event) {
          handleDrop(event, sublistData);
        });
      });
    }
  
    return {
      pageInit: pageInit
    };
  });




//-------------------------------------------logic 2 ----------------------------------------------------------------------------



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
  