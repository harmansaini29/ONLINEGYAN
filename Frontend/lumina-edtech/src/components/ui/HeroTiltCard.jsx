import React, { useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function HeroTiltCard({ children, className }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      x.set((clientX - left) / width - 0.5);
      y.set((clientY - top) / height - 0.5);
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{
          rotateX: useTransform(mouseY, [-0.5, 0.5], [7, -7]),
          rotateY: useTransform(mouseX, [-0.5, 0.5], [-7, 7]),
          transformStyle: "preserve-3d",
        }}
        className={`relative z-20 ${className}`}
      >
        {children}
      </motion.div>
    );
}