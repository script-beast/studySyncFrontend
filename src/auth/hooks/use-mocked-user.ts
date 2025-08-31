import { _mock } from 'src/_mock';

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Demo User',
    email: 'demo@gmail.com',
    photoURL: _mock.image.avatar(24),
    address: '127.0.0.1',
    state: 'localhost',
    city: 'TCP',
    zipCode: '00000',
    about: 'This is a demo user for previewing the application.',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
