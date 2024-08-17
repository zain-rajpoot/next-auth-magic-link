
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function ProtectedPage() {
  const session = await getServerSession();

  if (!session) {
    return redirect('/auth/signin');
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {session.user?.email}!</p>
      <br />
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
