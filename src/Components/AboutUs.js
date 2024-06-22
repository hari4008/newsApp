import React from 'react'
import { useTheme } from '../context/ThemeProvider'

const AboutUs = () => {
  const { theme } = useTheme(); 
  return (
    <div style={{ border: theme === 'light' ? '1px solid black' : '1px solid white', margin: '300px auto', width: '50%', height: '50%', marginBottom: '0', padding: '20px', color: theme === 'light' ? 'black' : 'white' }} className='rounded'>
    <h1>About Us</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores aut esse est. Ipsam repellat at magnam ipsum recusandae aut. Assumenda impedit, est iure praesentium recusandae expedita odio beatae hic a dolores deserunt itaque nulla voluptatibus vitae officiis perspiciatis repellat. </p>
    </div>
  )
}

export default AboutUs
