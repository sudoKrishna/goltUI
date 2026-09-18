"use client";

import ButtonDefault from "./buttons/ButtonDefault";
import ButtonSizes from "./buttons/ButtonSizes";
import ButtonDestructive from "./buttons/ButtonDestructive";
import ButtonSpinner from "./buttons/ButtonSpinner";

export default function Button() {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <ButtonDefault />
      <ButtonSizes />
      <ButtonDestructive />
      <ButtonSpinner />
    </section>
  );
}
