100.times do
  App.create(
    name: Faker::HarryPotter.character,
    image: Faker::Avatar.image,
    description: Faker::HarryPotter.quote,
    house: Faker::HarryPotter.house
  )
end

puts 'seeded'