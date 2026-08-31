import { motion } from 'framer-motion'

export default function Reveal({ as: Tag = 'div', className, children, id, style }) {
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  )
}
