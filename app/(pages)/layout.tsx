import React from 'react'
import NavBar from '../components/NavBar'

interface PagesLayoutProps {
  children: React.ReactNode;
}

const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
  return (
    <div>
        {/* <NavBar /> */}
        {children}
    </div>
  )
}

export default PagesLayout