'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import ProductivitySlider from './ProductivitySlider';

type Item = {
  id: string;
  name: string;
  collection: string;
  image: string;
};

const items: Item[] = [
  {
    id: '1',
    name: 'R.E.S Hoodie',
    collection: 'Educated Core',
    image: '/Images/men-hoodie-front-view.png',
  },
  {
    id: '2',
    name: 'R.E.S Cap',
    collection: 'Everyday Leaders',
    image: '/Images/Cap_Mockup-removebg-preview(1).png',
  },
  {
    id: '3',
    name: 'R.E.S T-Shirt',
    collection: 'Campus Edition',
    image: '/Images/men-t-shirt-front-view.png',
  },
  {
    id: '4',
    name: 'R.E.S Tote',
    collection: 'Student Utility',
    image: '/Images/Tote Bag Mockup, Front View.png',
  },
];

/**
 * Merch showcase carousel
 * @param {object} props
 * @param {number} [props.dragSpeed=1] - Multiplier for drag sensitivity (increase for faster scroll, decrease for slower)
 */
export default function ShopRoomzaEducatedWear({ dragSpeed = 1 }: { dragSpeed?: number }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const { scrollXProgress } = useScroll({
    container: trackRef,
  });

  // Drag-to-scroll state & refs
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Multiplier for drag speed (tunable via prop `dragSpeed`)
  const MULTIPLIER = Math.max(0.1, dragSpeed); // clamp to avoid 0 or negative values

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDown(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    if (!trackRef.current) return;
    setIsDown(false);
  };

  const onMouseUp = () => {
    if (!trackRef.current) return;
    setIsDown(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * MULTIPLIER; // multiplier for speed
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setIsDown(true);
    startX.current = e.touches[0].pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDown || !trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * MULTIPLIER;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchEnd = () => {
    setIsDown(false);
  };

  // Smooth scroll helper for keyboard navigation
  const scrollByOffset = (amount: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Keyboard navigation: left/right arrows scroll the carousel
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!trackRef.current) return;
    const containerWidth = trackRef.current.clientWidth;

    switch (e.key) {
      case 'ArrowRight':
        // scroll by ~60% of container width
        scrollByOffset(containerWidth * 0.6);
        e.preventDefault();
        break;
      case 'ArrowLeft':
        scrollByOffset(-containerWidth * 0.6);
        e.preventDefault();
        break;
      default:
        break;
    }
  }; 

  return (
    <section className="bg-[#F2F2F2] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="mb-10">
         <p style={{ fontFamily: '"Work Sans", system-ui, sans-serif' }} className="text-[clamp(1.375rem,6vw,4rem)] md:text-[clamp(1.75rem,4.2vw,5rem)] font-extrabold leading-tight text-[#1C1C1C] uppercase tracking-[0.3em] mb-3">
            Shop Roomza’s Educated Wear
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0B0B0B] mb-2">
            Designed for thinkers
          </h2>
        </div>

        {/* Horizontal slider */}
        <div
          ref={trackRef}
          className={`relative overflow-x-auto no-scrollbar snap-x snap-mandatory pl-6 md:pl-12 pr-6 md:pr-12 ${isDown ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onKeyDown={(e) => onKeyDown(e)}
          role="list"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Merchandise carousel, swipe or drag to scroll"
        >
          <ProductivitySlider items={items} initialIndex={0} dragSpeed={1.1} autoplay autoplayInterval={8000} slideTransitionDuration={1200} showProgress />
        </div>



        {/* CTA */}
        <div className="mt-12">
          <Link
            href="/merch"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B0B0B] hover:opacity-70 transition"
          >
            View full collection
            <span className="w-6 h-[1px] bg-[#0B0B0B]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
