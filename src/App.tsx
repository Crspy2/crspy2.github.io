import { useTabTitle } from "@/hooks/title.ts"
import { Menu } from '@/components/menu'
import { Intro } from '@/components/intro'

function App() {
    useTabTitle()
    return (
        <div className="max-w-screen text-neutral-200">
            <Menu />
            <Intro />
        </div>
    )
}

export default App
