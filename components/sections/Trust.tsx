'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Database, Server, Shield, Zap } from 'lucide-react';
import Matter from 'matter-js';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

const techStack = [
  { name: 'Next.js', pop: 95 },
  { name: 'React', pop: 100 },
  { name: 'TypeScript', pop: 90 },
  { name: 'Node.js', pop: 85 },
  { name: 'PostgreSQL', pop: 80 },
  { name: 'Python', pop: 85 },
  { name: 'TensorFlow', pop: 70 },
  { name: 'OpenAI', pop: 95 },
  { name: 'AWS', pop: 85 },
  { name: 'Vercel', pop: 80 },
  { name: 'Stripe', pop: 75 },
  { name: 'Tailwind', pop: 90 },
  { name: 'Figma', pop: 80 },
  { name: 'GraphQL', pop: 65 },
  { name: 'Docker', pop: 75 }
];

export function Trust() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const techRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Only trigger the physics engine when the section is actually in view
  const isInView = useInView(sceneRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !sceneRef.current || typeof window === 'undefined') return;

    // Prevent re-initialization
    if (engineRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: 400,
        background: 'transparent',
        wireframes: false,
      }
    });
    renderRef.current = render;

    // Hide the canvas since we use HTML elements, but keep it interactive
    render.canvas.style.opacity = '0';
    render.canvas.style.position = 'absolute';
    render.canvas.style.top = '0';
    render.canvas.style.left = '0';
    render.canvas.style.zIndex = '10';

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    const width = sceneRef.current.clientWidth;
    const height = 400;

    // Create bodies
    const techBodies = techStack.map((tech, i) => {
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * -500 - 50;
      const radius = (tech.pop / 2) + 10; // Size based on popularity
      
      return Bodies.circle(x, y, radius, {
        restitution: 0.8,
        friction: 0.1,
        label: tech.name,
        render: { visible: false } // We render via HTML
      });
    });

    const ground = Bodies.rectangle(width / 2, height + 25, width + 100, 50, { isStatic: true });
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, { isStatic: true });

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    
    // Prevent Matter.js from capturing scroll events
    if (mouse.element) {
      const m = mouse as any;
      mouse.element.removeEventListener("mousewheel", m.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", m.mousewheel);
      mouse.element.removeEventListener("touchstart", m.mousedown);
      mouse.element.removeEventListener("touchmove", m.mousemove);
      mouse.element.removeEventListener("touchend", m.mouseup);
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    World.add(world, [...techBodies, ground, leftWall, rightWall, mouseConstraint]);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Sync loop
    Matter.Events.on(engine, 'afterUpdate', () => {
      techBodies.forEach((body) => {
        const el = techRefs.current[body.label];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
        }
      });
    });

    const handleResize = () => {
      if (!sceneRef.current || !renderRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      renderRef.current.canvas.width = newWidth;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 25 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 25, y: height / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
      if (engineRef.current) {
        Engine.clear(engineRef.current);
      }
      engineRef.current = null;
      renderRef.current = null;
      runnerRef.current = null;
    };
  }, [isInView]);

  return (
    <section className="py-24 border-y border-slate-200 bg-hiraya-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center"><span className="text-slate-900">Enterprise-Grade </span><span className="text-gradient">Infrastructure</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We build on top of industry-leading technologies to ensure security, scalability, and performance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Server, label: 'Scalable Architecture' },
            { icon: Shield, label: 'Data Privacy Compliant' },
            { icon: Database, label: 'Resilient Data Systems' },
            { icon: Zap, label: 'High-Performance Edge' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white border border-slate-200 shadow-sm rounded-2xl"
            >
              <item.icon className="w-10 h-10 text-hiraya-blue mb-4 opacity-80" />
              <h3 className="font-semibold text-sm text-slate-900">{item.label}</h3>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center relative">
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-slate-900">Technology Partners & </span><span className="text-gradient">Integrations</span></h2>
            <p className="text-slate-600 mb-8">
              We leverage a modern, scalable tech stack to deliver high-performance solutions. Interact with the technologies we use daily.
            </p>
          </div>
          
          {/* Matter.js Container */}
          <div className="w-full lg:w-2/3 relative">
            <div ref={sceneRef} className="relative w-full h-[400px] bg-white rounded-3xl border border-slate-200 shadow-inner overflow-hidden cursor-grab active:cursor-grabbing">
              {/* HTML overlays synced with Matter.js bodies */}
            {techStack.map((tech) => {
              const radius = (tech.pop / 2) + 10;
              
              return (
                <div
                  key={tech.name}
                  ref={(el) => {
                    techRefs.current[tech.name] = el;
                  }}
                  className="absolute top-0 left-0 bg-slate-900 text-white font-mono font-bold text-sm rounded-full shadow-lg flex items-center justify-center select-none pointer-events-none"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    transform: `translate(-50%, -50%) translate(-1000px, -1000px)`, // Initial off-screen position
                  }}
                >
                  {tech.name}
                </div>
              );
            })}
            
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
