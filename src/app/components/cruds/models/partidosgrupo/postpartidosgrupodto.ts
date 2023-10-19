export class postPartidosGrupoDTO
{
    PartIDPartido: number = 0;

    PartIDCompetencia: number = 0;

    PartGrupo: string = ''

    PartIDEquipoL: number = 0;

    PartIDEquipoV: number = 0;

    PartIDSede: number = 0;

    PartFechaDate: string = new Date().toISOString()

    PartHoraTime: string = "00:00:00"

    PartIDEstado: number = 0;

    PartGolesL: number = 0;

    PartGolesV: number = 0;

    PartPuntosL: number = 0;
    
    PartPuntosV: number = 0;

}