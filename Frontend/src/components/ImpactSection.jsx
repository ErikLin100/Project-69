import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { title: 'Real-time Insights', description: 'Stay on top of emerging trends and issues as they happen.' },
  { title: 'Agile Response', description: 'Quickly adapt to changing customer needs and preferences.' },
  { title: 'Continuous Improvement', description: 'Enable ongoing refinement of products, services, and processes.' },
  { title: 'Customer Engagement', description: 'Show customers their opinions are valued, fostering loyalty.' },
  { title: 'Competitive Edge', description: 'Stay ahead by constantly fine-tuning offerings based on customer input.' },
  { title: 'Early Problem Detection', description: 'Catch and address issues before they become major problems.' },
  { title: 'Performance Tracking', description: 'Measure improvements over time with consistent metrics.' },
  { title: 'Employee Motivation', description: 'Boost team morale and performance by sharing positive feedback.' }
];

function ImpactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = section.querySelectorAll('.timeline-item');

    gsap.fromTo(items, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-opensans text-center mb-12 text-indigo-800">The Impact of Frequent Feedback</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-indigo-200"></div>
          {benefits.map((benefit, index) => (
            <div key={index} className={`timeline-item flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
              <div className="w-5/12 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-indigo-800">{benefit.title}</h3>
                <p className="text-indigo-900">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactSection;