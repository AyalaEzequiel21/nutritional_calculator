export const calcularPorcentaje = (valor: number, total: number) => {
    if (total === 0) {
      return 0
    }
    return (valor / total) * 100;
  }

  // export const updateTotals = (inputRefs: React.RefObject<HTMLInputElement[]>) => {
  //   let hcTotal = 0;
  //   let proteinTotal = 0;
  //   let grTotal = 0;
  //   let cantTotal = 0;

  //   inputRefs.current?.forEach((inputRef) => {
  //     if (inputRef) {
  //       const grValue = parseFloat(inputRef.value) || 0;
  //       const dataset = inputRef.dataset;

  //       cantTotal += grValue;
  //       hcTotal += (dataset.hcper100g ? parseFloat(dataset.hcper100g) : 0) * grValue;
  //       proteinTotal += (dataset.proteinper100g ? parseFloat(dataset.proteinper100g) : 0) * grValue;
  //       grTotal += (dataset.grper100g ? parseFloat(dataset.grper100g) : 0) * grValue;            
  //     }
  //   });

  //   // setTotalHC(hcTotal);
  //   // setTotalProtein(proteinTotal);
  //   // setTotalGr(grTotal);
  //   // setTotalCantidad(cantTotal);        
  // };

  export const resetInputValues = (inputRefs: React.MutableRefObject<HTMLInputElement[] | null>) => {
    inputRefs.current?.forEach((inputRef) => {
      if (inputRef) {
        inputRef.value = ''; 
      }
    });
  };