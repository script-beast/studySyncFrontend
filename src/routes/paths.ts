// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  MAIN: '/app',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
  },
  // DASHBOARD
  main: {
    dashboard: `${ROOTS.MAIN}`,
    profile: `${ROOTS.MAIN}/profile`,
    documents: `${ROOTS.MAIN}/documents`,
    quiz: `${ROOTS.MAIN}/quiz`,
    flashcards: `${ROOTS.MAIN}/flashcards`,
    settings: `${ROOTS.MAIN}/settings`,
  },
};
