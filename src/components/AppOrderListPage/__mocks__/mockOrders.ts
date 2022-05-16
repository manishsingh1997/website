import {mockHouseA, mockHouseB} from '../../__mocks__/mockHouses';

export const mockUpcomingAppointmentId = 420;
export const mockPastAppointmentId = 69;

export const mockOrders = [
  {
    id: mockUpcomingAppointmentId,
    ordered_at: '2022-04-26T00:37:39.668634-07:00',
    house: mockHouseA,
    product: {
        id: 105,
        name: 'Fence Installation',
        short_name: 'Fence',
        slug: 'fence-replacement',
        is_active: true
    },

    quotes: [
      {
        id: 81993,
        title: null,
        sent_to_customer_at: null,
        total_price: '0.00',
        total_cost: '0.00',
        approved_at: null,
        cancelled_at: null,
        reviewed_at: null,
        // eslint-disable-next-line max-len
        description_html: '<p>We are fully licensed, insured, and bonded.  </p>\n<p>We guarantee the quality of our work and back that with a 1 year Conditional Warranty</p>\n<p>Your new fence will be a <strong>“insert finished height and style here”</strong> ex.-  6 foot Picture Frame Board on Board with Lattice built with Con Common Redwood.</p>\n<p>We will arrive on-site, on-time, and on-schedule to complete the job safely, to spec, and according to code.</p>\n<p>Included in your price:</p>\n<ul>\n<li>Will call 811 “Call Bef...',
        order_id: 61255,
        quote_lines: [],
        preview_quote_line: null,
        secret: '1kPPKQ6ZiKmRxznu',
        expires_at: null,
        total_length: '0',
        total_area: '0',
        status: {
          id: 43,
          type: 'quote_status',
          type_display: 'Quote Status',
          code: 'new',
          label: 'Draft',
          sequence: 1
        }
      }
    ],
  },{
    id: mockPastAppointmentId,
    ordered_at: '2022-05-26T00:37:39.668634-07:00',
    house: mockHouseB,
    product: {
        id: 105,
        name: 'Fence Installation',
        short_name: 'Fence',
        slug: 'fence-replacement',
        is_active: true
    },
    quotes: [
      {
        id: 81993,
        title: null,
        sent_to_customer_at: null,
        total_price: '0.00',
        total_cost: '0.00',
        approved_at: null,
        cancelled_at: null,
        reviewed_at: null,
        // eslint-disable-next-line max-len
        description_html: '<p>We are fully licensed, insured, and bonded.  </p>\n<p>We guarantee the quality of our work and back that with a 1 year Conditional Warranty</p>\n<p>Your new fence will be a <strong>“insert finished height and style here”</strong> ex.-  6 foot Picture Frame Board on Board with Lattice built with Con Common Redwood.</p>\n<p>We will arrive on-site, on-time, and on-schedule to complete the job safely, to spec, and according to code.</p>\n<p>Included in your price:</p>\n<ul>\n<li>Will call 811 “Call Bef...',
        order_id: 61255,
        quote_lines: [],
        preview_quote_line: null,
        secret: '1kPPKQ6ZiKmRxznu',
        expires_at: null,
        total_length: '0',
        total_area: '0',
        status: {
          id: 43,
          type: 'quote_status',
          type_display: 'Quote Status',
          code: 'new',
          label: 'Draft',
          sequence: 1
        }
      }
    ],
  }
];
