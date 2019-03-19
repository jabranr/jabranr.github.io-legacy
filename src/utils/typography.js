import Typography from 'typography';

const typography = new Typography({
  scaleRatio: 2,
  baseLineHeight: 1.5,
  bodyColor: '#444',
  headerFontFamily: ['Merriweather', 'georgia', 'serif'],
  bodyFontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  googleFonts: [
    {
      name: 'Merriweather',
      styles: ['700']
    },
    {
      name: 'Roboto',
      styles: ['400', '400i', '500', '500i']
    }
  ],
  overrideThemeStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    blockquote: {
      backgroundColor: '#eee',
      padding: '10px',
      borderLeft: '5px solid #999',
      margin: 0
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
