import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

// Composant d'affichage de l'historique des transactions
const TransactionList = () => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_TRANSACTIONS);

    // État de chargement
    if (loading) return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center text-gray-500">Chargement des transactions...</p>
        </div>
    );

    // Gestion des erreurs
    if (error) return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-red-500">Erreur : {error.message}</p>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Historique des Transactions</h2>
                <button
                    onClick={() => refetch()}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
                >
                    🔄 Actualiser
                </button>
            </div>

            {data.allTransactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucune transaction disponible</p>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {data.allTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={`border-l-4 p-4 rounded-lg ${transaction.type === 'DEPOT'
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-lg">
                                        {transaction.type === 'DEPOT' ? '📥 Dépôt' : '📤 Retrait'}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Compte: {transaction.compte.type}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(transaction.date).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-2xl font-bold ${transaction.type === 'DEPOT' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.type === 'DEPOT' ? '+' : '-'}{transaction.montant.toFixed(2)}€
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Solde: {transaction.compte.solde.toFixed(2)}€
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 text-sm text-gray-500 text-center">
                Total : {data.allTransactions.length} transaction(s)
            </div>
        </div>
    );
};

export default TransactionList;
