import React, { useState } from 'react';
import EventMap from './components/EventMap';
import Timeline from './components/Timeline';
import { events } from './data/events';
import { Clock } from 'lucide-react';

function App() {
  const [currentTime, setCurrentTime] = useState('12:00');

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm p-4 flex-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Event Explorer</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-medium">{currentTime}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        <div className="absolute inset-0 pb-[160px]">
          <EventMap events={events} currentTime={currentTime} />
        </div>
        <Timeline currentTime={currentTime} onTimeChange={setCurrentTime} />
      </main>
    </div>
  );
}

export default App;