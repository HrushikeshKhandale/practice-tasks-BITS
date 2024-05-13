    /**
     * @NApiVersion 2.1
     * @NScriptType ClientScript
     */
    define(['N/log', 'N/https'], (log, https) => {
        function pageInit(scriptContext) {
            // Bind events when the page loads
            bindEvents();

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
                if (targetElement && targetElement.hasAttribute('data-index')) {
                    const sourceIndex = parseInt(sourceElement.dataset.index);
                    const targetIndex = parseInt(targetElement.dataset.index);

                    // Swap sublist items
                    const parent = sourceElement.parentNode;
                    const sublistRows = Array.from(parent.querySelectorAll('.uir-list-row-tr'));
                    const temp = sublistRows.splice(sourceIndex, 1)[0]; // Remove the source item

                    // Insert source item either before or after the target element
                    if (sourceIndex < targetIndex) {
                        // If source is before target, insert after the target
                        sublistRows.splice(targetIndex , 0, temp);
                    } else {
                        // If source is after target, insert after the target
                        sublistRows.splice(targetIndex, 0, temp);
                    }

                    // Reorder DOM elements and update data-index attributes
                    sublistRows.forEach((row, index) => {
                        parent.appendChild(row); // Append rows in the new order
                        row.dataset.index = index; // Update data-index attribute
                    });

                    // Save updated sublist data
                    saveSublistData(sublistRows.map(row => row.id));
                }
            }






            function saveSublistData() {
                const sublistRows = document.querySelectorAll('.uir-list-row-tr');
                const updatedData = [];

                sublistRows.forEach((row) => {
                    // Extract relevant data from each row
                    const id = row.id;
                    const index = parseInt(row.dataset.index);
                    // Push the data to the updatedData array
                    updatedData.push({ id, index });
                });
                // Now you have the updated positions in the updatedData array
                // You can then proceed to save or process this data as needed
                console.log(updatedData);
            }



            // click event listener to the submit button
            document.getElementById('submitBtn').addEventListener('click', sendData);

            function sendData() {
                const sublistRows = document.querySelectorAll('.uir-list-row-tr');
                const updatedData = [];

                sublistRows.forEach((row) => {
                    // Extract relevant data from each row
                    const id = row.id;
                    const index = parseInt(row.dataset.index);
                    // Push the data to the updatedData array
                    updatedData.push({ id, index });
                });

                // Send data to Suitelet using POST method
                sendPostRequest();
            }



            function sendPostRequest(data) {
                const url = 'https://td2892885.app.netsuite.com/app/site/hosting/scriptlet.nl?script=122&deploy=1';
                const payload = JSON.stringify(data);

                https.post.promise({
                    url: url,
                    body: payload,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((response) => {
                    log.debug('POST Request Response:', response.body);
                }).catch((error) => {
                    log.error('POST Request Error:', error);
                });
            }

        }


        return {
            pageInit,
        };
    });
