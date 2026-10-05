// Cybersecurity Password Evaluation Engine

const COMMON_BREACHED_PASSWORDS = new Set([
  '123456', 'password', '12345678', 'qwerty', '123456789', '12345', '1234', '111111',
  '1234567', 'dragon', 'welcome', 'login', 'admin', 'password1', 'football', 'monkey',
  'letmein', 'princess', 'solo', 'starwars', 'sunshine', 'iloveyou', 'passw0rd', 'secret',
  'trustno1', 'shadow', 'superman', 'master', 'default', 'charlie', 'jordan', 'computer',
  'cybersecurity', 'wisprflow', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'hunter2', 'killer'
]);

export function evaluatePassword(password) {
  if (!password || password.length === 0) {
    return {
      score: 0,
      label: 'Empty',
      color: 'slate',
      entropy: 0,
      crackTime: 'Instant',
      isBreached: false,
      checks: {
        length8: false,
        length12: false,
        length16: false,
        hasLower: false,
        hasUpper: false,
        hasNumber: false,
        hasSymbol: false,
        noSequences: true,
        noRepeats: true,
      },
      feedback: ['Enter a password to begin real-time analysis.'],
      charsetSize: 0,
    };
  }

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  // Character set size
  let charsetSize = 0;
  if (hasLower) charsetSize += 26;
  if (hasUpper) charsetSize += 26;
  if (hasNumber) charsetSize += 10;
  if (hasSymbol) charsetSize += 33;

  // Entropy calculation: E = length * log2(charsetSize)
  const entropy = charsetSize > 0 ? Math.round(length * Math.log2(charsetSize)) : 0;

  // Detect repetitive characters (e.g. "aaaa", "111")
  const hasRepeats = /(.)\1{2,}/i.test(password);

  // Detect simple sequences (e.g. "123", "abc", "qwe")
  const sequences = ['12345', '23456', '34567', '45678', '56789', 'abcde', 'bcdef', 'cdefg', 'defgh', 'qwerty', 'asdfg', 'zxcvb'];
  const lowerPass = password.toLowerCase();
  const hasSequences = sequences.some(seq => lowerPass.includes(seq));

  // Breached check
  const isBreached = COMMON_BREACHED_PASSWORDS.has(lowerPass);

  // Checks object
  const checks = {
    length8: length >= 8,
    length12: length >= 12,
    length16: length >= 16,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    noSequences: !hasSequences,
    noRepeats: !hasRepeats,
  };

  // Calculate composite score (0 to 100)
  let rawScore = 0;

  if (length >= 8) rawScore += 15;
  if (length >= 12) rawScore += 20;
  if (length >= 16) rawScore += 15;
  if (hasLower) rawScore += 10;
  if (hasUpper) rawScore += 10;
  if (hasNumber) rawScore += 10;
  if (hasSymbol) rawScore += 15;
  if (!hasRepeats) rawScore += 5;
  if (!hasSequences) rawScore += 5;

  if (isBreached) {
    rawScore = Math.min(rawScore, 10);
  }

  const score = Math.max(5, Math.min(100, rawScore));

  // Crack time estimation based on 10 billion guesses/second (modern GPU cluster)
  const crackTime = calculateCrackTime(entropy, length, isBreached);

  // Determine label & color
  let label = 'Very Weak';
  let color = 'red';

  if (isBreached) {
    label = 'Compromised';
    color = 'red';
  } else if (score >= 85) {
    label = 'Fortified';
    color = 'emerald';
  } else if (score >= 65) {
    label = 'Strong';
    color = 'cyan';
  } else if (score >= 45) {
    label = 'Moderate';
    color = 'amber';
  } else if (score >= 25) {
    label = 'Weak';
    color = 'orange';
  }

  // Actionable feedback
  const feedback = [];
  if (isBreached) {
    feedback.push('CRITICAL: This password appears in known global breach databases! Never use it.');
  }
  if (length < 12) {
    feedback.push(`Increase length to 12+ characters (currently ${length}). Length exponentially raises crack time.`);
  }
  if (!hasUpper) feedback.push('Add uppercase letters (A-Z) to widen the keyspace.');
  if (!hasLower) feedback.push('Add lowercase letters (a-z).');
  if (!hasNumber) feedback.push('Incorporate numeric digits (0-9).');
  if (!hasSymbol) feedback.push('Add special symbols (!@#$%^&*) to defend against dictionary attacks.');
  if (hasSequences) feedback.push('Avoid sequential patterns like "12345" or "qwerty" which automated tools guess first.');
  if (hasRepeats) feedback.push('Avoid repeating identical characters consecutively.');
  if (feedback.length === 0) {
    feedback.push('Excellent! This password demonstrates high entropy and robust defense against brute-force attacks.');
  }

  return {
    score,
    label,
    color,
    entropy,
    crackTime,
    isBreached,
    checks,
    feedback,
    charsetSize,
  };
}

function calculateCrackTime(entropy, length, isBreached) {
  if (isBreached) return '< 1 millisecond (in breach dictionary)';
  if (length < 6) return 'Instant (< 1 second)';
  if (entropy < 28) return 'Under 2 seconds';
  if (entropy < 36) return '~5 minutes';
  if (entropy < 45) return '~3 hours';
  if (entropy < 52) return '~4 days';
  if (entropy < 60) return '~6 months';
  if (entropy < 70) return '~120 years';
  if (entropy < 80) return '~45,000 years';
  if (entropy < 90) return '~3 million years';
  return 'Trillions of centuries (Unbreakable by current compute)';
}

export function generateSecurePassword(options = {}) {
  const {
    length = 16,
    includeUpper = true,
    includeLower = true,
    includeNumbers = true,
    includeSymbols = true,
    avoidAmbiguous = true,
  } = options;

  let upperChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // avoiding I, O if ambiguous
  let lowerChars = 'abcdefghijkmnopqrstuvwxyz'; // avoiding l if ambiguous
  let numberChars = '23456789'; // avoiding 0, 1
  let symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  if (!avoidAmbiguous) {
    upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    numberChars = '0123456789';
  }

  let pool = '';
  const mandatory = [];

  if (includeUpper) {
    pool += upperChars;
    mandatory.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
  }
  if (includeLower) {
    pool += lowerChars;
    mandatory.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
  }
  if (includeNumbers) {
    pool += numberChars;
    mandatory.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
  }
  if (includeSymbols) {
    pool += symbolChars;
    mandatory.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
  }

  if (pool.length === 0) {
    pool = lowerChars;
    mandatory.push(lowerChars[0]);
  }

  const result = [...mandatory];
  const targetLength = Math.max(8, Math.min(64, length));

  for (let i = result.length; i < targetLength; i++) {
    result.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  // Shuffle array using Fisher-Yates
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}
