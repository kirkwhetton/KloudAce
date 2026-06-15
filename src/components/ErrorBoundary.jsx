import { Component } from "react";
import { WarningIcon } from "./Icons";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Caught:", error.message);
    console.error("[ErrorBoundary] Stack:", info.componentStack);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.7)",
          zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem"
        }}>          <div style={{
            background:"var(--bg-card)", borderRadius:"1rem", padding:"2rem",
            maxWidth:"640px", width:"100%", boxShadow:"0 8px 40px rgba(0,0,0,0.35)"
          }}>
            <h2 style={{color:"var(--wrong)", marginTop:0}}><WarningIcon /> Dashboard Error</h2>
            <pre style={{
              background:"var(--diff-ext-bg)", border:"1px solid var(--diff-ext-border)", borderRadius:"0.5rem",
              padding:"1rem", fontSize:"0.78rem", overflowX:"auto", color:"var(--diff-ext-text)",
              whiteSpace:"pre-wrap", wordBreak:"break-all", maxHeight:"300px", overflowY:"auto"
            }}>
              {this.state.error.toString()}
              {"\n\n"}
              {this.state.error.stack}
            </pre>
            <button
              onClick={() => { this.setState({ error: null }); this.props.onClose?.(); }}
              style={{
                marginTop:"1rem", padding:"0.5rem 1.25rem", background:"var(--brand)",
                color:"var(--text-on-brand)", border:"none", borderRadius:"0.5rem", cursor:"pointer", fontWeight:600
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
