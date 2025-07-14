import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import QueryProvider from '@/providers/QueryProvider';

const roboto = Roboto({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {
  title: 'iStudy',
  description: 'Platform designed to help students manage their studies and academic routine.',
  icons: {
    icon: "/icon.ico", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US">
      <body className={`${roboto.className}`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}