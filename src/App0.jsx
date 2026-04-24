import './index.css'
import Hero from './components/Hero'
import ScrollReveal from './components/ScrollReveal'
import About from './components/About'
import FullStory from './components/FullStory'
import FeaturedProject from './components/FeaturedProject'
import SelectedProjects from './components/SelectedProjects'
import DecisionLog from './components/DecisionLog'
import MetricMarvels from './components/MetricMarvels'
import Writing from './components/Writing'
import Footer from './components/Footer'

export default function App() {
  return (
    <main>
      <Hero />
      <ScrollReveal />
      <About />
      <FullStory />
      <FeaturedProject />
      <SelectedProjects />
      <DecisionLog />
      <MetricMarvels />
      <Writing />
      <Footer />
    </main>
  )
}