import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { gsap } from 'gsap'

const services = [
  {
    title: 'Meta Ads',
    desc: 'Performance driven campaigns focused on scaling profitable revenue.',
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
    title: 'Email Marketing',
    desc: 'Retention systems and automated flows for repeat purchases.',
    icon: '✉️'
  },
  {
    title: 'Funnel Optimization',
    desc: 'Complete customer journey optimization from click to purchase.',
    icon: '🔄'
  }
]

const stats = [
  {
    value: 25,
    suffix: 'Cr+',
    label: 'Revenue Generated'
  },
  {
    value: 10,
    suffix: 'Cr+',
    label: 'Ad Spend Managed'
  },
  {
    value: 4.8,
    suffix: 'X',
    label: 'Average ROAS'
  },
  {
    value: 80,
    suffix: '+',
    label: 'Brands Scaled'
  }
]

const caseStudiesData = {
  jewelry: [
    {
      brand: 'Aura Jewels',
      category: 'jewelry',
      result: 'Scaled monthly revenue from ₹5L to ₹32L with a 4.2X ROAS.',
      insights: 'Leveraged high-visual UGC creatives showing jewelry shine under natural light. Built dedicated high-speed landing pages to highlight product premium quality, increasing average order value (AOV) by 32%.',
      image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop',
      metrics: ['4.2X ROAS', '₹32L Revenue', '+32% AOV Growth'],
      services: ['Meta Ads', 'Landing Page CRO', 'Creative Strategy'],
      shopifyData: [120, 240, 310, 480, 520, 780, 960],
      metaData: [45, 60, 92, 120, 180, 240, 310]
    },
    {
      brand: 'Vedic Gold',
      category: 'jewelry',
      result: 'Reduced acquisition cost (CPA) by 46% while scaling sales volume.',
      insights: 'Implemented custom funnel targeting collectors of traditional designs. Restructured the meta account using Advantage+ campaigns paired with high-intent catalog sales.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      metrics: ['46% Lower CPA', '3.9X ROAS', '2.8X Purchase Rate'],
      services: ['Meta Ads', 'Google Ads', 'Funnel Optimization'],
      shopifyData: [80, 140, 200, 220, 290, 410, 550],
      metaData: [30, 45, 55, 80, 110, 130, 190]
    },
    {
      brand: 'Luna Silver Co.',
      category: 'jewelry',
      result: 'Achieved ₹18L/mo revenue starting from scratch in 90 days.',
      insights: 'Focused on micro-influencer gifting campaigns. Used the generated video assets in TikTok/Instagram Reels Ads leading to direct checkouts on mobile-first landing pages.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
      metrics: ['5.1X ROAS', '₹18L Revenue', '3.5% Conversion Rate'],
      services: ['Meta Ads', 'Creative Strategy', 'Landing Page CRO'],
      shopifyData: [40, 90, 120, 190, 280, 390, 490],
      metaData: [15, 30, 40, 60, 95, 120, 160]
    }
  ],
  clothing: [
    {
      brand: 'Urban Thread',
      category: 'clothing',
      result: 'Scaled to ₹45L monthly revenue using Meta Ads and Email retention flows.',
      insights: 'Developed structured retention flows (welcome series, abandoned cart, win-back) which generated 28% of total revenue. Ran broad Meta targeting to capture massive top-of-funnel traffic.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      metrics: ['4.8X ROAS', '₹45L Revenue', '28% Email Revenue'],
      services: ['Meta Ads', 'Email Marketing', 'Funnel Optimization'],
      shopifyData: [150, 280, 400, 550, 710, 890, 1100],
      metaData: [60, 90, 130, 170, 220, 290, 360]
    },
    {
      brand: 'Luxe Wardrobe',
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
      brand: 'FitWear Active',
      category: 'clothing',
      result: 'Lowered CPA by 38% through a systematic creative testing framework.',
      insights: 'Tested 15 new hooks weekly to beat ad fatigue. Found winning creatives and scaled them using a horizontal scaling strategy (combining multiple high-performing lookalike audiences).',
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop',
      metrics: ['38% Lower CPA', '4.4X ROAS', '150% Volume Boost'],
      services: ['Meta Ads', 'Creative Strategy', 'Funnel Optimization'],
      shopifyData: [70, 110, 160, 230, 320, 420, 560],
      metaData: [25, 40, 55, 80, 110, 150, 195]
    }
  ],
  real_estate: [
    {
      brand: 'Elysian Heights',
      category: 'real_estate',
      result: 'Generated 450+ high-quality luxury property leads at ₹120 CPL.',
      insights: 'Used Meta Lead Form campaigns with custom qualifiers to filter out low-intent buyers. Followed up with WhatsApp automation to schedule property walkthroughs.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
      metrics: ['450+ Leads', '₹120 CPL', '18% Site Visit Rate'],
      services: ['Meta Ads', 'Funnel Optimization', 'Creative Strategy'],
      shopifyData: [50, 95, 140, 185, 230, 310, 450],
      metaData: [20, 35, 50, 70, 90, 125, 160]
    },
    {
      brand: 'Terra Developers',
      category: 'real_estate',
      result: 'Sold out a premium villa project in Bangalore in 45 days using Google Search.',
      insights: 'Targeted high-intent long-tail keywords (e.g. "luxury 4bhk villas in Bangalore"). Built high-converting landing pages featuring interactive maps and 3D walkthroughs.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      metrics: ['100% Sold Out', '₹80Cr Portfolio', '8.5% Lead to Sale'],
      services: ['Google Ads', 'Landing Page CRO', 'Funnel Optimization'],
      shopifyData: [30, 60, 90, 130, 180, 220, 300],
      metaData: [10, 20, 35, 50, 70, 90, 115]
    },
    {
      brand: 'Vertex Spaces',
      category: 'real_estate',
      result: 'Cost per qualified booking reduced by 52% using YouTube Ads.',
      insights: 'Developed high-production property tour videos showing local amenities. Directed traffic to a WhatsApp business chat to automate booking bookings.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop',
      metrics: ['52% Lower CPL', '140 Bookings', '6.8X ROI'],
      services: ['Google Ads', 'Creative Strategy', 'Funnel Optimization'],
      shopifyData: [45, 75, 110, 150, 190, 250, 340],
      metaData: [18, 28, 42, 60, 78, 100, 135]
    }
  ],
  other: [
    {
      brand: 'Skin Glow D2C',
      category: 'other',
      result: 'D2C Skincare brand scaled from ₹1.5L to ₹12L/mo in 60 days.',
      insights: 'Ran aggressive Meta advantage targeting combined with educational product-comparison creatives. Set up post-purchase email upsells to boost lifetime value.',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop',
      metrics: ['3.9X ROAS', '₹12L Revenue', '+45% LTV Growth'],
      services: ['Meta Ads', 'Email Marketing', 'Creative Strategy'],
      shopifyData: [30, 80, 150, 210, 290, 420, 530],
      metaData: [12, 35, 60, 85, 115, 160, 210]
    },
    {
      brand: 'NutriFit Foods',
      category: 'other',
      result: 'Scaled subscription model by 210% with Google & Meta Ads.',
      insights: 'Created custom subscription landing pages. Optimized the funnel to reduce checkout friction, resulting in a 2.4X improvement in conversion rates.',
      image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1200&auto=format&fit=crop',
      metrics: ['210% Scale', '4.2X ROAS', '2.4X Conversion Rate'],
      services: ['Google Ads', 'Meta Ads', 'Landing Page CRO'],
      shopifyData: [60, 110, 170, 250, 310, 430, 590],
      metaData: [22, 45, 68, 95, 120, 170, 230]
    },
    {
      brand: 'SoleStyle Shoes',
      category: 'other',
      result: 'Bootstrapped foot-wear brand hit ₹30L monthly revenue.',
      insights: 'Focused on Instagram-native shopping integration. Targeted competitive brand keywords on Google Search to capture high-intent demand.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      metrics: ['3.8X ROAS', '₹30L Revenue', '35% Return Rate Drop'],
      services: ['Meta Ads', 'Google Ads', 'Funnel Optimization'],
      shopifyData: [80, 130, 190, 240, 310, 460, 610],
      metaData: [30, 50, 75, 95, 125, 180, 240]
    }
  ]
}

const reviews = [
  {
    name: 'Aarav Mehta',
    brand: 'Luxury Fashion Founder',
    review: 'The campaigns completely transformed our online growth. ROAS improved massively while maintaining premium positioning.'
  },
  {
    name: 'Riya Kapoor',
    brand: 'Jewelry Brand Owner',
    review: 'Creative testing and scaling strategy helped us achieve consistent profitable growth month after month.'
  },
  {
    name: 'Siddharth Jain',
    brand: 'D2C Apparel Brand',
    review: 'One of the best performance marketers we have worked with. Data driven decisions and excellent execution.'
  },
  {
    name: 'Ananya Verma',
    brand: 'Beauty Brand Founder',
    review: 'From creatives to funnel optimization, everything was executed with precision and strong growth focus.'
  }
]

const duplicatedReviews = [...reviews, ...reviews]

const ribbonServices = [
  'Meta Ads', 'Google Ads', 'Creative Strategy', 'Landing Page CRO', 'Email Marketing', 'Funnel Optimization'
]
const duplicatedRibbon = [...ribbonServices, ...ribbonServices, ...ribbonServices, ...ribbonServices, ...ribbonServices]

const brands1 = ['Zara', 'Vogue', 'Gucci', 'Tanishq', 'Mejuri', 'Prada', 'Mango', 'Nike']
const brands2 = ['Armani', 'Chanel', 'Cartier', 'Sabyasachi', 'Rolex', 'Dior', 'H&M', 'Adidas']
const duplicatedBrands1 = [...brands1, ...brands1, ...brands1, ...brands1]
const duplicatedBrands2 = [...brands2, ...brands2, ...brands2, ...brands2]

function TextLoop() {
  const words = ['Performance Marketing', 'CRO', 'Creative Strategy', 'Funnel Optimization']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="relative inline-block overflow-hidden h-[1.2em] min-w-[150px] md:min-w-[420px] align-bottom select-all">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute left-0 bottom-0 block w-full whitespace-nowrap text-left"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function CountUp({ end, duration = 2.5, suffix = '' }) {
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
    <div className="border border-white/5 bg-[#171a17] rounded-2xl p-5 shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">SHOPIFY SALES DASHBOARD</span>
          <h4 className="text-sm font-semibold text-white mt-0.5">Gross Sales (Last 30 Days)</h4>
        </div>
        <span className="text-xs text-[#39FF14] font-semibold bg-[#39FF14]/10 px-2 py-0.5 rounded font-mono">+Sales Scale</span>
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
              <stop offset="0%" stopColor="#39FF14" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={`M 0 ${100 - data[0]/10} L 50 ${100 - data[1]/10} L 100 ${100 - data[2]/10} L 150 ${100 - data[3]/10} L 200 ${100 - data[4]/10} L 250 ${100 - data[5]/10} L 300 ${100 - data[6]/10}`}
            fill="none"
            stroke="#39FF14"
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
              stroke="#39FF14"
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
    <div className="border border-white/5 bg-[#171a17] rounded-2xl p-5 shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-[10px] text-[#39ff14] font-mono uppercase tracking-wider">META ADS MANAGER</span>
          <h4 className="text-sm font-semibold text-white mt-0.5">Ad Set Conversions & CPA Trends</h4>
        </div>
        <span className="text-xs text-[#39FF14] font-semibold bg-[#39FF14]/10 px-2 py-0.5 rounded font-mono">ACTIVE SCALING</span>
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
                  fill="#39FF14"
                  fillOpacity="0.15"
                  stroke="#39FF14"
                  strokeWidth="1.5"
                  rx="2"
                />
                <circle
                  cx={xPos + 9}
                  cy={100 - barHeight}
                  r="2.5"
                  fill="#39FF14"
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

function StickyCard({ num, title, desc, index }) {
  const cardRef = useRef(null)
  
  // Track scroll position of the wrapper container
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  })

  // Scale down and fade out completely as the next card overlaps it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.90])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"])

  return (
    <div ref={cardRef} className="h-[38vh] md:h-[42vh] relative w-full mb-[180px]">
      {/* Sticky container that houses the visual card */}
      <div 
        style={{ top: "100px" }}
        className="sticky h-[55vh] md:h-[60vh] w-full max-w-4xl mx-auto px-6 flex items-center justify-center"
      >
        <motion.div
          style={{
            scale,
            opacity,
            filter: blur
          }}
          className="w-full h-full rounded-[32px] border border-[#39FF14]/15 bg-[#111311] p-8 md:p-12 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] origin-top relative overflow-hidden group"
        >
          {/* Subtle grid background inside cards */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1a2e1a_0%,transparent_60%)] opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-start">
            <span className="text-4xl md:text-5xl font-extrabold text-[#39FF14] font-mono tracking-wider opacity-90">{num}</span>
            <span className="text-[10px] text-[#39FF14]/40 font-mono tracking-widest uppercase border border-[#39FF14]/20 rounded-full px-3 py-1 backdrop-blur-md">GUARANTEE</span>
          </div>

          <div className="relative z-10 my-auto">
            <h3 className="text-2xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              {title}
            </h3>
            <p className="text-gray-400 text-xs md:text-base font-light leading-relaxed max-w-2xl">
              {desc}
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-4 mt-4">
            <span className="text-[9px] md:text-xs text-[#39FF14] font-mono tracking-[0.25em] uppercase font-semibold">groww scaling standards</span>
            <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-ping"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function TiltHeroImage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Maps mouse position to degree of tilt (max 15 degrees)
  const rotateX = useTransform(y, [-170, 170], [15, -15])
  const rotateY = useTransform(x, [-210, 210], [-15, 15])

  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    x.set(mouseX)
    y.set(mouseY)
    
    // Update local CSS variables for target tracking light gleam
    el.style.setProperty('--x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div 
      className="relative w-full max-w-[420px] h-[260px] md:h-[340px] flex items-center justify-center perspective-[1000px] cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-[-10px] bg-gradient-to-tr from-[#39FF14]/5 to-transparent blur-xl opacity-30 group-hover:opacity-75 transition-opacity duration-500 rounded-[28px] pointer-events-none"></div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="w-full h-full relative overflow-hidden bg-transparent border-none shadow-none origin-center"
      >
        <img 
          src="/sales-3.png" 
          alt="Shopify Sales Dashboard & Performance Metrics" 
          className="w-120px h-auto object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-108"
        />
        {/* Interactive light gleam overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(57,255,20,0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </motion.div>
    </div>
  )
}

function FooterTakeoverCard({ setShowEmailForm }) {
  const containerRef = useRef(null)
  
  // Track scroll position of the takeover section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Animate inner layout to expand to full bleed
  const scale = useTransform(scrollYProgress, [0, 0.75], [0.92, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 0.75], ["32px", "0px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1])
  const y = useTransform(scrollYProgress, [0, 0.65], [60, 0])

  return (
    <div ref={containerRef} className="min-h-screen relative w-full overflow-hidden flex flex-col justify-between">
      {/* Background card container that expands to fill the entire viewport */}
      <motion.div
        style={{
          scale,
          borderRadius,
          opacity
        }}
        className="absolute inset-0 bg-gradient-to-b from-[#090a09] via-[#0f1110] to-[#050605] border-t border-[#39FF14]/30 shadow-[0_-30px_60px_rgba(57,255,20,0.15)] z-0 origin-bottom"
      />

      {/* Footer Content */}
      <motion.div 
        style={{ y }}
        className="relative z-10 max-w-4xl mx-auto px-6 w-full flex-1 flex flex-col justify-between py-16 md:py-24"
      >
        <div>
          <span className="text-xs text-[#39FF14] font-mono tracking-[0.3em] uppercase font-semibold">GET STARTED</span>
          <h3 className="text-5xl md:text-8xl font-black tracking-[-0.04em] mt-8 text-white leading-tight">
            Ready to scale <br />your brand?
          </h3>
          <p className="text-[#39FF14] text-xl md:text-2xl font-mono mt-6">Let's connect.</p>
        </div>

        <div>
          <div className="mt-12 flex flex-col md:flex-row gap-4 w-full max-w-lg">
            <button 
              onClick={() => setShowEmailForm(true)}
              className="px-8 py-5 rounded-full bg-[#39FF14] text-black font-bold hover:shadow-[0_0_30px_#39FF14] transition-all duration-300 flex-1 text-center cursor-pointer glow-btn text-sm md:text-base uppercase tracking-wider"
            >
              Book a Strategy Call
            </button>
            <a 
              href="https://wa.me/911234567890?text=How%20can%20we%20help%20you%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-5 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 text-[#39FF14] font-bold hover:bg-[#39FF14]/15 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] transition-all duration-300 flex-1 text-center cursor-pointer glow-btn text-sm md:text-base uppercase tracking-wider"
            >
              Chat with Us
            </a>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-6 mt-16 pt-8 border-t border-white/5">
            <a href="https://linkedin.com/in/neha-singh" target="_blank" rel="noopener noreferrer" className="text-[#39FF14] hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#projects" className="text-[#39FF14] hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </a>
            <a href="https://instagram.com/neha_ad_ops" target="_blank" rel="noopener noreferrer" className="text-[#39FF14] hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function PortfolioWebsite() {

  const [selectedProject, setSelectedProject] = useState(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('jewelry')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    goals: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.brand) {
      alert('Please fill out all required fields.')
      return
    }
    setIsSubmitting(true)
    try {
      // ENTER YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
      const scriptURL = ''
      
      const payload = new URLSearchParams()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('brand', formData.brand)
      payload.append('goals', formData.goals)

      if (scriptURL) {
        await fetch(scriptURL, {
          method: 'POST',
          body: payload,
          mode: 'no-cors'
        })
      } else {
        // Fallback simulation
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Submitted successfully to Sheets (Simulated):', formData)
      }
      
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', brand: '', goals: '' })
      setTimeout(() => {
        setSubmitSuccess(false)
        setShowEmailForm(false)
      }, 3000)
    } catch (error) {
      console.error('Submit failed:', error)
      alert('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Refs for GSAP animations
  const navRef = useRef(null)
  const headingRef = useRef(null)
  const bioRef = useRef(null)
  const ctaContainerRef = useRef(null)
  const statsContainerRef = useRef(null)
  const magneticBtn1 = useRef(null)
  const magneticBtn2 = useRef(null)

  useEffect(() => {
    // Custom Follower Cursor GSAP Animation
    const cursor = document.querySelector('.custom-cursor')
    const dot = document.querySelector('.custom-cursor-dot')
    
    const onMouseMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' })
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

    // GSAP Hero Page Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(navRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.7')
      .fromTo(bioRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.9')
      .fromTo(ctaContainerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.8')
      .fromTo('.stat-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 1 }, '-=0.8')

    // GSAP Magnetic Button Effect
    const magneticElements = [magneticBtn1.current, magneticBtn2.current]
    magneticElements.forEach(btn => {
      if (!btn) return
      
      const moveBtn = (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' })
      }
      
      const resetBtn = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      }

      btn.addEventListener('mousemove', moveBtn)
      btn.addEventListener('mouseleave', resetBtn)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverActive)
        el.removeEventListener('mouseleave', removeHoverActive)
      })
      magneticElements.forEach(btn => {
        if (!btn) return
        btn.removeEventListener('mousemove', () => {})
        btn.removeEventListener('mouseleave', () => {})
      })
    }
  }, [selectedProject, showEmailForm, mobileMenuOpen, activeCategory])

  // Framer Motion reveal variants for grid elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <div className="bg-[#0f1110] text-white min-h-screen overflow-x-hidden selection:bg-[#39FF14] selection:text-black font-sans relative">
      {/* Custom Follower Cursor */}
      <div className="hidden lg:block custom-cursor"></div>
      <div className="hidden lg:block custom-cursor-dot"></div>

      {/* Decorative Radial Backgrounds & Diamond Grid Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0f1110] bg-[radial-gradient(circle_at_top,#142014_0%,#0f1110_50%,#090a09_100%)]"></div>
        <div className="absolute inset-0 diamond-grid"></div>
        <div className="absolute top-[5%] left-[-15%] w-[800px] h-[800px] bg-gradient-to-tr from-[#39FF14]/[0.08] to-[#39FF14]/[0.01] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-15%] w-[800px] h-[800px] bg-gradient-to-bl from-[#39FF14]/[0.06] to-transparent blur-[160px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav ref={navRef} className="sticky top-0 z-50 backdrop-blur-2xl border-b border-white/5 bg-[#111311]/85">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black tracking-[0.25em] uppercase text-white/90 cursor-pointer hover:text-[#39FF14] transition-colors duration-300">groww</h1>
            <button 
              onClick={() => setShowEmailForm(true)}
              className="px-4 py-1.5 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/[0.08] text-[11px] font-semibold text-[#39FF14] tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer glow-btn"
            >
              Book a Call
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-10 text-sm text-[#39FF14]/80 font-light">
            <a href="#services" className="hover:text-white transition-all duration-300 hover:scale-105">Services</a>
            <a href="#projects" className="hover:text-white transition-all duration-300 hover:scale-105">Proofs</a>
            <a href="#promises" className="hover:text-white transition-all duration-300 hover:scale-105">Why Us</a>
          </div>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/90 hover:text-[#39FF14] transition-colors duration-300 z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-full bg-[#111311]/95 border-b border-white/5 md:hidden flex flex-col px-8 py-8 gap-5 backdrop-blur-3xl shadow-2xl overflow-hidden"
            >
              <a 
                href="#services" 
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-base text-gray-300 hover:text-[#39FF14] transition-colors duration-300 font-light tracking-wider"
              >
                Services
              </a>
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-base text-gray-300 hover:text-[#39FF14] transition-colors duration-300 font-light tracking-wider"
              >
                Proofs
              </a>
              <a 
                href="#promises" 
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  document.getElementById('promises')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-base text-gray-300 hover:text-[#39FF14] transition-colors duration-300 font-light tracking-wider"
              >
                Why Us
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false)
                  setShowEmailForm(true)
                }}
                className="w-full mt-2 py-3 rounded-full bg-[#39FF14] text-black font-bold text-sm tracking-wider text-center cursor-pointer glow-btn flex items-center justify-center gap-2"
              >
                Book Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-4">
        {/* Responsive Flex / Grid: Ordered cleanly for mobile (Text -> Graph/Images -> CTA -> Trusted By -> Stats) */}
        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 items-center mb-6">
          
          {/* 1. TEXT CONTAINER (First on mobile & Left side on desktop) */}
          <div className="w-full md:col-span-7 flex flex-col order-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#39FF14]/15 bg-[#39FF14]/[0.04] backdrop-blur-xl mb-3 text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-[#39FF14] w-fit">
              <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse"></span>
              Profit Driven Growth
            </div>

            <h1 ref={headingRef} className="text-3xl md:text-7xl font-semibold leading-[1.05] tracking-[-0.04em] mb-4 select-all">
              Scaling Brands <span className="block mt-2">with <span className="bg-[#39FF14] text-black px-2 py-0.5 rounded shadow-[0_0_10px_rgba(57,255,20,0.25)] font-bold inline-block text-lg md:text-4xl align-middle font-mono"><TextLoop /></span></span>
            </h1>

            <p ref={bioRef} className="text-[#39FF14]/90 text-sm md:text-base tracking-wide font-mono mb-6 leading-relaxed">
              we help D2C & B2B brands scale profitably on Meta & Google — with data, not guesswork.
            </p>
          </div>

          {/* 2. GRAPH CONTAINER (Second on mobile & Right side on desktop) */}
          <div className="w-full md:col-span-5 flex justify-center order-2 my-8 md:my-0">
            <TiltHeroImage />
          </div>
        </div>

        {/* 3. CTA & TRUSTED BY (Third on mobile) */}
        <div ref={ctaContainerRef} className="flex flex-col gap-6 max-w-2xl mb-8 order-3">
          <div className="flex flex-wrap gap-3">
            <a 
              ref={magneticBtn1}
              href="#projects" 
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }} 
              className="px-6 py-3.5 rounded-full bg-[#39FF14] text-black font-bold text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(57,255,20,0.2)] inline-flex items-center justify-center min-w-[130px] glow-btn cursor-pointer"
            >
              View Proof
            </a>

            <a 
              ref={magneticBtn2}
              href="#promises" 
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('promises')?.scrollIntoView({ behavior: 'smooth' })
              }} 
              className="px-6 py-3.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/[0.02] text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center min-w-[150px] glow-btn cursor-pointer"
            >
              Start Scaling
            </a>
          </div>
          
          {/* TRUSTED BY: D2C, B2B, REAL ESTATE */}
          <div className="text-[10px] md:text-xs text-gray-500 font-mono tracking-widest uppercase flex items-center gap-2 mt-1">
            <span>Trusted by:</span>
            <span className="text-[#39FF14] font-semibold">D2C</span>
            <span className="text-gray-700">•</span>
            <span className="text-[#39FF14] font-semibold">B2B</span>
            <span className="text-gray-700">•</span>
            <span className="text-[#39FF14] font-semibold">Real Estate</span>
          </div>
        </div>

        {/* 4. STATS ROW (Fourth on mobile) */}
        <div ref={statsContainerRef} className="grid grid-cols-4 gap-2 pt-6 border-t border-white/5 order-4">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className="stat-card p-3 md:p-5 rounded-[22px] border border-[#39FF14]/10 bg-[#39FF14]/[0.02] backdrop-blur-2xl hover:border-[#39FF14]/30 hover:bg-[#39FF14]/[0.06] transition-all duration-500 hover:-translate-y-1 shadow-md text-center group"
            >
              <h2 className="text-sm md:text-2xl font-bold mb-1 text-white tracking-tight group-hover:text-[#39FF14] transition-colors duration-300">
                <CountUp end={item.value} suffix={item.suffix} />
              </h2>
              <p className="text-gray-500 text-[7px] md:text-[10px] tracking-widest uppercase font-medium line-clamp-2 leading-tight">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ribbon Divider Section (FLAT HORIZONTAL RIBBON) */}
      <div className="relative w-full h-[80px] overflow-hidden flex items-center justify-center pointer-events-none my-4 z-10">
        <div className="absolute w-[350%] h-12 bg-gradient-to-r from-[#111311]/0 via-[#39FF14]/[0.05] to-[#111311]/0 border-y border-[#39FF14]/20 flex items-center overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-scroll-right">
            {duplicatedRibbon.map((service, index) => (
              <span key={index} className="text-base md:text-lg font-semibold tracking-wider text-[#39FF14] uppercase flex items-center gap-4 font-mono">
                {service} <span className="text-white/40">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Highlight growth tagline section */}
      <section className="max-w-4xl mx-auto px-6 py-6 text-center">
        <p className="text-xl md:text-3xl text-gray-400 font-light leading-relaxed">
          We combine creative, data, and media buying to{' '}
          <span className="text-black bg-[#39FF14] px-2 py-0.5 rounded shadow-[0_0_15px_rgba(57,255,20,0.3)] font-semibold inline-block font-mono">
            drive real growth.
          </span>
        </p>
      </section>

      {/* Services Section (Solar Planets Orbit Layout) */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Summary Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-[#39FF14] uppercase tracking-[0.35em] text-xs mb-2 font-semibold font-mono">What We Do</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              End To End Growth Solutions <br />For Ambitious Brands
            </h2>
            <div className="text-[#39FF14] text-lg font-mono tracking-widest uppercase flex flex-col gap-1.5 border-l-2 border-[#39FF14]/30 pl-4 py-2 mb-8">
              <span>Strategy.</span>
              <span>Creative.</span>
              <span>Media Buying.</span>
              <span>Conversion.</span>
            </div>
          </div>

          {/* Right Column: Solar Planet orbit around Growth sun */}
          <div className="lg:col-span-7 flex justify-center items-center py-6">
            <div className="relative w-[320px] h-[320px] md:w-[440px] md:h-[440px] flex items-center justify-center">
              
              {/* Central core node */}
              <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#39FF14]/[0.05] border border-[#39FF14]/30 flex flex-col items-center justify-center z-20 shadow-[0_0_30px_rgba(57,255,20,0.2)] animate-pulse">
                <span className="text-[9px] text-[#39FF14]/75 font-mono tracking-widest uppercase mb-1">CORE</span>
                <span className="text-xs md:text-base font-bold text-[#39FF14] tracking-wider uppercase font-mono">GROWTH</span>
              </div>

              {/* Rotating planetary path wrapper */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
                className="w-full h-full flex items-center justify-center relative border border-white/5 rounded-full"
              >
                {/* Orbit rings for planetary visual */}
                <div className="absolute inset-10 rounded-full border border-[#39FF14]/5 pointer-events-none"></div>

                {services.map((srv, idx) => {
                  const angle = (idx * 360) / services.length
                  return (
                    <div
                      key={idx}
                      className="absolute"
                      style={{
                        transform: `rotate(${angle}deg) translate(${window.innerWidth < 768 ? '100px' : '155px'}) rotate(-${angle}deg)`
                      }}
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#39FF14]/25 bg-[#0f1110] hover:bg-[#39FF14] hover:text-black flex flex-col items-center justify-center text-center shadow-lg transition-colors duration-300 cursor-pointer group"
                      >
                        <span className="text-base md:text-lg mb-0.5">{srv.icon}</span>
                        <span className="text-[7.5px] md:text-[9px] font-bold tracking-tight uppercase leading-tight font-mono text-gray-300 group-hover:text-black line-clamp-2 px-1">
                          {srv.title}
                        </span>
                      </motion.div>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Area: Grid details of the services cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-[30px] border border-[#39FF14]/10 bg-[#39FF14]/[0.02] hover:border-[#39FF14]/30 hover:bg-[#39FF14]/[0.06] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14]/[0.01] rounded-full blur-2xl group-hover:bg-[#39FF14]/[0.05] transition-all duration-500"></div>
              <div className="w-12 h-12 rounded-full border border-[#39FF14]/15 bg-[#39FF14]/[0.08] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#39FF14]/40 transition-all duration-300">
                <span className="text-xl">{service.icon}</span>
              </div>
              <h3 className="text-2xl font-medium tracking-[-0.03em] mb-4 group-hover:text-[#39FF14] transition-colors duration-300">{service.title}</h3>
              <p className="text-gray-400 leading-8 font-light text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section (PROOFS NOT PROMISES) */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <p className="text-[#39FF14] uppercase tracking-[0.35em] text-xs mb-2 font-semibold">Results</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] mb-2 uppercase font-mono">Proofs, Not Promises</h2>
        </div>

        {/* Category Filters (Highlighted CTA buttons) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['jewelry', 'clothing', 'real_estate', 'other'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                activeCategory === cat 
                  ? 'bg-[#39FF14] text-black border-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.35)]' 
                  : 'border-white/10 hover:border-[#39FF14]/40 text-gray-400 hover:text-white'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <motion.div 
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {caseStudiesData[activeCategory].map((study, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              onClick={() => setSelectedProject(study)} 
              className="overflow-hidden rounded-[30px] border border-[#39FF14]/10 bg-[#39FF14]/[0.02] hover:border-[#39FF14]/30 hover:bg-[#39FF14]/[0.06] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-lg group"
            >
              <div className="overflow-hidden relative h-56">
                <img 
                  src={study.image} 
                  alt={study.brand} 
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1110] to-transparent opacity-60"></div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#39FF14] transition-colors duration-300">{study.brand}</h3>
                <p className="text-gray-400 leading-6 font-light text-xs mb-5 line-clamp-2">{study.result}</p>
                <div className="text-[#39FF14] text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 group-hover:text-white transition-all duration-300">
                  View Case Study
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Case Study Detail Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="max-w-4xl w-full bg-[#111311] border border-[#39FF14]/15 rounded-[32px] overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#39FF14]/10 hover:bg-[#39FF14] hover:text-black transition-all duration-300 z-10 flex items-center justify-center text-lg font-light"
              >
                ✕
              </button>
              <div className="relative h-[200px] md:h-[300px]">
                <img src={selectedProject.image} alt={selectedProject.brand} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111311] via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6 md:p-10">
                <div className="mb-6">
                  <p className="text-[#39FF14] uppercase tracking-[0.3em] text-xs font-semibold mb-2">Case Study</p>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] mb-4">{selectedProject.brand}</h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((srv, index) => (
                      <span key={index} className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 text-xs font-light">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SVG Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <ShopifyDashboardChart brand={selectedProject.brand} data={selectedProject.shopifyData} />
                  <MetaAdsDashboardChart data={selectedProject.metaData} />
                </div>

                {/* Strategy metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {selectedProject.metrics.map((metric, index) => (
                    <div key={index} className="p-4 rounded-xl border border-[#39FF14]/10 bg-[#39FF14]/[0.03] text-center shadow-inner">
                      <h3 className="text-lg font-semibold text-[#39FF14]">{metric}</h3>
                    </div>
                  ))}
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Core Strategy & Execution</h4>
                <p className="text-gray-400 leading-7 font-light text-sm">{selectedProject.insights}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews & Double Brands Marquee */}
      <section className="max-w-7xl mx-auto py-10 overflow-hidden">
        <div className="text-center mb-10">
          <p className="text-[#39FF14] uppercase tracking-[0.35em] text-xs mb-2 font-semibold font-mono">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] mb-2">What Brands Say</h2>
        </div>

        <div className="relative overflow-hidden w-full py-2 mb-4">
          <div className="flex gap-6 animate-scroll w-max hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {duplicatedReviews.map((review, index) => (
              <div key={index} className="w-[350px] md:w-[400px] shrink-0 rounded-[28px] border border-[#39FF14]/10 bg-[#39FF14]/[0.02] hover:border-[#39FF14]/30 backdrop-blur-2xl p-6 md:p-8 transition-colors duration-300 shadow-md">
                <h3 className="text-lg font-medium text-white mb-1">{review.name}</h3>
                <p className="text-[#39FF14] text-xs uppercase tracking-[0.15em] mb-4 font-semibold">{review.brand}</p>
                <p className="text-gray-400 leading-6 font-light text-xs italic">“{review.review}”</p>
              </div>
            ))}
          </div>
        </div>

        {/* Double-row Brand Logos Marquee */}
        <div className="w-full py-6 border-t border-white/5 overflow-hidden flex flex-col gap-4">
          {/* Line 1 (Scroll Right) */}
          <div className="relative overflow-hidden w-full py-1">
            <div className="flex gap-16 whitespace-nowrap animate-scroll-right w-max">
              {duplicatedBrands1.map((brand, index) => (
                <span key={index} className="text-base md:text-lg font-bold tracking-widest text-white/20 hover:text-[#39FF14] transition-colors duration-300 uppercase font-mono">
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Line 2 (Scroll Left) */}
          <div className="relative overflow-hidden w-full py-1">
            <div className="flex gap-16 whitespace-nowrap animate-scroll w-max">
              {duplicatedBrands2.map((brand, index) => (
                <span key={index} className="text-base md:text-lg font-bold tracking-widest text-white/20 hover:text-[#39FF14] transition-colors duration-300 uppercase font-mono">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Sticky Overlapping Stacking Cards & Immersive Footer Takeover */}
      <section id="promises" className="relative w-full">
        <StickyCard
          num="01"
          title={<span>Unlock Full <br className="hidden md:inline" />Funnel Growth</span>}
          desc="We align every marketing touchpoint, from top-of-funnel discovery to post-purchase retention. We optimize campaigns, landing pages, and email flow integrations under a unified scaling system."
          index={0}
        />
        <StickyCard
          num="02"
          title={<span>Conversions <br className="hidden md:inline" />with 4X ROAS</span>}
          desc="By combining high-intent keyword targets on Google Ads with aggressive lookalike scaling on Meta Ads, we guarantee scalable acquisition performance that matches your margin targets."
          index={1}
        />
        <StickyCard
          num="03"
          title={<span>Creative Strategy <br className="hidden md:inline" />that Scales</span>}
          desc="UGC, hooks, and performance-driven ad templates optimized for high click-through rates (CTR) and visual retention, beating advertising fatigue before it impacts your bottom line."
          index={2}
        />
        <FooterTakeoverCard setShowEmailForm={setShowEmailForm} />
      </section>

      {/* Email Form Modal (AnimatePresence) */}
      <AnimatePresence>
        {showEmailForm && (
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
              className="max-w-2xl w-full bg-[#111311] border border-[#39FF14]/15 rounded-[32px] p-8 md:p-10 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowEmailForm(false)} 
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#39FF14]/10 hover:bg-[#39FF14] hover:text-black transition-all duration-300 flex items-center justify-center text-lg font-light"
              >
                ✕
              </button>
              <p className="text-[#39FF14] uppercase tracking-[0.3em] text-xs font-semibold mb-4">Contact Form</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] mb-8">Book Your Free Brand Audit</h2>
              
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full flex items-center justify-center text-3xl text-[#39FF14] animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Audit Request Received!</h3>
                  <p className="text-gray-400 text-sm max-w-sm">We are analyzing your brand metrics. Expect an audit callback within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Your Name" 
                    className="w-full p-5 rounded-2xl bg-[#39FF14]/[0.02] border border-[#39FF14]/10 outline-none text-white placeholder:text-gray-600 focus:border-[#39FF14]/40 transition-all duration-300" 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Your Email" 
                    className="w-full p-5 rounded-2xl bg-[#39FF14]/[0.02] border border-[#39FF14]/10 outline-none text-white placeholder:text-gray-600 focus:border-[#39FF14]/40 transition-all duration-300" 
                  />
                  <input 
                    type="text" 
                    name="brand" 
                    value={formData.brand} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Brand Name" 
                    className="w-full p-5 rounded-2xl bg-[#39FF14]/[0.02] border border-[#39FF14]/10 outline-none text-white placeholder:text-gray-600 focus:border-[#39FF14]/40 transition-all duration-300" 
                  />
                  <textarea 
                    name="goals" 
                    value={formData.goals} 
                    onChange={handleInputChange} 
                    rows="4" 
                    placeholder="Tell me about your brand goals" 
                    className="w-full p-5 rounded-2xl bg-[#39FF14]/[0.02] border border-[#39FF14]/10 outline-none text-white placeholder:text-gray-600 focus:border-[#39FF14]/40 transition-all duration-300"
                  ></textarea>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-full bg-[#39FF14] text-black font-semibold hover:bg-[#72ff57] transition-all duration-300 shadow-[0_4px_20px_rgba(57,255,20,0.2)] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting Request...' : 'Submit Audit Request'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/5 py-8 text-center text-gray-600 text-xs tracking-wider">
        <p>© 2026 groww. Built for premium brand growth.</p>
      </footer>
    </div>
  )
}
