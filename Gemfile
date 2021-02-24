source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'rails', '~> 6.1.1'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.1'

gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  gem 'rspec-rails', '~> 4.0.0'
  gem 'factory_bot_rails', require: false
  gem 'faker', require: false
end

group :development do
  gem 'rack-proxy'
  gem 'listen', '~> 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem "capistrano", "~> 3.14", require: false
  gem "capistrano-rails", "~> 1.6", require: false
  gem "capistrano-rvm", require: false
  gem "capistrano3-puma", "~> 4.0", require: false
  gem 'capistrano-nvm', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "figaro", "~> 1.2"

gem 'bcrypt', '~> 3.1.7'

gem 'dry-monads'
gem 'dry-validation'
