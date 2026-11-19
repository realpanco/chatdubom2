export const COLORS = {
  bgDark: '#04060A',
  bgCard: 'rgba(16, 22, 34, 0.75)',
  bgCardSolid: '#101622',
  bgInput: 'rgba(24, 34, 52, 0.85)',
  border: 'rgba(35, 49, 72, 0.8)',
  borderLight: 'rgba(0, 240, 255, 0.25)',
  
  cyan: '#00F0FF',
  cyanGlow: 'rgba(0, 240, 255, 0.35)',
  magenta: '#FF007F',
  magentaGlow: 'rgba(255, 0, 127, 0.35)',
  emerald: '#00FF88',
  emeraldGlow: 'rgba(0, 255, 136, 0.3)',
  gold: '#FFD700',
  purple: '#A855F7',
  
  textMain: '#F8FAFC',
  textDim: '#94A3B8',
  textSub: '#64748B',
  
  accentGrad: ['#00F0FF', '#FF007F'] as const,
  darkGrad: ['#0A0F1D', '#04060A'] as const,
  cardGrad: ['rgba(22, 30, 48, 0.8)', 'rgba(12, 16, 26, 0.9)'] as const,
  divineGrad: ['#FF007F', '#A855F7', '#00F0FF'] as const,
};

export const SHADOWS = {
  cyan: {
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  magenta: {
    shadowColor: '#FF007F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
};
