import { MODELS, POPULAR_VEHICLES } from "./data";

export type Make = keyof typeof MODELS;
export type Model = keyof (typeof MODELS)[Make];
export type Badge = (typeof MODELS)[Make][Model][number];

export type PopularMake = keyof typeof POPULAR_VEHICLES;

export type Vehicle = {
  make: Make;
  model: Model;
  badge: Badge;
};
