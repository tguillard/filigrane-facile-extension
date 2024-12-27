import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo(url) {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <img
        src={url}
        alt="Photo prévisualisée"
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
  )
}
