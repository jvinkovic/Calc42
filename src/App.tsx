import { NavLink, Route, Routes } from 'react-router'
import { FourButton } from './pages/FourButton'
import { Home } from './pages/Home'
import { TwoButton } from './pages/TwoButton'

const link = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')

export function App() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" end className={link}>EML</NavLink>
        <NavLink to="/four" className={link}>4 buttons</NavLink>
        <NavLink to="/two" className={link}>2 buttons</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/four" element={<FourButton />} />
        <Route path="/two" element={<TwoButton />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
