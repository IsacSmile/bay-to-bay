import { z } from "zod";

export const QuoteFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required"),
  companyName: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address (e.g. name@company.ca)"),
  pickupLocation: z
    .string()
    .min(2, "Pickup town or postal code is required"),
  deliveryLocation: z
    .string()
    .min(2, "Delivery town or postal code is required"),
  preferredDate: z
    .string()
    .min(1, "Preferred pickup date is required"),
  frequency: z.string().min(1, "Please select delivery frequency"),
  packageCount: z.string().optional().or(z.literal("")),
  approxWeight: z.string().optional().or(z.literal("")),
  typeOfGoods: z.string().optional().or(z.literal("")),
  service: z.string().optional().or(z.literal("")),
  preferredRun: z.string().optional().or(z.literal("")),
  additionalInfo: z
    .string()
    .min(2, "Package details are required"),
  website_hp: z.string().optional().or(z.literal("")), // Honeypot field
});

export type QuoteFormData = z.infer<typeof QuoteFormSchema>;
