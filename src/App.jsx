import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, ShieldCheck, Zap, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENTS ---

const Navbar = () => {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: navRef.current },
        onUpdate: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(13, 13, 18, 0.6)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', border: '1px solid transparent', duration: 0.3 });
          }
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 pt-6 px-4 pointer-events-none">
      <nav ref={navRef} className="pointer-events-auto flex items-center justify-between px-8 py-3 rounded-[3rem] w-full max-w-5xl transition-colors">
        <div className="font-bold text-xl tracking-tight text-ivory">Costera<span className="text-champagne">.</span></div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#features" className="link-hover">Intelligence</a>
          <a href="#protocol" className="link-hover">Protocol</a>
          <a href="#pricing" className="link-hover">Membership</a>
        </div>
        <a href="#pricing" className="btn-magnetic bg-champagne text-obsidian px-6 py-2 rounded-full font-semibold text-sm">
          <span className="hover-bg"></span>
          <span className="btn-content">Start Optimizing</span>
        </a>
      </nav>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] flex items-end pb-24 px-8 lg:px-24">
      {/* Background with Dark Marble Image */}
      <div className="absolute inset-0 z-[-2]">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="Dark Marble Interior" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent z-[-1]"></div>
      
      <div className="max-w-4xl z-10 w-full">
        <h1 className="hero-elem text-4xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-2 text-ivory">
          Enterprise Cloud Spend meets
        </h1>
        <h1 className="hero-elem text-6xl md:text-9xl drama-text leading-none mb-8">
          Absolute Precision.
        </h1>
        <p className="hero-elem text-slate-300 text-lg md:text-xl max-w-xl mb-10">
          The future of FinOps. Automate your cloud cost intelligence and unlock unprecedented architectural savings without manual intervention.
        </p>
        <div className="hero-elem">
          <a href="#pricing" className="btn-magnetic bg-champagne text-obsidian px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2">
            <span className="hover-bg"></span>
            <span className="btn-content">Start Optimizing</span>
            <Zap className="w-5 h-5 btn-content" />
          </a>
        </div>
      </div>
    </section>
  );
};

const FeatureCard1Shuffler = () => {
  const [items, setItems] = useState(['Monthly Spend Trajectory', 'Budget Overflow Predicted', 'Cost Allocation Drift']);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        newArr.unshift(newArr.pop());
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate/30 border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[320px]">
      <div>
        <h3 className="text-2xl font-bold mb-2">Budgeting & Forecasting</h3>
        <p className="text-slate-400 text-sm">Predictive deep-dives into your infrastructure spend.</p>
      </div>
      <div className="relative h-[120px] w-full">
        {items.map((item, i) => (
          <div key={item} 
               className="absolute w-full bg-obsidian border border-white/10 rounded-xl p-4 transition-all duration-700 flex items-center justify-between"
               style={{
                 top: `${i * 20}px`,
                 transform: `scale(${1 - i * 0.05})`,
                 opacity: 1 - i * 0.3,
                 zIndex: 10 - i
               }}>
            <span className="font-mono text-xs">{item}</span>
            <Activity className="w-4 h-4 text-champagne" />
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureCard2Typewriter = () => {
  const [text, setText] = useState('');
  const fullText = "> anomaly_detected: ec2_spend_spike\n> analyzing_root_cause...\n> isolated: deployment_v4\n> applying_financial_mitigation...";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) index = 0;
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate/30 border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between h-[320px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Spend Anomaly Detection</h3>
          <p className="text-slate-400 text-sm">Telemetry typewriting anomalies before they impact your budget.</p>
        </div>
        <div className="flex items-center gap-2 bg-obsidian px-3 py-1 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-[10px] font-mono tracking-wider">LIVE FEED</span>
        </div>
      </div>
      <div className="bg-obsidian rounded-xl p-4 flex-grow font-mono text-xs text-green-400 border border-white/5 whitespace-pre-wrap">
        {text}<span className="inline-block w-2 h-3 bg-champagne animate-pulse ml-1"></span>
      </div>
    </div>
  );
};

const FeatureCard3Scheduler = () => {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      // Reset
      tl.set('.cursor', { x: 200, y: 150, opacity: 0 });
      tl.set('.day-cell', { backgroundColor: 'transparent' });
      
      // Animate
      tl.to('.cursor', { opacity: 1, duration: 0.3 })
        .to('.cursor', { x: 50, y: 50, duration: 1, ease: 'power2.inOut' })
        .to('.cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // Click
        .to('.day-cell-target', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.2 }, "-=0.1")
        .to('.cursor', { x: 150, y: 90, duration: 0.8, ease: 'power2.inOut', delay: 0.2 })
        .to('.cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // Click save
        .to('.btn-save', { backgroundColor: '#C9A84C', duration: 0.2, yoyo: true, repeat: 1 }, "-=0.1")
        .to('.cursor', { opacity: 0, duration: 0.3, delay: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-slate/30 border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between h-[320px] relative overflow-hidden">
      <div>
        <h3 className="text-2xl font-bold mb-2">Automated Remediation</h3>
        <p className="text-slate-400 text-sm">Protocol scheduling for zero-touch financial optimization.</p>
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        <div className="flex justify-between border-b border-white/10 pb-2">
          {['S','M','T','W','T','F','S'].map((day, i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono border border-white/5 day-cell ${i === 3 ? 'day-cell-target' : ''}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="self-end mt-2 px-4 py-1 rounded border border-white/20 text-xs font-mono btn-save">APPLY POLICY</div>
        
        {/* Animated Cursor */}
        <div className="cursor absolute w-6 h-6 text-white z-10 filter drop-shadow-lg" style={{ pointerEvents: 'none' }}>
          <MousePointer2 className="w-full h-full fill-white" />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-32 px-8 lg:px-24 bg-obsidian">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature-card"><FeatureCard1Shuffler /></div>
        <div className="feature-card"><FeatureCard2Typewriter /></div>
        <div className="feature-card"><FeatureCard3Scheduler /></div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const ref = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-40 px-8 lg:px-24 relative overflow-hidden bg-obsidian">
      {/* Organic texture parallax background */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover" />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="phil-line text-slate-400 text-xl md:text-3xl font-medium mb-12">
          Costera helps companies eliminate waste, optimize cloud spend, and turn infrastructure into a <span className="text-ivory">financial advantage.</span>
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mt-16 border-t border-white/10 pt-16">
          <div>
            <h4 className="phil-line font-mono text-sm tracking-widest text-champagne mb-4">OUR MISSION</h4>
            <p className="phil-line text-2xl md:text-4xl font-bold leading-tight">
              To eliminate inefficient cloud spending and enforce <span className="drama-text">financial discipline</span> across modern tech stacks.
            </p>
          </div>
          <div>
            <h4 className="phil-line font-mono text-sm tracking-widest text-champagne mb-4">OUR VISION</h4>
            <p className="phil-line text-2xl md:text-4xl font-bold leading-tight">
              A world where every cloud dollar is <span className="drama-text">accountable, optimized, and justified.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProtocolCard = ({ index, title, desc, renderCanvas }) => {
  return (
    <div className="protocol-card h-screen w-full flex items-center justify-center sticky top-0 bg-obsidian">
      <div className="max-w-4xl w-full px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 w-full aspect-square bg-slate/20 rounded-[3rem] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl shadow-champagne/5">
          {renderCanvas()}
        </div>
        <div className="flex-1">
          <div className="font-mono text-champagne mb-4 tracking-widest text-sm">0{index} / PROTOCOL</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-slate-400 text-lg leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Don't animate the last card out
        
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            pinSpacing: false
          },
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          ease: 'none'
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative bg-obsidian">
      <ProtocolCard 
        index={1} 
        title="Ingest & Map" 
        desc="We map your entire AWS, GCP, and Azure footprint in seconds, establishing a high-fidelity graph of your infrastructure costs."
        renderCanvas={() => (
          <div className="w-48 h-48 border border-white/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
            <div className="w-32 h-32 border border-champagne/40 rounded-full border-dashed animate-[spin_8s_linear_infinite_reverse]"></div>
          </div>
        )}
      />
      <ProtocolCard 
        index={2} 
        title="Algorithmic Audit" 
        desc="Our proprietary models scan millions of billing rows to identify waste, unattached volumes, and sub-optimal instance sizing."
        renderCanvas={() => (
          <div className="w-full h-full relative p-8 flex flex-col justify-between">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-2 w-full bg-white/5 rounded overflow-hidden">
                <div className="h-full bg-champagne w-1/4 animate-[slide_2s_ease-in-out_infinite_alternate]" style={{animationDelay: `${i*0.2}s`}}></div>
              </div>
            ))}
          </div>
        )}
      />
      <ProtocolCard 
        index={3} 
        title="Autonomous Apply" 
        desc="Approve once. Costera safely executes state changes, right-sizing infrastructure without downtime."
        renderCanvas={() => (
          <svg className="w-full h-full stroke-champagne" viewBox="0 0 200 200" fill="none" strokeWidth="2">
            <path d="M20 100 L60 100 L80 40 L120 160 L140 100 L180 100" strokeDasharray="400" strokeDashoffset="400" className="animate-[dash_3s_linear_infinite]" />
          </svg>
        )}
      />
      <style>{`
        @keyframes slide { from { transform: translateX(0); } to { transform: translateX(300%); } }
        @keyframes dash { to { stroke-dashoffset: 0; } }
      `}</style>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-8 lg:px-24 bg-obsidian">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Membership</h2>
        <p className="text-slate-400 text-lg">Trusted by scale-ups to manage millions in cloud spend.</p>
      </div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="bg-slate/20 border border-white/5 rounded-[2rem] p-8">
          <h3 className="font-mono text-sm text-slate-400 mb-4 tracking-widest">GROWTH</h3>
          <div className="text-4xl font-bold mb-8">$499<span className="text-lg text-slate-500 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex gap-2"><ShieldCheck className="text-champagne w-5 h-5"/> Daily Cost Sync</li>
            <li className="flex gap-2"><ShieldCheck className="text-champagne w-5 h-5"/> Basic Anomaly Alerts</li>
          </ul>
          <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">Select</button>
        </div>
        
        <div className="bg-champagne/10 border border-champagne/30 rounded-[2rem] p-10 transform scale-105 shadow-2xl shadow-champagne/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-champagne text-obsidian text-[10px] font-bold px-4 py-1 rounded-b-lg tracking-widest">RECOMMENDED</div>
          <h3 className="font-mono text-sm text-champagne mb-4 tracking-widest mt-2">SCALE</h3>
          <div className="text-5xl font-bold mb-8">$999<span className="text-lg text-slate-400 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex gap-2"><ShieldCheck className="text-champagne w-5 h-5"/> Real-time Telemetry</li>
            <li className="flex gap-2"><ShieldCheck className="text-champagne w-5 h-5"/> Auto-remediation</li>
            <li className="flex gap-2"><ShieldCheck className="text-champagne w-5 h-5"/> Custom Policies</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-champagne text-obsidian font-bold hover:bg-champagne/90 transition-colors">Select</button>
        </div>

        <div className="bg-slate/20 border border-white/5 rounded-[2rem] p-8">
          <h3 className="font-mono text-sm text-slate-400 mb-4 tracking-widest">ENTERPRISE</h3>
          <div className="text-4xl font-bold mb-8">Custom</div>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex gap-2"><ShieldCheck className="text-champagne w-5 h-5"/> Dedicated Node</li>
            <li className="flex gap-2"><ShieldCheck className="text-champagne w-5 h-5"/> 24/7 Concierge SLA</li>
          </ul>
          <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">Contact Sales</button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 px-8 lg:px-24 rounded-t-[4rem] border-t border-white/5 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-16 mb-8 gap-12">
        <div>
          <div className="font-bold text-3xl tracking-tight text-ivory mb-4">Costera<span className="text-champagne">.</span></div>
          <p className="text-slate-500 max-w-xs">The architectural supremacy layer for cloud financial management.</p>
        </div>
        <div className="grid grid-cols-2 gap-16">
          <div>
            <h4 className="font-mono text-xs tracking-widest text-slate-400 mb-6">PLATFORM</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#" className="hover:text-champagne transition-colors">Intelligence</a></li>
              <li><a href="#" className="hover:text-champagne transition-colors">Protocol</a></li>
              <li><a href="#" className="hover:text-champagne transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs tracking-widest text-slate-400 mb-6">COMPANY</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#" className="hover:text-champagne transition-colors">About</a></li>
              <li><a href="#" className="hover:text-champagne transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-champagne transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-mono">
        <div>&copy; 2026 Costera Inc. All rights reserved.</div>
        <div className="flex items-center gap-3 mt-4 md:mt-0 bg-slate/10 px-4 py-2 rounded-full border border-white/5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          SYSTEM OPERATIONAL
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <>
      <svg className="noise-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      
      <main className="bg-obsidian text-ivory min-h-screen font-sans">
        <Navbar />
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}

export default App;
