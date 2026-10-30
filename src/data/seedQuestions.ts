import { Question } from '@/types/question';

export const seedQuestions: Question[] = [
  // PHYSICS - Mechanics / Kinematics (Numerical PYQ)
  {
    id: 'PHY-101',
    subject: 'Physics',
    chapter: 'Kinematics',
    topic: 'Motion in One Dimension',
    classLevel: 11,
    type: 'numerical',
    difficulty: 'Medium',
    pattern: 'JEE Main',
    pyqYear: 2024,
    pyqTag: 'JEE Main 2024 (Jan 27, Shift 1)',
    body: 'A particle starts from rest and moves with uniform acceleration along a straight line. If it travels a distance of 100 m in the first 5 seconds, what is its velocity (in m/s) at t = 5 s?',
    correctAnswer: '40',
    numericalAnswer: 40,
    numericalTolerance: 0.01,
    solution:
      'Given initial velocity u = 0, distance s = 100 m, time t = 5 s.\nUsing s = u*t + (1/2)*a*t^2:\n100 = 0 + 0.5 * a * (25) => a = 200 / 25 = 8 m/s^2.\nVelocity at t = 5 s:\nv = u + a*t = 0 + 8 * 5 = 40 m/s.',
    targetTimeSeconds: 90,
  },

  // PHYSICS - Electrostatics (MCQ PYQ)
  {
    id: 'PHY-102',
    subject: 'Physics',
    chapter: 'Electrostatics',
    topic: 'Electric Potential and Capacitance',
    classLevel: 12,
    type: 'mcq_single',
    difficulty: 'Medium',
    pattern: 'JEE Main',
    pyqYear: 2023,
    pyqTag: 'JEE Main 2023 (April 6, Shift 1)',
    body: 'A parallel plate capacitor having capacitance C is charged to a potential V and then disconnected from the battery. A dielectric slab of dielectric constant K is then inserted between the plates completely filling the space. The work done in inserting the slab is:',
    options: [
      { id: 'A', text: '(1/2) * C * V^2 * (1 - 1/K)' },
      { id: 'B', text: '-(1/2) * C * V^2 * (1 - 1/K)' },
      { id: 'C', text: '(1/2) * C * V^2 * (K - 1)' },
      { id: 'D', text: 'Zero' },
    ],
    correctAnswer: 'B',
    solution:
      'Since the battery is disconnected, charge Q remains constant: Q = C * V.\nInitial electrostatic energy U_i = Q^2 / (2C) = (1/2)*C*V^2.\nAfter inserting dielectric K, new capacitance C\' = K * C.\nFinal energy U_f = Q^2 / (2C\') = Q^2 / (2KC) = U_i / K.\nWork done by external agent = U_f - U_i = (U_i / K) - U_i = -U_i * (1 - 1/K) = -(1/2)*C*V^2*(1 - 1/K).',
    targetTimeSeconds: 120,
  },

  // PHYSICS - Current Electricity (Numerical)
  {
    id: 'PHY-103',
    subject: 'Physics',
    chapter: 'Current Electricity',
    topic: "Kirchhoff's Laws & Resistive Networks",
    classLevel: 12,
    type: 'numerical',
    difficulty: 'Easy',
    pattern: 'JEE Main',
    pyqYear: 2022,
    pyqTag: 'JEE Main 2022 (July 25, Shift 2)',
    body: 'In a balanced Wheatstone bridge, the resistances in four arms are P = 10 Ω, Q = 20 Ω, R = 15 Ω, and S. Calculate the value of resistance S (in Ω).',
    correctAnswer: '30',
    numericalAnswer: 30,
    numericalTolerance: 0.01,
    solution:
      'For a balanced Wheatstone bridge condition: P / Q = R / S.\n10 / 20 = 15 / S => 1/2 = 15 / S => S = 30 Ω.',
    targetTimeSeconds: 60,
  },

  // CHEMISTRY - Chemical Bonding (MCQ PYQ)
  {
    id: 'CHM-101',
    subject: 'Chemistry',
    chapter: 'Chemical Bonding and Molecular Structure',
    topic: 'VSEPR Theory & Hybridization',
    classLevel: 11,
    type: 'mcq_single',
    difficulty: 'Easy',
    pattern: 'JEE Main',
    pyqYear: 2023,
    pyqTag: 'JEE Main 2023 (Jan 24, Shift 2)',
    body: 'According to VSEPR theory, the molecular shape of SF4 and the hybridization of the central sulfur atom are respectively:',
    options: [
      { id: 'A', text: 'Square planar, sp3d2' },
      { id: 'B', text: 'See-saw, sp3d' },
      { id: 'C', text: 'Tetrahedral, sp3' },
      { id: 'D', text: 'Trigonal bipyramidal, sp3d' },
    ],
    correctAnswer: 'B',
    solution:
      'Sulfur has 6 valence electrons. In SF4, it forms 4 single bonds with F and has 1 lone pair (total 5 electron domains => steric number = 5).\nHybridization is sp3d.\nGeometry is trigonal bipyramidal; with 1 equatorial lone pair, the molecular shape is see-saw.',
    targetTimeSeconds: 75,
  },

  // CHEMISTRY - Thermodynamics (Numerical PYQ)
  {
    id: 'CHM-102',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    topic: "Enthalpy and Hess's Law",
    classLevel: 11,
    type: 'numerical',
    difficulty: 'Medium',
    pattern: 'JEE Main',
    pyqYear: 2024,
    pyqTag: 'JEE Main 2024 (Jan 31, Shift 2)',
    body: 'For the reaction: 2A(g) + B(g) -> 2C(g), ΔU = -20.0 kJ at 300 K. What is the value of ΔH (in kJ) for this reaction? [Take R = 8.314 J/(mol·K)] (Round off to nearest integer)',
    correctAnswer: '-22',
    numericalAnswer: -22,
    numericalTolerance: 0.5,
    solution:
      'Relation: ΔH = ΔU + Δn_g * R * T.\nΔn_g = moles of gaseous products - moles of gaseous reactants = 2 - (2 + 1) = -1 mol.\nΔn_g * R * T = (-1) * 8.314 * 300 J = -2494.2 J = -2.49 kJ.\nΔH = -20.0 kJ + (-2.49 kJ) = -22.49 kJ ≈ -22 kJ.',
    targetTimeSeconds: 120,
  },

  // CHEMISTRY - Organic Chemistry (MCQ)
  {
    id: 'CHM-103',
    subject: 'Chemistry',
    chapter: 'Hydrocarbons',
    topic: 'Electrophilic Addition & Markownikoff Rule',
    classLevel: 11,
    type: 'mcq_single',
    difficulty: 'Easy',
    pattern: 'JEE Main',
    pyqYear: null,
    pyqTag: null,
    body: 'When propene reacts with HBr in the presence of benzoyl peroxide, the major organic product formed is:',
    options: [
      { id: 'A', text: '2-Bromopropane' },
      { id: 'B', text: '1-Bromopropane' },
      { id: 'C', text: '1,2-Dibromopropane' },
      { id: 'D', text: 'Isopropyl alcohol' },
    ],
    correctAnswer: 'B',
    solution:
      'Reaction of propene with HBr in the presence of peroxide proceeds via a free-radical anti-Markovnikov addition (the Kharasch effect), yielding 1-bromopropane as the major product.',
    targetTimeSeconds: 60,
  },

  // MATHEMATICS - Calculus (MCQ PYQ)
  {
    id: 'MTH-101',
    subject: 'Mathematics',
    chapter: 'Definite Integrals',
    topic: 'Properties of Definite Integrals',
    classLevel: 12,
    type: 'mcq_single',
    difficulty: 'Medium',
    pattern: 'JEE Main',
    pyqYear: 2024,
    pyqTag: 'JEE Main 2024 (Jan 29, Shift 1)',
    body: 'The value of the definite integral I = ∫[0 to π/2] (sin^3(x) / (sin^3(x) + cos^3(x))) dx is equal to:',
    options: [
      { id: 'A', text: 'π / 2' },
      { id: 'B', text: 'π / 4' },
      { id: 'C', text: 'π / 8' },
      { id: 'D', text: '1' },
    ],
    correctAnswer: 'B',
    solution:
      'Using King’s property ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx:\nHere a = π/2. Then sin(π/2 - x) = cos(x) and cos(π/2 - x) = sin(x).\nSo I = ∫[0 to π/2] (cos^3(x) / (cos^3(x) + sin^3(x))) dx.\nAdding both equations: 2I = ∫[0 to π/2] 1 dx = [x] from 0 to π/2 = π/2 => I = π/4.',
    targetTimeSeconds: 90,
  },

  // MATHEMATICS - Matrices & Determinants (Numerical PYQ)
  {
    id: 'MTH-102',
    subject: 'Mathematics',
    chapter: 'Matrices and Determinants',
    topic: 'Properties of Adjoint & Determinants',
    classLevel: 12,
    type: 'numerical',
    difficulty: 'Medium',
    pattern: 'JEE Main',
    pyqYear: 2023,
    pyqTag: 'JEE Main 2023 (April 8, Shift 2)',
    body: 'If A is a 3 × 3 matrix such that |A| = 4, then the determinant value |adj(adj A)| is equal to:',
    correctAnswer: '256',
    numericalAnswer: 256,
    numericalTolerance: 0.01,
    solution:
      'For any n × n matrix A, |adj(adj A)| = |A|^{(n - 1)^2}.\nHere n = 3 and |A| = 4.\nExponent = (3 - 1)^2 = 2^2 = 4.\nTherefore |adj(adj A)| = 4^4 = 256.',
    targetTimeSeconds: 90,
  },

  // MATHEMATICS - Quadratic Equations (Foundation / Class 10/11)
  {
    id: 'MTH-103',
    subject: 'Mathematics',
    chapter: 'Quadratic Equations',
    topic: 'Roots and Coefficients',
    classLevel: 10,
    type: 'mcq_single',
    difficulty: 'Easy',
    pattern: 'JEE Foundation',
    pyqYear: null,
    pyqTag: null,
    body: 'If α and β are the roots of the equation x^2 - 7x + 12 = 0, what is the value of (1/α + 1/β)?',
    options: [
      { id: 'A', text: '7 / 12' },
      { id: 'B', text: '12 / 7' },
      { id: 'C', text: '-7 / 12' },
      { id: 'D', text: '1' },
    ],
    correctAnswer: 'A',
    solution:
      'Sum of roots α + β = -(-7)/1 = 7.\nProduct of roots α*β = 12/1 = 12.\n(1/α + 1/β) = (α + β) / (α*β) = 7 / 12.',
    targetTimeSeconds: 60,
  },

  // PHYSICS - Ray Optics (MCQ)
  {
    id: 'PHY-104',
    subject: 'Physics',
    chapter: 'Ray Optics',
    topic: 'Refraction through Prisms',
    classLevel: 12,
    type: 'mcq_single',
    difficulty: 'Hard',
    pattern: 'JEE Main',
    pyqYear: 2023,
    pyqTag: 'JEE Main 2023 (Jan 25, Shift 1)',
    body: 'A ray of light is incident at an angle of 60° on one face of an equilateral glass prism (refractive index μ = √3). The angle of emergence of the ray from the other face is:',
    options: [
      { id: 'A', text: '30°' },
      { id: 'B', text: '45°' },
      { id: 'C', text: '60°' },
      { id: 'D', text: '90°' },
    ],
    correctAnswer: 'C',
    solution:
      'Equilateral prism angle A = 60°.\nBy Snell’s law at first face: 1 * sin(60°) = √3 * sin(r1) => (√3/2) = √3 * sin(r1) => sin(r1) = 1/2 => r1 = 30°.\nSince r1 + r2 = A = 60°, we get r2 = 60° - 30° = 30°.\nAt second face: √3 * sin(30°) = 1 * sin(e) => √3 * (1/2) = sin(e) => sin(e) = √3/2 => e = 60°.\n(Notice this is the minimum deviation symmetric condition).',
    targetTimeSeconds: 150,
  },
];
