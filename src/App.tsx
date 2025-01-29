import { Menu } from '@/components/menu'
import { Intro } from '@/components/intro'
import { About } from '@/components/about'
import { Tools } from "@/components/tools.tsx"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer.tsx"

function App() {
    return (
        <div className="bg-slate-950 min-h-screen max-w-screen text-neutral-200">
            <Menu />
            <Intro />
            <About />
            <Tools />
            <Projects />
            <Footer />
        </div>
    )
}

export default App
