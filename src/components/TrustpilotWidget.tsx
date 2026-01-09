import { useEffect, useRef } from "react";

interface TrustpilotWidgetProps {
  className?: string;
}

const TrustpilotWidget = ({ className = "" }: TrustpilotWidgetProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Trustpilot widget when component mounts
    if (window.Trustpilot && ref.current) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`trustpilot-widget ${className}`}
      data-locale="fr-FR"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="696141886dbfa67274073b20"
      data-style-height="52px"
      data-style-width="100%"
      data-token="f9855238-ae5f-4ab8-9e71-2b059b639bc5"
    >
      <a
        href="https://www.trustpilot.com/review/mysitefactory.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-colors"
      >
        Trustpilot
      </a>
    </div>
  );
};

// Extend Window interface for Trustpilot
declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, reload?: boolean) => void;
    };
  }
}

export default TrustpilotWidget;
