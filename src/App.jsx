import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import IdentityComp from './components/IdentityComp'
import TerminalComp from './components/TerminalComp'

function App() {
  return (
    <div className="app-shell">
      <div className="main-content-area">
        <div className="identity-pane border-2 border-green-400 ">
          <IdentityComp/>
        </div>
        <div className="terminal-pane">
          <TerminalComp/>
        </div>
      </div>
    </div>
  )
}

export default App
