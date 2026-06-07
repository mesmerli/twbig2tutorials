/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, Award, RefreshCw, ChevronRight, HelpCircle } from 'lucide-react';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '在大老二遊戲中，哪一張牌是「單張」裡絕對點數最小的起手牌？',
    options: ['方塊 3', '紅心 3', '梅花 3 (♣3)', '黑桃 3'],
    correctAnswer: 2,
    explanation: '梅花 3 (♣3) 是大老二中絕對點數最小的一張牌。拿到它的玩家通常必須在第一圈最先打出它。',
  },
  {
    id: 2,
    question: '請問台灣最主流的大老二「花色大小」權重規則是什麼？',
    options: [
      '黑桃 ♠ > 紅心 ♥ > 方塊 ♦ > 梅花 ♣ (黑紅方梅)',
      '紅心 ♥ > 黑桃 ♠ > 方塊 ♦ > 梅花 ♣ (紅黑方梅)',
      '黑桃 ♠ > 梅花 ♣ > 紅心 ♥ > 方塊 ♦ (黑梅紅方)',
      '方塊 ♦ > 紅心 ♥ > 梅花 ♣ > 黑桃 ♠',
    ],
    correctAnswer: 0,
    explanation: '台灣主流規則是「黑紅方梅」。黑桃(♠)最大，其次是紅心(♥)、方塊(♦)，梅花(♣)是最小的花色。',
  },
  {
    id: 3,
    question: '若前一位玩家打出了「紅心 A ♥」，手牌為「黑桃 J ♠」，能否打出壓制？',
    options: [
      '可以，因為黑桃 ♠ 比紅心 ♥ 大',
      '不可以，因為 J 的點數小於 A',
      '可以，因為 J 是大老二裡的特權牌',
    ],
    correctAnswer: 1,
    explanation: '不可以！大老二比牌是「數值第一、花色第二」。A 的點數大於 J，因此不論花色，黑桃 J 都無法壓過任何 A。只在點數相同時，才比較花色。',
  },
  {
    id: 4,
    question: '上家打出「對子 10 (10-10)」，你手上有「順子 (3-4-5-6-7)」，能否直接打出壓死對方？',
    options: [
      '可以，因為順子高達 5 張，張數多就能壓頂',
      '不可以，大老二規定只能壓制相同張數與同種類的牌型 (對子只能用更大的對子壓)',
      '可以，順子是一般主流大牌型，可以直接當作炸彈使用',
    ],
    correctAnswer: 1,
    explanation: '不可以！除了台灣部分地方玩法允許「鐵支」或「同花順」隨時當炸彈跳出壓制外，一般的規則都是「牌型必須一致」。上家打出對子，你必須且只能打出「對子」跟它對抗。',
  },
  {
    id: 5,
    question: '如果所有其他玩家在面對你出的牌時連續喊了「過 (PASS)」繞完一圈，接下來你會獲得什麼特權？',
    options: [
      '直接獲得一局勝利',
      '新一輪的「自由牌權」，可以任意打出單張、對子或任何合法組合，不用再受前一手的牌型限制',
      '可以從輸家手裡隨機抽取一張最大的牌',
    ],
    correctAnswer: 1,
    explanation: '當你的牌所有人都不要（全過 PASS），代表該輪結束。桌面上的卡片被清空，你將拿到「主導牌權（發牌權）」，此時你可以隨心所欲組織新的任意單張、對子、三條或五張牌型！這也是大老二的核心策略。',
  },
  {
    id: 6,
    question: '下列五張牌的組合中，哪一種「牌型」的階級層次最大（能直接壓倒其他五張牌型）？',
    options: ['葫蘆 (如 8-8-8-5-5)', '鐵支 (如 K-K-K-K-A)', '同花順 (如 ♣5-♣6-♣7-♣8-♣9)', '順子 (如 3-4-5-6-7)'],
    correctAnswer: 2,
    explanation: '在 5 張牌的規則裡，同花順是最強的牌型（1st），它可以壓制鐵支（2nd）、葫蘆（3rd）、同花（4th）與一般順子（5th）！',
  },
];

export const QuizZone: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowCertificate(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowCertificate(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!showCertificate ? (
          <motion.div
            key="quiz-box"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6 text-cream"
          >
            {/* Quiz Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-serif font-bold text-gold/85">大老二熟練度概念測驗</span>
              <span className="text-xs font-bold bg-forest text-gold border border-gold/15 px-3 py-1 rounded-full">
                關卡：{currentIdx + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <span className="text-xs text-gold font-bold uppercase tracking-widest flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> QUESTION {currentIdx + 1}
              </span>
              <h3 className="text-lg font-serif font-bold text-cream leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Selection Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;
                
                let optionStyle = 'border-slate-800 bg-slate-950 hover:bg-forest hover:border-slate-700 text-cream/90';
                
                if (isSubmitted) {
                  if (isCorrect) {
                     optionStyle = 'border-gold bg-gold/15 text-gold font-extrabold';
                  } else if (isSelected) {
                     optionStyle = 'border-rose-900 bg-red-950/20 text-rose-300';
                  } else {
                     optionStyle = 'border-white/5 bg-slate-950/40 text-cream/30 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-gold bg-blue-600/20 ring-2 ring-gold/40 font-bold text-gold';
                }

                return (
                  <button
                    key={idx}
                    id={`quiz-option-${idx}`}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isSubmitted}
                    className={`
                      w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 cursor-pointer flex justify-between items-center
                      ${optionStyle}
                    `}
                  >
                    <span>{option}</span>
                    <div className="flex items-center gap-2">
                      {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />}
                      {isSubmitted && !isCorrect && isSelected && <XCircle className="w-5 h-5 text-rose-450 shrink-0" />}
                      {!isSubmitted && (
                        <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center text-xs font-serif font-black ${
                          isSelected ? 'border-gold bg-gold text-forest font-bold' : 'border-gold/20 text-gold/60'
                        }`}>
                          {idx + 1}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Actions and Feedback / Explanations */}
            <div className="space-y-4 pt-2">
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-xs leading-relaxed ${
                    selectedOption === currentQuestion.correctAnswer
                      ? 'bg-gold/5 border border-gold/20 text-cream/90'
                      : 'bg-red-950/10 border border-rose-900/40 text-cream/90'
                  }`}
                >
                  <p className="font-serif font-extrabold mb-1 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                    {selectedOption === currentQuestion.correctAnswer ? (
                      <span className="text-gold">✅ 答對了！</span>
                    ) : (
                      <span className="text-rose-300">❌ 答錯了！</span>
                    )}
                    原理大解析
                  </p>
                  {currentQuestion.explanation}
                </motion.div>
              )}

              <div className="flex justify-end pt-2">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className={`
                      px-6 py-2.5 rounded-xl font-serif font-black text-sm shadow hover:shadow-md cursor-pointer transition-all duration-200
                      ${selectedOption === null
                        ? 'bg-forest text-cream/30 border border-white/5 cursor-not-allowed'
                        : 'bg-gold text-forest hover:bg-amber-400 border border-yellow-250'
                      }
                    `}
                  >
                    送出解答
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-forest border border-gold/20 text-gold hover:bg-forest-light px-6 py-2.5 rounded-xl font-serif font-black text-sm shadow hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    {currentIdx < QUIZ_QUESTIONS.length - 1 ? '下一題' : '查看成績'}
                    <ChevronRight className="w-4 h-4 text-gold" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-outcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 shadow-2xl text-center space-y-6 text-cream"
          >
            <div className="max-w-md mx-auto space-y-3">
              <Award className="w-16 h-16 mx-auto text-gold fill-gold/15 animate-bounce" />
              <h3 className="text-2xl font-serif font-black text-gold">🎉 大老二新人測驗通關！</h3>
              <p className="text-cream/80 text-sm leading-relaxed font-light">
                恭喜你完成了所有核心觀念隨堂測驗。多一分觀念，出牌時就少一分迷茫！
              </p>
            </div>

            {/* Achievement Card */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden max-w-sm mx-auto">
              <div className="absolute top-0 right-0 p-3 text-[50px] font-black font-sans leading-none text-gold/5 rotate-12 select-none pointer-events-none">
                ♣♥♦♠
              </div>
              
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-serif font-bold text-gold uppercase tracking-widest bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                  榮譽成就解鎖
                </span>
                <h4 className="font-serif font-extrabold text-gold text-lg mt-2">
                  「大老二預備牌神證書」
                </h4>
                <div className="text-xs text-cream/70 py-1 font-semibold">
                  測驗得分率：
                  <span className="text-gold font-serif font-black text-lg mx-1.5">
                    {score} / {QUIZ_QUESTIONS.length}
                  </span>
                  ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
                </div>
                <p className="text-[11px] text-cream/65 leading-relaxed font-light italic mt-1 pb-1">
                  此證書代表持證者已熟讀點數 hierarchy、黑紅方梅花色規則、並且掌握了基本壓牌與贏牌節奏。
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="flex gap-3 justify-center max-w-sm mx-auto">
              <button
                onClick={handleRestart}
                className="flex-1 bg-forest border border-gold/20 text-gold hover:bg-[#124B30] px-5 py-2.5 rounded-xl text-sm font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                重新檢測
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
