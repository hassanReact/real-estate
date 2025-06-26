"use client";
import { useState, useEffect, useRef } from "react";

interface Props {
  initialCounts: {
    sellProperties: string;
    rentProperties: string;
    projects: string;
    agents: string;
    agencies: string;
  };
}

const PropertyCounters = ({ initialCounts }: Props) => {
  const getNumericValue = (value: string) => {
    return parseInt(value.replace(/\+/g, ""), 10);
  };

  const [displayCounts, setDisplayCounts] = useState({
    sellProperties: "0",
    rentProperties: "0",
    projects: "0",
    agents: "0",
    agencies: "0",
  });

  const targetCounts = useRef({
    sellProperties: initialCounts?.sellProperties || "100+",
    rentProperties: initialCounts?.rentProperties || "100+",
    projects: initialCounts?.projects || "100+",
    agents: initialCounts?.agents || "100+",
    agencies: initialCounts?.agencies || "100+",
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    const steps = 100; // Smoothness of animation
    const interval = 50; // Speed of animation

    const animateCounters = () => {
      const startTime = Date.now();

      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / (steps * interval), 1);

        const newCounts = Object.entries(targetCounts.current).reduce(
          (acc, [key, targetValue]) => {
            const isPlus = targetValue.includes("+");
            const target = getNumericValue(targetValue);
            const current = Math.round(target * progress);

            acc[key as keyof typeof displayCounts] = isPlus
              ? `${current}+`
              : `${current}`;

            return acc;
          },
          {} as typeof displayCounts
        );

        setDisplayCounts(newCounts);

        if (progress === 1) clearInterval(timer);
      }, interval);
    };

    const handleScroll = () => {
      if (!hasAnimated.current) {
        const element = document.getElementById("property-counters");
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            animateCounters();
            hasAnimated.current = true;
            window.removeEventListener("scroll", handleScroll);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger check in case already in view

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="property-counters"
      className="flex flex-wrap justify-center gap-5 bg-transparent py-10 px-5"
    >
      {Object.entries(displayCounts).map(([key, value]) => (
        <div
          key={key}
          className="bg-white rounded-lg shadow-md p-6 text-center w-44 transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl text-gray-800 mb-4">
            {key === "sellProperties" && "🏠"}
            {key === "rentProperties" && "🔑"}
            {key === "projects" && "🏗️"}
            {key === "agents" && "👤"}
            {key === "agencies" && "🏢"}
          </div>
          <div className="text-4xl font-bold text-blue-500 mb-2">{value}</div>
          <div className="text-sm text-gray-500 uppercase tracking-wider">
            {key === "sellProperties" && "Properties For Sale"}
            {key === "rentProperties" && "Properties For Rent"}
            {key === "projects" && "Projects"}
            {key === "agents" && "Property Agents"}
            {key === "agencies" && "Property Agencies"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCounters;
