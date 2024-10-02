"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function CompletedPage() {
  const [catPhotoUrl, setCatPhotoUrl] = useState();

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search").then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setCatPhotoUrl(data[0].url);
    });
  }, [])


  return (
    <>
      <h2 className="p-5 m-5 text-center">
          You have completed the challenge! Congratulations. Eat your food if you have not finished yet. You get to go to school now :D
      </h2>
      {catPhotoUrl ? <img src={catPhotoUrl} className="block mx-auto my-5 p-2" alt="Cute Cat" /> : null }
    </>
  )
}
