import { Button } from '@/components/ui/button'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RefreshCw, SlidersHorizontal } from 'lucide-react'
import { Label } from 'radix-ui/context-menu'
import { Select } from 'radix-ui/select'
import React from 'react'

export default function SidebarFilter() {
  return (
      <aside className="h-fit rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <h2 className="flex items-center gap-2 font-semibold">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="mr-1 h-3 w-3" /> Reset
            </Button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                Category
              </Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="weights">Free Weights</SelectItem>
                  <SelectItem value="recovery">Recovery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                Brand
              </Label>
              <Input
                placeholder="e.g. Rogue, Gymshark"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <Label className="uppercase text-muted-foreground">
                  Max Price/Day
                </Label>
                <span>${priceRange[1]}</span>
              </div>
              <Slider
                value={[priceRange[1]]}
                min={10}
                max={1000}
                step={10}
                onValueChange={(val) => setPriceRange([priceRange[0], val[0]])}
              />
            </div>

            {/* Availability Filter */}
            <div className="flex items-center justify-between pt-2">
              <Label
                htmlFor="available-only"
                className="text-sm font-medium cursor-pointer"
              >
                Available Only
              </Label>
              <Switch
                id="available-only"
                checked={onlyAvailable}
                onCheckedChange={setOnlyAvailable}
              />
            </div>
          </div>
        </aside>
  )
}
