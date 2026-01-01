import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_TRANSACTIONS, GET_ALL_COMPTES } from '../graphql/queries';

// Composant de formulaire de transaction
const TransactionForm = () => {
    const [type, setType] = useState('DEPOT');
    const [montant, setMontant] = useState('');
    const [compteId, setCompteId] = useState('');

    // Récupération des comptes disponibles
    const { data: comptesData } = useQuery(GET_ALL_COMPTES);

    const [addTransaction, { loading, error }] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [
            { query: GET_ALL_TRANSACTIONS },
            { query: GET_ALL_COMPTES }
        ],
    });

    // Gestionnaire de soumission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!montant || parseFloat(montant) <= 0) {
            alert('Veuillez entrer un montant valide');
            return;
        }

        if (!compteId) {
            alert('Veuillez sélectionner un compte');
            return;
        }

        try {
            await addTransaction({
                variables: {
                    transactionRequest: {
                        type,
                        montant: parseFloat(montant),
                        compteId,
                    },
                },
            });

            setMontant('');
            alert(`✅ ${type === 'DEPOT' ? 'Dépôt' : 'Retrait'} effectué avec succès !`);
        } catch (err) {
            alert('❌ Erreur : ' + err.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Nouvelle Transaction</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de transaction *
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="DEPOT">📥 Dépôt</option>
                        <option value="RETRAIT">📤 Retrait</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compte *
                    </label>
                    <select
                        value={compteId}
                        onChange={(e) => setCompteId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="">-- Sélectionner un compte --</option>
                        {comptesData?.allComptes.map((compte) => (
                            <option key={compte.id} value={compte.id}>
                                {compte.type} - {compte.solde.toFixed(2)}€
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Montant *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 50.00"
                        required
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        <strong>Erreur :</strong> {error.message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-semibold py-3 px-4 rounded-lg transition ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : type === 'DEPOT'
                            ? 'bg-green-500 hover:bg-green-600 active:bg-green-700'
                            : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                        }`}
                >
                    {loading ? '⏳ Traitement...' : type === 'DEPOT' ? '💰 Effectuer le dépôt' : '💸 Effectuer le retrait'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
