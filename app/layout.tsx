import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Open_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'

import './globals.css'
import { SocketProvider } from '@/components/providers/socket-provider'
const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Team chat application',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/'}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn('bg-white dark:bg-[#313338]', font.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SocketProvider>
              <ModalProvider />
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
