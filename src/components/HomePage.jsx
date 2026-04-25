import Hero from './Hero'
import ScrollReveal from './ScrollReveal'
import About from './About'
import FeaturedProject from './FeaturedProject'
import SelectedProjects from './SelectedProjects'
import DecisionLog from './DecisionLog'
import MetricMarvels from './MetricMarvels'
import Writing from './Writing'
import Footer from './Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ScrollReveal />
      <About />
      <FeaturedProject />
      <SelectedProjects />
      <DecisionLog />
      <MetricMarvels />
      <Writing />
      <Footer />
    </main>
  )
}
