import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapClient from "@/components/BootstrapClient"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: "DreamLabs",
    template: "%s | DreamLabs"
  },
  description: 'DreamLabs official page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='container'>
          <Navbar />
          {children}
          <Footer />
        </div>
        <BootstrapClient />
      </body>
    </html>
  )
}