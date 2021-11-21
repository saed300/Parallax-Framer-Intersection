import React, {useEffect} from 'react'
import {motion, useViewportScroll, useTransform, useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Home = () => {

  //useViewportscroll hook
  const {scrollY} = useViewportScroll()

  //If the ScrollY of the box is within a range of 0 - 300, then the Y of each box will be pushed up/down at different speeds//
  const parallaxY1 = useTransform(scrollY, [0, 300], [0, -100])
  const parallaxY2 = useTransform(scrollY, [0, 300], [0, -200])
  const parallaxY3 = useTransform(scrollY, [0, 300], [0, 100])
  const parallaxY4 = useTransform(scrollY, [0, 300], [0, 200])


  //Use Animation hook
  const controls = useAnimation();

  //Intersection O API
  console.log(scrollY.current)

  const {ref, inView, entry} = useInView({
    root: null,
    threshold: 0.2
    //triggerOnce: 'true', for effect to only occur once
  })

  useEffect(() => {
    if(inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        borderRadius: '50%',
        yoyo: 1000,
        repeatCount: 1000,
        transition: {
        duration: 2,
        ease: [0.23, 0.43, 0.13, 0.84],    
      }
      })
    }
    if(!inView) {
      controls.start({
        opacity: 0,
        scale: 0.2,
      })
    }
  }, [inView])

  return (
    <div className='parent'>
      <motion.div className='box centre' style={{y: parallaxY1}}></motion.div>
      <motion.div className='box centre' style={{y: parallaxY2}}></motion.div>
      <motion.div className='box centre' style={{y: parallaxY3}}></motion.div>
      <motion.div className='box centre' style={{y: parallaxY4}}></motion.div>
      <motion.div ref={ref} className='box massive' style={{y: parallaxY4}} animate={controls}></motion.div>

    </div>
  )
}

export default Home
