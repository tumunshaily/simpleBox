import { type ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
  targetId: string;
};

const Portal = ({ children, targetId }: PortalProps) => {
  const target = document.getElementById(targetId);

  if (!target) {
    console.warn(`Portal target "${targetId}" not found.`);
    return null;
  }

  return createPortal(children, target);
};

export default Portal;
