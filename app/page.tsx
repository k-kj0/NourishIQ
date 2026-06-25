export const dynamic = "force-dynamic";

import { AppProvider } from "./AppContext";
import { MainDashboard } from "./components/MainDashboard";
import { RecipeSheet } from "./components/RecipeSheet";

export default function Home() {
  return (
    <AppProvider>
      <div className="h-screen w-full max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
        <MainDashboard />
        <RecipeSheet />
      </div>
    </AppProvider>
  );
}
