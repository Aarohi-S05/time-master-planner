
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import TimeSlot from './TimeSlot';

interface TimetableEntry {
  time: string;
  subject: string;
}

const TimetablePlanner: React.FC = () => {
  const [hour, setHour] = useState<string>("00");
  const [minute, setMinute] = useState<string>("00");
  const [subject, setSubject] = useState<string>("");
  const [timetable, setTimetable] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Generate all 24 hours for the dropdown
  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, "0")
  );

  // Generate minutes (00 and 30)
  const minutes = ["00", "30"];

  // Generate all possible time slots
  const allTimeSlots = hours.flatMap(hour => 
    minutes.map(minute => `${hour}:${minute}`)
  );

  // Handle adding a subject to the timetable
  const handleAddSubject = () => {
    if (!subject.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subject name",
        variant: "destructive",
      });
      return;
    }

    const timeSlot = `${hour}:${minute}`;
    
    setTimetable(prev => ({
      ...prev,
      [timeSlot]: subject
    }));

    setSubject("");
    
    toast({
      title: "Success",
      description: `Added ${subject} at ${timeSlot}`,
    });
  };

  // Handle removing a subject from the timetable
  const handleRemoveSubject = (timeSlot: string) => {
    setTimetable(prev => {
      const newTimetable = { ...prev };
      delete newTimetable[timeSlot];
      return newTimetable;
    });

    toast({
      title: "Removed",
      description: `Removed subject at ${timeSlot}`,
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
        24-Hour Study Timetable
      </h1>

      <div className="w-[95%] max-w-3xl mx-auto p-5 bg-white/10 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1 text-white font-medium">Hour:</label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full p-3 rounded-full border-none outline-none bg-white/20 text-white transition-all hover:bg-white/40"
            >
              {hours.map(h => (
                <option key={h} value={h} className="bg-gray-800 text-white">
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-white font-medium">Minute:</label>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full p-3 rounded-full border-none outline-none bg-white/20 text-white transition-all hover:bg-white/40"
            >
              {minutes.map(m => (
                <option key={m} value={m} className="bg-gray-800 text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-white font-medium">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="w-full p-3 rounded-full border-none outline-none bg-white/20 text-white transition-all hover:bg-white/40"
          />
        </div>

        <button
          onClick={handleAddSubject}
          className="w-full p-3 rounded-full font-bold bg-gradient-button text-white transition-all hover:shadow-lg hover:opacity-90"
        >
          Add to Timetable
        </button>

        <div className="mt-8 bg-black/30 rounded-2xl p-5 max-h-[60vh] overflow-y-auto timetable-scrollbar">
          <h2 className="text-xl font-bold mb-4 text-white">Your Timetable</h2>
          
          {allTimeSlots.map(timeSlot => {
            const hasSubject = timetable[timeSlot] !== undefined;
            
            return (
              <TimeSlot
                key={timeSlot}
                time={timeSlot}
                subject={timetable[timeSlot] || ""}
                isEmpty={!hasSubject}
                onDelete={() => handleRemoveSubject(timeSlot)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimetablePlanner;
