import { useEffect, useRef } from "react";

import { useScene } from "../../context/SceneContext";

type Props = {
  theme: string;

  children: React.ReactNode;
};

export default function SceneSection({ theme, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  const { setTheme } = useScene();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTheme(theme);
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [theme]);

  return <section ref={ref}>{children}</section>;
}
