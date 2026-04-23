"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const mockStations = [
  { id: 1, name: "Central High School", address: "123 Main St", distance: "0.8 miles" },
  { id: 2, Library: "Community Library", address: "456 Oak Ave", distance: "1.2 miles" },
  { id: 3, name: "Downtown City Hall", address: "789 Center Blvd", distance: "2.5 miles" },
];

export default function PollingLocator() {
  return (
    <section className="py-20 px-4 bg-[#0a192f]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Your <span className="text-cyan-400">Polling Station</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Locate where you need to go on Election Day.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mock Map */}
          <div className="flex-1 glass-card rounded-2xl overflow-hidden relative min-h-[400px] flex items-center justify-center border border-cyan-500/20 bg-[#020c1b]/80">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="z-10 text-center">
              <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-bounce" />
              <p className="text-gray-300 font-medium">Interactive Map Simulation</p>
              <p className="text-sm text-gray-500 mt-2">Showing locations near you</p>
            </div>
            
            {/* Mock map pins */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan]"></div>
            <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_blue]"></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_blue]"></div>
          </div>

          {/* Location List */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {mockStations.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-5 rounded-xl hover:bg-white/5 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold text-lg">{station.name || station.Library}</h3>
                    <p className="text-gray-400 text-sm mt-1">{station.address}</p>
                    <p className="text-cyan-400 text-sm font-medium mt-2">{station.distance}</p>
                  </div>
                  <button className="p-3 rounded-full bg-[#0a192f] group-hover:bg-cyan-500 transition-colors">
                    <Navigation className="w-5 h-5 text-cyan-400 group-hover:text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
            
            <button className="mt-4 w-full py-4 glass-card rounded-xl text-white font-semibold hover:bg-white/10 transition-colors border border-cyan-500/30">
              View All Locations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
