import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { FormDataType } from "./modal";
import { Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import WidthdrawModalBox from "./widthdrawModal";
import { Chip } from "@nextui-org/react";


type AccordionType = {
    status: number;
    form: FormDataType;
    updateApplicationWithdrawn:() => void
};


type DisplayContentType = {
    form:FormDataType
}
function DisplayContent({ form }: DisplayContentType){
    return (
        <div className="p-6 max-w-4xl mx-auto font-sans border border-gray-200 rounded-lg shadow-md">
            <h1 className="text-2xl text-center mb-6 font-bold text-gray-800">Student Leave Application</h1>
            <div className="flex flex-col lg:flex-row items-start lg:space-x-6 space-y-6 lg:space-y-0">
                <div className="flex-shrink-0">
                    <img
                        src={form.image}
                        alt="Form"
                        className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="flex flex-wrap w-full">
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>First Name:</strong> <span>{form.firstName}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Last Name:</strong> <span>{form.lastName}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Email:</strong> <span>{form.email}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Register Number:</strong> <span>{form.registerNumber}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Department:</strong> <span>{form.department}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Section:</strong> <span>{form.section}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Year:</strong> <span>{form.year}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Hostel:</strong> <span>{form.hostel}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Room Number:</strong> <span>{form.roomNumber}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Postal Code:</strong> <span>{form.postalCode}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Date Out:</strong> <span>{form.dateOut}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Date In:</strong> <span>{form.dateIn}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Reason:</strong> <span>{form.reason}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Student Phone Number:</strong> <span>{form.studentPhoneNumber}</span>
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <strong>Parent Phone Number:</strong> <span>{form.parentPhoneNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};





function AccordionBox({ status, form,updateApplicationWithdrawn }: AccordionType){
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className="relative p-6 w-screen mx-auto font-sans rounded-lg shadow-md">
            <WidthdrawModalBox isOpen={isOpen} onClose={onClose} props={{ email: form.email, registerNumber: form.registerNumber,updateApplicationWithdrawn:updateApplicationWithdrawn}} />
            <Accordion selectionMode="multiple">
                <AccordionItem
                    key={status}
                    aria-label={`${form.firstName} ${form.lastName}`}
                    title={
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center">
                                <Avatar isBordered radius="lg" src={form.image} />
                                <span className="ml-4">{`${form.firstName} ${form.lastName}`}</span>
                            </div>
                            <div className="flex space-x-4 ml-auto">
                            <Chip color="warning" variant="bordered" className="mt-2">Pending</Chip>
                                <div className="hidden lg:block">
                                    <Button color="danger" onPress={onOpen}>
                                        Withdraw Application
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <DisplayContent form={form} />
                </AccordionItem>
            </Accordion>
            <div className="lg:hidden fixed bottom-4 right-4">
                <Button color="danger" onPress={onOpen}>
                    Withdraw Application
                </Button>
            </div>
        </div>
    );
};


export {DisplayContent,AccordionBox}