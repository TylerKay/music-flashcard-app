"use client";
import LandingPage from "@/pages/LandingPage";
import MainCardPage from "@/pages/MainCardPage";
import CompletedPage from "@/pages/CompletedPage";

import { usePageStore } from "@/stores/usePageStore";
import React from "react";

export default function Home() {
  const { pageState } = usePageStore();
  // Initialize Component to Landing Page first. After button is clicked, go to MainCardPage

  

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white p-6">
        {pageState === 0 && <LandingPage />}
        {pageState === 1 && <MainCardPage />}
        {pageState === 2 && <CompletedPage />}

      </div>
    </>
  )
}
