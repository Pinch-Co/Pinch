class Auth {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(cb: any): void {
    this.authenticated = true;
    cb();
  }

  logout(cb: any): void {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
