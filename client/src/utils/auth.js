import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // Returns true if there token is yet to be expired
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    // Returns true if the expiration time is less than the current time
    if (decoded.exp < Date.now()/1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // Returns false if token passes expiration time
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();

