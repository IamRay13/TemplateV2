document.addEventListener('DOMContentLoaded', function() {
    const actionDropdown = document.getElementById('actionReason');
    const textAreasDiv = document.getElementById('textAreas');
    const staticTextarea = document.getElementById('staticText');
    const dynamicTextarea = document.getElementById('dynamicText');

    const actionTextMap = {


	           projectDoctor: {
            static: `[FOR DOCTOR]
Hello, this is Raymond from AdaptHealth and its family of companies on a recorded line. 

I’m calling to check if Dr. [NAME] is currently practicing at your office. Additionally, I’d like to confirm whether this patient is under the care of this doctor.

[IF REP, FOR WHAT REASON WE ARE ASKING THIS]

- We just want to ensure we have the correct details to assist the patient with her care but If you’re comfortable, that is absolutely fine. We are going to contact the patient again next time then. Have a good day!

`,
            dynamic: `[VOICEMAIL] 

Hello, this is Raymond from AdaptHealth and its family of companies on a recorded line. 

I’m reaching out to confirm whether Dr. [Doctor's Name] is currently managing care for [Patient's Name]. Please return my call at your earliest convenience at 484-567-0666
Thank you!
	
-------

[IF REP DECLINED TO GIVE OUT INFORMATION]

- Understanding approach:  
I understand if you’re unable to share certain details due to privacy policies. Would you be able to guide me on the best way to verify this information?

- Clarification approach:  
I completely respect your office’s policies. Just to clarify, is there any way for [patient’s name] to confirm their status with Dr. [Doctor’s Name] directly?

- Alternative solution approach:  
I understand if this information can’t be shared. Is there another department or process we should go through to confirm the details we need?`
        },

	           projectPatient: {
            static: `[FOR PATIENT]
Hello, this is Raymond from AdaptHealth and its family of companies on a recorded line. 

Hello, I'm reaching out to confirm your pulmonologist or primary care physician to ensure our records are accurate. Could you let me know if Dr. NAME is overseeing your care?
`,
            dynamic: `[IF PATIENT DECLINED TO GIVE OUT INFORMATION]
- Respectful approach:  
I understand, and I completely respect your privacy. We just want to ensure we have the correct details to assist with your care. If you’re comfortable, even confirming your doctor’s name would be helpful.

- Reassurance approach:  
I get that this is personal, and you’re not required to share anything. We’re just trying to make sure we have the right information to help you as best as we can.

- Clarifying the purpose:  
I don’t mean to intrude—I just want to confirm your doctor’s name to ensure we’re contacting the right office for your care. If you prefer, you can share only what you’re comfortable with.
`
        },

	           projectPOA: {
            static: `Hello, I'm reaching out to verify the patient's pulmonologist or primary care physician to ensure our records are accurate. Could you confirm if Dr. NAME is overseeing their care?
`,
            dynamic: `[IF PATIENT DECLINED TO GIVE OUT INFORMATION]
- Respectful approach:  
I understand, and I completely respect your privacy. We just want to ensure we have the correct details to assist with your care. If you’re comfortable, even confirming your doctor’s name would be helpful.

- Reassurance approach:  
I get that this is personal, and you’re not required to share anything. We’re just trying to make sure we have the right information to help you as best as we can.

- Clarifying the purpose:  
I don’t mean to intrude—I just want to confirm your doctor’s name to ensure we’re contacting the right office for your care. If you prefer, you can share only what you’re comfortable with.
`
        },
	           ownScheduling: {
            static: `Hello @

We received a call from a patient under the branch BRANCHNAME. As we understand that you manage your own scheduling to complete restarts, we have updated the system with the basic information provided below:

Patient Information  
Code: CODE  
SO: CODE  
PU Ticket: CODE  

Address: CODE  
Best Contact Number: CODE  
Schedule Date: CODE  

Please let us know whether you would like us to send this to dispatch or if you will be reaching out to the patient directly to gather additional details, such as scheduling for another date, auto-pay setup, or credit card information.

Please message us back if there is something that we missed, thank you and have a great day!
`,
            dynamic: `[Scheduling] Sent an email to the branch, with all the information for scheduling`
        },
    };

    // 1. Get the current options (excluding the default "Select Action")
    const options = Array.from(actionDropdown.options).slice(1);

    // 2. Sort the options alphabetically based on their text content
    options.sort((a, b) => {
        const textA = a.textContent.toUpperCase();
        const textB = b.textContent.toUpperCase();
        return textA.localeCompare(textB);
    });

    // 3. Remove the existing options (except the default)
    while (actionDropdown.options.length > 1) {
        actionDropdown.remove(1);
    }

    // 4. Add the sorted options back to the dropdown
    options.forEach(option => {
        actionDropdown.add(option);
    });

    function autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    actionDropdown.addEventListener('change', function() {
        const selectedAction = this.value;
        if (actionTextMap[selectedAction]) {
            if (selectedAction === 'reKey') {
                // Compute today's date formatted as M/D/YYYY (e.g., 5/1/2025)
                const today = new Date();
                const month = today.getMonth() + 1; // getMonth returns 0-indexed month
                const day = today.getDate();
                const year = today.getFullYear();
                const formattedDate = `${month}/${day}/${year}`;
                
                // Set the static text dynamically using today's date
                staticTextarea.value = `${formattedDate} - Rekey to show the rental equipment the patient has. 

REKEYED SO#CODE: Rekey to show the rental equipment the patient has.`;
            } else {
                staticTextarea.value = actionTextMap[selectedAction].static;
            }
            dynamicTextarea.value = actionTextMap[selectedAction].dynamic;

            // Adjust textarea rows dynamically based on content
            staticTextarea.rows = staticTextarea.value.split('\n').length + 1;
            dynamicTextarea.rows = dynamicTextarea.value.split('\n').length + 1;

            // Auto-resize the textareas as a fallback mechanism
            setTimeout(() => {
                autoResize(staticTextarea);
                autoResize(dynamicTextarea);
            }, 0);

            textAreasDiv.style.display = 'block';
        } else {
            staticTextarea.value = '';
            dynamicTextarea.value = '';
            textAreasDiv.style.display = 'none';
        }
    });

    // Auto-resize textareas on user input
    staticTextarea.addEventListener('input', function() {
        autoResize(this);
    });
    dynamicTextarea.addEventListener('input', function() {
        autoResize(this);
    });
});