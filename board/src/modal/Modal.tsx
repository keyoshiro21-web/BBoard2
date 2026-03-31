import React, { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ConfirmModal } from "./ConfirmModal";

type ModalProps = {
  children: React.ReactNode;
  isOpened: boolean;
  onClose: () => void;
};

export const Modal: FC<ModalProps> = ({ children, isOpened, onClose }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [isOpened]);

  if (!isOpened) return null;

  return createPortal(
    <>
      <div className="modal">
        <div className="modalOverlay" onClick={() => setOpen(true)} />
        <div className="modalText">
          <button
            className="closeButton"
            type="button"
            onClick={() => setOpen(true)}
          >
            &times;
          </button>
          <ConfirmModal
            isOpened={isOpen}
            onCansel={() => setOpen(false)}
            onConfirm={() => {
              setOpen(false);
              onClose();
            }}
          />
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};
