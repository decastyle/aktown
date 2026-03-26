import MarqueeAktown from './components/marquee-aktown';
import Navbar from './components/navbar';
import Team from './components/team';
import HeroX from './components/hero';
import Footer from './components/footer';
import ProjectsGallery from './components/projects-gallery';

function App() {
    return (
        <>
            <Navbar />
            <HeroX />
            <MarqueeAktown reverse={true} />
            <Team />
            <ProjectsGallery />
            <MarqueeAktown reverse={false} />
            <Footer />
        </>
    );
}

export default App;

