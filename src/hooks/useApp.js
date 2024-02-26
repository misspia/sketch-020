import { useState } from "react";
import { AppStage } from "@constants/app";

export const useApp = () => {
  const [stage] = useState(AppStage.LIST);

  return { stage };
};
