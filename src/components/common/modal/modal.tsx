import React, { FC, useRef, useEffect, useState } from "react";
import Portal from "@reach/portal";
import { motion, AnimatePresence } from "framer-motion";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
  //@ts-ignore
} from "body-scroll-lock";
import cn from "classnames";
import { fadeInOut } from "@/utils/motion/fade-in-out";
import { zoomOutIn } from "@/utils/motion/zoom-out-in";
import { useUI } from "@/context/uiContext";
import useOnClickOutside from "@/utils/use-click-outside";

type ModalProps = {
  open?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  rootClassName?: string;
  useBlurBackdrop?: boolean;
  containerClassName?: string;
  variant?: "center" | "bottom";
  outsideClick?: boolean;
};
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

// variant based classes for modal root, container & close btn
const rootClasses = {
  center: "p-4 md:p-5",
  bottom: "p-5 pb-0",
};
const containerClasses = {
  center: "h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg",
  bottom: "h-full max-h-70vh bottom-0 rounded-ts-2xl rounded-te-2xl",
};
const closeBtnClasses = {
  center: "-top-3.5 md:-top-4 -end-3.5 md:-end-4",
  bottom: "top-1/4 start-1/2 transform -translate-y-1/2 -translate-x-1/2",
};

const Modal: FC<ModalProps> = ({
  children,
  open,
  onClose,
  rootClassName,
  useBlurBackdrop,
  containerClassName,
  variant = "center",
  outsideClick = true,
}) => {
  const { closeModal, setModalFixed, modalCloseButton, modalView } = useUI();
  const modalRootRef = useRef() as DivElementRef;
  const modalInnerRef = useRef() as DivElementRef;
  useOnClickOutside(modalInnerRef, () => {
    if (outsideClick && modalView.length == 1) {
      closeModal();
    }
  });

  useEffect(() => {
    if (modalInnerRef.current) {
      if (open) {
        disableBodyScroll(modalInnerRef.current);
      } else {
        enableBodyScroll(modalInnerRef.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  return (
    <div>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={modalRootRef}
            key="modal"
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOut(0.25)}
            className={cn(
              "modal-root fixed bg-black bg-opacity-70 inset-0 z-50 cursor-pointer",
              useBlurBackdrop && "backdrop-filter backdrop-blur-sm",
              rootClasses[variant],
              rootClassName
            )}
          >
            <motion.div
              initial="from"
              animate="to"
              exit="from"
              variants={zoomOutIn()}
              className="relative h-full mx-auto w-full"
            >
              <div
                className={cn(
                  "w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl p-5 bg-white",
                  containerClasses[variant],
                  containerClassName
                )}
              >
                {modalCloseButton ? (
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    aria-label="Close panel"
                    className={cn(
                      "fixed z-10 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow text-gray-600 transition duration-200 focus:outline-none focus:text-gray-800 focus:shadow-md hover:text-gray-800 hover:shadow-md",
                      closeBtnClasses[variant]
                    )}
                  >
                    X
                  </button>
                ) : null}

                <div
                  ref={modalInnerRef}
                  className="overflow-y-auto h-full"
                  style={{ maxHeight: "calc(100vh - 120px)" }}
                >
                  {children}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
