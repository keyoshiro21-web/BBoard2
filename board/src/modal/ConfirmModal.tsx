import React, { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";

type ConfirmModalProps = {
  isOpened: boolean;
  onConfirm: () => void;
  onCansel: () => void;
};

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpened,
  onCansel,
  onConfirm,
}) => {
  if (!isOpened) return null;

  return createPortal(
    <>
      <div className="confirm-modal">
        <div className="confirm-modalOverlay" onClick={onCansel} />
        <div className="confirm-modalText">
          <button className="confirmButton" type="button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="closeButton" type="button" onClick={onCansel}>
            &times;
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
};
