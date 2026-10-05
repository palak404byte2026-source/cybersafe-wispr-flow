// URL Safety Evaluator - Client-Side Threat Intelligence & Heuristics

const SUSPICIOUS_TLDS = new Set([
  'zip', 'mov', 'xyz', 'top', 'tk', 'ml', 'ga', 'cf', 'gq', 'work', 'click', 'buzz',
  'country', 'cam', 'party', 'rest', 'fit', 'racing', 'download', 'stream', 'kim', 'science'
]);

const POPULAR_BRANDS = [
  { name: 'PayPal', patterns: [/paypa[l1i]/i, /pay-pal/i, /payp-al/i], legitimate: 'paypal.com' },
  { name: 'Google', patterns: [/g[o0][o0]g[l1]e/i, /goog1e/i], legitimate: 'google.com' },
  { name: 'Apple', patterns: [/app[l1i]e/i, /apple-id/i], legitimate: 'apple.com' },
  { name: 'Microsoft', patterns: [/micr[o0]s[o0]ft/i, /ms-verify/i, /office365/i], legitimate: 'microsoft.com' },
  { name: 'Amazon', patterns: [/am[a4]z[o0]n/i, /arnazon/i], legitimate: 'amazon.com' },
  { name: 'Netflix', patterns: [/netf[l1]ix/i, /netflx/i], legitimate: 'netflix.com' },
  { name: 'Chase Bank', patterns: [/chase-secure/i, /chase-verify/i], legitimate: 'chase.com' },
  { name: 'Meta / Facebook', patterns: [/faceb[o0][o0]k/i, /meta-support/i], legitimate: 'facebook.com' },
  { name: 'Coinbase', patterns: [/c[o0]inb[a4]se/i, /coin-base/i], legitimate: 'coinbase.com' },
  { name: 'Bank of America', patterns: [/bank[o0]famerica/i, /bofa-security/i], legitimate: 'bankofamerica.com' }
];

const PHISHING_KEYWORDS = [
  'login', 'signin', 'verify', 'verification', 'update', 'account', 'banking', 'secure',
  'security', 'wallet', 'confirm', 'recovery', 'password', 'credential', 'auth', 'authorize',
  'free-crypto', 'airdrop', 'claim-reward', 'giftcard', 'billing', 'urgent', 'suspended'
];

export function evaluateUrl(inputUrl) {
  if (!inputUrl || inputUrl.trim().length === 0) {
    return {
      isValid: false,
      error: 'Please enter a URL or domain to scan.',
    };
  }

  let raw = inputUrl.trim();
  if (!/^https?:\/\//i.test(raw)) {
    raw = 'https://' + raw;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(raw);
  } catch (err) {
    return {
      isValid: false,
      error: 'Invalid URL format. Please enter a valid web address (e.g., https://example.com).',
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const protocol = parsedUrl.protocol;
  const pathname = parsedUrl.pathname.toLowerCase();
  const search = parsedUrl.search.toLowerCase();
  const port = parsedUrl.port;
  const fullUrl = parsedUrl.href;

  const findings = [];
  let threatScore = 0; // 0 to 100

  // 1. Protocol check
  const isHttps = protocol === 'https:';
  if (!isHttps) {
    threatScore += 25;
    findings.push({
      category: 'Encryption',
      severity: 'medium',
      title: 'Insecure HTTP Protocol',
      description: 'The URL uses unencrypted HTTP. Data sent to this site can be intercepted by third parties.',
      status: 'fail'
    });
  } else {
    findings.push({
      category: 'Encryption',
      severity: 'safe',
      title: 'Valid SSL/TLS Protocol (HTTPS)',
      description: 'Communication is encrypted in transit between browser and server.',
      status: 'pass'
    });
  }

  // 2. IP Address as Hostname
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || hostname.startsWith('[') && hostname.endsWith(']');
  if (isIpAddress) {
    threatScore += 35;
    findings.push({
      category: 'Host Identity',
      severity: 'high',
      title: 'Raw IP Address Used as Hostname',
      description: `Target uses raw IP (${hostname}) instead of a registered domain, a common tactic for malicious C2 servers and disposable phishing nodes.`,
      status: 'fail'
    });
  } else {
    findings.push({
      category: 'Host Identity',
      severity: 'safe',
      title: 'Named Domain Architecture',
      description: 'Uses a formal DNS domain name rather than an unauthenticated IP address.',
      status: 'pass'
    });
  }

  // 3. TLD Analysis
  const hostParts = hostname.split('.');
  const tld = hostParts.length > 1 ? hostParts[hostParts.length - 1] : '';
  if (SUSPICIOUS_TLDS.has(tld)) {
    threatScore += 30;
    findings.push({
      category: 'Domain Registry',
      severity: 'high',
      title: `High-Risk TLD (Top-Level Domain): .${tld}`,
      description: `The .${tld} registry has statistically elevated abuse rates for zero-day malware, smishing, and disposable phishing landing pages.`,
      status: 'fail'
    });
  } else {
    findings.push({
      category: 'Domain Registry',
      severity: 'safe',
      title: `Standard Domain Registry (.${tld || 'com'})`,
      description: 'Domain uses a recognized general or geographic top-level domain.',
      status: 'pass'
    });
  }

  // 4. Punycode & Homoglyph detection (IDN Homograph attacks)
  const isPunycode = hostname.includes('xn--');
  const hasNonAscii = /[^\u0000-\u007F]/.test(hostname);
  if (isPunycode || hasNonAscii) {
    threatScore += 40;
    findings.push({
      category: 'Deception Detection',
      severity: 'critical',
      title: 'Internationalized Domain Name (Punycode / Homoglyph)',
      description: 'URL contains Punycode or non-ASCII characters, often used to mimic trusted ASCII domains (e.g. Cyrillic letters looking identical to Latin letters).',
      status: 'fail'
    });
  }

  // 5. Typosquatting / Brand Impersonation
  let detectedBrandSquat = null;
  for (const brand of POPULAR_BRANDS) {
    const isMatchingBrand = brand.patterns.some(pattern => pattern.test(hostname));
    const isRealDomain = hostname === brand.legitimate || hostname.endsWith('.' + brand.legitimate);
    if (isMatchingBrand && !isRealDomain) {
      detectedBrandSquat = brand;
      break;
    }
  }

  if (detectedBrandSquat) {
    threatScore += 45;
    findings.push({
      category: 'Brand Protection',
      severity: 'critical',
      title: `Potential Brand Impersonation: ${detectedBrandSquat.name}`,
      description: `The domain mimics legitimate brand "${detectedBrandSquat.name}" (${detectedBrandSquat.legitimate}), but is hosted on an unauthorized host (${hostname}).`,
      status: 'fail'
    });
  }

  // 6. Subdomain abuse
  if (hostParts.length >= 4) {
    threatScore += 20;
    findings.push({
      category: 'Structure',
      severity: 'medium',
      title: 'Excessive Subdomain Stacking',
      description: `The hostname has ${hostParts.length} levels. Attackers often prefix reputable names as subdomains (e.g., login.bank.xyz.evil.com).`,
      status: 'fail'
    });
  }

  // 7. Embedded Credentials / Redirection Trick
  if (fullUrl.includes('@')) {
    threatScore += 40;
    findings.push({
      category: 'URL Syntax',
      severity: 'critical',
      title: 'Credential Obfuscation / Open Redirect (@ symbol)',
      description: 'The URL uses the "@" syntax, which misleads users into thinking they are visiting the address before the @ symbol.',
      status: 'fail'
    });
  }

  // 8. Phishing Keywords in Path or Query
  const combinedPathAndQuery = pathname + search;
  const matchedKeywords = PHISHING_KEYWORDS.filter(kw => combinedPathAndQuery.includes(kw));
  if (matchedKeywords.length > 0) {
    threatScore += Math.min(25, matchedKeywords.length * 10);
    findings.push({
      category: 'Semantic Analysis',
      severity: matchedKeywords.length > 2 ? 'high' : 'medium',
      title: `Sensitive Action Keywords Detected (${matchedKeywords.slice(0, 3).join(', ')})`,
      description: `URL path/parameters contain words frequently targeted for credential harvesting: "${matchedKeywords.join(', ')}".`,
      status: 'warning'
    });
  }

  // 9. Excessive Length
  if (fullUrl.length > 100) {
    threatScore += 10;
    findings.push({
      category: 'Anatomy',
      severity: 'low',
      title: `Excessive URL Length (${fullUrl.length} characters)`,
      description: 'Unusually long URLs are sometimes used to hide the true destination off-screen on mobile devices.',
      status: 'warning'
    });
  }

  // 10. Non-standard Port
  if (port && !['80', '443'].includes(port)) {
    threatScore += 20;
    findings.push({
      category: 'Port Analysis',
      severity: 'medium',
      title: `Non-Standard Web Port (${port})`,
      description: `Target communicates over custom port :${port}, uncommon for standard commercial web services.`,
      status: 'fail'
    });
  }

  // Cap threatScore between 0 and 100
  const normalizedThreat = Math.min(100, Math.max(0, threatScore));
  const safetyScore = 100 - normalizedThreat;

  let riskLevel = 'Safe';
  let badgeColor = 'emerald';
  let recommendation = 'This URL displays normal structural markers and no immediate deception flags.';

  if (normalizedThreat >= 70) {
    riskLevel = 'Dangerous Phishing Risk';
    badgeColor = 'red';
    recommendation = 'DO NOT visit this link or enter any personal credentials. It displays critical indicators of phishing or malicious deception.';
  } else if (normalizedThreat >= 40) {
    riskLevel = 'Suspicious / Untrusted';
    badgeColor = 'amber';
    recommendation = 'Exercise caution. Several heuristic markers deviate from standard trusted services.';
  } else if (normalizedThreat >= 15) {
    riskLevel = 'Low Risk';
    badgeColor = 'cyan';
    recommendation = 'Minor security cautions found. Verify sender authenticity before interacting.';
  }

  return {
    isValid: true,
    url: fullUrl,
    hostname,
    protocol,
    tld,
    threatScore: normalizedThreat,
    safetyScore,
    riskLevel,
    badgeColor,
    recommendation,
    findings,
    isHttps,
    isIpAddress,
    scannedAt: new Date().toLocaleTimeString(),
  };
}

export const DEMO_URLS = [
  { label: 'Legitimate Service', url: 'https://www.google.com/search?q=cybersecurity' },
  { label: 'Brand Spoofing Attack', url: 'https://paypal-security-verification.top/signin' },
  { label: 'IP Address C2 Host', url: 'http://185.220.101.5/admin/login.php' },
  { label: 'Punycode Impersonation', url: 'https://xn--e1afmkfd.xn--p1ai/auth/bank' },
  { label: 'Credential Stealer Subdomains', url: 'https://account.update.login.bofa.verify-portal.xyz/billing' },
];
