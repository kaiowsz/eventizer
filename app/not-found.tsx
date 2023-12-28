import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Link from "next/link"
import React from "react"

const NotFound = () => {
  return (
    <>
    <Header />
      <main className="flex-1 flex flex-col
      gap-8 justify-center items-center mt-16">
        <h1 className="h1-bold">404 | Page Not Found</h1>
        <p className="h3-bold">Go to the <Link href="/" className="underline">home page</Link></p>
      </main>
      <div className="absolute bottom-0 right-0 left-0">
        <Footer />
      </div>
    </>
  )
}

export default NotFound