# 📊 Pixel & CAPI Tracking (Crucial for Ads)

## 1. Web Pixels (Frontend)
*   **Platforms:** Facebook, TikTok, Snapchat.
*   **Performance:** All web pixel scripts MUST be deferred (`next/script` with `strategy="lazyOnload"` or `afterInteractive`) so they do not block the main thread and slow down the site.
*   **Events to Track:** PageView, ViewContent, AddToCart, InitiateCheckout, Purchase.

## 2. Conversions API (CAPI) - Backend
*   FastAPI will handle sending server-side events to FB, TikTok, and Snap to bypass iOS 14+ restrictions.
*   **Trigger:** When the order is successfully saved/webhooked.
*   **Payload Requirements:**
    *   Client IP, User Agent.
    *   Event Name: `Purchase`.
    *   Value (Total Order Value), Currency (`SAR`).

## 3. Hashing Rules (STRICT)
All customer data (Phone, Name) sent via CAPI must be hashed using **SHA256**.
*   **Facebook & Snapchat:** Phone number must include the country code without the `+` or `00`. Example: `9665XXXXXXXX`. Hash this string.
*   **TikTok:** Phone number MUST be in E.164 format, which means it **requires the `+` sign** before hashing. Example: `+9665XXXXXXXX`. Hash this string.

## 4. Deduplication
To prevent double-counting between the Web Pixel and CAPI:
1.  Generate a unique `event_id` (UUID) on the frontend when the user clicks "Confirm Order".
2.  Pass this `event_id` to the Web Pixel `Purchase` event.
3.  Send the same `event_id` in the API payload to FastAPI.
4.  FastAPI sends this `event_id` in the CAPI requests.