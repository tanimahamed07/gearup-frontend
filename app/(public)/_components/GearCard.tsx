import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Package, Tag, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IGearItem } from "@/lib/types/types";

export default function GearCard({ item }: { item: IGearItem }) {
  // Debug: Log the image URL
  console.log("Gear item:", item.name, "Image URL:", item.image);

  return (
    <Card className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-card p-0 pt-0 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      <div>
        {/* Full-width Image Section */}
        <div className="relative h-40 w-full overflow-hidden rounded-t-xl bg-muted">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={item.image.startsWith("http://localhost")}
              onError={(e) => {
                console.error("Image failed to load:", item.image);
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
              <Package className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}

          {/* Availability Badge Overlay */}
          <div className="absolute top-2.5 right-2.5">
            {item.isAvailable && item.stock > 0 ? (
              <Badge className="bg-emerald-500/90 text-white backdrop-blur-md shadow-sm border-0 text-[10px] px-2 py-0.5">
                <CheckCircle2 className="mr-1 h-3 w-3" /> In Stock
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="shadow-sm text-[10px] px-2 py-0.5"
              >
                <XCircle className="mr-1 h-3 w-3" /> Out of Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Card Header Section - Compacted */}
        <CardHeader className="p-3.5 pb-1">
          <div className="mb-1 flex items-center justify-between gap-2">
            <Badge
              variant="secondary"
              className="px-2 py-0 text-[10px] font-medium bg-secondary/60"
            >
              <Tag className="mr-1 h-2.5 w-2.5" />{" "}
              {item.category?.name || "General"}
            </Badge>
            <span className="text-[11px] text-muted-foreground font-medium">
              Stock: {item.stock}
            </span>
          </div>
          <CardTitle className="line-clamp-1 text-base font-bold text-foreground transition-colors group-hover:text-primary">
            {item.name}
          </CardTitle>
          <p className="text-[11px] text-muted-foreground font-medium">
            By <span className="text-foreground/80">{item.brand}</span>
          </p>
        </CardHeader>

        {/* Card Content Section - Compacted */}
        <CardContent className="p-3.5 pt-1 pb-2">
          <p className="line-clamp-2 text-xs text-muted-foreground/90 leading-relaxed">
            {item.description}
          </p>
        </CardContent>
      </div>

      {/* Card Footer Section */}
      <CardFooter className="flex items-center justify-between gap-3 p-3.5 pt-2 border-t border-border/40 bg-muted/20">
        <div className="flex items-baseline">
          <span className="text-lg font-extrabold text-primary">
            ${Number(item.pricePerDay).toFixed(2)}
          </span>
          <span className="text-[10px] text-muted-foreground ml-0.5">/day</span>
        </div>

        <Button
          asChild
          size="sm"
          className="h-8 px-3 text-xs font-semibold shadow-sm transition-all"
          disabled={!item.isAvailable || item.stock === 0}
        >
          <Link href={`/gears/${item.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
