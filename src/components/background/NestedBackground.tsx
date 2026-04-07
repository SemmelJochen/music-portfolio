import { ReactNode } from 'react';
import './NestedBackground.css';
import { useSpring, animated } from '@react-spring/web';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import AudioPlayer from '../ui/AudioPlayer';
import type { RoutesMap } from '../../App';

const calc = (x: number, y: number): [number, number] => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x: number, y: number) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x: number, y: number) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
const trans3 = (x: number, y: number) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
const trans4 = (x: number, y: number) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;
const trans5 = (x: number, y: number) => `translate3d(${x / 10 - 250}px,${y / 9 - 200}px,0)`;
const trans6 = (x: number, y: number) => `translate3d(${x / 15 + 35}px,${y / 15 - 230}px,0)`;
const trans7 = (x: number, y: number) => `translate3d(${x / 100 + 35}px,${y / 100}px,0)`;

interface Props {
  routes: RoutesMap;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  children: ReactNode;
}

export default function NestedBackground({ routes, darkMode, onToggleDarkMode, children }: Props) {
  const [springs, api] = useSpring(() => ({
    xy: [0, 0] as [number, number],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  return (
    <div
      className="bg-surface dark:bg-surface-dark flex items-center justify-center overflow-x-hidden absolute w-full h-full"
      onMouseMove={({ clientX: x, clientY: y }) => api.start({ xy: calc(x, y) })}
    >
      <animated.div className="stars1" style={{ transform: springs.xy.to(trans1) }} />
      <animated.div className="stars2" style={{ transform: springs.xy.to(trans2) }} />
      <animated.div className="stars3" style={{ transform: springs.xy.to(trans3) }} />
      <animated.div className="stars4" style={{ transform: springs.xy.to(trans4) }} />
      <animated.div className="stars02" style={{ transform: springs.xy.to(trans7) }} />

      <animated.div className="moon" style={{ transform: springs.xy.to(trans2) }} />
      <animated.div className="saturn" style={{ transform: springs.xy.to(trans1) }} />
      <animated.div className="jupiter" style={{ transform: springs.xy.to(trans5) }} />
      <animated.div className="uranus" style={{ transform: springs.xy.to(trans6) }} />

      <animated.div className="fog" style={{ transform: springs.xy.to(trans1) }} />
      <animated.div className="fog" style={{ transform: springs.xy.to(trans2) }} />

      <div className="navbar-container">
        <div className="flex items-center justify-end w-full absolute pr-4">
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-full
                       bg-black/5 dark:bg-white/10
                       text-black/60 dark:text-white/60
                       hover:text-black dark:hover:text-white
                       hover:bg-black/10 dark:hover:bg-white/20
                       transition-all duration-300 cursor-pointer border-none"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
        <Navbar routes={routes} />
      </div>

      <div className="absolute top-[70px] w-[90vw] block">
        {children}
        <Footer />
      </div>

      <AudioPlayer />
    </div>
  );
}
