import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';

// Composant de création de compte
const CreateCompte = () => {
    const [solde, setSolde] = useState('');
    const [type, setType] = useState('COURANT');

    const [saveCompte, { loading, error }] = useMutation(SAVE_COMPTE, {
        refetchQueries: [{ query: GET_ALL_COMPTES }],
    });

    // Gestionnaire de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!solde || parseFloat(solde) < 0) {
            alert('Veuillez entrer un solde valide');
            return;
        }

        try {
            await saveCompte({
                variables: {
                    compte: {
                        solde: parseFloat(solde),
                        type,
                    },
                },
            });

            setSolde('');
            setType('COURANT');
            alert('✅ Compte créé avec succès !');
        } catch (err) {
            alert('❌ Erreur : ' + err.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Créer un Compte</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Solde initial *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={solde}
                        onChange={(e) => setSolde(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 1000.00"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de compte *
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="COURANT">💳 Compte Courant</option>
                        <option value="EPARGNE">💰 Compte Épargne</option>
                    </select>
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
                        : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                        }`}
                >
                    {loading ? '⏳ Création en cours...' : '➕ Créer le compte'}
                </button>
            </form>
        </div>
    );
};

export default CreateCompte;
