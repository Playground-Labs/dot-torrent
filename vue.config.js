module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import '@/scss/_fonts.scss';
        @import '@/scss/_universal-styles.scss';
          `
      }
    }
  }
}
