"use client";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log errors to an external service here if needed
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary flex flex-col items-center justify-center py-20 text-center'>
          <h2 className='text-xl font-semibold text-red-600'>
            Something went wrong.
          </h2>
          <p className='text-gray-500 mt-2'>
            Please refresh the page or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
