import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className="w-36 flex justify-center items-center gap-1">
          <Image src="/assets/icons/logo-grey.svg" width={38} height={38} alt="Logo image" />
          <h1 className="font-bold text-lg">Eventizer</h1>
        </Link>

        <p>2023 Eventizer. All rights reserved. &reg;</p>
      </div>
    </footer>
  )
}

export default Footer