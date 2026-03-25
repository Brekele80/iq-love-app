export function getAnimal(iq: number) {
  if (iq < 90) {
    return {
      name: "Sloth 🦥",
      description: "Santai, tidak terburu-buru, tapi tetap stabil"
    }
  }

  if (iq < 100) {
    return {
      name: "Sheep 🐑",
      description: "Praktis dan mengikuti pola yang aman"
    }
  }

  if (iq < 110) {
    return {
      name: "Dog 🐕",
      description: "Cerdas, cepat belajar, dan mudah beradaptasi"
    }
  }

  if (iq < 120) {
    return {
      name: "Dolphin 🐬",
      description: "Pintar, intuitif, dan komunikatif"
    }
  }

  if (iq < 130) {
    return {
      name: "Chimpanzee 🐒",
      description: "Analitis dan sangat problem-solver"
    }
  }

  if (iq < 140) {
    return {
      name: "Elephant 🐘",
      description: "Memori kuat dan berpikir dalam jangka panjang"
    }
  }

  return {
    name: "Octopus 🐙",
    description: "Sangat adaptif, strategis, dan unik"
  }
}