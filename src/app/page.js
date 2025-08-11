"use client"; 
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  
  const clearInputs = () => {
    setNumero1('');
    setNumero2('');
    setResultado(null);
    setError('');
  };

  const calculate = (operation) => {
    setError(''); 

    if (operation !== 'sqrt' && (isNaN(parseFloat(numero1)) || isNaN(parseFloat(numero2)))) {
      setError('Por favor, ingresa números válidos en ambos campos (excepto para Raíz Cuadrada).');
      setResultado(null);
      return;
    }
    
    if (operation === 'sqrt' && isNaN(parseFloat(numero1))) {
        setError('Por favor, ingresa un número válido para la Raíz Cuadrada.');
        setResultado(null);
        return;
    }

    let res;
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);

    switch (operation) {
      case 'sumar':
        res = num1 + num2;
        setResultado(`Resultado de la suma: ${res}`);
        break;
      case 'restar': 
        res = num1 - num2;
        setResultado(`Resultado de la resta: ${res}`);
        break;
      case 'multiplicar':
        res = num1 * num2;
        setResultado(`Resultado de la multiplicación: ${res}`);
        break;
      case 'dividir':
        if (num2 === 0) {
          setError('No se puede dividir por cero.');
          setResultado(null);
          return;
        }
        res = num1 / num2;
        setResultado(`Resultado de la división: ${res}`);
        break;
      case 'potencia':
        res = Math.pow(num1, num2);
        setResultado(`Resultado de la potencia: ${res}`);
        break;
      case 'sqrt':
        if (num1 < 0) {
          setError('No se puede calcular la raíz cuadrada de un número negativo.');
          setResultado(null);
          return;
        }
        res = Math.sqrt(num1);
        setResultado(`Resultado de la raíz cuadrada de Número 1: ${res}`);
        break;
      default:
        setError('Operación no reconocida.');
        setResultado(null);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.calculadora}>
        <h2 className={styles.title}>Calculadora</h2>
        <div className={styles.numeros}>
          <label className={styles.text}>Número 1:</label>
          <input
            className={styles.inputnum}
            type="number"
            value={numero1}
            onChange={(e) => setNumero1(e.target.value)}
          />
        </div>
        <div className={styles.numeros}>
          <label className={styles.text}>Número 2:</label>
          <input
            className={styles.inputnum}
            type="number"
            value={numero2}
            onChange={(e) => setNumero2(e.target.value)}
          />
        </div>
        {}
        <div className={styles.buttonsContainer}>
          <button className={`${styles.button} ${styles.primary}`} onClick={() => calculate('sumar')}>Sumar</button>
          <button className={`${styles.button} ${styles.primary}`} onClick={() => calculate('restar')}>Restar</button> {/* <-- Aseguramos que "Restar" esté aquí */}
          <button className={`${styles.button} ${styles.secondary}`} onClick={() => calculate('multiplicar')}>Multiplicar</button>
          <button className={`${styles.button} ${styles.secondary}`} onClick={() => calculate('dividir')}>Dividir</button>
          <button className={`${styles.button} ${styles.tertiary}`} onClick={() => calculate('potencia')}>Potencia</button>
          <button className={`${styles.button} ${styles.tertiary}`} onClick={() => calculate('sqrt')}>Raíz Cuadrada</button>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {resultado && <div className={styles.resultado}>{resultado}</div>}

        {}
        <div className={styles.bottomButtonsContainer}>
          <button className={styles.buttonEspecial1} onClick={clearInputs}>Borrar</button>
          <button className={styles.buttonEspecial2} onClick={clearInputs}>Reiniciar</button>
        </div>
      </div>
    </main>
  );
}
