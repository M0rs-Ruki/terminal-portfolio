import React, { useState } from "react";

// --- Enhanced SVG Icons with hover effects ---
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-green-400 group-hover:scale-110">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-green-400 group-hover:scale-110">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-red-400 group-hover:scale-110">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:scale-110">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-pink-400 group-hover:scale-110">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-blue-500 group-hover:scale-110">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-purple-400 group-hover:scale-110">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LeetcodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-yellow-400 group-hover:scale-110">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" x2="20" y1="19" y2="19"></line>
  </svg>
);

// Enhanced Contact component with glassmorphism and interactive effects
const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('anuppradhan929@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      // Fallback to mailto if clipboard API fails
      window.location.href = 'mailto:anuppradhan929@gmail.com';
    }
  };

  return (
    <div className="text-white max-w-5xl mx-auto p-6 relative">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-cyan-500/10 rounded-3xl blur-xl"></div>
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-cyan-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Header with terminal styling */}
        <div className="flex items-center mb-8">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-mono text-green-400 font-bold tracking-wider">
            <span className="text-gray-500">$</span> contact --connect
          </h2>
        </div>

        {/* Terminal cursor animation */}
        <div className="mb-6">
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            <span className="text-green-400">&gt;</span> Establishing secure connection...
            <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
          </p>
          <p className="text-gray-400 font-mono text-sm mt-2">
            Ready to collaborate on innovative projects and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Direct Contact Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <h3 className="text-xl font-mono text-green-400 font-semibold">// Direct.Contact</h3>
            </div>
            
            {/* Email with copy functionality */}
            <div 
              onClick={handleEmailClick}
              className="group relative p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg hover:shadow-green-400/20"
            >
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-lg mr-4 group-hover:from-green-400/30 group-hover:to-cyan-400/30 transition-all duration-300">
                  <MailIcon />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-mono">EMAIL</p>
                  <p className="text-white font-mono group-hover:text-green-400 transition-colors duration-300">
                    anuppradhan929@gmail.com
                  </p>
                  {copiedEmail && (
                    <p className="text-green-400 text-xs font-mono animate-fade-in">
                      ✓ Copied to clipboard
                    </p>
                  )}
                </div>
                <div className="text-gray-500 group-hover:text-green-400 transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="group relative p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg mr-4 group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-300">
                  <LocationIcon />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-mono">LOCATION</p>
                  <p className="text-white font-mono group-hover:text-blue-400 transition-colors duration-300">
                    Bhubaneswar, Odisha, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <h3 className="text-xl font-mono text-green-400 font-semibold">// Social.Links</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: YoutubeIcon, name: "YouTube", href: "https://www.youtube.com/@morscode7", color: "red" },
                { icon: TwitterIcon, name: "Twitter / X", href: "https://x.com/AnupPradhan0", color: "blue" },
                { icon: InstagramIcon, name: "Instagram", href: "https://www.instagram.com/mors_code__", color: "pink" },
                { icon: LinkedinIcon, name: "LinkedIn", href: "https://www.linkedin.com/in/anup-pradhan77", color: "blue" },
                { icon: GithubIcon, name: "GitHub", href: "https://github.com/M0rs-Ruki", color: "purple" },
                { icon: LeetcodeIcon, name: "LeetCode", href: "https://leetcode.com/u/Anuppradhan/", color: "yellow" }
              ].map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.05] hover:shadow-lg hover:shadow-green-400/10"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-gradient-to-br from-${social.color}-400/20 to-${social.color}-600/20 rounded-lg group-hover:from-${social.color}-400/30 group-hover:to-${social.color}-600/30 transition-all duration-300`}>
                      <social.icon />
                    </div>
                    <span className="font-mono text-sm group-hover:text-green-400 transition-colors duration-300">
                      {social.name}
                    </span>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal status bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-sm font-mono">
            <div className="flex items-center space-x-4">
              <span className="text-green-400">✓ Connection established</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">Response time: &lt;100ms</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
