"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WarpFlash from "@/components/WarpFlash";
import WarpRipple from "@/components/WarpRipple";
import PortalBurst from "@/components/PortalBurst";
import { realmFxConfig, RealmStyle } from "@/config/realmFxConfig";

type Props = {
  path: string;
  icon?: string;
  flashColor?: string;
  style?: RealmStyle; // street | soul | spirit | cosmic
};

export default function SecretPortal({
  path,
  icon = "🌀",
  flashColor = "white",
  style = "street", // default realm
}: Props) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [realm, setRealm] = useState<RealmStyle>(style);

  useEffect(() => {
    const chance = Math.random();

    // Rare Cosmic Easter Egg (5% chance)
    if (chance > 0.95) {
      setRealm("cosmic");
      setVisible(true);
    } else if (chance > 0.8) {
      setRealm(style);
      setVisible(true);
    }
  }, [style]);

  if (!visible) return null;

  const handleClick = () => {
    // Realm-specific sound
    let soundPath = `/sounds/fx/warp/${realm}-portal.mp3`;
    if (realm === "street") soundPath = "/sounds/fx/warp/street-portal.mp3";
    if (realm === "soul") soundPath = "/sounds/fx/warp/soul-portal.mp3";
    if (realm === "spirit") soundPath = "/sounds/fx/warp/spirit-portal.mp3";
    if (realm === "cosmic") soundPath = "/sounds/fx/warp/cosmic-portal.mp3";

    const warp = new Audio(soundPath);
    warp.volume = 0.8;
    warp.play().catch(() => {});

    setActive(true);
    setTimeout(() => {
      setActive(false);
      window.location.href = path;
    }, 1000);
  };

  // Grab FX + idle styles from config
  const realmConfig = realmFxConfig[realm];

  return (
    <>
      {/* Warp FX layers */}
      <WarpFlash active={active} color={flashColor} variant={realmConfig.flash} />
      <WarpRipple active={active} color={flashColor} variant={realmConfig.ripple} />
      <PortalBurst active={active} color={flashColor} variant={realmConfig.burst} />

      {/* Glyph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-10 right-10 cursor-pointer z-40"
        onClick={handleClick}
      >
        <motion.div
          animate={realmConfig.idleAnimation}
          transition={realmConfig.idleTransition}
          className="text-4xl"
        >
          {icon}
        </motion.div>
      </motion.div>
    </>
  );
}
