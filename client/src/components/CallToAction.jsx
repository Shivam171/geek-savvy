import { Button } from "flowbite-react"
export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript?</h2>
        <p className="text-gray-500 my-2">Explore the future of Javascript.</p>
        <Button gradientDuoTone={"purpleToPink"} className="rounded-tl-xl rounded-bl-none">
          <a href="https://pf.com.pk/blogs/the-future-of-javascript-what-to-expect-in-2023/" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://pf.com.pk/wp-content/uploads/2023/01/image1-4.jpg" />
      </div>
    </div>
  )
}
