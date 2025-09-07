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

const Help = () => (
  <div className="help-command">
    <p>Available commands:</p>
    <ul>
      <li><span>welcome</span> - Display the welcome message.</li>
      <li><span>about</span> - Learn more about me.</li>
      <li><span>projects</span> - View my recent projects.</li>
      <li><span>skills</span> - See my technical skills.</li>
      <li><span>contact</span> - Get my contact information.</li>
      <li><span>clear</span> - Clear the terminal screen.</li>
    </ul>
  </div>
);

// The main Terminal Component
export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const user = "gatere";
  const host = "portfolio";

  const processCommand = (command) => {
    const newHistory = [...history, { type: 'prompt', command }];

    switch (command.toLowerCase().trim()) {
      case 'help':
        newHistory.push({ type: 'output', content: <Help /> });
        break;
      case 'welcome':
        newHistory.push({ type: 'output', content: (
            <>
              <OutputLine>Hi, I'm Anup Pradhan (Mors), a Full-Stack Developer.</OutputLine>
              <OutputLine>Welcome to my interactive portfolio terminal!</OutputLine>
              <OutputLine>Type 'help' to see available commands.</OutputLine>
            </>
        )});
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
    processCommand('welcome');
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
          {['welcome', 'help', 'about', 'projects', 'skills', 'contact', 'clear'].map(cmd => (
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

