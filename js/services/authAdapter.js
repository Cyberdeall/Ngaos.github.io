// Abstraction Layer Auth untuk mengisolasi Clerk dari UI
class AuthAdapter {
  constructor() {
    this.clerkInstance = null;
  }

  // Polling loop untuk mengatasi Race Condition pemuatan skrip SDK
  async init(publishableKey) {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const interval = setInterval(async () => {
        attempts++;
        if (window.Clerk) {
          clearInterval(interval);
          try {
            await window.Clerk.load({ publishableKey });
            this.clerkInstance = window.Clerk;
            resolve(true);
          } catch (err) {
            reject('AUTH_NOT_LOADED');
          }
        } else if (attempts > 50) { // Timeout setelah 5 detik
          clearInterval(interval);
          reject('AUTH_NOT_LOADED');
        }
      }, 100);
    });
  }

  isAuthenticated() {
    return !!(this.clerkInstance && this.clerkInstance.user);
  }

  getUser() {
    if (!this.isAuthenticated()) return null;
    const u = this.clerkInstance.user;
    return {
      id: u.id,
      name: u.fullName || u.firstName || 'User',
      email: u.primaryEmailAddress?.emailAddress,
      avatar: u.imageUrl
    };
  }

  async login() {
    if (this.clerkInstance) await this.clerkInstance.openSignIn();
  }

  async register() {
    if (this.clerkInstance) await this.clerkInstance.openSignUp();
  }

  async logout() {
    if (this.clerkInstance) await this.clerkInstance.signOut();
  }

  addListener(callback) {
    if (this.clerkInstance) {
      this.clerkInstance.addListener(callback);
    }
  }
}

export const auth = new AuthAdapter();
