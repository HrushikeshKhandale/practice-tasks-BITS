/**

 * @NApiVersion 2.1
 * @NScriptType SuiteLet
 */

define(['N/ui/serverWidget','N/search'], (serverWidget,search) => {
    const onRequest = (scriptContext) => {
        const form = serverWidget.createForm({
            title: 'Custom Form',
        })


        // fieldgroup
        form.addFieldGroup({
            id: 'mygroup',
            label: 'Personal Information',

        })

        const name = form.addField({
            id: 'myname',
            type: serverWidget.FieldType.TEXT,
            label: 'NAME',
            container: 'mygroup'
        }).isMandatory=true;

        const email = form.addField({
            id: 'myemail',
            type: serverWidget.FieldType.EMAIL,
            label: 'EMAIL',
            container: 'mygroup'
        }).isMandatory=true;


        const phone = form.addField({
            id: 'myphone',
            type: serverWidget.FieldType.PHONE,
            label: "PHONE",
            container: 'mygroup'
        }).isMandatory=true;


        const btn = form.addSubmitButton({
            id: 'mysubmitbtn',
            label: 'Submit'
        })

      form.addResetButton({
            id: 'myresetbtn',
            label: 'Reset'
        })

      const sublist=form.addSublist({
        name:'mysublist',
        id: 'mysublist',
        label: 'Sublist',
        type:serverWidget.SublistType.LIST
      })

      sublist.addField({
        id:'custp_checkbox',
        type:serverWidget.FieldType.CHECKBOX,
        label:'SELECT'
      })

      sublist.addField({
        id:'custp_customer',
        type:serverWidget.FieldType.TEXT,
        label:'CUSTOMER'
      })

      sublist.addField({
        id:'custp_internalid',
        type:serverWidget.FieldType.CHECKBOX,
        label:"INTERNAL ID"
      })

      sublist.addMarkAllButtons();

      const mySearch=search.load({
        id:'customsearch184'
      })

      var lineCounter=0;

      mySearch.run().each((result)=>{
        const entity=result.getValue({
          name:'entity'
        })

        let tranid=result.getValue('tranid')
        let id=result.id;

 
        sublist.setSublistValue({
          id: 'custp_checkbox',
          line: lineCounter,
          value: entity[i]
});

        lineCounter++;
        return true
})
      


        scriptContext.response.writePage(form)
    }

    return {
        onRequest
    }
})

















// /**

//  * @NApiVersion 2.1
//  * @NScriptType SuiteLet
//  */

// define(['N/ui/serverWidget'], (serverWidget) => {
//     const onRequest = (scriptContext) => {
//         const form = serverWidget.createForm({
//             title: 'Custom Form',
//         })


//         // fieldgroup
//         form.addFieldGroup({
//             id: 'mygroup',
//             label: 'Personal Information',

//         })

//         const name = form.addField({
//             id: 'myname',
//             type: serverWidget.FieldType.TEXT,
//             label: 'NAME',
//             container: 'mygroup'
//         }).isMandatory=true;

//         const email = form.addField({
//             id: 'myemail',
//             type: serverWidget.FieldType.EMAIL,
//             label: 'EMAIL',
//             container: 'mygroup'
//         }).isMandatory=true;


//         const phone = form.addField({
//             id: 'myphone',
//             type: serverWidget.FieldType.PHONE,
//             label: "PHONE",
//             container: 'mygroup'
//         }).isMandatory=true;


//         const btn = form.addSubmitButton({
//             id: 'mybtn',
//             label: 'Submit'
//         })

//         // SUBLIST


//         form.addTab({
//             id: 'hobby',
//             label: 'Hobby'
//         })

//         const hobbiesSublist = form.addSublist({
//             name: 'hobbies',
//             id: 'hobbies',
//             label: 'Hobbies',
//             type: serverWidget.SublistType.EDITOR,
//             tab: 'hobby',
//         })


//          hobbiesSublist.addField({
//             id: 'sketching',
//             label: 'Sketching',
//             type: serverWidget.FieldType.CHECKBOX,
//         })

         

//          hobbiesSublist.addField({
//             id: 'singing',
//             label: 'singing',
//             type: serverWidget.FieldType.CHECKBOX,
//         })



//         // SKILLS

//         form.addTab({
//             id: 'skill',
//             label: 'Skill'
//         })


//         const skillSublist = form.addSublist({
//             name: 'skills',
//             id: 'skills',
//             label: 'Skills',
//             type: serverWidget.SublistType.LIST,
//             tab: 'skill',
//         })


//         scriptContext.response.writePage(form)
//     }

//     return {
//         onRequest
//     }
// })

