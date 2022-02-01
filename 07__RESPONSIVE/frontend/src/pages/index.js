import React from 'react'
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="bg-page-background-mobile sm:bg-page-background-desktop min-h-screen bg-fixed bg-cover">
      <Head>
        <title>Enneagram Assessment</title>
      </Head>
      {/* content wrapper */}
      <main className="px-6 xl:px-32">

        {/* logo */}
        <div className="w-full text-center pb-8">
          <div className="border-l-1 border-black h-32 sm:h-64 inline-block">
            <div className="absolute transform -translate-x-1/2 translate-y-1/2 w-16 sm:w-32">
              <Image
                src="/img/logo.svg"
                height={128}
                width={128}
                alt="Logo"
                layout="responsive"
                sizes="4 rem, (min-width: 640px) 8rem"
              />
            </div>
          </div>
        </div>

        {/* box */}
        <div className="bg-white shadow-lg p-6">

          {/* heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl -mt-32 mb-2">
            <span className="font-handwriting text-7xl block">free</span>
            Enneagram Assessment
          </h1>
          <h2 className="font-sans uppercase tracking-wider text-primary text-lg mb-4">Create an Account</h2>

          {/* form */}
          <form action="" className="relative pb-12 lg:pb-0 lg:grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="name">First Name</label>
              <input type="text" name="name" />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
            </div>

            <div className="col-span-3">
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">I agree to your{" "}
                <Link href="/terms-and-conditions"><a>terms and conditions</a></Link>.
              </label>
            </div>

            <button type="submit" role="submit" className="z-50 block absolute -bottom-12 left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 h-12 w-44 bg-primary font-handwriting">
              <span className="text-6xl relative -top-2">Submit</span>
            </button>
          </form>


        </div>
        <div className="absolute md:relative left-0 bottom-2 md:bottom-0 w-full text-center md:text-left md:pt-2"><Link href="/what-is">What is the Enneagram?</Link></div>
      </main>
    </div>
  )
}

export default Home
