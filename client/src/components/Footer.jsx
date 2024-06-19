import { Footer } from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitterX } from 'react-icons/bs'
import { Link } from 'react-router-dom'
export default function FooterComponent() {
  return (
    <Footer container={true} className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="">
            <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">Geek</span>Savvy
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="">
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='/about'>Geek Savvy</Footer.Link>
                <Footer.Link href='https://shivam171.netlify.app/' target='_blank' rel='noopener noreferrer'>Developer</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title='Follow Us' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://github.com/shivam171' rel='noopener noreferrer'>Github</Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Geek Savvy" year={new Date().getFullYear()} />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitterX} />
            <Footer.Icon href='https://github.com/shivam171' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
