import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import bglanding from "../assets/bglanding.svg";
import PaymentModal from "./PaymentModal";
import ComingSoonOverlay from './comingSoonOverlay';

const Payments = () => {

  const [couponCode, setCouponCode] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundImage: `url(${bglanding})` }}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Basic Plan Card */}
          <div className="w-[444px] bg-white  border-2 shadow-2xl overflow-hidden rounded-2xl">
            <div className="h-32 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400"></div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹199</span>
                <span className="text-lg text-gray-600">/ month</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Choose Basic
              </h3>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">
                    Up to 10-15 leads per month
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Basic profile visibility</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Standard support</span>
                </div>
              </div>

              {/* Subscribe Button */}
              <button className="w-full py-3 px-6 border-2 border-orange-400 text-orange-500 font-semibold rounded-full hover:bg-orange-50 transition-colors"
                 onClick={()=>{
                  setShow(true);
                 }}
              >
                Subscribe
              </button>
              {
                show && (<>
                <PaymentModal onClose={() => setShow(false)}/>
                </>)
              }
        
            </div>
          </div>

          {/* Coupon Code Card */}
          <ComingSoonOverlay>
            (
          <div className="w-[343px] bg-white rounded-2xl shadow-2xl overflow-hidden ">
            
            <div className="p-6 pt-8">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-4 mb-6 relative overflow-hidden">

                <div className="flex items-center gap-2 text-white">
                  <ArrowRight className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    Have a coupon code?
                  </span>
                </div>
                
              </div>

              {/* Coupon Input */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none outline-none text-gray-700 placeholder-gray-500"
                />

                <button className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  Apply Code
                </button>

                
              </div>
              
            </div>
            
          </div>)
          </ComingSoonOverlay>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="mt-20 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Terms of Service
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Contact Us
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Payments;