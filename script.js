document.addEventListener('DOMContentLoaded', function() {
    const actionDropdown = document.getElementById('actionReason');
    const textAreasDiv = document.getElementById('textAreas');
    const staticTextarea = document.getElementById('staticText');
    const dynamicTextarea = document.getElementById('dynamicText');

    const actionTextMap = {
        replacementNeeded: {
           static: `60Month Restart
Call ahead of time and provide the ETA.
Do not remove any oxygen equipment included on the delivery ticket to ensure proper billing.

Switch out the equipment and have the patient sign the delivery ticket (#CODE), the pickup/exchange form (#CODE), and the 60-month letter located in OTL.
2 liter flow

Set up Autopay if required.
For any questions, call 484-567-0666.`,
            dynamic: `[Scheduling] Insurance checked, I explained to the patient the O2 5 YEAR RENEWAL process and the patient understood, will continue with our services and requested for a replacement for the oxygen equipment.

Patient's permanent address is CODE,
the best phone number to contact is CODE
and patient is available on DATE for pick-up and delivery.`
        },
        declinedReplacement: {
            static: `60Month Restart
Call ahead of time and provide the ETA.
Do not remove any oxygen equipment included on the delivery ticket to ensure proper billing.

RUL Signature only to bill insurance and no need to swap (O₂). Have the patient sign the delivery ticket (#CODE), the pickup/exchange form (#CODE), and the 60-month letter located in OTL.
2 liter flow

Set up Autopay if required.
For any questions, call 484-567-0666.`,
            dynamic: `[Scheduling] Insurance checked, I explained to the patient the O2 5 YEAR RENEWAL process and the patient understood, will continue with our services but declined getting a replacement.

Patient's permanent address is CODE,
the best phone number to contact is CODE
and patient is available on DATE to sign the contract.`
        },
        checkAndReplace: {
            static: `60Month Restart
Call ahead of time and provide the ETA.
Do not remove any oxygen equipment included on the delivery ticket to ensure proper billing.

Check the O₂ equipment and only switch out if necessary. Have the patient sign the delivery ticket (#CODE), the pickup/exchange form (#CODE), and the 60-month letter located in OTL.
2 liter flow

Set up Autopay if required.
For any questions, call 484-567-0666.`,
            dynamic: `[Scheduling] Insurance checked, I explained to the patient the O2 5 YEAR RENEWAL process and the patient understood, will continue with our services but requested that we check the oxygen equipment and only replace if necessary.

Patient's permanent address is CODE,
the best phone number to contact is CODE
and patient is available on DATE for checking the oxygen equipment.`
        },

        

       mailOut: {
            static: `Subject: O2 5 YEAR RENEWAL

Hello,

I hope this email finds you well. I am writing to request confirmation on whether the address provided for our patient falls within your service area. 

The patient is willing to sign the contract to complete the O2 5 YEAR RENEWAL and prefers to receive the contract via postal mail.

Attached are the necessary documents for this process. Please include a self-addressed stamped envelope for the patient to return the signed documents.

Patient Information:  
• CODE  
• SO#CODE  
• PU ticket#CODE  

If further details are required, please let us know at your earliest convenience. Your prompt attention to this matter is appreciated.

Thank you,



`,
            dynamic: `[Scheduling] This patient is due for her 5-year requalification. We contacted the patient, she declined a replacement at this time, but willing to sign the contract for renewal but prefer to receive it via postal mail. ***Please send the RUL documents on [DATE]`
        },

       accountOnhold: {
            static: `Hello, James!

I hope this email finds you well. I am writing to inquire if you could assist a patient residing at [ADDRESS].

The patient is due for an O2 5 YEAR RENEWAL, and the account is currently on hold. Should we proceed with creating a new work order for the O2 5 YEAR RENEWAL, or send the account for branch review to address the hold?

If additional details are needed, please let us know. Your prompt attention to this matter is greatly appreciated.

Thank you and have a great day!
`,
            dynamic: `[Scheduling] The account is on hold, sent an email to CODE, will update once got a response from them.`
        },

       voiceMail: {
            static: `Hi, this is Raymond from AdaptHealth and its family of companies on a recorded line. 

This is regarding the 5-year renewal of your durable medical equipment and we received the documents that we need from your doctor.

For HIPAA compliance, could you please confirm your DATE OF BIRTH or ADDRESS before we proceed?

Your account will reach 5 years on [DATE]. 
As part of the renewal process, you'll need to sign a new  agreement to ensure insurance continues covering costs, including maintenance, repairs, replacement, and supplies that you are getting from the local office. 

1. Do you plan to continue with our services?

2. Are you having any issues with your oxygen equipment?

- If yes: Please provide the delivery date, your address, and your phone number.
- If no: How would you like to sign the contract—email, postal mail, or in person?

Thank you for your time. If you have any questions or need assistance, please call us at 484-567-0666.

`,
            dynamic: `[VOICEMAIL]

Hi! This is Raymond from AdaptHealth and its family of companies on a recorded line.

This is about 5-year renewal of your durable medical equipment and we received the documents that we need from your doctor. Give us a call back using 484-567-0666.

},

       billingIssue: {
            static: `Hello, Sabrina!

I hope this email finds you well. I am writing to inquire if you could assist a patient residing at ADDRESS

The patient is due for an O2 5 YEAR RENEWAL. The account is currently on hold, and it's unclear whether this is due to unresolved billing issues or another reason. We need confirmation on whether we can proceed with calling the patient to schedule a pick-up and exchange, or if the patient needs to settle the balance first. Please advise on the necessary steps to take.

If additional details are needed, please let us know. Your prompt attention to this matter is greatly appreciated.

Thank you and have a great day!

Personal information:
StLukes

`,
            dynamic: `[VOICEMAIL]

Hi! This is Raymond from AdaptHealth and its family of companies on a recorded line. 

This message is for [Patient's name]

We are reaching out to remind you that your account is due for a 5-year renewal and the good thing is that we have received all the documents that we need from your doctor.

However, we can't proceed with the 5-year renewal because your account is on hold due to an outstanding balance that you need to settle first and the number for the billing department are Billing [855] 389-4043.

Once this is settled, please call us back at 484-567-0666. Thank you!`
        },

       firstTouch: {
            static: `This patient is currently being reviewed by the Centralized RUL team.  If the patient calls in with any questions please transfer them to (484) 567-0666 or Purecloud call queue MedicareRestarts_adapthealth.  You can also email this team, 60monthrestarts@adapthealth.com for a status update.  

Patient has had Oxygen equipment for 60 months. If patient elects to not restart all oxygen equipment will need to be picked up and the patient will have to switch providers.  
****************************************** RUL **************************************************
Assessment Team Review: Q

Does the insurance cap?

Testing type: 6MWT
Patient Evaluation/Test Date:
Patient SpO2 on room air at rest: CODE%
Patient SpO2 on room air during exertion: CODE%
Patient SpO2 while wearing 02 at 2LPM with exertion CODE%

Testing Date: DATE, 6MWT CODE on 2LPM. Page 1
---------------------------------

Sam/Sim Results- 

E1390: 

Portability: 


`,
            dynamic: `What’s needed: 

| Item/s: E1390 &
| RUL Date: 

| Doctor call: 0/5
| GoScripts: 0/2
| Parachute: 0/2
| Patient Call: 0/3
| Faxes sent: 0/5

| Insurance: 
| Policy Number: 
| Checked Eligibility: Yes No
| DNC/DNF: Yes No
| GoScripts: Yes 
| Parachute: Yes 

| Doctor: 
(PECOS)
| NPI: 
| Phone Number: 
| Fax Number: 

| Patient Evaluation/Test Date: 
Patient Room air at rest: CODE%
Patient Room air during exertion: CODE%
Patient SpO2 while wearing 02 at 2LPM with exertion: CODE%
| Diagnoses: 
| Usage: 2LPM Oxygen via NC Continuous/Nocturnal
| Can SWO be used: Yes No

| Remark/s: We have valid testing, updated the clinical tab, and moved the testing to the OXRUL lists, but we cannot send the request for SWO/CMN until [DATE]. Flipped SB to Election pending Q.`
        },

       pocAvailability: {
            static: `Subject: POC Availability
 
Hello, Catherine!
 
I hope this email finds you well. I am writing to inquire if you could assist a patient residing at [ADDRESS].
 
This patient is due for a O2 5 YEAR RENEWAL, and we received a prescription for a POC for the patient and we would like to inquire if we have an available POC for this patient and I have attached the prescription.
 
If additional details are needed, please let us know. Your prompt attention to this matter is greatly appreciated.
 
Thank you and have a great day!
`,
            dynamic: `What’s needed: POC Availability / SWO

| Item/s: E1390 & E1392

| Doctor call: 0/5
| Patient Call: 0/3
| Faxes sent: 0/5

| Remark/s: Sent email to branch to inquire whether they have POC available for this patient.`
        },

       poc6LPM: {
            static: `Subject: POC Availability

Hello, Catherine!

I hope this email finds you well. I am writing to inquire if you could assist a patient residing at [ADDRESS].

We received a prescription for a POC for the patient, indicating a requirement of up to 6 LPM. We would like to confirm if we have a POC that can handle up to 6 LPM?

If additional details are needed, please let us know. Your prompt attention to this matter is greatly appreciated.

Thank you and have a great day!
`,
            dynamic: `What’s needed: POC Availability / SWO

| Item/s: E1390 & E1392

| Doctor call: 0/5
| Patient Call: 0/3
| Faxes sent: 0/5

| Remark/s: Sent email to branch to inquire whether they have POC available for this patient that goes up to 6LPM.`
        },

       disPatch: {
            static: `[Scheduling] Updated both work order and pick-up/exchange ticket and sent it to dispatch DATE.
`,
            dynamic: `CODE`
        },

       electionLive: {
            static: `IMPORTANT QUESTIONS:

1. Are you still using your oxygen therapy?
[] Yes / [] No

2. How often do you use your oxygen therapy?
[] Continuous: I use my oxygen therapy continuously, 24 hours a day. 
[] Nighttime Only: I use my oxygen therapy only at night while I sleep.
[] Daytime Only: I use my oxygen therapy during the day, but not at night.

3. What is the current liter flow setting on your oxygen equipment?

4. Can you please confirm your address?

----------------------
Doctor's Information:

5. Can you please provide the name of your pulmonologist or primary care physician?

6. How about the phone number for your doctor's office?

---------------------
Doctor Appointments:

7. When was your most recent appointment with your doctor regarding your oxygen?

8. Do you have any upcoming appointments scheduled with your doctor?

9. What is the physical address of your doctor's office?
`,
            dynamic: `Hi! This is Raymond from Adapthealth and its family of companies on a recorded line.

This message is for (PATIENT'S NAME)

This is regarding 5-year renewal of your oxygen. Your account reached the 5-years already, and we need to obtain updated documents from your doctor confirming that you are still in need of oxygen. Once we receive these documents, we can proceed with renewing your contract/agreement for another 5 years.

Remark/s: Called P#CODE to confirm the patient's PCP/Pulmonologist's, routed to VM. LVM.`
        },

       electionVoicemail: {
            static: `IMPORTANT QUESTIONS:

1. Are you still using your oxygen therapy?  
   - [] Yes  
   - [] No  

2. How often do you use your oxygen therapy?  
   - [] Continuous: I use my oxygen therapy 24 hours a day.  
   - [] Nighttime Only: I use it only while sleeping.  
   - [] Daytime Only: I use it during the day but not at night.  

3. What is the current liter flow setting on your oxygen equipment during at rest and with exertion?  

4. Can I confirm whether your home oxygen system can provide up to 10 liters per minute (LPM)?  

5. Can you please confirm your address?  

---

 Doctor's Information
6. Can you please provide the name of your pulmonologist or primary care physician?  

7. What is the phone number for your doctor's office?  

---

 Doctor Appointments
8. When was your most recent appointment with your doctor regarding your oxygen therapy?  

9. Do you have any upcoming appointments scheduled with your doctor?  

10. What is the physical address of your doctor's office?  
`,
            dynamic: `Hi! This is Raymond from Adapthealth and its family of companies on a recorded line.

This message is for (PATIENT'S NAME)

We're calling in regards to your durable medical equipment.

It is important that you call us back as soon as possible to ensure that we have the most up-to-date information on your account.

Our phone number is 484-567-0666 again that's 484-567-0666

Thank you and have a great day!`
        },

       blindDelivery: {
            static: `60Month Restart
Call ahead of time and provide the ETA.
Do not remove any oxygen equipment included on the delivery ticket to ensure proper billing.  

Proceed to drive by to the address if the patient does not answer the phone. Switch out the equipment and have the patient sign the delivery ticket (#CODE), the pickup/exchange form (#CODE), and the 60-month letter located in OTL.  
2 liter flow

Set up Autopay if required.  
For any questions, call 484-567-0666.  
`,
            dynamic: `[Scheduling] We have made several attempts to contact the patient without success. Set them up for blind delivery DATE.

[Scheduling] The phone number that we got for the patient is disconnected/no longer in service. Set them up for blind delivery DATE.
`
        },

       electronicSignature: {
            static: `Acceptable Electronic Signature Examples
. Chart Accepted by with provider's name
. Electronically signed by with provider's name
. Verified by with provider's name
. Reviewed by with provider's name
. Released by with provider's name
. Signed by with provider's name
. Signed before import by with provider's name
. Signed: John Smith, M.D. with provider's name
· Digitized signature: Handwritten and scanned into the computer
. This is an electronically verified report by John Smith, M.D.
. Authenticated by John Smith, M.D.
· Authorized by: John Smith, M.D.
· Digital signature: John Smith, M.D.
. Confirmed by with provider's name
. Closed by with provider's name
. Finalized by with provider's name
. Electronically approved by with provider's name
. Signature derived from controlled access password
`,
            homeFill: `These are the local branches that cannot provide Homefills anymore.
 
Marshall Tx office
AHS Plattsburgh
Halprin Syracuse
Halprin Binghamton
Halprin Canandaigua
TN Kingsport-61540
TN Kingsport Resp-I-Care- 61544
TN Johnson City-61542
TN Knoxville
TN Maryville
TN Oakridge
Adapt Health - Minnesota - United
Goulds - Bardstown
Goulds - Clarksville
Goulds - Dutchmans
KY Elizabethtown - 328
KY Lexington - 103
KY London - 330
KY Louisville - 327
KY Louisville Distribution Drive - 55528
KY Murray - 55501
KY Pikeville - 331
KY Richmond - 329
KY Somerset - 55507
NY Rochester RSWNY - 53515
RSWNY Cheektowaga`
        },

       reCert: {
            static: `Please use this as a guide especially if you are confused with checking insurances:

REQUAL 1 year NO payments
RECERT 1 year or more, but not five years, with payments.
RELEASE TO BILL if less than 1 year with payments for the new insurance.

REQUAL:
Stop reason: Requal/F2F/SWO Needed
WIP State: Requalification in process
Stop billing: None

RECERT:
Manual hold: Check and choose Recert SWO

RELEASE TO BILL:
Please consult the account to the Team leader before.

----------------------------------------------------------
RELEASE TO BILL FORMAT:
Patient Name: 
Patient ID: 
DOB: 
BT: 
 
INSURANCE: 
Started: DATE - with 3 payments

`,
            dynamic: `Update for Recertification Accounts

If short term:
- Manual Hold Reason = Recert SWO
- Stop Reason = O2 Renewal F2F/Testing Needed
- Stopped Billing = CMN Needed
- WIP = Re-cert in Process (for Aero and OHH)

Short term accounts are those which insurance has started from Jan 2023 onwards that are not CSS. This only applies to MCR Humana UHC Tricare insurances.

CSS meaning: Patient has Acute illness, Pneumonia, COVID. This can be found on patient's initial CMN.

- Manual Hold Reason = Recert SWO
- Stopped Billing = CMN Needed
- WIP = Re-cert in Process (for Aero and OHH)

FYI Everyone`
        },

       uploadedDocs: {
            static: `What’s Needed: SCHEDULING | Remark/s: This account is under my uploaded workload. The document we received falls under CODE and it's a CODE. New order has been created, no further action is needed.
`,
            dynamic: `CODE`
        },

       mediCare: {
            static: `What's needed: Scheduling/ 60 Month Restart
| RUL: 
| SWO Expiration: 
| Signed date: 
| Item/s: E1390 & 
| Insurance: 
| Comment/s:
We got valid testing and received signed SWO by CODE. 
Instructed not to log Medicare.
Created New Sales Order - CODE.
New Pickup/Exchange - CODE.
SB flipped to Restart Scheduled.
`,
            dynamic: `5-YR RUL is not due until the DATE. Please do not schedule it until then.

2LPM Oxygen Via NC At rest
2LPM Oxygen Via NC with exertion
2LPM via NC Continuous
2LPM via NC Hours of Sleep & PRN 
2LPM Bled into PAP / 60Month Restart
-----------------------------------------------
Please have patient sign 60-month letter when completing exchange/restart located in OTL.
-----------------------------------------------
CLAIM NOTE

RUL MET E1390 INITIAL 05032019
RUL MET E1392 INITIAL 362020
RUL MET E0431 INITIAL 362020
RUL MET K0738 INITIAL 362020
-----------------------------------------------
CSR, Scheduling
-----------------------------------------------
BL-E1390-5LPM
BL-K0738
BL-E1392
OXY PORTABILITY
BL-E0443

2LPM Oxygen Via NC At rest
2LPM Oxygen Via NC with exertion
2LPM via NC Continuous
2LPM via NC Hours of Sleep & PRN 
2LPM Bled into PAP`
        },

       nonMed: {
            static: `What's needed: Scheduling/ 60 Month Restart
| RUL: 
| CMN Expiration: 
| Signed date: 
| Item/s: E1390 &
| Insurance:  
| Comment/s:
We got valid testing and received signed CMN by CODE. 
Logged CMN.
Created New Sales Order - CODE.
New Pickup/Exchange - CODE.
SB flipped to Restart Scheduled.
`,
            dynamic: `5-YR RUL is not due until the DATE. Please do not schedule it until then.

2LPM Oxygen Via NC At rest
2LPM Oxygen Via NC with exertion
2LPM via NC Continuous
2LPM via NC Hours of Sleep & PRN 
2LPM Bled into PAP / 60Month Restart
-----------------------------------------------
Please have patient sign 60-month letter when completing exchange/restart located in OTL.
-----------------------------------------------
CLAIM NOTE

RUL MET E1390 INITIAL 05032019
RUL MET E1392 INITIAL 362020
RUL MET E0431 INITIAL 362020
RUL MET K0738 INITIAL 362020
-----------------------------------------------
CSR, Scheduling
-----------------------------------------------
BL-E1390-5LPM
BL-K0738
BL-E1392
OXY PORTABILITY
BL-E0443

2LPM Oxygen Via NC At rest
2LPM Oxygen Via NC with exertion
2LPM via NC Continuous
2LPM via NC Hours of Sleep & PRN 
2LPM Bled into PAP`
        },

       branchReview: {
            static: `Item(s): E1390 &
Sales Order(s): 
RCM Team: 60Month Restart
What is needed to resolve: The patient must sign 60Month letter if they wanted to continue with our services.
Contact Numbers Attempted: 
Number of Attempts Made: 3
Additional Information: Contacted the patient multiple times to get their account restarted but unsuccessful. Moved to Branch Review.
	
For where to direct your questions, please review the sales order Stop Reason. If the Stop Reason is:
ARP-Branch Review -  Contact the RCM Team listed above.
ARP-DOD Branch Review - Contact the local branch/region.
ARP 1-ASSET RECOVERY - Contact the Asset Recovery Team at assetrecovery@adapthealth.com.

If still unsure where to direct questions, reach out to your leadership and/or local RCM contacts.
`,
            dynamic: `[Scheduling] Contacted the patient multiple times to get their account restarted but unsuccessful. Moved to Branch Review.`
        },

       inQuiry: {
            static: `Subject: O2 5 YEAR RENEWAL /  Inquiry About Saturday Pick-Up and Delivery Services

Hi Shawn,

I hope this message finds you well.

I am writing to confirm if your team is available to handle pick-up and delivery services on Saturdays. This would greatly help us as the patient is not in good shape and his wife has work commitments during the week. Saturdays are the best option for them to get the replacement for his oxygen and sign the O2 5 YEAR RENEWAL documents.

Patient information:
CODE
SO#CODE
PU ticket#CODE

Could you please let us know if this is possible and any additional details we should be aware of?

Thank you for your assistance.

`,
            dynamic: `CODE`
        },

       inQuiry1: {
            static: `Hello Jose,

I hope you're doing well. I am writing on behalf of a patient regarding their delivery at the following address:

  6400 N CICERO AVE APT 410  
  LINCOLNWOOD, IL 60712-3448  
  USA

The delivery was originally scheduled for March 28, 2025, but it appears that no delivery was made on that date. We would like to inquire what is the best available date to reschedule this delivery for the patient?

Patient information:
CODE
SO#CODE
PU ticket#CODE

Thank you for your assistance. I appreciate your help and look forward to your reply.
`,
            dynamic: `[Scheduling] The delivery was originally scheduled for Date, but it appears that no delivery was made on that date. Sent email to CODE to ask which day if the best day for the pick-up and delivery so we can let the patient know.`
        },

       homeFill: {
            static: `These are the local branches that cannot provide Homefills anymore.
 
Marshall Tx office
AHS Plattsburgh
Halprin Syracuse
Halprin Binghamton
Halprin Canandaigua
TN Kingsport-61540
TN Kingsport Resp-I-Care- 61544
TN Johnson City-61542
TN Knoxville
TN Maryville
TN Oakridge
Adapt Health - Minnesota - United
Goulds - Bardstown
Goulds - Clarksville
Goulds - Dutchmans
KY Elizabethtown - 328
KY Lexington - 103
KY London - 330
KY Louisville - 327
KY Louisville Distribution Drive - 55528
KY Murray - 55501
KY Pikeville - 331
KY Richmond - 329
KY Somerset - 55507
NY Rochester RSWNY - 53515
RSWNY Cheektowaga
`,
            dynamic: `CODE`
        },

       parachute6Mwt: {
            static: `Good day! Patient is due for 5-year O2 requalification. Requesting a copy of a qualifying 6-minute walk test from any year to be used in requalifying patient. For questions, you may call 484-567-0666. Thank you!
`,
            dynamic: `CODE`
        },

       parachuteSwo: {
            static: `Hello, Patient is due for 60 Month Restart for their Oxygen. Please complete, sign and date attached CMN/SWO at your earliest convenience. If you have any questions, please feel free to call us at (484) 567-0666. Thank you for your help!
`,
            dynamic: `Good day! Just checking in on this order. We require a signed document to continue with the patient’s 5-year O2 requalification. Thank you and have a great day!`
        },

       noriDian: {
            static: ` Noridian Same and Similar Credentials
Username: raymond.tariao
Password: MVSu0XdzCRT13$?!
--------------------------
STL GoScript
Username: raymond.adapt
Password: MVSu0XdzCRT
--------------------------
Aerocare GoScript
Username: raymond.aerocare
Password: MVSu0XdzCRT
`,
            dynamic: `CODE`
        },

       pusBack: {
            static: `[Scheduling] Checked account and SO#CODE has error message/s: 

[PUT_THE_ERROR_MESSAGE_HERE]

updated it, to avoid getting this account as pushback. 
`,
            dynamic: `CODE`
        },

       nPi: {
            static: `1134303902
1417968751
1033480488
`,
            dynamic: `CODE`
        },

       swoRequirements: {
            static: `Standard Written Order
+ After the face-to-face encounter, the treating physician (physician, NP, CNS, or PA) must complete a Standard Written Order, which is a standard Medicare Written Order. Documentation of the face-to-face examination and the SWO must be in the supplier's possession before the supplier delivers the oxygen items and equipment. The SWO must include all of these items:


+ Beneficiary’s patient's name or MBI
+  Order Date
+  General description of the item i.e. Concentrator, Homefill, POC E reg, OCR
+  Physician's name or the physician's NPI number
+ The ordering practitioner's signature

Additional Adaphealth Order De
+ Quantity to be dispensed, if applicable
+ Treating Practitioner Name or NPI
+ Treating Practitioner’s signature

Additional AdaptHealth Order Details
+ Setting - LPM or FiO2 
+ Method of administration (via nasal cannula or mask) 
+ Duration or Length of Need
+ Frequency of use - Continuous, during exertion or during sleep 
+ Practitioners Signature date
`,
            dynamic: `CODE`
        },

       walkEr: {
            static: `[Scheduling] The patient's O2 5 YEAR RENEWAL is managed directly by the local branch representatives/branch manager. They may require credit card information from the patient to set up auto-pay, have limited availability of technicians/drivers, or need to schedule a specific delivery date to avoid conflicts with the delivery schedule. No further action is required.
`,
            dynamic: `THESE BRANCHES BELOW ARE TAKING CARE THEIR OWN SCHEDULING!

----------------------------------------------------
NC Mount Airy - 148 is being taken care by Holly Collins the Branch Manager, they only have 2 drivers.
NC Mount Airy Tech - Christopher Ayers
NC Mount Airy Tech - Garrett Richardson
 
----------------------------------------------------
All Family Medical Branches are being handled by these CSR's below.
CSR - Rhoshanda Walker
CSR - Anthony Cipoletti

----------------------------------------------------
Adapthealth Minnesota
CSR - Kirstin Fennel

----------------------------------------------------
ALL RSWNY

----------------------------------------------------
WeCaremedical
 
----------------------------------------------------
Bentonville

----------------------------------------------------
Wisconsin

----------------------------------------------------
NC Statesville - 58501


`
        },

       tranSition: {
            static: `O2 5 YEAR RENEWAL

`,
            dynamic: `Hello Michael,

I hope you are well. I'm writing regarding a patient's O2 5-Year RUL. The patient was originally set up at St. Luke's, but the nearest branch is Aerocare. Could you please confirm if the patient's address falls within your service area? If so, we kindly request your assistance in creating their account at Aerocare to complete the renewal.

The patient’s current address is:
CODE

Patient information:  
CODE

If additional details are needed, please let us know. Your prompt attention to this matter is greatly appreciated.

Thank you and have a great day!`
        },

       agedAccounts: {
            static: `[Scheduling Aged Cleanup Project] SO#CODE has been sitting in 1.1 Intake Processing for CODE days, created new SO#CODE to clear it from the aged accounts. No additional action is required at this time.

Recreated
`,
            dynamic: `[Scheduling Aged Cleanup Project] SO#CODE has been sitting in 1.4 Pending Scheduling for CODE days, created new SO#CODE to clear it from the aged accounts. No additional action is required at this time.

Recreated`
        },

       templateSwo: {
            static: `Good day,

The patient is due for their 60-month Oxygen Recertification. Kindly complete the CMN, please ensure that the dates and signature should be in the same format. 

Please have DOCTOR sign and fax it back to (484) 362-1480 at your earliest convenience.

Feel free to call us at (484) 567-0666 if you have any questions. 
Thank you for your prompt attention!
`,
            dynamic: `From: Tariao, Raymond 
Phone: (484) 567-0666 
Fax: (484) 362-1480

Phone: 4845670666 
Fax: 4843621480`
        },

       templateCmn: {
            static: `IMPORTANT!

The answer keys are located on the back of the sheet. We kindly request that the doctor accurately and completely fill out the form for insurance billing purposes on behalf of the patient, please ensure that the dates and signature should be in the same format. 

Please have DOCTOR sign and fax it back to (484) 362-1480 at your earliest convenience.

Feel free to call us at (484) 567-0666 if you have any questions. 
Thank you for your prompt attention!
`,
            dynamic: `From: Tariao, Raymond 
Phone: (484) 567-0666 
Fax: (484) 362-1480

Phone: 4845670666 
Fax: 4843621480`
        },

       sixMwt: {
            static: `Hello Good day! We would like to ask for 6MWT, Vitals showing SpO2 at 88% or below needed. Testing can be from any appointments. Call (484) 567-0666 with any questions. Thank you so much!


This patient’s insurance is requiring new oxygen saturations to be taken. In order to qualify for portable oxygen, there are 2 qualifying methods for testing:
1. Room air at rest sat of 88% or below
OR
2. Three step exercise test, documenting the following 3 sats:
A - O2 sat at rest without oxygen
B – O2 sat at exertion (walking or other) without oxygen. (88% or below to qualify)
C – O2 sat at exertion WITH the prescribed liter flow of O2.
The results of this testing must be documented in the patient’s chart along with the reason the O2 was ordered, and a copy of these chart notes should be faxed to (484) 362-1480
`,
            dynamic: `CODE`
        },

       humanaLookup: {
            static: `[Scheduling] The insurance policy has been updated to reflect the correct payer’s name, as verified through the Humana Lookup.
`,
            dynamic: `CODE`
        },

       reKey: {
            static: `4/24/2025 - Rekey to show the rental equipment the patient has. 

REKEYED SO#CODE: Rekey to show the rental equipment the patient has.
`,
            dynamic: `PT NAME: CODE 
PT ID: CODE 
SALES ORDER: CODE 
BT DATABASE: STLukes/OHH/Aerocare

BL-E1390-5LPM
BL-K0738
BL-E1392
OXY PORTABILITY
BL-E0443

2LPM Oxygen Via NC At rest
2LPM Oxygen Via NC with exertion
2LPM via NC Continuous
2LPM via NC Hours of Sleep & PRN 
2LPM Bled into PAP`
        },

       rekeyedOrder: {
            static: `Rekeyed order [CODE] can't be confirmed because of error/s. ERROR
ERROR
Updated it and it's good to go.
`,
            dynamic: `CODE`
        },

       missingTickets: {
            static: `O2 5 YEAR RENEWAL / MISSING DELIVERY TICKETS AND 60MONTH LETTER
`,
            dynamic: `Hello,

I hope this email finds you well. I am writing to request confirmation on whether the address provided for our patient falls within your service area.

Additionally, there was a confirmed pickup/exchange on [DATE] for the O2 5-Year RUL. However, we do not have the delivery ticket or the 60‑month letter on file. Could you please confirm if these documents are available at the local office?

Patient Information:  
• CODE  
• SO#CODE  
• PU ticket#CODE  

If you need any additional details, please let me know. Your prompt attention to this matter is appreciated.

Thank you,`
        },

       swoCmnexpiry: {
            static: `O2 5 YEAR RENEWAL
`,
            dynamic: `Hello, Shawn,

I hope this email finds you well. I am writing to request your assistance with an O2 5-Year Renewal for a patient residing at [ADDRESS]. We need to follow up on the pick-up and exchange process for the patient listed below, as the SWO/CMN we have on record is about to expire on [DATE].

It is important that we complete this process before the documents expire to avoid having to contact the patient's doctor again. Your help in coordinating the pick-up and ensuring a timely exchange would be greatly appreciated.

Patient information:
CODE
SO#CODE
PU ticket#CODE

If you require any additional details, please let me know. Thank you very much for your prompt attention to this matter.

Thank you, and have a great day!`
        },

	           highLiterflow: {
            static: `Medicare typically requires more than just a prescription to document that a patient’s oxygen needs have changed, especially when an increase in the oxygen flow rate is involved. While the written prescription is necessary, it generally must be supported by clinical documentation such as progress notes that clearly demonstrate the patient’s current condition, oxygen saturation levels, and any changes that justify the need for a higher liter flow.

Medicare guidelines for home oxygen therapy (for example, as detailed in the CMS Provider Documentation Manual and other related documents) require evidence of medical necessity. This evidence is often documented through face-to-face encounters and follow-up progress notes that include objective data (like blood gas results or oxygen saturation readings) and a detailed explanation of the patient’s current respiratory status. These progress notes ensure that the change from a lower to a higher liter flow is consistent with the patient’s clinical needs, which is crucial for continued coverage under Medicare.

In other words, although the new prescription is an important piece of documentation, having accompanying progress notes can be essential for supporting that the patient indeed requires the higher 6–10 LPM setting. This additional documentation helps demonstrate that the increased oxygen need is based on a thorough evaluation and is in compliance with Medicare’s coverage criteria. It might also help avoid disputes during the reimbursement process.
`,
            dynamic: `CODE`
        },

	           branChes: {
            static: `Aerocare
ALL We Care Medical (WEC) Branches
AR Bentonville
AR Russellville
AR Springdale
SC Walterboro 
TN Kingsport
WI New Berlin
WI Waukesha
WI Fort Atkinson
WI Racine
OK Norman
NC Statesville - 58501
Michigan
Northern Indiana

StLukes
TX Abilene
Adapthealth Minnesota handled by CSR - Kirstin Fennel
Adapthealth Minnesota Cambridge, New ULM and all Adapthealth MN
NC - Winston Salem
NC Mount Airy
other NC branch 
All Family Medical Branches are being handled by these CSR's below.
CSR - Rhoshanda Walker
CSR - Anthony Cipoletti

OHH
RSWNY
`,
            dynamic: `CODE`
        },

	    	           backPacking: {
            static: `Must to bring
 
- Camping Essentials  
  - Tent  
  - Sleeping pad  
  - Camping chair  
  - Headlight/Flashlight + batteries  
 
- Cooking Utensils  
  - Camping stove  
  - Pots  
  - Mug  
  - Butane (2 pcs)  
  - Torch  
 
- Clothing & Personal Care  
  - Slippers  
  - Personal hygiene items (toothbrush, toothpaste, etc.)  
  - Shampoo  
  - Soap  
  - Towel  
  - Sunscreen  
 
- Health & Safety  
  - Eye dropper  
  - Betadine (antiseptic)  
 
- Food & Hydration  
  - Water (2L)  
  - Pocari Sweat (electrolyte drink)  
 
- Tech & Accessories  
  - Powerbank  
`,
            dynamic: `Here's how to efficiently pack everything inside your bag for balance and easy access:
 
- Bottom Layer (Heavy & Bulky Items)  
  - Sleeping pad placed flat at the base for stability  
  - Tent tightly rolled and stacked on top of the sleeping pad  
  - Camping chair folded and positioned vertically at the side  
 
- Middle Layer (Cooking & Clothing Essentials)  
  - Pots stacked together and placed near the back corner  
  - Camping stove packed next to the pots for easy reach  
  - Butane canisters stored upright to prevent leaks  
  - Mug tucked inside the pots to save space  
  - Torch placed near cooking items for convenience  
  - Clothing items packed in a sealed bag for organization  
  - Towel rolled and placed along the side  
  - Sunscreen positioned where it's easy to retrieve  
 
- Top Layer (Frequently Needed Items)  
  - Flashlight or headlight stored in a small pouch for quick access  
  - Slippers placed near the top for convenience  
  - Powerbank secured in an easy-to-reach pocket  
  - Eye dropper and Betadine stored together in a small protective bag  
  - Water bottles placed upright at the top to avoid leaks  
  - Pocari Sweat positioned next to the water for easy reach  
  - Eggs packed in a secure container to prevent breakage  
  - Canned goods positioned near the top for easy access  
 
- Side & Front Pockets (Quick Grab Items)  
  - Sunscreen stored in an outer pocket for accessibility  
  - Flashlight positioned in a reachable side compartment  
  - Toiletry bag placed in a front pouch for quick access  
 
This arrangement ensures a balanced, accessible, and organized packing experience. Let me know if you'd like refinements!`
        },

	           futureFirsttouch: {
            static: `This patient is currently being reviewed by the Centralized RUL team.  If the patient calls in with any questions please transfer them to (484) 567-0666 or Purecloud call queue MedicareRestarts_adapthealth.  You can also email this team, 60monthrestarts@adapthealth.com for a status update.  

Patient has had Oxygen equipment for 60 months. If patient elects to not restart all oxygen equipment will need to be picked up and the patient will have to switch providers.  
******************************** RUL MM/DD/YYYY, please send SWO on MM/DD/YYYY ******************************
Assessment Team Review: Q

Does the insurance cap? 

Testing type: 6MWT
Patient Evaluation/Test Date:
Patient SpO2 on room air at rest: CODE%
Patient SpO2 on room air during exertion: CODE%
Patient SpO2 while wearing 02 at 2LPM with exertion CODE%

Testing Date: DATE, 6MWT CODE on 2LPM. Page 1
---------------------------------

Sam/Sim Results- 

E1390: 

Portability: 



`,
            dynamic: `What’s needed: SWO

| Item/s: E1390 &
| RUL Date: MM/DD/YYYY

| Doctor call: 0/5
| GoScripts: 0/2
| Parachute: 0/2
| Patient Call: 0/3
| Faxes sent: 0/5

| Insurance: 
| Policy Number: 
| Checked Eligibility: Yes No
| DNC/DNF: Yes No
| GoScripts: Yes 
| Parachute: Yes 

| Doctor: 
(PECOS)
| NPI: 
| Phone Number: 
| Fax Number: 

| Patient Evaluation/Test Date: 
Patient Room air at rest: CODE%
Patient Room air during exertion: CODE%
Patient SpO2 while wearing 02 at 2LPM with exertion: CODE%
| Diagnoses: 
| Usage: 2LPM Oxygen via NC Continuous/Nocturnal
| Can SWO be used: Yes No

| Remark/s: We have valid testing, updated the clinical tab, and moved the testing to the OXRUL lists, but we cannot send the request for SWO/CMN until [DATE]. Flipped SB to Election pending Q.`
        },

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

Hello, [Patient's Name]. I just wanted to check, who is your current doctor? We’re trying to make sure we have the right information.
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

	           CODE: {
            static: `CODE
`,
            dynamic: `CODE`
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
