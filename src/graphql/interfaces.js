// Structure d'un compte
export interface Compte {
    id: string;
    solde: number;
    dateCreation: string;
    type: TypeCompte;
}

// Structure d'une transaction
export interface Transaction {
    id: string;
    type: TypeTransaction;
    montant: number;
    date: string;
    compte: Compte;
}

// Statistiques des soldes
export interface SoldeStats {
    count: number;
    sum: number;
    average: number;
}

// Statistiques des transactions
export interface TransactionStats {
    count: number;
    sumDepots: number;
    sumRetraits: number;
}

// Données pour la création d'un compte
export interface CompteRequest {
    solde: number;
    type: TypeCompte;
}

// Données pour la création d'une transaction
export interface TransactionRequest {
    type: TypeTransaction;
    montant: number;
    compteId: string;
}

// Énumérations
export type TypeCompte = 'COURANT' | 'EPARGNE';
export type TypeTransaction = 'DEPOT' | 'RETRAIT';
