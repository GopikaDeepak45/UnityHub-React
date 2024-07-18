import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

interface ProgressDemoProps {
  isLoading: boolean;
}

const ProgressDemo: React.FC<ProgressDemoProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setInterval(() => {
        // Increment progress by 10 every second until it reaches 100
        setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      }, 300);
    } else {
      // Reset progress when loading is finished
      setProgress(100);
    }

    return () => clearInterval(timer);
  }, [isLoading]);

  return <div className="flex justify-center items-center h-80">
      
        <Progress value={progress} className="w-[60%]" />;
       
        </div>
};

export default ProgressDemo;
