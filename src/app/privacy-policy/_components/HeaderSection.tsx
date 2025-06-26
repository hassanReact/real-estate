import DecorativeElements from "./DecorativeElements";

const HeaderSection = () => {
    return (
      <div className="relative w-full min-h-[280px] flex items-center bg-gradient-to-r from-emerald-50 to-rose-50 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 w-full h-full">
          <DecorativeElements />
        </div>
        {/* Content */}
        <div className="relative w-full px-[10%] py-[3%]">
          <div className="max-w-4xl">
            <div className="text-sm text-gray-600 mb-2">
              ZYCK &gt; Terms & Privacy Policy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 sm:leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
            "Your Privacy, Our Priority – Safeguarding Your Data, Empowering Your Trust."
            </p>
          </div>
        </div>
        {/* Right Decorative SVGs */}
        <div className="absolute right-0 top-0 h-full w-1/3">
          <div className="relative h-full w-full">
            <div className="absolute right-10 top-20 w-32 h-32 opacity-20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full text-emerald-400"
              >
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="absolute right-20 bottom-20 w-40 h-40 opacity-20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full text-emerald-400"
              >
                <path
                  d="M12 4v16m8-8H4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default HeaderSection
  