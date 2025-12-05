'use client';

import { motion } from 'framer-motion';
import SimpleLogoLoop from './SimpleLogoLoop';

export default function Statistics() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* University Logos Loop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SimpleLogoLoop />
        </motion.div>
      </div>
    </section>
  );
}
