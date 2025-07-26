import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'
import './Terminal.css'

const Terminal = () => {
  const terminalRef = useRef(null)
  const xtermRef = useRef(null)
  const fitAddonRef = useRef(null)
  const [currentPath, setCurrentPath] = useState('/home/rndastech')
  const currentPathRef = useRef(currentPath)
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Simulated file system
  const fileSystem = {
    '/': {
      'home': {
        'rndastech': {
          'Documents': {
            'hints': {
              'egg1': {
                'hint.txt': 'file'
              },
              'egg2': {
                'hint.json': 'file'
              },
              'egg3': {
                'hint.csv': 'file'
              }
            }
          },
          'Apps':{
            'About Me': 'file',
            'Contact': 'file',
            'Projects': 'file',
            'Resume': 'file',
            'Skills': 'file',
            'Terminal': 'file'
          }
        }
      },
      'usr': {
        'bin': {
          'ls': 'file',
          'cat': 'file',
          'cd': 'file'
        }
      },
      'etc': {
        'passwd': 'file',
        'hosts': 'file'
      }
    }
  }

  // Sync ref to latest path state
  useEffect(() => {
    currentPathRef.current = currentPath
  }, [currentPath])

  // Helper functions
  const getPrompt = () => {
    const user = 'rndastech'
    const hostname = 'portfolio'
    const path = currentPathRef.current
    
    return `\x1b[32m${user}@${hostname}\x1b[0m:\x1b[34m${path}\x1b[0m$ `
  }

  const parsePath = (path) => {
    if (path.startsWith('/')) return path
    
    // Convert current path to absolute format for processing
    let currentAbsolutePath = currentPathRef.current
    
    // Handle special cases
    if (path === '.') return currentAbsolutePath
    if (path === '..') {
      const parts = currentAbsolutePath.split('/').filter(p => p)
      if (parts.length <= 1) return '/'
      return '/' + parts.slice(0, -1).join('/')
    }
    
    // Properly join paths without double slashes
    const cleanCurrentPath = currentAbsolutePath.endsWith('/') ? currentAbsolutePath.slice(0, -1) : currentAbsolutePath
    return cleanCurrentPath + '/' + path
  }

  const getDirectoryContents = (path) => {
    const parts = path.split('/').filter(p => p)
    let current = fileSystem['/']
    
    for (const part of parts) {
      if (current[part]) {
        current = current[part]
      } else {
        return null
      }
    }
    
    return current
  }

  const executeCommand = (cmd) => {
    const parts = cmd.trim().split(' ')
    const command = parts[0]
    const args = parts.slice(1)

    switch (command) {
      case 'ls': {
        const lsPath = args[0] ? parsePath(args[0]) : parsePath(currentPathRef.current)
        const contents = getDirectoryContents(lsPath)
        if (contents === null) {
          return `ls: cannot access '${args[0] || currentPathRef.current}': No such file or directory`
        }
        const items = Object.keys(contents).map(name => {
          const isDir = typeof contents[name] === 'object'
          return isDir ? `\x1b[34m${name}\x1b[0m` : name
        })
        return items.join('  ')
      }

      case 'cd': {
        if (!args[0]) {
          setCurrentPath('/home/rndastech')
          return ''
        }
        const newPath = parsePath(args[0])
        const dir = getDirectoryContents(newPath)
        if (dir === null || typeof dir !== 'object') {
          return `cd: ${args[0]}: No such file or directory`
        }
        
        setCurrentPath(newPath)
        return ''
      }

      case 'pwd': {
        return currentPathRef.current
      }

      case 'whoami':
        return 'rndastech'

      case 'date':
        return new Date().toString()

      case 'cat': {
        if (!args[0]) {
          return 'cat: missing file operand'
        }
        const catPath = parsePath(args[0])
        const file = getDirectoryContents(catPath)
        if (file === null) {
          return `cat: ${args[0]}: No such file or directory`
        }
        if (typeof file === 'object') {
          return `cat: ${args[0]}: Is a directory`
        }
          return `Access Denied`
      }

      case 'clear':
        xtermRef.current?.clear()
        return null

      case 'help': {
        const helpLines = [
          'Publicly available commands:',
          '  ls [path]               - List directory contents',
          '  cd [path]               - Change directory',
          '  pwd                     - Print working directory',
          '  cat [file]              - Display file contents',
          '  whoami                  - Display current user',
          '  date                    - Display current date',
          '  clear                   - Clear terminal',
          '  help                    - Show this help message',
          '  echo [text]             - Display text',
          '  uname                   - System information'
        ]
        return helpLines.join('\n')
      }

      case 'echo': {
        const easterEggTrigger = import.meta.env.VITE_EASTER_EGG_TRIGGER
        const fullArgs = args.join(' ')
        if (fullArgs === easterEggTrigger) {
          const egg1 = import.meta.env.VITE_EGG1
          return `Congratulations! First Easter Egg Unlocked. Bonus: ${egg1}`
        } else {
          return fullArgs
        }
      }

      case 'uname':
        return 'Ritesh Portfolio OS 1.0.0'

      case '':
        return null

      default:
        const errorcode = import.meta.env.VITE_ERROR_CODE
        return `${command}: command not found. Error code: ${errorcode}`
    }
  }

  useEffect(() => {
    if (!terminalRef.current) return

    // Create terminal instance
    const terminal = new XTerm({
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
        cursor: '#ffffff',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#ffffff'
      },
      fontFamily: '"Cascadia Code", "Fira Code", "SF Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace',
      fontSize: 14,
      fontWeight: 'normal',
      fontWeightBold: 'bold',
      lineHeight: 1.0,
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      tabStopWidth: 4,
      cols: 80,
      rows: 24,
      convertEol: false,
      allowTransparency: false
    })

    // Add addons
    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()
    
    terminal.loadAddon(fitAddon)
    terminal.loadAddon(webLinksAddon)
    
    // Open terminal
    terminal.open(terminalRef.current)
    
    // Fit after a short delay to ensure container is ready
    setTimeout(() => {
      fitAddon.fit()
    }, 50)

    // Store references
    xtermRef.current = terminal
    fitAddonRef.current = fitAddon

    // Welcome message
    terminal.writeln('\x1b[33m╭─────────────────────────────────────────╮')
    terminal.writeln('│     Welcome to Portfolio Terminal       │')
    terminal.writeln('│        Type "help" for commands         │')
    terminal.writeln('│ Try to find all 3 hidden "easter eggs"  │')
    terminal.writeln('╰─────────────────────────────────────────╯\x1b[0m')
    terminal.writeln('')
    terminal.write(getPrompt())

    let currentLine = ''

    // Handle input
    terminal.onData((data) => {
      const code = data.charCodeAt(0)

      if (code === 13) { // Enter
        terminal.writeln('')
        
        if (currentLine.trim()) {
          const newHistory = [...commandHistory, currentLine]
          setCommandHistory(newHistory)
          const output = executeCommand(currentLine)
          if (output !== null && output !== '') {
            // Split output into lines and write each line separately
            const lines = output.split('\n')
            lines.forEach(line => {
              terminal.writeln(line)
            })
          }
        }
        
        currentLine = ''
        setHistoryIndex(-1)
        // Use a timeout to ensure state updates are processed
        setTimeout(() => {
          terminal.write(getPrompt())
        }, 10)
      } else if (code === 127) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1)
          terminal.write('\b \b')
        }
      } else if (code === 27) { // Escape sequences (arrow keys)
        // Handle arrow keys for command history
        return
      } else if (code >= 32) { // Printable characters
        currentLine += data
        terminal.write(data)
      }
    })

    // Handle key events for arrow keys
    terminal.onKey(({ domEvent }) => {
      if (domEvent.key === 'ArrowUp') {
        domEvent.preventDefault()
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
          setHistoryIndex(newIndex)
          
          // Clear current line
          const promptLength = getPrompt().replace(/\x1b\[[0-9;]*m/g, '').length
          terminal.write('\r' + ' '.repeat(promptLength + currentLine.length))
          terminal.write('\r' + getPrompt())
          
          // Write historical command
          currentLine = commandHistory[newIndex]
          terminal.write(currentLine)
        }
      } else if (domEvent.key === 'ArrowDown') {
        domEvent.preventDefault()
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1)
            currentLine = ''
          } else {
            setHistoryIndex(newIndex)
            currentLine = commandHistory[newIndex]
          }
          
          // Clear current line
          const promptLength = getPrompt().replace(/\x1b\[[0-9;]*m/g, '').length
          terminal.write('\r' + ' '.repeat(promptLength + currentLine.length))
          terminal.write('\r' + getPrompt())
          terminal.write(currentLine)
        }
      }
    })

    // Handle resize
    const handleResize = () => {
      fitAddon.fit()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      terminal.dispose()
    }
  }, [])

  useEffect(() => {
    // Fit terminal when component mounts or updates
    if (fitAddonRef.current && xtermRef.current) {
      setTimeout(() => {
        fitAddonRef.current.fit()
      }, 100)
    }
  })

  return (
    <div className="terminal-container">
      <div 
        ref={terminalRef} 
        className="terminal-content"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default Terminal
