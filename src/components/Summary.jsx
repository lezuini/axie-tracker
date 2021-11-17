const Summary = () => {
  return (
    <div className="summary">
      <h2>Resumen de todas las cuentas:</h2>
      <div className="slp">
        <p>SLP disponible: 800</p>
        <span>Valor: $30 USDT</span>
        <span>Proporcion: 100%</span>
      </div>
      <div className="slp">
        <p>SLP en carteras RONIN: 0</p>
        <span>Valor: $0 USDT</span>
        <span>Proporcion: 0%</span>
      </div>
      <p>Ultimo valor del SLP: $0.07 USDT</p>
      <div className="accounts">
        <p>Numero de cuentas rastreadas: 1</p>
        <p>Siguiente reclamo: 21/12/21 (1mpact_rv)</p>
      </div>
      <p>SLP generado en promedio: 50</p>
    </div>
  );
};

export default Summary;
