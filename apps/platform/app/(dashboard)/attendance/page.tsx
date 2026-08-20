"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronRight as ChevronRightSmall,
  Flame,
  Info,
  Star,
  AlertCircle,
  FileCheck,
  X,
  CheckCircle2,
  Clock,
  FileText
} from "lucide-react";
import { attendanceService } from "@/services/attendanceService";

// Types
interface CalendarDay {
  day: number;
  currentMonth: boolean;
  status?: "present" | "absent" | "leave";
  details?: { class: string; time: string; topic: string }[];
}

interface CourseData {
  id: string;
  name: string;
  icon: string;
  bg: string;
  percentage: number;
  classes: string;
  attended: number;
  total: number;
}

export default function AttendancePage() {
  // Navigation & Dropdown States
  const [selectedCourse, setSelectedCourse] = useState<string>("All Courses");
  const [dateRange, setDateRange] = useState<string>("May 1 - May 31, 2026");
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(4); // 0 = Jan, 4 = May
  
  // UI Dropdown Toggles
  const [showCourseDropdown, setShowCourseDropdown] = useState<boolean>(false);
  const [showDateDropdown, setShowDateDropdown] = useState<boolean>(false);
  
  // Modal States
  const [selectedDayModal, setSelectedDayModal] = useState<CalendarDay | null>(null);
  const [selectedCourseModal, setSelectedCourseModal] = useState<CourseData | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [liveStreak, setLiveStreak] = useState({ currentStreak: 12, bestStreak: 18 });

  useEffect(() => {
    async function loadAttendanceData() {
      try {
        const [streakRes, courseRes] = await Promise.allSettled([
          attendanceService.getStreak(),
          attendanceService.getCourseAttendance("db101"),
        ]);
        if (streakRes.status === "fulfilled" && streakRes.value) {
          setLiveStreak({
            currentStreak: streakRes.value.currentStreak || 12,
            bestStreak: streakRes.value.bestStreak || 18,
          });
        }
      } catch (err) {
        // Fallback
      }
    }
    loadAttendanceData();
  }, []);

  const months = ["January 2026", "February 2026", "March 2026", "April 2026", "May 2026", "June 2026", "July 2026", "August 2026"];

  // Course Breakdown Data
  const courseList: CourseData[] = [
    { id: "db101", name: "Tajweed Foundations", icon: "🗄️", bg: "bg-purple-900/30", percentage: 98, classes: "15 / 16 classes", attended: 15, total: 16 },
    { id: "ai101", name: "Hadith Sciences: An Introduction", icon: "🌐", bg: "bg-blue-900/30", percentage: 94, classes: "15 / 16 classes", attended: 15, total: 16 },
    { id: "py101", name: "Qur'anic Arabic for Beginners", icon: "</>", bg: "bg-emerald-900/30", percentage: 96, classes: "24 / 25 classes", attended: 24, total: 25 },
    { id: "dsa101", name: "Fiqh of Worship: Salah & Purification", icon: "⚙️", bg: "bg-amber-900/30", percentage: 93, classes: "14 / 15 classes", attended: 14, total: 15 },
  ];

  // Calendar Days Matrix
  const calendarDays: CalendarDay[] = [
    { day: 28, currentMonth: false },
    { day: 29, currentMonth: false },
    { day: 30, currentMonth: false },
    { day: 1, currentMonth: true, status: "present", details: [{ class: "Tajweed Foundations", time: "09:00 AM", topic: "Makharij & Articulation Points" }] },
    { day: 2, currentMonth: true, status: "present", details: [{ class: "Qur'anic Arabic for Beginners", time: "11:30 AM", topic: "Root Letters & Verb Patterns" }] },
    { day: 3, currentMonth: true, status: "present", details: [{ class: "Hadith Sciences: An Introduction", time: "02:00 PM", topic: "Introduction to Isnad" }] },
    { day: 4, currentMonth: true },
    { day: 5, currentMonth: true, status: "absent", details: [{ class: "Fiqh of Worship: Salah & Purification", time: "10:00 AM", topic: "Conditions of Wudu" }] },
    { day: 6, currentMonth: true, status: "present", details: [{ class: "Tajweed Foundations", time: "09:00 AM", topic: "Rules of Idgham & Ikhfa" }] },
    { day: 7, currentMonth: true, status: "present", details: [{ class: "Qur'anic Arabic for Beginners", time: "11:30 AM", topic: "Sentence Structure Basics" }] },
    { day: 8, currentMonth: true, status: "present", details: [{ class: "Hadith Sciences: An Introduction", time: "02:00 PM", topic: "Grading Sahih & Da'if Hadith" }] },
    { day: 9, currentMonth: true, status: "present", details: [{ class: "Fiqh of Worship: Salah & Purification", time: "10:00 AM", topic: "Pillars of Salah" }] },
    { day: 10, currentMonth: true, status: "present" },
    { day: 11, currentMonth: true, status: "present" },
    { day: 12, currentMonth: true, status: "present" },
    { day: 13, currentMonth: true, status: "present" },
    { day: 14, currentMonth: true, status: "present" },
    { day: 15, currentMonth: true, status: "present" },
    { day: 16, currentMonth: true, status: "present" },
    { day: 17, currentMonth: true, status: "leave", details: [{ class: "All Classes", time: "Full Day", topic: "Approved Sick Leave" }] },
    { day: 18, currentMonth: true },
    { day: 19, currentMonth: true, status: "present" },
    { day: 20, currentMonth: true, status: "present" },
    { day: 21, currentMonth: true, status: "present" },
    { day: 22, currentMonth: true, status: "present" },
    { day: 23, currentMonth: true, status: "present" },
    { day: 24, currentMonth: true, status: "present" },
    { day: 25, currentMonth: true },
    { day: 26, currentMonth: true, status: "present" },
    { day: 27, currentMonth: true, status: "absent", details: [{ class: "Qur'anic Arabic for Beginners", time: "11:30 AM", topic: "Reading Qur'anic Verses" }] },
    { day: 28, currentMonth: true, status: "present" },
    { day: 29, currentMonth: true, status: "present" },
    { day: 30, currentMonth: true, status: "present" },
    { day: 31, currentMonth: true, status: "present" },
    { day: 1, currentMonth: false },
  ];

  // Month Switchers
  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) setCurrentMonthIndex((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < months.length - 1) setCurrentMonthIndex((prev) => prev + 1);
  };

  const handleResetToday = () => {
    setCurrentMonthIndex(6); // Reset to July 2026
    setDateRange("July 1 - July 31, 2026");
  };
  
  // Filter Courses based on dropdown selection
  const filteredCourses = selectedCourse === "All Courses" 
    ? courseList 
    : courseList.filter(c => c.name === selectedCourse);

  return (
    <div className="p-6 md:p-8 space-y-6 text-white bg-[#07090E] min-h-screen relative">
      
      {/* TOP HEADER WITH DROPDOWNS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
          <p className="text-xs text-gray-400 mt-1">
            Track your class attendance and maintain your streak.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-20">
          
          {/* Course Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowCourseDropdown(!showCourseDropdown);
                setShowDateDropdown(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#11151E] border border-[#1A202C] text-xs font-medium text-gray-300 hover:bg-[#161B26] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              <span>{selectedCourse}</span>
              <ChevronDown size={14} className={`text-gray-400 ml-1 transition-transform ${showCourseDropdown ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showCourseDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 bg-[#11151E] border border-[#1A202C] rounded-xl shadow-2xl py-1 z-30"
                >
                  <button
                    onClick={() => { setSelectedCourse("All Courses"); setShowCourseDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-[#1A202C] ${selectedCourse === "All Courses" ? "text-primary-400 font-bold" : "text-gray-300"}`}
                  >
                    All Courses
                  </button>
                  {courseList.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCourse(c.name); setShowCourseDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-[#1A202C] ${selectedCourse === c.name ? "text-primary-400 font-bold" : "text-gray-300"}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date Range Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowDateDropdown(!showDateDropdown);
                setShowCourseDropdown(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#11151E] border border-[#1A202C] text-xs font-medium text-gray-300 hover:bg-[#161B26] transition-colors"
            >
              <CalendarIcon size={14} className="text-gray-400" />
              <span>{dateRange}</span>
              <ChevronDown size={14} className={`text-gray-400 ml-1 transition-transform ${showDateDropdown ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showDateDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-[#11151E] border border-[#1A202C] rounded-xl shadow-2xl py-1 z-30"
                >
                  {["May 1 - May 31, 2026", "Apr 1 - Apr 30, 2026", "Semester 1 (Jan - May)"].map((range) => (
                    <button
                      key={range}
                      onClick={() => { setDateRange(range); setShowDateDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-[#1A202C] ${dateRange === range ? "text-primary-400 font-bold" : "text-gray-300"}`}
                    >
                      {range}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Export Report Button */}
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#11151E] border border-[#1A202C] text-xs font-medium text-gray-300 hover:bg-[#161B26] transition-colors"
          >
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* SUMMARY METRICS CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Overall Attendance */}
        <div className="bg-[#0D111A] border border-[#171D2A] p-5 rounded-2xl flex items-center justify-between hover:border-primary-500/30 transition-colors">
          <div>
            <p className="text-xs text-gray-400 font-medium">Overall Attendance</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold">96%</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded-md">
                Excellent
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
              <span>↑ 4%</span>
              <span className="text-gray-500">from last month</span>
            </p>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-[#1A202C]" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-500" strokeDasharray="96, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
        </div>

        {/* Card 2: Classes Attended */}
        <div className="bg-[#0D111A] border border-[#171D2A] p-5 rounded-2xl flex items-center justify-between hover:border-emerald-500/30 transition-colors">
          <div>
            <p className="text-xs text-gray-400 font-medium">Classes Attended</p>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold">47</span>
              <span className="text-xs text-gray-500">of 49</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">This Month</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-950/40 border border-emerald-800/30 flex items-center justify-center text-emerald-400">
            <CalendarIcon size={20} />
          </div>
        </div>

        {/* Card 3: Classes Missed */}
        <div className="bg-[#0D111A] border border-[#171D2A] p-5 rounded-2xl flex items-center justify-between hover:border-rose-500/30 transition-colors">
          <div>
            <p className="text-xs text-gray-400 font-medium">Classes Missed</p>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold">2</span>
              <span className="text-xs text-gray-500">of 49</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">This Month</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-950/40 border border-rose-800/30 flex items-center justify-center text-rose-400">
            <AlertCircle size={20} />
          </div>
        </div>

        {/* Card 4: Current Streak */}
        <div className="bg-[#0D111A] border border-[#171D2A] p-5 rounded-2xl flex items-center justify-between hover:border-amber-500/30 transition-colors">
          <div>
            <p className="text-xs text-gray-400 font-medium">Current Streak</p>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold">12</span>
              <span className="text-xs text-gray-400 font-medium">Days</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">Best: 18 days</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-950/40 border border-amber-800/30 flex items-center justify-center text-amber-500">
            <Flame size={20} />
          </div>
        </div>
      </div>
      {/* TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: CALENDAR & COURSES */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ATTENDANCE CALENDAR CARD */}
<div className="bg-[#090D16] border border-[#141A29] p-6 rounded-2xl">
  
  {/* TOP ROW: Title + Legend */}
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-2">
      <CalendarIcon size={18} className="text-gray-300" />
      <h3 className="font-semibold text-sm text-gray-100">Attendance Calendar</h3>
    </div>

    {/* Legend Status Dots */}
    <div className="flex items-center gap-5 text-xs text-gray-300">
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Present
      </span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-rose-500"></span> Absent
      </span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500"></span> Leave
      </span>
    </div>
  </div>

  {/* SECOND ROW: Month Nav + Today Button */}
  <div className="flex items-center justify-between mb-6">
    {/* Navigation Arrows & Month Text */}
    <div className="flex items-center gap-3 text-xs">
      <button 
        onClick={handlePrevMonth} 
        className="text-gray-400 hover:text-white transition-colors p-1"
      >
        <ChevronLeft size={16} />
      </button>
      
      
      <span className="font-semibold text-gray-200 ml-1">
        {months[currentMonthIndex]}
      </span>

      <button 
        onClick={handleNextMonth} 
        className="text-gray-400 hover:text-white transition-colors p-1 ml-1"
      >
        <ChevronRight size={16} />
      </button>
    </div>

    {/* Today Button */}
    <button 
      onClick={handleResetToday}
      className="px-3.5 py-1.5 text-xs font-medium bg-[#1C1A38] hover:bg-[#26234D] text-primary-300 rounded-xl transition-colors"
    >
      Today
    </button>
  </div>

  

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Interactive Matrix */}
            <div className="grid grid-cols-7 gap-y-2 text-center">
              {calendarDays.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => item.currentMonth && setSelectedDayModal(item)}
                  disabled={!item.currentMonth}
                  className={`flex flex-col items-center justify-center h-11 rounded-xl transition-all ${
                    item.currentMonth 
                      ? "hover:bg-[#161B26] cursor-pointer" 
                      : "opacity-30 cursor-not-allowed"
                  }`}
                >
                  <span className={`text-xs font-medium ${item.currentMonth ? "text-gray-200" : "text-gray-600"}`}>
                    {item.day}
                  </span>
                  {item.status && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                      item.status === "present" ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" :
                      item.status === "absent" ? "bg-rose-500 shadow-sm shadow-rose-500/50" : "bg-amber-500 shadow-sm shadow-amber-500/50"
                    }`} />
                  )}
                </button>
              ))}
            </div>
          </div>






          {/* ATTENDANCE BY COURSE */}
          <div className="bg-[#0D111A] border border-[#171D2A] p-6 rounded-2xl">
            <h3 className="font-semibold text-sm mb-5">Attendance by Course</h3>

            <div className="space-y-3">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setSelectedCourseModal(course)}
                  className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#121622] transition-all group cursor-pointer border border-transparent hover:border-[#1E2536]"
                >
                  <div className="flex items-center gap-3 w-52 shrink-0">
                    <div className={`w-9 h-9 rounded-xl ${course.bg} flex items-center justify-center text-sm border border-white/5`}>
                      {course.icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-200 group-hover:text-primary-400 transition-colors">
                      {course.name}
                    </span>
                  </div>

                  <div className="flex-1 mx-6 hidden sm:block">
                    <div className="w-full bg-[#1A202C] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${course.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold w-10 text-right">{course.percentage}%</span>
                    <span className="text-xs text-gray-400 w-24 text-right hidden md:inline">{course.classes}</span>
                    <ChevronRightSmall size={16} className="text-gray-500 group-hover:text-primary-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#171D2A] text-center">
              <button 
                onClick={() => setShowExportModal(true)}
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 flex items-center justify-center gap-1 mx-auto transition-colors"
              >
                <span>View detailed attendance report</span>
                <ChevronRightSmall size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SUMMARY, TREND, IMPACT, POLICY */}
        <div className="space-y-6">
          
          {/* SUMMARY CARD */}
          <div className="bg-[#0D111A] border border-[#171D2A] p-6 rounded-2xl">
            <h3 className="font-semibold text-sm mb-4">Attendance Summary</h3>
            <div className="flex items-center justify-between">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#1A202C" strokeWidth="4" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="86 100" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="4 100" strokeDashoffset="-86" />
                </svg>
              </div>

              <div className="space-y-2.5 text-xs flex-1 ml-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Present
                  </span>
                  <span className="font-semibold">96% <span className="text-gray-500 font-normal">(47)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Absent
                  </span>
                  <span className="font-semibold">4% <span className="text-gray-500 font-normal">(2)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Leave
                  </span>
                  <span className="font-semibold">0% <span className="text-gray-500 font-normal">(0)</span></span>
                </div>
                <div className="pt-2 border-t border-[#171D2A] flex items-center justify-between text-gray-400">
                  <span>Total Classes</span>
                  <span className="font-bold text-white">49</span>
                </div>
              </div>
            </div>
          </div>

          {/* MONTHLY TREND GRAPH */}
          <div className="bg-[#0D111A] border border-[#171D2A] p-6 rounded-2xl">
            <h3 className="font-semibold text-sm mb-4">Monthly Trend</h3>
            <div className="h-28 w-full relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0 20 Q 25 15, 50 10 T 100 5 L 100 40 L 0 40 Z" fill="url(#chartGradient)" />
                <path d="M0 20 Q 25 15, 50 10 T 100 5" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <circle cx="100" cy="5" r="2" className="fill-primary-400 stroke-primary-200 stroke-1" />
              </svg>
              <span className="absolute top-0 right-0 text-[10px] font-bold text-primary-300 bg-primary-950/80 px-1.5 py-0.5 rounded border border-primary-800/40">
                96%
              </span>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-3 pt-2 border-t border-[#171D2A]/60">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
            </div>
          </div>

          {/* IMPACT ON PERFORMANCE */}
          <div className="bg-[#0D111A] border border-[#171D2A] p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Impact on Performance</h3>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                High Impact
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your attendance is excellent! Keep it up.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#11151E] p-3 rounded-xl border border-[#1A202C]">
                <div className="text-emerald-400 text-xs font-bold">↑ +12%</div>
                <p className="text-[10px] text-gray-400 mt-1">Better performance with &gt; 90% attendance</p>
              </div>
              <div className="bg-[#11151E] p-3 rounded-xl border border-[#1A202C]">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  <span>Top 10%</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Among students in your courses</p>
              </div>
            </div>
          </div>

          {/* ATTENDANCE POLICY */}
          <div className="bg-[#0D111A] border border-[#171D2A] p-6 rounded-2xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Attendance Policy</h3>
              <button onClick={() => setShowPolicyModal(true)} className="text-xs text-primary-400 hover:underline">
                View Policy
              </button>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <Info size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Minimum required attendance: <strong className="text-gray-200">75%</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Attendance below 75% may lead to grade penalty</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CalendarIcon size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Leave requests must be submitted in advance</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FileCheck size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Medical certificates accepted for absences</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE MODALS
          ========================================================================= */}
      
      {/* 1. DAY DETAILS MODAL */}
      <AnimatePresence>
        {selectedDayModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-[#0D111A] border border-[#171D2A] rounded-2xl w-full max-w-md p-6 space-y-4 relative shadow-2xl"
            >
            <button 
              onClick={() => setSelectedDayModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-950/60 border border-primary-800/40 flex items-center justify-center text-primary-400 font-bold">
                {selectedDayModal.day}
              </div>
              <div>
                <h3 className="font-bold text-sm">May {selectedDayModal.day}, 2024</h3>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                  selectedDayModal.status === "present" ? "text-emerald-400" :
                  selectedDayModal.status === "absent" ? "text-rose-400" : "text-amber-400"
                }`}>
                  Status: {selectedDayModal.status || "No Scheduled Class"}
                </span>
              </div>
            </div>

            <div className="border-t border-[#171D2A] pt-4 space-y-3">
              <h4 className="text-xs font-semibold text-gray-400">Class Logs:</h4>
              {selectedDayModal.details && selectedDayModal.details.length > 0 ? (
                selectedDayModal.details.map((item, i) => (
                  <div key={i} className="bg-[#11151E] p-3 rounded-xl border border-[#1A202C] space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-200">
                      <span>{item.class}</span>
                      <span className="flex items-center gap-1 text-gray-400 text-[10px]"><Clock size={12}/> {item.time}</span>
                    </div>
                    <p className="text-xs text-primary-400 font-medium">Topic: {item.topic}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic">No recorded attendance logs for this day.</p>
              )}
            </div>

            <button 
              onClick={() => setSelectedDayModal(null)}
              className="w-full py-2 bg-[#1A202C] hover:bg-[#222938] text-xs font-semibold rounded-xl text-gray-300 transition-colors"
            >
              Close
            </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. COURSE DETAILS MODAL */}
      <AnimatePresence>
        {selectedCourseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-[#0D111A] border border-[#171D2A] rounded-2xl w-full max-w-md p-6 space-y-5 relative shadow-2xl"
            >
            <button 
              onClick={() => setSelectedCourseModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${selectedCourseModal.bg} flex items-center justify-center text-xl`}>
                {selectedCourseModal.icon}
              </div>
              <div>
                <h3 className="font-bold text-base">{selectedCourseModal.name}</h3>
                <p className="text-xs text-gray-400">Attendance Breakdown</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#11151E] p-3 rounded-xl border border-[#1A202C]">
                <span className="text-[10px] text-gray-400">Classes Attended</span>
                <p className="text-lg font-bold text-emerald-400 mt-1">{selectedCourseModal.attended} / {selectedCourseModal.total}</p>
              </div>
              <div className="bg-[#11151E] p-3 rounded-xl border border-[#1A202C]">
                <span className="text-[10px] text-gray-400">Percentage Score</span>
                <p className="text-lg font-bold text-primary-400 mt-1">{selectedCourseModal.percentage}%</p>
              </div>
            </div>

            <button 
              onClick={() => setSelectedCourseModal(null)}
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-500 text-xs font-semibold rounded-xl text-white transition-colors"
            >
              Done
            </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. EXPORT REPORT MODAL */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-[#0D111A] border border-[#171D2A] rounded-2xl w-full max-w-sm p-6 space-y-4 relative shadow-2xl text-center"
            >
            <button 
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-primary-950/60 border border-primary-800/40 text-primary-400 flex items-center justify-center mx-auto">
              <FileText size={24} />
            </div>

            <div>
              <h3 className="font-bold text-base">Export Attendance Report</h3>
              <p className="text-xs text-gray-400 mt-1">Download your official attendance record for May 2024.</p>
            </div>

            <div className="space-y-2 pt-2">
              <button 
                onClick={() => {
                  const content = "Attendance Report 2026\nCourse,Attended,Total,Percentage\nTajweed Foundations,15,16,98%\nHadith Sciences: An Introduction,15,16,94%\nQur'anic Arabic for Beginners,24,25,96%\nFiqh of Worship: Salah & Purification,14,15,93%\nOverall,47,49,96%";
                  const blob = new Blob([content], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "Attendance_Report_2026.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                  setShowExportModal(false);
                }}
                className="w-full py-2.5 bg-primary-600 hover:bg-primary-500 text-xs font-semibold rounded-xl text-white transition-colors flex items-center justify-center gap-2"
              >
                <Download size={14} /> Download Report
              </button>
              <button 
                onClick={() => {
                  const csv = "Course,Attended,Total,Percentage\nTajweed Foundations,15,16,98%\nHadith Sciences: An Introduction,15,16,94%\nQur'anic Arabic for Beginners,24,25,96%\nFiqh of Worship: Salah & Purification,14,15,93%\n";
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "Attendance_Data_2026.csv";
                  a.click();
                  URL.revokeObjectURL(url);
                  setShowExportModal(false);
                }}
                className="w-full py-2.5 bg-[#11151E] hover:bg-[#1A202C] border border-[#1A202C] text-xs font-semibold rounded-xl text-gray-300 transition-colors"
              >
                Export CSV Data
              </button>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. ATTENDANCE POLICY MODAL */}
      <AnimatePresence>
        {showPolicyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPolicyModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0D111A] border border-[#171D2A] rounded-2xl w-full max-w-md p-6 space-y-4 relative shadow-2xl"
            >
            <button
              onClick={() => setShowPolicyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div>
              <h3 className="font-bold text-base">Attendance Policy</h3>
              <p className="text-xs text-gray-400 mt-1">
                A quick summary of the university&apos;s attendance requirements. Refer to the student handbook for the full policy.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <Info size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Minimum required attendance is <strong className="text-gray-200">75%</strong> per course</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FileCheck size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Absences are excused only with an approved leave request or medical certificate</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Falling below 75% attendance may result in a grade penalty or course ineligibility</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CalendarIcon size={14} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Leave requests must be submitted at least 24 hours in advance where possible</span>
              </li>
            </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}