// apps/landing/sections/Solution/Solution.tsx
import Image from 'next/image';

import robotLogo from '../../../public/robot-face-svgrepo-com.svg';
import handLogo from '../../../public/hand-svgrepo-com.svg';
import chartLogo from '../../../public/bar-chart-1-svgrepo-com.svg';
import capLogo from '../../../public/cap-education-graduation-svgrepo-com.svg';

import professorImage from '../../../public/Gemini_Generated_Image_foc11efoc11efoc1.png';
import interactionImage from '../../../public/omar-lopez-rincon-WqSWLtKrDEY-unsplash.jpg';
import accountabilityImage from '../../../public/prashant-hiremath-phS1wAgXOQI-unsplash.jpg';
import tutorImage from '../../../public/zulfugar-karimov-g9jkFm899i0-unsplash.jpg';

export function Solution() {
  return (
    <section className="py-20 px-4 font-inter" style={{ backgroundColor: '#09090B' }}>
      <div className="max-w-6xl mx-auto">
        {/* Centered Text Div */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-blue-500 text-sm font-semibold rounded-full mb-4 border border-blue-500/30 bg-blue-500/10">
            THE SOLUTION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-geist">
            An AI University built for <span style={{ color: '#3B82F6' }}>how you learn</span>.
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We combine the power of AI with proven learning principles to deliver real education outcomes.
          </p>
        </div>

        {/* 4 Cards in Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - AI Professors */}
          <div 
            className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            style={{ 
              backgroundColor: '#111827',
              borderColor: '#27272A'
            }}
          >
            <div 
              className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: '#220055' }}
            >
              <Image
                src={robotLogo}
                alt="AI Professors"
                width={28}
                height={28}
                className="brightness-0 invert"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-geist group-hover:text-blue-400 transition-colors">
              AI Professors
            </h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Attend live classes taught by AI professors that explain, teach, and adapt to you.
            </p>
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <Image
                src={professorImage}
                alt="AI Professors feature"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2 - Live Interaction */}
          <div 
            className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            style={{ 
              backgroundColor: '#111827',
              borderColor: '#27272A'
            }}
          >
            <div 
              className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: '#220055' }}
            >
              <Image
                src={handLogo}
                alt="Live Interaction"
                width={28}
                height={28}
                className="brightness-0 invert"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-geist group-hover:text-blue-400 transition-colors">
              Live Interaction
            </h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Raise your hand, ask questions, and get real-time answers just like a real classroom.
            </p>
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <Image
                src={interactionImage}
                alt="Live Interaction feature"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 3 - Stay Accountable */}
          <div 
            className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            style={{ 
              backgroundColor: '#111827',
              borderColor: '#27272A'
            }}
          >
            <div 
              className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: '#220055' }}
            >
              <Image
                src={chartLogo}
                alt="Stay Accountable"
                width={28}
                height={28}
                className="brightness-0 invert"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-geist group-hover:text-blue-400 transition-colors">
              Stay Accountable
            </h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              We track attendance, progress, and participation to keep you motivated and on track.
            </p>
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <Image
                src={accountabilityImage}
                alt="Stay Accountable feature"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 4 - Personal AI Tutor */}
          <div 
            className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            style={{ 
              backgroundColor: '#111827',
              borderColor: '#27272A'
            }}
          >
            <div 
              className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: '#220055' }}
            >
              <Image
                src={capLogo}
                alt="Personal AI Tutor"
                width={28}
                height={28}
                className="brightness-0 invert"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-geist group-hover:text-blue-400 transition-colors">
              Personal AI Tutor
            </h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Get personalized help anytime, review concepts, and prepare better for every class.
            </p>
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <Image
                src={tutorImage}
                alt="Personal AI Tutor feature"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 font-medium font-geist">
            It&apos;s not just online learning. It&apos;s the <span style={{ color: '#3B82F6' }}>next generation</span> of education.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3B82F6' }}></span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3B82F6', opacity: 0.6 }}></span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3B82F6', opacity: 0.3 }}></span>
          </div>
        </div>
      </div>
    </section>
  );
}