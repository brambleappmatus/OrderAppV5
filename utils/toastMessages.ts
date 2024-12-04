export const addToCartMessages = [
  "🐱 Purrfect! Helping shelter pets!",
  "🐶 Tail-wagging thanks!",
  "🐾 Making a difference!",
  "💝 Shelter pets say thanks!",
  "🌟 You're a shelter pet hero!",
  "🏠 Helping find forever homes!",
  "💕 Spreading love to shelter pets!",
  "🐈 The cats are purring with joy!",
  "🐕 Tails are wagging with happiness!",
  "🎉 You're making shelter pets smile!",
  "🌈 Creating hope for shelter pets!",
  "💫 Every purchase spreads joy!",
  "🐱 The kittens are dancing!",
  "🐶 Puppies jumping with joy!"
];

export const removeFromCartMessages = [
  "😿 A shelter kitten lost their chance...",
  "🐕 A puppy's dream fades away...",
  "💔 One less meal for a shelter pet...",
  "🐾 Tiny paws wave goodbye sadly...",
  "😢 A shelter pet's hope diminishes...",
  "🏠 A forever home feels further away...",
  "🐈 The shelter cats are heartbroken...",
  "🐶 The shelter dogs whimper softly...",
  "🌧️ A shelter pet's rainbow fades...",
  "💭 A shelter pet's wish vanishes..."
];

export const getRandomMessage = (messages: string[]) => {
  return messages[Math.floor(Math.random() * messages.length)];
};