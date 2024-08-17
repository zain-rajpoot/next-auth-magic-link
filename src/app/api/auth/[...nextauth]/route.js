// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { InMemoryAdapter } from '../auth/adapter';

const handler = NextAuth({
    providers: [
        EmailProvider({
            server: {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587', 10),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    adapter: InMemoryAdapter,
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
});

export { handler as GET, handler as POST };
