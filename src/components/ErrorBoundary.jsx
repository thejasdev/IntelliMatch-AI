import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
          <div className="max-w-xl w-full p-8 rounded-2xl bg-[#060B19]/95 border border-red-500/30 shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white">
                Something went wrong loading this section
              </h2>
              <p className="text-sm text-slate-300 mt-2 font-sans">
                {this.state.error?.message || "An unexpected error occurred while rendering this view."}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>Reload Page</span>
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080E20] hover:bg-[#0B142C] text-slate-200 border border-slate-700 font-mono text-xs font-semibold"
              >
                <Home size={14} />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
