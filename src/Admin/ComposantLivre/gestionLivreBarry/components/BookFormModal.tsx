import React, { useState, useEffect } from 'react';
import type { Book, BookFormValues } from '../types/book.types';
import { Modal } from './Modal';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BookFormValues) => Promise<void>;
  editTarget?: Book | null;
}

const EMPTY_FORM: BookFormValues = {
  titre: '',
  auteur: '',
  description: '',
  categorie: '',
};

export const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editTarget,
}) => {
  const isEdit = Boolean(editTarget);
  const [values, setValues] = useState<BookFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<BookFormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setValues(editTarget ? {
      titre: editTarget.titre,
      auteur: editTarget.auteur,
      description: editTarget.description,
      categorie: editTarget.categorie,
    } : EMPTY_FORM);
    setErrors({});
  }, [isOpen, editTarget]);

  const validate = (): boolean => {
    const next: Partial<BookFormValues> = {};
    if (!values.titre.trim()) next.titre = 'Champ requis';
    if (!values.auteur.trim()) next.auteur = 'Champ requis';
    if (!values.categorie.trim()) next.categorie = 'Champ requis';
    if (!values.description.trim()) next.description = 'Champ requis';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field: keyof BookFormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Modifier le livre' : 'Nouveau livre'}
    >
      <FormField
        label="Titre"
        value={values.titre}
        onChange={handleChange('titre')}
        error={errors.titre}
        placeholder="Titre du livre"
      />
      <FormField
        label="Auteur"
        value={values.auteur}
        onChange={handleChange('auteur')}
        error={errors.auteur}
        placeholder="Nom de l'auteur"
      />
      <FormField
        label="Catégorie"
        value={values.categorie}
        onChange={handleChange('categorie')}
        error={errors.categorie}
        placeholder="Religion, Littérature, Science..."
      />
      <FormField
        label="Description"
        value={values.description}
        onChange={handleChange('description')}
        error={errors.description}
        placeholder="Résumé du livre..."
        multiline
      />

      <div style={{ display: 'flex', gap: 8, marginTop: '0.5rem' }}>
        <button
          onClick={onClose}
          style={cancelStyle}
        >
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ ...submitStyle, opacity: isSubmitting ? 0.6 : 1 }}
        >
          {isSubmitting ? 'En cours...' : isEdit ? 'Enregistrer' : 'Créer le livre'}
        </button>
      </div>
    </Modal>
  );
};

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, error, placeholder, multiline }) => {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: multiline ? '10px 12px' : '0 12px',
    height: multiline ? 'auto' : 38,
    border: `0.5px solid ${error ? '#FECACA' : 'var(--color-border-tertiary)'}`,
    borderRadius: 'var(--border-radius-md)',
    background: 'var(--color-background-secondary)',
    color: 'var(--color-text-primary)',
    fontSize: 14,
    outline: 'none',
    resize: 'none' as const,
    fontFamily: 'var(--font-sans)',
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{
        display: 'block', fontSize: 12,
        color: 'var(--color-text-secondary)',
        textTransform: 'uppercase', letterSpacing: '0.4px',
        marginBottom: 6,
      }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          style={inputStyle}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
      {error && (
        <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{error}</p>
      )}
    </div>
  );
};

const cancelStyle: React.CSSProperties = {
  flex: 1, height: 36, borderRadius: 'var(--border-radius-md)',
  fontSize: 14, fontWeight: 500, cursor: 'pointer',
  border: '0.5px solid var(--color-border-tertiary)',
  background: 'var(--color-background-secondary)',
  color: 'var(--color-text-primary)',
};

const submitStyle: React.CSSProperties = {
  flex: 1, height: 36, borderRadius: 'var(--border-radius-md)',
  fontSize: 14, fontWeight: 500, cursor: 'pointer',
  border: 'none',
  background: '#1a1a1a',
  color: '#fff',
};
