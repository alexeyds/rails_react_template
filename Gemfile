source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'rails', '~> 6.0.3', '>= 6.0.3.3'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.1'

gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  gem 'rspec-rails', '~> 4.0.0'
end

group :development do
  gem 'listen', '~> 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
