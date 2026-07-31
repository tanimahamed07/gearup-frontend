import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type IUser = {
  success: boolean;
  message: string;
  data: {
    profile: {
      name: string;
      id: string;
      email: string;
      role: "USER" | "PROVIDER" | "ADMIN";
      status: string;
      phone: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

// Category Type
export type ICategory = {
  id: string;
  name: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

// Review Type
export type Review = {
  id: string;
  rating: number; // e.g., 1 to 5
  comment?: string;
  userId: string;
  gearId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

// Full GearItem Type (Matching your Prisma Schema)
export type IGearItem = {
  id: string;
  name: string;
  brand: string;
  description: string;
  image?: string; // Optional image URL (field name from backend)
  pricePerDay: number | string; // Prisma Decimal returns as string or number in JSON
  stock: number;
  isAvailable: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  providerId: string;
  categoryId: string;
  category?: ICategory;
  reviews?: Review[];
};

export type ISidebarItem = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};




