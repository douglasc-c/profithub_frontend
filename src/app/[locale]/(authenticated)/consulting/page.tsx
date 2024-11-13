'use client'

export default function Consulting() {
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center h-[calc(102vh-9rem)] text-center">
        <div className="bg-gradient-to-b from-[#430298] to-[#00A9FE] bg-clip-text text-transparent text-[10rem] font-extrabold">
          🚀
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-6">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
          We&apos;re working hard to bring something awesome. Stay tuned!
        </p>
        <div className="mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Follow us for updates.
          </p>
          <div className="mt-4 flex space-x-4 justify-center">
            <a
              href="https://www.instagram.com/profithub.tech/profilecard/?igsh=MXA4d2U4Zmd3a2g3MQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-100 font-semibold hover:text-zinc-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
