import { Link } from "react-router-dom"


export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto">
        {/* left */}
        <div className="">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">Geek</span>Savvy
          </Link>
          <p className="text-sm mt-5">Sign up with your email and password or with Google.</p>
        </div>
        {/* right */}
        <div className="">

        </div>
      </div>
    </div>
  )
}
