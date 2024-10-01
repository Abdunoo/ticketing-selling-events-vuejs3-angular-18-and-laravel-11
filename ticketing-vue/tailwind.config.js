module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d7cf2',   // This will create a 'bg-primary' utility
        secondary: '#f0f2f5', // This will create a 'bg-secondary' utility
        accent: '#111418',    // This will create a 'bg-accent' utility
        borderColor: '#dbe0e6',    // This will create a 'border-border' utility
        textPrimary: '#111418', // This will create a 'text-textPrimary' utility
        textSecondary: '#60758a', // This will create a 'text-textSecondary' utility
        icon: '#b2bac4',       // This will create a 'text-icon' utility
      },
      borderRadius: {
        xl: '1rem',  // This is equivalent to the rounded-xl utility
        lg: '0.75rem', // Add other custom radii as needed
      },
      fontSize: {
        sm: ['0.875rem', '1.25rem'], // This is equivalent to the 'text-sm' utility
        xl: ['1.25rem', '1.75rem'],  // This is equivalent to the 'text-xl' utility
      },
      spacing: {
        '15px': '15px', // Custom spacing value
      },
      borderWidth: {
        DEFAULT: '1px', // Default border width
        '2': '2px',     // Custom border width
      },
      fontFamily: {
        sans: ['Manrope', 'Noto Sans', 'sans-serif'], // Add the Inter font here
      }
    },
  },
  plugins: [],
};