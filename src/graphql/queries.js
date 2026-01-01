import { gql } from '@apollo/client';

// Récupération de tous les comptes
export const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Récupération d'un compte par identifiant
export const GET_COMPTE_BY_ID = gql`
  query GetCompteById($id: ID!) {
    compteById(id: $id) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Calcul du solde total
export const GET_TOTAL_SOLDE = gql`
  query GetTotalSolde {
    totalSolde {
      count
      sum
      average
    }
  }
`;

// Récupération des comptes par type
export const GET_COMPTE_BY_TYPE = gql`
  query GetCompteByType($type: TypeCompte!) {
    findCompteByType(type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Récupération des transactions d'un compte
export const GET_COMPTE_TRANSACTIONS = gql`
  query GetCompteTransactions($id: ID!) {
    compteTransactions(id: $id) {
      id
      type
      montant
      date
      compte {
        id
        solde
        type
      }
    }
  }
`;

// Récupération de toutes les transactions
export const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    allTransactions {
      id
      type
      montant
      date
      compte {
        id
        solde
        type
      }
    }
  }
`;

// Statistiques des transactions
export const GET_TRANSACTION_STATS = gql`
  query GetTransactionStats {
    transactionStats {
      count
      sumDepots
      sumRetraits
    }
  }
`;
