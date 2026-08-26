import { Note } from '@/lib/types';

export const notes: Note[] = [
  {
    id: 'note-bio-05-t1-detailed',
    topicId: 'bio-05-t1',
    chapterId: 'bio-05',
    subjectId: 'biology',
    type: 'detailed',
    title: 'Breathing and Exchange of Gases - Detailed Notes',
    verified: true,
    source: 'ncert',
    updatedAt: '2024-01-15',
    content: {
      sections: [
        {
          id: 's1',
          type: 'heading',
          content: 'Mechanism of Breathing',
        },
        {
          id: 's2',
          type: 'paragraph',
          content: 'Breathing involves two stages: inspiration during which atmospheric air is drawn in and expiration by which alveolar air is released out. Movement of air is due to pressure gradient between lungs and atmosphere.',
        },
        {
          id: 's3',
          type: 'important',
          title: 'Key Concept',
          content: 'Inspiration is active process, expiration is passive under normal conditions. Diaphragm and external intercostal muscles are main inspiratory muscles.',
        },
        {
          id: 's4',
          type: 'list',
          title: 'Steps of Inspiration',
          content: '- Diaphragm contracts and flattens\n- External intercostal muscles contract, ribs move up and out\n- Thoracic volume increases\n- Pulmonary volume increases\n- Intrapulmonary pressure decreases below atmospheric ( -1 to -3 mmHg)\n- Air rushes in',
        },
        {
          id: 's5',
          type: 'heading',
          content: 'Respiratory Volumes and Capacities',
        },
        {
          id: 's6',
          type: 'table',
          content: '| Volume | Value | Description |\n| Tidal Volume (TV) | 500 mL | Normal breathing |\n| Inspiratory Reserve (IRV) | 2500-3000 mL | Extra inhaled forcibly |\n| Expiratory Reserve (ERV) | 1000-1100 mL | Extra exhaled forcibly |\n| Residual Volume (RV) | 1100-1200 mL | Remains after forced expiration |',
        },
        {
          id: 's7',
          type: 'formula',
          title: 'Capacities',
          content: 'VC = TV + IRV + ERV\nTLC = VC + RV = 5800 mL ~ 6L',
        },
        {
          id: 's8',
          type: 'heading',
          content: 'Exchange of Gases',
        },
        {
          id: 's9',
          type: 'paragraph',
          content: 'Alveoli are primary sites of exchange. Exchange occurs by simple diffusion based on pressure gradients.',
        },
        {
          id: 's10',
          type: 'table',
          content: '| Gas | Alveoli | Deoxygenated blood | Oxygenated blood | Tissues |\n| O2 | 104 mmHg | 40 mmHg | 95 mmHg | 40 mmHg |\n| CO2 | 40 mmHg | 45 mmHg | 40 mmHg | 45 mmHg |',
        },
        {
          id: 's11',
          type: 'interactive',
          title: 'Concept Check',
          content: 'What happens if alveolar pO2 drops to 60 mmHg? Oxygen diffusion decreases, hemoglobin saturation falls to ~90%.',
        },
      ],
    },
  },
  {
    id: 'note-bio-05-t1-short',
    topicId: 'bio-05-t1',
    chapterId: 'bio-05',
    subjectId: 'biology',
    type: 'short',
    title: 'Breathing - Short Notes for Revision',
    verified: true,
    source: 'curated',
    updatedAt: '2024-01-15',
    content: {
      sections: [
        {
          id: 's1',
          type: 'list',
          content: '- Breathing = ventilation (physical), Respiration = biochemical\n- Inspiration active, Expiration passive\n- Diaphragm 75% contribution\n- TV 500 mL, RV 1200 mL, VC 4600 mL, TLC 6000 mL\n- Alveoli: 300 million, 70 m2 area\n- O2 transport: 97% by Hb, 3% dissolved\n- CO2 transport: 70% bicarbonate, 20-25% carbamino, 7% dissolved\n- Oxyhemoglobin curve sigmoid, right shift = more O2 release (high CO2, temp, H+, 2,3-BPG)\n- Disorders: Asthma, Emphysema (alveolar wall damage - smoking), Occupational',
        },
      ],
    },
  },
  {
    id: 'note-bio-05-t1-quick',
    topicId: 'bio-05-t1',
    chapterId: 'bio-05',
    subjectId: 'biology',
    type: 'quick-revision',
    title: 'Breathing - Quick Revision (2 min)',
    verified: true,
    source: 'curated',
    updatedAt: '2024-01-15',
    content: {
      sections: [
        {
          id: 's1',
          type: 'list',
          content: '- TV 500, IRV 2500-3000, ERV 1000-1100, RV 1100-1200\n- pO2: Alveoli 104, Arterial 95, Venous 40, Tissue 40\n- pCO2: Alveoli 40, Arterial 40, Venous 45, Tissue 45\n- Hb: 4 O2 per molecule, 97% transport\n- Bohr effect: CO2 ↑ => O2 affinity ↓\n- Emphysema = alveolar damage',
        },
      ],
    },
  },
  {
    id: 'note-bio-07-t1-detailed',
    topicId: 'bio-07-t1',
    chapterId: 'bio-07',
    subjectId: 'biology',
    type: 'detailed',
    title: 'Mendelian Inheritance - Detailed',
    verified: true,
    source: 'ncert',
    updatedAt: '2024-01-20',
    content: {
      sections: [
        { id: 's1', type: 'heading', content: "Mendel's Laws" },
        { id: 's2', type: 'list', content: '- Law of Dominance: In heterozygote, only dominant expresses\n- Law of Segregation: Alleles separate during gamete formation\n- Law of Independent Assortment: Genes for different traits assort independently (if on different chromosomes or far apart)' },
        { id: 's3', type: 'example', title: 'Monohybrid Ratio', content: 'Phenotypic 3:1, Genotypic 1:2:1 in F2. Test cross ratio 1:1' },
        { id: 's4', type: 'example', title: 'Dihybrid Ratio', content: 'Phenotypic 9:3:3:1, Test cross 1:1:1:1. Used to prove independent assortment.' },
        { id: 's5', type: 'important', content: 'Linkage exception: Genes on same chromosome close together violate independent assortment. Recombination frequency <50% indicates linkage.' },
      ],
    },
  },
  {
    id: 'note-phy-02-t2-detailed',
    topicId: 'phy-02-t2',
    chapterId: 'phy-02',
    subjectId: 'physics',
    type: 'detailed',
    title: 'Projectile Motion - Detailed Notes',
    verified: true,
    source: 'curated',
    updatedAt: '2024-02-01',
    content: {
      sections: [
        { id: 's1', type: 'heading', content: 'Oblique Projectile' },
        { id: 's2', type: 'formula', content: 'ux = u cosθ, uy = u sinθ\nTime of flight: T = 2u sinθ / g\nMax height: H = u² sin²θ / 2g\nRange: R = u² sin2θ / g\nMax range at 45°: Rmax = u²/g\nTrajectory: y = x tanθ - gx²/2u²cos²θ' },
        { id: 's3', type: 'important', content: 'Horizontal velocity remains constant (no air resistance). Vertical motion under gravity. At max height, vy=0.' },
        { id: 's4', type: 'example', content: 'Two angles complementary give same range: θ and 90-θ have same R. Time of flight differs.' },
      ],
    },
  },
  {
    id: 'note-chem-03-t1-detailed',
    topicId: 'chem-03-t1',
    chapterId: 'chem-03',
    subjectId: 'chemistry',
    type: 'detailed',
    title: 'Chemical Bonding - Detailed',
    verified: true,
    source: 'ncert',
    updatedAt: '2024-02-10',
    content: {
      sections: [
        { id: 's1', type: 'heading', content: 'VSEPR Theory' },
        { id: 's2', type: 'list', content: '- Electron pairs repel, arrange to minimize repulsion\n- Lone pair-lone pair > lone pair-bond pair > bond pair-bond pair\n- Determines shape' },
        { id: 's3', type: 'table', content: '| Steric No | Shape | Example |\n| 2 | Linear | BeCl2, CO2 |\n| 3 | Trigonal planar | BF3 |\n| 4 | Tetrahedral | CH4, NH4+ |\n| 4 (1 lp) | Pyramidal | NH3 |\n| 4 (2 lp) | Bent | H2O |' },
        { id: 's4', type: 'heading', content: 'Hybridization' },
        { id: 's5', type: 'list', content: '- sp: 180°, 50% s, linear\n- sp2: 120°, 33% s, trigonal planar\n- sp3: 109.5°, 25% s, tetrahedral\n- More s character = more electronegativity, shorter bond' },
      ],
    },
  },
];

export const getNotesByTopic = (topicId: string) => notes.filter(n => n.topicId === topicId);
export const getNotesByChapter = (chapterId: string) => notes.filter(n => n.chapterId === chapterId);
export const getNote = (id: string) => notes.find(n => n.id === id);
