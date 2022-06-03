import React from "react";
import { NavLink } from "react-router-dom";


export default function NavBar() {
    return (
        <header className="bg-blue-600">
            <div className="container mx-auto flex justify-between">
                <nav className="flex">
                    <NavLink 
                        to="/" 
                        exact
        
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/" 
                        
                    >
                        Page 1
                    </NavLink>
                    <NavLink 
                        to="/" 
                
                    >
                        Page 2
                    </NavLink>
                    <NavLink 
                        to="/" 
                    >
                        Page 3
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}