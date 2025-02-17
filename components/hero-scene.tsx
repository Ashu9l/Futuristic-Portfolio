"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Line } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useRef, useState } from 'react'

type Vector3Tuple = [x: number, y: number, z: number]

function NeuralNetwork() {
  const points: Vector3Tuple[] = []
  const connections: [Vector3Tuple, Vector3Tuple][] = []
  
  // Create neural network points
  for (let i = 0; i < 50; i++) {
    points.push([
      Math.random() * 4 - 2,
      Math.random() * 4 - 2,
      Math.random() * 4 - 2
    ])
  }

  // Create connections between points
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (Math.random() > 0.95) {
        connections.push([points[i], points[j]])
      }
    }
  }

  return (
    <>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#00ffff" />
        </mesh>
      ))}
      {connections.map((connection, i) => {
        const [start, end] = connection
        const points = [
          new THREE.Vector3().fromArray(start),
          new THREE.Vector3().fromArray(end)
        ]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <Line
            key={i}
            points={points}
            color="#00ffff"
            opacity={0.3}
            transparent
            lineWidth={1}
          />
        )
      })}
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <NeuralNetwork />
      </Canvas>
    </div>
  )
}