import React, { useState, useEffect } from "react";
import './Header.css';

const Header = () => {
   // State to track the theme
   const [isDarkMode, setIsDarkMode] = useState(false);

   // Check user's preference on mount
   useEffect(() => {
       const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
       setIsDarkMode(mediaQuery.matches);

       const handleChange = (e) => setIsDarkMode(e.matches);
       mediaQuery.addEventListener('change', handleChange);

       return () => mediaQuery.removeEventListener('change', handleChange);
   }, []);

   const toggleTheme = () => {
       setIsDarkMode((prev) => !prev);
   };

   
   useEffect(() => {
       document.body.className = isDarkMode ? 'dark-mode' : '';
   }, [isDarkMode]);

   return (
       <div>
           <header>
           
                  <h1>On.time</h1>
                
               <button className="light-dark-btn" onClick={toggleTheme}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
               </button>
           </header>
           
       </div>
   );
};

export default Header;
