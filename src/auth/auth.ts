class Auth {
  authenticated: boolean;

  constructor() {
    this.authenticated = !!localStorage.id;
  }

  login(cb: any): void {
    this.authenticated = true;
    cb();
  }

  logout(cb: any): void {
    this.authenticated = false;
    localStorage.clear();
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
