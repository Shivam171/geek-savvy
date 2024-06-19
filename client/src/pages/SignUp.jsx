import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.id]: ev.target.value.trim() });
  }
  console.log(formData);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }

    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      setLoading(false)
      if (res.ok) {
        navigate("/sign-in")
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row  md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">Geek</span>Savvy
          </Link>
          <p className="text-sm mt-5">Sign up with your email and password or with Google.</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label>Username</Label>
              <TextInput type="text" onChange={handleChange} placeholder="John Doe" id="username" />
            </div>
            <div className="">
              <Label>Email</Label>
              <TextInput type="email" onChange={handleChange} placeholder="john@gmail.com" id="email" />
            </div>
            <div className="">
              <Label>Password</Label>
              <TextInput type="password" onChange={handleChange} placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone={"purpleToPink"} type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : "Sign up"
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">Sign in</Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color={"failure"}>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
