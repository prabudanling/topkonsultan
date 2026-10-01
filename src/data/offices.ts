import type { Office } from "@/data/extended-types";

/**
 * Sepuluh hub global PT TOP KONSULTAN INTERNASIONAL —
 * koordinat (x, y) cocok persis dengan HUBS di content.ts.
 * Jakarta adalah kantor pusat (flagship).
 */
export const OFFICES: Office[] = [
  {
    city: "Jakarta",
    country: "Indonesia",
    address: "Menara TOP Lt. 38, Jl. Jend. Sudirman Kav. 52–53, Jakarta Selatan 12190",
    timezone: "Asia/Jakarta",
    x: 72,
    y: 58,
    flagship: true,
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "12 Marina Boulevard, Tower 2 #17-01, Singapore 018982",
    timezone: "Asia/Singapore",
    x: 70,
    y: 51,
  },
  {
    city: "Tokyo",
    country: "Japan",
    address: "2-11-3 Meguro, Meguro City, Tokyo 153-0063",
    timezone: "Asia/Tokyo",
    x: 81,
    y: 34,
  },
  {
    city: "Seoul",
    country: "South Korea",
    address: "517 Yeongdong-daero, Gangnam-gu, Seoul",
    timezone: "Asia/Seoul",
    x: 77,
    y: 31,
  },
  {
    city: "Sydney",
    country: "Australia",
    address: "1 Macquarie Place, Sydney NSW 2000",
    timezone: "Australia/Sydney",
    x: 78,
    y: 72,
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "Level 14, Boulevard Plaza Tower 1, Downtown Dubai",
    timezone: "Asia/Dubai",
    x: 58,
    y: 38,
  },
  {
    city: "London",
    country: "UK",
    address: "25 Canada Square, Canary Wharf, London E14 5LQ",
    timezone: "Europe/London",
    x: 44,
    y: 20,
  },
  {
    city: "Frankfurt",
    country: "Germany",
    address: "Taunusanlage 8, 60329 Frankfurt am Main",
    timezone: "Europe/Berlin",
    x: 49,
    y: 25,
  },
  {
    city: "New York",
    country: "USA",
    address: "1177 Avenue of the Americas, New York, NY 10036",
    timezone: "America/New_York",
    x: 20,
    y: 32,
  },
  {
    city: "San Francisco",
    country: "USA",
    address: "525 Market Street, San Francisco, CA 94105",
    timezone: "America/Los_Angeles",
    x: 10,
    y: 30,
  },
];
