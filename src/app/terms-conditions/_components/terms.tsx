"use client"
import React, { JSX, useState } from "react";
import { Menu, X } from "lucide-react";

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState<string>("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "1", icon: "📋", title: "Key Definitions" },
    { id: "2", icon: "👥", title: "User Responsibilities and General Terms" },
    { id: "3", icon: "💰", title: "Fees and Paid Property Listings" },
    { id: "4", icon: "🎭", title: "Third-party and Posting Agents" },
    { id: "5", icon: "✉️", title: "Anti-Spam Policy" },
    { id: "6", icon: "⚖️", title: "Disclaimer and Limitation of Liability" },
    { id: "7", icon: "🛡️", title: "Indemnification Clause" },
    { id: "8", icon: "🏠", title: "Property Listings and User Content" },
    { id: "9", icon: "📞", title: "Call Recordings and Broker Services" },
    { id: "10", icon: "📱", title: "Advertising and Premium Services" },
    { id: "11", icon: "📄", title: "Miscellaneous and General Provisions" },
  ];

  const content: { [key: string]: JSX.Element } = {
    "1": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">📋 Key Definitions</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Website:</strong> Refers to www.Zyckproperty.Com and the ZYCK Property cell software.</li>
          <li><strong>User:</strong> Any individual or entity gaining access to or using the Website.</li>
          <li><strong>Services:</strong> Refers to all capabilities provided on the Website, such as belongings listings for getting, renting, and promoting.</li>
          <li><strong>Content:</strong> All facts, text, pix, and other materials uploaded by Users.</li>
          <li><strong>Company:</strong> ZYCK Property Media (Private) Limited, the website operator.</li>
        </ul>
      </div>
    ),
    "2": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">👥 User Responsibilities and General Terms</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Users should provide accurate and trustworthy facts whilst developing debts or posting asset listings.</li>
          <li>Users agree not to misuse the platform, such as accomplishing fraudulent or illegal sports.</li>
          <li>Compliance with all relevant local laws and regulations is mandatory.</li>
          <li>Users are entirely chargeable for the security of their account credentials.</li>
        </ul>
      </div>
    ),
    "3": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">💰 Fees and Paid Property Listings</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Certain features, including top-class property listings or advertisement placements, may additionally require a fee.</li>
          <li>All expenses will be stated at the time of purchase and are non-refundable except otherwise specific.</li>
          <li>The Company reserves the proper to alter its charge structure at any time with earlier be aware.</li>
        </ul>
      </div>
    ),
    "4": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">🎭 Third-party and Posting Agents</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Posting sellers or 1/3-celebration advertisers acting on behalf of Users must follow those Terms.</li>
          <li>Users are accountable for any movements taken by 0.33 events using their accounts.</li>
          <li>The Company reserves the right to limit or terminate services to 0.33-birthday celebration agents at its discretion.</li>
        </ul>
      </div>
    ),
    "5": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">✉️ Anti-Spam Policy</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Users should now not submit unsolicited mail, repetitive content, or misleading property listings.</li>
          <li>Unsolicited industrial messages or bulk emails through the platform are prohibited.</li>
          <li>Violations of this policy can also bring about on-the-spot account suspension or termination.</li>
        </ul>
      </div>
    ),
    "6": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">⚖️ Disclaimer and Limitation of Liability</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>The Website acts as a market and isn't always responsible for the accuracy or legality of listings.</li>
          <li>The Company isn't responsible for direct, oblique, incidental, or consequential damages from using the Website.</li>
          <li>Users agree that the Website is used at their hazard.</li>
        </ul>
      </div>
    ),
    "7": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">🛡️ Indemnification Clause</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Users comply with indemnifying and preserving the Company, its affiliates, and employees innocent of any claims, damages, or losses from using the Website.</li>
          <li>This includes any disputes between Users and third parties.</li>
        </ul>
      </div>
    ),
    "8": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">🏠 Property Listings and User Content</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Users are entirely accountable for the accuracy and legality of their asset listings.</li>
          <li>The Company reserves the proper to do away with content that violates those Terms or applicable legal guidelines.</li>
          <li>Property listings ought not to contain offensive, defamatory, or misleading information.</li>
        </ul>
      </div>
    ),
    "9": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">📞 Call Recordings and Broker Services</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Calls made via the Website can be recorded for quality assurance and dispute resolution.</li>
          <li>Brokers and dealers using the platform must adhere to moral requirements and all relevant regulations.</li>
          <li>The Company does now not guarantee any unique outcomes from broker services.</li>
        </ul>
      </div>
    ),
    "10": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">📱 Advertising and Premium Services</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Through paid programs, users can access additional features with more substantial advert visibility.</li>
          <li>These services are challenged to separate terms and conditions outlined throughout the buy.</li>
          <li>The Company reserves the right to adjust or stop top-class services at any time.</li>
        </ul>
      </div>
    ),
    "11": (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">📄 Miscellaneous and General Provisions</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>These Terms constitute the complete settlement between the User and the Company.</li>
          <li>If any provision is deemed unenforceable, the last phrases will remain valid.</li>
          <li>The Company reserves the right to update these Terms at its sole discretion, with adjustments powerful upon posting.</li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="lg:flex sm:relative min-h-[90vh] rounded-lg">
      {/* Mobile Header */}
      <div className="bg-green-300 shadow-md rounded-lg md:hidden">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg text-green-500">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-semibold text-slate-700 mx-6">Terms & Conditions</h1>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-2 lg:left-2 left-0 rounded-lg z-40 h-full w-[80%] max-w-[300px] bg-slate-900 transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:w-1/4 md:max-w-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full overflow-y-auto p-4">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center p-3 mb-2 rounded-lg transition-colors text-left ${
                activeSection === item.id ? "bg-green-500 text-green-bg-green-300" : "hover:bg-green-500 text-slate-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="text-sm md:text-base">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="p-4 md:p-8 md:ml-1/4 w-full">
        <div className="bg-[#dffbee] opacity-95 rounded-lg shadow-sm p-4 md:p-8">
          {content[activeSection as keyof typeof content] || (
            <div>
              <h2 className="text-xl md:text-2xl text-green-500 font-bold mb-4">Content Coming Soon</h2>
              <p className="text-sm md:text-base text-slate-500">This section is under development.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
