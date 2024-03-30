import {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  useEffect,
} from "react";

export type ModalRefType = {
  toggleModal: (open?: boolean) => void;
  setChild: (child: ReactNode) => void;
};

type ModalProps = {
  children?: ReactNode;
};

const Modal = forwardRef<ModalRefType, ModalProps>(({ children }, ref) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const child = useRef<ReactNode>(<></>);

  const [open, setOpen] = useState(false);

  const setChild = (c: ReactNode) => (child.current = c);
  const toggleModal = (open: boolean = true) => {
    const modal = modalRef.current;
    const overlay = overlayRef.current;

    open
      ? (document.body.style.overflow = "hidden")
      : document.body.style.removeProperty("overflow");

    if (open) setOpen(true);
    else {
      modal?.classList.remove("active");
      overlay?.classList.remove("active");

      setTimeout(() => setOpen(false), 300);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      toggleModal,
      setChild,
    }),
    []
  );

  useEffect(() => {
    const modal = modalRef.current;
    const overlay = overlayRef.current;

    if (open) {
      setTimeout(() => overlay?.classList.add("active"));
      setTimeout(() => modal?.classList.add("active"), 200);
    }
  }, [open]);

  return (
    open && (
      <>
        <div id="app-modal" ref={modalRef}>
          <button onClick={() => toggleModal(false)}>X</button>
          {children || child.current}
        </div>
        <div id="app-modal-overlay" ref={overlayRef}></div>
      </>
    )
  );
});
export default Modal;
