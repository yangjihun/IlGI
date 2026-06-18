import 'dotenv/config'
import { createApp } from './app.js'

const port = Number(process.env.PORT ?? 3000)

createApp()
  .then((app) => {
    app.listen(port, () => {
      console.log(`API server listening on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })
