import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";

// Composant d'affichage de la liste des comptes
const CompteList = () => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);

    // État de chargement
    if (loading) return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center text-gray-500">Chargement des comptes...</p>
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
                <h2 className="text-2xl font-bold text-gray-800">Liste des Comptes</h2>
                <button
                    onClick={() => refetch()}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
                >
                    🔄 Actualiser
                </button>
            </div>

            {data.allComptes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucun compte disponible</p>
            ) : (
                <div className="space-y-4">
                    {data.allComptes.map((compte) => (
                        <div
                            key={compte.id}
                            className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">ID</p>
                                    <p className="font-mono text-xs">{compte.id.substring(0, 8)}...</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Type</p>
                                    <p className="font-semibold">
                                        <span className={`px-2 py-1 rounded text-sm ${compte.type === 'COURANT'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {compte.type}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Solde</p>
                                    <p className="text-xl font-bold text-gray-800">{compte.solde.toFixed(2)}€</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Créé le</p>
                                    <p className="text-sm">{new Date(compte.dateCreation).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 text-sm text-gray-500 text-center">
                Total : {data.allComptes.length} compte(s)
            </div>
        </div>
    );
};

export default CompteList;
