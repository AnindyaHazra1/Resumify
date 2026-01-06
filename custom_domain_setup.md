# How to Get a Custom Domain (e.g., resumify.com)

To remove `.vercel.app` from your website link, you need to purchase your own "domain name". This is like buying a permanent address for your house on the internet.

## Step 1: Buy a Domain Name
You need to buy the name "resumify.com" (or .net, .org, .in, etc.) from a **Domain Registrar**.
*   **Cost**: Usually $10 - $20 USD per year (₹800 - ₹1500 INR/year).
*   **Where to buy**:
    *   [Namecheap](https://www.namecheap.com/) (Recommended for good prices)
    *   [GoDaddy](https://www.godaddy.com/)
    *   [BigRock](https://www.bigrock.in/)
    *   [Google Domains](https://domains.google/) (Squarespace)

**Action**: Go to one of these sites, search for "resumify", and buy the one you like.

## Step 2: Connect it to Vercel
Once you have bought the domain, you need to tell Vercel to use it.

1.  **Log in to Vercel** and go to your **Resumify** project.
2.  Click on **Settings** (top menu).
3.  Click on **Domains** (side menu).
4.  In the box, type your new domain (e.g., `resumify.com`) and click **Add**.

## Step 3: Configure DNS (The Technical Part)
Vercel will give you some numbers or names (A Record or CNAME) to add to your Domain sites.

1.  Vercel will show an "Invalid Configuration" error initially. This is normal.
2.  It will ask you to add an **A Record** with a specific IP address (e.g., `76.76.21.21`) or a **CNAME** record is pointing to `cname.vercel-dns.com`.
3.  **Go back to where you bought the domain** (e.g., GoDaddy/Namecheap).
4.  Find "DNS Settings" or "Manage DNS".
5.  Add the records exactly as Vercel showed you.

## Step 4: Wait
It can take anywhere from **1 hour to 24 hours** for these changes to spread across the internet. Once it's done, Vercel will show a green checkmark, and your site will be live at `resumify.com`!
