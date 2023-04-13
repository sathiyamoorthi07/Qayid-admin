import { useUI } from "@/context/uiContext";

// const TestModal = dynamic(() => import("@/components/test-modal/test"));

const ManagedModal: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();

  return (
    <>
      {/* {modalView.includes("TEST_MODAL") && (
        <Modal open={modalView.includes("TEST_MODAL")} onClose={closeModal}>
          <TestModal />
        </Modal>
      )}

      {modalView.includes("SECOND_MODAL") && (
        <Modal open={modalView.includes("SECOND_MODAL")} onClose={closeModal}>
          <Secondtest />
        </Modal>
      )} */}
    </>
  );
};

export default ManagedModal;
