
import React from 'react';
import { cn } from '@/lib/utils';

interface TimeSlotProps {
  time: string;
  subject: string;
  isEmpty?: boolean;
  onDelete: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ 
  time, 
  subject, 
  isEmpty = true,
  onDelete
}) => {
  return (
    <div 
      className={cn(
        "flex justify-between items-center p-3 my-1.5 rounded-lg bg-white/20 transition-all duration-300 hover:scale-[1.02]",
        !isEmpty && "hover:bg-gradient-slot"
      )}
    >
      <span className="font-bold text-white">{time}</span>
      <span 
        className={cn(
          "text-white", 
          isEmpty ? "italic" : "font-normal"
        )}
      >
        {isEmpty ? "Empty" : subject}
      </span>
      {!isEmpty && (
        <button 
          onClick={onDelete} 
          className="ml-2 text-white/70 hover:text-white/100 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default TimeSlot;
