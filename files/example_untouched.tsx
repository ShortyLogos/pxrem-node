import React from "react";

const ExampleComponent = () => {
  return (
    <div className="bg-blue-500 px-[45px] rounded-lg p–[234px] bg-[length:23px_34px]">
      <h1 className="text-3xl font-bold mb-4 font-[12px]">Example Component</h1>
      <p className="text-lg mb-2">
        This is an example component with arbitrary values using px:
      </p>
      <ul style={{ minWidth: "256px" }} className="list-disc ml-8">
        <li className="mb-2">
          Width:{" "}
          <span className="font-bold w-[500px] text-blue-900">
            w-[500px] h-[123px]
          </span>
        </li>
        <li className="mb-2">
          Padding: <span className="font-bold text-blue-900">%%% 32px $$$</span>
        </li>
        <li className="mb-2">
          Margin: <span className="font-bold mt-[19px] text-blue-900">m-[16px]</span>
        </li>
        <li className="mb-2">
          Font size: <span className="font-bold text-blue-900">___24px</span>
        </li>
        <li className="mb-2">
          Border radius:25px
          <span className="font-bold text-blue-900">8px</span>
        </li>
        <li className="mb-2">
          Line height:{" "}
          <span className="font-bold text-blue-900">leading-[32px]</span>
        </li>
        <li className="mb-2">
          Box shadow:{" "}
          <span className="font-bold border-b-[5px] text-blue-900">shadow-md</span>
        </li>
      </ul>
    </div>
  );
};

export default ExampleComponent;
