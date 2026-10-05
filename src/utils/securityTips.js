// Cybersecurity Tips, Best Practices & Threat Glossary

export const CATEGORIES = [
  { id: 'all', label: 'All Disciplines', icon: 'Shield' },
  { id: 'passwords', label: 'Password Hygiene', icon: 'Key' },
  { id: 'phishing', label: 'Phishing & Social Eng.', icon: 'Fish' },
  { id: 'browsing', label: 'Safe Browsing', icon: 'Globe' },
  { id: 'devices', label: 'Endpoint & Devices', icon: 'Smartphone' },
  { id: 'network', label: 'Network & Wi-Fi', icon: 'Wifi' },
];

export const SECURITY_TIPS = [
  {
    id: 'tip-1',
    category: 'passwords',
    title: 'Adopt Passphrases Over Complex Short Passwords',
    summary: 'A 4-word random passphrase like "correct-horse-battery-staple" is far harder to crack than "P@$$w0rd1" and much easier for humans to remember.',
    details: 'Entropy scales with length. A 16-character passphrase has an astronomical keyspace that resists distributed GPU cracking clusters for decades. Always ensure words are randomly combined rather than famous quotes.',
    impact: 'Critical',
    readTime: '2 min',
  },
  {
    id: 'tip-2',
    category: 'passwords',
    title: 'Migrate to FIDO2 / WebAuthn Hardware Passkeys',
    summary: 'Passkeys eliminate passwords entirely by using public-key cryptography tied to biometric device authentication (Touch ID, Face ID, YubiKey).',
    details: 'Unlike traditional passwords or SMS codes, passkeys are cryptographically bound to the exact origin domain. This makes them 100% immune to phishing and credential-stealing proxy websites.',
    impact: 'High',
    readTime: '3 min',
  },
  {
    id: 'tip-3',
    category: 'phishing',
    title: 'The 10-Second Pause Before Clicking',
    summary: 'Whenever an email or message demands immediate urgency, deliberately pause for 10 seconds to inspect the raw sender header and link destination.',
    details: 'Psychological urgency (fear, deadline, reward, curiosity) is engineered to suppress executive cognitive function. Hover over links to reveal the actual destination hostname before clicking.',
    impact: 'High',
    readTime: '1 min',
  },
  {
    id: 'tip-4',
    category: 'phishing',
    title: 'Beware of "Vishing" (Voice Phishing) & AI Deepfake Clones',
    summary: 'Threat actors now use 3-second audio samples from social media to clone voices of executives or relatives asking for immediate wire transfers.',
    details: 'Establish a private "family or company safe word" that must be verbally supplied during any emergency phone calls requesting money, password resets, or confidential access.',
    impact: 'Critical',
    readTime: '3 min',
  },
  {
    id: 'tip-5',
    category: 'browsing',
    title: 'Audit and Minimize Browser Extensions',
    summary: 'Browser plugins have permission to read keystrokes, cookies, and visited pages. Abandoned extensions are often acquired by malicious actors.',
    details: 'Uninstall all browser extensions you do not use weekly. Regularly review extension permissions and verify the developer reputation in the official Chrome Web Store or Firefox Add-ons.',
    impact: 'Medium',
    readTime: '2 min',
  },
  {
    id: 'tip-6',
    category: 'browsing',
    title: 'Always Inspect the Top-Level Domain (TLD) and Suffix',
    summary: 'Look at the domain name right before the first single slash ("/"). That is where your request is actually going.',
    details: 'In "https://google.com.malicious-site.xyz/login", the domain is malicious-site.xyz, not Google. Subdomains can be nested indefinitely by attackers to deceive human readers.',
    impact: 'High',
    readTime: '2 min',
  },
  {
    id: 'tip-7',
    category: 'devices',
    title: 'Enable Automatic Security Patches on All OS Platforms',
    summary: 'Most malware exploits vulnerabilities for which security patches have already been published weeks or months earlier.',
    details: 'Zero-day exploits are rare; N-day exploits targeting unpatched software account for over 80% of successful breaches. Keep Windows Update, macOS Update, and mobile OS auto-updates active.',
    impact: 'Critical',
    readTime: '2 min',
  },
  {
    id: 'tip-8',
    category: 'devices',
    title: 'Set Aggressive Screen Auto-Lock Timers (< 2 Minutes)',
    summary: 'An unattended unlocked laptop in a coffee shop or office hallway is an open door to physical intrusion and data exfiltration.',
    details: 'Physical access is total access. Configure your operating system to auto-lock within 1-2 minutes of inactivity, and train muscle memory to press Win+L (Windows) or Cmd+Ctrl+Q (Mac) when walking away.',
    impact: 'Medium',
    readTime: '1 min',
  },
  {
    id: 'tip-9',
    category: 'network',
    title: 'Treat All Public Wi-Fi Networks as Hostile',
    summary: 'Hotel, airport, and cafe Wi-Fi networks can be spoofed with cheap "Evil Twin" Wi-Fi pineapple devices that eavesdrop on unencrypted traffic.',
    details: 'Always enforce an encrypted VPN tunnel or utilize your mobile cellular hotspot instead of unauthenticated airport or coffee shop public Wi-Fi networks when conducting sensitive operations.',
    impact: 'High',
    readTime: '2 min',
  },
  {
    id: 'tip-10',
    category: 'network',
    title: 'Turn Off Auto-Connect for Wi-Fi and Bluetooth',
    summary: 'Devices broadcasting probe requests for known SSIDs ("AirportFreeWiFi", "Starbucks") can be tricked into automatically pairing with rogue access points.',
    details: 'Disable "Auto-Join Known Networks" on smartphones and laptops. Turn off Bluetooth when traveling through crowded transit hubs unless actively in use with trusted peripherals.',
    impact: 'Medium',
    readTime: '2 min',
  }
];

export const GLOSSARY_TERMS = [
  {
    term: 'Zero-Day Vulnerability',
    definition: 'A software security flaw that is known to attackers or researchers, but has no vendor patch available yet (zero days since disclosure).'
  },
  {
    term: 'Ransomware',
    definition: 'Extortion malware that encrypts files on the target device/network and demands cryptocurrency payment in exchange for a decryption key.'
  },
  {
    term: 'Man-in-the-Middle (MitM)',
    definition: 'An attack where the adversary secretly relays and alters communications between two parties who believe they are directly communicating.'
  },
  {
    term: 'Credential Stuffing',
    definition: 'Automated injection of stolen username/password pairs across hundreds of websites, exploiting users who reuse the same credentials.'
  },
  {
    term: 'Quishing',
    definition: 'Phishing executed via QR codes that camouflage malicious destination URLs from visual inspection and email security gateways.'
  },
  {
    term: 'Smishing',
    definition: 'Phishing delivered via Short Message Service (SMS) text messages, often posing as delivery alerts, banks, or emergency contacts.'
  },
  {
    term: 'Whaling',
    definition: 'A targeted spear-phishing attack directed specifically against high-profile executives, politicians, or senior directors.'
  },
  {
    term: 'Brute Force Attack',
    definition: 'A trial-and-error method using high-performance hardware to test millions or billions of password combinations until the correct one is found.'
  }
];
