import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

type NavType = {
    user ?: string
}

export default function Nav({ user }: NavType) {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const menuItems = [
        {head:"Faculty Advisor", path:"/facultyAdvisor/login"},
        {head:"Hostel Co-ordinator", path:"/hostelCoordinator/login"},
        {head:"Head Of Department (H.O.D)", path:"/headOfDepartment/login"},
        {head:"View Application", path:"/applicationStatus/login"}
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-[rgb(51,122,183)] text-[rgb(255,255,255)]">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className="mr-auto">
                    <a href="/" className="font-bold text-[rgb(255,255,255)]">SRM LEAVE PORTAL</a>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                color="primary"
                                variant="solid"
                                className="capitalize bg-[rgb(255,255,255)] text-[rgb(51,122,183)]"
                            >
                                Faculties
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dropdown Variants"
                            className="bg-white text-[rgb(51,122,183)]"
                            variant="solid"
                            color="primary"
                        >
                            <DropdownItem onClick={() => navigate("/facultyAdvisor/login")}>Faculty Advisor</DropdownItem>
                            <DropdownItem onClick={() => navigate("/hostelCoordinator/login")}>Hostel Co-ordinator</DropdownItem>
                            <DropdownItem onClick={() => navigate("/headOfDepartment/login")}>Head Of Department (H.O.D)</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                {
                    user ? <NavbarItem>
                        <Link href="/applicationStatus/login" aria-current="page" className="text-[rgb(255,255,255)] ">
                            View Application Status
                        </Link>
                    </NavbarItem> : null
                }

            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full text-lg "
                            href={item.path}
                            color="primary"

                        >
                            {item.head}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
