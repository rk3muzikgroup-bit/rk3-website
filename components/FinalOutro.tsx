"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { creditsByPath } from "@/data/credits";

export default function FinalOutro({ trigger, path }: { trigger: boolean; path: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);

      // sound sequence
      const rumble = new Audio("/sounds/fx/outro/vault-rumble.mp3");
      rumble.volume = 0.7;
      rumble.play().catch(() => {});

      setTimeout(() => {
        const blast = new Audio("/sounds/fx/outro/vault-blast.mp3");
        blast.volume = 0.8;
        blast.play().catch(() => {});
      }, 1000);

      setTimeout(() => {
        const fade = new Audio("/sounds/fx/outro/vault-fade.mp3");
        fade.volume = 0.6;
        fade.play().catch(() => {});
      }, 2500);
    }
  }, [trigger]);

  const messages = creditsByPath[path] || creditsByPath["final"];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
        >
          {/* Scrolling Credits */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 20, ease: "linear" }}
            className="text-center text-white text-2xl space-y-6"
          >
            {messages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
