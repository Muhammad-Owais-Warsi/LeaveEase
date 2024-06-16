import { useState } from "react"
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./navbar";


type FacultyAdvisorType = {
    updateFacultyAdvisorLoggedIn: () => void;
}



export default function FacultyAdvisorLogin({updateFacultyAdvisorLoggedIn}:FacultyAdvisorType) {


    const [email, setEmail] = useState<string>("");
    const [password, setPassowrd] = useState<string>("");
    const [department,setDepartment] = useState<string>("Cse");
    const [section,setSection] = useState<string>("A");

    const navigate = useNavigate();


    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(!email || !password || !department || !section) {
            toast.warning("Missing Fields");
            return ;
        }

        toast.promise(login(), {
            loading: "Submitting",
            success: (data) => {
                setEmail("");
                setPassowrd("");
                updateFacultyAdvisorLoggedIn();
                navigate(`/facultyAdvisor/application?department=${department}&section=${section}`)
                return "Success";
            },
            error: (error) => {
                console.error(error);
                return 'Error';
            },
        })
    }

    const login = async () => {
        try {
            const loggedIn = await axios.post("http://localhost:4000/facultyAdvisor/login", {
                email,
                password,
            });
            return loggedIn;
        } catch (error) {
            throw (error)
        }
    }








    return (
        <>
            <Toaster richColors position="top-center"/>
            <Nav />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto relative right-2"
                        src="https://sp.srmist.edu.in/srmiststudentportal/resources/Image/srmist.jpg"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 underline">
                        Faculty Advisor Login
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
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setPassowrd(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                                    Department
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="department"
                                        name="department"
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
                            <div className="col-span-1">
                                <label htmlFor="section" className="block text-sm font-medium leading-6 text-gray-900">
                                    Section
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="section"
                                        name="section"
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