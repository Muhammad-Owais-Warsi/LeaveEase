import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useRef } from 'react';
import { Button } from '@nextui-org/react';
import { useDisclosure } from '@nextui-org/react';
import ModalBox from './modal';
import { toast } from 'sonner';



type ApplicationProps = {
    updateApplication: () => void;
}


export default function Application({ updateApplication }: ApplicationProps) {


    const { isOpen, onOpen, onClose } = useDisclosure();


    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const [image, setImage] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [registerNumber, setRegisterNumber] = useState<string>("");
    const [department, setDepartment] = useState<string>("Cse");
    const [section, setSection] = useState<string>("A");
    const [year, setYear] = useState<string>("I");
    const [hostel, setHostel] = useState<string>("BH-I");
    const [roomNumber, setRoomNumber] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [dateOut, setDateOut] = useState<string>("");
    const [dateIn, setDateIn] = useState<string>("");
    const [reason, setReason] = useState<string>("Semester Break");
    const [studentPhoneNumber, setStudentPhoneNumber] = useState<string>("");
    const [parentPhoneNumber, setParentPhoneNumber] = useState<string>("");



    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const maxSize = 100 * 1024;
            if (file.size > maxSize) {
                toast.warning("Image should be less than 1MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string; // Result is already a base64 string
                console.log(imageDataUrl)
                setImage(imageDataUrl);

            };
            reader.readAsDataURL(file); 

        }
    };


    const handleFileChange = () => {
        fileInputRef.current?.click();
    }

    const reset = () => {
        window.location.reload();
    }

    image ? console.log(image) : console.log(1);
    


    return (
        <div className="m-10 p-10">
            <ModalBox isOpen={isOpen} onClose={onClose} FormData={{ image, firstName, lastName, email, registerNumber, department, section, year, hostel, roomNumber, postalCode, dateOut, dateIn, reason, studentPhoneNumber, parentPhoneNumber }} updateApplication={updateApplication} />

            <form>
                <div className="space-y-10">
                    <div className="border-b border-gray-900/10 pb-12">
                        <img
                            className="h-10 w-auto relative flex justify-start sm:mb-0 mb-4"
                            src="https://sp.srmist.edu.in/srmiststudentportal/resources/Image/srmist.jpg"
                            alt="Your Company"
                        />
                        <h1 className="font-semibold leading-7 text-gray-900 flex justify-center text-3xl underline relative bottom-10">Leave Application</h1>

                        <div className="col-span-full flex flex-col items-center">
                            <div className="mt-2 flex flex-col items-center gap-y-3">
                                {image ? (
                                    <img src={image} alt="Selected" className="h-20 w-20 object-cover rounded-full" />
                                ) : (
                                    <UserCircleIcon className="h-20 w-20 text-gray-300" aria-hidden="true" />
                                )}
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                />

                                <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    onClick={handleFileChange}
                                >
                                    Change
                                </button>
                            </div>
                        </div>


                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Registration Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setRegisterNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Department
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={(e) => setDepartment(e.target.value)}
                                    >
                                        <option>Cse</option>
                                        <option>Mechanical</option>
                                        <option>Medical</option>
                                        <option>Arts & Architecture</option>
                                        <option>Information Technology (I.T)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Section
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={(e) => setSection(e.target.value)}
                                    >
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                        <option>E</option>
                                        <option>F</option>
                                        <option>G</option>
                                        <option>H</option>
                                        <option>I</option>
                                    </select>
                                </div>
                            </div>


                            <div className="sm:col-span-2 ">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Year
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={(e) => setYear(e.target.value)}
                                    >
                                        <option>I</option>
                                        <option>II</option>
                                        <option>III</option>
                                        <option>IV</option>

                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Hostel Name
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={(e) => setHostel(e.target.value)}
                                    >
                                        <option>BH-I</option>
                                        <option>BH-II</option>
                                        <option>SGN</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Room Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type='number'
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setRoomNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Date Out
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="first-name"
                                        id="first-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setDateOut(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Date In
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="first-name"
                                        id="first-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setDateIn(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Reason
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={(e) => setReason(e.target.value)}
                                    >
                                        <option>Health Issues</option>
                                        <option>Family Emergency</option>
                                        <option>Semester Break</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Student Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setStudentPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Parent Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setParentPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button color="danger" onClick={reset}>
                        Delete
                    </Button>
                    <Button
                        color="primary"
                        variant="solid"
                        onPress={() => onOpen()}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}
