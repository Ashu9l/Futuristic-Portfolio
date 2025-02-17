"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mic, Send, Wand2 } from 'lucide-react'

function Avatar() {
  return (
    <>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#00ffff" wireframe />
      </mesh>
    </>
  )
}

export default function ContactSection() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [audioData, setAudioData] = useState<number[]>([])
  
  useEffect(() => {
    if (!isListening) return
    
    let recognition: SpeechRecognition
    
    try {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      recognition.continuous = true
      recognition.interimResults = true
      
      recognition.onresult = (event) => {
        const last = event.results.length - 1
        setTranscript(event.results[last][0].transcript)
      }
      
      recognition.start()
    } catch (error) {
      console.error('Speech recognition not supported')
    }
    
    // Simulate audio visualization data
    const interval = setInterval(() => {
      setAudioData(Array.from({ length: 20 }, () => Math.random()))
    }, 100)
    
    return () => {
      recognition?.stop()
      clearInterval(interval)
    }
  }, [isListening])
  
  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center neon-text"
        >
          Get in Touch
        </motion.h2>
        
        <Card className="p-8 glass-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="glass-card border-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="glass-card border-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Your Message"
                    value={transcript || ''}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="glass-card border-cyan-500/20 focus:border-cyan-500 min-h-[150px]"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-2 right-2 text-cyan-400 hover:text-cyan-300"
                    onClick={() => setIsListening(!isListening)}
                  >
                    <Mic className={`w-5 h-5 ${isListening ? 'text-red-500' : ''}`} />
                  </Button>
                </div>
                
                {isListening && (
                  <div className="flex items-center gap-1 h-8">
                    {audioData.map((value, index) => (
                      <motion.div
                        key={index}
                        className="w-1 bg-cyan-400"
                        animate={{ height: `${value * 32}px` }}
                        transition={{ duration: 0.1 }}
                      />
                    ))}
                  </div>
                )}
                
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            <div className="relative h-[400px]">
              <Canvas>
                <Avatar />
              </Canvas>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <p className="text-cyan-400 flex items-center justify-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  AI Assistant ready to help
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}