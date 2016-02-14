export default {
  isDevelopment() {
    return !this.isProduction();
  },

  isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
