import { z } from "zod";
import * as PrismaClient from "@prisma/client";

export const RoleSchema = z.nativeEnum(PrismaClient.Role);

export const CategorySchema = z.nativeEnum(PrismaClient.Category);

// USER
//------------------------------------------------------

export const UserSchema = z.object({
    role: RoleSchema,
    id: z.number().int(),
    name: z.string().nullish(),
    email: z.string().nullish(),
    emailVerified: z.date().nullish(),
    image: z.string().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

// LOCATION
//------------------------------------------------------

export const LocationSchema = z.object({
    category: CategorySchema.nullish(),
    id: z.number().int(),
    userId: z.number().int(),
    name: z.string(),
    address: z.string(),
    lat: z.number(),
    long: z.number(),
    phone: z.number().int(),
    website: z.string().nullish(),
    summary: z.string().nullish(),
    description: z.string().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
  
  // ADVERTISEMENT
  //------------------------------------------------------
  
  export const AdvertisementSchema = z.object({
    id: z.number().int(),
    locationId: z.number().int(),
    title: z.string(),
    description: z.string().nullish(),
    start: z.date(),
    end: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
  
  // POINT OF INTEREST
  //------------------------------------------------------
  
  export const PointOfInterestSchema = z.object({
    category_id: CategorySchema,
    id: z.number().int(),
    title: z.string(),
    address: z.string(),
    lat: z.number(),
    long: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });