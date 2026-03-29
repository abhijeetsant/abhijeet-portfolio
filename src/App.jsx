import './index.css'
import Hero from './components/Hero'
import ScrollReveal from './components/ScrollReveal'
import About from './components/About'
import FeaturedProject from './components/FeaturedProject'
import SelectedProjects from './components/SelectedProjects'
import DecisionLog from './components/DecisionLog'

export default function App() {
  return (
    <main>
      <Hero />
      <ScrollReveal />
      <About />
      <FeaturedProject />
      <SelectedProjects />
      <DecisionLog />
    </main>
  )
}