class Auth {
  authenticated: boolean;

  constructor() {
    this.authenticated = !!sessionStorage.id;
  }

  login(cb: any): void {
    this.authenticated = true;
    cb();
  }

  logout(cb: any): void {
    this.authenticated = false;
    localStorage.clear();
    sessionStorage.clear();
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
