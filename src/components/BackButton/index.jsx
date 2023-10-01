import React from 'react';
import BackButonStyle from './BackButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function BackButton({ currentPage, onGoBack, customClassName }) {
  const handleGoBack = () => {
    onGoBack(); // Chama a função de voltar definida no componente pai
    // window.location.reload(); 
  };

  // Concatene as classes CSS com um espaço entre elas
  const combinedClassName = `${BackButonStyle.containerButton} ${customClassName}`;

  return (
    <div>
      <button onClick={handleGoBack} className={combinedClassName}>
        <FontAwesomeIcon
          icon={faRotateLeft}
          color='white'
        />
      </button>
    </div>
  );
}

export default BackButton;
