import { BoXContainer } from "../../../components/boxContainer/BoxContainer";
import { ButtonLink } from "../../../components/buttonLink/ButtonLink";


export interface HomeListProps {

}

export const HomeList: React.FC<HomeListProps> = () => {
    return (
      <BoXContainer>
        <ButtonLink 
          direction="/IMC"
          label="Indice de masa corporal"
          key={"IMC"}
        />
        <ButtonLink 
          direction="/hamwi"
          label="Formula de Hamwi"
          key={"hamwi"}
        />
        <ButtonLink 
          direction="/pesoIdealCorregido"
          label="Peso ideal corregido"
          key={"PIC"}
        />
        <ButtonLink 
          direction="/ppu"
          label="Porcentaje de Peso Usual"
          key={"PPU"}
        />
        <ButtonLink 
          direction="/porcentajePerdidaPeso"
          label="Porcentaje de Perdida de Peso"
          key={"PPP"}
        />
        <ButtonLink 
          direction="/formDesarrollada"
          label="Formula Desarrollada"
          key={"FD"}
        />
        <ButtonLink 
          direction="/results"
          label="Resultados"
          key={"results"}
        />
      </BoXContainer>
    );
  }