'use client'

// import ButtonSettings from '@/components/buttons/settings'
// import Image from 'next/image'

export default function Settings() {
  return (
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
    // <div className="flex h-[calc(102vh-9rem)]">
    //   <section className="flex flex-col w-2/5 items-center border-r-2 space-y-6">
    //     <div className="flex flex-col w-52 h-3/4 items-center justify-center">
    //       <button className="rounded-full">
    //         <Image
    //           src="/images/svg/avatar.svg"
    //           width={210}
    //           height={210}
    //           alt="Settings"
    //         />
    //       </button>
    //     </div>
    //     <div className="flex flex-col w-52 h-3/4">
    //       <ButtonSettings
    //         params={{ title: 'Dados Pessoais', assets: 'security' }}
    //       />
    //       <ButtonSettings params={{ title: 'Segurança', assets: 'security' }} />
    //       <ButtonSettings params={{ title: 'Planos', assets: 'security' }} />
    //       <ButtonSettings params={{ title: 'Logs', assets: 'logs' }} />
    //       <ButtonSettings params={{ title: 'Sair', assets: 'signout' }} />
    //     </div>
    //   </section>
    //   <section className="flex flex-col w-3/5 items-center"></section>
    // </div>
  )
}
