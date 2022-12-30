import { FC, ReactNode } from 'react'
import SideNav from '@components/layout/SideNav'


const LayoutContainerSide = ({children}: any) => {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <div className="w-full overflow-y-scroll">
         <div className="block max-w-4xl px-4 py-3">{children}</div>
        </div>
     </div>
    </div>
  )
}

export default LayoutContainerSide


