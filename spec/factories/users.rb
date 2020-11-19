FactoryBot.define do
  factory :user do
    password  { Faker::Alphanumeric.alphanumeric(number: 10) }
    sequence(:email) { |n| "user-#{n}@example.com" }
  end
end