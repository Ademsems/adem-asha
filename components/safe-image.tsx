"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type SafeImageProps = Omit<ImageProps, "onError" | "onLoad" | "fill"> & {
  /** Classes for the aspect-ratio wrapper that reserves the layout space. */
  containerClassName?: string;
};

/**
 * next/image wrapper that never shows a broken-image icon. A branded navy
 * placeholder with aqua "AA" initials fills the reserved space until the
 * image loads; if the file is missing the placeholder simply stays, so the
 * layout is identical whether the photo exists or not.
 */
export function SafeImage({
  containerClassName,
  className,
  alt,
  ...props
}: SafeImageProps) {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    "loading"
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-navy-border bg-navy-light",
        containerClassName
      )}
    >
      {status !== "loaded" ? (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-mono text-5xl font-bold text-aqua/30">AA</span>
        </div>
      ) : null}
      {status !== "error" ? (
        <Image
          {...props}
          fill
          alt={alt}
          className={cn(
            "object-cover transition-opacity duration-500",
            status === "loaded" ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      ) : null}
    </div>
  );
}
