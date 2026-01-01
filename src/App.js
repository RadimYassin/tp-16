import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

// Composant principal de l'application
function App() {
    return (
        <ApolloProvider client={client}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                <div className="container mx-auto px-4">
                    {/* En-tête */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-gray-800 mb-2">
                            🏦 Gestion Bancaire
                        </h1>
                        <p className="text-gray-600">
                            Application de gestion de comptes
                        </p>
                    </div>

                    {/* Grille principale */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Colonne gauche */}
                        <div className="space-y-6">
                            <CreateCompte />
                            <CompteList />
                        </div>

                        {/* Colonne droite */}
                        <div className="space-y-6">
                            <TransactionForm />
                            <TransactionList />
                        </div>
                    </div>

                    {/* Pied de page */}
                    <div className="mt-8 text-center text-gray-600 text-sm">
                        <p>Application Bancaire GraphQL</p>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    );
}

export default App;
