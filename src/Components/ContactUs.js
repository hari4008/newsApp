import React from 'react'
import { useTheme } from '../context/ThemeProvider'

const ContactUs = () => {
  const { theme } = useTheme();
  return (
    <div style={{ border: theme === 'light' ? '1px solid black' : '1px solid white', margin: '300px auto', width: '50%', height: '50%', marginBottom: '0', padding: '20px',color: theme === 'light' ? 'black' : 'white' }} className='rounded'>
      <h1>Contact Info</h1>
      <span><b>Mobile No </b>: 9998997990
      ,<b> Email Id </b>: abc@gmail.com</span>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores aut esse est. Ipsam repellat at magnam ipsum recusandae aut. Assumenda impedit, est iure praesentium recusandae expedita odio beatae hic a dolores deserunt itaque nulla voluptatibus vitae officiis perspiciatis repellat. </p>
    </div>
  )
}

export default ContactUs
