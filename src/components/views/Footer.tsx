import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
    <footer className="footer mt-auto bg-black text-base-200 p-10">
    <aside>
     <Image src={"/logo.png"} alt='zyck' width={200} height={200}/>
    </aside>
    <nav>
      <h6 className="footer-title text-white">Popular Searches</h6>
      <Link href={"/search"} className="link link-hover text-gray-300">Appartment For Sale</Link>
      <Link href={"/search"} className="link link-hover text-gray-300">Appartment For Rent</Link>
      <Link href={"/search"} className="link link-hover text-gray-300">House For Sale</Link>
      <Link href={"/search"} className="link link-hover text-gray-300">Office For Rent</Link>
    </nav>
    <nav>
      <h6 className="footer-title text-white">Company</h6>
      <Link href={"/about"} className="link link-hover text-gray-300">About us</Link>
      <Link href={"/contact"} className="link link-hover text-gray-300">Contact</Link>
      <Link href={"/FAQs"} className="link link-hover text-gray-300">FAQs</Link>
    </nav>
    <nav>
      <h6 className="footer-title text-white">Legal</h6>
      <Link href={"/terms-conditions"} className="link link-hover text-gray-300">Terms of use</Link>
      <Link href={"/privacy-policy"} className="link link-hover text-gray-300">Privacy policy</Link>
      <Link href={"/"} className="link link-hover text-gray-300">Blogs</Link>
    </nav>
  </footer>
  <div className='text-center bg-background text-foreground border-t-2'>
  <p className='py-5'>Copyright © 2025. Zyck  Real Estate by Zyck Technology.</p>
  </div>
  </>
  )
}

export default Footer