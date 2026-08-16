"use client";

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Journey } from './components/Journey';
import { Badges } from './components/Badges';
// import { AchievementsHeader } from '.';

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-inter flex flex-col">
      <Header />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4 p-0 lg:p-4 max-w-full mx-auto w-full">
        <div className="lg:col-span-8 space-y-4">
          <Journey />
          <Badges />
        </div>
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
