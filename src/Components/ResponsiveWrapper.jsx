const ResponsiveWrapper = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 lg:px-8 2xl:px-16 ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveWrapper;