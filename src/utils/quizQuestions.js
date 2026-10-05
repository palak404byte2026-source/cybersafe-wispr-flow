// Phishing Awareness Quiz Question Scenarios

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    type: 'email',
    title: 'Urgent Message from Corporate CEO',
    difficulty: 'Intermediate',
    scenarioDescription: 'You receive an urgent message on Monday morning appearing to be from your company CEO.',
    sender: 'Tim Cook <ceo-urgent-office@mail-notifications-portal.com>',
    subject: 'CONFIDENTIAL: Urgent Wire Transfer & Gift Cards Needed',
    timestamp: 'Today, 8:42 AM',
    content: `Hi team,
I'm currently locked in an unannounced board acquisition meeting and cannot take calls. I need you to purchase 5 x $200 Apple/Google Play gift cards immediately for client retention rewards.
Scratch off the codes and send photos of the pins directly to this thread within the next 30 minutes. Keep this strictly between us until the press release.

Best regards,
CEO Executive Suite`,
    question: 'How should you respond to this email?',
    options: [
      { text: 'Purchase the cards immediately since the CEO specifically marked it urgent and confidential.', isCorrect: false },
      { text: 'Reply to the email asking for confirmation of the budget code.', isCorrect: false },
      { text: 'Recognize this as a classic "Business Email Compromise" (CEO Fraud) and verify via a known secondary channel or report to InfoSec.', isCorrect: true },
      { text: 'Forward the email to all coworkers to see if anyone else received it.', isCorrect: false }
    ],
    redFlags: [
      'Sender email address domain (@mail-notifications-portal.com) does not match legitimate company domain.',
      'Manufactured urgency ("within 30 minutes") designed to bypass logical scrutiny.',
      'Request for untraceable payment method (gift card PINs).',
      'Demand for secrecy ("keep this strictly between us").'
    ],
    explanation: 'Business Email Compromise (BEC) costs organizations billions each year. Attackers spoof executive names or register lookalike domains to pressure employees into hasty wire transfers or gift card purchases.'
  },
  {
    id: 2,
    type: 'sms',
    title: 'Failed Postal Delivery Notice (Smishing)',
    difficulty: 'Beginner',
    scenarioDescription: 'You receive a text notification on your mobile phone regarding an unexpected parcel.',
    sender: '+1 (833) 492-9102',
    subject: 'SMS Alert',
    timestamp: 'Yesterday, 3:15 PM',
    content: `[USPS Alert]: Your package #US9402948 cannot be delivered due to incomplete street address info. Update your delivery details within 24 hours to avoid return to sender: https://usps-redelivery-postage.top/claim`,
    question: 'Is this message safe or malicious?',
    options: [
      { text: 'Safe: USPS frequently texts tracking notices if your address has an error.', isCorrect: false },
      { text: 'Malicious: This is a Smishing scam using a fake .top domain to harvest credit card and identity details.', isCorrect: true },
      { text: 'Safe: As long as you only enter your home address and no password, there is no risk.', isCorrect: false },
      { text: 'Malicious: But you should reply "STOP" to unsubscribe immediately.', isCorrect: false }
    ],
    redFlags: [
      'Suspicious top-level domain (.top) rather than the official usps.com.',
      'Generic tracking code without prior package anticipation.',
      'Artificial deadline (24 hours) pressuring quick clicking.',
      'Replying "STOP" to random phishing SMS often confirms the phone number is active to spam networks.'
    ],
    explanation: 'Smishing attacks (SMS Phishing) exploit package tracking anxiety. Official postal carriers never ask you to pay small redelivery fees or input addresses on unofficial third-party domains.'
  },
  {
    id: 3,
    type: 'qr',
    title: 'Breakroom Coffee Machine QR Code (Quishing)',
    difficulty: 'Intermediate',
    scenarioDescription: 'A newly taped sticker appears on your office breakroom coffee machine promoting free drinks.',
    sender: 'Physical Sticker in Breakroom',
    subject: 'Employee Perks Program',
    timestamp: 'Printed Notice',
    content: `☕ FREE SPECIALTY COFFEE PROMOTION!
Scan this QR code with your smartphone camera to claim your $15 Starbucks / Peet's beverage voucher sponsored by HR Wellness.
[QR Code Graphic with label: https://hr-wellness-rewards.cam/auth]`,
    question: 'What is the primary risk associated with scanning this QR code?',
    options: [
      { text: 'QR codes are completely secure because phones automatically sandbox camera apps.', isCorrect: false },
      { text: 'It may execute a Quishing attack, redirecting your device to an unvetted malicious domain (.cam) harvesting corporate SSO credentials.', isCorrect: true },
      { text: 'The camera lens can be permanently infected with firmware malware.', isCorrect: false },
      { text: 'None, because physical access inside an office building guarantees legitimate origin.', isCorrect: false }
    ],
    redFlags: [
      'Physical QR stickers placed over existing signs (tampering / social engineering).',
      'Unverified external domain (.cam) masked behind the 2D matrix barcode.',
      'Lure of free rewards / financial incentives to trigger impulsive action.',
      'Bypasses corporate email firewalls since it occurs via physical smartphone camera.'
    ],
    explanation: 'Quishing (QR Code Phishing) is surging because users cannot visually inspect the destination URL before scanning. Attackers place stickers in public or corporate spaces to route users to fake Single Sign-On (SSO) login portals.'
  },
  {
    id: 4,
    type: 'alert',
    title: 'MFA Fatigue Attack (Push Notification Flood)',
    difficulty: 'Advanced',
    scenarioDescription: 'At 11:30 PM, your phone starts buzzing continuously with Authenticator app push prompts.',
    sender: 'Authenticator App Notification',
    subject: 'Sign-in Request: Dublin, Ireland (IP 194.26.29.11)',
    timestamp: '11:34 PM (14 requests received)',
    content: `Did you just attempt to sign into your Corporate Workstation?
Device: Windows 11 Chrome (IP: 194.26.29.11)
[Approve]  or  [Deny]

Followed by a WhatsApp message from "IT Helpdesk": "Sorry for the inconvenience, we are testing server updates. Please tap Approve once to halt the notifications."`,
    question: 'What is happening and what should you do?',
    options: [
      { text: 'Tap Approve so the phone stops buzzing and go back to sleep.', isCorrect: false },
      { text: 'Tap Approve because IT helpdesk reached out on WhatsApp to confirm it.', isCorrect: false },
      { text: 'Deny the requests, change your password immediately, and alert the Security Operations Center (SOC). Your password was already compromised.', isCorrect: true },
      { text: 'Turn your phone on Airplane Mode so the notifications stop.', isCorrect: false }
    ],
    redFlags: [
      'MFA push spamming (attacker already has your primary password and is attempting to wear you down).',
      'Suspicious foreign IP location you do not recognize.',
      'Out-of-band message via WhatsApp pretending to be IT helpdesk.',
      'Approval grants full unauthorized session token access.'
    ],
    explanation: 'This is an MFA Fatigue (or MFA Prompt Bombing) attack, famously used in major breaches against Uber and Cisco. The attacker knows the password and spams MFA approvals until the victim inadvertently taps "Approve" out of frustration.'
  },
  {
    id: 5,
    type: 'email',
    title: 'Resume Attachment Masquerading as PDF',
    difficulty: 'Advanced',
    scenarioDescription: 'You work in hiring/management and receive an email with an applicant resume.',
    sender: 'Sarah Jenkins <sarah.jenkins.design@gmail.com>',
    subject: 'Application: Senior UX/UI Designer - Portfolio Included',
    timestamp: 'Today, 10:14 AM',
    content: `Dear Hiring Manager,
I am excited to apply for the Senior Designer role. Due to NDA restrictions on web links, my complete portfolio case studies and resume are compiled in the attached document:

Attachment: Sarah_Jenkins_Portfolio_Resume.pdf.exe (8.4 MB)`,
    question: 'What critical danger is present in this attachment?',
    options: [
      { text: 'None, PDF files are universally safe to open in modern Acrobat readers.', isCorrect: false },
      { text: 'Double extension attack: The file is actually an executable (.exe) disguised with a fake .pdf name.', isCorrect: true },
      { text: 'The file size (8.4 MB) is too small to contain a real portfolio.', isCorrect: false },
      { text: 'It was sent from a gmail.com account instead of an enterprise email.', isCorrect: false }
    ],
    redFlags: [
      'Double extension: ".pdf.exe" tricks Windows users who have file extensions hidden into thinking it is a document.',
      'Unsolicited executable file that drops keyloggers, Trojans, or infostealers upon double-clicking.',
      'Social engineering justification ("NDA restrictions prevent web links") explaining away weird formats.'
    ],
    explanation: 'Double extension attacks exploit the default Windows setting where file extensions are hidden. A file named "document.pdf.exe" appears as "document.pdf" with an icon resembling Acrobat, but executes malicious binary code when opened.'
  },
  {
    id: 6,
    type: 'slack',
    title: 'Collaborative Google Doc with Microsoft Login',
    difficulty: 'Intermediate',
    scenarioDescription: 'A collaborator shares a link to a Google Docs spreadsheet via chat.',
    sender: 'Vendor Partner on Slack Connect',
    subject: 'Q3 Financial Projections',
    timestamp: 'Today, 2:05 PM',
    content: `Hey! Here is the finalized Q3 forecast we discussed on the partner call.
Click to view Google Doc: https://docs.google.com.financial-review-portal.xyz/spreadsheets/d/9xL201

When clicked, a page appears with a Microsoft 365 login modal saying: "Sign in with your corporate Microsoft Account to decrypt this Google Sheet."`,
    question: 'Why is this interaction an immediate red flag?',
    options: [
      { text: 'Cross-platform SSO: Google Docs never asks you to enter Microsoft credentials to view documents.', isCorrect: true },
      { text: 'Financial spreadsheets cannot be hosted on cloud services without enterprise certification.', isCorrect: false },
      { text: 'Slack Connect is inherently insecure and should not be used.', isCorrect: false },
      { text: 'The spreadsheet ID is too short.', isCorrect: false }
    ],
    redFlags: [
      'Cross-platform credential harvesting (requesting Microsoft credentials on a fake Google Doc).',
      'The domain is "financial-review-portal.xyz", not "google.com". Attackers used subdomains to mimic "docs.google.com".',
      'Claims document requires "decryption login".'
    ],
    explanation: 'Credential harvesting lures combine recognizable cloud brand aesthetics with fake authentication dialogs. Legitimate Google Docs never prompt for Microsoft Office 365 credentials.'
  }
];
