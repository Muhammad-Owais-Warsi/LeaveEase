import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";



const WithdrawnCard = () => {



    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <div className="flex justify-center">
                    <div className="bg-green-500 rounded-full p-2">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </div>
                </div>
                <h2 className="text-center text-2xl font-bold mt-4">Congratulations</h2>
                <p className="text-center text-gray-600 mt-2">
                    Your Application has been successfully Withdrawn
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mt-6">
                    <h3 className="font-semibold">What's Next?</h3>
                    <p className="text-gray-600 mt-2">
                        Your application has been successfuly withdrawn. You can submit another leave Application
                    </p>
                </div>
                <div className="rounded-lg p-4 mt-4 cursor-pointer flex justify-between w-full">
                    <Button color="primary" variant="ghost" onClick={() => navigate("/")}>
                        Back Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WithdrawnCard;
