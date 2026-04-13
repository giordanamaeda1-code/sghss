import { useState, useMemo } from 'react';

export const useCalendar = (initialDate = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const calendarData = useMemo(() => {
    const daysCount = getDaysInMonth(currentMonth);
    const paddingCount = getFirstDayOfMonth(currentMonth);
    
    const days = Array.from({ length: daysCount }, (_, i) => i + 1);
    const paddingDays = Array.from({ length: paddingCount }, (_, i) => i);
    
    return { days, paddingDays };
  }, [currentMonth]);

  return {
    currentMonth,
    selectedDate,
    setSelectedDate,
    nextMonth,
    prevMonth,
    isSameDay,
    formatMonth,
    ...calendarData
  };
};
