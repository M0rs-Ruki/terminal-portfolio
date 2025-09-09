import React, { useState, useEffect, useRef } from 'react';
import "/public/css/TerminalComp.css"; // Importing the new CSS file

import About from "./TerminalComp/About"
import Projects from "./TerminalComp/Projects"
import Skills from "./TerminalComp/Skills"
import Contact from "./TerminalComp/Contact"

// --- Helper Components ---

const Prompt = ({ user, host }) => (
  <span>
    <span className="prompt-user">{user}@{host}</span>
    <span className="prompt-separator">:</span>
    <span className="prompt-directory">~</span>
    <span className="prompt-symbol">$ </span>
  </span>
)

const OutputLine = ({ children }) => (
  <div className="output-line">{children}</div>
);

// Animated Help Component
const Help = () => {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const helpItems = [
    { type: 'title', text: 'Available commands:' },
    { type: 'command', command: 'welcome', description: 'Display the welcome message.' },
    { type: 'command', command: 'about', description: 'Learn more about me.' },
    { type: 'command', command: 'projects', description: 'View my recent projects.' },
    { type: 'command', command: 'skills', description: 'See my technical skills.' },
    { type: 'command', command: 'contact', description: 'Get my contact information.' },
    { type: 'command', command: 'clear', description: 'Clear the terminal screen.' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < helpItems.length) {
        setDisplayedItems(prev => [...prev, helpItems[currentStep]]);
        setCurrentStep(currentStep + 1);
      }
    }, 200); // Adjust speed here

    return () => clearTimeout(timer);
  }, [currentStep, helpItems.length]);

  return (
    <div className="help-command">
      {displayedItems.map((item, index) => {
        if (item.type === 'title') {
          return <p key={index}>{item.text}</p>;
        } else {
          return (
            <ul key={index}>
              <li>
                <span>{item.command}</span> - {item.description}
              </li>
            </ul>
          );
        }
      })}
      {currentStep < helpItems.length && (
        <span className="cursor">|</span>
      )}
    </div>
  );
};

// Animated Welcome Component
const Welcome = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  const welcomeLines = [
    "Hi, I'm Anup Pradhan (Mors), a Full-Stack Developer.",
    "Welcome to my interactive portfolio terminal!",
    "Type 'help' to see available commands."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < welcomeLines.length) {
        setDisplayedLines(prev => [...prev, welcomeLines[currentLine]]);
        setCurrentLine(currentLine + 1);
      }
    }, 400); // Adjust speed here

    return () => clearTimeout(timer);
  }, [currentLine, welcomeLines.length]);

  return (
    <>
      {displayedLines.map((line, index) => (
        <OutputLine key={index}>{line}</OutputLine>
      ))}
      {currentLine < welcomeLines.length && (
        <span className="cursor">|</span>
      )}
    </>
  );
};

// Character-by-character typing component (alternative approach)
const TypingText = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && <span className="cursor">|</span>}
    </span>
  );
};

// The main Terminal Component
export default function Terminal({ onFirstCommand }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isFirstUserCommand, setIsFirstUserCommand] = useState(true);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const user = "gatere";
  const host = "portfolio";

  const processCommand = (command, isAutomatic = false) => {
    const newHistory = [...history, { type: 'prompt', command }];

    // Call onFirstCommand if this is the first user command (not the automatic welcome)
    if (isFirstUserCommand && !isAutomatic && onFirstCommand) {
      onFirstCommand();
      setIsFirstUserCommand(false);
    }

    switch (command.toLowerCase().trim()) {
      case 'help':
        newHistory.push({ type: 'output', content: <Help key={Date.now()} /> });
        break;
      case 'welcome':
        newHistory.push({ type: 'output', content: <Welcome key={Date.now()} /> });
        break;
      case 'about':
        newHistory.push({ type: 'output', content: <About /> });
        break;
      case 'projects':
        newHistory.push({ type: 'output', content: <Projects /> });
        break;
      case 'skills':
        newHistory.push({ type: 'output', content: <Skills /> });
        break;
      case 'contact':
        newHistory.push({ type: 'output', content: <Contact /> });
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'refresh':
        window.location.reload();
        return;
      default:
        newHistory.push({ type: 'output', content: `Command not found: ${command}. Type 'help' for a list of commands.` });
        break;
    }
    setHistory(newHistory);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };

  const handleNavClick = (command) => {
    processCommand(command);
  }

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    // Don't count the automatic welcome as first user command
    processCommand('welcome', true);
  }, []);

  return (
    <div className="terminal-container" onClick={focusInput}>
      <header className="terminal-header">
        <div className="window-dots">
          <div className="dot dot-red"></div>
          <div className="dot dot-yellow"></div>
          <div className="dot dot-green"></div>
        </div>
        <nav className="terminal-nav">
          {['welcome', 'help', 'about', 'projects', 'skills', 'contact', 'clear', " refresh"].map(cmd => (
            <button key={cmd} onClick={() => handleNavClick(cmd)} className="nav-button">
              {cmd}
            </button>
          ))}
        </nav>
      </header>

      <main ref={terminalRef} className="terminal-body">
        {history.map((line, index) => (
          <div key={index} className="history-line">
            {line.type === 'prompt' ? (
              <div>
                <Prompt user={user} host={host} />
                <span className="command-text">{line.command}</span>
              </div>
            ) : (
              line.content
            )}
          </div>
        ))}

        <form onSubmit={handleFormSubmit} className="input-form">
          <Prompt user={user} host={host} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            autoFocus
          />
        </form>
      </main>
    </div>
  );
}
