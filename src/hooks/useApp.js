import { useState } from "react";
import { AppStage } from "@constants/app";

export const useApp = () => {
  const [stage] = useState(AppStage.ENTRY);

  return { stage };
};
