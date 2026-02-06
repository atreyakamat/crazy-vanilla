import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RoseDay from './components/RoseDay'
import ProposeDay from './components/ProposeDay'
import ChocolateDay from './components/ChocolateDay'
import TeddyDay from './components/TeddyDay'
import PromiseDay from './components/PromiseDay'
import HugDay from './components/HugDay'
import KissDay from './components/KissDay'
import ValentinesDay from './components/ValentinesDay'
import LandingPage from './components/LandingPage'
import SecretMessage from './components/shared/SecretMessage'
import DayNavigation from './components/shared/DayNavigation'
import TimeGreeting from './components/shared/TimeGreeting'
import AmbientParticles from './components/shared/AmbientParticles'
import CursorTrail from './components/shared/CursorTrail'
import LoveLetter from './components/shared/LoveLetter'
import './App.css'

// Wrapper component that adds ambient elements to each day
function DayWrapper({ children, particleType = 'sparkle', trailColor = 'rose', showGreeting = false }) {
  return (
    <>
      {showGreeting && <TimeGreeting />}
      <AmbientParticles type={particleType} count={15} speed="slow" />
      <CursorTrail color={trailColor} />
      <DayNavigation />
      <SecretMessage />
      <LoveLetter />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Day 1 - Rose Day */}
        <Route path="/nidhikaroseroseka" element={
          <DayWrapper particleType="rose" trailColor="rose" showGreeting={true}>
            <RoseDay />
          </DayWrapper>
        } />
        <Route path="/day1" element={
          <DayWrapper particleType="rose" trailColor="rose">
            <RoseDay />
          </DayWrapper>
        } />
        
        {/* Day 2 - Propose Day */}
        <Route path="/nidhikawillshesayyes" element={
          <DayWrapper particleType="heart" trailColor="love">
            <ProposeDay />
          </DayWrapper>
        } />
        <Route path="/nidhikaproposeday" element={
          <DayWrapper particleType="heart" trailColor="love">
            <ProposeDay />
          </DayWrapper>
        } />
        <Route path="/day2" element={
          <DayWrapper particleType="heart" trailColor="love">
            <ProposeDay />
          </DayWrapper>
        } />
        
        {/* Day 3 - Chocolate Day */}
        <Route path="/nidhikachocolatelove" element={
          <DayWrapper particleType="warm" trailColor="golden">
            <ChocolateDay />
          </DayWrapper>
        } />
        <Route path="/nidhikachocolateday" element={
          <DayWrapper particleType="warm" trailColor="golden">
            <ChocolateDay />
          </DayWrapper>
        } />
        <Route path="/day3" element={
          <DayWrapper particleType="warm" trailColor="golden">
            <ChocolateDay />
          </DayWrapper>
        } />
        
        {/* Day 4 - Teddy Day */}
        <Route path="/nidhikateddyhug" element={
          <DayWrapper particleType="sparkle" trailColor="warm">
            <TeddyDay />
          </DayWrapper>
        } />
        <Route path="/nidhikateddyday" element={
          <DayWrapper particleType="sparkle" trailColor="warm">
            <TeddyDay />
          </DayWrapper>
        } />
        <Route path="/day4" element={
          <DayWrapper particleType="sparkle" trailColor="warm">
            <TeddyDay />
          </DayWrapper>
        } />
        
        {/* Day 5 - Promise Day */}
        <Route path="/nidhikapromiseforever" element={
          <DayWrapper particleType="sparkle" trailColor="rose">
            <PromiseDay />
          </DayWrapper>
        } />
        <Route path="/nidhikapromiseday" element={
          <DayWrapper particleType="sparkle" trailColor="rose">
            <PromiseDay />
          </DayWrapper>
        } />
        <Route path="/day5" element={
          <DayWrapper particleType="sparkle" trailColor="rose">
            <PromiseDay />
          </DayWrapper>
        } />
        
        {/* Day 6 - Hug Day */}
        <Route path="/nidhikawarmhug" element={
          <DayWrapper particleType="warm" trailColor="warm">
            <HugDay />
          </DayWrapper>
        } />
        <Route path="/nidhikahugday" element={
          <DayWrapper particleType="warm" trailColor="warm">
            <HugDay />
          </DayWrapper>
        } />
        <Route path="/day6" element={
          <DayWrapper particleType="warm" trailColor="warm">
            <HugDay />
          </DayWrapper>
        } />
        
        {/* Day 7 - Kiss Day */}
        <Route path="/nidhikakiss" element={
          <DayWrapper particleType="heart" trailColor="love">
            <KissDay />
          </DayWrapper>
        } />
        <Route path="/nidhikakissday" element={
          <DayWrapper particleType="heart" trailColor="love">
            <KissDay />
          </DayWrapper>
        } />
        <Route path="/day7" element={
          <DayWrapper particleType="heart" trailColor="love">
            <KissDay />
          </DayWrapper>
        } />
        
        {/* Day 8 - Valentine's Day */}
        <Route path="/nidhikavalentine" element={
          <DayWrapper particleType="heart" trailColor="love">
            <ValentinesDay />
          </DayWrapper>
        } />
        <Route path="/nidhikavalentinesday" element={
          <DayWrapper particleType="heart" trailColor="love">
            <ValentinesDay />
          </DayWrapper>
        } />
        <Route path="/day8" element={
          <DayWrapper particleType="heart" trailColor="love">
            <ValentinesDay />
          </DayWrapper>
        } />
      </Routes>
    </Router>
  )
}

export default App
