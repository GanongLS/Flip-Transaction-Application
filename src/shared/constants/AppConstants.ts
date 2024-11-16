import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const height = screenHeight < screenWidth ? screenWidth : screenHeight;
export const width = screenWidth < screenHeight ? screenWidth : screenHeight;

export const dummyText =
  'Quis laborum aute nostrud duis. Laboris et et consequat aliquip eu laboris ullamco qui velit. Ex ex minim incididunt eu culpa nisi est quis laborum. Velit qui consequat occaecat excepteur laboris anim cillum anim mollit enim eiusmod. Tempor anim officia qui elit est est sint amet ea fugiat. Irure elit labore tempor ullamco ut labore labore pariatur. Aliquip et nisi magna consequat nulla magna excepteur pariatur sint officia aute aute. Cillum commodo cupidatat elit amet excepteur sint incididunt tempor non officia occaecat cillum esse dolore. Mollit enim laboris elit laboris consectetur non id amet ea dolore. Enim do ipsum ad nisi enim. Duis esse aliquip irure ad pariatur tempor aliqua. Aliquip proident occaecat cillum officia aute enim quis fugiat non proident cupidatat excepteur proident. Occaecat eu aute veniam do labore adipisicing mollit velit exercitation adipisicing. Fugiat do nostrud excepteur nisi nulla ut excepteur ullamco qui et esse qui. Occaecat eu aute veniam do labore adipisicing mollit velit exercitation adipisicing. Fugiat do nostrud excepteur nisi nulla ut excepteur ullamco qui et esse qui. .';
