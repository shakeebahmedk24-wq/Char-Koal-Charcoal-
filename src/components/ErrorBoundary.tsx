import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Flame, RefreshCw, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Char-Koal uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0c0f] text-neutral-200 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#12161f] border border-[#232936] text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400">
              <Flame className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif-luxury text-2xl font-bold text-white">
                Something went wrong
              </h1>
              <p className="text-xs text-neutral-400 leading-relaxed">
                An unexpected display hiccup occurred while rendering the culinary interface.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-[#0b0e13] rounded-lg border border-neutral-800 text-[11px] font-mono text-neutral-400 text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleReset}
                className="px-4 py-2.5 rounded-lg bg-[#181d26] hover:bg-[#202734] border border-neutral-700 text-neutral-300 hover:text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
