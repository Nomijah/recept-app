"use client";
import { Button, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  return (
    <div className="div-main">
      <Title>Mina recept</Title>
      <Button onClick={() => router.push("/recipe/add-recipe")}>
        Lägg till recept
      </Button>
    </div>
  );
}
