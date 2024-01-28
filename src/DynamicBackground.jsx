import React, { useEffect, useState } from 'react';
import './DynamicBackground.css'

const dateObj = new Date();
const urls = ['morningBg', 'afterNoon', 'evening']
const DynamicBackground = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const updateBackgroundColor = () => {
      const currentHour = dateObj.getHours();

      // Customize the colors based on your preferences and time ranges
      if (currentHour >= 6 && currentHour < 12) {
        setTime(0); // Morning
      } else if (currentHour >= 12 && currentHour < 18) {
        setTime(1); // Afternoon
      } else {
        setTime(2); // Evening/Night
      }
    };

    updateBackgroundColor(); // Set initial background color
    const intervalId = setInterval(updateBackgroundColor, 600000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw'}} className={urls[time]}>
      {/* Your other content goes here */}
    </div>
  );
};

export default DynamicBackground;