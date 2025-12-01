import { useEffect } from 'react';

export function ClarityTracking() {
  useEffect(() => {
    // Check if Clarity is already loaded
    if (window.clarity) {
      return;
    }

    // Create and inject the Clarity script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "uekagqavsa");
    `;
    
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed (optional)
      // Note: Clarity script intentionally left in place for session continuity
    };
  }, []);

  return null; // This component doesn't render anything
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}
