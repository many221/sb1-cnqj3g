import React, { useRef, useEffect } from 'react';
import { format, parse } from 'date-fns';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineProps {
  currentTime: string;
  onTimeChange: (time: string) => void;
}

export default function Timeline({ currentTime, onTimeChange }: TimelineProps) {
  const hours = Array.from({ length: 24 }, (_, i) => 
    format(parse(`${i}:00`, 'HH:mm', new Date()), 'HH:mm')
  );
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const currentHour = parseInt(currentTime.split(':')[0]);
  const scrolling = useRef(false);

  const scrollToHour = (hour: number) => {
    if (timelineRef.current) {
      const scrollAmount = hour * 96;
      timelineRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollTimeline = (direction: 'left' | 'right') => {
    const newHour = direction === 'left'
      ? Math.max(0, currentHour - 1)
      : Math.min(23, currentHour + 1);
    
    onTimeChange(`${newHour.toString().padStart(2, '0')}:00`);
    scrollToHour(newHour);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!timelineRef.current || scrolling.current) return;

    const scrollPosition = timelineRef.current.scrollLeft;
    const timeSlotWidth = 96;
    const newHour = Math.round(scrollPosition / timeSlotWidth);
    
    if (newHour >= 0 && newHour <= 23 && newHour !== currentHour) {
      scrolling.current = true;
      const newTime = `${newHour.toString().padStart(2, '0')}:00`;
      onTimeChange(newTime);
      
      // Reset scrolling flag after animation
      setTimeout(() => {
        scrolling.current = false;
      }, 100);
    }
  };

  useEffect(() => {
    if (!scrolling.current) {
      scrollToHour(currentHour);
    }
  }, [currentHour]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[1000] h-[160px]">
      <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
        <div className="flex items-center justify-center py-2 border-b border-gray-200">
          <Clock className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-semibold text-lg text-gray-800">{currentTime}</span>
        </div>
        
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-8 right-8 top-1/2 h-1 bg-gray-200 transform -translate-y-1/2" />
          
          <button 
            onClick={() => scrollTimeline('left')}
            disabled={currentHour === 0}
            className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous hour"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button 
            onClick={() => scrollTimeline('right')}
            disabled={currentHour === 23}
            className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next hour"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          
          <div 
            ref={timelineRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto hide-scrollbar relative w-full px-8 scroll-smooth"
          >
            {hours.map((hour) => (
              <button
                key={hour}
                onClick={() => onTimeChange(hour)}
                className="flex-shrink-0 w-24 group relative"
              >
                <div className={`
                  absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  w-4 h-4 rounded-full border-2 transition-all cursor-pointer
                  ${currentTime === hour 
                    ? 'bg-blue-600 border-blue-600 scale-125' 
                    : 'bg-white border-gray-300 group-hover:border-blue-400'
                  }
                `} />
                <div className={`
                  absolute left-1/2 transform -translate-x-1/2 translate-y-4
                  text-sm font-medium transition-colors whitespace-nowrap
                  ${currentTime === hour 
                    ? 'text-blue-600' 
                    : 'text-gray-500 group-hover:text-blue-400'
                  }
                `}>
                  {hour}
                </div>
              </button>
            ))}
          </div>

          <div 
            className="absolute top-1/2 transform -translate-y-1/2 z-20 pointer-events-none"
            style={{ 
              left: `calc(${(currentHour / 23) * 100}% + ${32}px)`,
              transition: 'left 0.3s ease-out'
            }}
          >
            <div className="w-1 h-8 bg-blue-600 rounded-full shadow-lg timeline-marker" />
          </div>
        </div>
      </div>
    </div>
  );
}