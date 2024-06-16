import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Checkbox } from "@nextui-org/react";
import { columns } from "../icons/data"; // Assume columns is an array of objects defining the table columns
import { DisplayContent } from "./accordian";
import { Spinner } from "@nextui-org/react";
import { FormDataType } from "./modal";
import axios from "axios";
import { Accordion, AccordionItem } from "@nextui-org/react";

type FacultyApplicationType = {
  department: string,
  section: string,
  form: FormDataType
}

export default function Applications() {
 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [isData, setIsData] = useState<FacultyApplicationType[]>([]);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    const department = queryParams.get("department");
    const section = queryParams.get("section");

    if (department && section) {
      const fetchData = async () => {
        try {
          const result = await axios.post("http://localhost:4000/facultyAdvisor/applications", {
            department,
            section
          });
          setIsData(result.data.message);
        } catch (err) {
          setError("Failed to fetch data. Please try again later.");
          console.error(err);
        }
      };

      fetchData();
    } else {
      setError("Invalid query parameters.");
    }
  }, [location.search]);



  const renderCell = useCallback((user: FacultyApplicationType, columnKey: string) => {
    const cellValue = user.form[columnKey as keyof FormDataType];
  
    switch (columnKey) {
      case "radio":
        return <Checkbox size="md" />;
      case "name":
        return (
          <div className="flex items-center space-x-4">
            <User
              avatarProps={{ radius: "lg", src: user.form.image }}
              description={user.form.email}
              name={`${user.form.firstName} ${user.form.lastName}`}
            >
              {user.form.email}
            </User>
            <Accordion>
              <AccordionItem>
                <DisplayContent form={user.form}/>
              </AccordionItem>
            </Accordion>
          </div>
        );
      default:
        return <>{cellValue}</>;
    }
  }, []);
  

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <>
      {isData.length > 0 ? (
        <Table aria-label="table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={isData}>
            {(item) => (
              <TableRow key={`${item.department}-${item.section}`}>
                {columns.map((column) => (
                  <TableCell key={column.uid} className="align-middle p-4">
                    {renderCell(item, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      )}
    </>
  );
}
