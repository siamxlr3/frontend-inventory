import React from "react";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
                Menu
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-4">
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/">
                            <span>brand</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/category">
                            <span>category</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/product">
                            <span>product</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/warehouse">
                            <span>warehouse</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/supplier">
                            <span>supplier</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/payment">
                            <span>payment</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/stock">
                            <span>stock</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/sell">
                            <span>sell</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/sell-item">
                            <span>sell-item</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/investment">
                            <span>investment</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/expense-categories">
                            <span>expense-categories</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/expense">
                            <span>expense</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/transaction">
                            <span>transaction</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/customer">
                            <span>customer</span>
                        </Link>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                        <Link to="/retail-customer">
                            <span>retail-customer</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
