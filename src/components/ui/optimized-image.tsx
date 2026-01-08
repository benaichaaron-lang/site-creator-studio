import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  priority?: boolean; // Load immediately without lazy loading
}

/**
 * OptimizedImage - A performance-optimized image component
 * Features:
 * - Native lazy loading (loading="lazy")
 * - Intersection Observer for fine-grained control
 * - Blur placeholder during load
 * - Fade-in animation on load
 * - Error state handling
 */
export const OptimizedImage = ({
  src,
  alt,
  className,
  placeholderClassName,
  priority = false,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)} ref={imgRef}>
      {/* Placeholder/skeleton */}
      <div
        className={cn(
          "absolute inset-0 bg-muted/30 animate-pulse transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100",
          placeholderClassName
        )}
      />
      
      {/* Actual image */}
      {(isInView || priority) && (
        <img
          src={hasError ? "/placeholder.svg" : src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      )}
    </div>
  );
};

/**
 * LazyVideo - A performance-optimized video component
 * Features:
 * - Intersection Observer for lazy loading
 * - Poster image support
 * - Autoplay when in view
 */
interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
  priority?: boolean;
}

export const LazyVideo = ({
  src,
  poster,
  className,
  priority = false,
  ...props
}: LazyVideoProps) => {
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div className={cn("relative overflow-hidden", className)} ref={containerRef}>
      {isInView ? (
        <video
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-muted/30 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
