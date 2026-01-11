import { motion } from "framer-motion";

// Crypto icons as inline SVGs for better performance
export const BitcoinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#F7931A"/>
    <path d="M22.5 14.1c.3-2-1.2-3-3.3-3.8l.7-2.7-1.6-.4-.6 2.6c-.4-.1-.9-.2-1.3-.3l.7-2.6-1.6-.4-.7 2.7c-.3-.1-.7-.2-1-.3l-2.3-.6-.4 1.7s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 0 .1 0 .2.1h-.2l-1.1 4.5c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.8 2.1.5c.4.1.8.2 1.2.3l-.7 2.8 1.6.4.7-2.7c.4.1.9.2 1.3.3l-.7 2.7 1.6.4.7-2.8c2.9.5 5.1.3 6-2.3.7-2.1-.04-3.3-1.5-4.1 1.1-.2 1.9-1 2.1-2.5zM19 18.7c-.5 2.1-4.1 1-5.2.7l.9-3.7c1.1.3 4.9.8 4.3 3zm.5-4.6c-.5 1.9-3.4.9-4.3.7l.8-3.3c.9.2 4.1.6 3.5 2.6z" fill="white"/>
  </svg>
);

export const EthereumIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#627EEA"/>
    <path d="M16 4v8.87l7.5 3.35L16 4z" fill="white" fillOpacity="0.6"/>
    <path d="M16 4L8.5 16.22 16 12.87V4z" fill="white"/>
    <path d="M16 21.97v6.03l7.5-10.39L16 21.97z" fill="white" fillOpacity="0.6"/>
    <path d="M16 28V21.97l-7.5-4.36L16 28z" fill="white"/>
    <path d="M16 20.57l7.5-4.35L16 12.87v7.7z" fill="white" fillOpacity="0.2"/>
    <path d="M8.5 16.22l7.5 4.35v-7.7l-7.5 3.35z" fill="white" fillOpacity="0.6"/>
  </svg>
);

export const USDCIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#2775CA"/>
    <path d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z" fill="#2775CA"/>
    <path d="M19.5 18.5c0-1.5-1-2-3-2.5-1.5-.3-1.8-.5-1.8-1s.5-.8 1.3-.8c.7 0 1.2.3 1.4.9l1.6-.6c-.4-1.1-1.4-1.8-2.5-1.9v-1.4h-1.5v1.4c-1.5.2-2.5 1.2-2.5 2.5 0 1.5 1 2 2.5 2.3 1.5.4 2.3.6 2.3 1.2s-.6 1-1.5 1c-.9 0-1.5-.4-1.8-1.2l-1.6.7c.4 1.2 1.5 2 2.9 2.1v1.4h1.5v-1.4c1.7-.2 2.7-1.3 2.7-2.7z" fill="white"/>
  </svg>
);

export const USDTIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#26A17B"/>
    <path d="M17.9 17.9v-.003c-.1 0-.7.05-2 .05-1 0-1.7-.03-1.9-.05v.003c-3.8-.2-6.6-.8-6.6-1.6 0-.8 2.8-1.4 6.6-1.6v2.5c.3.03.9.06 2 .06 1.2 0 1.8-.04 1.9-.06v-2.5c3.8.2 6.6.8 6.6 1.6 0 .8-2.8 1.4-6.6 1.6zm0-3.4v-2.3h4.8v-3.5H9.3v3.5h4.8v2.3c-4.3.2-7.5 1-7.5 2 0 1.1 3.2 1.9 7.5 2v7.2h3.8v-7.2c4.3-.2 7.5-1 7.5-2 0-1-3.2-1.8-7.5-2z" fill="white"/>
  </svg>
);

interface CryptoBadgeProps {
  variant?: "default" | "compact" | "glow";
  showText?: boolean;
  className?: string;
}

const CryptoBadge = ({ variant = "default", showText = true, className = "" }: CryptoBadgeProps) => {
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <BitcoinIcon className="w-4 h-4" />
        <EthereumIcon className="w-4 h-4" />
        <USDCIcon className="w-4 h-4" />
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <motion.div 
        className={`flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#F7931A]/10 via-[#627EEA]/10 to-[#26A17B]/10 border border-white/10 backdrop-blur-sm ${className}`}
        whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <BitcoinIcon className="w-5 h-5" />
          <EthereumIcon className="w-5 h-5" />
          <USDCIcon className="w-5 h-5" />
        </div>
        {showText && (
          <span className="text-sm text-white/70 font-medium">Crypto Accepted</span>
        )}
      </motion.div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1.5">
        <BitcoinIcon className="w-5 h-5" />
        <EthereumIcon className="w-5 h-5" />
        <USDCIcon className="w-5 h-5" />
        <USDTIcon className="w-5 h-5" />
      </div>
      {showText && (
        <span className="text-sm text-white/60">BTC • ETH • USDC • USDT</span>
      )}
    </div>
  );
};

export default CryptoBadge;
