"use client";
import LandingPage from "@/components/ui/LandingPage";
import MainCardPage from "@/components/ui/MainCardPage";
import CompletedPage from "@/components/ui/CompletedPage";

import { useCardStore } from "@/components/ui/CardStore";
import { usePageStore } from "@/components/ui/usePageStore";

export default function Home() {
  const { setPageState, pageState, incrementPageState } = usePageStore();
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
