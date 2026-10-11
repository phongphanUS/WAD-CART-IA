import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
let errors = 0
let checked = 0

function report(file, line, message) {
  console.error(`${relative(root, file)}:${line}: ${message}`)
  errors += 1
}

function checkFile(file) {
  const text = readFileSync(file, 'utf8')
  const lines = text.split(/\r\n|\n|\r/)
  checked += 1

  for (const [index, line] of lines.entries()) {
    if (/^[ \t]*\t/.test(line)) {
      report(file, index + 1, 'Use spaces instead of tabs for indentation')
    }
    if (/[ \t]+$/.test(line)) {
      report(file, index + 1, 'Remove trailing whitespace')
    }
  }

  if (text.length > 0 && !text.endsWith('\n')) {
    report(file, lines.length, 'End the file with a newline')
  }
}

function checkDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) {
      checkDirectory(file)
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      checkFile(file)
    }
  }
}

try {
  checkDirectory(join(root, 'src'))
  checkDirectory(join(root, 'test'))
  checkDirectory(dirname(fileURLToPath(import.meta.url)))
  if (errors > 0) {
    console.error(`Format check failed: ${errors} issue(s) in ${checked} file(s)`)
    process.exitCode = 1
  } else {
    console.log(`Format check passed: ${checked} JavaScript file(s)`)
  }
} catch (error) {
  console.error(`Format check could not complete: ${error.message}`)
  process.exitCode = 1
}
