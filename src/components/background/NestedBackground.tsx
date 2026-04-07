import { ReactNode } from 'react';
import './NestedBackground.css';
import { useSpring, animated } from '@react-spring/web';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
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
        <div className="flex items-center justify-end w-full absolute gap-2 pr-4">
          <span className="text-black dark:text-white text-sm">Dark Mode</span>
          <button
            onClick={onToggleDarkMode}
            className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer"
            style={{ backgroundColor: darkMode ? '#f69709' : '#ccc' }}
            aria-label="Toggle dark mode"
          >
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300"
              style={{ transform: darkMode ? 'translateX(24px)' : 'translateX(0)' }}
            />
          </button>
        </div>
        <Navbar routes={routes} />
      </div>

      <div className="absolute top-[70px] w-[90vw] block">
        {children}
        <Footer />
      </div>
    </div>
  );
}
