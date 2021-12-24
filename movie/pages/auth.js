import { useSession, signIn, signOut } from "next-auth/react"

const Auth = () => {
  const { data: session } = useSession()
  console.log(session)

  return (
    <div>
      {!session && (
        <>
          <h1>You are not signed in</h1> <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}

      {session && (
        <>
          <h1>Signed in as {session.user.name} </h1> <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default Auth;
