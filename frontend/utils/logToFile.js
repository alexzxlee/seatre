
/**
 * Server-side logging guidance:
 * - console.log in server-side middleware will NOT appear in the browser console and usually won’t show up in production logs on cPanel/Passenger.
 * - logToFile writes to a file you can check via SSH, making it reliable for production debugging.
 * - For production debugging on cPanel/Passenger, always prefer logToFile or another file-based logging method.
 * - You can keep console.log for local development, where it will show in your terminal.
 */
import fs from 'fs'
import path from 'path'

/**
 * Append a log message to /tmp/nuxt-debug.log with timestamp.
 * Fails silently if file cannot be written.
 */
export function logToFile(message) {
  try {
    const logPath = path.resolve('/tmp/nuxt-debug.log')
    const timestamp = new Date().toISOString()
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`)
  } catch (e) {
    // Fails silently
  }
}
