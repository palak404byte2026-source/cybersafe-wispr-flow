// Local storage helpers for CyberSafe state persistence

const KEYS = {
  USER_SCORE: 'cybersafe_user_score',
  QUIZ_RESULTS: 'cybersafe_quiz_results',
  PASSWORD_HISTORY: 'cybersafe_password_history',
  URL_HISTORY: 'cybersafe_url_history',
  CHECKLIST_STATE: 'cybersafe_checklist_state',
  MASTERED_TIPS: 'cybersafe_mastered_tips',
  BOOKMARKED_TIPS: 'cybersafe_bookmarked_tips',
};

export const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading localStorage for key ${key}:`, e);
    return fallback;
  }
};

export const setStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage for key ${key}:`, e);
  }
};

export { KEYS };
