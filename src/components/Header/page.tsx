import React from 'react';

import LogoSpacetools from '../../assets/png/spacetools.svg'
import Image from 'next/image';


export default function Header() {
  return (
    <div className="w-full flex justify-center py-4">
      <Image src={LogoSpacetools} alt="incontools" height={200} width={300} />
      <section>

      </section>
    </div>

  )
}