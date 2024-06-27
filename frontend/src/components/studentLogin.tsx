import { useState } from "react"
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button} from "@nextui-org/react";
import LoadSpinner from "../icons/spinner";


type StudenProps = {
    updateStatus : () => void
}

export default function StudentLogin({updateStatus} : StudenProps) {


    const [email, setEmail] = useState<string>("");
    const [registerNumber, setRegisterNumber] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);

    const navigate = useNavigate();


    const submit = async (event: React.FormEvent) => {
        if(!email || !registerNumber) {
            toast.warning("Missing");
            return ;
        }
        event.preventDefault();
        setLoading(true);
        setEmail("");
        setRegisterNumber("");
        await login()
        .then(() => {
            updateStatus();
            setLoading(false);
            navigate("/leaveApplication")
        })
        .catch(() => {
            toast.error("Error")
            setLoading(false)
            return ;
        })


 
    }

    const login = async () => {
        try {
            const loggedIn = await axios.post("http://localhost:4000/student/login", {
                email,
                registerNumber
            });
            return loggedIn;
        } catch (error) {
            throw (error)
        }
    }








    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto relative right-2"
                        src="https://sp.srmist.edu.in/srmiststudentportal/resources/Image/srmist.jpg"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 underline">
                        Student Login
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
                            <Button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={submit}
                                isLoading={loading}
                                spinner={<LoadSpinner/>}
                                
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}