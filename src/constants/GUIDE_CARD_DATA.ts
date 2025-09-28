import guideCardImg1 from '../assets/images/guideCardImg1.webp';
import guideCardImg2 from '../assets/images/guideCardImg2.webp';
import guideCardImg3 from '../assets/images/guideCardImg3.webp';
import guideCardImg4 from '../assets/images/guideCardImg4.webp';

export const GUIDE_CARD_DATA = [
  {
    cardImgSrc: guideCardImg1,
    cardImgAlt: 'Силует собаки та кота, що сидять поруч, символ гармонії.',
    cardNumber: '01',
    cardStep: 'howItWorks.steps.1.title',
    cardDescription: [
      { text: 'howItWorks.steps.1.descPart1', bold: true },
      { text: 'howItWorks.steps.1.descPart2', bold: false },
    ],
  },
  {
    cardImgSrc: guideCardImg2,
    cardImgAlt: 'Людина тримає смартфон із профілем у соцмережі.',
    cardNumber: '02',
    cardStep: 'howItWorks.steps.2.title',
    cardDescription: [
      { text: 'howItWorks.steps.2.descPart1', bold: true },
      { text: 'howItWorks.steps.2.descPart2', bold: false },
    ],
  },
  {
    cardImgSrc: guideCardImg3,
    cardImgAlt: 'Рука людини та лапа тварини торкаються, символ дружби.',
    cardNumber: '03',
    cardStep: 'howItWorks.steps.3.title',
    cardDescription: [
      { text: 'howItWorks.steps.3.descPart1', bold: false },
      { text: 'howItWorks.steps.3.descPart2', bold: true },
    ],
  },
  {
    cardImgSrc: guideCardImg4,
    cardImgAlt: 'Людина обіймає собаку, символ тепла та любові.',
    cardNumber: '04',
    cardStep: 'howItWorks.steps.4.title',
    cardDescription: [
      { text: 'howItWorks.steps.4.descPart1', bold: true },
      { text: 'howItWorks.steps.4.descPart2', bold: false },
    ],
  },
];
