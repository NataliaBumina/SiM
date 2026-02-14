import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#333', marginTop: '20px' }}>Любите Конструкторы!</h1>
      <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
        Открыть свое воображение и строите замечательные дома!
      </p>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', marginTop: '30px' }}>
        <h2>Наши основные действия:</h2>
        <ul>
          <li>Дизайн и расставка</li>
          <li>Планирование проекта</li>
          <li>Набор трудов</li>
          <li>Надзор качества</li>
        </ul>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
