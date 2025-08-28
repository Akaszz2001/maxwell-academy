// hooks/useNavigationBlocker.ts
import { useContext, useEffect } from "react";
import {
  UNSAFE_NavigationContext as NavigationContext,
} from "react-router-dom";

export function useNavigationBlocker(blocker: () => boolean) {
  const navigator = useContext(NavigationContext).navigator as any;

  useEffect(() => {
    if (!navigator.block) return;

    const unblock = navigator.block((tx: any) => {
      if (blocker()) {
        tx.retry(); // allow navigation
      }
    });

    return unblock;
  }, [navigator, blocker]);
}
