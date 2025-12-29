import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="antialiased selection:bg-emerald-500 selection:text-white min-h-screen bg-zinc-950 text-white">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-zinc-800/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">E</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">EchoRem</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Problem Sets</a>
            <a href="#" className="hover:text-white transition-colors">Methodology</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2 rounded-md transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] font-semibold">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="order-1 lg:order-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Coming Soon: AI System Design Tutor
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                Stop forgetting the 
                <span className="text-white block mt-2" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>code you write.</span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                EchoRem utilizes <strong className="text-zinc-200">spaced repetition</strong> algorithms to ensure you never blank on a LeetCode pattern again. Save problems, track progress, and master your interview prep.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="h-12 px-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                      Start Practicing Free
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <button className="h-12 px-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    Go to Dashboard
                  </button>
                </SignedIn>
                <button className="h-12 px-8 rounded-lg border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 text-white font-medium transition-all flex items-center gap-2 group">
                  View Demo
                  <svg className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Dashboard Preview */}
            <div className="order-2 lg:order-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-zinc-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-xl border border-white/10 bg-zinc-900/90 shadow-2xl overflow-hidden flex flex-col">
                <div className="h-10 border-b border-white/5 bg-zinc-900 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  <div className="ml-4 text-xs text-zinc-500 font-mono">dashboard.echorem.app</div>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-lg md:text-xl font-semibold">Today&apos;s Review</h3>
                      <span className="text-xs text-emerald-400 font-mono">3 DUE NOW</span>
                    </div>
                    <div className="h-14 w-full bg-zinc-800/50 rounded border border-white/5 flex items-center px-4 justify-between">
                      <span className="text-sm text-zinc-300">LRU Cache</span>
                      <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400">Hard</span>
                    </div>
                    <div className="h-14 w-full bg-zinc-800/50 rounded border border-white/5 flex items-center px-4 justify-between">
                      <span className="text-sm text-zinc-300">Binary Tree Level Order</span>
                      <span className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-400">Med</span>
                    </div>
                    <div className="h-24 w-full bg-zinc-800/30 rounded border border-white/5 border-dashed flex flex-col items-center justify-center text-zinc-600 gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                      <span className="text-xs">Add new problem</span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Retention Score</h4>
                    <div className="text-3xl font-mono text-white mb-3">92%</div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-emerald-500 w-[92%]"></div>
                    </div>
                    <div className="p-3 rounded bg-emerald-900/20 border border-emerald-500/20">
                      <p className="text-xs text-emerald-200">
                        <strong>AI Tip:</strong> You struggle with Dynamic Programming. We&apos;ve adjusted your queue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Engineered for Retention</h2>
          <p className="text-zinc-400 mt-2">The scientific way to crack the coding interview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/8 p-8 rounded-2xl flex flex-col justify-between hover:border-emerald-500/30 transition-colors group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Spaced Repetition</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Based on the Ebbinghaus forgetting curve. We schedule reviews at optimal intervals so you retain patterns, not just memorize code.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/8 p-8 rounded-2xl flex flex-col justify-between hover:border-emerald-500/30 transition-colors group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Problem Dashboard</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A centralized hub for your LeetCode journey. Tag problems, track difficulty, and visualize your consistency over time.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-emerald-500/20 p-8 rounded-2xl md:col-span-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-900/10 z-0"></div>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                AI Architect <span className="text-xs bg-emerald-500 text-black px-2 py-0.5 rounded font-bold ml-2">DEV</span>
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                The future of System Design prep. Interactive, AI-driven mock interviews that grade your scalability, trade-offs, and database choices in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 mt-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-5 h-5 bg-emerald-900 rounded-sm flex items-center justify-center">
              <span className="text-emerald-500 font-bold text-[10px]">E</span>
            </div>
            <span className="text-zinc-500 text-sm">© 2024 EchoRem</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}