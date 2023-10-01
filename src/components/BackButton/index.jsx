import React from 'react';
import BackButonStyle from './BackButton.module.css';

function BackButton({ currentPage, onGoBack, customClassName }) {
  const handleGoBack = () => {
    onGoBack(); // Chama a função de voltar definida no componente pai
    // window.location.reload(); 
  };

  // Concatene as classes CSS com um espaço entre elas
  const combinedClassName = `${BackButonStyle.containerButton} ${customClassName}`;

  return (
    <div>
      <button onClick={handleGoBack} className={combinedClassName}>Voltar</button>
    </div>
  );
}

export default BackButton;
