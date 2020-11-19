FactoryBot.define do
  factory :session do
    expires_at { 2.weeks.from_now }

    trait :expired do
      expires_at { 2.hours.ago }
    end
  end
end