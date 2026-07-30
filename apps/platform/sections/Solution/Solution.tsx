// apps/landing/sections/Solution/Solution.tsx
import { Bot, Hand, BarChart3, GraduationCap } from 'lucide-react';

export function Solution() {
  const cards = [
    {
      icon: Bot,
      title: "AI Professors",
      description: "Attend live classes taught by AI professors that explain, teach, and adapt to you.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
      imageAlt: "AI Professors feature",
    },
    {
      icon: Hand,
      title: "Live Interaction",
      description: "Raise your hand, ask questions, and get real-time answers just like a real classroom.",
      image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Live Interaction feature",
    },
    {
      icon: BarChart3,
      title: "Stay Accountable",
      description: "We track attendance, progress, and participation to keep you motivated and on track.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Stay Accountable feature",
    },
    {
      icon: GraduationCap,
      title: "Personal AI Tutor",
      description: "Get personalized help anytime, review concepts, and prepare better for every class.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Personal AI Tutor feature",
    },
  ];

  return (
    <section id="solution" className="py-20 px-4 font-inter" style={{ backgroundColor: '#09090B' }}>
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
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
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
                  <IconComponent size={26} strokeWidth={1.6} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-geist group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {card.description}
                </p>
                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover opacity-80 brightness-75 group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 font-medium font-geist">
            It&apos;s not just online learning. It&apos;s the <span style={{ color: '#3B82F6' }}>next generation</span> of education.
          </p>
        </div>
      </div>
    </section>
  );
}