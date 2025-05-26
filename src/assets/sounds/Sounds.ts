import { SmartSound } from '../../util/SmartSound';
import answerSelected from './answer/selected.wav';
import questionExpired  from './question/expired.wav';

export const Sounds = {
  question: {
    expired: new SmartSound(questionExpired),
  },
  answer: {
    selected: new SmartSound(answerSelected),
  },
};
