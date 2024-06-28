import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadSpinner from "../icons/spinner";





export type FormDataType = {
  image : string;
  firstName: string;
  lastName: string;
  email: string;
  registerNumber: string;
  department: string;
  section: string;
  year: string;
  hostel: string;
  roomNumber: string;
  postalCode: string;
  dateOut: string;
  dateIn: string;
  reason: string;
  studentPhoneNumber: string;
  parentPhoneNumber: string;

};

type ModalType = {
  isOpen: boolean,
  onClose: () => void,
  FormData: FormDataType,
  updateApplication: () => void
}




export default function ModalBox({ isOpen, onClose, FormData, updateApplication }: ModalType) {


  const navigate = useNavigate();

  const [loading,setLoading] = useState<boolean>(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();


    // Validate fields
    for (let key in FormData) {
      if (!FormData[key as keyof FormDataType]) {
        toast.warning(`Missing Field: ${key}`);
        console.log(`Missing Field: ${key}`);
        return;
      }
    }

    // Submit form
    try {
      setLoading(true)
      await submitForm()
      .then(() => {
        setLoading(false)
        updateApplication();
        navigate(`/success`);
      })

    } catch (error) {
      console.error("Submission failed:", error);
    }
  };



  const submitForm = async () => {
    try {
        const isSubmit = await axios.post(import.meta.env.VITE_APPLICATION_FORM,{
            FormData
        });
        return isSubmit;
    } catch (error) {
        throw (error)
    }
}






  return (
    <>
      <Toaster richColors position="top-center" />
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmation</ModalHeader>
              <ModalBody>
                <p>
                  Are You sure you want to submit the form ?
                </p>


              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={submit} isLoading={loading} spinner={<LoadSpinner/>}>
                  Confirm
                </Button>
              </ModalFooter>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}