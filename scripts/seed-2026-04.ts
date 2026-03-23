// 🌟 2026년 4월 12띠 운세 — Firestore Seed 스크립트
// 사용법: npx ts-node scripts/seed-2026-04.ts

import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─────────────────────────────────────────────
// 2026년 4월 12띠 운세 데이터
// ─────────────────────────────────────────────
const fortunes = [
  {
    id: '2026-04-rat',
    year: 2026,
    month: 4,
    zodiac: 'rat',
    title: '2026년 4월 쥐띠 운세',
    stars_overall: 4,
    stars_love: 3,
    stars_money: 4,
    stars_health: 3,
    content_overall:
      '4월은 쥐띠에게 새로운 시작의 기운이 강하게 흐르는 달입니다. 봄의 양기를 받아 그동안 미뤄왔던 일들을 추진하기에 좋은 시기이며, 특히 직장과 사업 면에서 긍정적인 변화가 기대됩니다. 주변의 귀인을 잘 살피면 뜻밖의 도움을 받을 수 있습니다.',
    content_love:
      '솔로라면 지인 소개를 통해 인연이 닿을 가능성이 높습니다. 커플은 함께하는 시간을 늘리면 관계가 더욱 깊어집니다. 단, 감정 표현을 아끼지 마세요.',
    content_money:
      '수입이 안정적으로 유지되는 달입니다. 중순 이후 예상치 못한 소득이 생길 수 있으니 놓치지 마세요. 충동 지출만 조심하면 월말에 여유가 생깁니다.',
    content_health:
      '봄철 환절기 건강에 유의하세요. 특히 목과 어깨 결림이 생기기 쉬우니 스트레칭을 자주 해주시고, 수면 시간을 충분히 확보하는 것이 좋습니다.',
    lucky_color: '보라',
    lucky_numbers: [3, 7],
    caution_dates: [9, 18],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-ox',
    year: 2026,
    month: 4,
    zodiac: 'ox',
    title: '2026년 4월 소띠 운세',
    stars_overall: 3,
    stars_love: 4,
    stars_money: 3,
    stars_health: 4,
    content_overall:
      '4월의 소띠는 꾸준함이 빛을 발하는 시기입니다. 화려한 성과보다는 묵묵히 쌓아온 노력이 서서히 인정받기 시작합니다. 조급해하지 말고 자신의 페이스를 유지하는 것이 중요합니다. 신중한 판단이 좋은 결과로 이어집니다.',
    content_love:
      '이달 소띠의 애정운은 매우 좋습니다. 솔로는 오래 알고 지낸 사람에게서 특별한 감정을 발견할 수 있습니다. 커플은 서로에 대한 배려가 깊어지는 달입니다.',
    content_money:
      '큰 수익보다는 안정적인 흐름이 이어집니다. 투자보다 저축에 집중하는 것이 좋으며, 하반기를 위한 재정 계획을 세워두면 도움이 됩니다.',
    content_health:
      '4월은 소띠의 건강운이 전반적으로 양호합니다. 야외 활동을 늘리면 기분 전환과 함께 체력도 향상됩니다. 식이 조절을 꾸준히 이어가세요.',
    lucky_color: '녹색',
    lucky_numbers: [2, 8],
    caution_dates: [5, 22],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-tiger',
    year: 2026,
    month: 4,
    zodiac: 'tiger',
    title: '2026년 4월 호랑이띠 운세',
    stars_overall: 5,
    stars_love: 4,
    stars_money: 5,
    stars_health: 3,
    content_overall:
      '4월은 호랑이띠에게 올해 최고의 달 중 하나입니다. 강한 기운이 사방에서 모여들어 어떤 일을 시작해도 추진력이 넘칩니다. 오랫동안 준비해온 계획을 실행에 옮기기에 더없이 좋은 시기이며, 주변의 지지도 든든합니다.',
    content_love:
      '매력이 넘치는 달입니다. 솔로는 적극적으로 나서면 좋은 인연을 만날 가능성이 높습니다. 커플은 함께 새로운 경험을 시도해보세요. 관계가 한층 풍성해집니다.',
    content_money:
      '재물운이 강하게 들어오는 달입니다. 그동안 기다려온 수익이 실현되거나 새로운 수입원이 열릴 수 있습니다. 단, 지나친 욕심은 금물입니다.',
    content_health:
      '활동량이 늘어나는 만큼 무리하지 않도록 주의하세요. 특히 무릎과 허리에 무리가 가지 않게 운동 강도를 조절하는 것이 좋습니다.',
    lucky_color: '금색',
    lucky_numbers: [1, 6],
    caution_dates: [13, 27],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-rabbit',
    year: 2026,
    month: 4,
    zodiac: 'rabbit',
    title: '2026년 4월 토끼띠 운세',
    stars_overall: 3,
    stars_love: 5,
    stars_money: 3,
    stars_health: 4,
    content_overall:
      '4월의 토끼띠는 감성이 풍부해지는 시기입니다. 인간관계에서 따뜻한 교류가 이어지고, 주변 사람들과의 유대감이 깊어집니다. 혼자 모든 것을 해결하려 하기보다 주변의 도움을 받아들이는 자세가 중요합니다.',
    content_love:
      '이달 토끼띠의 최고 운세는 애정입니다. 솔로에게 설레는 만남이 찾아오며, 커플은 상대방의 마음을 더욱 깊이 이해하게 됩니다. 적극적으로 감정을 표현해보세요.',
    content_money:
      '재물운은 평범한 수준입니다. 큰 변동 없이 안정적인 흐름이 이어지므로 불필요한 지출을 줄이고 현재 상황을 유지하는 데 집중하세요.',
    content_health:
      '봄철 피로감이 쌓일 수 있습니다. 충분한 수면과 규칙적인 식사가 중요합니다. 주말에 가벼운 산책을 더해주면 컨디션 회복에 도움이 됩니다.',
    lucky_color: '하늘색',
    lucky_numbers: [4, 9],
    caution_dates: [7, 21],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-dragon',
    year: 2026,
    month: 4,
    zodiac: 'dragon',
    title: '2026년 4월 용띠 운세',
    stars_overall: 4,
    stars_love: 3,
    stars_money: 5,
    stars_health: 3,
    content_overall:
      '4월의 용띠는 사업과 재물 방면에서 강한 기운을 받는 달입니다. 리더십이 빛나고 주변에서 인정을 받는 시기로, 중요한 결정을 내리기에 적합합니다. 다만 과욕은 금물이며 겸손한 자세가 성공의 열쇠입니다.',
    content_love:
      '일에 집중하다 보니 애정 관계에 소홀해지기 쉬운 달입니다. 커플이라면 파트너와의 대화 시간을 의식적으로 만들어보세요. 솔로는 직장 내 인연에 주목하세요.',
    content_money:
      '올해 최고의 재물운이 이달에 집중됩니다. 새로운 수익 구조를 만들거나 투자 결정을 내리기에 좋은 시기입니다. 신중하되 과감하게 행동하세요.',
    content_health:
      '과로로 인한 소화 기능 저하에 주의하세요. 식사를 거르지 말고 규칙적으로 챙기는 것이 중요합니다. 스트레스 해소를 위한 취미 활동을 가져보세요.',
    lucky_color: '황금색',
    lucky_numbers: [5, 8],
    caution_dates: [4, 19],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-snake',
    year: 2026,
    month: 4,
    zodiac: 'snake',
    title: '2026년 4월 뱀띠 운세',
    stars_overall: 3,
    stars_love: 3,
    stars_money: 4,
    stars_health: 5,
    content_overall:
      '4월의 뱀띠는 내면의 성장과 자기 계발에 집중하면 좋은 달입니다. 겉으로 드러나는 성과보다는 실력을 쌓고 전략을 세우는 시기로, 조용히 준비한 것이 나중에 큰 힘이 됩니다. 직관력이 뛰어나니 중요한 판단은 본능을 믿으세요.',
    content_love:
      '감정 표현이 다소 어려운 달입니다. 말보다는 행동으로 마음을 전하는 것이 효과적입니다. 솔로는 서두르지 말고 자신을 가다듬는 시간을 가지세요.',
    content_money:
      '재물운이 중상위권을 유지합니다. 꾸준한 수입과 더불어 절약 습관을 이어가면 연말에 의미 있는 자금이 모입니다. 단기 투자보다 장기적 관점을 유지하세요.',
    content_health:
      '이달 뱀띠의 건강운은 최고입니다. 꾸준히 관리해온 생활 습관이 몸으로 나타나는 시기입니다. 이 흐름을 잘 유지하면 하반기까지 건강이 이어집니다.',
    lucky_color: '붉은색',
    lucky_numbers: [6, 9],
    caution_dates: [11, 24],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-horse',
    year: 2026,
    month: 4,
    zodiac: 'horse',
    title: '2026년 4월 말띠 운세',
    stars_overall: 4,
    stars_love: 4,
    stars_money: 3,
    stars_health: 4,
    content_overall:
      '4월은 말띠에게 활동적인 에너지가 넘치는 달입니다. 사교성이 빛을 발하며 다양한 사람들과의 만남이 새로운 기회로 이어집니다. 타고난 추진력을 발휘하되, 세부 사항을 꼼꼼히 챙기는 자세도 잊지 마세요.',
    content_love:
      '활발한 사교 활동 속에서 좋은 인연을 만날 수 있습니다. 솔로는 모임이나 행사에 적극적으로 참여해보세요. 커플은 함께 야외 활동을 즐기면 더욱 가까워집니다.',
    content_money:
      '지출이 수입보다 늘어날 수 있는 달입니다. 사교 모임이 잦아지면서 예상 외 비용이 생기니 월초에 예산을 미리 설정해두는 것이 좋습니다.',
    content_health:
      '활동량이 많아 체력 소모가 큰 달입니다. 무리한 일정보다는 적절한 휴식을 취하며 에너지를 분배하세요. 수분 섭취와 영양 균형에 신경 쓰세요.',
    lucky_color: '주황색',
    lucky_numbers: [3, 7],
    caution_dates: [6, 20],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-goat',
    year: 2026,
    month: 4,
    zodiac: 'goat',
    title: '2026년 4월 양띠 운세',
    stars_overall: 3,
    stars_love: 4,
    stars_money: 3,
    stars_health: 3,
    content_overall:
      '4월의 양띠는 감수성이 높아지고 창의적인 아이디어가 샘솟는 달입니다. 예술적 감각이나 창작 활동에 집중하면 뜻밖의 성과를 거둘 수 있습니다. 주변의 비판보다 자신의 내면의 소리에 귀 기울여 보세요.',
    content_love:
      '따뜻하고 섬세한 양띠의 매력이 빛나는 달입니다. 솔로는 감성적인 대화와 분위기 있는 만남이 새 인연으로 이어집니다. 커플은 작은 이벤트로 감동을 선사해보세요.',
    content_money:
      '재물운은 다소 평범합니다. 충동구매를 자제하고 계획적인 소비 습관을 유지하는 것이 중요합니다. 부업이나 추가 수입원을 모색해볼 만한 시기입니다.',
    content_health:
      '감정 기복이 신체 건강에 영향을 줄 수 있습니다. 명상이나 가벼운 요가로 심신을 안정시키세요. 충분한 수분 섭취와 규칙적인 수면이 중요합니다.',
    lucky_color: '연분홍',
    lucky_numbers: [2, 5],
    caution_dates: [8, 23],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-monkey',
    year: 2026,
    month: 4,
    zodiac: 'monkey',
    title: '2026년 4월 원숭이띠 운세',
    stars_overall: 5,
    stars_love: 3,
    stars_money: 4,
    stars_health: 4,
    content_overall:
      '4월은 원숭이띠에게 재치와 지혜가 빛나는 최고의 달 중 하나입니다. 빠른 상황 판단력과 적응력으로 어떤 상황에서도 기회를 포착할 수 있습니다. 오래전부터 준비해온 프로젝트를 실행하기에 더없이 좋은 때입니다.',
    content_love:
      '다재다능한 매력은 있지만 한 사람에게 집중하는 것이 중요한 달입니다. 솔로는 너무 많은 선택지에 혼란스러울 수 있으니 마음을 정리해보세요. 커플은 신뢰를 쌓는 데 집중하세요.',
    content_money:
      '아이디어를 수익으로 연결하기 좋은 달입니다. 새로운 비즈니스 기회나 부업 아이템을 적극적으로 탐색해보세요. 소규모 투자도 긍정적인 결과를 기대할 수 있습니다.',
    content_health:
      '전반적인 건강 상태가 양호합니다. 활동적인 스포츠나 취미 활동을 즐기기 좋은 달입니다. 다만 과도한 음주나 야식은 자제하는 것이 좋습니다.',
    lucky_color: '파란색',
    lucky_numbers: [1, 4],
    caution_dates: [10, 25],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-rooster',
    year: 2026,
    month: 4,
    zodiac: 'rooster',
    title: '2026년 4월 닭띠 운세',
    stars_overall: 3,
    stars_love: 3,
    stars_money: 4,
    stars_health: 3,
    content_overall:
      '4월의 닭띠는 꼼꼼함과 성실함이 두드러지게 빛나는 달입니다. 완벽을 추구하는 성향이 좋은 결과를 만들어내지만, 지나친 기준으로 스스로를 채찍질하지 않도록 주의하세요. 작은 성취도 소중히 여기는 자세가 필요합니다.',
    content_love:
      '이상과 현실 사이에서 고민하는 시기입니다. 완벽한 상대를 기다리기보다 현재 주변에 있는 사람의 장점을 발견해보세요. 커플은 상대의 단점을 이해하고 포용하는 연습이 필요합니다.',
    content_money:
      '세심한 재테크 능력이 발휘되는 달입니다. 지출 내역을 꼼꼼하게 관리하면 예상보다 더 많은 저축이 가능합니다. 정기 적금이나 안정적인 금융 상품을 검토해보세요.',
    content_health:
      '완벽주의적 성향으로 인한 스트레스가 건강을 위협할 수 있습니다. 취미 활동이나 산책으로 긴장을 풀어주세요. 눈 건강과 두통에 특히 신경 쓰세요.',
    lucky_color: '흰색',
    lucky_numbers: [5, 8],
    caution_dates: [3, 17],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-dog',
    year: 2026,
    month: 4,
    zodiac: 'dog',
    title: '2026년 4월 개띠 운세',
    stars_overall: 4,
    stars_love: 5,
    stars_money: 3,
    stars_health: 4,
    content_overall:
      '4월은 개띠에게 의리와 신뢰가 빛나는 달입니다. 오랜 인연들이 더욱 깊어지고, 주변 사람들로부터 믿음과 사랑을 받는 시기입니다. 새로운 사람보다 이미 곁에 있는 소중한 사람들에게 집중해보세요.',
    content_love:
      '이달 개띠의 애정운은 최고 수준입니다. 솔로는 오래된 지인에게서 특별한 감정을 발견하거나, 진지한 만남이 찾아옵니다. 커플은 서로에 대한 신뢰가 더욱 단단해지는 달입니다.',
    content_money:
      '재물운은 다소 평범합니다. 큰 수익보다는 안정적인 수입 유지에 집중하세요. 지인의 투자 권유는 신중하게 검토한 후에 결정하는 것이 좋습니다.',
    content_health:
      '전반적으로 건강한 달입니다. 규칙적인 운동 습관을 이어가면 더욱 활력이 넘칩니다. 피부 건강에 신경 쓰고 충분한 수면을 취하는 것이 좋습니다.',
    lucky_color: '갈색',
    lucky_numbers: [3, 9],
    caution_dates: [12, 26],
    created_at: new Date().toISOString()
  },
  {
    id: '2026-04-pig',
    year: 2026,
    month: 4,
    zodiac: 'pig',
    title: '2026년 4월 돼지띠 운세',
    stars_overall: 4,
    stars_love: 4,
    stars_money: 5,
    stars_health: 3,
    content_overall:
      '4월은 돼지띠에게 풍요로운 기운이 흐르는 달입니다. 넉넉한 성품과 긍정적인 에너지가 주변 사람들을 끌어당기며 좋은 기회가 자연스럽게 찾아옵니다. 지나친 낙관보다는 현실적인 계획과 함께 기쁨을 누리세요.',
    content_love:
      '따뜻한 감성으로 이달 인연운이 활발합니다. 솔로는 편안하고 자연스러운 만남에서 좋은 상대를 만날 가능성이 높습니다. 커플은 함께 맛있는 것을 먹고 여유를 즐기며 행복을 나눠보세요.',
    content_money:
      '올해 최고의 재물운이 4월에 찾아옵니다. 새로운 수익 기회가 생기거나 기다리던 결과가 나타납니다. 여유 자금을 현명하게 운용할 준비를 해두세요.',
    content_health:
      '식욕이 왕성해지는 달입니다. 맛있는 음식을 즐기되 과식은 피하고 균형 잡힌 식단을 유지하세요. 소화 기관 건강에 특별히 신경 쓰는 것이 좋습니다.',
    lucky_color: '노란색',
    lucky_numbers: [2, 6],
    caution_dates: [14, 28],
    created_at: new Date().toISOString()
  }
];

async function seed() {
  console.log('🚀 2026년 4월 운세 데이터 업로드 시작...\n');

  for (const fortune of fortunes) {
    const { id, ...data } = fortune;
    await setDoc(doc(db, 'fortune', id), data);
    console.log(`✅ ${fortune.title} 저장 완료`);
  }

  console.log('\n🎉 전체 업로드 완료! 총 12개 문서');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ 오류 발생:', err);
  process.exit(1);
});
