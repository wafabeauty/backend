# 🛒 Funnel & CRO Strategy

## 1. Pricing & Offers (High AOV)
Every product page must prominently display these 3 tier offers:
*   **1 Piece:** 199 SAR
*   **2 Pieces:** 279 SAR
*   **3 Pieces:** 349 SAR
*(Note: These are the ONLY prices shown on the site. No discounts are visible anywhere except the post-checkout upsell).*

## 2. The Funnel Flow
1.  **Product Page:** User selects an offer (1, 2, or 3 pieces) and clicks the CTA ("أضف إلى السلة" / Add to Cart).
2.  **Cart Drawer (Slide-out):** 
    *   The drawer opens automatically.
    *   Shows the added item.
    *   **Cross-sells:** Displays the other 2 products at their base price (199 SAR) with a 1-click "Add" button.
3.  **Checkout Pop-up:**
    *   Triggered by clicking "إتمام الطلب" (Checkout) in the drawer.
    *   A clean modal appears over the screen.
    *   Shows Order Summary, Trust Badges, Scarcity ("Stock is low").
    *   **Fields:** ONLY 2 fields.
        *   الاسم الكامل (Full Name)
        *   رقم الجوال (Phone Number) - *Validation: Must be a valid KSA number (10 digits, starts with 05).*
4.  **The 99 SAR Flash Upsell (The Secret Weapon):**
    *   User clicks "تأكيد الطلب" (Confirm Order) on the pop-up.
    *   The form validates. **DO NOT redirect to Thank You page yet.**
    *   A new screen/modal appears with a **10 to 15-second countdown timer**.
    *   Shows ONE highly relevant product they don't have in their cart.
    *   **Offer:** "أضف هذا المنتج لبروتوكولك العلاجي بـ 99 ريال فقط! (عرض لمرة واحدة)" (Add this to your clinical protocol for only 99 SAR! One-time offer).
    *   Buttons: "Yes, Add to my order" / "No, skip this".
5.  **Thank You Page & Webhook:**
    *   Regardless of the upsell choice, redirect to the Thank You Page.
    *   Show final order summary (including the 99 SAR item if accepted).
    *   Show cross-sells at original prices (199 SAR).
    *   **Backend Action:** FastAPI sends the complete order payload to the Google Sheet Webhook and fires CAPI events (Purchase).