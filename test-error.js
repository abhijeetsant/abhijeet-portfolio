import fs from 'fs';
const data = fs.readFileSync('src/components/ScrollReveal.jsx', 'utf8');
const withErrorBoundary = data.replace('export default function ScrollReveal() {', `
import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() { 
    if (this.state.hasError) return <div style={{color:'red', fontSize:'24px', position:'fixed', top:0, zIndex:9999, background:'black', padding:'20px'}}>{this.state.error.toString()}</div>;
    return this.props.children;
  }
}
export default function ScrollRevealWrapper() {
  return <ErrorBoundary><ScrollReveal /></ErrorBoundary>
}
function ScrollReveal() {
`);
fs.writeFileSync('src/components/ScrollReveal.jsx', withErrorBoundary);
