import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <div className="ms-0 pb-3 ">
        <div className="bg-gray-50 h-1/2 w-full  grid sm:grid-cols-2 grid-cols-2 place-items-center  lg:grid-cols-4">
          <div className="p-5 ">
            <ul>
              <p className="text-gray-800 font-bold text-3xl pb-6">
                <span className="text-blue-600">NepQue</span>
              </p>
              <div className="flex gap-6 pb-5">
                <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
                <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
                <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
                <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
              </div>
            </ul>
          </div>
          <div className="p-5">
            <ul>
              <p className="text-gray-800 font-bold text-2xl pb-4">Coupons</p>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Stocks
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Futures & Options
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Mutual Funds
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Fixed deposits
              </li>
            </ul>
          </div>
          <div className="p-5">
            <ul>
              <p className="text-gray-800 font-bold text-2xl pb-4">Stores</p>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                About
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Products
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Pricing
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Careers
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Press & Media
              </li>
            </ul>
          </div>
          <div className="p-5">
            <ul>
              <p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Contact
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Support Portals
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                List Of Charges
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Downloads & Resources
              </li>
              <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Videos
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-50">
        <h1 className=" text-gray-800 font-semibold text-center mt-[6px]">
          © All rights reserved |{" "}
          <span className="hover:text-blue-600 font-semibold cursor-pointer">
            NepQue❤
          </span>
        </h1>
      </div>
    </div>
  );
}

export default Footer;