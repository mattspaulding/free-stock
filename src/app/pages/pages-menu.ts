import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Bots',
    icon: 'nb-power',
    link: '/bots',
    children: [
      {
        title: 'Overview',
        link: '/bots/overview',
      },
      {
        title: 'Bruno',
        link: '/bots/bruno',
      },
      {
        title: 'Geoffrey',
        link: '/bots/geoffrey',
      },
      {
        title: 'Dot',
        link: '/bots/dot',
      },
      {
        title: 'Rocket',
        link: '/bots/rocket',
      },
    ],
  },
  {
    title: 'Stock',
    icon: 'nb-bar-chart',
    link: '/stock',
    children: [
      {
        title: 'Search',
        link: '/stock/search',
      },
      {
        title: 'Strategies',
        link: '/stock/strategies',
      },
      {
        title: 'Active Investments',
        link: '/stock/active-investments',
      },
      {
        title: 'Completed Investments',
        link: '/stock/completed-investments',
      },
    ],
  },
  // {
  //   title: 'UI Features',
  //   icon: 'nb-keypad',
  //   link: '/ui-features',
  //   children: [
  //     {
  //       title: 'Buttons',
  //       link: '/ui-features/buttons',
  //     },
  //     {
  //       title: 'Grid',
  //       link: '/ui-features/grid',
  //     },
  //     {
  //       title: 'Icons',
  //       link: '/ui-features/icons',
  //     },
  //     {
  //       title: 'Modals',
  //       link: '/ui-features/modals',
  //     },
  //     {
  //       title: 'Typography',
  //       link: '/ui-features/typography',
  //     },
  //     {
  //       title: 'Animated Searches',
  //       link: '/ui-features/search-fields',
  //     },
  //     {
  //       title: 'Tabs',
  //       link: '/ui-features/tabs',
  //     },
  //   ],
  // },
  // {
  //   title: 'Forms',
  //   icon: 'nb-compose',
  //   children: [
  //     {
  //       title: 'Form Inputs',
  //       link: '/forms/inputs',
  //     },
  //     {
  //       title: 'Form Layouts',
  //       link: '/forms/layouts',
  //     },
  //   ],
  // },
  // {
  //   title: 'Components',
  //   icon: 'nb-gear',
  //   children: [
  //     {
  //       title: 'Tree',
  //       link: '/components/tree',
  //     }, {
  //       title: 'Notifications',
  //       link: '/components/notifications',
  //     },
  //   ],
  // },
  // {
  //   title: 'Maps',
  //   icon: 'nb-location',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/maps/bubble',
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   icon: 'nb-bar-chart',
  //   children: [
  //     {
  //       title: 'Echarts',
  //       link: '/charts/echarts',
  //     },
  //     {
  //       title: 'Charts.js',
  //       link: '/charts/chartjs',
  //     },
  //     {
  //       title: 'D3',
  //       link: '/charts/d3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: 'nb-title',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/editors/ckeditor',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/tables/smart-table',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
