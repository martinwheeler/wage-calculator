import * as React from "react";
import { useState, useEffect } from "react";
import "./FinanceDataInput.scss";

interface Props {
  type: string;
  required: boolean;
  label: string;
  errorMessage?: string;
}

const FinanceDataInput = (prop: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="centered">
      <div className="group">
        <input
          value={value}
          type={prop.type}
          onChange={handleChange}
          id="name"
          required={prop.required}
        />
        <label
          htmlFor="name"
          className={prop.errorMessage ? "redLabel" : "label"}
          id="label"
        >
          {prop.label}
        </label>
        {prop.errorMessage ? prop.errorMessage : ""}
        <div className={prop.errorMessage ? "errorBar" : "bar"}></div>
      </div>
    </div>
  );
};

export default FinanceDataInput;
