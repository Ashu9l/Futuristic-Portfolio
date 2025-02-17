"use client"

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import { Card } from '@/components/ui/card'
import { Brain, Database, Cpu } from 'lucide-react'

const skills = [
  {
    name: 'Artificial Intelligence',
    icon: Brain,
    description: 'Deep learning, neural networks, and natural language processing',
    level: 0.9,
  },
  {
    name: 'Blockchain',
    icon: Database,
    description: 'Smart contracts, DeFi, and distributed systems',
    level: 0.85,
  },
  {
    name: 'Quantum Computing',
    icon: Cpu,
    description: 'Quantum algorithms and quantum machine learning',
    level: 0.75,
  },
]

function ParticleField({ skill }: { skill: typeof skills[0] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Array<{ x: number; y: number; vx: number; vy: number }> = []
    
    const createParticles = () => {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      }))
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        ctx.fillStyle = `rgba(0, 255, 255, ${skill.level})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }

    createParticles()
    animate()
  }, [skill])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
      width={300}
      height={200}
    />
  )
}

export default function ExpertiseSection() {
  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center neon-text"
        >
          Technical Expertise
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 relative glass-card overflow-hidden group">
                <ParticleField skill={skill} />
                <div className="relative z-10">
                  <skill.icon className="w-12 h-12 mb-4 text-cyan-400" />
                  <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                  <p className="text-gray-400">{skill.description}</p>
                  <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}