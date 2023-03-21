import ControlPanel from './components/ControlPanel';
import TemplatePanel from './components/TemplatePanel';
import CalcPanel from './components/CalcPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <ControlPanel />
      <TemplatePanel />
      <CalcPanel />
    </div>
  );
}

export default App;
