import { CodeBeams } from './components/code'
import { Intro } from './components/intro'
import { Menu } from './components/menu'
import { Projects } from './components/projects'

function App() {
    return (
        <div className="bg-slate-950 min-h-screen max-w-screen">
            <Menu />
            <Intro />
            <CodeBeams />
            <Projects />
        </div>
    )
}

export default App
