export const experienceStepStyles = {
  navigation: { display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 },
  preview: {
    height: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 2,
    border: '1px dashed #94a3b8',
    borderRadius: 2,
    background: '#f8fafc',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const,
  },
} as const;
