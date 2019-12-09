import Typography from 'typography';

const typography = new Typography({
  scaleRatio: 2,
  baseLineHeight: 1.5,
  bodyColor: '#333',
  headerFontFamily: ['Merriweather', 'georgia', 'serif'],
  bodyFontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  googleFonts: [
    {
      name: 'Merriweather',
      styles: ['700']
    },
    {
      name: 'Roboto',
      styles: ['300', '400', '400i', '500', '500i']
    }
  ],
  overrideStyles: () => ({
    ':root': {
      '--jr-orange': '#e2734e',
      '--jr-red': '#c30',
      '--jr-white': '#fafafa',
      '--jr-black': '#333',
      '--jr-gray': '#666',
      '--jr-light': '#999',
      '--jr-lighter': '#eee'
    }
  })
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
