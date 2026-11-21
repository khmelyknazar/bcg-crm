export declare class CreateDealDto {
    title: string;
    amount?: number;
    clientId: number;
    stageId: number;
    status?: 'OPEN' | 'WON' | 'LOST';
}
