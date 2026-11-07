# User Stories: Electro Online Shop

# shoppers story
so a shopper,i want to see the product well displayed right from the products/home page (browse) ,so that i could choose from a variety electronics products ,now lets be alittle be specific ,there are many electronic products to say, if there were to be 1000,products i shopper who wants a simple bulb could have to look through the whole 1000 just to get a bulb so we introduce a categories and a small searching engine which helps the user get a product easier 
after the shopper finds the prodact that seems to be it in ,they might be many, so he enters a products details page to confirm wether the product he wanted was that ,and if not that could he back then check for the next one 

after he gets what he wanted he could press the add to cart button ,then could ask the user if he would like to check out more products or continue to checkout  

if continue to shop,takes him back to the home page ,with the cart on the header with an icon of how many products is in the cart ,where the shopper can click it then get in side to see what is in side the cart ,where he could remove what it wanted and would ask him if he wants to do that first before it actually removes it ,

# shortend :
### US1: Browse products
As a shopper, I want to see all products displayed clearly on the home page, so that I can choose from a variety of electronics.
- Each product card shows image, name, and price.
- Products load from the backend API.
- The page works on mobile and desktop.

### US2: Filter by category
As a shopper, I want to filter products by category, so that I don't have to scroll through every product to find what I need.
- A category list is visible on the listing page.
- Selecting a category shows only products in that category.
- Each category has its own clean URL.

### US3: Search products
As a shopper, I want to search by product name, so that I can find a specific item quickly.
- A search bar is available on the listing page.
- Results match product names (partial matches included).
- A "no results" message appears when nothing matches.

### US4: View product details
As a shopper, I want to open a product's details page, so that I can confirm it is what I want before buying.
- The page shows image, name, price, brand, description, specs, and stock status.
- I can go back to the listing and keep my category or search.
- A product that doesn't exist shows a "not found" page.

### US5: Add to cart
As a shopper, I want to add a product to my cart, so that I can buy it later with other items.
- An "Add to cart" button is on the details page.
- After adding, I see a confirmation with "Continue shopping" and "View cart" options.
- The header cart icon shows the number of items.

### US6: Manage the cart
As a shopper, I want to view and edit my cart, so that I only buy what I want.
- The cart page lists each item with image, name, price, quantity, and subtotal.
- I can change the quantity of an item.
- Removing an item asks for confirmation first.
- The cart shows the total, and an empty cart shows a friendly message with a link back to the shop.
- The cart survives a page refresh.

### US7: Checkout (mocked)
As a shopper, I want to proceed to checkout, so that I can complete my order.
- A "Checkout" button on the cart leads to a confirmation page.
- No real payment is taken, and the cart clears afterwards.

### US8: Find the store via search engines
As a store owner, I want each page to be search-engine friendly, so that shoppers can find my products on Google.
- Every page has a unique title and meta description.
- Open Graph tags, a sitemap, and Product structured data are present.
- URLs are clean (for example `/products/product-name`).
- Images are optimized and load fast.

## Notes
- With hundreds of products, a shopper looking for a simple bulb should not scroll through everything. That is why categories (US2) and search (US3) exist.
- Cart is stored in the browser (confirm). There are no user accounts in this version.
- Home page and product listing are the same page (confirm).

## Product fields
- name, slug (used in the URL), description, price (KES), brand, category, image, stock quantity, specs (short key details such as storage or battery)

## Categories
- Phones, Laptops, Audio, Lighting and Smart Home, Accessories

## Out of scope (for now)
- User accounts, real payments (M-Pesa), orders history, reviews, admin dashboard beyond Django admin