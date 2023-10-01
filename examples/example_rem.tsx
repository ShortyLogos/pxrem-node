import React from "react";

const ExampleComponent = () => {
  return (
    <div className="bg-blue-500 px-[2.8125rem] rounded-lg p–[14.625rem] bg-[length:1.4375rem_2.125rem]">
      <h1 className="text-3xl font-bold mb-4 font-[0.75rem]">Example Component</h1>
      <p className="text-lg mb-2">
        This is an example component with arbitrary values using px:
      </p>
      <ul style={{ minWidth: "16rem" }} className="list-disc ml-8">
        <li className="mb-2">
          Width: <span className="font-bold w-[31.25rem] text-blue-900">w-[31.25rem] h-[7.6875rem]</span>
        </li>
        <li className="mb-2">
          Padding: <span className="font-bold text-blue-900">%%% 2rem $$$</span>
        </li>
        <li className="mb-2">
          Margin: <span className="font-bold mt-[1.1875rem] text-blue-900">m-[1rem]</span>
        </li>
        <li className="mb-2">
          Font size: <span className="font-bold text-blue-900">___1.5rem</span>
        </li>
        <li className="mb-2">
          Border radius:1.5625rem
          <span className="font-bold text-blue-900">0.5rem</span>
        </li>
        <li className="mb-2">
          Line height: <span className="font-bold text-blue-900">leading-[2rem]</span>
        </li>
        <li className="mb-2">
          Box shadow: <span className="font-bold border-b-[0.3125rem] text-blue-900">shadow-md</span>
        </li>
      </ul>
    </div>
  );
};

export default ExampleComponent;
