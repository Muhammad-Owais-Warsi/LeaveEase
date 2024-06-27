import { useEffect, useState } from "react";
import { AccordionBox } from "./accordian";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { FormDataType } from "./modal";
import { useLocation } from "react-router-dom";

type DataType = {
  email: string;
  registerNumber: string;
  status: number;
  form: FormDataType;
};

type ApplicationType = {
  updateApplicationWithdrawn : () => void
}

export default function ApplicationStatus({updateApplicationWithdrawn}:ApplicationType) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [isData, setIsData] = useState<DataType | undefined>(undefined);

  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const email = queryParams.get("email");
    const registerNumber = queryParams.get("registerNumber");

    if (email && registerNumber) {
      const FetchData = async () => {
        try {
          const result = await axios.post("http://localhost:4000/application/status" , {
            email,
            registerNumber
          });
          setIsData(result.data.isUser);
        } catch (err) {
          console.error(err);
        } 
      };

      FetchData();
    } else {
   
      setError("Invalid query parameters.");
    }
  }, [location.search]);



  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <>
      {isData ? (
        <AccordionBox status={isData.status} form={isData.form} updateApplicationWithdrawn={updateApplicationWithdrawn}/>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      )}
    </>
  );
}
