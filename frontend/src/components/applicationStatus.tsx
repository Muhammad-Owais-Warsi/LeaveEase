import { useEffect, useState } from "react";
import AccordionBox from "./accordian"; // Corrected the spelling here
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
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const email = queryParams.get("email");
    const registerNumber = queryParams.get("registerNumber");

    if (email && registerNumber) {
      const FetchData = async () => {
        try {
          const result = await axios.post(import.meta.env.VITE_APPLICATION_STATUS, {
            email,
            registerNumber
          });
          setIsData(result.data.isUser);
        } catch (err) {
          setError("Failed to fetch data. Please try again later.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      FetchData();
    } else {
      setLoading(false);
      setError("Invalid query parameters.");
    }
  }, [location.search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

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
