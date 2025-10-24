import React from 'react';

class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ThreeJS Component Error:', error, errorInfo);
    
    this.setState({
      error: error
    });

    // Log specific Three.js errors
    if (error.message?.includes('WebGL') || error.message?.includes('THREE')) {
      console.warn('Three.js/WebGL error detected. This might be due to hardware limitations or browser compatibility.');
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI for 3D component failures
      return (
        <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-center p-6 max-w-sm">
            <div className="mb-4">
              <svg 
                className="w-12 h-12 mx-auto text-blue-500 mb-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" 
                />
              </svg>
              <h3 className="text-lg font-semibold text-white mb-2">
                3D Content Unavailable
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {this.props.fallbackMessage || 
                 "Unable to load 3D content. This might be due to browser compatibility or hardware limitations."}
              </p>
            </div>
            
            <button
              onClick={this.handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>

            {/* Development error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-gray-500 hover:text-white text-xs">
                  Error Details
                </summary>
                <div className="mt-2 p-2 bg-gray-800 rounded text-xs text-red-400 overflow-auto max-h-24">
                  {this.state.error.toString()}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ThreeJSErrorBoundary;