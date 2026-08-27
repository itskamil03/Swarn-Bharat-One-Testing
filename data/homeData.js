// Centralized content for the homepage.
// Swap the `image` URLs for local files under /public/images when available.

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Businesses", href: "#businesses" },
  { label: "Foundation", href: "#foundation" },
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
    image: "/images/ah1.png",
    iconPath: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
  },
  {
    title: "Mission",
    description: "Create sustainable businesses and positive impact at scale.",
    image: "/images/ah2.png",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
  },
  {
    title: "Values",
    description: "Integrity, Excellence, Sustainability and Nation First.",
    image: "/images/ah3.png",
    iconPath: "M12.16 2.01l7.7 7.7-7.7 7.7-7.7-7.7 7.7-7.7m0-2l-9.1 9.1 9.1 9.1 9.1-9.1-9.1-9.1z"
  },
];

export const businesses = [
  {
    number: "01",
    title: "E-Commerce",
    description: "Discover products, compare choices, and shop conveniently online.",
    iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
  },
  {
    number: "02",
    title: "Services",
    description: "Find trusted professionals and reliable services for everyday needs.",
    iconPath: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
  },
  {
    number: "03",
    title: "Matrimonial",
    description: "Connect with compatible profiles and discover meaningful relationships.",
    iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  },
  {
    number: "04",
    title: "Jobs",
    description: "Explore career opportunities and connect with the right employers.",
    iconPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  },
  {
    number: "05",
    title: "Students Portal",
    description: "Access education resources, opportunities, and student-focused services.",
    iconPath: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
  },
  {
    number: "06",
    title: "Construction",
    description: "Discover construction solutions, professionals, projects, and resources.",
    iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z"
  },
  {
    number: "07",
    title: "Real Estate",
    description: "Explore properties, homes, commercial spaces, and real estate opportunities.",
    iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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
      "/images/h4.1.png",
  },
  {
    id: "renewable-energy-park",
    index: "02",
    category: "Energy",
    title: "Renewable Energy Park",
    description: "Harnessing clean energy for a sustainable future.",
    image:
      "/images/h4.2.png",
  },
  {
    id: "smart-city-development",
    index: "03",
    category: "Urban Development",
    title: "Smart City Development",
    description: "Redefining urban living with modern solutions.",
    image:
      "/images/h4.3.png",
  },
  {
    id: "industrial-manufacturing",
    index: "04",
    category: "Manufacturing",
    title: "Industrial & Manufacturing",
    description: "Driving growth through innovation and excellence.",
    image:
      "/images/h4.4.png",
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

export const latestBlogPosts = [
  {
    category: "Energy",
    date: "12 Aug 2024",
    readTime: "6 min read",
    title: "Inside our largest solar rollout yet",
    image: "/images/h4.2.png",
    href: "#"
  },
  {
    category: "Infrastructure",
    date: "05 Aug 2024",
    readTime: "4 min read",
    title: "How urban infrastructure shapes community trust",
    image: "/images/slide-03.jpg",
    href: "#"
  },
  {
    category: "Manufacturing",
    date: "28 Jul 2024",
    readTime: "5 min read",
    title: "Building manufacturing capacity for a self-reliant Bharat",
    image: "/images/h4.4.png",
    href: "#"
  }
];

