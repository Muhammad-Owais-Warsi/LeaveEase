import Nav from "./navbar";
import StudentLogin from "./studentLogin";
import { Toaster } from "sonner";


type HomeProps = {
    updateStatus: () => void;
};



export default function Home({updateStatus} : HomeProps) {
    return (
        <>
            <Toaster position="top-center" richColors/>
            <Nav user={"student"}/>
            <StudentLogin updateStatus={updateStatus}/>
        </>
    )
}