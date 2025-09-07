import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import IdentityComp from './components/IdentityComp'
import TerminalComp from './components/TerminalComp'

function App() {
  return (
    <div className="app-shell">
      {/* <Navbar /> */}
      <div className="main-content-area">
        <div className="identity-pane">
          <IdentityComp/>
        </div>
        <div className="terminal-pane">
          <TerminalComp/>
        </div>
      </div>
      {/* Bottom Status Bar */}
      <footer className="absolute bottom-0 left-0 right-0 bg-black p-1 text-xs text-right border-t-2 border-green-400 pr-4">
        <span className="text-green-400">{new Date().toLocaleString()}</span>
      </footer>
    </div>
  )
}

export default App

