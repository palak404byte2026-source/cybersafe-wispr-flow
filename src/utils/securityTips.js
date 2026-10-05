// Six Useful Beginner-Friendly Cybersecurity Tips
// Covering:
// 1. Strong Passwords
// 2. Multi-Factor Authentication (MFA)
// 3. Phishing Awareness
// 4. Software Updates
// 5. Safe Browsing
// 6. Protecting Professional Information

export const SIX_SECURITY_TIPS = [
  {
    id: 'tip-passwords',
    category: 'strong passwords',
    title: 'Strong Passwords & Passphrases',
    iconName: 'Key',
    summary: 'Length beats complexity. Use a 4-word random passphrase (16+ chars) rather than short, complex codes.',
    details: 'Long passphrases like "sunset-coffee-bicycle-guitar" create an astronomical keyspace that resists GPU brute-force attacks for centuries, while remaining easy to remember. Never reuse passwords across accounts.',
    actionAdvice: 'Use a password vault to generate unique 16+ character passphrases for each service.'
  },
  {
    id: 'tip-mfa',
    category: 'multi-factor authentication',
    title: 'Multi-Factor Authentication (MFA)',
    iconName: 'ShieldCheck',
    summary: 'Add an extra verification layer to stop 99% of automated credential stuffing attacks.',
    details: 'MFA requires a second proof of identity—such as an authenticator app (TOTP) or biometric passkey—in addition to your password. Even if an attacker steals your password, they cannot gain access without your physical device.',
    actionAdvice: 'Prioritize authenticator apps or hardware keys over SMS text codes.'
  },
  {
    id: 'tip-phishing',
    category: 'phishing awareness',
    title: 'Phishing & Urgency Awareness',
    iconName: 'Fish',
    summary: 'Pause and inspect whenever an email, text, or call creates false panic or immediate deadlines.',
    details: 'Cybercriminals engineer psychological urgency (e.g., "Account suspended within 30 minutes!") to bypass rational scrutiny. Always inspect the sender domain and never click unverified links in urgent messages.',
    actionAdvice: 'Verify urgent requests via an independent phone number or official app.'
  },
  {
    id: 'tip-updates',
    category: 'software updates',
    title: 'Automatic Software Updates',
    iconName: 'RefreshCw',
    summary: 'Patch known vulnerabilities before attackers weaponize them against your devices.',
    details: 'Over 80% of successful breaches exploit security flaws for which vendor patches were already published. Keep your operating system, web browsers, and apps set to automatic updates to seal security gaps promptly.',
    actionAdvice: 'Enable automatic OS updates and restart weekly to apply kernel patches.'
  },
  {
    id: 'tip-browsing',
    category: 'safe browsing',
    title: 'Safe Browsing & Public Wi-Fi',
    iconName: 'Globe',
    summary: 'Check for HTTPS encryption and avoid unauthenticated public Wi-Fi networks.',
    details: 'Public networks at coffee shops and airports can be intercepted by rogue access points ("Evil Twin" attacks). Always verify that websites use HTTPS encryption, and enable a trusted VPN tunnel when traveling.',
    actionAdvice: 'Inspect the address bar for HTTPS and use mobile cellular hotspots when available.'
  },
  {
    id: 'tip-professional',
    category: 'protecting professional information',
    title: 'Protecting Professional Information',
    iconName: 'Briefcase',
    summary: 'Guard sensitive corporate data, employee identities, and credentials from social engineering.',
    details: 'Attackers harvest employee rosters from LinkedIn to stage targeted executive impersonation ("whaling") or fake IT helpdesk calls. Never share internal project details, client data, or 2FA codes on public social platforms.',
    actionAdvice: 'Separate personal and work accounts, and report unsolicited internal credential requests.'
  }
];

export const SECURITY_TIPS = SIX_SECURITY_TIPS;

export const CATEGORIES = [
  { id: 'all', label: 'All Disciplines', icon: 'Shield' },
  { id: 'strong passwords', label: 'Strong Passwords', icon: 'Key' },
  { id: 'multi-factor authentication', label: 'MFA Protection', icon: 'Shield' },
  { id: 'phishing awareness', label: 'Phishing Awareness', icon: 'Fish' },
  { id: 'software updates', label: 'Software Updates', icon: 'Smartphone' },
  { id: 'safe browsing', label: 'Safe Browsing', icon: 'Globe' },
  { id: 'protecting professional information', label: 'Workplace Security', icon: 'Wifi' },
];

export const GLOSSARY_TERMS = [
  {
    term: 'Zero-Day Vulnerability',
    definition: 'A software flaw known to threat actors before the software vendor has developed and distributed a fix.'
  },
  {
    term: 'Ransomware',
    definition: 'Malware that encrypts computer files and systems, demanding a ransom payment to restore access.'
  },
  {
    term: 'Man-in-the-Middle (MitM)',
    definition: 'An attack where the adversary secretly relays and intercepts communications between two parties.'
  },
  {
    term: 'Credential Stuffing',
    definition: 'Automated injection of leaked username and password pairs across multiple sites to compromise accounts.'
  },
  {
    term: 'Quishing (QR Phishing)',
    definition: 'Phishing attacks utilizing QR codes to hide malicious target URLs from visual human inspection.'
  },
  {
    term: 'Smishing',
    definition: 'Phishing executed via SMS text messages, often impersonating package carriers or banks.'
  }
];
