import React from "react";
import Image from "next/image";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedPosts from "@/components/FeaturedPost";
import HomeNewsletterCTA from "@/components/HomeNewsLetterCTA";
import HomeTestimonials from "@/components/HomeTestimonials";
import AboutSection from "@/components/AboutSection";

const HomePage = () => {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/home-bg.jpg"
          alt="background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-[#050816]/50" />

      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_24%)]" />

      <div className="relative z-30">
      
        <Hero />
        <AboutSection />
        <Features />
        <HomeNewsletterCTA />
        <FeaturedPosts />
        <HomeTestimonials />
        
      </div>
    </main>
  );
};

export default HomePage;