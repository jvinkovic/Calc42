import { NavLink, Route, Routes } from 'react-router'
import { FourButton } from './pages/FourButton'
import { Home } from './pages/Home'
import { TwoButton } from './pages/TwoButton'

const link = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')

const AUTHOR = 'Josip Vinković'
const LINKEDIN_URL = 'https://www.linkedin.com/in/josipvinkovic/'
const COMPANY = 'Nedotal'
const COMPANY_URL = 'https://nedotal.hr'

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
      <footer className="footer">
        Made by{' '}
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          {AUTHOR}
        </a>
        {' @ '}
        <a href={COMPANY_URL} target="_blank" rel="noreferrer">
          {COMPANY}
        </a>
        {' · '}
        Based on{' '}
        <a href="https://arxiv.org/abs/2603.21852" target="_blank" rel="noreferrer">
          arXiv 2603.21852
        </a>
      </footer>
    </>
  )
}
