import React, { useEffect, useState } from "react";

const Countdown = () => {
  const targetDate = new Date("2024-12-10T00:00:00"); //end
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { giorni: 0, ore: 0, minuti: 0, secondi: 0 };
    }
    return {
      giorni: Math.floor(difference / (1000 * 60 * 60 * 24)),
      ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minuti: Math.floor((difference / (1000 * 60)) % 60),
      secondi: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-0 gap-3 text-center md:auto-cols-max justify-center md:mt-7 mt-10 mb-7 p-4 justify-items-center">
      <div className="flex flex-col md:p-8 p-5 rounded-box text-black md:w-[130px] w-[120px] bg-[#FDED00]">
        <span className="font-mono text-6xl">
          <span className="text-black">{timeLeft.giorni}</span>
        </span>
        days
      </div>
      <div className="flex flex-col md:p-8 p-5 rounded-box text-black md:w-[130px] w-[120px] bg-[#FDED00]">
        <span className="font-mono text-6xl">
          <span className="text-black">{timeLeft.ore}</span>
        </span>
        hours
      </div>
      <div className="flex flex-col md:p-8 p-5 rounded-box text-black md:w-[130px] w-[120px] bg-[#FDED00]">
        <span className="font-mono text-6xl">
          <span className="text-black">{timeLeft.minuti}</span>
        </span>
        min
      </div>
      <div className="flex flex-col md:p-8 p-5 rounded-box text-black md:w-[130px] w-[120px]  bg-[#FDED00]">
        <span className=" font-mono text-6xl">
          <span className="text-black">{timeLeft.secondi}</span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
