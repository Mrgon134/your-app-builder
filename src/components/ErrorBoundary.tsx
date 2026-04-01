import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-background text-foreground animate-fade-in text-center">
          <div className="w-16 h-16 rounded-3xl bg-destructive/10 text-destructive flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground text-[15px] max-w-sm mb-8">
            We encountered an unexpected error. Don't worry, your data is safe.
          </p>
          <div className="bg-card/50 border border-border/50 rounded-xl p-4 w-full max-w-sm mb-8 overflow-hidden">
            <p className="text-xs text-muted-foreground font-mono truncate text-left">
              {this.state.error?.message || "Unknown error"}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold press-spring active:scale-95 transition-transform"
          >
            <RefreshCcw className="w-4 h-4" />
            Restart App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
