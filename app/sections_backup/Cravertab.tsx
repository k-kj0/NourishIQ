@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

* {
  -webkit-tap-highlight-color: transparent;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
:root {
  /* legacy tokens (kept so older components don't break) */
  --brand: #22c55e;
  --brand-deep: #14532d;
  --brand-soft: #dcfce7;
  --accent-pink: #ec4899;
  --gradient-cta: linear-gradient(135deg, #4ade80 0%, #15803d 100%);
  --gradient-iq: linear-gradient(135deg, #fe7b02 0%, #fe3f21 35%, #f858bc 65%, #575ecf 100%);

  /* v2 design tokens */
  --leaf: #16a34a;
  --leaf-deep: #14532d;
  --citrus: #f59e0b;
  --berry: #db2777;
  --sky: #0ea5e9;
  --color-card: #ffffff;
  --color-border: #ece7da;
  --color-bg: #fdfbf3;
  --color-muted-foreground: #9a9482;
  --shadow-card: 0 2px 8px rgba(0,0,0,0.04);
  --shadow-cta: 0 8px 20px rgba(22,163,74,0.25);
  --font-display: "Fraunces", serif;
  --font-sans: "Plus Jakarta Sans", -apple-system, sans-serif;
}
body {
  font-family: var(--font-sans);
  background: var(--color-bg);
}
.font-display {
  font-family: var(--font-display);
}
.card-soft {
  background: var(--color-card);
  border-radius: 1.25rem;
  box-shadow: var(--shadow-card);
}
.animate-fade-in {
  animation: fadeIn 0.25s ease-out;
}
.animate-slide-up {
  animation: slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.tap-scale {
  transition: transform 0.1s ease;
}
.tap-scale:active {
  transform: scale(0.96);
}
