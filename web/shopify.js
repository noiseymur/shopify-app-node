import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb"
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const DEV = process.env.NODE_ENV === "development";

console.log("DB_URL: ",DB_URL);
console.log("DB_NAME: ",DB_NAME);
console.log("DEV: ",DEV);

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
  "My Shopify One-Time Charge": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 5.0,
    currencyCode: "USD",
    interval: BillingInterval.OneTime,
  },
};

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
    hostName: process.env.HOST.replace(/^https?:\/\//, ''),
    hostScheme: "https",
    scopes: process.env.SCOPES?.split(",")
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: new MongoDBSessionStorage(
    new URL(DB_URL),
    DEV ? `${DB_NAME}_dev` : DB_NAME,
    {
      sessionCollectionName: "sessions"
    }
  ),
});

export default shopify;
