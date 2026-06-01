import React, { useState } from 'react';



// Sample data mimicking your game portfolio setup
const games = [
  {
    id: 1,
    title: "Ascend From Depths",
    imageUrl: "https://img.itch.zone/aW1nLzIwNjIxMzgxLnBuZw==/315x250%23c/pqJmEB.png", // Replace with your game art
    description: "Play as a diver starts from the deepest depth of the mariana trench to the surface.",
    engine: "Unity Engine",
    ctaLink: "https://cipherlius.itch.io/ld57"
  },
  {
    id: 2,
    title: "Waking up at Dawn",
    imageUrl: "https://img.itch.zone/aW1nLzE4MjkzOTM3LnBuZw==/315x250%23c/FyYwdU.png",
    description: "A horror game prototype made for horror game jam.",
    engine: "Unity Engine",
    ctaLink: "https://cipherlius.itch.io/wakingupatdawn"
  },
  {
    id: 3,
    title: "Drown Me If You Can",
    imageUrl: "https://img.itch.zone/aW1nLzE2NjU5NjUwLnBuZw==/315x250%23c/hfB7bz.png",
    description: "Bullet heaven game with Pokemon Rescue twist, catch monsters to make them fight by your side.",
    engine: "Godot Engine",
    ctaLink: "https://cipherlius.itch.io/drown-me-if-you-can"
  },
  {
    id: 4,
    title: "Aberrola",
    imageUrl: "https://img.itch.zone/aW1nLzE1MzgwMDA2LnBuZw==/315x250%23c/ARcA2E.png",
    description: "Story, puzzle, action game. Figure out what happened to the world and its sun. Using berries, complete the story by tactically defeating monsters or completely go pacifist.",
    engine: "Godot Engine",
    ctaLink: "https://cipherlius.itch.io/aberrola"
  },
  {
    id: 5,
    title: "Evergreen Farms",
    imageUrl: "https://img.itch.zone/aW1nLzE0NDUwNzYwLnBuZw==/315x250%23c/JQRvnE.png",
    engine: "Godot Engine",
    description: "Another bullet heaven game where you defend your neighbor with arsenal of christmas weapons.",
    ctaLink: "https://cipherlius.itch.io/evergreen-farms"
  },
  {
    id: 6,
    title: "Do blind people dream", 
    imageUrl: "https://img.itch.zone/aW1nLzE0NDczNjM2LnBuZw==/315x250%23c/Z59OxW.png",
    engine: "Unity Engine",
    description: "A horror game that uses sound waves to navigate the place. You might have to be quiet with your steps.",
    ctaLink: "https://cipherlius.itch.io/do-blind-people-dream"
  }
];

const GameShowcase = () => {
  // Track which item index is currently featured on top
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredGame = games[activeIndex];

  return (
    <div className="bg-black text-white font-mono p-0 md:p-8 flex flex-col items-center">

      {/* Main Showcase Banner */}
      <div className="relative md:w-full md:max-w-3xl h-[300px] md:h-[400px] border border-gray-700 rounded-xl overflow-hidden bg-zinc-900 group mb-8 shadow-2xl">
        {/* Main Background Image */}
        <img 
          src={featuredGame.imageUrl} 
          alt={featuredGame.title} 
          className="w-full h-full object-cover opacity-60 transition-all duration-500"
        />

        {/* Text Overlay: Keeps text clean and prevents the overlapping text bug */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
          <h2 className="text-xl md:text-2xl font-bold tracking-wide drop-shadow-md transition-all">
            {featuredGame.title}
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-md drop-shadow">
            {featuredGame.description}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeIndex === index ? 'bg-white scale-110' : 'bg-gray-500 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 right-0 p-8">
          <a href={featuredGame.ctaLink} className='block p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors absolute bottom-0 right-0 md:static opacity-60 hover:opacity-100 md:opacity-100 md:hover:opacity-100' target='_blank' rel='noopener'>
            <h2 className="text-md font-bold tracking-wide drop-shadow-md transition-all">
              Play
            </h2>
          </a>
        </div>

        <div className="absolute top-1 left-1 p-2 opacity-90 bg-gray-700 rounded-2xl">
          <b className="opacity-100 text-xs">{featuredGame.engine}</b>
        </div>
      </div>

      {/* Grid Selection Menu */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-3xl">
        {games.map((game, index) => (
          <button
            key={game.id}
            onClick={() => setActiveIndex(index)}
            className={`aspect-square w-full rounded-lg border overflow-hidden relative group bg-zinc-900 transition-all duration-200 ${
              activeIndex === index 
                ? 'border-white scale-95 ring-2 ring-white/20' 
                : 'border-gray-800 hover:border-gray-500'
            }`}
          >
            {/* Thumbnail Image */}
            <img 
              src={game.imageUrl} 
              alt={game.title} 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
            />
            {/* Minimalist label inside thumbnail */}
            <div className="absolute bottom-1 left-1 right-1 text-[10px] text-center bg-black/70 py-0.5 rounded text-gray-300 truncate">
              {game.title}
            </div>
          </button>
        ))}
      </div>
      
    </div>
  );
}

export default GameShowcase;