/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, XCircle, Award, RefreshCw, ChevronRight, HelpCircle } from 'lucide-react';

export const QuizZone: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const { language, t } = useLanguage();
  const isZh = language === 'zh';

  const questionsCount = t.quizQuestions.length;
  const currentQuestion = t.quizQuestions[currentIdx];

  // Hardcoded correct answers corresponding to questions index 0..5
  const correctAnswers = [2, 0, 1, 1, 1, 2];
  const correctAnswerIdx = correctAnswers[currentIdx];

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    
    setIsSubmitted(true);
    if (selectedOption === correctAnswerIdx) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentIdx < questionsCount - 1) {
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
              <span className="text-xs font-serif font-bold text-gold/85">{t.quizTitle}</span>
              <span className="text-xs font-bold bg-forest text-gold border border-gold/15 px-3 py-1 rounded-full whitespace-nowrap">
                {isZh ? '關卡：' : 'Question: '}{currentIdx + 1} / {questionsCount}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <span className="text-[10px] text-gold font-bold uppercase tracking-widest flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> QUESTION {currentIdx + 1}
              </span>
              <h3 className="text-lg font-serif font-bold text-cream leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Selection Options */}
            <div className="space-y-2.5" id="quiz-options">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === correctAnswerIdx;
                
                let optionStyle = 'border-slate-800 bg-slate-950 hover:bg-forest hover:border-slate-700 text-cream/90';
                
                if (isSubmitted) {
                  if (isCorrect) {
                     optionStyle = 'border-gold bg-gold/15 text-gold font-extrabold';
                  } else if (isSelected) {
                     optionStyle = 'border-rose-900 bg-red-950/20 text-rose-300';
                  } else {
                     optionStyle = 'border-white/5 bg-slate-950/45 text-cream/30 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-gold bg-blue-600/25 ring-2 ring-gold/40 font-bold text-gold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isSubmitted}
                    className={`
                      w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all duration-200 cursor-pointer flex justify-between items-center gap-2
                      ${optionStyle}
                    `}
                  >
                    <span>{option}</span>
                    <div className="flex items-center gap-2 shrink-0">
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
                    selectedOption === correctAnswerIdx
                      ? 'bg-gold/5 border border-gold/20 text-cream/90'
                      : 'bg-red-950/10 border border-rose-900/40 text-cream/90'
                  }`}
                >
                  <p className="font-serif font-extrabold mb-1.5 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                    {selectedOption === correctAnswerIdx ? (
                      <span className="text-gold">{isZh ? '✅ 答對了！' : '✅ Correct! '}</span>
                    ) : (
                      <span className="text-rose-300">{isZh ? '❌ 答錯了！' : '❌ Incorrect! '}</span>
                    )}
                    {isZh ? '原理大解析' : 'Strategic Principle Interpretation'}
                  </p>
                  {currentQuestion.explanation}
                </motion.div>
              )}

              <div className="flex justify-end pt-2">
                {!isSubmitted ? (
                  <button
                    type="button"
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
                    {isZh ? '送出解答' : 'Submit Answer'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-forest border border-gold/20 text-gold hover:bg-forest-light px-6 py-2.5 rounded-xl font-serif font-black text-sm shadow hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    {currentIdx < questionsCount - 1 ? (isZh ? '下一題' : 'Next Question') : (isZh ? '查看成績' : 'View Results')}
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
              <h3 className="text-2xl font-serif font-black text-gold">{t.quizCertificateTitle}</h3>
              <p className="text-cream/80 text-sm leading-relaxed font-light">
                {t.quizCertificateSub}
              </p>
            </div>

            {/* Achievement Card */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden max-w-sm mx-auto">
              <div className="absolute top-0 right-0 p-3 text-[50px] font-black font-sans leading-none text-gold/5 rotate-12 select-none pointer-events-none">
                ♣♥♦♠
              </div>
              
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-serif font-bold text-gold uppercase tracking-widest bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                  {isZh ? '榮譽成就解鎖' : 'ACHIEVEMENT UNLOCKED'}
                </span>
                <h4 className="font-serif font-extrabold text-gold text-lg mt-2">
                  {isZh ? '「大老二預備牌神證書」' : '"Certified Big Two Rule Graduate"'}
                </h4>
                <div className="text-xs text-cream/70 py-1 font-semibold">
                  {isZh ? '測驗得分率：' : 'Final Assessment Score: '}
                  <span className="text-gold font-serif font-black text-lg mx-1.5">
                    {score} / {questionsCount}
                  </span>
                  ({Math.round((score / questionsCount) * 100)}%)
                </div>
                <p className="text-[11px] text-cream/65 leading-relaxed font-light italic mt-1 pb-1">
                  {t.quizCardCongrats}
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="flex gap-3 justify-center max-w-sm mx-auto">
              <button
                type="button"
                onClick={handleRestart}
                className="flex-1 bg-forest border border-gold/20 text-gold hover:bg-[#124B30] px-5 py-2.5 rounded-xl text-sm font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                {t.quizRetakeBtn}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
