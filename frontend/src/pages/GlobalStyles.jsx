import React from 'react';
import '../static_folder/styles.css'

const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@300;400;700;900&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Orbitron', monospace;
      background: #000;
      color: #fff;
      overflow-x: hidden;
    }

    html, body, #root {
      height: 100%;
      width: 100%;
    }
  `}</style>
);

export default GlobalStyles;