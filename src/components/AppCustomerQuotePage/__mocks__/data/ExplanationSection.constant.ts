/* eslint-disable max-len */
import ImgCalendar from 'assets/icon-calendar.svg';
import ImgInitial from 'assets/icon-initial-walkthrough.svg';
import ImgFinal from 'assets/icon-final-walkthrough.svg';
import ImgBilling from 'assets/icon-billing.svg';

import {mockExplanationConstantType} from '../../types';

export const mockExplanationData: mockExplanationConstantType[] = [
  {
    heading: 'Scheduling',
    svgUrl: ImgCalendar,
    description:
      'After accepting your quote, our project management team will be in touch with you <b>within a week </b>to discuss next steps, and get you scheduled as soon as possible!',
  },
  {
    heading: 'Initial walkthrough',
    svgUrl: ImgInitial,
    description:
      'The day of the project start, we ask you to please be home between 8–10am, so you can go over the project specifications with our installer.',
  },
  {
    heading: 'Final walkthrough and sign off',
    svgUrl: ImgFinal,
    description:
      'At the end of the job, we’ll do a final walkthrough to confirm you’re happy with the project and get your sign off.',
  },
  {
    heading: 'Billing',
    svgUrl: ImgBilling,
    description:
      'You’ll be charged after your project is complete. Payments made via paper check or e-check will be charged at the amount listed on your quote. Payments made via credit card will be subject to an additional {CARD_TRANSACTION_FEE} transaction fee.',
  },
];
