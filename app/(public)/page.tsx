import React from "react";
import { getAllGearItems } from "./_action/getAllGear";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  console.log("=========>", query);
  const gears = await getAllGearItems({ query });

  console.log("---------->", gears);
  return (
    <div>
      <p>Home page</p>
    </div>
  );
}
