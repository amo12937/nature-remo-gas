export const Movement = {
  Moved: "Moved",
  Unmoved: "Unmoved",
} as const;
export type Movement = typeof Movement[keyof typeof Movement];
