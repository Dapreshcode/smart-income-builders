"use client";

import Link from "next/link";
import { DollarSign, Mail, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const data = [
    {
      id: 1,
      title: "Make Money Online",
      desc: "Step-by-step systems to start earning income online.",
      icon: DollarSign,
    },
    {
      id: 2,
      title: "Email Marketing",
      desc: "Build and monetize your audience the right way.",
      icon: Mail,
    },
    {
      id: 3,
      title: "Tools & Growth Guides",
      desc: "Discover tools and frameworks to scale faster.",
      icon: Wrench,
    },
  ];

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What You’ll Learn
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Everything you need to start, grow, and scale your online income.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/category/${slugify(item.title)}`}>
                  <div className="group relative rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)] cursor-pointer">
                    <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-orange-500/10 to-transparent transition" />

                    <div className="relative z-10">
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10 text-orange-400">
                        <Icon size={22} />
                      </div>

                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm text-gray-400 leading-6">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
};

export default Features;