/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Suit {
  CLUB = 'CLUB',      // 梅花 ♣ (Smallest)
  DIAMOND = 'DIAMOND',// 方塊 ♦
  HEART = 'HEART',    // 紅心 ♥
  SPADE = 'SPADE',    // 黑桃 ♠ (Largest)
}

export enum Rank {
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
  ACE = 'A',
  TWO = '2', // Biggest value in Big Two
}

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
}

export enum ComboType {
  INVALID = 'INVALID',
  SINGLE = 'SINGLE',
  PAIR = 'PAIR',
  TRIPLE = 'TRIPLE',
  STRAIGHT = 'STRAIGHT', // 順子
  FLUSH = 'FLUSH',       // 同花
  FULL_HOUSE = 'FULL_HOUSE', // 葫蘆
  FOUR_OF_A_KIND = 'FOUR_OF_A_KIND', // 鐵支 (+ 1)
  STRAIGHT_FLUSH = 'STRAIGHT_FLUSH', // 同花順
}

export interface ComboAnalysis {
  type: ComboType;
  isValid: boolean;
  name: string;
  rankValue: number;  // For comparison (custom value)
  suitValue: number;  // Suit tie-breaker value
  message: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of option
  explanation: string;
}

export interface GameStep {
  id: number;
  title: string;
  tutorMessage: string;
  requiredPlay: Card[];
  targetComboName: string;
  canPlayOther?: boolean;
}
