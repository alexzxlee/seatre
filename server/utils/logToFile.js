import fs from 'fs'

/**
 * Append a log message to /tmp/express-debug.log with timestamp.
 * Fails silently if file cannot be written.
 */
export function logToFile(message) {
  try {
    const logPath = '/tmp/express-debug.log'
    const timestamp = new Date().toISOString()
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`)
  } catch (e) {
    // Fails silently
  }
}
