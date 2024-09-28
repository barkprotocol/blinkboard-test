'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGitHubLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('github', { callbackUrl: '/' })
    } catch (error) {
      console.error('Error signing in with GitHub:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-10"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md z-10 bg-gray-800 border border-gray-700 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white mb-2">Welcome to BARK Blinkboard</CardTitle>
            <CardDescription className="text-gray-300">
              Sign in with GitHub to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Github size={80} className="text-white" />
              </div>
            </div>
            <Button
              className="w-full bg-[#24292e] hover:bg-[#2c3137] text-white"
              onClick={handleGitHubLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-center text-gray-400">
              By signing in, you agree to our <a href="#" className="text-orange-400 hover:text-orange-300 underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-orange-300 underline">Privacy Policy</a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}