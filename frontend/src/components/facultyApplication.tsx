import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Checkbox } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { FormDataType } from "./modal"; // Assuming this is where FormDataType is defined
import { columns } from "../icons/data"; // Assuming columns is an array of objects defining the table columns

type FacultyApplicationType = {
  department: string,
  section: string,
  form: FormDataType
}

type StudentSelectedType = {
  email: string,
  key:string,
  registerNumber: string
}

const Applications: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [isData, setIsData] = useState<FacultyApplicationType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [studentSelected, setStudentSelected] = useState<StudentSelectedType[]>([]);

  const generateKey = (email: string, registerNumber: string) => `${email}-${registerNumber}`;

  const handleCheckBox = (user: FacultyApplicationType) => {
    const { email, registerNumber } = user.form;
    const key = generateKey(email, registerNumber);

    const isSelected = studentSelected.some(student => student.key === key);

    if (isSelected) {
      setStudentSelected(prev =>
        prev.filter(student => student.key !== key)
      );
    } else {
      setStudentSelected(prev => [
        ...prev,
        { key, email, registerNumber }
      ]);
    }
  }

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

  console.log(studentSelected)

  const renderCell = useCallback((user: FacultyApplicationType, columnKey: string) => {
    const cellValue = user.form[columnKey as keyof FormDataType];

    switch (columnKey) {
      case "radio":
        return (
          <Checkbox
            size="md"
            onChange={() => handleCheckBox(user)}
     
          />
        );
      case "name":
        return (
          <div className="flex items-center space-x-4">
            <User
              avatarProps={{ radius: "lg", src: user.form.image }}
              description={user.form.registerNumber}
              name={`${user.form.firstName} ${user.form.lastName}`}
            />
          </div>
        );
      case "email":
      case "department":
      case "section":
      case "reason":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      default:
        return <>{cellValue}</>;
    }
  }, [studentSelected]);

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
            {isData.map((item,idx) => (
              <TableRow key={idx}>
                {columns.map((column) => (
                  <TableCell key={column.uid} className="align-middle p-4">
                    {renderCell(item, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
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

export default Applications;
