// Cybersecurity Password Evaluation Engine - 100% Client-Side

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
      label: 'Very Weak',
      color: 'slate',
      entropy: 0,
      crackTime: 'Instant',
      isBreached: false,
      requirements: [
        { id: 'length', label: 'At least 8 characters (12+ recommended)', met: false },
        { id: 'uppercase', label: 'Uppercase letters (A-Z)', met: false },
        { id: 'lowercase', label: 'Lowercase letters (a-z)', met: false },
        { id: 'numbers', label: 'Numbers (0-9)', met: false },
        { id: 'symbols', label: 'Special characters (!@#$%^&*)', met: false },
      ],
      recommendations: [
        'Enter a password to begin real-time analysis.',
        'Aim for at least 12 characters to defend against automated brute-force attacks.',
        'Mix uppercase, lowercase, numbers, and symbols.'
      ],
      charsetSize: 0,
    };
  }

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  // Character set size for entropy calculation
  let charsetSize = 0;
  if (hasLower) charsetSize += 26;
  if (hasUpper) charsetSize += 26;
  if (hasNumber) charsetSize += 10;
  if (hasSymbol) charsetSize += 33;

  // Information Entropy: E = length * log2(charsetSize)
  const entropy = charsetSize > 0 ? Math.round(length * Math.log2(charsetSize)) : 0;

  // Repetitive and sequential pattern detections
  const hasRepeats = /(.)\1{2,}/i.test(password);
  const sequences = ['12345', '23456', '34567', '45678', '56789', 'abcde', 'bcdef', 'cdefg', 'defgh', 'qwerty', 'asdfg', 'zxcvb'];
  const lowerPass = password.toLowerCase();
  const hasSequences = sequences.some(seq => lowerPass.includes(seq));

  // Breached dictionary check
  const isBreached = COMMON_BREACHED_PASSWORDS.has(lowerPass);

  // 5 Individual Requirement Indicators
  const requirements = [
    { id: 'length', label: 'Length: At least 8 characters (12+ recommended)', met: length >= 8 },
    { id: 'uppercase', label: 'Uppercase letters: At least one letter (A-Z)', met: hasUpper },
    { id: 'lowercase', label: 'Lowercase letters: At least one letter (a-z)', met: hasLower },
    { id: 'numbers', label: 'Numbers: At least one numeric digit (0-9)', met: hasNumber },
    { id: 'symbols', label: 'Special characters: At least one symbol (!@#$%^&*)', met: hasSymbol },
  ];

  // Score calculation
  let rawScore = 0;
  if (length >= 8) rawScore += 20;
  if (length >= 12) rawScore += 15;
  if (length >= 16) rawScore += 10;
  if (hasUpper) rawScore += 15;
  if (hasLower) rawScore += 10;
  if (hasNumber) rawScore += 15;
  if (hasSymbol) rawScore += 15;

  if (hasRepeats) rawScore -= 10;
  if (hasSequences) rawScore -= 10;
  if (isBreached) rawScore = 5;

  const score = Math.max(5, Math.min(100, rawScore));

  // 5 Strength Levels: Very Weak, Weak, Fair, Strong, Very Strong
  let label = 'Very Weak';
  let color = 'red';

  if (isBreached) {
    label = 'Very Weak (Compromised)';
    color = 'red';
  } else if (score >= 85) {
    label = 'Very Strong';
    color = 'emerald';
  } else if (score >= 65) {
    label = 'Strong';
    color = 'cyan';
  } else if (score >= 45) {
    label = 'Fair';
    color = 'amber';
  } else if (score >= 25) {
    label = 'Weak';
    color = 'orange';
  } else {
    label = 'Very Weak';
    color = 'red';
  }

  // Estimated crack time
  const crackTime = calculateCrackTime(entropy, length, isBreached);

  // Actionable recommendations
  const recommendations = [];
  if (isBreached) {
    recommendations.push('CRITICAL: This password appears in public data breach dumps! Never use it.');
  }
  if (length < 8) {
    recommendations.push(`Password is too short (${length} chars). Add at least ${8 - length} more characters to meet minimum requirements.`);
  } else if (length < 12) {
    recommendations.push(`Increase length to 12+ characters for significantly stronger resistance against GPU brute-forcing.`);
  }
  if (!hasUpper) recommendations.push('Add at least one uppercase letter (A-Z) to broaden the keyspace.');
  if (!hasLower) recommendations.push('Add at least one lowercase letter (a-z).');
  if (!hasNumber) recommendations.push('Include numbers (0-9) to disrupt automated dictionary attacks.');
  if (!hasSymbol) recommendations.push('Add special symbols (!@#$%^&*) for maximum complexity.');
  if (hasSequences) recommendations.push('Remove predictable sequences like "12345" or "qwerty" which attack scripts test first.');
  if (hasRepeats) recommendations.push('Avoid repeating identical characters consecutively (e.g. "aaa", "111").');

  if (recommendations.length === 0) {
    recommendations.push('Excellent! Your password meets all security criteria and exhibits high entropy.');
  }

  return {
    score,
    label,
    color,
    entropy,
    crackTime,
    isBreached,
    requirements,
    recommendations,
    charsetSize,
    length,
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

  let upperChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let lowerChars = 'abcdefghijkmnopqrstuvwxyz';
  let numberChars = '23456789';
  let symbolChars = '!@#$%^&*()_+~|}{[]:;?><,./-=';

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

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}
