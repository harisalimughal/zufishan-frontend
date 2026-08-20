"use client";

import { useState } from 'react'
import { HeaderLogo } from "./HeaderLogo";
import { HeaderDropdown } from "./HeaderDropdown";
import { HeaderPoints } from "./HeaderPoints";

export function Header() {
  const [selectedCourse, setSelectedCourse] = useState('Tajweed Foundations')

  return (
    <header className="border-b border-[#27272A] bg-black px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-3 sm:justify-between flex-shrink-0">
      <HeaderLogo />
      <HeaderDropdown 
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />
      <HeaderPoints />
    </header>
  )
}