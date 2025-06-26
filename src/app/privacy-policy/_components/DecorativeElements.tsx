const DecorativeElements = () => {
    return (
      <>
        {/* Diamond */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-emerald-200/20 rotate-45" />
        {/* Circle */}
        <div className="absolute top-40 right-20 w-20 h-20 rounded-full border-2 border-emerald-200/20" />
        {/* Dots pattern */}
        <div className="absolute bottom-10 left-1/4 grid grid-cols-4 gap-5">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-emerald-200/30"
            />
          ))}
        </div>
      </>
    );
  };
  
  export default DecorativeElements