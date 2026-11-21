export declare class CreateClientDto {
    name: string;
    phone?: string;
    email?: string;
    company?: string;
    notes?: string;
    edrpou?: string;
    status?: 'active' | 'lead' | 'inactive';
}
