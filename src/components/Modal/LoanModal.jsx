import React, { useState } from "react";
import Button from "../Button/Button";

const LoanModal = ({ isOpen, onCloseModal, onSave }) => {
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [terms, setTerms] = useState("");

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSave = () => {
    const loanDetails = {
      downPayment,
      monthlyPayment,
      terms,
    };
    onSave(loanDetails);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
        <h3 className="text-lg font-bold leading-6 text-gray-900">Loan</h3>
        <input
          type="text"
          placeholder="Enter down payment"
          value={downPayment}
          onChange={(e) => handleInputChange(e, setDownPayment)}
          className="border mt-2 border-gray-300 p-2 mb-4 w-full focus:outline-none"
        />
        <input
          type="text"
          placeholder="Enter monthly payment"
          value={monthlyPayment}
          onChange={(e) => handleInputChange(e, setMonthlyPayment)}
          className="border border-gray-300 p-2 mb-4 w-full focus:outline-none"
        />
        <input
          type="text"
          placeholder="Enter terms"
          value={terms}
          onChange={(e) => handleInputChange(e, setTerms)}
          className="border border-gray-300 p-2 mb-4 w-full focus:outline-none"
        />
        <div className="flex justify-end space-x-4">
          <Button
            className={"border-[2px]"}
            variant="white"
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default LoanModal;
