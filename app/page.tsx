"use client"

import { motion } from 'framer-motion'
import HeroScene from '@/components/hero-scene'
import ExpertiseSection from '@/components/expertise-section'
import ProjectsSection from '@/components/projects-section'
import ContactSection from '@/components/contact-section'
import { Terminal } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative h-screen">
        <div className="absolute inset-0 hero-gradient" />
        <HeroScene />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center z-10"
          >
            <motion.h1
              className="text-6xl font-bold mb-4 neon-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Ashu Bind
            </motion.h1>
            <motion.div
              className="flex items-center justify-center gap-2 text-xl text-cyan-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Terminal className="w-6 h-6" />
              <span>Full Stack Developer & AI Engineer</span>
            </motion.div>
            <motion.p
              className="mt-6 text-gray-400 max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Crafting next-generation experiences with AI, blockchain, and quantum computing
            </motion.p>
          </motion.div>
        </div>
      </div>

      <ExpertiseSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}