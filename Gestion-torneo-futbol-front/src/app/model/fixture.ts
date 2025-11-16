export default interface Fixture{
    id?: number;
  equipoLocalID: number;
  equipoVisitaID: number;
  golesEquipo1: string;
  golesEquipo2: string;
  fechaPartido: Date;
  estadoPartido: string;
  estadoFixture: string;
}