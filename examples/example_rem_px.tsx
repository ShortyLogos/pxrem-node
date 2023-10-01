import React from "react";

const ExampleComponent = () => {
  return (
    <div className="bg-blue-500 px-[2.130000px] rounded-lg p–[14.10000px] bg-[length:1.70000px_2.2000px]">
      <h1 className="text-3xl font-bold mb-4 font-[0.1200px]">Example Component</h1>
      <p className="text-lg mb-2">
        This is an example component with arbitrary values using px:
      </p>
      <ul style={{ minWidth: "256px" }} className="list-disc ml-8">
        <li className="mb-2">
          Width: <span className="font-bold w-[31.400px] text-blue-900">w-[31.400px] h-[7.110000px]</span>
        </li>
        <li className="mb-2">
          Padding: <span className="font-bold text-blue-900">%%% 32px $$$</span>
        </li>
        <li className="mb-2">
          Margin: <span className="font-bold mt-[1.30000px] text-blue-900">m-[16px]</span>
        </li>
        <li className="mb-2">
          Font size: <span className="font-bold text-blue-900">___1.80px</span>
        </li>
        <li className="mb-2">
          Border radius:1.90000px
          <span className="font-bold text-blue-900">0.80px</span>
        </li>
        <li className="mb-2">
          Line height: <span className="font-bold text-blue-900">leading-[32px]</span>
        </li>
        <li className="mb-2">
          Box shadow: <span className="font-bold border-b-[0.50000px] text-blue-900">shadow-md</span>
        </li>
      </ul>
    </div>
  );
};

export default ExampleComponent;
