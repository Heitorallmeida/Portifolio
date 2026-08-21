export const profileStepStyles = {
  actions: { display: 'flex', justifyContent: 'flex-end' },
  preview: {
    display: 'flex',
    justifyContent: 'center',
    p: 2,
    border: '1px dashed #94a3b8',
    borderRadius: 2,
    background: '#f8fafc',
  },
  previewImage: {
    width: 144,
    height: 144,
    borderRadius: '50%',
    objectFit: 'cover' as const,
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)',
  },
} as const;
