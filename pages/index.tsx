import { NotSignedIn } from "@/components/NotSignedIn";
import { useSession, signOut } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();

  if (!session) return <NotSignedIn />;

  return (
    <main className="flex h-screen w-full justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Algolia Assessment</h1>
        <p className="text-xl">Current User: {session.user.email}</p>
        <button
          className="bg-red-500 font-bold rounded-full py-2 px-4 my-4"
          onClick={() => signOut()}
        >Log out
        </button>
      </div>
    </main>
  );
}
