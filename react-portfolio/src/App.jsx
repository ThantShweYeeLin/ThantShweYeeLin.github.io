import './App.css';
import Navbar from './components/Navbar';
import WelcomeSection from './components/WelcomeSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <section id="welcome-section">
          <WelcomeSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}

export default App;