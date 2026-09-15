import { z } from "zod";

export const QuoteFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required"),
  companyName: z.string().optional().or(z.literal("")),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number (e.g. 705-000-0000)"),
  email: z
    .string()
    .email("Please enter a valid email address (e.g. name@company.ca)"),
  pickupLocation: z
    .string()
    .min(2, "Pickup location is required"),
  deliveryLocation: z
    .string()
    .min(2, "Delivery location is required"),
  preferredDate: z
    .string()
    .min(1, "Preferred pickup date is required"),
  frequency: z.enum([
    "One time",
    "Twice weekly",
    "Weekly",
    "Monthly",
    "Custom",
  ]),
  packageCount: z.string().optional().or(z.literal("")),
  approxWeight: z.string().optional().or(z.literal("")),
  typeOfGoods: z.string().optional().or(z.literal("")),
  additionalInfo: z
    .string()
    .min(2, "Additional information is required"),
  website_hp: z.string().optional().or(z.literal("")), // Honeypot field
});

export type QuoteFormData = z.infer<typeof QuoteFormSchema>;
