import '../index.scss';
import './styles/globals.scss';

import { auth0 } from '@/lib/auth0';
import { AuthProvider } from '@/lib/authProvider';
import SimpleContainer from '@/components/ui/containers/Container';
import ThemeRegistry from './ThemeRegistry';
import { metadata } from '@/lib/metadata';
export { metadata };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  const user = session?.user
    ? {
        id: session.user.sub,
        name: session.user.name,
        email: session.user.email,
      }
    : null;

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider initialUser={user}>
            <SimpleContainer>{children}</SimpleContainer>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
