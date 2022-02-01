import React, { useState, useEffect } from 'react'
import { useUser } from "../hooks/User";
import { useRouter } from "next/router";

const Auth = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log('checking the user');
    console.log(user);
    if (user?.authenticatedItem === null) {
      router.push('/');
    } else if (user?.authenticatedItem) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <>
      {children}
    </>
  )
}

export { Auth }
