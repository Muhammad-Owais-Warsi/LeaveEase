import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FacultyApplicationType } from "./Applications";
import axios from "axios";
import Applications from "./Applications"
import { Pagination } from "@nextui-org/react";

export default function FacultyAdvisorApplications() {


  const [isData, setIsData] = useState<FacultyApplicationType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalRecord,setTotalRecord] = useState<number>();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);



  useEffect(() => {
    const department = queryParams.get("department");
    const section = queryParams.get("section");

    if (department && section) {
      const fetchData = async () => {
        try {
          const result = await axios.post("http://localhost:4000/facultyAdvisor/applications", {
            department,
            section,
            page

          });
          setIsData(result.data.message);
          setTotalRecord(result.data.total / 2);
          

        } catch (err) {
          setError("Failed to fetch data. Please try again later.");
          console.error(err);
        }
      };

      fetchData();
    } else {
      setError("Invalid query parameters.");
    }
  }, [location.search, page]);

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }



  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto">
        <Applications data={isData} />
      </div>
      <div className="p-4">
        <Pagination total={totalRecord || 10} initialPage={1} onChange={(e) => setPage(e)} />
      </div>
    </div>
  )
}