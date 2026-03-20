/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Coffee, Sparkles, User, Gift } from 'lucide-react';

const MESSAGES = {
  hug: [
    "Come here, I've got you. ❤️",
    "Everything is going to be okay. Just breathe.",
    "Holding you tight in my thoughts right now.",
    "You're doing so well, I'm so proud of you.",
    "Sending you the warmest, longest hug ever.",
    "I wish I could actually wrap my arms around you right now.",
    "You're safe with me. Always.",
  ],
  chocolate: [
    "A little sweetness for the sweetest person I know. 🍫",
    "You deserve all the treats in the world today.",
    "Here's your favorite. I saved the biggest piece for you.",
    "Just a little something to make you smile.",
    "Chocolate makes everything better, but you make it perfect.",
    "Treat yourself, beautiful. You've earned it.",
    "I wish I could hand-deliver this to you right now.",
  ],
  kiss: [
    "A soft kiss on your forehead. You're so precious. 😘",
    "Sending a million kisses your way right now.",
    "Mwah! Just because I love you.",
    "Close your eyes... feel that? It's a kiss from me.",
    "You're so kissable, it's actually unfair.",
    "A little kiss to make your day brighter.",
    "I'm saving a real one for when I see you next.",
  ]
};

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function App() {
  const [message, setMessage] = useState("Hey you. Need a little pick-me-up?");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeType, setActiveType] = useState<'hug' | 'chocolate' | 'kiss' | null>(null);

  const spawnParticles = (emoji: string) => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      emoji
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  const handleAction = (type: 'hug' | 'chocolate' | 'kiss') => {
    const randomMsg = MESSAGES[type][Math.floor(Math.random() * MESSAGES[type].length)];
    setMessage(randomMsg);
    setActiveType(type);
    
    let emoji = '🫂';
    if (type === 'chocolate') emoji = '🍫';
    if (type === 'kiss') emoji = '😘';
    
    spawnParticles(emoji);
    
    // Reset active type for animation trigger
    setTimeout(() => setActiveType(null), 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col items-center justify-center p-6 font-sans overflow-hidden selection:bg-rose-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 w-full max-w-md flex flex-col items-center space-y-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
              <User size={16} className="text-zinc-400" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Your Personal Space</span>
          </div>
          <h1 className="text-4xl font-light tracking-tight text-zinc-200">
            Sweetheart <span className="italic font-serif text-rose-400">Hub</span>
          </h1>
        </motion.div>

        {/* Message Display */}
        <div className="h-32 flex items-center justify-center w-full px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl text-center font-light leading-relaxed text-zinc-300 max-w-xs"
            >
              {message}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Interaction Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction('hug')}
            className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-rose-500/50 transition-colors overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-4xl mb-3 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">🫂</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-rose-400 transition-colors">Instant Hug</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction('kiss')}
            className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-pink-500/50 transition-colors overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-4xl mb-3 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">😘</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-pink-400 transition-colors">Instant Kiss</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction('chocolate')}
            className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 transition-colors overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-4xl mb-3 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">🍫</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-amber-400 transition-colors">Chocolate</span>
          </motion.button>
        </div>

        {/* Footer Accents */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center space-x-6 pt-8"
        >
          <div className="flex items-center space-x-2 text-zinc-600">
            <Heart size={14} />
            <span className="text-[10px] uppercase tracking-widest">Always Here</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-800" />
          <div className="flex items-center space-x-2 text-zinc-600">
            <Sparkles size={14} />
            <span className="text-[10px] uppercase tracking-widest">Pure Love</span>
          </div>
        </motion.div>
      </main>

      {/* Particle Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0, x: '50vw', y: '50vh' }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0.5, 1.5, 0.5],
                x: `calc(50vw + ${p.x}vw)`,
                y: `calc(50vh + ${p.y}vh)`,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute text-3xl"
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Subtle Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
}
