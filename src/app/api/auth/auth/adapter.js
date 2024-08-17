// app/api/auth/adapter.ts

// In-memory storage
const users = [];
const accounts = [];
const sessions = [];
const verificationTokens = [];

export const InMemoryAdapter = {
    async createUser(user) {
        users.push(user);
        return user;
    },
    async getUser(id) {
        return users.find(user => user.id === id) || null;
    },
    async getUserByEmail(email) {
        return users.find(user => user.email === email) || null;
    },
    async getUserByAccount({ provider, providerAccountId }) {
        return accounts.find(account => account.provider === provider && account.providerAccountId === providerAccountId) || null;
    },
    async createSession(session) {
        sessions.push(session);
        return session;
    },
    async getSession(sessionToken) {
        return sessions.find(session => session.sessionToken === sessionToken) || null;
    },
    async deleteSession(sessionToken) {
        const index = sessions.findIndex(session => session.sessionToken === sessionToken);
        if (index !== -1) sessions.splice(index, 1);
    },
    async createVerificationToken(verificationToken) {
        verificationTokens.push(verificationToken);
        return verificationToken;
    },
    async useVerificationToken({ identifier, token }) {
        const index = verificationTokens.findIndex(vt => vt.identifier === identifier && vt.token === token);
        if (index !== -1) {
            const [verificationToken] = verificationTokens.splice(index, 1);
            return verificationToken;
        }
        return null;
    },
};
