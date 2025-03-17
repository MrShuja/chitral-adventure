// Admin user credentials
// In a real application, these should be stored securely and hashed
const adminCredentials = {
  username: 'admin',
  // This is just for demo purposes. In production, use proper authentication
  password: 'chitral2025'
};

export const verifyCredentials = (username, password) => {
  return username === adminCredentials.username && 
         password === adminCredentials.password;
};

export const isAuthenticated = () => {
  return localStorage.getItem('chitral_admin_auth') === 'true';
};

export const setAuthenticated = (status) => {
  if (status) {
    localStorage.setItem('chitral_admin_auth', 'true');
  } else {
    localStorage.removeItem('chitral_admin_auth');
  }
};
