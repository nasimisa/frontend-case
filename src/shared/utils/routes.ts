export const ROUTES = {
  LOGIN: '/login',
  FORM: '/form',
  DATA: '/data',
};

export const NAV_ITEMS = [
  {
    label: 'Form',
    path: ROUTES.FORM,
  },
  {
    label: 'Data',
    path: ROUTES.DATA,
  },
] as const;
