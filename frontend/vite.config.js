import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://my-student-study-planner-backend.railway.internal:8000",
    },
  },
  preview: {
    proxy: {
      "/api": "http://my-student-study-planner-backend.railway.internal:8000",
    },
  },
});