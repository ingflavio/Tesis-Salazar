import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'

// Esto reemplaza a __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'src/cert/localhost+1-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'src/cert/localhost+1.pem')),
    },
  }
})