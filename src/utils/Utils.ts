import {
  IC_BOOK,
  IC_DICT,
  IC_DOCUMENT,
  IC_EnViDict,
  IC_LISTENING,
  IC_READING,
  IC_TRANS,
  IC_VIDEO,
  IC_ViEnDict,
  IC_VOCAB,
  IC_GAME,
  IC_VERB,
  IC_COMMUNICATE,
  IC_GRAMMAR,
  IC_IPA,
  IC_CorrectWord,
  IC_MatchWord,
  aiAu,
  auAu,
  eiAu,
  eowAu,
  iowAu,
  oiAu,
  owuAu,
  uowAu,
  aLongAu,
  aaAu,
  aeAu,
  eAu,
  iLongAu,
  iShortAu,
  oUkAu,
  oAu,
  owLongAu,
  owAu,
  uLongAu,
  uShortAu,
  aMS,
  bMS,
  dMS,
  eMS,
  eiMS,
  fMS,
  iMS,
  lMS,
  ouMS,
  tMS,
  uMS,
} from '../assets/path';
import {LearnItemProps} from '../screens/Home/tabs/LearnTab/components/LearnItem';

async function sleep(ms: number) {
  await new Promise(r => setTimeout(r, ms));
}

function isListEqual<T>(
  listA: T[],
  listB: T[],
  isObjectEqual: (itemA: T, itemB: T) => boolean,
) {
  try {
    if (!listA && !listB) {
      return true;
    }

    if (!listA || !listB) {
      return false;
    }

    if (listA.length !== listB.length) {
      return false;
    }

    for (let i = 0; i < listA.length; i++) {
      if (!isObjectEqual(listA[i], listB[i])) {
        return false;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
}

export const LEARN_ITEMS: LearnItemProps[] = [
  {
    id: 1,
    name: 'Reading',
    onPress: () => {},
    icon: IC_READING,
  },
  {
    id: 2,
    name: 'Listening',
    onPress: () => {},
    icon: IC_LISTENING,
  },
  // {
  //   id: 3,
  //   name: 'Speaking',
  //   onPress: () => {
  //   },
  //   icon: IC_SPEAKING,
  // },
  {
    id: 4,
    name: 'Vocabulary',
    onPress: () => {},
    icon: IC_VOCAB,
  },
  {
    id: 5,
    name: 'Books',
    onPress: () => {},
    icon: IC_BOOK,
  },
  {
    id: 6,
    name: 'Videos',
    onPress: () => {},
    icon: IC_VIDEO,
  },
  {
    id: 7,
    name: 'Dictionary',
    onPress: () => {},
    icon: IC_DICT,
  },
  {
    id: 8,
    name: 'Documents',
    onPress: () => {},
    icon: IC_DOCUMENT,
  },
  {
    id: 9,
    name: 'Games',
    onPress: () => {},
    icon: IC_GAME,
  },
];

export const DICTIONARY_ITEMS: LearnItemProps[] = [
  {
    id: 11,
    name: 'Vi-En Dictionary',
    onPress: () => {},
    icon: IC_ViEnDict,
  },
  {
    id: 12,
    name: 'En-En Dictionary',
    onPress: () => {},
    icon: IC_EnViDict,
  },
  {
    id: 13,
    name: 'Text Translation',
    onPress: () => {},
    icon: IC_TRANS,
  },
];

export const DOCUMENT_ITEMS: LearnItemProps[] = [
  {
    id: 2,
    name: 'International Phonetic Alphabet',
    onPress: () => {},
    icon: IC_IPA,
  },
  {
    id: 22,
    name: '1000+ Normal Communication',
    onPress: () => {},
    icon: IC_COMMUNICATE,
  },
  {
    id: 23,
    name: 'Irregular Verbs',
    onPress: () => {},
    icon: IC_VERB,
  },
];

export const GAME_ITEMS: LearnItemProps[] = [
  {
    id: 31,
    name: 'Correct Word',
    onPress: () => {},
    icon: IC_CorrectWord,
  },
  {
    id: 32,
    name: 'Word Match',
    onPress: () => {},
    icon: IC_MatchWord,
  },
];

export const VOWELS = [
  {
    title: '😁 Nhóm âm cười',
    list: [
      {
        phonetic: 'ɪ',
        audioSrc: iShortAu,
        mouthShape: eMS,
        desc: 'i ngắn, đọc dứt khoát như đang kêu ai đó, miệng không căng',
        examples: [
          {
            word: 'ship',
            phonetic: '/ʃɪp/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/ship-us.mp3',
          },
          {
            word: 'hit',
            phonetic: '/hɪt/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/hit-us.mp3',
          },
        ],
      },
      {
        phonetic: 'i:',
        audioSrc: iLongAu,
        mouthShape: iMS,
        desc: 'i dài, miệng cười, nhấn mạnh, nặng và căng',
        examples: [
          {
            word: 'sheep',
            phonetic: '/ʃi:p/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/sheep-uk.mp3',
          },
          {
            word: 'heat',
            phonetic: '/hi:t/',
            audio:
              'https://api.dictionaryapi.dev/media/pronunciations/en/hit-us.mp3',
          },
        ],
      },
    ],
  },
  {
    title: '💋 Nhóm âm hôn',
    list: [
      {
        phonetic: 'ʊ',
        audioSrc: uShortAu,
        mouthShape: uMS,
        desc: 'u ngắn, tròn môi nhẹ, dứt khoát, không căng',
        examples: [
          {
            word: 'foot',
            phonetic: '/fʊt/',
          },
          {
            word: 'put',
            phonetic: '/pʊt/',
          },
        ],
      },
      {
        phonetic: 'u:',
        audioSrc: uLongAu,
        mouthShape: ouMS,
        desc: 'u dài, chu và tròn môi, căng và mạnh',
        examples: [
          {
            word: 'blue',
            phonetic: '/blu:/',
          },
          {
            word: 'group',
            phonetic: '/gru:p/',
          },
        ],
      },
    ],
  },
  {
    title: '😱 Nhóm âm shock',
    list: [
      {
        phonetic: 'ɔ:',
        audioSrc: oAu,
        mouthShape: aMS,
        desc: 'Như o dài hoặc ô, nặng và nhấn mạnh',
        examples: [
          {
            word: 'law',
            phonetic: '/lɔ:/',
          },
          {
            word: 'thought',
            phonetic: '/θɔ:t/',
          },
        ],
      },
      {
        phonetic: 'ɒ',
        audioSrc: oUkAu,
        mouthShape: aMS,
        desc: 'Đọc như o ngắn, dứt khoát. Âm này trong UK như ɔ: còn US như ɑ:',
        examples: [
          {
            word: 'got',
            phonetic: '/ɡɒt/',
          },
          {
            word: 'shot',
            phonetic: '/ʃɒt/',
          },
        ],
      },
    ],
  },
  {
    title: '😮 Nhóm âm mở',
    list: [
      {
        phonetic: 'e',
        audioSrc: eAu,
        mouthShape: eMS,
        desc: 'Mở miệng vừa, đọc như e. Giữ trọng tâm',
        examples: [
          {
            word: 'ten',
            phonetic: '/ten/',
          },
          {
            word: 'medal',
            phonetic: '/medəl/',
          },
        ],
      },
      {
        phonetic: 'æ',
        audioSrc: aeAu,
        mouthShape: eiMS,
        desc: 'Mở miệng đọc nhẹ e nối liền a, bắt đầu với e và kết thúc a. Giữ trọng tâm',
        examples: [
          {
            word: 'back',
            phonetic: '/bæk/',
          },
          {
            word: 'trap',
            phonetic: '/træp/',
          },
        ],
      },
      {
        phonetic: 'ɑ:',
        audioSrc: aLongAu,
        mouthShape: aMS,
        desc: 'Đọc là a nhưng dài, nặng, nhấn mạnh. Giữ trọng tâm',
        examples: [
          {
            word: 'fast',
            phonetic: '/fɑ:st/',
          },
          {
            word: 'arm',
            phonetic: '/ɑ:m/',
          },
        ],
      },
      {
        phonetic: 'ʌ',
        audioSrc: aaAu,
        mouthShape: aMS,
        desc: 'Đọc như â. Giữ trọng tâm',
        examples: [
          {
            word: 'cup',
            phonetic: '/kʌp/',
          },
          {
            word: 'drum',
            phonetic: '/drʌm/',
          },
        ],
      },
    ],
  },
  {
    title: '😝 Nhóm âm ơ',
    list: [
      {
        phonetic: 'ə',
        audioSrc: owAu,
        mouthShape: uMS,
        desc: 'Đọc như ơ, cong nhẹ lưỡi nếu có r, dứt khoát',
        examples: [
          {
            word: 'ago',
            phonetic: '/əˈɡəʊ/',
          },
          {
            word: 'Never',
            phonetic: '/ˈnevə(r)/',
          },
        ],
      },
      {
        phonetic: 'ɜ:',
        audioSrc: owLongAu,
        mouthShape: uMS,
        desc: 'Đọc như ơ dài, cong lưỡi, nhấn mạnh',
        examples: [
          {
            word: 'bird',
            phonetic: '/bɜ:d/',
          },
          {
            word: 'nurse',
            phonetic: '/nɜ:s/',
          },
        ],
      },
    ],
  },
];

export const DIPHTHONGS = [
  {
    title: '😯 Nhóm âm ơ',
    list: [
      {
        phonetic: 'iə',
        audioSrc: iowAu,
        mouthShape: eMS,
        desc: 'Đọc là iơ hoặc ia, cong lưỡi nếu có r',
        examples: [
          {
            word: 'here',
            phonetic: '/hiə(r)/',
          },
          {
            word: 'near',
            phonetic: '/niə(r)/',
          },
        ],
      },
      {
        phonetic: 'ʊə',
        audioSrc: uowAu,
        mouthShape: uMS,
        desc: 'Đọc là uơ hoặc ua, cong lưỡi nếu có r',
        examples: [
          {
            word: 'pure',
            phonetic: '/pjʊə(r)/',
          },
          {
            word: 'tour',
            phonetic: '/tʊə(r)/',
          },
        ],
      },
      {
        phonetic: 'eə',
        audioSrc: eowAu,
        mouthShape: eMS,
        desc: 'Đọc là eơ liền nhau, nhanh, ơ hơi câm',
        examples: [
          {
            word: 'care',
            phonetic: '/keə(r)/',
          },
          {
            word: 'hair',
            phonetic: '/heə(r)/',
          },
        ],
      },
    ],
  },
  {
    title: '😄 Nhóm âm ɪ',
    list: [
      {
        phonetic: 'eɪ',
        audioSrc: eiAu,
        mouthShape: eiMS,
        desc: 'Đọc là êi hoặc ây',
        examples: [
          {
            word: 'page',
            phonetic: '/peɪdʒ/',
          },
          {
            word: 'say',
            phonetic: '/seɪ/',
          },
        ],
      },
      {
        phonetic: 'aɪ',
        audioSrc: aiAu,
        mouthShape: aMS,
        desc: 'Đọc là ai',
        examples: [
          {
            word: 'five',
            phonetic: '/faɪv/',
          },
          {
            word: 'sky',
            phonetic: '/skaɪ/',
          },
        ],
      },
      {
        phonetic: 'ɔi',
        audioSrc: oiAu,
        mouthShape: uMS,
        desc: 'Đọc là oi',
        examples: [
          {
            word: 'boy',
            phonetic: '/bɔi/',
          },
          {
            word: 'join',
            phonetic: '/dʒɔin/',
          },
        ],
      },
    ],
  },
  {
    title: '🤯 Nhóm âm ơ',
    list: [
      {
        phonetic: 'əʊ',
        audioSrc: owuAu,
        mouthShape: uMS,
        desc: 'Đọc là âu, chu môi',
        examples: [
          {
            word: 'home',
            phonetic: '/həʊm/',
          },
          {
            word: 'low',
            phonetic: '/ləʊ/',
          },
        ],
      },
      {
        phonetic: 'aʊ',
        audioSrc: auAu,
        mouthShape: uMS,
        desc: 'Đọc như ao',
        examples: [
          {
            word: 'house',
            phonetic: '/haʊs/',
          },
          {
            word: 'flower',
            phonetic: '/ˈflaʊə(r)/',
          },
        ],
      },
    ],
  },
];

export const CONSONANTS = [
  {
    title: '💋 Nhóm 2 môi',
    list: [
      {
        phonetic: 'm',
        audioSrc: null,
        mouthShape: bMS,
        desc: 'Mím 2 môi, phát âm là m. Hữu thanh',
        examples: [
          {
            word: 'man',
            phonetic: '/mæn/',
          },
          {
            word: 'some',
            phonetic: '/sʌm/',
          },
        ],
      },
      {
        phonetic: 'p',
        audioSrc: null,
        mouthShape: bMS,
        desc: 'Mím 2 môi, phát âm là p dứt khoát, bật hơi. Vô thanh',
        examples: [
          {
            word: 'park',
            phonetic: '/pɑːk/',
          },
          {
            word: 'soup',
            phonetic: '/suːp/',
          },
        ],
      },
      {
        phonetic: 'b',
        audioSrc: null,
        mouthShape: bMS,
        desc: 'Mím 2 môi, phát âm là b dứt khoát, KHÔNG bật hơi. Hữu thanh',
        examples: [
          {
            word: 'bad',
            phonetic: '/bæd/',
          },
          {
            word: 'web',
            phonetic: '/web/',
          },
        ],
      },
    ],
  },
  {
    title: '👄 Nhóm môi răng',
    list: [
      {
        phonetic: 'f',
        audioSrc: null,
        mouthShape: fMS,
        desc: 'Răng trên chạm nhẹ môi dưới, thổi hơi nhẹ. Vô thanh',
        examples: [
          {
            word: 'fall',
            phonetic: '/fɔ:l/',
          },
          {
            word: 'safe',
            phonetic: '/seɪf/',
          },
        ],
      },
      {
        phonetic: 'v',
        audioSrc: null,
        mouthShape: fMS,
        desc: 'Răng trên chạm nhẹ môi dưới, phát âm v. Hữu thanh',
        examples: [
          {
            word: 'voice',
            phonetic: '/vɔɪs/',
          },
          {
            word: 'save',
            phonetic: '/seɪv/',
          },
        ],
      },
    ],
  },
  {
    title: '🦷 Nhóm răng',
    list: [
      {
        phonetic: 'θ',
        audioSrc: null,
        mouthShape: lMS,
        desc: 'Lưỡi đặt giữ 2 răng, cắn nhẹ đầu lưỡi (nhẹ thôi nhé 🙂), thổi hơi, thụt lưỡi vào và đọc "th". Vô thanh',
        examples: [
          {
            word: 'think',
            phonetic: '/θɪŋk/',
          },
          {
            word: 'thank',
            phonetic: '/θæŋk/',
          },
        ],
      },
      {
        phonetic: 'ð',
        audioSrc: null,
        mouthShape: lMS,
        desc: 'Lưỡi đặt giữ 2 răng, cắn nhẹ đầu lưỡi, rung dây thanh, thụt lưỡi vào và đọc "đ". Hữu thanh',
        examples: [
          {
            word: 'there',
            phonetic: '/ðeə(r)/',
          },
          {
            word: 'then',
            phonetic: '/ðen/',
          },
        ],
      },
    ],
  },
  {
    title: '😀 Nhóm ổ răng',
    list: [
      {
        phonetic: 't',
        audioSrc: null,
        mouthShape: tMS,
        desc: 'Âm tắc, chặn hơi, phát âm như t nhưng không rung dây thanh. Vô thanh',
        examples: [
          {
            word: 'tea',
            phonetic: '/tiː/',
          },
          {
            word: 'sent',
            phonetic: '/sent/',
          },
        ],
      },
      {
        phonetic: 'd',
        audioSrc: null,
        mouthShape: dMS,
        desc: 'Âm tắc, chặn hơi, phát âm như d. Hữu thanh',
        examples: [
          {
            word: 'stand',
            phonetic: '/stænd/',
          },
          {
            word: 'sand',
            phonetic: '/sænd/',
          },
        ],
      },
      {
        phonetic: 's',
        audioSrc: null,
        mouthShape: iMS,
        desc: 'Đọc là s nhanh, nhẹ, phát âm gió "xì xì", không rung. Vô thanh',
        examples: [
          {
            word: 'say',
            phonetic: '/seɪ/',
          },
          {
            word: 'rice',
            phonetic: '/raɪs/',
          },
        ],
      },
      {
        phonetic: 'z',
        audioSrc: null,
        mouthShape: iMS,
        desc: 'Đọc là s nhanh, nhẹ, phát âm gió như con ruồi kêu, rung. Hữu thanh',
        examples: [
          {
            word: 'zoo',
            phonetic: '/zuː/',
          },
          {
            word: 'rose',
            phonetic: '/rəʊz/',
          },
        ],
      },
      {
        phonetic: 'n',
        audioSrc: null,
        mouthShape: dMS,
        desc: 'Đọc như n nhưng hơi nghẹn lại. Hữu thanh',
        examples: [
          {
            word: 'no',
            phonetic: '/nəʊ/',
          },
          {
            word: 'button',
            phonetic: '/ˈbʌtn/',
          },
        ],
      },
      {
        phonetic: 'l',
        audioSrc: null,
        mouthShape: lMS,
        desc: 'Đọc là l. Hữu thanh',
        examples: [
          {
            word: 'leg',
            phonetic: '/leɡ/',
          },
          {
            word: 'call',
            phonetic: '/kɔːl/',
          },
        ],
      },
    ],
  },
  {
    title: '😗 Nhóm âm sau ổ răng',
    list: [
      {
        phonetic: 'ʃ',
        audioSrc: null,
        mouthShape: iMS,
        desc: 'Đọc là s nhẹ (uốn lưỡi), chu môi, hơi gió. Vô thanh',
        examples: [
          {
            word: 'She',
            phonetic: '/ʃiː/',
          },
          {
            word: 'wash',
            phonetic: '/wɒʃ/',
          },
        ],
      },
      {
        phonetic: 'ʒ',
        audioSrc: null,
        mouthShape: iMS,
        desc: 'Đọc là giơ nhẹ, phát âm ngắn. Hữu thanh',
        examples: [
          {
            word: 'casual',
            phonetic: '/ˈkæʒuəl/',
          },
          {
            word: 'vision',
            phonetic: '/ˈvɪʒn/',
          },
        ],
      },
      {
        phonetic: 'tʃ',
        audioSrc: null,
        mouthShape: tMS,
        desc: 'Đọc là ch. Vô thanh',
        examples: [
          {
            word: 'chuck',
            phonetic: '/tʃʌk/',
          },
          {
            word: 'match',
            phonetic: '/mætʃ/',
          },
        ],
      },
      {
        phonetic: 'dʒ',
        audioSrc: null,
        mouthShape: dMS,
        desc: 'Đọc là jơ (uốn lưỡi) ngắn và dứt khoát. Hữu thanh',
        examples: [
          {
            word: 'june',
            phonetic: '/dʒuːn/',
          },
          {
            word: 'page',
            phonetic: '/peɪdʒ/',
          },
        ],
      },
      {
        phonetic: 'r',
        audioSrc: null,
        mouthShape: uMS,
        desc: 'Đọc là r, cong lưỡi. Hữu thanh',
        examples: [
          {
            word: 'red',
            phonetic: '/red/',
          },
          {
            word: 'per',
            phonetic: '/pə(r)/',
          },
        ],
      },
    ],
  },
  {
    title: '💪 Nhóm âm ngạc cứng',
    list: [
      {
        phonetic: 'j',
        audioSrc: null,
        mouthShape: iMS,
        desc: 'Đọc như chữ z (nhấn mạnh). Khẩu hình như nhóm âm cười nhưng mạnh hơn. Hữu thanh',
        examples: [
          {
            word: 'yes',
            phonetic: '/jes/',
          },
          {
            word: 'menu',
            phonetic: '/ˈmenjuː/',
          },
        ],
      },
      {
        phonetic: 'w',
        audioSrc: null,
        mouthShape: ouMS,
        desc: 'Đọc như qu. Hữu thanh',
        examples: [
          {
            word: 'why',
            phonetic: '/waɪ/',
          },
          {
            word: 'question',
            phonetic: '/ˈkwestʃən/',
          },
        ],
      },
    ],
  },
  {
    title: '🍦 Nhóm âm mềm',
    list: [
      {
        phonetic: 'k',
        audioSrc: null,
        mouthShape: dMS,
        desc: 'Đọc như c nhưng nghẹn lại, không rung. Vô thanh',
        examples: [
          {
            word: 'cat',
            phonetic: '/kæt/',
          },
          {
            word: 'dark',
            phonetic: '/dɑːk/',
          },
        ],
      },
      {
        phonetic: 'g',
        audioSrc: null,
        mouthShape: dMS,
        desc: 'Đọc như g. Hữu thanh',
        examples: [
          {
            word: 'go',
            phonetic: '/ɡəʊ/',
          },
          {
            word: 'bag',
            phonetic: '/bæg/',
          },
        ],
      },
      {
        phonetic: 'ŋ',
        audioSrc: null,
        mouthShape: dMS,
        desc: 'Đọc như ng, nhẹ và dứt khoát. Hữu thanh',
        examples: [
          {
            word: 'singer',
            phonetic: '/ˈsɪŋə(r)/',
          },
          {
            word: 'tongue',
            phonetic: '/tʌŋ/',
          },
        ],
      },
    ],
  },
  {
    title: '😶 âm thanh môn',
    list: [
      {
        phonetic: 'h',
        audioSrc: null,
        mouthShape: aMS,
        desc: 'Đọc như h nhẹ nhàng, thở phào nhẹ nhõm. Vô thanh',
        examples: [
          {
            word: 'her',
            phonetic: '/hə(r)/',
          },
          {
            word: 'who',
            phonetic: '/huː/',
          },
        ],
      },
    ],
  },
];

export const IRREGULAR_VERB_LIST = [
  ['abide', 'abode/abided', 'abode / abided', 'lưu trú, lưu lại'],
  ['arise', 'arose', 'arisen', 'phát sinh'],
  ['awake', 'awoke', 'awoken', 'đánh thức, thức'],
  ['backslide', 'backslid', 'backslidden / backslid', 'tái phạm'],
  ['be', 'was/were', 'been', 'thì, là, bị, ở'],
  ['bear', 'bore', 'borne', 'mang, chịu đựng'],
  ['beat', 'beat', 'beaten / beat', 'đánh, đập'],
  ['become', 'became', 'become', 'trở nên'],
  ['befall', 'befell', 'befallen', 'xảy đến'],
  ['begin', 'began', 'begun', 'bắt đầu'],
  ['behold', 'beheld', 'beheld', 'ngắm nhìn'],
  ['bend', 'bent', 'bent', 'bẻ cong'],
  ['beset', 'beset', 'beset', 'bao quanh'],
  ['bespeak', 'bespoke', 'bespoken', 'chứng tỏ'],
  ['bet', 'bet / betted', 'bet / betted', 'đánh cược, cá cược'],
  ['bid', 'bid', 'bid', 'trả giá'],
  ['bind', 'bound', 'bound', 'buộc, trói'],
  ['bite', 'bit', 'bitten', 'cắn'],
  ['bleed', 'bled', 'bled', 'chảy máu'],
  ['blow', 'blew', 'blown', 'thổi'],
  ['break', 'broke', 'broken', 'đập vỡ'],
  ['breed', 'bred', 'bred', 'nuôi, dạy dỗ'],
  ['bring', 'brought', 'brought', 'mang đến'],
  ['broadcast', 'broadcast', 'broadcast', 'phát thanh'],
  ['browbeat', 'browbeat', 'browbeaten / browbeat', 'hăm dọa'],
  ['build', 'built', 'built', 'xây dựng'],
  ['burn', 'burnt/burned', 'burnt/burned', 'đốt, cháy'],
  ['burst', 'burst', 'burst', 'nổ tung, vỡ òa'],
  ['bust', 'busted / bust', 'busted / bust', 'làm bể, làm vỡ'],
  ['buy', 'bought', 'bought', 'mua'],
  ['cast', 'cast', 'cast', 'ném, tung'],
  ['catch', 'caught', 'caught', 'bắt, chụp'],
  ['chide', 'chid/ chided', 'chid/ chidden/ chided', 'mắng, chửi'],
  ['choose', 'chose', 'chosen', 'chọn, lựa'],
  [
    'cleave',
    'clove/ cleft/ cleaved',
    'cloven/ cleft/ cleaved',
    'chẻ, tách hai',
  ],
  ['cleave', 'clave', 'cleaved', 'dính chặt'],
  ['cling', 'clung', 'clung', 'bám vào, dính vào'],
  ['clothe', 'clothed / clad', 'clothed / clad', 'che phủ'],
  ['come', 'came', 'come', 'đến, đi đến'],
  ['cost', 'cost', 'cost', 'có giá là'],
  ['creep', 'crept', 'crept', 'bò, trườn, lẻn'],
  ['crossbreed', 'crossbred', 'crossbred', 'cho lai giống'],
  ['crow', 'crew/crewed', 'crowed', 'gáy (gà)'],
  ['cut', 'cut', 'cut', 'cắt, chặt'],
  [
    'daydream',
    'daydreamed / daydreamt',
    'daydreamed / daydreamt',
    'nghĩ vẩn vơ, mơ mộng',
  ],
  ['deal', 'dealt', 'dealt', 'giao thiệp'],
  ['dig', 'dug', 'dug', 'đào'],
  ['disprove', 'disproved', 'disproved / disproven', 'bác bỏ'],
  ['dive', 'dove/ dived', 'dived', 'lặn, lao xuống'],
  ['do', 'did', 'done', 'làm'],
  ['draw', 'drew', 'drawn', 'vẽ, kéo'],
  ['dream', 'dreamt/ dreamed', 'dreamt/ dreamed', 'mơ thấy'],
  ['drink', 'drank', 'drunk', 'uống'],
  ['drive', 'drove', 'driven', 'lái xe'],
  ['dwell', 'dwelt', 'dwelt', 'trú ngụ, ở'],
  ['eat', 'ate', 'eaten', 'ăn'],
  ['fall', 'fell', 'fallen', 'ngã, rơi'],
  ['feed', 'fed', 'fed', 'cho ăn, ăn, nuôi'],
  ['feel', 'felt', 'felt', 'cảm thấy'],
  ['fight', 'fought', 'fought', 'chiến đấu'],
  ['find', 'found', 'found', 'tìm thấy, thấy'],
  [
    'fit (tailor, change size)',
    'fitted / fit',
    'fitted / fit',
    'làm cho vừa, làm cho hợp',
  ],
  ['flee', 'fled', 'fled', 'chạy trốn'],
  ['fling', 'flung', 'flung', 'tung; quăng'],
  ['fly', 'flew', 'flown', 'bay'],
  ['forbear', 'forbore', 'forborne', 'nhịn'],
  ['forbid', 'forbade/ forbad', 'forbidden', 'cấm, cấm đoán'],
  ['forecast', 'forecast/ forecasted', 'forecast/ forecasted', 'tiên đoán'],
  ['forego (also forgo)', 'forewent', 'foregone', 'bỏ, kiêng'],
  ['foresee', 'foresaw', 'forseen', 'thấy trước'],
  ['foretell', 'foretold', 'foretold', 'đoán trước'],
  ['forget', 'forgot', 'forgotten', 'quên'],
  ['forgive', 'forgave', 'forgiven', 'tha thứ'],
  ['forsake', 'forsook', 'forsaken', 'ruồng bỏ'],
  ['freeze', 'froze', 'frozen', '(làm) đông lại'],
  ['frostbite', 'frostbit', 'frostbitten', 'bỏng lạnh'],
  ['get', 'got', 'got/ gotten', 'có được'],
  ['gild', 'gilt/ gilded', 'gilt/ gilded', 'mạ vàng'],
  ['gird', 'girt/ girded', 'girt/ girded', 'đeo vào'],
  ['give', 'gave', 'given', 'cho'],
  ['go', 'went', 'gone', 'đi'],
  ['grind', 'ground', 'ground', 'nghiền, xay'],
  ['grow', 'grew', 'grown', 'mọc, trồng'],
  ['hand-feed', 'hand-fed', 'hand-fed', 'cho ăn bằng tay'],
  ['handwrite', 'handwrote', 'handwritten', 'viết tay'],
  ['hang', 'hung', 'hung', 'móc lên, treo lên'],
  ['have', 'had', 'had', 'có'],
  ['hear', 'heard', 'heard', 'nghe'],
  ['heave', 'hove/ heaved', 'hove/ heaved', 'trục lên'],
  ['hew', 'hewed', 'hewn / hewed', 'chặt, đốn'],
  ['hide', 'hid', 'hidden', 'giấu, trốn, nấp'],
  ['hit', 'hit', 'hit', 'đụng'],
  ['hurt', 'hurt', 'hurt', 'làm đau'],
  ['inbreed', 'inbred', 'inbred', 'lai giống cận huyết'],
  ['inlay', 'inlaid', 'inlaid', 'cẩn, khảm'],
  ['input', 'input', 'input', 'đưa vào (máy điện toán)'],
  ['inset', 'inset', 'inset', 'dát, ghép'],
  ['interbreed', 'interbred', 'interbred', 'giao phối, lai giống'],
  [
    'interweave',
    'interwove / interweaved',
    'interwoven / interweaved',
    'trộn lẫn, xen lẫn',
  ],
  ['interwind', 'interwound', 'interwound', 'cuộn vào, quấn vào'],
  ['jerry-build', 'jerry-built', 'jerry-built', 'xây dựng cẩu thả'],
  ['keep', 'kept', 'kept', 'giữ'],
  ['kneel', 'knelt/ kneeled', 'knelt/ kneeled', 'quỳ'],
  ['knit', 'knit/ knitted', 'knit/ knitted', 'đan'],
  ['know', 'knew', 'known', 'biết, quen biết'],
  ['lay', 'laid', 'laid', 'đặt, để'],
  ['lead', 'led', 'led', 'dẫn dắt, lãnh đạo'],
  ['lean', 'leaned / leant', 'leaned / leant', 'dựa, tựa'],
  ['leap', 'leapt', 'leapt', 'nhảy, nhảy qua'],
  ['learn', 'learnt/ learned', 'learnt/ learned', 'học, được biết'],
  ['leave', 'left', 'left', 'ra đi, để lại'],
  ['lend', 'lent', 'lent', 'cho mượn (vay)'],
  ['let', 'let', 'let', 'cho phép, để cho'],
  ['lie', 'lay', 'lain', 'nằm'],
  ['light', 'lit/ lighted', 'lit/ lighted', 'thắp sáng'],
  ['lip-read', 'lip-read', 'lip-read', 'mấp máy môi'],
  ['lose', 'lost', 'lost', 'làm mất, mất'],
  ['make', 'made', 'made', 'chế tạo, sản xuất'],
  ['mean', 'meant', 'meant', 'có nghĩa là'],
  ['meet', 'met', 'met', 'gặp mặt'],
  ['miscast', 'miscast', 'miscast', 'chọn vai đóng không hợp'],
  ['misdeal', 'misdealt', 'misdealt', 'chia lộn bài, chia bài sai'],
  ['misdo', 'misdid', 'misdone', 'phạm lỗi'],
  ['mishear', 'misheard', 'misheard', 'nghe nhầm'],
  ['mislay', 'mislaid', 'mislaid', 'để lạc mất'],
  ['mislead', 'misled', 'misled', 'làm lạc đường, làm mê mụi'],
  ['mislearn', 'mislearned / mislearnt', 'mislearned / mislearnt', 'học nhầm'],
  ['misread', 'misread', 'misread', 'đọc sai'],
  ['misset', 'misset', 'misset', 'đặt sai chỗ'],
  ['misspeak', 'misspoke', 'misspoken', 'nói sai'],
  ['misspell', 'misspelt', 'misspelt', 'viết sai chính tả'],
  ['misspend', 'misspent', 'misspent', 'tiêu phí, bỏ phí'],
  ['mistake', 'mistook', 'mistaken', 'phạm lỗi, lầm lẫn'],
  ['misteach', 'mistaught', 'mistaught', 'dạy sai'],
  ['misunderstand', 'misunderstood', 'misunderstood', 'hiểu lầm'],
  ['miswrite', 'miswrote', 'miswritten', 'viết sai'],
  ['mow', 'mowed', 'mown/ mowed', 'cắt cỏ'],
  ['offset', 'offset', 'offset', 'đền bù'],
  ['outbid', 'outbid', 'outbid', 'trả hơn giá'],
  ['outbreed', 'outbred', 'outbred', 'giao phối xa'],
  ['outdo', 'outdid', 'outdone', 'làm giỏi hơn'],
  ['outdraw', 'outdrew', 'outdrawn', 'rút súng ra nhanh hơn'],
  ['outdrink', 'outdrank', 'outdrunk', 'uống quá chén'],
  ['outdrive', 'outdrove', 'outdriven', 'lái nhanh hơn'],
  ['outfight', 'outfought', 'outfought', 'đánh giỏi hơn'],
  ['outfly', 'outflew', 'outflown', 'bay cao/xa hơn'],
  ['outgrow', 'outgrew', 'outgrown', 'lớn nhanh hơn'],
  [
    'outleap',
    'outleaped / outleapt',
    'outleaped / outleapt',
    'nhảy cao/xa hơn',
  ],
  ['outlie (not tell truth) REGULAR', 'outlied', 'outlied', 'nói dối'],
  ['output', 'output', 'output', 'cho ra (dữ kiện)'],
  ['outride', 'outrode', 'outridden', 'cưỡi ngựa giỏi hơn'],
  ['outrun', 'outran', 'outrun', 'chạy nhanh hơn; vượt giá'],
  ['outsell', 'outsold', 'outsold', 'bán nhanh hơn'],
  [
    'outshine',
    'outshined / outshone',
    'outshined / outshone',
    'sáng hơn, rạng rỡ hơn',
  ],
  ['outshoot', 'outshot', 'outshot', 'bắn giỏi hơn, nảy mầm, mọc'],
  ['outsing', 'outsang', 'outsung', 'hát hay hơn'],
  ['outsit', 'outsat', 'outsat', 'ngồi lâu hơn'],
  ['outsleep', 'outslept', 'outslept', 'ngủ lâu/ muộn hơn'],
  [
    'outsmell',
    'outsmelled / outsmelt',
    'outsmelled / outsmelt',
    'khám phá, đánh hơi, sặc mùi',
  ],
  ['outspeak', 'outspoke', 'outspoken', 'nói nhiều/ dài/ to hơn'],
  ['outspeed', 'outsped', 'outsped', 'đi/ chạy nhanh hơn'],
  ['outspend', 'outspent', 'outspent', 'tiêu tiền nhiều hơn'],
  ['outswear', 'outswore', 'outsworn', 'nguyền rủa nhiều hơn'],
  ['outswim', 'outswam', 'outswum', 'bơi giỏi hơn'],
  ['outthink', 'outthought', 'outthought', 'suy nghĩ nhanh hơn'],
  ['outthrow', 'outthrew', 'outthrown', 'ném nhanh hơn'],
  ['outwrite', 'outwrote', 'outwritten', 'viết nhanh hơn'],
  ['overbid', 'overbid', 'overbid', 'trả giá/ bỏ thầu cao hơn'],
  ['overbreed', 'overbred', 'overbred', 'nuôi quá nhiều'],
  ['overbuild', 'overbuilt', 'overbuilt', 'xây quá nhiều'],
  ['overbuy', 'overbought', 'overbought', 'mua quá nhiều'],
  ['overcome', 'overcame', 'overcome', 'khắc phục'],
  ['overdo', 'overdid', 'overdone', 'dùng quá mức, làm quá'],
  ['overdraw', 'overdrew', 'overdrawn', 'rút quá số tiền, phóng đại'],
  ['overdrink', 'overdrank', 'overdrunk', 'uống quá nhiều'],
  ['overeat', 'overate', 'overeaten', 'ăn quá nhiều'],
  ['overfeed', 'overfed', 'overfed', 'cho ăn quá mức'],
  ['overfly', 'overflew', 'overflown', 'bay qua'],
  ['overhang', 'overhung', 'overhung', 'nhô lên trên, treo lơ lửng'],
  ['overhear', 'overheard', 'overheard', 'nghe trộm'],
  ['overlay', 'overlaid', 'overlaid', 'phủ lên'],
  ['overpay', 'overpaid', 'overpaid', 'trả quá tiền'],
  ['override', 'overrode', 'overridden', 'lạm quyền'],
  ['overrun', 'overran', 'overrun', 'tràn ngập'],
  ['oversee', 'oversaw', 'overseen', 'trông nom'],
  ['oversell', 'oversold', 'oversold', 'bán quá mức'],
  ['oversew', 'oversewed', 'oversewn / oversewed', 'may nối vắt'],
  ['overshoot', 'overshot', 'overshot', 'đi quá đích'],
  ['oversleep', 'overslept', 'overslept', 'ngủ quên'],
  ['overspeak', 'overspoke', 'overspoken', 'Nói quá nhiều, nói lấn át'],
  ['overspend', 'overspent', 'overspent', 'tiêu quá lố'],
  [
    'overspill',
    'overspilled / overspilt',
    'overspilled / overspilt',
    'đổ, làm tràn',
  ],
  ['overtake', 'overtook', 'overtaken', 'đuổi bắt kịp'],
  ['overthink', 'overthought', 'overthought', 'tính trước nhiều quá'],
  ['overthrow', 'overthrew', 'overthrown', 'lật đổ'],
  ['overwind', 'overwound', 'overwound', 'lên dây (đồng hồ) quá chặt'],
  ['overwrite', 'overwrote', 'overwritten', 'viết dài quá, viết đè lên'],
  ['partake', 'partook', 'partaken', 'tham gia, dự phần'],
  ['pay', 'paid', 'paid', 'trả (tiền)'],
  ['plead', 'pleaded / pled', 'pleaded / pled', 'bào chữa, biện hộ'],
  ['prebuild', 'prebuilt', 'prebuilt', 'làm nhà tiền chế'],
  ['predo', 'predid', 'predone', 'làm trước'],
  ['premake', 'premade', 'premade', 'làm trước'],
  ['prepay', 'prepaid', 'prepaid', 'trả trước'],
  ['presell', 'presold', 'presold', 'bán trước thời gian rao báo'],
  ['preset', 'preset', 'preset', 'thiết lập sẵn, cái đặt sẵn'],
  ['preshrink', 'preshrank', 'preshrunk', 'ngâm cho vải co trước khi may'],
  ['proofread', 'proofread', 'proofread', 'Đọc bản thảo trước khi in'],
  ['prove', 'proved', 'proven/proved', 'chứng minh (tỏ)'],
  ['put', 'put', 'put', 'đặt; để'],
  ['quick-freeze', 'quick-froze', 'quick-frozen', 'kết đông nhanh'],
  ['quit', 'quit / quitted', 'quit / quitted', 'bỏ'],
  ['read / riːd /', 'read  /red /', 'read / red  /', 'đọc'],
  ['reawake', 'reawoke', 'reawaken', 'đánh thức 1 lần nữa'],
  ['rebid', 'rebid', 'rebid', 'trả giá, bỏ thầu'],
  ['rebind', 'rebound', 'rebound', 'buộc lại, đóng lại (sách)'],
  [
    'rebroadcast',
    'rebroadcast / rebroadcasted',
    'rebroadcast / rebroadcasted',
    'cự tuyệt, khước từ',
  ],
  ['rebuild', 'rebuilt', 'rebuilt', 'xây dựng lại'],
  ['recast', 'recast', 'recast', 'đúc lại'],
  ['recut', 'recut', 'recut', 'cắt lại; băm (giũa)'],
  ['redeal', 'redealt', 'redealt', 'phát bài lại'],
  ['redo', 'redid', 'redone', 'làm lại'],
  ['redraw', 'redrew', 'redrawn', 'kéo lại; kéo ngược lại'],
  ['refit (retailor)', 'refitted / refit', 'refitted / refit', 'luồn, xỏ'],
  ['regrind', 'reground', 'reground', 'mài sắc lại'],
  ['regrow', 'regrew', 'regrown', 'trồng lại'],
  ['rehang', 'rehung', 'rehung', 'treo lại'],
  ['rehear', 'reheard', 'reheard', 'nghe trình bày lại'],
  ['reknit', 'reknitted / reknit', 'reknitted / reknit', 'đan lại'],
  ['relay (for example tiles)', 'relaid', 'relaid', 'đặt lại'],
  ['relay (pass along) REGULAR', 'relayed', 'relayed', 'truyền âm lại'],
  ['relearn', 'relearned / relearnt', 'relearned / relearnt', 'học lại'],
  ['relight', 'relit / relighted', 'relit / relighted', 'thắp sáng lại'],
  ['remake', 'remade', 'remade', 'làm lại; chế tạo lại'],
  ['rend', 'rent', 'rent', 'toạc ra; xé'],
  ['repay', 'repaid', 'repaid', 'hoàn tiền lại'],
  ['reread', 'reread', 'reread', 'đọc lại'],
  ['rerun', 'reran', 'rerun', 'chiếu lại (phim), phát thanh lại'],
  ['resell', 'resold', 'resold', 'bán lại'],
  ['resend', 'resent', 'resent', 'gửi lại'],
  ['reset', 'reset', 'reset', 'đặt lại, lắp lại'],
  ['resew', 'resewed', 'resewn / resewed', 'may/ khâu lại'],
  ['retake', 'retook', 'retaken', 'chiếm lại; tái chiếm'],
  ['reteach', 'retaught', 'retaught', 'dạy lại'],
  ['retear', 'retore', 'retorn', 'khóc lại'],
  ['retell', 'retold', 'retold', 'kể lại'],
  ['rethink', 'rethought', 'rethought', 'suy tính lại, cân nhắc lại'],
  ['retread', 'retread', 'retread', 'lại giẫm lên, lại đạp lên'],
  [
    'retrofit',
    'retrofitted / retrofit',
    'retrofitted / retrofit',
    'trang bị thêm những bộ phận mới',
  ],
  ['rewake', 'rewoke / rewaked', 'rewaken / rewaked', 'đánh thức lại'],
  ['rewear', 'rewore', 'reworn', 'mặc lại'],
  ['reweave', 'rewove / reweaved', 'rewoven / reweaved', 'dệt lại'],
  ['rewed', 'rewed / rewedded', 'rewed / rewedded', 'kết hôn lại'],
  ['rewet', 'rewet / rewetted', 'rewet / rewetted', 'làm ướt lại'],
  ['rewin', 'rewon', 'rewon', 'thắng lại'],
  ['rewind', 'rewound', 'rewound', 'cuốn lại, lên dây lại'],
  ['rewrite', 'rewrote', 'rewritten', 'viết lại'],
  ['rid', 'rid', 'rid', 'giải thoát'],
  ['ride', 'rode', 'ridden', 'cưỡi'],
  ['ring', 'rang', 'rung', 'rung chuông'],
  ['rise', 'rose', 'risen', 'đứng dậy; mọc'],
  ['roughcast', 'roughcast', 'roughcast', 'tạo hình phỏng chừng'],
  ['run', 'ran', 'run', 'chạy'],
  ['sand-cast', 'sand-cast', 'sand-cast', 'đúc bằng khuôn cát'],
  ['saw', 'sawed', 'sawn', 'cưa'],
  ['say', 'said', 'said', 'nói'],
  ['see', 'saw', 'seen', 'nhìn thấy'],
  ['seek', 'sought', 'sought', 'tìm kiếm'],
  ['sell', 'sold', 'sold', 'bán'],
  ['send', 'sent', 'sent', 'gửi'],
  ['set', 'set', 'set', 'đặt, thiết lập'],
  ['sew', 'sewed', 'sewn/sewed', 'may'],
  ['shake', 'shook', 'shaken', 'lay; lắc'],
  ['shave', 'shaved', 'shaved / shaven', 'cạo (râu, mặt)'],
  [
    'shear /ʃɪə(r)  ; ʃɪr /',
    'sheared',
    'shorn / ʃɔːn / or / ʃɔːrn/',
    'xén lông (Cừu)',
  ],
  ['shed', 'shed', 'shed', 'rơi; rụng'],
  ['shine', 'shone', 'shone', 'chiếu sáng'],
  [
    'shit',
    'shit / shat / shitted',
    'shit/ shat / shitted',
    'suộc khuộng đi đại tiện',
  ],
  ['shoot', 'shot', 'shot', 'bắn'],
  ['show', 'showed', 'shown/ showed', 'cho xem'],
  ['shrink', 'shrank', 'shrunk', 'co rút'],
  ['shut', 'shut', 'shut', 'đóng lại'],
  [
    'sight-read',
    'sight-read',
    'sight-read',
    'chơi hoặc hát mà không cần nghiên cứu trước',
  ],
  ['sing', 'sang', 'sung', 'ca hát'],
  ['sink', 'sank', 'sunk', 'chìm; lặn'],
  ['sit', 'sat', 'sat', 'ngồi'],
  ['slay', 'slew', 'slain', 'sát hại; giết hại'],
  ['sleep', 'slept', 'slept', 'ngủ'],
  ['slide', 'slid', 'slid', 'trượt; lướt'],
  ['sling', 'slung', 'slung', 'ném mạnh'],
  ['slink', 'slunk', 'slunk', 'lẻn đi'],
  ['slit', 'slit', 'slit', 'rạch, khứa'],
  ['smell', 'smelt', 'smelt', 'ngửi'],
  ['smite', 'smote', 'smitten', 'đập mạnh'],
  ['sneak', 'sneaked / snuck', 'sneaked / snuck', 'trốn, lén'],
  ['sow', 'sowed', 'sown/ sewed', 'gieo; rải'],
  ['speak', 'spoke', 'spoken', 'nói'],
  ['speed', 'sped/ speeded', 'sped/ speeded', 'chạy vụt'],
  ['spell', 'spelt/ spelled', 'spelt/ spelled', 'đánh vần'],
  ['spend', 'spent', 'spent', 'tiêu xài'],
  ['spill', 'spilt/ spilled', 'spilt/ spilled', 'tràn; đổ ra'],
  ['spin', 'spun/ span', 'spun', 'quay sợi'],
  ['spit', 'spat', 'spat', 'khạc nhổ'],
  ['spoil', 'spoilt/ spoiled', 'spoilt/ spoiled', 'làm hỏng'],
  ['spoon-feed', 'spoon-fed', 'spoon-fed', 'cho ăn bằng muỗng'],
  ['spread', 'spread', 'spread', 'lan truyền'],
  ['spring', 'sprang', 'sprung', 'nhảy'],
  ['stand', 'stood', 'stood', 'đứng'],
  ['stave', 'stove/ staved', 'stove/ staved', 'đâm thủng'],
  ['steal', 'stole', 'stolen', 'đánh cắp'],
  ['stick', 'stuck', 'stuck', 'ghim vào; đính'],
  ['sting', 'stung', 'stung', 'châm ; chích; đốt'],
  ['stink', 'stunk/ stank', 'stunk', 'bốc mùi hôi'],
  ['strew', 'strewed', 'strewn/ strewed', 'rắc, rải'],
  ['stride', 'strode', 'stridden', 'bước sải'],
  ['strike', 'struck', 'struck', 'đánh đập'],
  ['string', 'strung', 'strung', 'gắn dây vào'],
  ['strive', 'strove', 'striven', 'cố sức'],
  ['sublet', 'sublet', 'sublet', 'cho thuê lại; cho thầu lại'],
  [
    'sunburn',
    'sunburned / sunburnt',
    'sunburned / sunburnt',
    'rám nắng, cháy nắng',
  ],
  ['swear', 'swore', 'sworn', 'tuyên thệ'],
  ['sweat', 'sweat / sweated', 'sweat / sweated', 'đổ mồ hôi'],
  ['sweep', 'swept', 'swept', 'quét'],
  ['swell', 'swelled', 'swollen/ swelled', 'phồng; sưng'],
  ['swim', 'swam', 'swum', 'bơi lội'],
  ['swing', 'swung', 'swung', 'đong đưa'],
  ['take', 'took', 'taken', 'cầm ; lấy'],
  ['teach', 'taught', 'taught', 'dạy; giảng dạy'],
  ['tear', 'tore', 'torn', 'xé; rách'],
  ['telecast', 'telecast', 'telecast', 'phát đi bằng truyền hình'],
  ['tell', 'told', 'told', 'kể; bảo'],
  ['test-drive', 'test-drove', 'test-driven', 'lái thử'],
  ['test-fly', 'test-flew', 'test-flown', 'bay thử (một máy bay mới chế tạo)'],
  ['think', 'thought', 'thought', 'suy nghĩ'],
  ['throw', 'threw', 'thrown', 'ném; liệng'],
  ['thrust', 'thrust', 'thrust', 'thọc; nhấn'],
  ['tread', 'trod', 'trodden/ trod', 'giẫm; đạp'],
  [
    'typecast',
    'typecast',
    'typecast',
    'cho đóng cùng một loại vai trò nhiều lần',
  ],
  ['typeset', 'typeset', 'typeset', 'sắp chữ'],
  ['typewrite', 'typewrote', 'typewritten', 'đánh máy'],
  ['unbend', 'unbent', 'unbent', 'làm thẳng lại'],
  ['unbind', 'unbound', 'unbound', 'mở, tháo ra'],
  ['unclothe', 'unclothed / unclad', 'unclothed / unclad', 'cởi áo; lột trần'],
  ['underbid', 'underbid', 'underbid', 'bỏ thầu thấp hơn'],
  ['undercut', 'undercut', 'undercut', 'ra giá rẻ hơn'],
  ['underfeed', 'underfed', 'underfed', 'cho ăn đói, thiếu ăn'],
  ['undergo', 'underwent', 'undergone', 'kinh qua'],
  ['underlie', 'underlay', 'underlain', 'nằm dưới'],
  ['underpay', 'underpaid', 'underpaid', 'trả lương thấp'],
  ['undersell', 'undersold', 'undersold', 'bán rẻ hơn'],
  ['underspend', 'underspent', 'underspent', 'chi tiêu dưới mức'],
  ['understand', 'understood', 'understood', 'hiểu'],
  ['undertake', 'undertook', 'undertaken', 'đảm nhận'],
  ['underwrite', 'underwrote', 'underwritten', 'bảo hiểm'],
  ['undo', 'undid', 'undone', 'tháo ra'],
  ['unfreeze', 'unfroze', 'unfrozen', 'làm tan đông'],
  ['unhang', 'unhung', 'unhung', 'hạ xuống, bỏ xuống'],
  ['unhide', 'unhid', 'unhidden', 'hiển thị, không ẩn'],
  ['unknit', 'unknitted / unknit', 'unknitted / unknit', 'dãn ra, tháo ra'],
  ['unlearn', 'unlearned / unlearnt', 'unlearned / unlearnt', 'gạt bỏ, quên'],
  ['unsew', 'unsewed', 'unsewn / unsewed', 'tháo đường may'],
  ['unsling', 'unslung', 'unslung', 'cởi dây đeo, dây móc'],
  ['unspin', 'unspun', 'unspun', 'quay ngược'],
  ['unstick', 'unstuck', 'unstuck', 'bóc, gỡ'],
  ['unstring', 'unstrung', 'unstrung', 'tháo dây, nới dây'],
  ['unweave', 'unwove / unweaved', 'unwoven / unweaved', 'tháo ra'],
  ['unwind', 'unwound', 'unwound', 'tháo ra'],
  ['uphold', 'upheld', 'upheld', 'ủng hộ'],
  ['upset', 'upset', 'upset', 'đánh đổ; lật đổ'],
  ['wake', 'woke/ waked', 'woken/ waked', 'thức giấc'],
  ['waylay', 'waylaid', 'waylaid', 'mai phục'],
  ['wear', 'wore', 'worn', 'mặc'],
  ['weave', 'wove/ weaved', 'woven/ weaved', 'dệt'],
  ['wed', 'wed/ wedded', 'wed/ wedded', 'kết hôn'],
  ['weep', 'wept', 'wept', 'khóc'],
  ['wet', 'wet / wetted', 'wet / wetted', 'làm ướt'],
  ['whet REGULAR', 'whetted', 'whetted', ''],
  ['win', 'won', 'won', 'thắng; chiến thắng'],
  ['wind', 'wound', 'wound', 'quấn'],
  ['withdraw', 'withdrew', 'withdrawn', 'rút lui'],
  ['withhold', 'withheld', 'withheld', 'từ khước'],
  ['withstand', 'withstood', 'withstood', 'cầm cự'],
  ['work', 'worked', 'worked', 'rèn (sắt), nhào nặng đất'],
  ['wring', 'wrung', 'wrung', 'vặn; siết chặt'],
  ['write', 'wrote', 'written', 'viết'],
];

export const filterIrregularVerb = [
  {
    text: 'All',
    key: 0,
  },
  {
    text: 'v1=v2=v3',
    key: 1,
  },
  {
    text: 'v1=v2',
    key: 2,
  },
];

export const TOPICS = [
  {
    key: '0',
    title: 'Communication',
  },
  {
    key: '1',
    title: 'Greetings',
  },
  {
    key: '2',
    title: 'Travelling',
  },
  {
    key: '3',
    title: 'Finance',
  },
  {
    key: '4',
    title: 'Destination',
  },
  {
    key: '5',
    title: 'Time',
  },
  {
    key: '6',
    title: 'Social media',
  },
  {
    key: '7',
    title: 'Reservation',
  },
  {
    key: '8',
    title: 'Food',
  },
  {
    key: '9',
    title: 'Friend',
  },
  {
    key: '10',
    title: 'Entertainment',
  },
  {
    key: '11',
    title: 'Shopping',
  },
  {
    key: '12',
    title: 'Language barrier',
  },
  {
    key: '13',
    title: 'Emergency & Health',
  },
  {
    key: '15',
    title: 'Common question',
  },
  {
    key: '16',
    title: 'Jobs',
  },
  {
    key: '17',
    title: 'Weather',
  },
  {
    key: '18',
    title: 'Others',
  },
];

export const NUMBERS = [
  {
    key: '10',
    title: '10',
  },
  {
    key: '20',
    title: '20',
  },
  {
    key: '50',
    title: '50',
  },
  {
    key: '100',
    title: '100',
  },
];

export const WORD_TYPES = [
  {
    key: 'n',
    title: 'Noun',
  },
  {
    key: 'adj',
    title: 'Adjective',
  },
  {
    key: 'adv',
    title: 'Adverb',
  },
  {
    key: 'v',
    title: 'Verb',
  },
  {
    key: 'pro',
    title: 'Pronoun',
  },
  {
    key: 'con',
    title: 'Conjunction',
  },
  {
    key: 'pre',
    title: 'Preposition',
  },
  {
    key: 'det',
    title: 'Determiners',
  },
];

export const WORD_LEVELS = [
  {
    key: '0',
    title: 'All',
  },
  {
    key: 'A1',
    title: 'A1',
  },
  {
    key: 'A2',
    title: 'A2',
  },
  {
    key: 'B1',
    title: 'B1',
  },
  {
    key: 'B2',
    title: 'B2',
  },
  {
    key: 'C1',
    title: 'C1',
  },
  {
    key: 'C2',
    title: 'C2',
  },
];

export const WORD_SPECIALTY = [
  {key: '1', title: 'Biotechnology'},
  {key: '6', title: 'Information Technology'},
  {key: '14', title: 'Food Technology'},
  {key: '20', title: 'Entertainment'},
  {key: '3', title: 'Economics'},
  {key: '2', title: 'Accounting'},
  {key: '8', title: 'Chemical Engineering'},
  {key: '19', title: 'Fine Arts Industry'},
  {key: '12', title: 'Marketing'},
  {key: '18', title: 'Hotel Management'},
  {key: '7', title: 'Business Adminstration'},
  {key: '5', title: 'Human Resource Management'},
  {key: '13', title: 'Design UI/UX'},
  {key: '4', title: 'International Trade'},
  {key: '10', title: 'E-Commerce'},
  {key: '9', title: 'Business English'},
  {key: '11', title: 'Finance & Banking'},
  {key: '16', title: 'Culturology'},
  {key: '17', title: 'Construction Industry'},
  {key: '15', title: 'Sociology'},
];

export const TOPICS_WORD_GAME = [
  {
    key: '0',
    title: 'Thực vật',
  },
  {
    key: '1',
    title: 'Đời sống',
  },
  {
    key: '2',
    title: 'Sức khoẻ',
  },
  {
    key: '3',
    title: 'Ẩm thực',
  },
  {
    key: '4',
    title: 'Sự vật',
  },
  {
    key: '6',
    title: 'Động vật',
  },
  {
    key: '7',
    title: 'Kỹ năng',
  },
  {
    key: '9',
    title: 'Công nghệ',
  },
  {
    key: '10',
    title: 'Con người',
  },
  {
    key: '11',
    title: 'Công việc',
  },
  {
    key: '12',
    title: 'Giải trí',
  },
  {
    key: '13',
    title: 'Sở thích',
  },
  {
    key: '14',
    title: 'Thể thao',
  },
  {
    key: '15',
    title: 'Du lịch',
  },
  {
    key: '16',
    title: 'Quốc gia',
  },
  {
    key: '17',
    title: 'Màu sắc',
  },
  {
    key: '18',
    title: 'Tín ngưỡng',
  },
  {
    key: '19',
    title: 'Thú vị',
  },
  {
    key: '20',
    title: 'TOEIC',
  },
  {
    key: '21',
    title: 'IELTS',
  },
  {
    key: '23',
    title: 'Thiên nhiên',
  },
  {
    key: '24',
    title: 'Mối quan hệ',
  },
  {
    key: '25',
    title: 'Trang phục',
  },
  {
    key: '26',
    title: 'Giáo dục',
  },
  {
    key: '22',
    title: 'Khác',
  },
];

export {isListEqual, sleep};
