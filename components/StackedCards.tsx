"use client"

const cards = [
  {
    title: "Smooth",
    description: "Feel the butter-like smoothness of native scrolling.",
    color: "bg-zinc-800",
    textColor: "text-white",
    borderColor: "border-zinc-700",
  },
  {
    title: "Responsive",
    description: "Works perfectly on desktop, tablet, and mobile devices.",
    color: "bg-zinc-800",
    textColor: "text-white",
    borderColor: "border-zinc-700",
  },
  {
    title: "Lightweight",
    description: "A tiny footprint that packs a massive punch.",
    color: "bg-zinc-800",
    textColor: "text-white",
    borderColor: "border-zinc-700",
  },
  {
    title: "Beautiful",
    description: "Create stunning immersive experiences effortlessly.",
    color: "bg-zinc-800",
    textColor: "text-white",
    borderColor: "border-zinc-700",
  },
]

export function StackedCards() {
  return (
    <div className="relative w-full pb-32">
      {cards.map((card, i) => {
        // As each new card sticks, it's slightly lower than the previous one.
        // E.g. card 0: top-32, card 1: top-40, card 2: top-48
        return (
          <div 
            key={i} 
            className="sticky w-full transition-all duration-300"
            // The magic is here: increase the top and margin-left offset for each card
            style={{ 
              top: `calc(8rem + ${i * 4}rem)`,
              marginLeft: `${i * 2}rem`,
              zIndex: i + 1,
            }}
          >
            {/* The actual card */}
            <div className={`relative ${card.color} ${card.textColor} border ${card.borderColor} rounded-[2rem] p-10 md:p-14 shadow-2xl w-full h-[60vh] md:h-[50vh] flex flex-col justify-between mb-24`}>
              
              <div className="flex justify-between items-start">
                 <h2 className="text-4xl md:text-5xl font-bold">{card.title}</h2>
                 <span className="text-2xl font-bold text-zinc-500">0{i + 1}</span>
              </div>
              
              <p className="text-xl md:text-2xl text-zinc-300 max-w-sm">
                {card.description}
              </p>

            </div>
          </div>
        )
      })}
    </div>
  )
}
