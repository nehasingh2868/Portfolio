import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'

const services = [
  {
    title: 'Meta Ads',
    desc: 'Performance driven campaigns focused on scaling profitable D2C brands.',
    icon: '🎯'
  },
  {
    title: 'Google Ads',
    desc: 'Search, shopping and YouTube campaigns optimized for conversions.',
    icon: '🔍'
  },
  {
    title: 'Creative Strategy',
    desc: 'UGC, hooks and ad creatives designed for higher CTR and ROAS.',
    icon: '🎨'
  },
  {
    title: 'Landing Page CRO',
    desc: 'Luxury high converting pages built for scale and retention.',
    icon: '⚡'
  },
  {
    title: 'Social Media',
    desc: 'Organic growth strategies, community building, and content distribution plans.',
    icon: '📱'
  },
  {
    title: 'Automations',
    desc: 'Klaviyo retention flows, email series, and CRM automation setups.',
    icon: '⚙️'
  }
]

const stats = [
  { value: '1Cr+', label: 'Revenue Generated' },
  { value: '50Lac+', label: 'Ad Spend Managed' },
  { value: '7X+', label: 'ROAS Generated' },
  { value: '25+', label: 'Brands Scaled' }
]

const caseStudiesData = {
  clothing: [
    {
      brand: 'Bunaiwala.com',
      category: 'clothing',
      result: 'Scaled to ₹45L monthly revenue using Meta Ads and Email retention flows.',
      insights: 'Developed structured retention flows (welcome series, abandoned cart, win-back) which generated 28% of total revenue. Ran broad Meta targeting to capture massive top-of-funnel traffic.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      metrics: ['7X+ ROAS', '₹45L Revenue', '28% Email Revenue'],
      services: ['Meta Ads', 'Email Marketing', 'Funnel Optimization'],
      shopifyData: [150, 280, 400, 550, 710, 890, 1100],
      metaData: [60, 90, 130, 170, 220, 290, 360]
    },
    {
      brand: 'Kalki Vastra',
      category: 'clothing',
      result: '3.6X ROAS on Google PMax and Shopping Campaigns.',
      insights: 'Optimized the product feed titles with high-search keywords. Retargeted high-intent cart abandoners using dynamic catalog ads on Instagram and Facebook.',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop',
      metrics: ['3.6X ROAS', '₹25L Revenue', '45% Google Search CTR'],
      services: ['Google Ads', 'Meta Ads', 'Landing Page CRO'],
      shopifyData: [90, 150, 180, 260, 340, 450, 580],
      metaData: [35, 50, 65, 90, 120, 160, 210]
    },
    {
      brand: 'Indibelle.in',
      category: 'clothing',
      result: 'Lowered CPA by 38% through a systematic creative testing framework.',
      insights: 'Tested 15 new hooks weekly to beat ad fatigue. Found winning creatives and scaled them using a horizontal scaling strategy (combining multiple high-performing lookalike audiences).',
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop',
      metrics: ['3.8% Lower CPA', '4.4X ROAS', '150% Volume Boost'],
      services: ['Meta Ads', 'Creative Strategy', 'Funnel Optimization'],
      shopifyData: [70, 110, 160, 230, 320, 420, 560],
      metaData: [25, 40, 55, 80, 110, 150, 195]
    }
  ],
  jewelry: [
    {
      brand: 'Fine Silver Jewels',
      category: 'jewelry',
      result: 'Scaled conversions and revenue using WhatsApp Query Ads setup and organic reels reach.',
      insights: 'WhatsApp query ads setup boosted the funnel and conversions. Added organic reels for reach as an additional channel for growth, boosting conversions. Achieved significant AOV boost during the Birthday Sale.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      metrics: ['10+ ROAS', '100% MoM Growth', '60% CTR Growth', 'AOV Boost (Birthday Sale)'],
      services: ['Meta Ads', 'WhatsApp Marketing', 'Organic Content'],
      shopifyData: [100, 180, 290, 410, 560, 780, 1100],
      metaData: [40, 70, 110, 150, 200, 270, 360]
    }
  ]
}

function TextLoop() {
  const words = ['Performance Marketing', 'Conversion Optimization', 'Creative Strategy', 'Funnel Growth']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="relative inline-block align-bottom font-mono font-black">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="inline-block bg-black text-white px-4 py-1.5 uppercase font-bold tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function CountUp({ end, duration = 2.0, suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const endVal = parseFloat(end.toString().replace(/[^0-9.]/g, ''))
    if (isNaN(endVal)) return

    const totalTicks = 60
    const increment = endVal / totalTicks
    const stepTime = (duration * 1000) / totalTicks

    const timer = setInterval(() => {
      start += increment
      if (start >= endVal) {
        clearInterval(timer)
        setCount(endVal)
      } else {
        setCount(start)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [end, duration])

  const formattedCount = count.toFixed(end.toString().includes('.') ? 1 : 0)
  return <span>{formattedCount}{suffix}</span>
}

function ShopifyDashboardChart({ data }) {
  return (
    <div className="border border-white/5 bg-[#171a17] rounded-none p-5 shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">SHOPIFY SALES DASHBOARD</span>
          <h4 className="text-sm font-semibold text-white mt-0.5">Gross Sales (Last 30 Days)</h4>
        </div>
        <span className="text-xs text-gray-400 font-semibold bg-white/10 px-2 py-0.5 rounded font-mono">+Sales Scale</span>
      </div>
      <div className="h-[150px] relative w-full flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
          <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

          <path
            d={`M 0 100 L 0 ${100 - data[0]/10} L 50 ${100 - data[1]/10} L 100 ${100 - data[2]/10} L 150 ${100 - data[3]/10} L 200 ${100 - data[4]/10} L 250 ${100 - data[5]/10} L 300 ${100 - data[6]/10} L 300 100 Z`}
            fill="url(#shopify-gradient)"
          />
          <defs>
            <linearGradient id="shopify-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={`M 0 ${100 - data[0]/10} L 50 ${100 - data[1]/10} L 100 ${100 - data[2]/10} L 150 ${100 - data[3]/10} L 200 ${100 - data[4]/10} L 250 ${100 - data[5]/10} L 300 ${100 - data[6]/10}`}
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {data.map((val, idx) => (
            <circle
              key={idx}
              cx={idx * 50}
              cy={100 - val/10}
              r="3.5"
              fill="#171a17"
              stroke="#9ca3af"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-2 pt-2 border-t border-white/5">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  )
}

function MetaAdsDashboardChart({ data }) {
  return (
    <div className="border border-white/5 bg-[#171a17] rounded-none p-5 shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">META ADS MANAGER</span>
          <h4 className="text-sm font-semibold text-white mt-0.5">Ad Set Conversions & CPA Trends</h4>
        </div>
        <span className="text-xs text-gray-400 font-semibold bg-white/10 px-2 py-0.5 rounded font-mono">ACTIVE SCALING</span>
      </div>
      <div className="h-[150px] relative w-full flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
          <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

          {data.map((val, idx) => {
            const barHeight = val / 4.5
            const xPos = idx * 42 + 10
            return (
              <g key={idx}>
                <rect
                  x={xPos}
                  y={100 - barHeight}
                  width="18"
                  height={barHeight}
                  fill="#9ca3af"
                  fillOpacity="0.2"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  rx="0"
                />
                <circle
                  cx={xPos + 9}
                  cy={100 - barHeight}
                  r="2.5"
                  fill="#9ca3af"
                />
              </g>
            )
          })}
        </svg>
      </div>
      <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-2 pt-2 border-t border-white/5">
        <span>AdSet 1</span>
        <span>AdSet 2</span>
        <span>AdSet 3</span>
        <span>AdSet 4</span>
        <span>AdSet 5</span>
        <span>AdSet 6</span>
        <span>AdSet 7</span>
      </div>
    </div>
  )
}

export default function PortfolioWebsite() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [activeCategory, setActiveCategory] = useState('clothing')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Mouse Follow Preview Tracking
  const [hoveredProject, setHoveredProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Body Scroll Tracking for pre-intro slide up
  const { scrollY } = useScroll()
  const splashY = useTransform(scrollY, [350, 600], ["0%", "-100%"])
  const splashOpacity = useTransform(scrollY, [350, 550], [1, 0])
  const [isScrolled, setIsScrolled] = useState(false)

  // Staggered letter animations for "MY PORTFOLIO" in group of 3-3 on left/right
  const title = "MY PORTFOLIO"
  const splashChars = title.split("")
  
  // Custom transform helper mapping index to group-based animations
  const getSplashCharStyle = (index) => {
    if (index >= 0 && index <= 2) {
      const x = useTransform(scrollY, [0, 250], [0, -400])
      const opacity = useTransform(scrollY, [0, 250], [1, 0])
      return { x, opacity }
    } else if (index >= 9 && index <= 11) {
      const x = useTransform(scrollY, [0, 250], [0, 400])
      const opacity = useTransform(scrollY, [0, 250], [1, 0])
      return { x, opacity }
    } else if (index >= 3 && index <= 5) {
      const x = useTransform(scrollY, [200, 400], [0, -400])
      const opacity = useTransform(scrollY, [200, 400], [1, 0])
      return { x, opacity }
    } else {
      const x = useTransform(scrollY, [200, 400], [0, 400])
      const opacity = useTransform(scrollY, [200, 400], [1, 0])
      return { x, opacity }
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill out all fields.')
      return
    }
    setIsSubmitting(true)
    try {
      const scriptURL = ''
      const payload = new URLSearchParams()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('phone', formData.phone)
      payload.append('message', formData.message)

      if (scriptURL) {
        await fetch(scriptURL, {
          method: 'POST',
          body: payload,
          mode: 'no-cors'
        })
      } else {
        await new Promise(resolve => setTimeout(resolve, 800))
        console.log('Submitted successfully (Simulated):', formData)
      }

      // Draft/Send email with inputs to nikkxo1999@gmail.com
      const subject = encodeURIComponent(`New Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:nikkxo1999@gmail.com?subject=${subject}&body=${body}`;

      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (err) {
      console.error(err)
      alert('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)

    // Custom Follower Cursor GSAP Animation
    const cursor = document.querySelector('.custom-cursor')
    const dot = document.querySelector('.custom-cursor-dot')
    
    const onMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'power2.out' })
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'power2.out' })
    }

    const addHoverActive = () => cursor?.classList.add('custom-cursor-active')
    const removeHoverActive = () => cursor?.classList.remove('custom-cursor-active')

    window.addEventListener('mousemove', onMouseMove)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverActive)
      el.addEventListener('mouseleave', removeHoverActive)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverActive)
        el.removeEventListener('mouseleave', removeHoverActive)
      })
    }
  }, [])

  return (
    <div className="bg-[#f3f3f3] text-[#000] min-h-screen selection:bg-gray-800 selection:text-white font-sans relative overflow-x-hidden font-mono">
      
      {/* 1. Pre-intro Splash Cover */}
      <motion.div
        style={{ y: splashY, opacity: splashOpacity }}
        className={`fixed inset-0 z-[100] bg-[#f3f3f3] flex flex-col items-center justify-center ${isScrolled ? 'pointer-events-none' : 'pointer-events-auto'}`}
      >
        <div className="text-center">
          <div className="flex justify-center select-none font-mono text-4xl md:text-7xl font-black tracking-wider leading-none">
            {splashChars.map((char, i) => {
              const style = getSplashCharStyle(i)
              return (
                <motion.span
                  key={i}
                  style={{ opacity: style.opacity, x: style.x }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              )
            })}
          </div>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-2xl mt-8 text-black/40"
          >
            ↓
          </motion.div>
        </div>
      </motion.div>

      {/* Custom Follower Cursor */}
      <div className="hidden lg:block custom-cursor"></div>
      <div className="hidden lg:block custom-cursor-dot"></div>

      {/* Floating Image Follower for Case Studies */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            style={{
              position: 'fixed',
              left: mousePos.x + 25,
              top: mousePos.y + 25,
              pointerEvents: 'none',
              zIndex: 999
            }}
            className="w-[280px] h-[190px] rounded-none overflow-hidden border border-black/10 bg-[#eaeaea] shadow-2xl"
          >
            <img 
              src={hoveredProject.image} 
              alt={hoveredProject.brand} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED HEADER WITH LOGO ON LEFT AND NAVIGATION ON LEFT / HIRE ME ON RIGHT */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5">
        <div className="relative max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl py-3 px-6 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          
          {/* Left Side: Hamburger on Mobile, MY PORTFOLIO text on Desktop */}
          <div className="flex items-center">
            {/* Mobile Hamburger menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded hover:bg-gray-100 transition-colors gap-1 border-none bg-transparent cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>

            {/* Desktop MY PORTFOLIO text (no logo box) */}
            <span className="hidden md:inline text-xs font-bold uppercase tracking-wider text-black font-sans">
              MY PORTFOLIO
            </span>
          </div>

          {/* Center: Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-black/55">
            <a href="#about-section" className="hover:text-black transition-colors">About</a>
            <a href="#services-section" className="hover:text-black transition-colors">Services</a>
            <a href="#projects-section" className="hover:text-black transition-colors">Contact</a>
          </nav>

          {/* Right Side: HIRE ME Button (Always visible, triggers download) */}
          <div>
            <a
              href="/NehaSinghupdatedresume.pdf"
              download="NehaSinghupdatedresume.pdf"
              className="px-4 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans cursor-pointer bg-transparent text-center inline-block"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile dropdown menu overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[120%] left-0 right-0 bg-white border border-black/10 rounded-2xl p-6 shadow-xl flex flex-col gap-4 md:hidden z-50 text-center font-bold uppercase tracking-widest text-xs"
              >
                <a 
                  href="#about-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-black/60 hover:text-black hover:bg-gray-50 transition-colors font-sans"
                >
                  About
                </a>
                <a 
                  href="#services-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-black/60 hover:text-black hover:bg-gray-50 transition-colors font-sans"
                >
                  Services
                </a>
                <a 
                  href="#projects-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-black/60 hover:text-black hover:bg-gray-50 transition-colors font-sans"
                >
                  Contact
                </a>
                <a
                  href="/NehaSinghupdatedresume.pdf"
                  download="NehaSinghupdatedresume.pdf"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 px-5 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans text-center block"
                >
                  Download Resume
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>

      {/* SEQUENTIAL SCROLL SYSTEM - All spacing and overlays removed for natural scrolling */}
      <div className="relative pt-[70px]">

        {/* SPLASH SPACER WRAPPER: Space keeps my portfolio and neha singh section separate to appear completely */}
        <div className="relative h-[600px] z-[90] pointer-events-none"></div>

        {/* SECTION 1: Neha Singh Hero Landing section (Height increased for massive appearance) */}
        <section id="hero-section" className="relative min-h-[110vh] w-full bg-[#f3f3f3] text-black flex flex-col justify-between items-center text-center px-6 py-12 overflow-hidden border-b border-black/5">
          
          {/* Left Sub-headings */}
          <div className="absolute left-6 md:left-12 top-[16%] text-left z-20 max-w-[280px]">
            <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-black/45 mb-2 font-bold">Expertise</p>
            <div className="space-y-1 text-[11px] md:text-xs font-mono font-bold text-black uppercase tracking-wider">
              <div>Performance Marketer</div>
              <div>Data Enthusiast</div>
              <div>CRO Specialist</div>
            </div>
          </div>

          {/* Concentric solar system animated circles in the background - keep running always */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Outer Orbit */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] border border-black/10 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gray-600 rounded-full"></div>
            </div>
            {/* Middle Orbit */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[950px] md:h-[950px] border border-black/5 rounded-full animate-spin-slow-reverse">
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black/45 rounded-full border border-black/10"></div>
              <div className="absolute top-0 left-1/3 w-1.5 h-1.5 bg-gray-600/50 rounded-full"></div>
            </div>
            {/* Inner Orbit */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] md:w-[1250px] md:h-[1250px] border border-dashed border-black/5 rounded-full animate-spin-slow">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-600/70 rounded-full"></div>
            </div>
          </div>

          {/* Scrolling background Neha Singh text right-to-left - solid bold black - keep running always */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <div className="whitespace-nowrap flex text-[24vw] md:text-[28vw] font-anton uppercase tracking-wide text-black select-none animate-scroll">
              <span className="inline-block px-10">NEHA SINGH</span>
              <span className="inline-block px-10">NEHA SINGH</span>
              <span className="inline-block px-10">NEHA SINGH</span>
              <span className="inline-block px-10">NEHA SINGH</span>
            </div>
          </div>

          {/* Foreground Portrait cutout - Second Blazer Image */}
          <div className="absolute inset-x-0 bottom-0 top-12 flex justify-center items-end pointer-events-none z-10">
            <img 
              src="/female_portrait_2.png" 
              alt="Neha Singh Portrait" 
              className="h-[85%] md:h-[92%] object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.18)] mix-blend-multiply"
            />
          </div>

          {/* Bottom Right Scroll Indicator */}
          <div className="absolute right-6 md:right-12 bottom-12 text-right z-20 flex flex-col items-end gap-1.5">
            <span className="text-[10px] font-mono text-black/55 tracking-widest uppercase">Scroll down</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="text-lg font-bold"
            >
              ↓
            </motion.div>
          </div>

        </section>

        {/* SECTION 2: Numbers/Stats section */}
        <section id="stats-section" className="w-full bg-[#dedede] text-black py-20 px-6 md:px-16 border-b border-black/5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-black/50">PERFORMANCE TRACK RECORD</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mt-2 font-mono">SCALING METRICS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-black/[0.04] border border-black/10 p-8 flex flex-col justify-between text-center min-h-[180px]">
                  <h4 className="text-5xl md:text-6xl font-black tracking-tighter text-black font-mono">
                    <CountUp end={parseFloat(stat.value)} suffix={stat.value.replace(/[0-9.]/g, '')} />
                  </h4>
                  <p className="text-xs uppercase font-bold tracking-widest text-black/60 mt-4">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: About section (moved to 3rd position!) */}
        <section id="about-section" className="w-full bg-[#0b0b0b] text-white py-24 px-6 md:px-16 border-b border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative"
          >
            
            {/* Left Column: Huge About Title + diagonal arrow */}
            <div className="lg:col-span-6 space-y-4">
              <h1 className="text-[14vw] lg:text-[13vw] font-anton leading-none uppercase tracking-tighter text-white">
                /ABOUT
              </h1>
              
              <div className="pt-2">
                <span className="text-7xl md:text-[8rem] lg:text-[10rem] font-light leading-none text-white/20 select-none block transform transition-transform hover:translate-x-3 hover:-translate-y-3 duration-500">
                  ↗
                </span>
              </div>
            </div>

            {/* Right Column: Text & caps footers */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex justify-between items-center text-white/30 text-xs font-mono">
                <span>02/05</span>
              </div>

              {/* Viewport-safe font sizing with no scrolling issues */}
              <div className="text-xs sm:text-sm md:text-sm lg:text-[15px] leading-relaxed text-gray-300 font-light space-y-3 font-sans">
                <p>
                  I’m a performance marketer with 2+ years of experience helping D2C brands across fashion, premium jewelry, and travel grow through Meta Ads, Google Ads, CRO, SEO, and data driven strategies.
                </p>
                <p>
                  What I enjoy most about marketing is blending creativity with analytics. Some days I’m analyzing campaign data, customer journeys, and business performance using SQL, Excel, Google Analytics, and Microsoft Clarity. Other days I’m working on ad creatives, landing page ideas, and conversion strategies to improve user experience and drive growth.
                </p>
                <p>
                  Beyond paid marketing, I also enjoy business and data analysis, understanding customer behavior, identifying growth opportunities, and turning insights into actionable strategies.
                </p>
                <p>
                  For me, marketing is more than running ads. It’s about understanding people, solving business problems, and building systems that help brands grow sustainably.
                </p>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-[9px] tracking-widest font-mono text-white/40 uppercase">
                  CURRENTLY SCALING LEADING D2C BRANDS ACROSS THE GLOBE
                </p>
              </div>
            </div>

          </motion.div>
        </section>

        {/* SECTION 4: I Scale Brands section (now 4th!) */}
        <section id="intro-section" className="w-full bg-[#fafafa] text-black py-24 px-6 md:px-16 border-b border-black/5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-400 leading-tight uppercase font-mono">
              I scale brands via optimized <br />
              <TextLoop />
            </h2>
            
            <p className="text-base md:text-lg text-black/75 leading-relaxed font-sans max-w-2xl mx-auto">
              I help brands grow through performance marketing with a focus on profitable customer acquisition, Meta ads, and conversion driven strategy.
            </p>

            <div className="pt-8 border-t border-black/10 max-w-xs mx-auto">
              <span className="text-[10px] uppercase tracking-widest font-mono text-black/50 block mb-1">Affiliations</span>
              <p className="text-sm font-bold font-mono uppercase text-black">
                Trusted by: D2C Brands, B2B
              </p>
            </div>
          </motion.div>
        </section>

        {/* SECTION 5: Brand proofs (Case studies list) (now 5th!) */}
        <section id="projects-section" className="w-full bg-[#f3f3f3] text-black py-24 px-6 md:px-16 border-b border-black/5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono text-black/40 uppercase tracking-widest">SELECTED PROOFS</span>
              <div className="flex gap-2">
                {['clothing', 'jewelry'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                      activeCategory === cat
                        ? 'bg-black text-white border-black'
                        : 'border-black/10 hover:border-black text-black/50 hover:text-black bg-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dotted border lists */}
            <div className="divide-y divide-dashed divide-black/30 border-t border-b border-dashed border-black/30 font-mono">
              {caseStudiesData[activeCategory].map((study, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProject(study)}
                  onMouseEnter={() => setHoveredProject(study)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="py-8 flex items-center gap-6 cursor-pointer group hover:bg-gray-250 px-3 transition-colors"
                >
                  {/* Big Anton number */}
                  <div className="text-4xl md:text-6xl font-anton text-black/25 group-hover:text-black transition-colors select-none shrink-0 w-12 md:w-20">
                    0{index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] text-black/40 block mb-1 font-mono uppercase tracking-widest">BRAND</span>
                    <h3 className="text-2xl md:text-3xl font-black text-black group-hover:text-gray-700 transition-colors uppercase tracking-tight font-mono">
                      {study.brand}
                    </h3>
                    <p className="text-xs text-black/50 leading-relaxed font-light mt-1.5 font-sans normal-case">{study.result}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center">
                    <span className="text-[10px] font-bold text-black border border-black/15 bg-black/5 px-2 py-0.5 font-mono">
                      {study.metrics[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 6: Growth Services with vertical text stack on left */}
        <section id="services-section" className="w-full bg-[#121212] text-white py-24 px-6 md:px-16 border-b border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            
            {/* Left side: Growth Services, Paragraph and Ads, Strategy, Scale, Revenue bold vertical list */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">EXPERTISE</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">
                Growth Services
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
                Implementing technical setup, analytical dashboards, creative strategies, and multi-channel marketing campaigns.
              </p>

              {/* Bold list stacked one after another */}
              <div className="pt-6 space-y-3 text-3xl md:text-5xl font-black uppercase font-mono tracking-tighter text-white">
                <div className="border-b border-white/10 pb-2 hover:text-gray-400 transition-colors">STRATEGY.</div>
                <div className="border-b border-white/10 pb-2 hover:text-gray-400 transition-colors">DATA.</div>
                <div className="border-b border-white/10 pb-2 hover:text-gray-400 transition-colors">INSIGHTS.</div>
                <div className="border-b border-white/10 pb-2 hover:text-gray-400 transition-colors">RESULTS.</div>
              </div>
            </div>

            {/* Right side: Cards kept as right now */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-none border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-300 flex items-start gap-4"
                >
                  <span className="text-2xl shrink-0 mt-0.5">{service.icon}</span>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 font-mono">{service.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </section>

        {/* SECTION 7: Footer */}
        <footer id="contact" className="relative bg-[#dedede] text-black pt-20 pb-8 px-6 md:px-16 border-t border-black/10 font-mono">
          <div className="w-full max-w-7xl mx-auto space-y-16">
            
            {/* Top row: Giant Arrow + Title on Left, Send Me Message on Right */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <span className="text-7xl md:text-8xl font-black leading-none text-black select-none block transform translate-y-2">
                  ↗
                </span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-black leading-none uppercase font-mono">
                  LET’S WORK<br />TOGETHER
                </h2>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="px-6 py-3.5 rounded-lg border border-black text-black hover:bg-black hover:text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 font-mono cursor-pointer"
                >
                  Send me a message
                </button>
                <div className="flex items-center gap-3 mt-1.5">
                  <a 
                    href="mailto:nikkxo1999@gmail.com"
                    className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    title="Gmail"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/neha-singh-/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Separator line */}
            <div className="border-t border-black/15"></div>

            {/* Middle: Giant name text spanning the page width */}
            <div className="py-4 text-center overflow-hidden">
              <h1 className="text-[16vw] font-anton uppercase tracking-wide text-black leading-none select-none">
                NEHA SINGH
              </h1>
            </div>

            {/* Bottom Footer links & Copyright */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4 text-[10px] font-bold text-black/55 uppercase font-mono">
              <p>© 2026 DESIGN BY NEHA. ALL RIGHTS RESERVED.</p>
              
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="/NehaSinghupdatedresume.pdf" 
                  download="NehaSinghupdatedresume.pdf"
                  className="hover:text-black transition-colors uppercase font-mono text-[10px] font-bold"
                >
                  Hire Me
                </a>
                <a href="https://www.linkedin.com/in/neha-singh-/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
                <a href="mailto:nikkxo1999@gmail.com" className="hover:text-black transition-colors">Email</a>
              </div>
            </div>

          </div>
        </footer>

      </div>

      {/* Case Study Detail Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="max-w-4xl w-full bg-[#111311] border border-white/10 rounded-none overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl relative text-white font-sans"
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-6 right-6 w-11 h-11 rounded-none bg-white/10 hover:bg-gray-800 hover:text-white transition-all duration-300 z-10 flex items-center justify-center text-lg font-light cursor-pointer border-none outline-none"
              >
                ✕
              </button>
              <div className="relative h-[200px] md:h-[300px]">
                <img src={selectedProject.image} alt={selectedProject.brand} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111311] via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6 md:p-10">
                <div className="mb-6">
                  <p className="text-gray-400 uppercase tracking-[0.3em] text-xs font-semibold mb-2 font-mono">Case Study</p>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] mb-4 font-mono">{selectedProject.brand}</h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((srv, index) => (
                      <span key={index} className="px-3 py-1 rounded-none border border-white/10 bg-white/[0.03] text-gray-300 text-xs font-light font-mono">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SVG Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <ShopifyDashboardChart data={selectedProject.shopifyData} />
                  <MetaAdsDashboardChart data={selectedProject.metaData} />
                </div>

                {/* Strategy metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-mono">
                  {selectedProject.metrics.map((metric, index) => (
                    <div key={index} className="p-4 rounded-none border border-white/10 bg-white/[0.02] text-center shadow-inner">
                      <h3 className="text-lg font-semibold text-gray-300">{metric}</h3>
                    </div>
                  ))}
                </div>
                <h4 className="text-lg font-medium text-white mb-2 font-mono">Core Strategy & Execution</h4>
                <p className="text-gray-400 leading-7 font-light text-sm font-sans">{selectedProject.insights}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal triggered by SEND ME A MESSAGE */}
      <AnimatePresence>
        {showEmailForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="max-w-2xl w-full bg-[#111311] border border-white/10 rounded-none p-8 md:p-10 relative shadow-2xl text-white font-sans"
            >
              <button 
                onClick={() => setShowEmailForm(false)} 
                className="absolute top-6 right-6 w-11 h-11 rounded-none bg-white/10 hover:bg-gray-700 hover:text-white transition-all duration-300 flex items-center justify-center text-lg font-light cursor-pointer border-none outline-none"
              >
                ✕
              </button>
              <p className="text-gray-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4 font-mono">Contact Form</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] mb-8 font-mono">Send me a message</h2>
              
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-3xl text-gray-400 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white font-mono">Message Sent Successfully!</h3>
                  <p className="text-gray-400 text-sm max-w-sm">Thank you for getting in touch. I will get back to you shortly.</p>
                </div>
              ) : (
                <form className="space-y-4 font-sans" onSubmit={handleFormSubmit}>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Name" 
                    className="w-full p-5 rounded-none bg-white/[0.02] border border-white/10 outline-none text-white placeholder:text-gray-600 focus:border-gray-500 transition-all duration-300" 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Email" 
                    className="w-full p-5 rounded-none bg-white/[0.02] border border-white/10 outline-none text-white placeholder:text-gray-600 focus:border-gray-500 transition-all duration-300" 
                  />
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Phone Number" 
                    className="w-full p-5 rounded-none bg-white/[0.02] border border-white/10 outline-none text-white placeholder:text-gray-600 focus:border-gray-500 transition-all duration-300" 
                  />
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required
                    rows="4" 
                    placeholder="Message" 
                    className="w-full p-5 rounded-none bg-white/[0.02] border border-white/10 outline-none text-white placeholder:text-gray-600 focus:border-gray-500 transition-all duration-300"
                  ></textarea>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-none bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 cursor-pointer border-none outline-none font-mono"
                  >
                    {isSubmitting ? 'Sending...' : 'Send me a message'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
