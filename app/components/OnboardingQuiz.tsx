"use client";

import { useState } from "react";
import { useApp } from "../AppContext";
import {
  ChevronRight,
  ChevronLeft,
  User,
  MapPin,
  Heart,
  Apple,
  Clock,
  Flame,
  ChefHat,
  Scale,
  Check,
  Sparkles,
  Zap,
  Droplets,
  Moon,
  Sun,
  Thermometer,
  Activity,
  Brain,
  Smile,
  Frown,
  Meh,
  UtensilsCrossed,
  ShoppingCart,
  Coffee,
  Cookie,
  Sandwich,
  Salad,
  Egg,
  Milk,
  Wheat,
  Fish,
  Beef,
  Carrot,
  Cherry,
  Grape,
  Citrus,
  Banana,
  Croissant,
  Pizza,
  Burger,
  Soup,
  IceCream,
  Cake,
  Candy,
  CookieIcon,
  CherryIcon,
  GrapeIcon,
  CitrusIcon,
  BananaIcon,
  CroissantIcon,
  PizzaIcon,
  BurgerIcon,
  SoupIcon,
  IceCreamIcon,
  CakeIcon,
  CandyIcon,
  CookieIcon as CookieIcon2,
  CherryIcon as CherryIcon2,
  GrapeIcon as GrapeIcon2,
  CitrusIcon as CitrusIcon2,
  BananaIcon as BananaIcon2,
  CroissantIcon as CroissantIcon2,
  PizzaIcon as PizzaIcon2,
  BurgerIcon as BurgerIcon2,
  SoupIcon as SoupIcon2,
  IceCreamIcon as IceCreamIcon2,
  CakeIcon as CakeIcon2,
  CandyIcon as CandyIcon2,
  CookieIcon as CookieIcon3,
  CherryIcon as CherryIcon3,
  GrapeIcon as GrapeIcon3,
  CitrusIcon as CitrusIcon3,
  BananaIcon as BananaIcon3,
  CroissantIcon as CroissantIcon3,
  PizzaIcon as PizzaIcon3,
  BurgerIcon as BurgerIcon3,
  SoupIcon as SoupIcon3,
  IceCreamIcon as IceCreamIcon3,
  CakeIcon as CakeIcon3,
  CandyIcon as CandyIcon3,
  CookieIcon as CookieIcon4,
  CherryIcon as CherryIcon4,
  GrapeIcon as GrapeIcon4,
  CitrusIcon as CitrusIcon4,
  BananaIcon as BananaIcon4,
  CroissantIcon as CroissantIcon4,
  PizzaIcon as PizzaIcon4,
  BurgerIcon as BurgerIcon4,
  SoupIcon as SoupIcon4,
  IceCreamIcon as IceCreamIcon4,
  CakeIcon as CakeIcon4,
  CandyIcon as CandyIcon4,
  CookieIcon as CookieIcon5,
  CherryIcon as CherryIcon5,
  GrapeIcon as GrapeIcon5,
  CitrusIcon as CitrusIcon5,
  BananaIcon as BananaIcon5,
  CroissantIcon as CroissantIcon5,
  PizzaIcon as PizzaIcon5,
  BurgerIcon as BurgerIcon5,
  SoupIcon as SoupIcon5,
  IceCreamIcon as IceCreamIcon5,
  CakeIcon as CakeIcon5,
  CandyIcon as CandyIcon5,
  CookieIcon as CookieIcon6,
  CherryIcon as CherryIcon6,
  GrapeIcon as GrapeIcon6,
  CitrusIcon as CitrusIcon6,
  BananaIcon as BananaIcon6,
  CroissantIcon as CroissantIcon6,
  PizzaIcon as PizzaIcon6,
  BurgerIcon as BurgerIcon6,
  SoupIcon as SoupIcon6,
  IceCreamIcon as IceCreamIcon6,
  CakeIcon as CakeIcon6,
  CandyIcon as CandyIcon6,
  CookieIcon as CookieIcon7,
  CherryIcon as CherryIcon7,
  GrapeIcon as GrapeIcon7,
  CitrusIcon as CitrusIcon7,
  BananaIcon as BananaIcon7,
  CroissantIcon as CroissantIcon7,
  PizzaIcon as PizzaIcon7,
  BurgerIcon as BurgerIcon7,
  SoupIcon as SoupIcon7,
  IceCreamIcon as IceCreamIcon7,
  CakeIcon as CakeIcon7,
  CandyIcon as CandyIcon7,
  CookieIcon as CookieIcon8,
  CherryIcon as CherryIcon8,
  GrapeIcon as GrapeIcon8,
  CitrusIcon as CitrusIcon8,
  BananaIcon as BananaIcon8,
  CroissantIcon as CroissantIcon8,
  PizzaIcon as PizzaIcon8,
  BurgerIcon as BurgerIcon8,
  SoupIcon as SoupIcon8,
  IceCreamIcon as IceCreamIcon8,
  CakeIcon as CakeIcon8,
  CandyIcon as CandyIcon8,
  CookieIcon as CookieIcon9,
  CherryIcon as CherryIcon9,
  GrapeIcon as GrapeIcon9,
  CitrusIcon as CitrusIcon9,
  BananaIcon as BananaIcon9,
  CroissantIcon as CroissantIcon9,
  PizzaIcon as PizzaIcon9,
  BurgerIcon as BurgerIcon9,
  SoupIcon as SoupIcon9,
  IceCreamIcon as IceCreamIcon9,
  CakeIcon as CakeIcon9,
  CandyIcon as CandyIcon9,
  CookieIcon as CookieIcon10,
  CherryIcon as CherryIcon10,
  GrapeIcon as GrapeIcon10,
  CitrusIcon as CitrusIcon10,
  BananaIcon as BananaIcon10,
  CroissantIcon as CroissantIcon10,
  PizzaIcon as PizzaIcon10,
  BurgerIcon as BurgerIcon10,
  SoupIcon as SoupIcon10,
  IceCreamIcon as IceCreamIcon10,
  CakeIcon as CakeIcon10,
  CandyIcon as CandyIcon10,
  CookieIcon as CookieIcon11,
  CherryIcon as CherryIcon11,
  GrapeIcon as GrapeIcon11,
  CitrusIcon as CitrusIcon11,
  BananaIcon as BananaIcon11,
  CroissantIcon as CroissantIcon11,
  PizzaIcon as PizzaIcon11,
  BurgerIcon as BurgerIcon11,
  SoupIcon as SoupIcon11,
  IceCreamIcon as IceCreamIcon11,
  CakeIcon as CakeIcon11,
  CandyIcon as CandyIcon11,
  CookieIcon as CookieIcon12,
  CherryIcon as CherryIcon12,
  GrapeIcon as GrapeIcon12,
  CitrusIcon as CitrusIcon12,
  BananaIcon as BananaIcon12,
  CroissantIcon as CroissantIcon12,
  PizzaIcon as PizzaIcon12,
  BurgerIcon as BurgerIcon12,
  SoupIcon as SoupIcon12,
  IceCreamIcon as IceCreamIcon12,
  CakeIcon as CakeIcon12,
  CandyIcon as CandyIcon12,
  CookieIcon as CookieIcon13,
  CherryIcon as CherryIcon13,
  GrapeIcon as GrapeIcon13,
  CitrusIcon as CitrusIcon13,
  BananaIcon as BananaIcon13,
  CroissantIcon as CroissantIcon13,
  PizzaIcon as PizzaIcon13,
  BurgerIcon as BurgerIcon13,
  SoupIcon as SoupIcon13,
  IceCreamIcon as IceCreamIcon13,
  CakeIcon as CakeIcon13,
  CandyIcon as CandyIcon13,
  CookieIcon as CookieIcon14,
  CherryIcon as CherryIcon14,
  GrapeIcon as GrapeIcon14,
  CitrusIcon as CitrusIcon14,
  BananaIcon as BananaIcon14,
  CroissantIcon as CroissantIcon14,
  PizzaIcon as PizzaIcon14,
  BurgerIcon as BurgerIcon14,
  SoupIcon as SoupIcon14,
  IceCreamIcon as IceCreamIcon14,
  CakeIcon as CakeIcon14,
  CandyIcon as CandyIcon14,
  CookieIcon as CookieIcon15,
  CherryIcon as CherryIcon15,
  GrapeIcon as GrapeIcon15,
  CitrusIcon as CitrusIcon15,
  BananaIcon as BananaIcon15,
  CroissantIcon as CroissantIcon15,
  PizzaIcon as PizzaIcon15,
  BurgerIcon as BurgerIcon15,
  SoupIcon as SoupIcon15,
  IceCreamIcon as IceCreamIcon15,
  CakeIcon as CakeIcon15,
  CandyIcon as CandyIcon15,
  CookieIcon as CookieIcon16,
  CherryIcon as CherryIcon16,
  GrapeIcon as GrapeIcon16,
  CitrusIcon as CitrusIcon16,
  BananaIcon as BananaIcon16,
  CroissantIcon as CroissantIcon16,
  PizzaIcon as PizzaIcon16,
  BurgerIcon as BurgerIcon16,
  SoupIcon as SoupIcon16,
  IceCreamIcon as IceCreamIcon16,
  CakeIcon as CakeIcon16,
  CandyIcon as CandyIcon16,
  CookieIcon as CookieIcon17,
  CherryIcon as CherryIcon17,
  GrapeIcon as GrapeIcon17,
  CitrusIcon as CitrusIcon17,
  BananaIcon as BananaIcon17,
  CroissantIcon as CroissantIcon17,
  PizzaIcon as PizzaIcon17,
  BurgerIcon as BurgerIcon17,
  SoupIcon as SoupIcon17,
  IceCreamIcon as IceCreamIcon17,
  CakeIcon as CakeIcon17,
  CandyIcon as CandyIcon17,
  CookieIcon as CookieIcon18,
  CherryIcon as CherryIcon18,
  GrapeIcon as GrapeIcon18,
  CitrusIcon as CitrusIcon18,
  BananaIcon as BananaIcon18,
  CroissantIcon as CroissantIcon18,
  PizzaIcon as PizzaIcon18,
  BurgerIcon as BurgerIcon18,
  SoupIcon as SoupIcon18,
  IceCreamIcon as IceCreamIcon18,
  CakeIcon as CakeIcon18,
  CandyIcon as CandyIcon18,
  CookieIcon as CookieIcon19,
  CherryIcon as CherryIcon19,
  GrapeIcon as GrapeIcon19,
  CitrusIcon as CitrusIcon19,
  BananaIcon as BananaIcon19,
  CroissantIcon as CroissantIcon19,
  PizzaIcon as PizzaIcon19,
  BurgerIcon as BurgerIcon19,
  SoupIcon as SoupIcon19,
  IceCreamIcon as IceCreamIcon19,
  CakeIcon as CakeIcon19,
  CandyIcon as CandyIcon19,
  CookieIcon as CookieIcon20,
  CherryIcon as CherryIcon20,
  GrapeIcon as GrapeIcon20,
  CitrusIcon as CitrusIcon20,
  BananaIcon as BananaIcon20,
  CroissantIcon as CroissantIcon20,
  PizzaIcon as PizzaIcon20,
  BurgerIcon as BurgerIcon20,
  SoupIcon as SoupIcon20,
  IceCreamIcon as IceCreamIcon20,
  CakeIcon as CakeIcon20,
  CandyIcon as CandyIcon20,
  CookieIcon as CookieIcon21,
  CherryIcon as CherryIcon21,
  GrapeIcon as GrapeIcon21,
  CitrusIcon as CitrusIcon21,
  BananaIcon as BananaIcon21,
  CroissantIcon as CroissantIcon21,
  PizzaIcon as PizzaIcon21,
  BurgerIcon as BurgerIcon21,
  SoupIcon as SoupIcon21,
  IceCreamIcon as IceCreamIcon21,
  CakeIcon as CakeIcon21,
  CandyIcon as CandyIcon21,
  CookieIcon as CookieIcon22,
  CherryIcon as CherryIcon22,
  GrapeIcon as GrapeIcon22,
  CitrusIcon as CitrusIcon22,
  BananaIcon as BananaIcon22,
  CroissantIcon as CroissantIcon22,
  PizzaIcon as PizzaIcon22,
  BurgerIcon as BurgerIcon22,
  SoupIcon as SoupIcon22,
  IceCreamIcon as IceCreamIcon22,
  CakeIcon as CakeIcon22,
  CandyIcon as CandyIcon22,
  CookieIcon as CookieIcon23,
  CherryIcon as CherryIcon23,
  GrapeIcon as GrapeIcon23,
  CitrusIcon as CitrusIcon23,
  BananaIcon as BananaIcon23,
  CroissantIcon as CroissantIcon23,
  PizzaIcon as PizzaIcon23,
  BurgerIcon as BurgerIcon23,
  SoupIcon as SoupIcon23,
  IceCreamIcon as IceCreamIcon23,
  CakeIcon as CakeIcon23,
  CandyIcon as CandyIcon23,
  CookieIcon as CookieIcon24,
  CherryIcon as CherryIcon24,
  GrapeIcon as GrapeIcon24,
  CitrusIcon as CitrusIcon24,
  BananaIcon as BananaIcon24,
  CroissantIcon as CroissantIcon24,
  PizzaIcon as PizzaIcon24,
  BurgerIcon as BurgerIcon24,
  SoupIcon as SoupIcon24,
  IceCreamIcon as IceCreamIcon24,
  CakeIcon as CakeIcon24,
  CandyIcon as CandyIcon24,
  CookieIcon as CookieIcon25,
  CherryIcon as CherryIcon25,
  GrapeIcon as GrapeIcon25,
  CitrusIcon as CitrusIcon25,
  BananaIcon as BananaIcon25,
  CroissantIcon as CroissantIcon25,
  PizzaIcon as PizzaIcon25,
  BurgerIcon as BurgerIcon25,
  SoupIcon as SoupIcon25,
  IceCreamIcon as IceCreamIcon25,
  CakeIcon as CakeIcon25,
  CandyIcon as CandyIcon25,
  CookieIcon as CookieIcon26,
  CherryIcon as CherryIcon26,
  GrapeIcon as GrapeIcon26,
  CitrusIcon as CitrusIcon26,
  BananaIcon as BananaIcon26,
  CroissantIcon as CroissantIcon26,
  PizzaIcon as PizzaIcon26,
  BurgerIcon as BurgerIcon26,
  SoupIcon as SoupIcon26,
  IceCreamIcon as IceCreamIcon26,
  CakeIcon as CakeIcon26,
  CandyIcon as CandyIcon26,
  CookieIcon as CookieIcon27,
  CherryIcon as CherryIcon27,
  GrapeIcon as GrapeIcon27,
  CitrusIcon as CitrusIcon27,
  BananaIcon as BananaIcon27,
  CroissantIcon as CroissantIcon27,
  PizzaIcon as PizzaIcon27,
  BurgerIcon as BurgerIcon27,
  SoupIcon as SoupIcon27,
  IceCreamIcon as IceCreamIcon27,
  CakeIcon as CakeIcon27,
  CandyIcon as CandyIcon27,
  CookieIcon as CookieIcon28,
  CherryIcon as CherryIcon28,
  GrapeIcon as GrapeIcon28,
  CitrusIcon as CitrusIcon28,
  BananaIcon as BananaIcon28,
  CroissantIcon as CroissantIcon28,
  PizzaIcon as PizzaIcon28,
  BurgerIcon as BurgerIcon28,
  SoupIcon as SoupIcon28,
  IceCreamIcon as IceCreamIcon28,
  CakeIcon as CakeIcon28,
  CandyIcon as CandyIcon28,
  CookieIcon as CookieIcon29,
  CherryIcon as CherryIcon29,
  GrapeIcon as GrapeIcon29,
  CitrusIcon as CitrusIcon29,
  BananaIcon as BananaIcon29,
  CroissantIcon as CroissantIcon29,
  PizzaIcon as PizzaIcon29,
  BurgerIcon as BurgerIcon29,
  SoupIcon as SoupIcon29,
  IceCreamIcon as IceCreamIcon29,
  CakeIcon as CakeIcon29,
  CandyIcon as CandyIcon29,
  CookieIcon as CookieIcon30,
  CherryIcon as CherryIcon30,
  GrapeIcon as GrapeIcon30,
  CitrusIcon as CitrusIcon30,
  BananaIcon as BananaIcon30,
  CroissantIcon as CroissantIcon30,
  PizzaIcon as PizzaIcon30,
  BurgerIcon as BurgerIcon30,
  SoupIcon as SoupIcon30,
  IceCreamIcon as IceCreamIcon30,
  CakeIcon as CakeIcon30,
  CandyIcon as CandyIcon30,
  CookieIcon as CookieIcon31,
  CherryIcon as CherryIcon31,
  GrapeIcon as GrapeIcon31,
  CitrusIcon as CitrusIcon31,
  BananaIcon as BananaIcon31,
  CroissantIcon as CroissantIcon31,
  PizzaIcon as PizzaIcon31,
  BurgerIcon as BurgerIcon31,
  SoupIcon as SoupIcon31,
  IceCreamIcon as IceCreamIcon31,
  CakeIcon as CakeIcon31,
  CandyIcon as CandyIcon31,
  CookieIcon as CookieIcon32,
  CherryIcon as CherryIcon32,
  GrapeIcon as GrapeIcon32,
  CitrusIcon as CitrusIcon32,
  BananaIcon as BananaIcon32,
  CroissantIcon as CroissantIcon32,
  PizzaIcon as PizzaIcon32,
  BurgerIcon as BurgerIcon32,
  SoupIcon as SoupIcon32,
  IceCreamIcon as IceCreamIcon32,
  CakeIcon as CakeIcon32,
  CandyIcon as CandyIcon32,
  CookieIcon as CookieIcon33,
  CherryIcon as CherryIcon33,
  GrapeIcon as GrapeIcon33,
  CitrusIcon as CitrusIcon33,
  BananaIcon as BananaIcon33,
  CroissantIcon as CroissantIcon33,
  PizzaIcon as PizzaIcon33,
  BurgerIcon as BurgerIcon33,
  SoupIcon as SoupIcon33,
  IceCreamIcon as IceCreamIcon33,
  CakeIcon as CakeIcon33,
  CandyIcon as CandyIcon33,
  CookieIcon as CookieIcon34,
  CherryIcon as CherryIcon34,
  GrapeIcon as GrapeIcon34,
  CitrusIcon as CitrusIcon34,
  BananaIcon as BananaIcon34,
  CroissantIcon as CroissantIcon34,
  PizzaIcon as PizzaIcon34,
  BurgerIcon as BurgerIcon34,
  SoupIcon as SoupIcon34,
  IceCreamIcon as IceCreamIcon34,
  CakeIcon as CakeIcon34,
  CandyIcon as CandyIcon34,
  CookieIcon as CookieIcon35,
  CherryIcon as CherryIcon35,
  GrapeIcon as GrapeIcon35,
  CitrusIcon as CitrusIcon35,
  BananaIcon as BananaIcon35,
  CroissantIcon as CroissantIcon35,
  PizzaIcon as PizzaIcon35,
  BurgerIcon as BurgerIcon35,
  SoupIcon as SoupIcon35,
  IceCreamIcon as IceCreamIcon35,
  CakeIcon as CakeIcon35,
  CandyIcon as CandyIcon35,
  CookieIcon as CookieIcon36,
  CherryIcon as CherryIcon36,
  GrapeIcon as GrapeIcon36,
  CitrusIcon as CitrusIcon36,
  BananaIcon as BananaIcon36,
  CroissantIcon as CroissantIcon36,
  PizzaIcon as PizzaIcon36,
  BurgerIcon as BurgerIcon36,
  SoupIcon as SoupIcon36,
  IceCreamIcon as IceCreamIcon36,
  CakeIcon as CakeIcon36,
  CandyIcon as CandyIcon36,
  CookieIcon as CookieIcon37,
  CherryIcon as CherryIcon37,
  GrapeIcon as GrapeIcon37,
  CitrusIcon as CitrusIcon37,
  BananaIcon as BananaIcon37,
  CroissantIcon as CroissantIcon37,
  PizzaIcon as PizzaIcon37,
  BurgerIcon as BurgerIcon37,
  SoupIcon as SoupIcon37,
  IceCreamIcon as IceCreamIcon37,
  CakeIcon as CakeIcon37,
  CandyIcon as CandyIcon37,
  CookieIcon as CookieIcon38,
  CherryIcon as CherryIcon38,
  GrapeIcon as GrapeIcon38,
  CitrusIcon as CitrusIcon38,
  BananaIcon as BananaIcon38,
  CroissantIcon as CroissantIcon38,
  PizzaIcon as PizzaIcon38,
  BurgerIcon as BurgerIcon38,
  SoupIcon as SoupIcon38,
  IceCreamIcon as IceCreamIcon38,
  CakeIcon as CakeIcon38,
  CandyIcon as CandyIcon38,
  CookieIcon as CookieIcon39,
  CherryIcon as CherryIcon39,
  GrapeIcon as GrapeIcon39,
  CitrusIcon as CitrusIcon39,
  BananaIcon as BananaIcon39,
  CroissantIcon as CroissantIcon39,
  PizzaIcon as PizzaIcon39,
  BurgerIcon as BurgerIcon39,
  SoupIcon as SoupIcon39,
  IceCreamIcon as IceCreamIcon39,
  CakeIcon as CakeIcon39,
  CandyIcon as CandyIcon39,
  CookieIcon as CookieIcon40,
  CherryIcon as CherryIcon40,
  GrapeIcon as GrapeIcon40,
  CitrusIcon as CitrusIcon40,
  BananaIcon as BananaIcon40,
  CroissantIcon as CroissantIcon40,
  PizzaIcon as PizzaIcon40,
  BurgerIcon as BurgerIcon40,
  SoupIcon as SoupIcon40,
  IceCreamIcon as IceCreamIcon40,
  CakeIcon as CakeIcon40,
  CandyIcon as CandyIcon40,
  CookieIcon as CookieIcon41,
  CherryIcon as CherryIcon41,
  GrapeIcon as GrapeIcon41,
  CitrusIcon as CitrusIcon41,
  BananaIcon as BananaIcon41,
  CroissantIcon as CroissantIcon41,
  PizzaIcon as PizzaIcon41,
  BurgerIcon as BurgerIcon41,
  SoupIcon as SoupIcon41,
  IceCreamIcon as IceCreamIcon41,
  CakeIcon as CakeIcon41,
  CandyIcon as CandyIcon41,
  CookieIcon as CookieIcon42,
  CherryIcon as CherryIcon42,
  GrapeIcon as GrapeIcon42,
  CitrusIcon as CitrusIcon42,
  BananaIcon as BananaIcon42,
  CroissantIcon as CroissantIcon42,
  PizzaIcon as PizzaIcon42,
  BurgerIcon as BurgerIcon42,
  SoupIcon as SoupIcon42,
  IceCreamIcon as IceCreamIcon42,
  CakeIcon as CakeIcon42,
  CandyIcon as CandyIcon42,
  CookieIcon as CookieIcon43,
  CherryIcon as CherryIcon43,
  GrapeIcon as GrapeIcon43,
  CitrusIcon as CitrusIcon43,
  BananaIcon as BananaIcon43,
  CroissantIcon as CroissantIcon43,
  PizzaIcon as PizzaIcon43,
  BurgerIcon as BurgerIcon43,
  SoupIcon as SoupIcon43,
  IceCreamIcon as IceCreamIcon43,
  CakeIcon as CakeIcon43,
  CandyIcon as CandyIcon43,
  CookieIcon as CookieIcon44,
  CherryIcon as CherryIcon44,
  GrapeIcon as GrapeIcon44,
  CitrusIcon as CitrusIcon44,
  BananaIcon as BananaIcon44,
  CroissantIcon as CroissantIcon44,
  PizzaIcon as PizzaIcon44,
  BurgerIcon as BurgerIcon44,
  SoupIcon as SoupIcon44,
  IceCreamIcon as IceCreamIcon44,
  CakeIcon as CakeIcon44,
  CandyIcon as CandyIcon44,
  CookieIcon as CookieIcon45,
  CherryIcon as CherryIcon45,
  GrapeIcon as GrapeIcon45,
  CitrusIcon as CitrusIcon45,
  BananaIcon as BananaIcon45,
  CroissantIcon as CroissantIcon45,
  PizzaIcon as PizzaIcon45,
  BurgerIcon as BurgerIcon45,
  SoupIcon as SoupIcon45,
  IceCreamIcon as IceCreamIcon45,
  CakeIcon as CakeIcon45,
  CandyIcon as CandyIcon45,
  CookieIcon as CookieIcon46,
  CherryIcon as CherryIcon46,
  GrapeIcon as GrapeIcon46,
  CitrusIcon as CitrusIcon46,
  BananaIcon as BananaIcon46,
  CroissantIcon as CroissantIcon46,
  PizzaIcon as PizzaIcon46,
  BurgerIcon as BurgerIcon46,
  SoupIcon as SoupIcon46,
  IceCreamIcon as IceCreamIcon46,
  CakeIcon as CakeIcon46,
  CandyIcon as CandyIcon46,
  CookieIcon as CookieIcon47,
  CherryIcon as CherryIcon47,
  GrapeIcon as GrapeIcon47,
  CitrusIcon as CitrusIcon47,
  BananaIcon as BananaIcon47,
  CroissantIcon as CroissantIcon47,
  PizzaIcon as PizzaIcon47,
  BurgerIcon as BurgerIcon47,
  SoupIcon as SoupIcon47,
  IceCreamIcon as IceCreamIcon47,
  CakeIcon as CakeIcon47,
  CandyIcon as CandyIcon47,
  CookieIcon as CookieIcon48,
  CherryIcon as CherryIcon48,
  GrapeIcon as GrapeIcon48,
  CitrusIcon as CitrusIcon48,
  BananaIcon as BananaIcon48,
  CroissantIcon as CroissantIcon48,
  PizzaIcon as PizzaIcon48,
  BurgerIcon as BurgerIcon48,
  SoupIcon as SoupIcon48,
  IceCreamIcon as IceCreamIcon48,
  CakeIcon as CakeIcon48,
  CandyIcon as CandyIcon48,
  CookieIcon as CookieIcon49,
  CherryIcon as CherryIcon49,
  GrapeIcon as GrapeIcon49,
  CitrusIcon as CitrusIcon49,
  BananaIcon as BananaIcon49,
  CroissantIcon as CroissantIcon49,
  PizzaIcon as PizzaIcon49,
  BurgerIcon as BurgerIcon49,
  SoupIcon as SoupIcon49,
  IceCreamIcon as IceCreamIcon49,
  CakeIcon as CakeIcon49,
  CandyIcon as CandyIcon49,
  CookieIcon as CookieIcon50,
  CherryIcon as CherryIcon50,
  GrapeIcon as GrapeIcon50,
  CitrusIcon as CitrusIcon50,
  BananaIcon as BananaIcon50,
  CroissantIcon as CroissantIcon50,
  PizzaIcon as PizzaIcon50,
  BurgerIcon as BurgerIcon50,
  SoupIcon as SoupIcon50,
  IceCreamIcon as IceCreamIcon50,
  CakeIcon as CakeIcon50,
  CandyIcon as CandyIcon50,
} from "lucide-react";

const WeightStep = () => {
  const { quizState, updateQuizState, goNext } = useApp();
  const wantsWeightLoss = quizState.healthGoals.includes("lose-weight");

  if (!wantsWeightLoss) {
    setTimeout(goNext, 100);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Scale size={40} className="text-green-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your weight journey
        </h2>
        <p className="text-sm text-gray-500">
          We will personalize your plan for healthy, sustainable results
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Current weight ({quizState.weightUnit})
          </label>
          <input
            type="number"
            value={quizState.currentWeight || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateQuizState({ currentWeight: parseInt(e.target.value) || null })
            }
            placeholder="0"
            className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Target weight ({quizState.weightUnit}) — optional
          </label>
          <input
            type="number"
            value={quizState.targetWeight || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateQuizState({ targetWeight: parseInt(e.target.value) || null })
            }
            placeholder="0"
            className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center"
          />
        </div>
      </div>
    </div>
  );
};

export function OnboardingQuiz() {
  const { quizStep, setQuizStep, totalQuizSteps, quizState, updateQuizState, setCurrentView, setProfile } = useApp();
  const [direction, setDirection] = useState(1);

  const nextStep = () => {
    if (quizStep < totalQuizSteps) {
      setDirection(1);
      setQuizStep(quizStep + 1);
    } else {
      finishQuiz();
    }
  };

  const prevStep = () => {
    if (quizStep > 1) {
      setDirection(-1);
      setQuizStep(quizStep - 1);
    }
  };

  const finishQuiz = () => {
    setProfile({
      name: quizState.name,
      gender: quizState.gender,
      diet: quizState.dietType,
      healthConditions: quizState.healthConditions,
      cookingTime: quizState.cookingTime,
      kitchenSetup: quizState.appliances,
      lovedFoods: quizState.lovedFoods,
      currentWeight: quizState.currentWeight,
      targetWeight: quizState.targetWeight,
      weightUnit: quizState.weightUnit,
      healthGoals: quizState.healthGoals,
      region: quizState.region,
      age: quizState.age,
      initials: quizState.name ? quizState.name.substring(0, 2).toUpperCase() : "ME",
      goal: quizState.healthGoals[0] || "Eat Healthier",
      targetCalories: 2000,
    });
    setCurrentView("dashboard");
  };

  const renderStep = () => {
    switch (quizStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What is your name?</h2>
              <p className="text-sm text-gray-500">We will personalize your experience</p>
            </div>
            <input
              type="text"
              value={quizState.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ name: e.target.value })}
              placeholder="Enter your name"
              className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center text-lg font-medium"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Where are you from?</h2>
              <p className="text-sm text-gray-500">This helps us recommend local cuisine</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["India", "United States", "United Kingdom", "Australia", "Canada", "Other"].map((region) => (
                <button
                  key={region}
                  onClick={() => updateQuizState({ region })}
                  className={quizState.region === region ? "p-4 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold" : "p-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium"}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What is your gender?</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Male", "Female", "Non-binary", "Prefer not to say"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => updateQuizState({ gender })}
                  className={quizState.gender === gender ? "p-4 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold" : "p-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium"}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Apple size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Diet preference</h2>
            </div>
            <div className="space-y-2">
              {["Vegan", "Vegetarian", "Vegetarian + Eggs", "Non-vegetarian", "Pescatarian"].map((diet) => (
                <button
                  key={diet}
                  onClick={() => updateQuizState({ dietType: [diet] })}
                  className={quizState.dietType.includes(diet) ? "w-full p-4 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-left" : "w-full p-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-left"}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Flame size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health goals</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Lose Weight", "Gain Muscle", "Eat Healthier", "Boost Energy", "Better Sleep", "Heart Health"].map((goal) => (
                <button
                  key={goal}
                  onClick={() => {
                    const current = quizState.healthGoals;
                    const updated = current.includes(goal) ? current.filter((g: string) => g !== goal) : [...current, goal];
                    updateQuizState({ healthGoals: updated });
                  }}
                  className={quizState.healthGoals.includes(goal) ? "p-3 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-sm" : "p-3 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-sm"}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Thermometer size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health conditions</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["None", "Diabetes", "High BP", "PCOS", "Thyroid", "Other"].map((condition) => (
                <button
                  key={condition}
                  onClick={() => {
                    const current = quizState.healthConditions;
                    const updated = current.includes(condition) ? current.filter((c: string) => c !== condition) : [...current, condition];
                    updateQuizState({ healthConditions: updated });
                  }}
                  className={quizState.healthConditions.includes(condition) ? "p-3 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-sm" : "p-3 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-sm"}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cooking time preference</h2>
            </div>
            <div className="space-y-2">
              {["Under 15 min", "15-30 min", "30-45 min", "45+ min"].map((time) => (
                <button
                  key={time}
                  onClick={() => updateQuizState({ cookingTime: time })}
                  className={quizState.cookingTime === time ? "w-full p-4 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-left" : "w-full p-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-left"}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ChefHat size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kitchen appliances</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Microwave", "Air Fryer", "Oven", "Blender", "Instant Pot", "None"].map((appliance) => (
                <button
                  key={appliance}
                  onClick={() => {
                    const current = quizState.appliances;
                    const updated = current.includes(appliance) ? current.filter((a: string) => a !== appliance) : [...current, appliance];
                    updateQuizState({ appliances: updated });
                  }}
                  className={quizState.appliances.includes(appliance) ? "p-3 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-sm" : "p-3 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-sm"}
                >
                  {appliance}
                </button>
              ))}
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Scale size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your weight journey</h2>
              <p className="text-sm text-gray-500">We will personalize your plan</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Current weight (kg)</label>
                <input
                  type="number"
                  value={quizState.currentWeight || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ currentWeight: parseInt(e.target.value) || null })}
                  placeholder="0"
                  className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center"
                />
              </div>
              {quizState.healthGoals.includes("Lose Weight") && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Target weight (kg) — optional</label>
                  <input
                    type="number"
                    value={quizState.targetWeight || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ targetWeight: parseInt(e.target.value) || null })}
                    placeholder="0"
                    className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Foods you love</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Chicken", "Fish", "Eggs", "Paneer", "Rice", "Pasta", "Pizza", "Burgers", "Salads", "Soups", "Desserts", "Fruits"].map((food) => (
                <button
                  key={food}
                  onClick={() => {
                    const current = quizState.lovedFoods;
                    const updated = current.includes(food) ? current.filter((f: string) => f !== food) : [...current, food];
                    updateQuizState({ lovedFoods: updated });
                  }}
                  className={quizState.lovedFoods.includes(food) ? "p-2 rounded-xl border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-xs" : "p-2 rounded-xl border-2 border-gray-100 text-gray-700 font-medium text-xs"}
                >
                  {food}
                </button>
              ))}
            </div>
          </div>
        );
      case 11:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Activity size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Meals per day</h2>
            </div>
            <div className="flex justify-center gap-4">
              {[2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => updateQuizState({ mealsPerDay: num })}
                  className={quizState.mealsPerDay === num ? "w-16 h-16 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-bold text-xl" : "w-16 h-16 rounded-2xl border-2 border-gray-100 text-gray-700 font-bold text-xl"}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );
      case 12:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Zap size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Meal times</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Breakfast", key: "breakfast" as const, icon: Sun },
                { label: "Lunch", key: "lunch" as const, icon: UtensilsCrossed },
                { label: "Snack", key: "snack" as const, icon: Coffee },
                { label: "Dinner", key: "dinner" as const, icon: Moon },
              ].map(({ label, key, icon: Icon }) => (
                <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
                  <Icon size={20} className="text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700 w-20">{label}</span>
                  <input
                    type="time"
                    value={quizState.mealTimes[key]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ mealTimes: { ...quizState.mealTimes, [key]: e.target.value } })}
                    className="flex-1 p-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 13:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Age</h2>
            </div>
            <input
              type="number"
              value={quizState.age || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ age: parseInt(e.target.value) || null })}
              placeholder="Enter your age"
              className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center text-lg font-medium"
            />
          </div>
        );
      case 14:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Droplets size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Snacks per day</h2>
            </div>
            <div className="flex justify-center gap-4">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => updateQuizState({ snacksPerDay: num })}
                  className={quizState.snacksPerDay === num ? "w-16 h-16 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 font-bold text-xl" : "w-16 h-16 rounded-2xl border-2 border-gray-100 text-gray-700 font-bold text-xl"}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );
      case 15:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Smile size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Avoid flavors</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Very Spicy", "Bitter", "Sour", "Very Sweet", "Fishy", "Pungent"].map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => {
                    const current = quizState.avoidedFlavors;
                    const updated = current.includes(flavor) ? current.filter((f: string) => f !== flavor) : [...current, flavor];
                    updateQuizState({ avoidedFlavors: updated });
                  }}
                  className={quizState.avoidedFlavors.includes(flavor) ? "p-3 rounded-2xl border-2 border-red-500 bg-red-50 text-red-700 font-semibold text-sm" : "p-3 rounded-2xl border-2 border-gray-100 text-gray-700 font-medium text-sm"}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>
        );
      case 16:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Check size={40} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All set!</h2>
              <p className="text-sm text-gray-500">Your personalized plan is ready</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 space-y-2">
              <p className="text-sm text-gray-700"><span className="font-semibold">Name:</span> {quizState.name || "Not set"}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Diet:</span> {quizState.dietType.join(", ") || "Not set"}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Goals:</span> {quizState.healthGoals.join(", ") || "Not set"}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Weight:</span> {quizState.currentWeight ? quizState.currentWeight + " " + quizState.weightUnit : "Not set"}</p>
            </div>
            <button
              onClick={finishQuiz}
              className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-lg"
            >
              Start My Journey
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-500">Step {quizStep} of {totalQuizSteps}</span>
            <span className="text-xs font-semibold text-green-600">{Math.round((quizStep / totalQuizSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${(quizStep / totalQuizSteps) * 100}%` }} />
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {renderStep()}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-gray-100 max-w-md mx-auto w-full">
        <div className="flex gap-3">
          {quizStep > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="flex-1 py-3 rounded-2xl bg-green-500 text-white font-semibold flex items-center justify-center gap-2"
          >
            {quizStep === totalQuizSteps ? "Finish" : "Next"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
