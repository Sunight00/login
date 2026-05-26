import Link from 'next/link';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-4 text-lg">You are successfully logged in!</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Go to Login Page
      </Link>
    </main>
  );
}