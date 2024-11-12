module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d7cf2',   
        secondary: '#f0f2f5', 
        accent: '#111418',    
        borderColor: '#dbe0e6',
        textPrimary: '#111418',
        textSecondary: '#60758a', 
        icon: '#b2bac4',       
      },
      borderRadius: {
        xl: '1rem',  
        lg: '0.75rem',
      },
      fontSize: {
        sm: ['0.875rem', '1.25rem'],
        xl: ['1.25rem', '1.75rem'], 
      },
      spacing: {
        '15px': '15px', 
      },
      borderWidth: {
        DEFAULT: '1px', 
        '2': '2px',     
      },
      fontFamily: {
        sans: ['Manrope', 'Noto Sans', 'sans-serif'], 
      }
    },
  },
  plugins: [],
};