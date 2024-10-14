import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import * as math from "mathjs";
import { FormField } from "./pageHelpers";
const operators = ["+", "-", "/", "*", "%"];
const scientificFunctions = ["sin", "cos", "tan", "sqrt", "log"];

const buttons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ...operators,
  "(",
  ")",
  "~",
  ".",
  "0",
  ...scientificFunctions,
  "Clear",
  "=",
  "Clear All",
];

const getLastChar = (text = "") => text.slice(-1);

export const ScientificCalculator = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [prevResult, setPrevResult] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleScientificFunction = (func) => {
    setText((text) => text + func + "(");
  };

  const handleEquals = () => {
    const updatedState = calculate();
    setResult([...result, text]);
    setPrevResult([...prevResult, updatedState.text]);
    setText(updatedState.text);
  };

  const handleChange = ({ target: { value } }) => {
    let updatedText = text;

    if (scientificFunctions.includes(value)) {
      handleScientificFunction(value);
      return;
    }

    if (value === "=") {
      handleEquals();
      return;
    }

    if (value === "Clear" || value === "~") {
      updatedText = updatedText.slice(0, -1);
    } else if (value === "Clear All") {
      updatedText = "";
    } else if (
      operators.includes(value) &&
      operators.includes(getLastChar(updatedText))
    ) {
      updatedText = updatedText.slice(0, -1) + value;
    } else {
      updatedText += value;
    }

    const oprs = updatedText.replace(/^-/, "").split(/[*+-/]/);

    if (oprs.length > 2) {
      const operators = updatedText.match(/[*+-/]/g);
      const operands = updatedText.split(/[*+-/]/).map(Number);

      if (operators && operators.length > 0 && operands.length > 2) {
        const result = operands.slice(0, -1).reduce((acc, operand, index) => {
          const operator = operators[index];
          switch (operator) {
            case "+":
              return acc + operand;
            case "-":
              return acc - operand;
            case "*":
              return acc * operand;
            case "/":
              return acc / operand;
            default:
              return acc;
          }
        }, operands[0]);

        updatedText = result + (operators.slice(-1) || []).join("");
      }
    }

    setText(updatedText);
  };

  const onInputChange = ({ target: { value: updatedText } }) => {
    if (buttons.indexOf(getLastChar(updatedText)) === -1) {
      updatedText = updatedText.slice(0, -1);
    }
    setText(updatedText);
  };

  const calculate = () => {
    try {
      const result = math.evaluate(text);

      const updatedText = (result || "") + "";
      return {
        text: updatedText,
      };
    } catch (error) {
      return {
        text: "error",
      };
    }
  };

  return (
    <>
      <button
        className='btn btn-outline-success m-0'
        onClick={() => setModalOpen(true)}
      >
        Calculator
      </button>

      <Modal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        centered
        fade={true}
        size='lg'
      >
        <ModalHeader toggle={() => setModalOpen(!isModalOpen)}>
          Scientific Calculator
        </ModalHeader>
        <ModalBody className='text-center'>
          <FormField
            label='Calculator'
            type='text'
            name='text'
            value={text}
            onChange={onInputChange}
            placeholder='Please Enter...'
          />
          <div className='history row'>
            <div className='col-12 '>
              <li>
                <b>History</b>
              </li>
            </div>
            <div className='col-6'>
              <li>
                <p>
                  <i>
                    <b>Previous calculations</b>
                  </i>
                </p>
                {result.join(" 🚀 ")}
              </li>
            </div>
            <div className='col-6'>
              <li>
                <p>
                  <i>
                    <b>Previous Results</b>
                  </i>
                </p>
                {prevResult.join(" 🔮 ")}
              </li>
            </div>
          </div>
          {buttons.map((buttonName) => (
            <button
              className='btn btn-outline-secondary m-1 col-2'
              key={buttonName}
              value={buttonName}
              onClick={handleChange}
            >
              {buttonName}
            </button>
          ))}
        </ModalBody>
      </Modal>
    </>
  );
};
