"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error";

type ToastItem = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (t: Omit<ToastItem, "id">) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const dismiss = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { ...t, id }]);
      setTimeout(() => dismiss(id), 6000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-20 z-[60] flex w-full max-w-sm flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              role="status"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-lg border bg-navy-light p-4 shadow-lg",
                t.variant === "success" ? "border-aqua/50" : "border-red-400/50"
              )}
            >
              {t.variant === "success" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-aqua" aria-hidden />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-heading">{t.title}</p>
                {t.description ? (
                  <p className="mt-1 text-sm text-body">{t.description}</p>
                ) : null}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="text-body transition-colors hover:text-heading"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
