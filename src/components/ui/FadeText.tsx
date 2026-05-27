import { useEffect, useRef } from "react";

import gsap from "gsap";

type Props = {
  children: React.ReactNode;

  className?: string;
};

export default function FadeText({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,

      {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      },

      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",

        duration: 1.8,

        ease: "power3.out",
      },
    );
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
