export const digimons = [
  {
    name: 'Agumon',
    cost: 4,
    hp: 350,
    element: 'Fire',
    background: 'bg_desert.png',
    image: 'digi_agumon.png',
    types: ['Rookie', 'Vaccine', 'Reptile'],
    skills: [
      { icons: ['Fire'], name: 'Baby Flame', power: 80 },
      { icons: ['Fire', 'Fire'], name: 'Baby Burner', power: 200 },
    ],
  },
  {
    name: 'Gabumon',
    cost: 3,
    hp: 450,
    element: 'Ice',
    background: 'bg_ice.jpg',
    image: 'digi_gabumon.png',
    types: ['Rookie', 'Data', 'Reptile Beast'],
    skills: [
      { icons: ['Fire'], name: 'Petit Fire', power: 120 },
      { icons: ['Normal'], name: 'Horn Attack', power: 80 },
    ],
  },
  {
    name: 'Gomamon',
    cost: 3,
    hp: 400,
    element: 'Water',
    background: 'bg_sea.png',
    image: 'digi_gomamon.png',
    types: ['Rookie', 'Vaccine', 'Sea Animal'],
    skills: [
      { icons: ['Water'], name: 'Marching Fishes', power: 90 },
      { icons: ['Water', 'Water'], name: 'Giant Water Current', power: 140 },
    ],
  },
  // ... demais Digimons
];