// 5-Question Phishing Awareness Quiz covering all required themes:
// 1. Suspicious Links
// 2. Urgent Messages
// 3. Fake Login Pages
// 4. Unexpected Attachments
// 5. Requests for Sensitive Information

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    theme: 'Suspicious Links',
    title: 'Recognizing Malicious & Deceptive URLs',
    scenario: 'You receive an email claiming your bank detected an unauthorized charge. It urges you to "Review Transaction" via a link pointing to: http://secure-chase-portal.account-update.xyz/login',
    question: 'What is the primary indicator that this link is dangerous and suspicious?',
    options: [
      { text: 'The link uses insecure HTTP and the true domain is "account-update.xyz", not the official "chase.com".', isCorrect: true },
      { text: 'The link was sent during standard business banking hours.', isCorrect: false },
      { text: 'The email includes a clickable button rather than plain blue underlined text.', isCorrect: false },
      { text: 'The link requires you to login from a web browser instead of a phone app.', isCorrect: false }
    ],
    explanation: 'Attackers create lookalike subdomains (like "secure-chase-portal") nested inside rogue domains ("account-update.xyz"). The absence of HTTPS encryption and the unofficial top-level domain (.xyz) are critical red flags for credential-harvesting phishing sites.'
  },
  {
    id: 2,
    theme: 'Urgent Messages',
    title: 'Manufactured Urgency & Panic Tactics',
    scenario: 'A high-priority alert pops up in your inbox: "URGENT ACTION REQUIRED: Your corporate account will be permanently deleted within 30 minutes due to missing compliance tokens! Click here to verify immediately."',
    question: 'Why do cybercriminals deliberately fabricate extreme urgency in their messages?',
    options: [
      { text: 'Enterprise cloud providers legally mandate 30-minute account termination countdowns.', isCorrect: false },
      { text: 'Urgency induces fear and panic, forcing victims to act hastily before critically analyzing the message.', isCorrect: true },
      { text: 'Sending high-priority countdowns automatically bypasses corporate spam and firewall filters.', isCorrect: false },
      { text: 'It proves the message was encrypted using military-grade real-time security certificates.', isCorrect: false }
    ],
    explanation: 'Social engineers manipulate psychological urgency (fear of account deletion, disciplinary action, or financial loss) to bypass logical judgment. Legitimate IT departments never threaten immediate 30-minute terminations without verified advance notice.'
  },
  {
    id: 3,
    theme: 'Fake Login Pages',
    title: 'Detecting Cloned Authentication Portals',
    scenario: 'You click a link to view a shared cloud file. The page looks 100% identical to the official Google Workspace login screen, but the URL in your browser address bar is: https://accounts.google.com-security-check.ru/signin',
    question: 'How can you definitively identify that this login page is a fake credential harvester?',
    options: [
      { text: 'The actual domain is "com-security-check.ru", not "google.com", despite the deceptive brand prefix.', isCorrect: true },
      { text: 'Legitimate login pages never use the official company logo or brand colors.', isCorrect: false },
      { text: 'The web page loaded in less than 2 seconds, which indicates it was pre-cached by malware.', isCorrect: false },
      { text: 'Google prohibits logging into accounts from desktop computer browsers.', isCorrect: false }
    ],
    explanation: 'Phishing kits replicate official login screens with pixel-perfect visual styling. The browser address bar is your source of truth: the destination domain here ends in "com-security-check.ru", completely unauthorized by Google.'
  },
  {
    id: 4,
    theme: 'Unexpected Attachments',
    title: 'Spotting Malicious File Extensions',
    scenario: 'An unexpected email from an unrecognized vendor arrives with the subject "Overdue Invoice #9142 - Immediate Payment Demanded". Attached is a file labeled: Invoice_March_2026.pdf.exe (4.2 MB).',
    question: 'What is the safest and most appropriate way to handle this attachment?',
    options: [
      { text: 'Double-click the file to verify if the invoice balance belongs to your company.', isCorrect: false },
      { text: 'Do not open it; double extensions (".pdf.exe") indicate an executable binary masquerading as a document.', isCorrect: true },
      { text: 'Forward the attachment to your personal phone where Windows executable files cannot cause harm.', isCorrect: false },
      { text: 'Rename the file to remove the ".exe" ending and open it in Adobe Acrobat.', isCorrect: false }
    ],
    explanation: 'Double extension attacks take advantage of operating systems that hide known file extensions by default. An ".exe" file is executable program code that, when clicked, installs trojans, keyloggers, or ransomware onto your workstation.'
  },
  {
    id: 5,
    theme: 'Requests for Sensitive Information',
    title: 'Guarding One-Time Passwords & Private Secrets',
    scenario: 'You receive a phone call or chat message from a person claiming to be "James from Corporate IT Support": "We are upgrading your two-factor security profile. Please read back the 6-digit verification code we just sent to your phone."',
    question: 'What is the correct protocol when someone requests your temporary 2FA code or OTP?',
    options: [
      { text: 'Read the 6-digit code to them promptly so they can complete your mandatory system upgrade.', isCorrect: false },
      { text: 'Never disclose the code; legitimate IT staff and service providers will never request your private 2FA codes.', isCorrect: true },
      { text: 'Ask for their employee badge ID number and manager name, then provide the code.', isCorrect: false },
      { text: 'Text the code back to the phone number that generated it instead of saying it out loud.', isCorrect: false }
    ],
    explanation: 'One-Time Passwords (OTPs) and 2FA prompts are confidential security keys intended solely for your personal login session. Attackers already know your password and are attempting to intercept your 2FA token to execute an account takeover.'
  }
];
