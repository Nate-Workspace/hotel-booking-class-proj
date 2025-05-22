import React from 'react'

const Footer = () => {
  return (
    <section className="bg-[#EDF4F5] text-black py-12">
      <div className="mx-auto w-4/6 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left side */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <span className="font-bold flex items-center text-2xl md:text-3xl lg:text-4xl space-x-2">
            <p>Safe</p>
            <p className="text-primary">Stay</p>
          </span>
          <span className="text-gray-800">
            Our vision is to help people discover <br />
            the best stays seamlessly!
          </span>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-4 md:w-1/2 md:items-end lg:items-end items-start ">
          <span className="text-primary font-semibold text-2xl md:text-3xl lg:text-4xl">
            Information
          </span>
          <span className="text-gray-800">
            Powered by the core team
          </span>

          <div className="flex flex-wrap gap-5 mt-4 text-sm font-semibold">
            <a
              href="https://www.instagram.com/natedevjs/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition duration-200"
            >
              Instagram
            </a>
            <a
              href="https://x.com/natedevjs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition duration-200"
            >
              Twitter/X
            </a>
            <a
              href="https://www.threads.net/@natedevjs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition duration-200"
            >
              Threads
            </a>
            <a
              href="https://github.com/Nate-Workspace"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition duration-200"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-israel-9015b4245/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer