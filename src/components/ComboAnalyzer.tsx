/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Suit, Rank, ComboType } from '../types';
import { CardView } from './CardView';
import { analyzeCombo, generateDeck, SUIT_NAMES, SUIT_SYMBOLS } from '../utils/cardUtils';
import { Sparkles, Trash2, HelpCircle, Layers, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

export const ComboAnalyzer: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [suitFilter, setSuitFilter] = useState<Suit | 'ALL'>('ALL');

  // Complete deck of cards
  const fullDeck = useMemo(() => generateDeck(), []);

  // Filtered deck for easy selection
  const filteredDeck = useMemo(() => {
    if (suitFilter === 'ALL') {
      // Sort so it is organized by Rank for ease of picking
      return [...fullDeck].sort((a, b) => {
        const orderA = "345678910JQKA2".indexOf(a.rank);
        const orderB = "345678910JQKA2".indexOf(b.rank);
        return orderA - orderB;
      });
    }
    return fullDeck.filter(c => c.suit === suitFilter);
  }, [fullDeck, suitFilter]);

  // Click handler to toggle card selection (max 5)
  const handleCardToggle = (card: Card) => {
    const isAlreadySelected = selectedCards.some(c => c.id === card.id);
    if (isAlreadySelected) {
      setSelectedCards(prev => prev.filter(c => c.id !== card.id));
    } else {
      if (selectedCards.length >= 5) {
        // Replace the last card or prevent? Best to restrict to 5 max
        return;
      }
      setSelectedCards(prev => [...prev, card]);
    }
  };

  const handleClear = () => {
    setSelectedCards([]);
  };

  // Preset Hand Selections
  const applyPreset = (type: string) => {
    let presetCards: Card[] = [];
    switch (type) {
      case 'straight_flush':
        presetCards = [
          { id: 'SPADE_8', suit: Suit.SPADE, rank: Rank.EIGHT },
          { id: 'SPADE_9', suit: Suit.SPADE, rank: Rank.NINE },
          { id: 'SPADE_10', suit: Suit.SPADE, rank: Rank.TEN },
          { id: 'SPADE_JACK', suit: Suit.SPADE, rank: Rank.JACK },
          { id: 'SPADE_QUEEN', suit: Suit.SPADE, rank: Rank.QUEEN },
        ];
        break;
      case 'four_of_a_kind':
        presetCards = [
          { id: 'SPADE_JACK', suit: Suit.SPADE, rank: Rank.JACK },
          { id: 'HEART_JACK', suit: Suit.HEART, rank: Rank.JACK },
          { id: 'DIAMOND_JACK', suit: Suit.DIAMOND, rank: Rank.JACK },
          { id: 'CLUB_JACK', suit: Suit.CLUB, rank: Rank.JACK },
          { id: 'CLUB_THREE', suit: Suit.CLUB, rank: Rank.THREE },
        ];
        break;
      case 'full_house':
        presetCards = [
          { id: 'CLUB_EIGHT', suit: Suit.CLUB, rank: Rank.EIGHT },
          { id: 'DIAMOND_EIGHT', suit: Suit.DIAMOND, rank: Rank.EIGHT },
          { id: 'HEART_EIGHT', suit: Suit.HEART, rank: Rank.EIGHT },
          { id: 'SPADE_FIVE', suit: Suit.SPADE, rank: Rank.FIVE },
          { id: 'HEART_FIVE', suit: Suit.HEART, rank: Rank.FIVE },
        ];
        break;
      case 'flush':
        presetCards = [
          { id: 'DIAMOND_THREE', suit: Suit.DIAMOND, rank: Rank.THREE },
          { id: 'DIAMOND_SIX', suit: Suit.DIAMOND, rank: Rank.SIX },
          { id: 'DIAMOND_NINE', suit: Suit.DIAMOND, rank: Rank.NINE },
          { id: 'DIAMOND_JACK', suit: Suit.DIAMOND, rank: Rank.JACK },
          { id: 'DIAMOND_TWO', suit: Suit.DIAMOND, rank: Rank.TWO },
        ];
        break;
      case 'straight':
        presetCards = [
          { id: 'CLUB_FOUR', suit: Suit.CLUB, rank: Rank.FOUR },
          { id: 'HEART_FIVE', suit: Suit.HEART, rank: Rank.FIVE },
          { id: 'DIAMOND_SIX', suit: Suit.DIAMOND, rank: Rank.SIX },
          { id: 'SPADE_SEVEN', suit: Suit.SPADE, rank: Rank.SEVEN },
          { id: 'CLUB_EIGHT', suit: Suit.CLUB, rank: Rank.EIGHT },
        ];
        break;
      case 'pair':
        presetCards = [
          { id: 'SPADE_TWO', suit: Suit.SPADE, rank: Rank.TWO },
          { id: 'CLUB_TWO', suit: Suit.CLUB, rank: Rank.TWO },
        ];
        break;
      default:
        presetCards = [];
    }
    setSelectedCards(presetCards);
  };

  // Perform core analysis
  const analysis = useMemo(() => analyzeCombo(selectedCards), [selectedCards]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT: Hand Display and Analyzer Explanation (5 columns) */}
      <div className="lg:col-span-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-6 text-cream">
        <div>
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h3 className="text-lg font-serif font-bold text-gold flex items-center gap-1.5">
              <Layers className="w-5 h-5 text-gold" />
              我的模擬手牌：
              <span className="text-xs bg-forest-dark text-gold ring-1 ring-gold/15 px-2.5 py-1 rounded-full font-bold">
                {selectedCards.length} / 5 張
              </span>
            </h3>
            {selectedCards.length > 0 && (
              <button
                onClick={handleClear}
                className="text-xs text-rose-300 hover:text-rose-100 bg-rose-955/20 hover:bg-rose-900/30 px-3 py-1 rounded-md border border-rose-300/20 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                全部清空
              </button>
            )}
          </div>

          {/* Active Cards display area */}
          <div className="min-h-[160px] flex items-center justify-center p-4 bg-forest-dark rounded-xl mt-4 border border-dashed border-gold/20 relative overflow-hidden">
            {selectedCards.length === 0 ? (
              <div className="text-center text-cream/40 space-y-2 p-6 z-10">
                <HelpCircle className="w-10 h-10 mx-auto text-gold/30" />
                <p className="text-sm font-semibold font-serif text-gold/80">手牌空空如也</p>
                <p className="text-xs font-light">請點選右側卡牌庫，或是套用一組下方推薦段牌型！</p>
              </div>
            ) : (
              <div className="flex gap-2 justify-center flex-wrap">
                <AnimatePresence>
                  {selectedCards.map(card => (
                    <motion.div
                      key={card.id}
                      initial={{ scale: 0.8, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: -10 }}
                      className="relative shrink-0"
                    >
                      <CardView
                        card={card}
                        size="md"
                        onClick={() => handleCardToggle(card)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Analyzer verdict card */}
        <div className={`p-4 rounded-xl border ${
          selectedCards.length === 0 ? 'bg-forest-light/10 border-gold/10' :
          analysis.isValid ? 'bg-gold/10 border-gold/30' : 'bg-red-950/20 border-red-900/30'
        }`}>
          <div className="flex gap-3">
            <div className="mt-0.5">
              {selectedCards.length === 0 ? (
                <Lightbulb className="w-5 h-5 text-gold" />
              ) : analysis.isValid ? (
                <CheckCircle2 className="w-5 h-5 text-gold animate-bounce" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              )}
            </div>
            <div className="space-y-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                selectedCards.length === 0 ? 'text-cream/55' :
                analysis.isValid ? 'text-gold' : 'text-rose-300'
              }`}>
                牌型分析結果
              </span>
              <h4 className="font-bold text-gold text-base font-serif">{analysis.name}</h4>
              <p className="text-xs text-cream/80 leading-relaxed font-light">{analysis.message}</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Selection Deck Keyboard (7 columns) */}
      <div className="lg:col-span-7 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-5 text-cream">
        <h3 className="text-lg font-serif font-bold text-gold flex items-center gap-1.5 border-b border-white/10 pb-3">
          <Sparkles className="w-5 h-5 text-gold" />
          自選卡牌庫 / 快速體驗
        </h3>

        {/* Quick presets buttons */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gold/80 font-serif">快速推薦牌組：</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('straight_flush')}
              className="text-xs bg-gold text-forest/90 font-serif font-extrabold px-3 py-1.5 rounded-lg hover:bg-amber-300 border border-yellow-200 shadow-md transition-colors cursor-pointer"
            >
              🎉 同花順 (1st)
            </button>
            <button
              onClick={() => applyPreset('four_of_a_kind')}
              className="text-xs bg-forest border border-gold/40 text-rose-300 font-bold px-3 py-1.5 rounded-lg hover:bg-forest-light transition-colors cursor-pointer"
            >
              🚀 鐵支 (2nd)
            </button>
            <button
              onClick={() => applyPreset('full_house')}
              className="text-xs bg-forest border border-gold/40 text-amber-300 font-bold px-3 py-1.5 rounded-lg hover:bg-forest-light transition-colors cursor-pointer"
            >
              🍕 葫蘆 (3rd)
            </button>
            <button
              onClick={() => applyPreset('flush')}
              className="text-xs bg-forest border border-gold/40 text-indigo-300 font-bold px-3 py-1.5 rounded-lg hover:bg-forest-light transition-colors cursor-pointer"
            >
              💧 同花 (4th)
            </button>
            <button
              onClick={() => applyPreset('straight')}
              className="text-xs bg-forest border border-gold/40 text-cream font-bold px-3 py-1.5 rounded-lg hover:bg-forest-light transition-colors cursor-pointer"
            >
              🌲 順子 (5th)
            </button>
            <button
              onClick={() => applyPreset('pair')}
              className="text-xs bg-forest border border-gold/40 text-yellow-300 font-bold px-3 py-1.5 rounded-lg hover:bg-forest-light transition-colors cursor-pointer"
            >
              🍒 對子 (Pair 2)
            </button>
          </div>
        </div>

        {/* Filter Tab Row */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setSuitFilter('ALL')}
            className={`text-xs px-3 py-1 rounded font-serif font-bold transition-all ${
              suitFilter === 'ALL' ? 'bg-gold text-forest border border-yellow-250 font-black' : 'bg-forest text-cream hover:bg-forest-light border border-gold/20'
            }`}
          >
            全部花色
          </button>
          {Object.values(Suit).map(s => (
            <button
              key={s}
              onClick={() => setSuitFilter(s)}
              className={`text-xs px-2.5 py-1 rounded font-bold transition-all ${
                suitFilter === s ? 'bg-gold text-forest border border-yellow-250' : 'bg-forest text-cream hover:bg-forest-light border border-gold/20'
              }`}
            >
              {SUIT_SYMBOLS[s]} {SUIT_NAMES[s]}
            </button>
          ))}
        </div>

        {/* Dense visual layout of selectable cards */}
        <div className="max-h-[300px] overflow-y-auto pr-1 grid grid-cols-5 sm:grid-cols-7 gap-1.5 p-1.5 bg-forest-dark rounded-xl border border-gold/15" id="analyzer-card-pool">
          {filteredDeck.map(card => {
            const isSelected = selectedCards.some(c => c.id === card.id);
            const isRed = card.suit === Suit.DIAMOND || card.suit === Suit.HEART;
            return (
              <button
                key={card.id}
                onClick={() => handleCardToggle(card)}
                className={`
                  p-2 flex flex-col justify-between aspect-3/4 rounded border select-none transition-all cursor-pointer
                  hover:scale-105 active:scale-95 text-left
                  ${isSelected ? 'bg-gold text-forest font-bold scale-95 opacity-80 border-gold ring-1 ring-gold' : 'bg-forest-dark border-gold/15 hover:border-gold/30'}
                  ${!isSelected && isRed ? 'text-rose-450' : ''}
                  ${!isSelected && !isRed ? 'text-cream' : ''}
                `}
                title={`${SUIT_NAMES[card.suit]} ${card.rank}`}
              >
                <div className="text-[11px] leading-none font-extrabold">{card.rank}</div>
                <div className="text-xl leading-none self-center font-serif">{SUIT_SYMBOLS[card.suit]}</div>
                <div className="text-[9px] leading-none self-end select-none font-bold">
                  {isSelected ? '✓' : ''}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-cream/45 italic">
          💡 小技巧：在點數選取庫中點擊卡牌即加入模擬器。隨意選取 1 - 5 張，觀賞左邊大老二評審為您提供的動態專業評定！
        </p>
      </div>
    </div>
  );
};
