/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'zh' | 'en';

interface TranslationDictionary {
  // Global & Navigation
  title: string;
  subtitle: string;
  badge: string;
  navIntro: string;
  navAnalyzer: string;
  navQuiz: string;
  navPractice: string;
  footerTitle: string;
  footerSub: string;

  // App Welcome
  welcomeTitle: string;
  welcomeIntro: string;
  welcomeLabel: string;
  btnExperience: string;
  btnBattle: string;

  // Common UI Buttons
  play: string;
  pass: string;
  reset: string;
  next: string;
  prev: string;
  restart: string;
  clear: string;
  all: string;

  // Rules Section Basic
  basicTab: string;
  comparerTab: string;
  combosTab: string;
  flowTab: string;
  pointsTitle: string;
  pointsDesc: string;
  pointsNote: string;
  suitTitle: string;
  suitDesc: string;
  suitList: string[];
  suitBolds: string[];
  suitTip: string;
  gameObjectiveTitle: string;
  objWhoPlays: string;
  objWhoPlaysDesc: string;
  objHowToBeat: string;
  objHowToBeatDesc: string;
  objHowToWin: string;
  objHowToWinDesc: string;

  // Rules Section Card Comparer
  pkTitle: string;
  pkDesc: string;
  pkLeft: string;
  pkRight: string;
  pkWin: string;
  pkLose: string;
  pkDraw: string;
  pkReasonTitle: string;
  pkReasonSuit: string;
  pkReasonRank: string;
  pkReasonDefault: string;

  // Rules Section 5 Card Combos
  combosHeading: string;
  combosIntro: string;
  comboItems: {
    name: string;
    description: string;
    strong: string;
  }[];

  // Rules Section Flow Tab
  flowTitle: string;
  flowDesc: string;
  flowSteps: {
    title: string;
    desc: string;
  }[];

  // Combo Analyzer
  analyzerTitle: string;
  analyzerHelp: string;
  analyzerDesc: string;
  analyzerDeckTitle: string;
  analyzerClearBtn: string;
  comboInvalid: string;
  comboValid: string;
  comboRank: string;
  comboSuit: string;
  comboAdvise: string;

  // Quiz Zone
  quizTitle: string;
  quizSubmittedText: string;
  quizSubmittedWrong: string;
  quizSubmittedCorrect: string;
  quizExplTitle: string;
  quizNextBtn: string;
  quizCertificateTitle: string;
  quizCertificateSub: string;
  quizCardScore: string;
  quizCardCongrats: string;
  quizCertificateBadge: string;
  quizRetakeBtn: string;
  quizQuestions: {
    question: string;
    options: string[];
    explanation: string;
  }[];

  // Practice Game Simulator
  practiceStageTitle: string;
  practiceStageNum: string;
  practiceTutorLabel: string;
  practiceGoal: string;
  practiceAdviseLabel: string;
  practiceEnemyTop: string;
  practiceEnemyLeft: string;
  practiceEnemyRight: string;
  practiceCurrentTableCombo: string;
  practiceEmptyTable: string;
  practiceDiscardedDesc: string;
  practiceHeroHand: string;
  practiceChooseCardError: string;
  practiceWrongChoiceText: string;
  practiceSuccessCardTitle: string;
  practiceNextStageBtn: string;
  practiceVictoryTitle: string;
  practiceVictoryDesc: string;
  practiceVictoryCongrats: string;
  practiceRestartGameBtn: string;
  practiceStages: {
    id: number;
    title: string;
    assistantBubble: string;
    tableComboName: string;
    suggestedAction: string;
    successMessage: string;
  }[];
}

const zhTranslations: TranslationDictionary = {
  title: '大老二互動教學指南',
  subtitle: '一步一步輕鬆學會：從手牌大小次序到實戰牌權控制',
  badge: '新手村 🛡️',
  navIntro: '📖 新手學堂',
  navAnalyzer: '🧩 牌型分析',
  navQuiz: '✍️ 概念測驗',
  navPractice: '⚔️ 實戰模擬',
  footerTitle: '大老二互動教學指南 | 撲克牌教學與實戰輔助課堂',
  footerSub: '「學會大老二，聚會不作難」— 本課堂所有比牌規則皆採用台灣主流之黑紅方梅標準規定。',

  welcomeTitle: '「大老二」是什麼？',
  welcomeIntro: '大老二是一款風靡華人圈的紙牌博弈與社交遊戲，考驗玩家出牌時對點數大小、花色優勢，以及最重要的「牌權」控制！我們特別為零基礎的初學者準備了這一套 3 分鐘互動課堂，帶你在一吸一呼間掌握大老二神髓。',
  welcomeLabel: '快速上手課堂 · BRIEFING',
  btnExperience: '體驗牌型分析器',
  btnBattle: '直接去實戰演練！',

  play: '出牌',
  pass: '過 (PASS)',
  reset: '重置',
  next: '下一題',
  prev: '上一題',
  restart: '重新開始',
  clear: '清空已選',
  all: '全部',

  basicTab: '核心基本規則 🃏',
  comparerTab: '互動卡牌比大小 ⚔️',
  combosTab: '五張牌型解析 🧩',
  flowTab: '出牌與獲勝機制 ⏱️',
  pointsTitle: '點數大小次序',
  pointsDesc: '大老二最特殊也是最核心的規則，就是「 2 」是點數最大的卡牌（俗稱「大老二」），而 「 3 」 是最小的！',
  pointsNote: '⚠️ 注意：不要跟傳統撲克牌搞混！A 只排第二大，2 才是王者！',
  suitTitle: '花色大小次序',
  suitDesc: '當卡牌點數相同時，會對比花色來決定勝負！台灣最常用的標準花色規則為：',
  suitList: ['最大', '第二', '第三', '最小'],
  suitBolds: ['黑桃 ♠', '紅心 ♥', '方塊 ♦', '梅花 ♣'],
  suitTip: '💡 記憶口訣：黑紅方梅。所以單張中最小的牌是「梅花 3」，而防禦或進攻實戰最強的單張牌是「黑桃 2」！',
  gameObjectiveTitle: '遊戲致勝目標',
  objWhoPlays: '誰先出？',
  objWhoPlaysDesc: '拿到梅花 3 (♣3) 的玩家必須最先出牌，而且打出的第一手牌必須包含梅花 3（可以是單張、對子、或包含梅花 3 的五張牌型）。',
  objHowToBeat: '如何壓牌？',
  objHowToBeatDesc: '後出牌的玩家必須跟上一家打出相同數量與牌型的組合，而且數值或花色必須更大！如果沒有大過上家的牌，就必須喊「過 (PASS)」。',
  objHowToWin: '如何獲勝？',
  objHowToWinDesc: '最快把自己手上的 13 張牌全部出完的人就是贏家！其他玩家手中剩下的牌張數將用來計算扣分，剩下越多牌的人輸得越慘！',

  pkTitle: '⚔️ 大老二「一對一」PK 模擬器',
  pkDesc: '動手設定左右兩張卡牌的花色與點數，來觀察到底是哪一邊獲勝，並即時查看最精細的比牌邏輯分析！',
  pkLeft: '左側戰將 A',
  pkRight: '右側戰將 B',
  pkWin: '獲勝 (Beat!)',
  pkLose: '敗北...',
  pkDraw: '平手',
  pkReasonTitle: '💡 核心比牌邏輯分析：',
  pkReasonSuit: '花色大小決勝。因為點數皆為 {rank}，而左側的 {suitL} 大於右側的 {suitR}。',
  pkReasonRank: '點數大小決勝。因為左側 {rankL} 的點數優勢完全壓制右側的 {rankR}。',
  pkReasonDefault: '這兩張牌是同一張牌！大老二遊戲一副牌中是不會出現相同花色和點數的牌喔。',

  combosHeading: '🧩 高級五張牌型（在台灣最通用的主流出牌）',
  combosIntro: '大老二中除了「單張」並和「對子」之外，如果你拿到 5 張牌，你可以出特別的組合。這 5 張牌型也有它們自己大小位階，能壓過低位階的牌型：',
  comboItems: [
    {
      name: '1. 順子 (Straight)',
      description: '五張點數連續的牌，花色不同。比牌時看最大那牌的點數；點數相同再比花色。',
      strong: '最大順子：與「2」相連的 10-J-Q-K-A 或 J-Q-K-A-2 (在台灣通常後者算最大點數順子)。'
    },
    {
      name: '2. 同花 (Flush)',
      description: '五張花色相同的牌（點數不連續）。台灣主流玩法比牌是「先比花色，花色相同才比最大點數」。',
      strong: '它可以壓過任何順子！'
    },
    {
      name: '3. 葫蘆 (Full House)',
      description: '三張相同點數配上一對（即 3 帶 2）。比牌時以「三條」點數分勝負，一對大小不影響比牌。',
      strong: '它可以壓過任何順子和同花！'
    },
    {
      name: '4. 鐵支 / 四條 (Four of a Kind)',
      description: '四張相同點數 card 配上一張單牌（4 帶 1）。等級極高，除了同花順，能壓倒順子、同花、葫蘆。',
      strong: '部分規則下，鐵支可以當作「炸彈」隨時跳出切入壓制任何單張、對子或牌型！'
    },
    {
      name: '5. 同花順 (Straight Flush)',
      description: '五張相同花色且點數連續的牌！它是大老二中的極限王者，能壓住全場一切其他的五張組合。',
      strong: '與鐵支相同，在台灣常作為切入炸彈牌打出。'
    }
  ],

  flowTitle: '⏱️ 大老二的回合輪轉機制',
  flowDesc: '在大老二中，獲得一次「牌權（發牌權）」好比拿到了制空權，能在瞬間逆轉牌局！以下是局中的核心出牌進程：',
  flowSteps: [
    {
      title: '第一手開局',
      desc: '持有「梅花 3 ♣3」的玩家必須首先出牌。此牌可以和他的對子或順子組合一起打出。'
    },
    {
      title: '回合跟牌機制',
      desc: '當有人出牌後，出牌方向為順時針旋轉。其他人必須跟出「同種類、同張數」且點數在基準之上的卡牌壓制。大牌可以直接蓋住上一手牌。'
    },
    {
      title: '無牌可出與過牌',
      desc: '如果不想出牌，或是握有的卡牌打不過前一位玩家，你必須高喊「過 (PASS)」把出牌權讓給下家。PASS 不代表出局，只是這一輪棄權。'
    },
    {
      title: '奪得回牌權與重置',
      desc: '如果某一輪中，你的最大牌出完後「所有其他人都宣布過牌 (PASS)」，那一輪即告結束。此時桌上的牌會被清理乾淨。恭喜，你奪下了主導發牌權！這時你可以「重新決定」打出新牌型，徹底脫離上一套出牌規則的控制！'
    }
  ],

  analyzerTitle: '大老二牌型即時分析器',
  analyzerHelp: '牌型輔助分析說明',
  analyzerDesc: '卡牌分析：請點擊右邊您所持有的卡牌組（支援 1 ~ 5 張），系統將會以台灣大老二的硬核標準判定此組合是否合法，並顯示與其相關的大小與比牌細節！',
  analyzerDeckTitle: '自選卡牌庫 / 快速體驗',
  analyzerClearBtn: '重置選取 🧹',
  comboInvalid: ' invalid text / 牌型無效 ❌',
  comboValid: '合法大老二牌組 ✅',
  comboRank: '比較數值 (Rank Value)',
  comboSuit: '比較花色 (Suit Value)',
  comboAdvise: '戰略技巧與分析：{msg}',

  quizTitle: '🛡️ 大老二核心概念挑戰賽',
  quizSubmittedText: '您的回答：已送出',
  quizSubmittedWrong: '不對喔 😢',
  quizSubmittedCorrect: '回答正確！🎉',
  quizExplTitle: '💡 專業解析：',
  quizNextBtn: '下一題 ➔',
  quizCertificateTitle: '大老二高手畢業證書',
  quizCertificateSub: '恭喜您完成了大老二互動教學指南的理論考驗！',
  quizCardScore: '測驗最終成績',
  quizCardCongrats: '恭喜！您成功掌握了大老二在台灣最通用的所有出牌知識與規則細節。您現在可以信心倍增地去新手實戰模擬器中，斬獲您人生的第一次勝利！',
  quizCertificateBadge: '畢業生認證 🎓',
  quizRetakeBtn: '再測驗一次 🔄',
  quizQuestions: [
    {
      question: '在大老二遊戲中，哪一張牌是「單張」裡絕對點數最小的起手牌？',
      options: ['方塊 3', '紅心 3', '梅花 3 (♣3)', '黑桃 3'],
      explanation: '梅花 3 (♣3) 是大老二中絕對點數最小的一張牌。拿到它的玩家通常必須在第一圈最先打出它。'
    },
    {
      question: '請問台灣最主流的大老二「花色大小」權重規則是什麼？',
      options: [
        '黑桃 ♠ > 紅心 ♥ > 方塊 ♦ > 梅花 ♣ (黑紅方梅)',
        '紅心 ♥ > 黑桃 ♠ > 方塊 ♦ > 梅花 ♣ (紅黑方梅)',
        '黑桃 ♠ > 梅花 ♣ > 紅心 ♥ > 方塊 ♦ (黑梅紅方)',
        '方塊 ♦ > 紅心 ♥ > 梅花 ♣ > 黑桃 ♠'
      ],
      explanation: '台灣主流規則是「黑紅方梅」。黑桃(♠)最大，其次是紅心(♥)、方塊(♦)，梅花(♣)是最小的花色。'
    },
    {
      question: '若前一位玩家打出了「紅心 A ♥」，手牌為「黑桃 J ♠」，能否打出壓制？',
      options: [
        '可以，因為黑桃 ♠ 比紅心 ♥ 大',
        '不可以，因為 J 的點數小於 A',
        '可以，因為 J 是大老二裡的特權牌'
      ],
      explanation: '不可以！大老二比牌是「數值第一、花色第二」。A 的點數大於 J，因此不論花色，黑桃 J 都無法壓過任何 A。只在點數相同時，才比較花色。'
    },
    {
      question: '上家打出「對子 10 (10-10)」，你手上有「順子 (3-4-5-6-7)」，能否直接打出壓死對方？',
      options: [
        '可以，因為順子高達 5 張，張數多就能壓頂',
        '不可以，大老二規定只能壓制相同張數與同種類的牌型 (對子只能用更大的對子壓)',
        '可以，順子是一般主流大牌型，可以直接當作炸彈使用'
      ],
      explanation: '不可以！除了台灣部分地方玩法允許「鐵支」或「同花順」隨時當炸彈跳出壓制外，一般的規則都是「牌型必須一致」。上家打出對子，你必須且只能打出「對子」跟它對抗。'
    },
    {
      question: '如果所有其他玩家在面對你出的牌時連續喊了「過 (PASS)」繞完一圈，接下來你會獲得什麼特權？',
      options: [
        '直接獲得一局勝利',
        '新一輪的「自由牌權」，可以任意打出單張、對子或任何合法組合，不用再受前一手的牌型限制',
        '可以從輸家手裡隨機抽取一張最大的牌'
      ],
      explanation: '當你的牌所有人都不要（全過 PASS），代表該輪結束。桌面上的卡片被清空，你將拿到「主導牌權（發牌權）」，此時你可以隨心所欲組織新的任意單張、對子、三條或五張牌型！這也是大老二的核心策略。'
    },
    {
      question: '下列五張牌的組合中，哪一種「牌型」的階級層次最大（能直接壓倒其他五張牌型）？',
      options: ['葫蘆 (如 8-8-8-5-5)', '鐵支 (如 K-K-K-K-A)', '同花順 (如 ♣5-♣6-♣7-♣8-♣9)', '順子 (如 3-4-5-6-7)'],
      explanation: '在 5 張牌的規則裡，同花順是最強的牌型（1st），它可以壓制鐵支（2nd）、葫蘆（3rd）、同花（4th）與一般順子（5th）！'
    }
  ],

  practiceStageTitle: '⚔️ 實戰新手模擬 table',
  practiceStageNum: '關卡',
  practiceTutorLabel: '🧙🏼‍♂️ 實戰巫師導師',
  practiceGoal: '🎯 本關過關任務：',
  practiceAdviseLabel: '💡 特工提示與手冊：',
  practiceEnemyTop: 'Player 3 (上家 / 順時針)',
  practiceEnemyLeft: 'Player 2: (下家)',
  practiceEnemyRight: 'Player 4: (對家)',
  practiceCurrentTableCombo: '目前場上牌型',
  practiceEmptyTable: '桌面已清空',
  practiceDiscardedDesc: '沒有上家跟牌，您擁有自由的出牌權！',
  practiceHeroHand: '我的王牌手卡（點擊進行選取）',
  practiceChooseCardError: '請點擊選取你想打出的王牌！',
  practiceWrongChoiceText: '不對喔！你目前選取了「{name}」，這不符合此關卡最優的教學指示。請按照左側導師的提示，選擇「{action}」再出牌唷。',
  practiceSuccessCardTitle: '恭喜通過本關卡！🏆',
  practiceNextStageBtn: '進入下一關 ➔',
  practiceVictoryTitle: '🎉 恭喜！您已完成所有新手挑戰！',
  practiceVictoryDesc: '您已成功通過大老二實戰新手村的 4 道模擬關卡，順利學會開局規定、單卡跟牌壓牌、至尊黑桃2終極壓制和在奪得自由發牌權時扔出對子！',
  practiceVictoryCongrats: '現在，你已經不僅僅是個紙上談兵的新手。回到聚會或牌桌上，與親朋好友們一展身手吧！',
  practiceRestartGameBtn: '重來一遍實戰模擬 🔄',
  practiceStages: [
    {
      id: 1,
      title: '第一關：梅花 3 ♣ 起手規定',
      assistantBubble: '歡迎來到大老二實戰新手村！遊戲剛開局你拿到了 7 張牌。在大老二中，手牌中持有最弱點數「梅花 3 ♣3」的玩家必須最先出牌，且出的這手牌必須包含梅花 3！現在請把你的「梅花 3」點擊選取起來，並按下「出牌」吧。',
      tableComboName: '無（空場）',
      suggestedAction: '請選擇「梅花 3 ♣」單張打出',
      successMessage: '做得太好了！你遵守了「梅花3優先開局」的名言。這時牌局宣告開始！'
    },
    {
      id: 2,
      title: '第二關：跟上家牌（單張大小對比）',
      assistantBubble: '你打出了梅花3後，輪到對手們。Player 2 出了一張「方塊 8 ♦8」，緊著 Player 3 出了一張更高點數的「紅心 J ♥J」，Player 4 則是宣布過牌 (PASS)。現在輪到你，目前場上最大的牌是「紅心 J ♥J」。你需要出單張壓過它，此時你手上有「方塊 Q ♦Q」、「梅花 A ♣A」及「黑桃 2 ♠2」大於 J。為了保留好牌在手中，最好的決策是出「方塊 Q ♦Q」，點選它然後按出牌！',
      tableComboName: '單張 紅心 J',
      suggestedAction: '請選擇「方塊 Q ♦」單張打出進行壓制',
      successMessage: '漂亮！Q 的數值比 J 大，成功跟牌！這能幫你保留 Ace 和王者2，這也是高手存牌的重要思路！'
    },
    {
      id: 3,
      title: '第三關：終極至尊「黑桃 2」大反擊',
      assistantBubble: '天啊！你出了方塊 Q 後，Player 2 出了一張「黑桃 K ♠K」壓死你，接著 Player 3 喊 PASS，沒想到手牌極強的 Player 4 突然扔出巨牌「梅花 2 ♣2」！（梅花2是僅次於黑桃/紅心/方塊2的頂級牌）。大家全過，眼看他就要拿到自由出牌權。別慌！你手中還握有全場最高、至高無上的皇者——「黑桃 2 ♠2」！讓我們給他終極制裁，選中「黑桃 2 ♠2」扔出去，壓翻他的梅花 2 奪回牌權！',
      tableComboName: '單張 梅花 2',
      suggestedAction: '請選擇「黑桃 2 ♠」打出壓跨梅花2！',
      successMessage: '太刺激了！因為點數同為「2」，但你的花色是黑桃(♠)，黑桃是大於梅花(♣)的！你的黑桃 2 毫無爭議壓平全盤！隨後所有人只能乖乖喊過 (PASS)！'
    },
    {
      id: 4,
      title: '第四關：斬獲主導牌權（出對子）',
      assistantBubble: '當你放出黑桃 2 後，所有對手連續喊了 PASS！本回合宣告結束，桌面被徹底清空，而你藉此奪下了最珍貴的「主導牌權」！在此狀態下你不再受任何上家牌型拘束，可以出單張、對子、甚至是五張組合。看看你的最後 4 張手牌，居然藏有一個漂亮的對子「方塊 5 ♦5」與「黑桃 5 ♠5」！點選那兩張 5 組成對子，將它們威風凛凛地打出去把！',
      tableComboName: '無（你擁有自由出牌權！）',
      suggestedAction: '請同時點選「方塊 5 ♦」與「黑桃 5 ♠」組成「對子」並出牌',
      successMessage: '極度完美！你打出了一對 5。對手們面面相覷，有人用更高等的對子壓了過去，但在你那強勁策略的壓迫下，你穩穩領先，最終將手牌輕鬆清空！你完成大老二實戰新手指南了！'
    }
  ]
};

const enTranslations: TranslationDictionary = {
  title: 'Big Two Interactive Tutorial',
  subtitle: 'Learn Step-by-Step: From card hierarchies to master class battle tactics',
  badge: 'Rookie Village 🛡️',
  navIntro: '📖 Rookie School',
  navAnalyzer: '🧩 Combo Analyzer',
  navQuiz: '✍️ Quiz Challenge',
  navPractice: '⚔️ Battle Simulator',
  footerTitle: 'Big Two Interactive Guide | Poker Tutorial & Battle Helper',
  footerSub: '"Master Big Two, party like a pro" — All game patterns are based on the standard Taiwanese hierarchy.',

  welcomeTitle: 'What is "Big Two"?',
  welcomeIntro: 'Big Two is a highly popular card shedding and strategic social game. It tests players on card values, suit advantages, and most importantly, card control! We have crafted a 3-minute interactive course specifically for absolute beginners to master the essence of Big Two with ease.',
  welcomeLabel: 'Rookie Quick Start Class · BRIEFING',
  btnExperience: 'Try Combo Analyzer',
  btnBattle: 'Go to Battle Simulation!',

  play: 'Play Cards',
  pass: 'PASS',
  reset: 'Reset',
  next: 'Next Question',
  prev: 'Prev Question',
  restart: 'Restart',
  clear: 'Clear Selected',
  all: 'All',

  basicTab: 'Core Rules 🃏',
  comparerTab: '1-on-1 Card VS ⚔️',
  combosTab: '5-Card Combos 🧩',
  flowTab: 'Flow & Victory Limits ⏱️',
  pointsTitle: 'Rank Hierarchy',
  pointsDesc: 'The most unique rule is that "2" has the absolute highest points value (giving the game its name "Big Two"), while "3" has the lowest!',
  pointsNote: '⚠️ NOTE: Do not get confused with standard poker! Ace is only the 2nd biggest, "2" is the absolute king!',
  suitTitle: 'Suit Hierarchy',
  suitDesc: 'When ranks are equal, suit values break the tie! Under standard Taiwanese rules, the hierachy is:',
  suitList: ['Max (1st)', '2nd', '3rd', 'Min (4th)'],
  suitBolds: ['Spade ♠', 'Heart ♥', 'Diamond ♦', 'Club ♣'],
  suitTip: '💡 Pro Tip: Spade > Heart > Diamond > Club. The absolute smallest card in game is the Club 3, while the most powerful card is the Spade 2!',
  gameObjectiveTitle: 'Winning Objectives',
  objWhoPlays: 'Who Opens?',
  objWhoPlaysDesc: 'The player holding the Club 3 (♣3) must play first, and their opening hand must include this Club 3 (can be single, a pair, or part of a 5-card combo).',
  objHowToBeat: 'How to Play?',
  objHowToBeatDesc: 'Subsequent players must follow the previous hand\'s exact type and card count, playing a combination of higher ranking cards. If you cannot beat it, shout "PASS".',
  objHowToWin: 'How to Win?',
  objHowToWinDesc: 'The first player to completely discard all 13 cards wins! The remaining cards held by other players are counted as penalty indicators - the more cards left, the worse you lose!',

  pkTitle: '⚔️ 1-on-1 Card Battle Simulator',
  pkDesc: 'Dynamically configure the suits and ranks of both cards to observe who wins, along with real-time detail analysis of the tie-breaking logic!',
  pkLeft: 'Challenger A (Left)',
  pkRight: 'Challenger B (Right)',
  pkWin: 'WIN (Beat!)',
  pkLose: 'Lost...',
  pkDraw: 'Tie',
  pkReasonTitle: '💡 Core Battle Logic Analysis:',
  pkReasonSuit: 'Tie broken by suits. Both ranks are {rank}, but Left\'s {suitL} is larger than Right\'s {suitR}.',
  pkReasonRank: 'Tie broken by card ranks. Left\'s {rankL} outperforms Right\'s {rankR} entirely.',
  pkReasonDefault: 'These are the exact same card! A standard copy of Big Two does not allow duplicates of the same suit and rank.',

  combosHeading: '🧩 Advanced 5-Card Combinations (Taiwan Standard Rules)',
  combosIntro: 'Other than single cards and pairs, playing 5-card hands introduces majestic strategic depth. These combinations have their own hierarchy from top to bottom:',
  comboItems: [
    {
      name: '1. Straight (順子)',
      description: 'Five sequentially numbered cards of different suits. Ranked by the highest card\'s points value; ties are broken by that card\'s suit.',
      strong: 'Largest straight includes "2": such as 10-J-Q-K-A or J-Q-K-A-2 (the latter is typically highest under Taiwanese rules).'
    },
    {
      name: '2. Flush (同花)',
      description: 'Five cards of the same suit (not in sequence). Under mainstream Taiwanese rules, flushes are ranked "First by Suit, then by Point Value".',
      strong: 'It beats any regular Straight!'
    },
    {
      name: '3. Full House (葫蘆 / 3帶2)',
      description: 'Three of a kind paired with another pair. The rank value of the triple determines its strength, while the collateral pair doesn\'t affect rankings.',
      strong: 'It beats any straight or flush!'
    },
    {
      name: '4. Four of a Kind (鐵支 / 4帶1)',
      description: 'Four cards of the same point value with any single card. Extremely powerful; beats straights, flushes, and full houses.',
      strong: 'Under some rules, this can serve as a "BOMB" to interrupt any hand at any time!'
    },
    {
      name: '5. Straight Flush (同花順)',
      description: 'Five sequential cards of the exact same suit! The undisputed god of Big Two hands, capable of laying waste to all other five-card combinations.',
      strong: 'Can also be played as a bomb interrupt in popular rules.'
    }
  ],

  flowTitle: '⏱️ Round Turn and Pacing Mechanics',
  flowDesc: 'In Big Two, grabbing the "initiative/lead card play right" is like gaining air supremacy. It can turn the tide instantly! Here is the process:',
  flowSteps: [
    {
      title: 'Opening Hand',
      desc: 'The player with the Club 3 (♣3) must play first. They can play it as a single, in a pair, or as part of a 5-card hand.'
    },
    {
      title: 'Clockwise Turns',
      desc: 'Play continues clockwise. Future players must match the card count and combo type, with higher ranking values to override.'
    },
    {
      title: 'Passing the Turn',
      desc: 'If you cannot beat the previous play, or prefer to save your aces, shout "PASS" to hand the turn to the next player. Passing is temporary.'
    },
    {
      title: 'Gaining Table Lead',
      desc: 'If you play a large card and every other player passes, the round ends. The board is cleared, and you gain the "lead play right" to play ANY layout you wish!'
    }
  ],

  analyzerTitle: 'Big Two Combo Real-time Analyzer',
  analyzerHelp: 'Combo helper info',
  analyzerDesc: 'Combo Analysis: Select cards on the right (supports 1 to 5 cards). The system evaluates the hand based on Taiwanese rules, providing hierarchy details and strategic suggestions!',
  analyzerDeckTitle: 'Self-Select Card Deck / Click to Try',
  analyzerClearBtn: 'Clear Selection 🧹',
  comboInvalid: 'Invalid Combo ❌',
  comboValid: 'Valid Combo!',
  comboRank: 'Rank Comparison Value',
  comboSuit: 'Suit Comparison Value',
  comboAdvise: 'Strategic Feedback: {msg}',

  quizTitle: '🛡️ Big Two Rule Master Challenge',
  quizSubmittedText: 'Your Answer: Submitted',
  quizSubmittedWrong: 'Wrong Answer 😢',
  quizSubmittedCorrect: 'Correct! 🎉',
  quizExplTitle: '💡 Detailed Explanation:',
  quizNextBtn: 'Next Question ➔',
  quizCertificateTitle: 'Big Two Master Graduate',
  quizCertificateSub: 'Congratulations! You have successfully mastered the theoretical rules of Big Two!',
  quizCardScore: 'Your Final Exam Score',
  quizCardCongrats: 'Excellent! You have fully understood mainstream Taiwanese rules, suit weights, and strategic paces. You are ready to try the battle simulator to claim your first real victory!',
  quizCertificateBadge: 'Certified Graduate 🎓',
  quizRetakeBtn: 'Retake Quiz 🔄',
  quizQuestions: [
    {
      question: 'In Big Two, which opening single card is the absolute smallest in terms of rank value?',
      options: ['Diamond 3', 'Heart 3', 'Club 3 (♣3)', 'Spade 3'],
      explanation: 'Club 3 (♣3) is the absolute lowest card. The player holding this card must play it first in the opening round.'
    },
    {
      question: 'What is the mainstream Taiwanese "Suit Hierarchy" ranking from largest to smallest?',
      options: [
        'Spade ♠ > Heart ♥ > Diamond ♦ > Club ♣',
        'Heart ♥ > Spade ♠ > Diamond ♦ > Club ♣',
        'Spade ♠ > Club ♣ > Heart ♥ > Diamond ♦',
        'Diamond ♦ > Heart ♥ > Club ♣ > Spade ♠'
      ],
      explanation: 'The mainstream rule is "Spade > Heart > Diamond > Club" (黑紅方梅 in Chinese).'
    },
    {
      question: 'If the previous player played "Heart A ♥", can you beat it by playing "Spade J ♠"?',
      options: [
        'Yes, because Spade ♠ is larger than Heart ♥',
        'No, because the rank J is smaller than the rank A',
        'Yes, J is a special joker card in Big Two rules'
      ],
      explanation: 'No! Ranks come first, suits come second. A is larger than J, so a Spade J cannot override any A, regardless of suit.'
    },
    {
      question: 'If a player outputs "Pair of 10s (10-10)", can you play a "Straight (3-4-5-6-7)" to beat them directly?',
      options: [
        'Yes, because a Straight consists of 5 cards, more cards overwrite pairs',
        'No, you must play the exact same combo type (a pair can only be beaten by a higher pair)',
        'Yes, Straights act as automatic bombs to destroy intermediate plays'
      ],
      explanation: 'No! Excluding special rules where four-of-a-kind can act as a bomb, you must match the exact number and combination type of cards played.'
    },
    {
      question: 'If all other players shout "PASS" on your hand and the turn rotates back, what privilege do you get?',
      options: [
        'Directly win the entire game round',
        'Gain free lead play right: free to play any card combo type of any count',
        'Draw a random high card from any opponent\'s hand'
      ],
      explanation: 'When everyone passes, the round clears. You obtain the lead play right. You can now start a new round with any card, pair, or five-card combo of your choosing!'
    },
    {
      question: 'Among the following 5-card combinations, which poker hand has the highest card tier in Big Two?',
      options: ['Full House (e.g., 8-8-8-5-5)', 'Four of a Kind (e.g., K-K-K-K-A)', 'Straight Flush (e.g., ♣5-♣6-♣7-♣8-♣9)', 'Straight (e.g., 3-4-5-6-7)'],
      explanation: 'A Straight Flush is the absolute strongest 5-card hand (1st), followed by Four of a Kind (2nd), Full House (3rd), Flush (4th), and Straight (5th).'
    }
  ],

  practiceStageTitle: '⚔️ Rookie Battle Arena',
  practiceStageNum: 'Stage',
  practiceTutorLabel: '🧙🏼‍♂️ Rookie Battle Wizard',
  practiceGoal: '🎯 Current Quest Goal:',
  practiceAdviseLabel: '💡 Advisor Hints & Briefing:',
  practiceEnemyTop: 'Player 3 (Top Seating / Clockwise)',
  practiceEnemyLeft: 'Player 2 (Left Seat)',
  practiceEnemyRight: 'Player 4 (Right Seat)',
  practiceCurrentTableCombo: 'Current Table Combo',
  practiceEmptyTable: 'Table Cleared',
  practiceDiscardedDesc: 'No previous plays, you have free card play initiative!',
  practiceHeroHand: 'My Secret Cards (Click to Select)',
  practiceChooseCardError: 'Please click to select the card you wish to play!',
  practiceWrongChoiceText: 'Oops! You chose "{name}", which does not match our optimal strategy. Please follow the wizard\'s advice and select "{action}".',
  practiceSuccessCardTitle: 'Stage Passed Successfully! 🏆',
  practiceNextStageBtn: 'Next Stage ➔',
  practiceVictoryTitle: '🎉 Congratulations! You Passed Newbie Training!',
  practiceVictoryDesc: 'You have conquered all 4 tactical combat stages of our Big Two simulator: opening guidelines, single card hierarchy, black spade 2 overrides, and lead turns!',
  practiceVictoryCongrats: 'You are now ready to play in actual games and show your skills to friends and family. Go and get some victories!',
  practiceRestartGameBtn: 'Restart Simulator 🔄',
  practiceStages: [
    {
      id: 1,
      title: 'Stage 1: Club 3 ♣ First Play Rule',
      assistantBubble: 'Welcome to the combat arena! You hold 7 cards. In Big Two, the player with the lowest card in the game - "Club 3" - must play first, and their hand must contain the Club 3! Click to select your "Club 3", then press "Play Cards" to start.',
      tableComboName: 'None (Clean slate)',
      suggestedAction: 'Select "Club 3 ♣" single card to play',
      successMessage: 'Splendid! You started the game following the sacred first-play rule. The battle begins!'
    },
    {
      id: 2,
      title: 'Stage 2: Matching Singles (Rank Overrides)',
      assistantBubble: 'After playing your Club 3, your opponents responded: Player 2 threw Diamond 8, and Player 3 threw Heart J as the current highest. Player 4 passed. Now it is your turn, and the highest card on the table is the Heart J. You have Diamond Q, Club A, and Spade 2. To save your strongest trump cards, your best strategic decision is to play Diamond Q. Select it and play!',
      tableComboName: 'Single Heart J',
      suggestedAction: 'Select "Diamond Q ♦" single card to override',
      successMessage: 'Way to go! Q beats J, successfully matching and overriding the hand! This preserves your Ace and King 2 for crucial late-game control!'
    },
    {
      id: 3,
      title: 'Stage 3: The Supreme "Spade 2" Strike',
      assistantBubble: 'Oh no! After you played Diamond Q, Player 2 played Spade K to override you, Player 3 passed, and then the highly aggressive Player 4 played Club 2 (the second most powerful card!). Everyone passed. If you pass, they get the lead. Fortunately, you hold the ultimate king of Big Two - the Spade 2! Let\'s give them a final lesson. Choose "Spade 2" to override their Club 2 and seize control!',
      tableComboName: 'Single Club 2',
      suggestedAction: 'Select "Spade 2 ♠" to play and crash their Club 2!',
      successMessage: 'Absolutely thrilling! Since both cards have rank 2, your superior Spade (♠) beats their Club (♣)! Everyone has to pass!'
    },
    {
      id: 4,
      title: 'Stage 4: Seizing Table Initiative (Playing Pairs)',
      assistantBubble: 'After playing your Spade 2, all opponents passed! The round is over, the board is cleared, and you now have the lead play right! This allows you to play any combination you wish. Look at your 4 remaining cards, you have a beautiful pair of 5s: Diamond 5 and Spade 5! Select both 5s to play a pair and clear your hand!',
      tableComboName: 'None (You have the free lead play right!)',
      suggestedAction: 'Select both "Diamond 5 ♦" and "Spade 5 ♠" to play a Pair',
      successMessage: 'Spectacular! You played your pair of 5s. Your opponents had no answers, allowing you to easily clear your hand first and secure the win! You completed the training!'
    }
  ]
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}>({
  language: 'zh',
  setLanguage: () => {},
  t: zhTranslations,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bigtwo_lang');
    if (saved === 'zh' || saved === 'en') return saved;
    // Auto detect browser language
    const navLang = navigator.language;
    if (navLang && navLang.toLowerCase().startsWith('en')) {
      return 'en';
    }
    return 'zh';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bigtwo_lang', lang);
  };

  const t = language === 'en' ? enTranslations : zhTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
