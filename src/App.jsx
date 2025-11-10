import React from "react";
import UserForm from "./components/UserForm";
import "./App.css";

function App() {
  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    // Di sini nanti bisa integrate dengan API atau processing
    lainnya;
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🎯 Custom Form Hook - Praktikum Pertemuan 12</h1>
          <p>Acara 1: Form Handling dengan Custom Hooks</p>
        </div>
      </header>

      <main className="App-main">
        <div className="container">
          <div className="demo-info">
            <h2>📋 Form Demonstration</h2>
            <p>
              Form ini menggunakan custom hook
              <code>useForm</code> untuk handling state, validation, dan
              submission. Coba isi form dan perhatikan validation yang berjalan
              real-time!
            </p>
          </div>

          <UserForm onSubmit={handleFormSubmit} />
        </div>
      </main>

      <footer className="App-footer">
        <p>Praktikum React - Custom Hooks untuk Form Handling</p>
      </footer>
    </div>
  );
}

export default App;
