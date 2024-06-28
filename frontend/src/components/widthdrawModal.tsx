import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadSpinner from "../icons/spinner";




type Props = {
    email: string,
    registerNumber: string,
    updateApplicationWithdrawn: () => void
}


type ModalType = {
    isOpen: boolean,
    onClose: () => void,
    props: Props


}




export default function WidthdrawModalBox({ isOpen, onClose, props}: ModalType) {

    

    const navigate = useNavigate();

    const [loading,setLoading] = useState<boolean>(false);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)

        try {
            await submitForm();
            props.updateApplicationWithdrawn()
            navigate("/application/withdrawn/success")
        } catch (error) {
            toast.error("Error");
            console.error("Submission failed:", error);
        }
    };



    const submitForm = async () => {
        try {
            const isSubmit = await axios.post(import.meta.env.VITE_APPLICATION_STATUS_WITHDRAW , {

                email: props.email,
                registerNumber: props.registerNumber

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
                                    Are You sure you want to Widthdraw the Application ?
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