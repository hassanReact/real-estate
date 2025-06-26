import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="bg-gray-700 max-w-[980px] mx-auto p-10 text-center my-8">
        <h2 className="text-4xl font-semibold text-white leading-9">Talk to Sales</h2>
        <p className="text-2xl">100+ companies</p>
        <p className="text-1xl">
          The intake layer of Datadog's self-service analytics platform is
          largely built on DataOmniSolutions. DataOmniSolutions ease of use and
          extensibility allowed ant team in the company to push their date into
          the platform - without assistant from the data team!
        </p>
      </div>
      <div className=" max-w-[980px] mx-auto p-10 my-8">
        <h1 className="text-3xl md:text-5xl font-bold">Let's Connect</h1>
        <p>Fill out the form, and we'll get back to you as soon as possible.</p>
        <form action="" className="space-y-5 mt-5 flex flex-col">
          <label htmlFor="">Work Email*</label>
          <input
            type="text"
            placeholder="john@zyckproperty.com"
            className="w-full p-4 bg-transparent outline-none border border-gray-300 rounded-md"
          />
          <label htmlFor="">Full Name*</label>
          <input
            type="text"
            placeholder="John"
            className="w-full p-4 bg-transparent outline-none border border-gray-300 rounded-md"
          />
          <label htmlFor="">How much data will you move per month?</label>
          <select
            name="options"
            id="options"
            className="w-full p-4 bg-transparent outline-none border border-gray-300 rounded-md text-gray-700"
            aria-label="Select an option"
          >
            <option defaultValue="Please select" disabled>
              Please select
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <label htmlFor="">How can we help?*</label>
          <textarea
            name=""
            id=""
            placeholder="If you need to purchase a plan, kindly mention the amount and the subscription period."
            className="w-full p-4 bg-transparent outline-none border border-gray-300 rounded-md"
          />
          <label htmlFor="">How did you hear about us?</label>
          <select
            name="options"
            id="options"
            className="w-full p-4 bg-transparent outline-none border border-gray-300 rounded-md text-gray-700"
            aria-label="Select an option"
          >
            <option defaultValue="Please select" disabled>
              Please select
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-md py-2 rounded-md font-semibold"><Link href={'mailto:info@zyckproperty.com'} >Submit</Link></button>
        </form>
      </div>
    </div>
  );
};

export default page;
