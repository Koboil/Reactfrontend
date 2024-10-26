import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         screens: {
            sm: '576px',
            // => @media (min-width: 576px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '992px',
            // => @media (min-width: 992px) { ... }

            xl: '1200px',
            // => @media (min-width: 1200px) { ... }

            xxl: '1400px',
            // => @media (min-width: 1400px) { ... }
         },
         fontFamily: {
            // Add your custom fonts
            PlusJakartaSans: ['Plus Jakarta Sans', 'sans-serif'],
            DmSans: ['DM Sans', 'sans-serif'],
            GeneralSans: ['General Sans', 'sans-serif'],
            Cabin: ['Cabin', 'sans-serif'],
            PublicSans: ['Public Sans', 'sans-serif'],
            Syne: ['Syne', 'sans-serif'],
            ClashDisplay: ['Clash Display', 'sans-serif'],
            Kanit: ['Kanit', 'sans-serif'],
            Sora: ['Sora', 'sans-serif'],
            Outfit: ['Outfit', 'sans-serif'],
            body: ['Inter', 'sans-serif'],
            FontAwesome: ['Font Awesome 6 Pro'],
         },

         /*
            backgroundImage: {
              "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
              "gradient-conic":
                "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
      
             */
      },
   },
   darkMode: 'class',
   plugins: [
      require('@tailwindcss/forms'),
      // ...
   ],
};
export default config;
