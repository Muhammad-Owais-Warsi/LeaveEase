import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast,Toaster } from "sonner";
import axios from "axios";
import Nav from "./navbar";


type ApplicationStatusType = {
    updateApplicationStatus: () => void;
}

type LoggedInDataType = {
    email:string,
    registerNumber:string
}

export default function ApplicationStatusLogin({updateApplicationStatus} : ApplicationStatusType) {



    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [registerNumber, setRegisterNumber] = useState<string>("");




    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (!email || !registerNumber) {
            toast.warning("Missing");
            return;
        }
    
        try {
            toast.promise(login(), {
                loading: "Submitting",
                success: (response) => {
                    const data = response.data as LoggedInDataType;
                    setEmail("");
                    setRegisterNumber("");
                    updateApplicationStatus();
                    const encodedEmail = encodeURIComponent(data.email);
                    const encodedRegisterNumber = encodeURIComponent(data.registerNumber);
                    toast.success("Login successful.");
                    navigate(`/application/status?email=${encodedEmail}&registerNumber=${encodedRegisterNumber}`)
                    return "Success";
                },
                error: (error) => {
                    console.error(error);
                    return 'Error';
                },
            });
        } catch (error) {
            console.error("Submit error:", error);
            toast.error("Submit failed. Please try again later.");
        }
    };
    
    const login = async () => {
        try {
            const loggedIn = await axios.post(import.meta.env.VITE_APPLICATION_STATUS_LOGIN , {
                email,
                registerNumber
            });
            return loggedIn;
        } catch (err) {
            throw err; // Throw error to be caught by the error handler in submit function
        }
    }
    


    return (
        <>
        <Toaster position="top-center" richColors/>
            <Nav/>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto relative right-2"
                        src="https://sp.srmist.edu.in/srmiststudentportal/resources/Image/srmist.jpg"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 underline">
                        Track Application
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Registration Number
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setRegisterNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={submit}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}