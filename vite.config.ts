import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 카페24 idowww.kr 루트 배포 → base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    // 청크 분리: 벤더 라이브러리를 별도 파일로
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
