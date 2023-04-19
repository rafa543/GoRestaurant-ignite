import {
  useEffect,
  useState
} from 'react';
import ReactModal from 'react-modal';

interface ModalType {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
}

export function Modal({ children, isOpen, setIsOpen }: ModalType) {
  const [modalStatus, setModalState] = useState(false)

  // useEffect(() => {
  //   if (isOpen) {
  //     setModalState(false)
  //   } else {
  //     setModalState(true)
  //   }
  // }, [])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
