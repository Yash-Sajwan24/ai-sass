"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("2dcd3eec-c918-4149-9eff-c79656ff22e0");
  }, []);
  return null;
};
