import ThemeDefault from './ThemeDefault';
import ThemeBlack from './ThemeBlack';

const Theme = {

  themes: {
    default: ThemeDefault,
    black: ThemeBlack,
  },

  set: function(theme) {
    Object.assign(this, theme);
  },
};

Theme.set(ThemeDefault);

export default Theme;

// module.exports = Theme;
