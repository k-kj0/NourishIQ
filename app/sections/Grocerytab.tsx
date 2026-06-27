"use client";
import { useApp } from "../AppContext";
import { ShoppingBasket, Check } from "lucide-react";

export function GroceryTab() {
  const { groceryList, toggleGroceryItem } = useApp();
  const checkedCount = groceryList.filter((g) => g.checked).length;

  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-28" style={{ background: "var(--color-bg)" }}>
      <h1 className="font-display text-2xl font-black" style={{ color: "var(--leaf-deep)" }}>Grocery</h1>
      <p className="text-sm mb-5" style={{ color: "var(--color-muted-foreground)" }}>
        {groceryList.length === 0
          ? "Open any recipe and tap \"Add to grocery list\" to build your list."
          : `${checkedCount}/${groceryList.length} items checked off`}
      </p>

      {groceryList.length === 0 ? (
        <div className="text-center py-16">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: "color-mix(in srgb, var(--leaf) 12%, white)" }}
          >
            <ShoppingBasket size={28} style={{ color: "var(--leaf-deep)" }} />
          </div>
          <p className="text-sm font-semibold text-gray-700">Your list is empty</p>
        </div>
      ) : (
        <div className="space-y-2">
          {groceryList.map((item) => (
            <button
              key={item.name}
              onClick={() => toggleGroceryItem(item.name)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl card-soft tap-scale"
            >
              <span className={item.checked ? "text-sm text-gray-400 line-through" : "text-sm text-gray-800 font-medium"}>
                {item.name}
              </span>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={item.checked ? { background: "var(--leaf)" } : { border: "2px solid var(--color-border)" }}
              >
                {item.checked && <Check size={12} className="text-white" />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
