/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, Suit, Rank, ComboType, ComboAnalysis } from '../types';

// Big Two ranking: 3 is the smallest, 2 is the largest
export const RANK_VALUES: Record<Rank, number> = {
  [Rank.THREE]: 3,
  [Rank.FOUR]: 4,
  [Rank.FIVE]: 5,
  [Rank.SIX]: 6,
  [Rank.SEVEN]: 7,
  [Rank.EIGHT]: 8,
  [Rank.NINE]: 9,
  [Rank.TEN]: 10,
  [Rank.JACK]: 11,
  [Rank.QUEEN]: 12,
  [Rank.KING]: 13,
  [Rank.ACE]: 14,
  [Rank.TWO]: 15,
};

// Suit ranking in Taiwan rules: Spade ♠ > Heart ♥ > Diamond ♦ > Club ♣
export const SUIT_VALUES: Record<Suit, number> = {
  [Suit.CLUB]: 1,
  [Suit.DIAMOND]: 2,
  [Suit.HEART]: 3,
  [Suit.SPADE]: 4,
};

export const SUIT_SYMBOLS: Record<Suit, string> = {
  [Suit.CLUB]: '♣',
  [Suit.DIAMOND]: '♦',
  [Suit.HEART]: '♥',
  [Suit.SPADE]: '♠',
};

export const SUIT_NAMES: Record<Suit, string> = {
  [Suit.CLUB]: '梅花',
  [Suit.DIAMOND]: '方塊',
  [Suit.HEART]: '紅心',
  [Suit.SPADE]: '黑桃',
};

export function getRankLabel(rank: Rank): string {
  return rank;
}

export function sortCards(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => {
    const valA = RANK_VALUES[a.rank];
    const valB = RANK_VALUES[b.rank];
    if (valA !== valB) {
      return valA - valB;
    }
    return SUIT_VALUES[a.suit] - SUIT_VALUES[b.suit];
  });
}

// Function to decode 5-card combo tier
export function getFiveCardComboTier(type: ComboType): number {
  switch (type) {
    case ComboType.STRAIGHT: return 1;       // 順子 (Smallest 5-card)
    case ComboType.FLUSH: return 2;          // 同花
    case ComboType.FULL_HOUSE: return 3;     // 葫蘆
    case ComboType.FOUR_OF_A_KIND: return 4; // 鐵支
    case ComboType.STRAIGHT_FLUSH: return 5; // 同花順 (Largest 5-card)
    default: return 0;
  }
}

export function isSequential(ranks: Rank[]): boolean {
  // Translate ranks to values
  // Big Two sequences can wrap around or have unique rules, but a simple standard sequence is:
  // e.g., 3-4-5-6-7, 10-J-Q-K-A, J-Q-K-A-2.
  // In Taiwan: 10-J-Q-K-A is second biggest, J-Q-K-A-2 is the biggest straight.
  // Let's map rank ordering index for straights:
  // Circular sequence list: 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2
  const seqOrder = [
    Rank.THREE, Rank.FOUR, Rank.FIVE, Rank.SIX, Rank.SEVEN, Rank.EIGHT,
    Rank.NINE, Rank.TEN, Rank.JACK, Rank.QUEEN, Rank.KING, Rank.ACE, Rank.TWO
  ];
  
  const indices = ranks.map(r => seqOrder.indexOf(r)).sort((a, b) => a - b);
  
  // Check standard sequential (e.g. 0,1,2,3,4)
  let isSeq = true;
  for (let i = 0; i < indices.length - 1; i++) {
    if (indices[i + 1] !== indices[i] + 1) {
      isSeq = false;
      break;
    }
  }
  if (isSeq) return true;

  // Check if it's A-2-3-4-5 (Under some rules, this wrapped sequence counts)
  // Let's check manual sets:
  // Let's sort based on the sequential list
  const sortedRanks = [...ranks].sort((a, b) => seqOrder.indexOf(a) - seqOrder.indexOf(b));
  const sortedStr = sortedRanks.join(',');
  
  const possibleStraights = [
    '3,4,5,6,7', '4,5,6,7,8', '5,6,7,8,9', '6,7,8,9,10', '7,8,9,10,J',
    '8,9,10,J,Q', '9,10,J,Q,K', '10,J,Q,K,A', 'J,Q,K,A,2'
  ];

  // Taiwanese rule often allows A,2,3,4,5 as a small straight, or 2,3,4,5,6. Let's check them.
  // Standard list has 12 straights. We can verify if sortedStr is in standard sequences.
  // Let's add them:
  const allowedStraights = [
    ...possibleStraights,
    '3,4,5,A,2', // A-2-3-4-5 wrapped
    '3,4,5,6,2', // 2-3-4-5-6 wrapped
  ];

  return allowedStraights.some(str => str === sortedStr) || isSeq;
}

// Full Big Two card combination analyzer
export function analyzeCombo(cards: Card[]): ComboAnalysis {
  if (cards.length === 0) {
    return {
      type: ComboType.INVALID,
      isValid: false,
      name: '請選擇卡牌',
      rankValue: 0,
      suitValue: 0,
      message: '點擊下方的卡牌來將其選中。',
    };
  }

  const sorted = sortCards(cards);
  const len = cards.length;

  if (len === 1) {
    const card = cards[0];
    return {
      type: ComboType.SINGLE,
      isValid: true,
      name: `單張 ${getRankLabel(card.rank)}`,
      rankValue: RANK_VALUES[card.rank],
      suitValue: SUIT_VALUES[card.suit],
      message: `單張 ${getRankLabel(card.rank)}（${SUIT_NAMES[card.suit]}）。可以壓過任何更小數值或同數值但花色更低的單張。`,
    };
  }

  if (len === 2) {
    if (sorted[0].rank === sorted[1].rank) {
      const card = sorted[1]; // The larger suit of the pair (since it's sorted)
      return {
        type: ComboType.PAIR,
        isValid: true,
        name: `對子 ${getRankLabel(card.rank)}`,
        rankValue: RANK_VALUES[card.rank],
        suitValue: SUIT_VALUES[card.suit], // Represents the highest suit in this pair
        message: `對子 ${getRankLabel(card.rank)}（${SUIT_NAMES[sorted[0].suit]} 與 ${SUIT_NAMES[sorted[1].suit]}）。需要相同的二張牌，比牌時先比數值，若數值一樣則比花色最大的那張。`,
      };
    }
    return {
      type: ComboType.INVALID,
      isValid: false,
      name: '無效牌型',
      rankValue: 0,
      suitValue: 0,
      message: '這兩張牌的點數不同，無法組成「對子」！',
    };
  }

  if (len === 3) {
    if (sorted[0].rank === sorted[1].rank && sorted[1].rank === sorted[2].rank) {
      return {
        type: ComboType.TRIPLE,
        isValid: true,
        name: `三條 ${getRankLabel(sorted[0].rank)}`,
        rankValue: RANK_VALUES[sorted[0].rank],
        suitValue: 4, // Triple suit comparison usually unnecessary, or maximum suit
        message: `三條 ${getRankLabel(sorted[0].rank)}。有些玩法只允許在出首發牌或無人壓牌時打出。比牌時直接比數值大小。`,
      };
    }
    return {
      type: ComboType.INVALID,
      isValid: false,
      name: '無效牌型',
      rankValue: 0,
      suitValue: 0,
      message: '這三張牌的點數不完全相同，無法組成「三條」！',
    };
  }

  if (len === 4) {
    return {
      type: ComboType.INVALID,
      isValid: false,
      name: '無效牌型',
      rankValue: 0,
      suitValue: 0,
      message: '大老二裡面沒有「4張牌」的牌型。五張牌的牌型（順子、葫蘆等）必須剛好是 5 張！',
    };
  }

  if (len === 5) {
    // 5 card hands: Straight, Flush, Full House, Four of a Kind (+1), Straight Flush
    const ranks = sorted.map(c => c.rank);
    const suits = sorted.map(c => c.suit);
    
    const isStraightResult = isSequential(ranks);
    const isFlushResult = suits.every(s => s === suits[0]);

    // 1. Straight Flush (同花順)
    if (isStraightResult && isFlushResult) {
      // For straight comparisons, let's use the highest rank's value
      const targetCard = sorted[4];
      return {
        type: ComboType.STRAIGHT_FLUSH,
        isValid: true,
        name: `同花順 (${SUIT_NAMES[targetCard.suit]} ${getRankLabel(sorted[0].rank)}到${getRankLabel(targetCard.rank)})`,
        rankValue: RANK_VALUES[targetCard.rank],
        suitValue: SUIT_VALUES[targetCard.suit],
        message: '【同花順】五張同花色且連續的牌！大老二中的至尊牌組，可以壓過所有其他五張牌型（順子、同花、葫蘆、鐵支）。',
      };
    }

    // 2. Four of a kind (鐵支 / 4帶1)
    // Ranks sorted would be AAAAB or ABBBB
    const isFourOfAKindA = ranks[0] === ranks[1] && ranks[1] === ranks[2] && ranks[2] === ranks[3];
    const isFourOfAKindB = ranks[1] === ranks[2] && ranks[2] === ranks[3] && ranks[3] === ranks[4];
    
    if (isFourOfAKindA || isFourOfAKindB) {
      const mainRank = isFourOfAKindA ? ranks[0] : ranks[4];
      return {
        type: ComboType.FOUR_OF_A_KIND,
        isValid: true,
        name: `鐵支 ${getRankLabel(mainRank)} (4帶1)`,
        rankValue: RANK_VALUES[mainRank],
        suitValue: 4, // Four of a kind comparison only cares about rank
        message: `【鐵支】四張相同點數的牌加任意一張單張。極強的牌型，僅次於同花順，可以壓過順子、同花、葫蘆。`,
      };
    }

    // 3. Full House (葫蘆 / 3帶2)
    // Ranks sorted would be AAABB or AABBB
    const isFullHouseA = ranks[0] === ranks[1] && ranks[1] === ranks[2] && ranks[3] === ranks[4];
    const isFullHouseB = ranks[0] === ranks[1] && ranks[2] === ranks[3] && ranks[3] === ranks[4];

    if (isFullHouseA || isFullHouseB) {
      const tripleRank = isFullHouseA ? ranks[0] : ranks[4];
      return {
        type: ComboType.FULL_HOUSE,
        isValid: true,
        name: `葫蘆 ${getRankLabel(tripleRank)} (3帶2)`,
        rankValue: RANK_VALUES[tripleRank],
        suitValue: 4, // Ranked by the triple
        message: `【葫蘆】三張相同點數配上一對。比牌時以「三條」的點數判定大小。可以壓過順子和同花。`,
      };
    }

    // 4. Flush (同花)
    if (isFlushResult) {
      // Standard Big Two Flush is compared by suit value first in some rules, or highest card rank first.
      // In Taiwan rules, Flush is ranked by Suit first! Then rank of his highest card.
      const highestCard = sorted[4];
      return {
        type: ComboType.FLUSH,
        isValid: true,
        name: `同花 (${SUIT_NAMES[highestCard.suit]})`,
        rankValue: RANK_VALUES[highestCard.rank],
        suitValue: SUIT_VALUES[highestCard.suit],
        message: `【同花】五張花色相同的牌（非連續）。比牌時先比花色，花色一樣才比最大點數。可以壓過順子。`,
      };
    }

    // 5. Straight (順子)
    if (isStraightResult) {
      // In straights, we find the highest ranking card's value.
      // Taiwanese straight ranking special: 2-3-4-5-6 or J-Q-K-A-2 is bigger because it has "2".
      // Let's use the maximum rank card's value in the sequence as the rankValue.
      const lastCard = sorted[4];
      return {
        type: ComboType.STRAIGHT,
        isValid: true,
        name: `順子 (點數${getRankLabel(sorted[0].rank)}到${getRankLabel(lastCard.rank)})`,
        rankValue: RANK_VALUES[lastCard.rank],
        suitValue: SUIT_VALUES[lastCard.suit],
        message: `【順子】五張連續點數的牌（不同花色）。比牌時看最大那張牌的點數與花色。點數最大為帶有「2」的順子（J-Q-K-A-2）。`,
      };
    }

    return {
      type: ComboType.INVALID,
      isValid: false,
      name: '無效牌型',
      rankValue: 0,
      suitValue: 0,
      message: '五張牌的組合必須是「順子」、「同花」、「葫蘆」、「鐵支」或「同花順」！點擊以重新選擇。',
    };
  }

  // Cards length > 5
  return {
    type: ComboType.INVALID,
    isValid: false,
    name: '牌張過多',
    rankValue: 0,
    suitValue: 0,
    message: '大老二一次最多隻能出「五張牌」！請移除一些選中的卡牌。',
  };
}

/**
 * Returns true if combo A can beat combo B.
 */
export function compareCombos(cardsA: Card[], cardsB: Card[]): boolean {
  const analysisA = analyzeCombo(cardsA);
  const analysisB = analyzeCombo(cardsB);

  // Both must be valid
  if (!analysisA.isValid || !analysisB.isValid) return false;

  // Let's check card lengths
  if (cardsA.length !== cardsB.length) {
    return false; // Must be same count of cards
  }

  const len = cardsA.length;

  if (len === 1 || len === 2 || len === 3) {
    // Single, Pair, Triple comparisons:
    // 1. Compare ranks
    if (analysisA.rankValue !== analysisB.rankValue) {
      return analysisA.rankValue > analysisB.rankValue;
    }
    // 2. Tie break with Suit
    return analysisA.suitValue > analysisB.suitValue;
  }

  if (len === 5) {
    const tierA = getFiveCardComboTier(analysisA.type);
    const tierB = getFiveCardComboTier(analysisB.type);

    if (tierA !== tierB) {
      return tierA > tierB; // Full House beats Flush, etc.
    }

    // Same five-card combo type:
    if (analysisA.type === ComboType.FLUSH) {
      // In some rules Flush is prioritized by Suit first
      if (analysisA.suitValue !== analysisB.suitValue) {
        return analysisA.suitValue > analysisB.suitValue;
      }
      return analysisA.rankValue > analysisB.rankValue;
    }

    // Straight, Full House, Four of a Kind, Straight Flush:
    // Ranked primarily by central rank value
    if (analysisA.rankValue !== analysisB.rankValue) {
      return analysisA.rankValue > analysisB.rankValue;
    }
    // Tie break on suits (for straights / straight flushes)
    return analysisA.suitValue > analysisB.suitValue;
  }

  return false;
}

export function generateDeck(): Card[] {
  const deck: Card[] = [];
  const suits = [Suit.CLUB, Suit.DIAMOND, Suit.HEART, Suit.SPADE];
  const ranks = [
    Rank.THREE, Rank.FOUR, Rank.FIVE, Rank.SIX, Rank.SEVEN, Rank.EIGHT,
    Rank.NINE, Rank.TEN, Rank.JACK, Rank.QUEEN, Rank.KING, Rank.ACE, Rank.TWO
  ];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        id: `${suit}_${rank}`,
        suit,
        rank,
      });
    }
  }

  return deck;
}
