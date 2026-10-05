// Educational URL Safety Checker - 100% Client-Side Heuristics
// Checks:
// 1. Whether HTTPS is used
// 2. Whether the host name is an IP address
// 3. Whether suspicious keywords appear in the URL
// 4. Whether there are unusually many subdomains
// 5. Whether the URL is malformed
// 6. Whether URL character characteristics are present (@, % encoding, excessive hyphens, non-standard ports, punycode)

const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'verify', 'verification', 'update', 'account', 'banking',
  'secure', 'security', 'wallet', 'confirm', 'recovery', 'password', 'credential',
  'auth', 'authorize', 'free-gift', 'airdrop', 'claim', 'billing', 'urgent', 'suspended'
];

const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'tk', 'zip', 'mov', 'cam', 'work', 'click', 'buzz', 'ml', 'ga', 'cf', 'gq'
]);

export function evaluateUrl(inputUrl) {
  if (!inputUrl || inputUrl.trim().length === 0) {
    return {
      isValid: false,
      error: 'Please enter a URL to check (e.g., https://example.com).',
    };
  }

  let raw = inputUrl.trim();

  // Check 5: Whether the URL is malformed
  let isMalformed = false;
  let malformedReason = '';

  // Basic sanity check for spaces or invalid protocol
  if (/\s/.test(raw)) {
    isMalformed = true;
    malformedReason = 'URL contains unencoded whitespace characters.';
  }

  // Prepend https:// if protocol was omitted for parsing
  let normalized = raw;
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'https://' + normalized;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(normalized);
    // Extra validation on hostname
    if (!parsedUrl.hostname || !parsedUrl.hostname.includes('.') && !/^localhost$/i.test(parsedUrl.hostname)) {
      if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(parsedUrl.hostname)) {
        isMalformed = true;
        malformedReason = 'Hostname lacks a valid domain extension or TLD structure.';
      }
    }
  } catch {
    isMalformed = true;
    malformedReason = 'Malformed URL structure. Unable to parse hostname and protocol.';
  }

  if (isMalformed) {
    return {
      isValid: false,
      isMalformed: true,
      error: `Malformed URL: ${malformedReason}`,
      indicators: [
        {
          name: 'URL Format Integrity',
          detected: true,
          status: 'fail',
          severity: 'high',
          explanation: `The URL is syntactically malformed: ${malformedReason}. Legitimate links follow RFC 3986 URI specifications.`
        }
      ]
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const protocol = parsedUrl.protocol;
  const pathname = parsedUrl.pathname.toLowerCase();
  const search = parsedUrl.search.toLowerCase();
  const port = parsedUrl.port;
  const fullUrl = parsedUrl.href;

  const indicators = [];
  let threatScore = 0; // 0 to 100

  // 1. Check whether HTTPS is used
  const isHttps = protocol === 'https:';
  if (!isHttps) {
    threatScore += 25;
    indicators.push({
      name: 'Transport Protocol (HTTPS)',
      detected: true,
      status: 'warning',
      severity: 'medium',
      title: 'Insecure HTTP Protocol Detected',
      explanation: 'The link transmits over unencrypted HTTP. Any credentials or sensitive data entered can be intercepted in transit via eavesdropping or Man-in-the-Middle attacks.'
    });
  } else {
    indicators.push({
      name: 'Transport Protocol (HTTPS)',
      detected: false,
      status: 'pass',
      severity: 'low',
      title: 'Encrypted HTTPS Protocol Active',
      explanation: 'Uses Transport Layer Security (TLS/SSL) encryption for transit privacy.'
    });
  }

  // 2. Check whether the host name is an IP address
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || (hostname.startsWith('[') && hostname.endsWith(']'));
  if (isIpAddress) {
    threatScore += 35;
    indicators.push({
      name: 'Host Type (IP Address vs Domain)',
      detected: true,
      status: 'fail',
      severity: 'high',
      title: 'Direct IP Address Used as Hostname',
      explanation: `The hostname is a raw IP address (${hostname}) rather than a registered DNS domain name. Threat actors frequently host disposable phishing nodes directly on unindexed IP addresses.`
    });
  } else {
    indicators.push({
      name: 'Host Type (IP Address vs Domain)',
      detected: false,
      status: 'pass',
      severity: 'low',
      title: 'Named Domain Registration',
      explanation: 'The host resolves to a standard named domain rather than a raw numeric IP address.'
    });
  }

  // 3. Check whether suspicious keywords appear in the URL
  const combinedPathAndQuery = pathname + search + hostname;
  const matchedKeywords = SUSPICIOUS_KEYWORDS.filter(kw => combinedPathAndQuery.includes(kw));
  if (matchedKeywords.length > 0) {
    threatScore += Math.min(30, matchedKeywords.length * 15);
    indicators.push({
      name: 'Sensitive Keywords',
      detected: true,
      status: matchedKeywords.length > 1 ? 'fail' : 'warning',
      severity: matchedKeywords.length > 1 ? 'high' : 'medium',
      title: `Suspicious Action Keywords Found (${matchedKeywords.join(', ')})`,
      explanation: `The URL path or domain contains sensitive authentication terms: "${matchedKeywords.join(', ')}". Phishing links routinely embed these words to mimic account-recovery or verification screens.`
    });
  } else {
    indicators.push({
      name: 'Sensitive Keywords',
      detected: false,
      status: 'pass',
      severity: 'low',
      title: 'No Suspicious Action Keywords Detected',
      explanation: 'No typical credential-harvesting terms (login, banking, verify, wallet) were detected.'
    });
  }

  // 4. Check whether there are unusually many subdomains
  const hostParts = hostname.split('.');
  const hasManySubdomains = hostParts.length >= 4;
  if (hasManySubdomains) {
    threatScore += 25;
    indicators.push({
      name: 'Subdomain Stacking',
      detected: true,
      status: 'fail',
      severity: 'high',
      title: `Unusually High Subdomain Depth (${hostParts.length} levels)`,
      explanation: `The host contains ${hostParts.length} domain levels (e.g. "${hostname}"). Attackers frequently stack subdomains to trick mobile users who only see the first few words on screen.`
    });
  } else {
    indicators.push({
      name: 'Subdomain Stacking',
      detected: false,
      status: 'pass',
      severity: 'low',
      title: 'Normal Domain Depth',
      explanation: `Host structure is standard (${hostParts.length} levels) without excessive subdomain prefixing.`
    });
  }

  // 5. Check URL format / syntax integrity
  indicators.push({
    name: 'URL Format Integrity',
    detected: false,
    status: 'pass',
    severity: 'low',
    title: 'Valid URI Syntax',
    explanation: 'The URL conforms to standard RFC 3986 formatting specifications without syntax errors.'
  });

  // 6. Check whether deceptive URL character characteristics are present
  const charFlags = [];
  if (raw.includes('@')) {
    charFlags.push('Embedded "@" character (credential embedding / open redirection lure)');
    threatScore += 35;
  }
  if (/%[0-9a-fA-F]{2}/.test(raw)) {
    charFlags.push('Percent/hexadecimal character encoding (potential obfuscation)');
    threatScore += 15;
  }
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 3) {
    charFlags.push(`Excessive hyphen stacking (${hyphenCount} hyphens in domain)`);
    threatScore += 20;
  }
  if (hostname.includes('xn--')) {
    charFlags.push('Punycode / IDN homoglyph prefix (internationalized Cyrillic lookalike)');
    threatScore += 35;
  }
  const tld = hostParts.length > 1 ? hostParts[hostParts.length - 1] : '';
  if (SUSPICIOUS_TLDS.has(tld)) {
    charFlags.push(`High-abuse top-level domain (.${tld})`);
    threatScore += 25;
  }
  if (port && !['80', '443'].includes(port)) {
    charFlags.push(`Non-standard web communication port (:${port})`);
    threatScore += 20;
  }

  if (charFlags.length > 0) {
    indicators.push({
      name: 'URL Character Characteristics',
      detected: true,
      status: 'fail',
      severity: 'high',
      title: `Deceptive Character Patterns Detected (${charFlags.length})`,
      explanation: `The following anomalous character traits were identified: ${charFlags.join('; ')}.`
    });
  } else {
    indicators.push({
      name: 'URL Character Characteristics',
      detected: false,
      status: 'pass',
      severity: 'low',
      title: 'Standard Character Encoding',
      explanation: 'No credential obfuscation (@ symbol), excessive hyphens, punycode prefixes, or non-standard ports detected.'
    });
  }

  // Cap threat score between 0 and 100
  const normalizedThreat = Math.min(100, Math.max(0, threatScore));
  const safetyScore = 100 - normalizedThreat;

  // Display results: Low Risk, Suspicious, High Risk
  let riskLevel = 'Low Risk';
  let badgeColor = 'emerald';
  let riskSummary = 'This URL exhibits typical structural markers with no critical threat indicators.';

  if (normalizedThreat >= 60) {
    riskLevel = 'High Risk';
    badgeColor = 'red';
    riskSummary = 'CRITICAL WARNING: This URL exhibits multiple deceptive indicators consistent with malicious phishing or credential harvesting.';
  } else if (normalizedThreat >= 25) {
    riskLevel = 'Suspicious';
    badgeColor = 'amber';
    riskSummary = 'CAUTION: This URL shows suspicious structural anomalies. Inspect sender authenticity closely before clicking or entering details.';
  } else {
    riskLevel = 'Low Risk';
    badgeColor = 'emerald';
    riskSummary = 'Low risk detected based on standard client-side heuristics and encrypted HTTPS transport.';
  }

  return {
    isValid: true,
    url: fullUrl,
    hostname,
    protocol,
    threatScore: normalizedThreat,
    safetyScore,
    riskLevel,
    badgeColor,
    riskSummary,
    indicators,
    scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    educationalDisclaimer: 'This is an educational demonstration and heuristic analysis tool. It is not a replacement for professional threat intelligence feeds, real-time antivirus software, or an enterprise secure web gateway (SWG).'
  };
}

export const DEMO_URLS = [
  { label: 'Safe Bank Link', url: 'https://www.chase.com/personal/banking' },
  { label: 'Deceptive Phishing Link', url: 'http://secure-login.chase-account-verify.xyz/signin' },
  { label: 'Raw IP C2 Host', url: 'http://185.220.101.5/admin/login.php' },
  { label: 'Subdomain Stacking', url: 'https://login.verify.account.bofa.security-portal.xyz' },
  { label: 'Punycode Homoglyph', url: 'https://xn--e1afmkfd.xn--p1ai/auth' },
  { label: 'Malformed Syntax', url: 'https://bad link with spaces^and^symbols.com' },
];
