import CartState from './contextApi/Cart/CartState'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online Shop',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ' overflow-x-hidden'}>
        <CartState>
          {children}
        </CartState>
      </body>
    </html>
  )
}
