// Static storage for subscribers with localStorage persistence
const STORAGE_KEY = 'chitral_subscribers';

// Initialize subscribers array
let subscribers = [];

// Load existing subscribers from localStorage
try {
  const savedSubscribers = localStorage.getItem(STORAGE_KEY);
  if (savedSubscribers) {
    subscribers = JSON.parse(savedSubscribers);
    console.log('Loaded subscribers:', subscribers.length);
  }
} catch (error) {
  console.error('Error loading subscribers:', error);
}

// Save subscribers to localStorage
const saveSubscribers = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
    console.log('Saved subscribers:', subscribers.length);
    return true;
  } catch (error) {
    console.error('Error saving subscribers:', error);
    return false;
  }
};

// Email validation with common domain check
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email provided');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  // Check for common typos in email domains
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const [, domain] = email.toLowerCase().split('@');
  
  for (const commonDomain of commonDomains) {
    if (domain.length > 3 && commonDomain.includes(domain) && domain !== commonDomain) {
      throw new Error(`Did you mean @${commonDomain}?`);
    }
  }

  return true;
};

export const addSubscriber = (email) => {
  // Validate email
  validateEmail(email);

  // Check for duplicates
  if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Email already subscribed');
  }

  // Create new subscriber
  const newSubscriber = {
    email: email.toLowerCase(),
    subscribeDate: new Date().toISOString()
  };

  // Add to array and save
  subscribers.push(newSubscriber);
  const saved = saveSubscribers();

  if (!saved) {
    // Remove from array if save failed
    subscribers.pop();
    throw new Error('Could not save subscription. Please try again.');
  }

  return subscribers.length;
};

export const getSubscribers = () => {
  return subscribers.length;
};

export const clearSubscribers = () => {
  if (window.confirm('Are you sure you want to clear all subscribers? This cannot be undone.')) {
    subscribers = [];
    saveSubscribers();
    return true;
  }
  return false;
};

// For testing in browser console
window.viewSubscribers = () => {
  console.table(subscribers);
  return `Total subscribers: ${subscribers.length}`;
};

window.clearSubscribers = clearSubscribers;
