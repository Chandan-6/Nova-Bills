import DetailCard from "./DetailCard";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "../components/Navbars/NavbarAfterLogin";
import TableRow from "./TableRow.jsx";
import BilledToInfo from "../../utils/BilledTo/BillledToInfo.js";
import Show from "../components/PopupModals/Show.jsx";

export default function InvoiceInput() {

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    dueDate: "",
    client: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    phoneNumber: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRowInputChange = (e, index) => {
    const { name, value } = e.target;
    const newRow = [...rows];
    newRow[index] = { ...newRow[index], [name]: value };
    if (name === "qty" || name === "rate") {
      const qty = parseFloat(newRow[index].qty || 0);
      const rate = parseFloat(newRow[index].rate || 0);
      newRow[index].amount = (qty * rate).toFixed(2);
    }
    setRows(newRow);
  };

  const handleAddRows = (e) => {
    e.preventDefault();
    setRows([...rows, { amount: 0, id: rows.length }]);
  };

  const handleDeleteRow = (e, id) => {
    e.preventDefault();
    const updatedRows = rows.filter((row, index) => index !== id);
    setRows(updatedRows);
  };

  return (
    <div
      className="bg-image bg-fixed bg-center bg-no-repeat bg-cover pb-12"
      id="InvoiceInput"
    >
      {/* <div className="absolute inset-0 backdrop-filter backdrop-blur-lg h-full"> */}
      <NavbarAfterLogin />

      <div className="w-3/4 h-auto bg-gray-100 backdrop-blur-md bg-opacity-35 flex justify-center items-center mx-auto my-10 rounded-md border border-gray-400 shadow-md shadow-slate-700">
        <form
          action=""
          className="w-full flex flex-col justify-center items-center space-y-6 p-8"
        >
          <p className="text-3xl font-mono">Invoice</p>

          <div className="flex w-full justify-around ">
            <div className="input flex flex-col w-fit static">
              <label
                htmlFor="dueDate"
                className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-1 py-0.5 drop-shadow-lg bg-[#e8e8e863] rounded-md  w-fit"
              >
                Due Date (optional):
              </label>
              <input
                onChange={handleInput}
                id="dueDate"
                type="date"
                value={formData.dueDate}
                placeholder="Write here..."
                name="dueDate"
                className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e847] border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
              />
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 w-full">
            <div className="bg-gray-400 bg-opacity-50 rounded-lg p-6 flex flex-col w-1/2 shadow-lg space-y-4">
              <p className="text-left text-xl font-medium border-b border-dashed border-gray-700 w-fit mb-3">
                Billed To{" "}
                <span className="text-sm text-slate-700">Client Details</span>
              </p>
              <div className="w-full flex flex-col space-y-8">
                {BilledToInfo.map((item, index) => (
                  <DetailCard
                    key={index}
                    id={index}
                    label={item.lable}
                    name={item.name}
                    type={item.type}
                    onInput={handleInput}
                    value={formData[item.name]}
                  />
                ))}
              </div>
            </div>
          </div>

          <table className="w-full space-y-6">
            <thead>
              <tr>
                <th className="border border-slate-600 bg-blue-600 py-2 text-left px-4">
                  Item
                </th>
                <th className="border border-slate-600 bg-blue-600 py-2 text-left px-4">
                  Quantity
                </th>
                <th className="border border-slate-600 bg-blue-600 py-2 text-left px-4">
                  Rate
                </th>
                <th className="border border-slate-600 bg-blue-600 py-2 text-left px-4">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 backdrop-blur-lg bg-opacity-30">
              {rows.map((_, index) => (
                <TableRow
                  key={index}
                  index={index}
                  handleRowInputChange={handleRowInputChange}
                  rows={rows}
                  handleDeleteRow={handleDeleteRow}
                />
              ))}
            </tbody>
          </table>

          <button
            onClick={(e) => handleAddRows(e)}
            className="borderborder-gray-800 w-full py-3 bg-slate-100 bg-opacity-50 rounded-xl flex justify-center items-center space-x-1 shadow hover:shadow-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="blue"
              className="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>{" "}
            <span>Add New Item</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("row data : ", rows);
              console.log("billed to : ", formData);
              navigate("/selectTemplate", {state : {billedTo : formData, items : rows}})
            }}
            className="bg-cyan-500  rounded-md px-6 py-2 text-white shadow-md hover:shadow-xl tracking-wide"
          >
            Confirm & Continue
          </button>
        </form>
      </div>
      {showModal && <Show onClose={() => setShowModal(false)} />}
      {/* </div> */}
    </div>
  );
}