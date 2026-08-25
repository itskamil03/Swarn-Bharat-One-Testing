// Centralized content for the homepage.
// Swap the `image` URLs for local files under /public/images when available.

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Businesses", href: "#businesses" },
  { label: "Impact", href: "#impact" },
  { label: "Investors", href: "#investors" },
  { label: "News", href: "#news" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export const heroSlides = [
  {
    id: "slide-01",
    eyebrow: "Who We Are",
    headlineLead: "Building a Stronger",
    headlineHighlight: "Bharat.",
    description:
      "Creating businesses, building infrastructure, empowering communities and driving sustainable growth for a better tomorrow.",
    image:
      "/images/slide-01.jpg",
    primaryCta: { label: "Explore Our Businesses", href: "#businesses" },
    secondaryCta: { label: "Our Impact", href: "#impact" },
  },
  {
    id: "slide-02",
    eyebrow: "Energy & Sustainability",
    headlineLead: "Powering a",
    headlineHighlight: "Cleaner Tomorrow.",
    description:
      "Investing in renewable infrastructure that reduces our footprint while fuelling the ambitions of a growing nation.",
    image:
      "/images/hh1.png",
    primaryCta: { label: "Explore Energy", href: "#businesses" },
    secondaryCta: { label: "Our Impact", href: "#impact" },
  },
  {
    id: "slide-03",
    eyebrow: "Infrastructure",
    headlineLead: "Engineering",
    headlineHighlight: "Progress at Scale.",
    description:
      "From highways to smart cities, our projects are shaping the physical backbone of a modern, connected India.",
    image:
      "/images/slide-03.jpg",
    primaryCta: { label: "View Our Projects", href: "#projects" },
    secondaryCta: { label: "Our Impact", href: "#impact" },
  },
  {
    id: "slide-04",
    eyebrow: "People & Impact",
    headlineLead: "Building Careers.",
    headlineHighlight: "Building Bharat.",
    description:
      "A team driven by purpose and passion, working together to create lasting impact across every community we touch.",
    image:
      "/images/slide-04.jpg",
    primaryCta: { label: "Explore Careers", href: "#careers" },
    secondaryCta: { label: "Our Impact", href: "#impact" },
  },
];

export const swarnBharatCards = [
  {
    title: "Vision",
    description: "To build an empowered, self-reliant and developed India.",
    image: "/images/vision.jpg",
    iconPath: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
  },
  {
    title: "Mission",
    description: "Create sustainable businesses and positive impact at scale.",
    image: "/images/mission.jpg",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
  },
  {
    title: "Values",
    description: "Integrity, Excellence, Sustainability and Nation First.",
    image: "/images/values.jpg",
    iconPath: "M12.16 2.01l7.7 7.7-7.7 7.7-7.7-7.7 7.7-7.7m0-2l-9.1 9.1 9.1 9.1 9.1-9.1-9.1-9.1z"
  },
];

export const businesses = [
  {
    number: "01",
    title: "Infrastructure",
    description: "Building the systems and assets that connect communities and accelerate growth.",
    iconPath: "M3 21h18M5 21V7l5-4 5 4v14M15 21V11l4-3 2 3v10M9 9h2v2H9z"
  },
  {
    number: "02",
    title: "Energy",
    description: "Developing reliable and future-ready energy solutions.",
    iconPath: "M13 10V3L4 14h7v8l9-11h-7z"
  },
  {
    number: "03",
    title: "Resources",
    description: "Creating responsible value from essential natural resources.",
    iconPath: "M12 2c0 0-7.5 5.5-7.5 13.5 0 2 1.5 4.5 4.5 4.5 3 0 3-2 3-2s0 2 3 2c3 0 4.5-2.5 4.5-4.5C19.5 7.5 12 2 12 2zm0 18v-8"
  },
  {
    number: "04",
    title: "Agri Business",
    description: "Strengthening agriculture through modern, scalable solutions.",
    iconPath: "M12 22V10M8 14l4-4 4 4M9 10l3-3 3 3M10 6l2-2 2 2"
  },
  {
    number: "05",
    title: "Defence & Aerospace",
    description: "Supporting strategic capabilities through technology and innovation.",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  },
  {
    number: "06",
    title: "Emerging Businesses",
    description: "Exploring new opportunities that shape tomorrow's industries.",
    iconPath: "M18 6a2 2 0 11-4 0 2 2 0 014 0zM8 6a2 2 0 11-4 0 2 2 0 014 0zM13 18a2 2 0 11-4 0 2 2 0 014 0zM6 8l5 8m5-8l-5 8"
  }
];

export const projects = [
  {
    id: "national-highway",
    index: "01",
    category: "Infrastructure",
    title: "National Highway Project",
    description: "Building connectivity, powering progress.",
    image:
      "/images/slide-03.jpg",
  },
  {
    id: "renewable-energy-park",
    index: "02",
    category: "Energy",
    title: "Renewable Energy Park",
    description: "Harnessing clean energy for a sustainable future.",
    image:
      "/images/project-02.jpg",
  },
  {
    id: "smart-city-development",
    index: "03",
    category: "Urban Development",
    title: "Smart City Development",
    description: "Redefining urban living with modern solutions.",
    image:
      "/images/project-03.jpg",
  },
  {
    id: "industrial-manufacturing",
    index: "04",
    category: "Manufacturing",
    title: "Industrial & Manufacturing",
    description: "Driving growth through innovation and excellence.",
    image:
      "/images/project-04.jpg",
  },
];

export const stats = [
  { value: 25, suffix: "+", label: "Years" },
  { value: 120000, suffix: "+", label: "People Impacted" },
  { value: 25, suffix: "+", label: "Major Initiatives" },
  { value: 50, suffix: "+", label: "Strategic Partnerships" },
  { value: 100, suffix: "M+", label: "Lives Touched" },
];

export const latestNews = [
  {
    id: "renewable-energy-project",
    date: "20 MAY 2024",
    category: "PROJECT UPDATE",
    title: "Swarn Bharat inaugurates New Renewable Energy Project",
    image: "/images/news-01.jpg",
  },
  {
    id: "education-initiative",
    date: "16 MAY 2024",
    category: "FOUNDATION",
    title: "Khetan Foundation Launches Education Initiative",
    image: "/images/news-02.jpg",
  },
  {
    id: "global-partnership",
    date: "02 MAY 2024",
    category: "PARTNERSHIPS",
    title: "Partnership with Global Leaders for a Sustainable Future",
    image: "/images/news-03.jpg",
  },
];

export const upcomingEvents = [
  {
    id: "event-1",
    day: "25",
    month: "MAY",
    year: "2024",
    title: "Swarn Bharat Leadership Conclave 2024",
    location: "New Delhi",
  },
  {
    id: "event-2",
    day: "05",
    month: "JUN",
    year: "2024",
    title: "Community Development Program",
    location: "Mumbai",
  },
  {
    id: "event-3",
    day: "18",
    month: "JUN",
    year: "2024",
    title: "Sustainability & Innovation Summit",
    location: "Bengaluru",
  },
];

export const footerLinks = {
  quick: [
    { label: "About", href: "#about" },
    { label: "Our Businesses", href: "#businesses" },
    { label: "Our Foundation", href: "#" },
    { label: "Our Projects", href: "#projects" },
    { label: "Our Impact", href: "#impact" },
  ],
  connect: [
    { label: "News", href: "#news" },
    { label: "Events", href: "#" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
};
