# NourishIQ

Full-stack AI nutrition app. A Gemini-powered agent turns stated dietary goals into personalized meal plans.

**Live:** nourish-iq-umber.vercel.app

## What it does

- Takes your dietary goals and preferences as input
- Generates personalized meal plans via a Gemini-powered agent, shown with calories and protein per meal, plus a daily micronutrient summary (iron, magnesium, zinc, calcium)
- **Plate Scanner**: snap a photo of your plate and get an estimated calorie/protein breakdown plus a healthier-swap suggestion. Runs entirely in the browser using TensorFlow.js (MobileNet), so it's free and doesn't need an API key. Values are approximate estimates per recognized food, not a lab-grade nutrition analysis.
- **Travel Cuisine**: browse dishes by country (currently Japan, India, Italy) and get real recipes for cooking that country's food at home instead of ordering out
- **Craver**: search any dish by name and get a real recipe back
- Grocery list: add ingredients from any recipe and check them off while shopping

## Project structure

```
app/
  lib/
    mealData.ts     # meal plan data and nutrition values
  globals.css        # global styles
  layout.tsx         # app shell/layout
  page.tsx           # main UI: home, plate scanner, travel cuisine, craver, grocery
```

## Local setup

```bash
git clone https://github.com/k-kj0/NourishIQ.git
cd NourishIQ
npm install
```

Create a `.env.local` file in the project root with:

```
GEMINI_API_KEY=your_key_here
```

Then run:

```bash
npm run dev
```

## License

MIT
