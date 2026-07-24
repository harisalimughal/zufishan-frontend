'use client'

import { useState } from 'react'
import { HeaderLogo } from "./HeaderLogo";
import { HeaderDropdown } from "./HeaderDropdown";
import { HeaderPoints } from "./HeaderPoints";

export function Header() {
  const [selectedCourse, setSelectedCourse] = useState('Database 101')

  return (
    <header className="border-b border-[#27272A] bg-black px-6 py-4 flex items-center justify-between flex-shrink-0">
      <HeaderLogo />
      <HeaderDropdown 
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />
      <HeaderPoints />
    </header>
  )
}