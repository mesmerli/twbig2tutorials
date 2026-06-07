/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Card, Suit } from '../types';
import { SUIT_SYMBOLS, SUIT_NAMES } from '../utils/cardUtils';

interface CardViewProps {
  card: Card;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  highlighted?: boolean; // Highlight cards for training/tutorial suggestions
  size?: 'sm' | 'md' | 'lg';
}

export const CardView: React.FC<CardViewProps> = ({
  card,
  selected = false,
  onClick,
  disabled = false,
  highlighted = false,
  size = 'md',
}) => {
  const isRed = card.suit === Suit.DIAMOND || card.suit === Suit.HEART;
  const suitSymbol = SUIT_SYMBOLS[card.suit];
  const suitName = SUIT_NAMES[card.suit];

  // Colors based on suit
  const getThemeColor = () => {
    switch (card.suit) {
      case Suit.SPADE:
        return { text: 'text-slate-800', border: 'border-slate-300', bg: 'bg-white', suitColor: 'text-indigo-900' };
      case Suit.HEART:
        return { text: 'text-rose-600', border: 'border-rose-200', bg: 'bg-white', suitColor: 'text-rose-600' };
      case Suit.DIAMOND:
        return { text: 'text-amber-600', border: 'border-amber-200', bg: 'bg-white', suitColor: 'text-amber-600' };
      case Suit.CLUB:
        return { text: 'text-emerald-800', border: 'border-emerald-300', bg: 'bg-white', suitColor: 'text-emerald-800' };
    }
  };

  const theme = getThemeColor();

  // Handle dimensions
  const dimensions = {
    sm: 'w-14 h-20 text-xs rounded-md shadow-sm',
    md: 'w-20 h-28 text-base rounded-lg shadow',
    lg: 'w-28 h-40 text-xl rounded-xl shadow-md',
  }[size];

  const suitIconSize = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl',
  }[size];

  return (
    <motion.button
      id={`card-${card.id}`}
      whileHover={!disabled ? { y: -8, scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      animate={{
        y: selected ? -16 : 0,
        boxShadow: selected
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
      onClick={() => {
        if (!disabled && onClick) {
          onClick();
        }
      }}
      disabled={disabled}
      className={`
        relative flex flex-col justify-between p-1.5 md:p-2.5 border bg-white cursor-pointer select-none transition-colors duration-150
        ${dimensions}
        ${theme.text}
        ${selected ? 'border-amber-450 ring-4 ring-gold' : theme.border}
        ${disabled ? 'opacity-40 cursor-not-allowed bg-white/20 border-white/5 text-white/40' : 'hover:border-gold/60'}
        ${highlighted ? 'border-4 border-gold animate-pulse duration-1000 bg-amber-50/10' : ''}
      `}
      aria-label={`${suitName} ${card.rank}`}
    >
      {/* Top Left Indicator */}
      <div className="flex flex-col items-center justify-start leading-none">
        <span className="font-sans font-bold tracking-tighter">{card.rank}</span>
        <span className={`font-serif leading-none mt-0.5 ${theme.suitColor}`}>{suitSymbol}</span>
      </div>

      {/* Center Suit Symbol */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
        <span className={`font-serif font-black ${suitIconSize} ${theme.suitColor}`}>{suitSymbol}</span>
      </div>

      {/* Bottom Right Indicator - Rotated */}
      <div className="flex flex-col items-center justify-start leading-none self-end rotate-180">
        <span className="font-sans font-bold tracking-tighter">{card.rank}</span>
        <span className={`font-serif leading-none mt-0.5 ${theme.suitColor}`}>{suitSymbol}</span>
      </div>

      {/* Tutorial Advice Highlight Arrow or Tag */}
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow border border-white whitespace-nowrap animate-bounce">
          點我！
        </span>
      )}
    </motion.button>
  );
};
