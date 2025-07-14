export const creditTypes = [
  { value: 'personal', label: 'Crédit personnel' },
  { value: 'mortgage', label: 'Crédit immobilier' },
  { value: 'auto', label: 'Crédit auto' },
  { value: 'business', label: 'Crédit professionnel' }
];

export const currencies = [
  { value: 'MAD', label: 'MAD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'USD', label: 'USD' },
  { value: "TND", label: "TND" },
];

export const timeUnits = [
  { value: 'monthly', label: 'Mensuelle' },
  { value: 'quarterly', label: 'Trimestrielle' },
  { value: 'semiannual', label: 'Semestrielle' }
];

export const guaranteeTypes = [
  { value: 'property', label: 'Propriété' },
  { value: 'vehicle', label: 'Véhicule' },
  { value: 'savings', label: 'Épargne' },
  { value: 'endorsement', label: 'Aval' }
];
export const guaranteeSubTypes = [
  { value: 'apartment', label: 'Appartement' },
  { value: 'house', label: 'Maison' },
  { value: 'car', label: 'Voiture' },
  { value: 'motorcycle', label: 'Moto' },
  { value: 'savings_account', label: 'Compte épargne' },
  { value: 'bank_guarantee', label: 'Garantie bancaire' }
]
// Ajouter cette partie à la fin de votre fichier services/options.js

export const documentRequirements = {
  personal: [
    { id: 1, name: "Bulletin de paie", required: true },
    { id: 2, name: "CIN", required: true },
    { id: 3, name: "Relevé bancaire", required: true },
    { id: 4, name: "Justificatif de domicile", required: false },
  ],
  mortgage: [
    { id: 1, name: "Bulletin de paie", required: true },
    { id: 2, name: "CIN", required: true },
    { id: 3, name: "Relevé bancaire", required: true },
    { id: 4, name: "Justificatif de domicile", required: true },
    { id: 5, name: "Compromis de vente", required: true },
    { id: 6, name: "Évaluation immobilière", required: true },
  ],
  auto: [
    { id: 1, name: "Bulletin de paie", required: true },
    { id: 2, name: "CIN", required: true },
    { id: 3, name: "Relevé bancaire", required: true },
    { id: 4, name: "Carte grise", required: true },
    { id: 5, name: "Facture d'achat", required: false },
  ],
  business: [
    { id: 1, name: "Bulletin de paie", required: true },
    { id: 2, name: "CIN", required: true },
    { id: 3, name: "Relevé bancaire", required: true },
    { id: 4, name: "Registre de commerce", required: true },
    { id: 5, name: "Bilan comptable", required: true },
    { id: 6, name: "Plan d'affaires", required: false },
  ],
};