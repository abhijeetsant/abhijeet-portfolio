import Hero from './Hero'
import ScrollReveal from './ScrollReveal'
import About from './About'
import FeaturedProject from './FeaturedProject'
import SelectedProjects from './SelectedProjects'
import DecisionLog from './DecisionLog'
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
      <Writing />
      <Footer />
    </main>
  )
}
