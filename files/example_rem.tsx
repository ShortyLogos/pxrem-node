import React from "react";

const ExampleComponent = () => {
  return (
    <div className="bg-blue-500 px-[3.2142857142857144rem] rounded-lg p–[16.714285714285715rem] bg-[length:1.6428571428571428rem_2.4285714285714284rem]">
      <h1 className="text-3xl font-bold mb-4 font-[0.8571428571428571rem]">Example Component</h1>
      <p className="text-lg mb-2">
        This is an example component with arbitrary values using px:
      </p>
      <ul style={{ minWidth: "18.285714285714285rem" }} className="list-disc ml-8">
        <li className="mb-2">
          Width:{" "}
          <span className="font-bold w-[35.714285714285715rem] text-blue-900">
            w-[35.714285714285715rem] h-[8.785714285714286rem]
          </span>
        </li>
        <li className="mb-2">
          Padding: <span className="font-bold text-blue-900">%%% 2.2857142857142856rem $$$</span>
        </li>
        <li className="mb-2">
          Margin: <span className="font-bold mt-[1.3571428571428572rem] text-blue-900">m-[1.1428571428571428rem]</span>
        </li>
        <li className="mb-2">
          Font size: <span className="font-bold text-blue-900">___1.7142857142857142rem</span>
        </li>
        <li className="mb-2">
          Border radius:1.7857142857142858rem
          <span className="font-bold text-blue-900">0.5714285714285714rem</span>
        </li>
        <li className="mb-2">
          Line height:{" "}
          <span className="font-bold text-blue-900">leading-[2.2857142857142856rem]</span>
        </li>
        <li className="mb-2">
          Box shadow:{" "}
          <span className="font-bold border-b-[0.35714285714285715rem] text-blue-900">shadow-md</span>
        </li>
      </ul>
    </div>
  );
};

export default ExampleComponent;
