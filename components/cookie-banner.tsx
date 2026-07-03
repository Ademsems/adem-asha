"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "aa-cookie-consent";

/**
 * Records "accepted" | "declined" in localStorage. No tracking scripts are
 * loaded on this site yet; the stored choice gates any analytics added later.
 */
export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // Storage unavailable (private mode etc.) — skip the banner rather than crash.
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Ignore storage failures; the banner simply closes for this visit.
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 64 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-border bg-navy-light/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-body">
              This site uses local storage to remember your preferences. No
              tracking cookies are set unless you accept.
            </p>
            <div className="flex shrink-0 gap-3">
              <Button size="sm" variant="solid" onClick={() => choose("accepted")}>
                Accept
              </Button>
              <Button size="sm" variant="ghost" onClick={() => choose("declined")}>
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
