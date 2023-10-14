import { BoXContainer, ButtonLink } from "../../../components";

interface HomeListProps {}

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
          label="Ecuación de Hamwi"
          key={"hamwi"}
        />
        <ButtonLink 
          direction="/pesoIdealCorregido"
          label="Peso ideal corregido"
          key={"PIC"}
        />
        <ButtonLink 
          direction="/pesoIdealSegunIMCBuscado"
          label="Peso ideal segun IMC"
          key={"PISIMC"}
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
          direction="/ecuacionHarrisBenedict"
          label="Ecuación de Harris-Benedict"
          key={"EHB"}
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