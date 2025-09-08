import guideCardImg1 from '../assets/images/guideCardImg1.webp';
import guideCardImg2 from '../assets/images/guideCardImg2.webp';
import guideCardImg3 from '../assets/images/guideCardImg3.webp';
import guideCardImg4 from '../assets/images/guideCardImg4.webp';

export const GUIDE_CARD_DATA = [
  {
    cardImgSrc: guideCardImg1,
    cardImgAlt: 'Силует собаки та кота, що сидять поруч, символ гармонії.',
    cardNumber: '01',
    cardStep: 'Обери кого шукаєш',
    cardDescription: [
      { text: 'Налаштовуй фільтри —', bold: true },
      { text: ' вкажи вид тварини, стать, вік, розмір.', bold: false },
    ],
  },
  {
    cardImgSrc: guideCardImg2,
    cardImgAlt: 'Людина тримає смартфон із профілем у соцмережі.',
    cardNumber: '02',
    cardStep: 'Свайпай картки',
    cardDescription: [
      { text: 'Переглядай профілі', bold: true },
      { text: ' тварин та обирай улюбленця.', bold: false },
    ],
  },
  {
    cardImgSrc: guideCardImg3,
    cardImgAlt: 'Рука людини та лапа тварини торкаються, символ дружби.',
    cardNumber: '03',
    cardStep: 'Отримай match',
    cardDescription: [
      { text: 'Та переходь до заповнення ', bold: false },
      { text: 'коротенької анкети.', bold: true },
    ],
  },
  {
    cardImgSrc: guideCardImg4,
    cardImgAlt: 'Людина обіймає собаку, символ тепла та любові.',
    cardNumber: '04',
    cardStep: 'Забирай хвостика додому',
    cardDescription: [
      { text: 'Відчуй щастя,', bold: true },
      { text: ' що торкається лапкою. Радість та новий ритм.', bold: false },
    ],
  },
];
