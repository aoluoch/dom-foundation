import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import WhoWeAre from './pages/WhoWeAre'
import OurWork from './pages/OurWork'
import PillarDetail from './pages/PillarDetail'
import Impact from './pages/Impact'
import StoryDetail from './pages/StoryDetail'
import GetInvolved from './pages/GetInvolved'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="who-we-are" element={<WhoWeAre />} />
        <Route path="our-work" element={<OurWork />} />
        <Route path="our-work/:slug" element={<PillarDetail />} />
        <Route path="impact" element={<Impact />} />
        <Route path="impact/:slug" element={<StoryDetail />} />
        <Route path="get-involved" element={<GetInvolved />} />
        <Route path="resources" element={<Resources />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
