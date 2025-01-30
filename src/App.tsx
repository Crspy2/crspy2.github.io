import { useTabTitle } from "@/hooks/title.ts"
import { Menu } from '@/components/menu'
import { Intro } from '@/components/intro'
import { About } from '@/components/about'
import { Tools } from "@/components/tools.tsx"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact.tsx"
import { Footer } from "@/components/footer.tsx"

function App() {
    useTabTitle()
    return (
        <div className="max-w-screen text-neutral-200">
            <Menu />
            <Intro />
            <About />
            <Tools />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
