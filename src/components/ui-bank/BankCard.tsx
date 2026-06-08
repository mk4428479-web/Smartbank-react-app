import { motion } from "framer-motion";
import type { Card as CardType } from "@/data/mockData";
import { HiOutlineWifi } from "react-icons/hi2";

export function BankCard({ card, onClick }: { card: CardType; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, rotateX: 2 }}
      className={`text-left relative rounded-2xl p-6 w-full aspect-[1.6] text-white shadow-elegant overflow-hidden ${
        card.frozen ? "bg-slate-700" : "gradient-card"
      }`}
    >
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex justify-between items-start">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/70">{card.variant}</div>
          <div className="font-display font-bold text-lg">SmartBank</div>
        </div>
        <HiOutlineWifi className="h-6 w-6 rotate-90" />
      </div>
      <div className="relative mt-8 font-mono text-lg tracking-[0.3em]">•••• •••• •••• {card.last4}</div>
      <div className="relative mt-4 flex justify-between items-end text-sm">
        <div>
          <div className="text-[10px] uppercase text-white/60">Holder</div>
          <div className="font-medium">{card.holder}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-white/60">Expires</div>
          <div className="font-medium">{card.expiry}</div>
        </div>
        <div className="font-display font-bold italic">{card.type}</div>
      </div>
      {card.frozen && <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/20 text-xs">Frozen</div>}
    </motion.button>
  );
}
