import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useGoogleAnalytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      if (typeof window !== "undefined") {
        if (window.gtag) {
          window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
            page_location: url,
          });
        }
        if (window.snaptr) {
          window.snaptr("track", "PAGE_VIEW", {
            description: url,
          });
        }
      }
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return {};
}
