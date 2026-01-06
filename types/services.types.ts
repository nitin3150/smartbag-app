export interface UploadedDocument {
    id: string;
    name: string;
    pages: number;
    cloudUrl?: string;
}

export interface UploadedPhoto {
    id: string;
    uri: string;
    cloudUrl?: string;
    name: string;
}

export interface PrintoutServiceDetails {
    printType: 'document' | 'photo';
    documents: UploadedDocument[];
    photos: UploadedPhoto[];
    numberOfPages: number;
    copies: number;
    paperSize: 'A4' | 'A3' | 'Legal';
    photoSize: 'Passport' | '4x6' | '5x7';
    colorPrinting: boolean;
    notes?: string;
}